/**
 * The kindness ledger — every rand of the kindness half, and what it did.
 *
 * Two sources, split by who actually knows the answer:
 *
 *  RECEIVED comes from Paystack. The kindness half settles into its own
 *  subaccount, so the money that has landed there is a fact we can read rather
 *  than a number someone has to remember to update. A hand-typed figure drifts
 *  the first month it is forgotten, and a ledger that drifts is worse than no
 *  ledger. Only settlements Paystack has actually paid count; anything still
 *  scheduled is shown separately as on its way.
 *
 *  GIVEN comes from Supabase. No API knows that R850 became a month of
 *  groceries — only a person does. Entries are written on the Kindness ledger
 *  page of the ISIT admin panel, behind the same password gate as everything
 *  else there.
 *
 * HELD is the difference, and is shown rather than netted away: money received
 * and not yet given is a fact about us.
 */
import { KINDNESS_SUBACCOUNT, SUPABASE } from "@/lib/site";

export type KindnessEntry = {
  id: string;
  /** ISO date the money actually left, not the date it was promised. */
  happenedOn: string;
  /** What it paid for, in plain words. */
  title: string;
  /** A name, an organisation, or "Withheld". Never a euphemism. */
  recipient: string;
  /** Whole rands. */
  amount: number;
  note: string;
  photoUrl: string | null;
};

/** A row as Postgres returns it. */
type Row = {
  id: string;
  happened_on: string;
  title: string;
  recipient: string;
  amount_rands: number;
  note: string;
  photo_url: string | null;
};

/**
 * Published entries, newest first.
 *
 * Returns null rather than [] when the fetch fails, so the page can say "we
 * could not load this" instead of showing an empty ledger — which would read
 * as "nothing has been given" and be a lie.
 */
export async function fetchKindnessEntries(): Promise<KindnessEntry[] | null> {
  const query = new URLSearchParams({
    select: "id,happened_on,title,recipient,amount_rands,note,photo_url",
    published: "eq.true",
    order: "happened_on.desc",
  });

  try {
    const resp = await fetch(
      `${SUPABASE.url}/rest/v1/kindness_entries?${query}`,
      {
        headers: {
          apikey: SUPABASE.publishableKey,
          Authorization: `Bearer ${SUPABASE.publishableKey}`,
        },
        next: { revalidate: 300 },
      },
    );
    if (!resp.ok) return null;
    const rows: Row[] = await resp.json();
    return rows.map((row) => ({
      id: row.id,
      happenedOn: row.happened_on,
      title: row.title,
      recipient: row.recipient,
      amount: row.amount_rands,
      note: row.note,
      photoUrl: row.photo_url,
    }));
  } catch {
    return null;
  }
}

/**
 * What the kindness subaccount has been paid, split by whether it has landed.
 *
 * Filtering is done here rather than by Paystack. `?subaccount=` on the
 * settlement endpoint only matches the NUMERIC subaccount id — passing the
 * ACCT_ code returns an empty list with a 200, which is how this silently
 * reported R0 while money was sitting in the account. Reading every settlement
 * and matching on subaccount_code cannot fail that way, and does not require
 * keeping a second identifier in sync.
 *
 * `pending` is reported separately instead of being folded into the total: a
 * settlement Paystack has scheduled but not paid is not money in the account,
 * and calling it "received" would overstate the fund. It matters more than it
 * sounds — an unverified subaccount holds payouts indefinitely, so pending can
 * sit there for a long time and needs to be visible rather than invisible.
 *
 * Returns null on failure — never 0, which would understate the fund.
 */
export async function fetchKindnessReceived(): Promise<{
  settled: number;
  pending: number;
} | null> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return null;

  type Settlement = {
    status?: string;
    total_amount?: number;
    subaccount?: { subaccount_code?: string } | null;
  };

  try {
    let settledMinor = 0;
    let pendingMinor = 0;

    for (let page = 1; page <= 20; page += 1) {
      const query = new URLSearchParams({
        perPage: "100",
        page: String(page),
      });
      const resp = await fetch(`https://api.paystack.co/settlement?${query}`, {
        headers: { Authorization: `Bearer ${secret}` },
        next: { revalidate: 300 },
      });
      if (!resp.ok) return null;
      const body = await resp.json();
      if (!body?.status) return null;

      const rows: Settlement[] = body.data ?? [];
      for (const row of rows) {
        if (row.subaccount?.subaccount_code !== KINDNESS_SUBACCOUNT) continue;
        const amount = Number(row.total_amount) || 0;
        // Anything Paystack has not marked a success is still in flight —
        // treat reversed or failed as neither, so they never inflate a figure.
        if (row.status === "success") settledMinor += amount;
        else if (row.status === "pending" || row.status === "processing") {
          pendingMinor += amount;
        }
      }

      if (rows.length < 100) break;
    }

    return {
      settled: Math.round(settledMinor / 100),
      pending: Math.round(pendingMinor / 100),
    };
  } catch {
    return null;
  }
}

export const KINDNESS_PAGE = {
  title: "The kindness ledger",
  intro: [
    "Half of every gift to InSpiritInTruth goes to acts of kindness, and a tenth of what reaches us from Premium subscriptions joins it. This page is where that money is accounted for — not a summary of it, the whole of it.",
    "The halves are worked out on what lands after the card fee, which both sides carry equally. Every cost after that — transfers, travel, admin, anyone's time — comes out of the half that funds the work, never out of this one. Where a name is withheld it is because being named would cost someone their dignity; the amount is never withheld.",
  ],
  /**
   * Said plainly and early. Giving half away invites the assumption that this
   * is a charity, and it is not — it is a small studio that decided to give
   * back. Letting that assumption stand would be the dishonest thing.
   */
  notACharity: {
    title: "This is an app, not a charity",
    body:
      "InSpiritInTruth is a devotional app built by a small studio. We are not a registered public-benefit organisation, gifts are not tax-deductible, and we cannot issue a tax certificate. We give half of what comes in because we want to, not because anyone requires it of us — and this page exists so that the claim can be checked rather than taken on trust.",
  },
  /** Shown when the ledger is empty — which is a real state, not an error. */
  empty:
    "Nothing has gone out yet. The fund is collecting, and the first entry will appear here the day it does. An empty ledger is the honest thing to show until then.",
  /** Shown when Supabase or Paystack could not be reached. */
  unavailable:
    "We could not load this just now. It is a problem on our side, not a sign that the fund is empty — please try again shortly.",
  heldNote:
    "Received and not yet given. It sits in its own account until there is something worth doing with it.",
  newsletter:
    "This page is the record, and it is always current — nothing here waits on a newsletter going out. Givers also get a newsletter when there is news worth sending.",
  /**
   * Held goes negative whenever we give ahead of what has settled, which is a
   * normal thing to do and not an error. Saying so beats showing a minus sign
   * and letting it read as a bug.
   */
  aheadNote:
    "We have given out more than has settled so far — the difference came from our side and will be squared up as gifts land.",
  receivedNote: "Settled into the kindness account, read from Paystack.",
  /** Only rendered when Paystack has a payout scheduled but not yet paid. */
  pendingNote: (amount: string) =>
    `${amount} more has been collected and is on its way to the kindness account. It is not counted above until it lands.`,
  givenNote: "Totalled from the entries below.",
} as const;
