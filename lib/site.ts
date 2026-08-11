/**
 * Single source of truth for everything that changes without a redesign:
 * URLs, store links, contact addresses, and the giving provider.
 *
 * Nothing here should be hard-coded into a page or component.
 */

export const SITE_URL = "https://inspiritintruth.net";

/** The FTROU studio page for this app — the two pages link to each other. */
export const FTROU_APP_URL =
  "https://fortherestofus.app/apps/inspiritintruth/";
export const FTROU_URL = "https://fortherestofus.app/";

export const HELLO_EMAIL = "hello@fortherestofus.app";
export const LEGAL_EMAIL = "legal@fortherestofus.app";

/**
 * App Store / Play links.
 *
 * The app is not published yet, so these are null and every store button
 * renders in its "coming soon" state. Drop the real URLs in at launch and
 * every badge on the site goes live at once.
 */
export const STORE_LINKS: { ios: string | null; android: string | null } = {
  ios: null,
  android: null,
};

export const APP_IS_LIVE = Boolean(STORE_LINKS.ios || STORE_LINKS.android);

/* ============================================================
   GIVING
   ------------------------------------------------------------
   Giving lives here on the website, not in the app. Paystack
   because gifts are ZAR and Stripe does not operate in South
   Africa.

   The give card posts to /api/give, which talks to Paystack
   server-side (PAYSTACK_SECRET_KEY never reaches the browser)
   and returns a hosted checkout URL. Paystack redirects back to
   /give/thanks/, which verifies the reference.

   There is no database. Paystack's dashboard is the ledger.
   ============================================================ */
export type GivingFrequency = "weekly" | "monthly" | "yearly";

export const GIVING: {
  /** True once PAYSTACK_SECRET_KEY is set on the host. */
  enabled: boolean;
  /** Currency symbol shown against the amounts. */
  currency: string;
  /** Quick-pick amounts, mirroring what the app used to offer. */
  quickAmounts: number[];
  /**
   * Guard rails on the amount. Any figure between them is allowed — the quick
   * picks only prefill the field. `app/api/give` enforces the same numbers
   * server-side, so a hand-crafted POST cannot slip past them.
   */
  minAmount: number;
  maxAmount: number;
  /** Recurring cadences offered to a Keeper. */
  frequencies: { value: GivingFrequency; label: string }[];
} = {
  enabled: true,
  currency: "R",
  quickAmounts: [50, 100, 250, 500],
  minAmount: 10,
  maxAmount: 100_000,
  frequencies: [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ],
};

/** The 90/10 split shown on the giving section and FAQ. */
export const GIVING_SPLIT = {
  work: 90,
  kindness: 10,
} as const;

/**
 * Pricing shown on the plans strip. Mirrors the App Store listing.
 *
 * LOCKED 2026-07-30 — $7.99/month, $59.99/year (37% off twelve months of
 * monthly). See docs/DECISIONS.md in the app repo for the reasoning. The app
 * itself never hardcodes a price (it reads the live store price through
 * RevenueCat), so this file and the ForTheRestOfUs app entry are the only two
 * places a stale number can survive. Change both together.
 *
 * The free column reads "Free", not "R0" — the app is priced in USD on the
 * store, so a rand figure would be wrong as well as colder.
 */
export const PRICING = {
  freeLabel: "Free",
  freePrice: "Free",
  premiumLabel: "Premium",
  premiumPrice: "$7.99",
  premiumPeriod: "/mo",
  premiumAnnual: "$59.99",
  premiumAnnualNote: "or $59.99 a year — save 37%",
} as const;
