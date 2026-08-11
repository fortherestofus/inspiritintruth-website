/**
 * POST /api/give — start a gift.
 *
 * Runs server-side so PAYSTACK_SECRET_KEY never reaches the browser and there
 * is no public unauthenticated endpoint to lock down: the request is
 * same-origin, so no CORS hole either.
 *
 * Paystack rather than Stripe because Stripe does not operate in South Africa,
 * and gifts are ZAR. Unlike the app's old flow, callback_url genuinely works
 * here — Paystack can redirect to a real https URL, so /give/thanks/ verifies
 * the reference on arrival instead of polling after a browser closes.
 *
 * There is no database. Paystack's dashboard is the ledger: it records every
 * transaction and subscription, emails receipts, and gives Keepers a
 * self-service cancel link.
 */
import { NextResponse } from "next/server";
import { GIVING, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const PAYSTACK = "https://api.paystack.co";
const CURRENCY = "ZAR";

/** Our UI frequency → Paystack's plan interval. */
const INTERVAL: Record<string, string> = {
  weekly: "weekly",
  monthly: "monthly",
  yearly: "annually",
};

/** Guard rails on a public form. Amounts are ZAR, and match the give card. */
const MIN_AMOUNT = GIVING.minAmount;
const MAX_AMOUNT = GIVING.maxAmount;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    // Missing config is ours, not the giver's — say so without detail.
    return NextResponse.json(
      { error: "Giving is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  let body: {
    amount?: unknown;
    email?: unknown;
    recurring?: unknown;
    frequency?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const email = String(body.email ?? "").trim().toLowerCase();
  const recurring = Boolean(body.recurring);
  const frequency = String(body.frequency ?? "monthly");

  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address so we can send your receipt." },
      { status: 400 },
    );
  }
  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return NextResponse.json(
      { error: `Enter an amount between ${GIVING.currency}${MIN_AMOUNT} and ${GIVING.currency}${MAX_AMOUNT.toLocaleString()}.` },
      { status: 400 },
    );
  }
  if (recurring && !INTERVAL[frequency]) {
    return NextResponse.json({ error: "Invalid frequency." }, { status: 400 });
  }

  const psHeaders = {
    Authorization: `Bearer ${secret}`,
    "Content-Type": "application/json",
  };

  const amountMinor = Math.round(amount * 100); // ZAR → cents

  const init: Record<string, unknown> = {
    email,
    amount: amountMinor,
    currency: CURRENCY,
    callback_url: `${SITE_URL}/give/thanks/`,
    metadata: { source: "website", recurring },
  };

  // Recurring → create a plan on the fly and subscribe the giver to it.
  if (recurring) {
    const planResp = await fetch(`${PAYSTACK}/plan`, {
      method: "POST",
      headers: psHeaders,
      body: JSON.stringify({
        name: `Recurring gift · InSpiritInTruth (${frequency})`,
        interval: INTERVAL[frequency],
        amount: amountMinor,
        currency: CURRENCY,
      }),
    });
    const plan = await planResp.json();
    if (!planResp.ok || !plan?.status) {
      return NextResponse.json(
        { error: plan?.message ?? "Could not set up the recurring gift." },
        { status: 400 },
      );
    }
    init.plan = plan.data.plan_code;
  }

  const resp = await fetch(`${PAYSTACK}/transaction/initialize`, {
    method: "POST",
    headers: psHeaders,
    body: JSON.stringify(init),
  });
  const paystack = await resp.json();
  if (!resp.ok || !paystack?.status) {
    return NextResponse.json(
      { error: paystack?.message ?? "Could not start the gift just now." },
      { status: 400 },
    );
  }

  return NextResponse.json({ url: paystack.data.authorization_url });
}
