/**
 * The kindness ledger — every rand of the kindness half, and what it did.
 *
 * This file is the record. There is no database and no admin panel on purpose:
 * a public ledger in the repo is checkable by anyone, has a git history that
 * shows when each line was written, and cannot quietly change. The give card
 * promises that every cent of the kindness half reaches a person or a cause;
 * this is where that promise is either kept or visibly broken.
 *
 * HOW TO ADD AN ENTRY
 *  1. Add to KINDNESS_LEDGER, newest first.
 *  2. Update KINDNESS_RECEIVED to the kindness half's balance to date.
 *  3. Commit and push. The page is static; the deploy publishes it.
 *
 * Amounts are ZAR, whole rands. Dates are ISO (YYYY-MM-DD) so they sort.
 */

export type KindnessEntry = {
  /** ISO date the money actually left, not the date it was promised. */
  date: string;
  /** What it paid for, in plain words. "Groceries for a family of four." */
  title: string;
  /**
   * Who received it. A real name where the person is happy to be named, an
   * organisation where it is one, and "Withheld" where dignity asks for it —
   * never a euphemism that implies a name we do not have.
   */
  recipient: string;
  /** Rands. Never rounded up to look better. */
  amount: number;
  /** A sentence or two of context. What happened, and why this. */
  note: string;
  /** Optional image in /public. Only with the recipient's permission. */
  photo?: string;
};

/**
 * Total received into the kindness half to date, in rands.
 *
 * Paystack settles this half straight to its own account, so this is a figure
 * we read off that account rather than derive. It is stated separately from
 * the ledger precisely so the gap between the two is visible: money held and
 * not yet given is a fact about us, not a rounding error.
 */
export const KINDNESS_RECEIVED = 0;

/** Newest first. */
export const KINDNESS_LEDGER: KindnessEntry[] = [];

/** What has actually gone out, summed from the ledger rather than asserted. */
export function kindnessGiven(): number {
  return KINDNESS_LEDGER.reduce((total, entry) => total + entry.amount, 0);
}

/** Received but not yet given away. Zero is not the goal; honesty is. */
export function kindnessHeld(): number {
  return KINDNESS_RECEIVED - kindnessGiven();
}

export const KINDNESS_PAGE = {
  title: "The kindness ledger",
  intro: [
    "Half of every gift to InSpiritInTruth goes to acts of kindness, and a tenth of what reaches us from Premium subscriptions joins it. This page is where that money is accounted for — not a summary of it, the whole of it.",
    "Every cent of the kindness half reaches a person or a cause. Transfer fees, travel and anyone's time come out of the half that funds the work, never out of this one. Where a name is withheld it is because being named would cost someone their dignity; the amount is never withheld.",
  ],
  /** Shown when the ledger is empty — which is a real state, not an error. */
  empty:
    "Nothing has gone out yet. The fund is collecting, and the first entry will appear here the day it does. An empty ledger is the honest thing to show until then.",
  heldNote:
    "Money received and not yet given. It sits in its own account until there is something worth doing with it.",
} as const;
