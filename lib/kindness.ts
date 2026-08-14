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
 * `pending` is kept apart from the total instead of folded into it: a
 * settlement Paystack has scheduled but not paid is not money in the account,
 * and calling it "received" would overstate the fund.
 *
 * It is deliberately not published — the page shows money once it has landed
 * and says nothing about money in transit. It is still returned because an
 * unverified subaccount holds payouts indefinitely, and when that happens
 * `settled` reads 0 forever with nothing on the page to say why. Keeping the
 * figure means that state is still legible from the admin side.
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

/**
 * Page copy.
 *
 * TRIMMED 2026-08-14. This page used to explain its own honesty in four
 * separate places — why an empty ledger was the right thing to show, why
 * pending money was not counted, why the claim could be checked rather than
 * taken on trust. Every one of those sentences was true and none of them
 * earned its place: a ledger that argues for its own integrity reads as
 * anxious, and the numbers were doing the work anyway. Nothing disclosed was
 * removed — only the narration around it. Keep it that way.
 */
export const KINDNESS_PAGE = {
  title: "The kindness ledger",
  intro: [
    "Half of every gift to InSpiritInTruth goes to acts of kindness, and a tenth of what reaches us from Premium subscriptions joins it. Every rand of it is accounted for here.",
    "The halves are worked out on what lands after the card fee, which both sides carry equally. Every cost after that — transfers, travel, admin, anyone's time — comes out of the half that funds the work, never out of this one.",
  ],
  /**
   * Sits with the entries rather than the intro: it explains a word the reader
   * meets in the list, and means nothing before then.
   */
  withheldNote:
    "Where a name is withheld, being named would have cost someone their dignity. The amount is never withheld.",
  /** Shown when the ledger is empty — a real state, not an error. */
  empty: "Nothing has gone out yet. The first entry will appear here the day it does.",
  /** Shown when Supabase or Paystack could not be reached. */
  unavailable:
    "We could not load this just now. It is a problem on our side, not a sign that the fund is empty — please try again shortly.",
  /*
   * Two figures, not three. Held used to sit alongside these and was dropped:
   * it is Received minus Given, so it added a third number without adding a
   * third fact, and its note ("Received, not yet given") only restated its own
   * label. What is still held is now shown by the bar instead, where it costs
   * a colour rather than a column.
   *
   * Each note has to say something the label does not. Check that before
   * adding one back.
   */
  receivedNote: "Settled into the kindness account.",
  givenNote: (count: number) =>
    count === 0 ? "Nothing yet." : `Across ${count} ${count === 1 ? "entry" : "entries"}.`,
  /** Bar legend, when there is something to divide. */
  legend: { given: "Given", held: "Still to give" },
  /**
   * Giving ahead of settlement is a normal thing to do, not an error — but it
   * makes the bar meaningless, so the bar goes and this takes its place.
   */
  aheadNote: "We have given ahead of what has settled so far.",
  /**
   * Demoted to a footnote. Giving half away invites the assumption that this is
   * a charity and it is not, so the correction stays — but the Giving FAQs
   * answer tax-deductibility in full, and repeating it in a card at the top of
   * the page gave it more weight than it needs.
   */
  notACharity:
    "InSpiritInTruth is an app built by a small studio, not a registered public-benefit organisation. Gifts are not tax-deductible and we cannot issue a tax certificate.",
  newsletter: "Givers also get a newsletter when there is news worth sending.",
} as const;
