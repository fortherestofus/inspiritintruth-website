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
import { GIVING, GIVING_SPLIT_CODE, SITE_URL } from "@/lib/site";

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
    firstName?: unknown;
    lastName?: unknown;
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
  // Capped rather than rejected on length: a long name is a real name, and
  // refusing someone's own name over a character count is not a hill worth
  // dying on. The cap only stops an unbounded string reaching Paystack.
  const firstName = String(body.firstName ?? "").trim().slice(0, 80);
  const lastName = String(body.lastName ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim().toLowerCase();
  const recurring = Boolean(body.recurring);
  const frequency = String(body.frequency ?? "monthly");

  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: "Enter your first name and surname." },
      { status: 400 },
    );
  }
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

  // Put the name on the customer record before initialising.
  //
  // transaction/initialize accepts first_name/last_name, but Paystack only
  // applies them when it has to create the customer — a giver who has given
  // before keeps whatever name the record already had, which for anyone who
  // gave before this form asked for one is no name at all. POST /customer
  // is likewise create-or-fetch, not upsert, so the PUT is what actually
  // writes. Neither call is allowed to block the gift: a name that fails to
  // save is a worse outcome than nothing only if it takes the gift with it.
  try {
    const custResp = await fetch(`${PAYSTACK}/customer`, {
      method: "POST",
      headers: psHeaders,
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
      }),
    });
    const cust = await custResp.json();
    const code = cust?.data?.customer_code;
    if (code) {
      await fetch(`${PAYSTACK}/customer/${code}`, {
        method: "PUT",
        headers: psHeaders,
        body: JSON.stringify({ first_name: firstName, last_name: lastName }),
      });
    }
  } catch {
    // Carry on — the name still travels in metadata below.
  }

  // first_name/last_name are Paystack's own customer fields, so the name
  // lands on the customer record rather than only in free-form metadata —
  // that is what its receipts, subscription emails and dashboard read.
  const init: Record<string, unknown> = {
    email,
    first_name: firstName,
    last_name: lastName,
    amount: amountMinor,
    currency: CURRENCY,
    callback_url: `${SITE_URL}/give/thanks/`,
    // Sends the kindness half straight to its own bank account. See
    // GIVING_SPLIT_CODE for why this is enforced here rather than promised.
    split_code: GIVING_SPLIT_CODE,
    metadata: {
      source: "website",
      recurring,
      // Shown on the Paystack transaction page as labelled rows.
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: `${firstName} ${lastName}`,
        },
      ],
    },
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
