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
   The provider is undecided (Paystack vs Ko-fi vs something
   else), so the give section renders a provider-shaped slot
   instead of a payment form. Set `provider` and `url` when you
   decide — the section switches from placeholder to live button
   with no other edits.

   Set `provider: "paystack"` and a payment-page URL, or
   `provider: "kofi"` and your Ko-fi URL. Leave as "undecided"
   to keep the placeholder.
   ============================================================ */
export type GivingProvider = "undecided" | "paystack" | "kofi";

export const GIVING: {
  provider: GivingProvider;
  /** Hosted payment/checkout page the Give button opens. */
  url: string | null;
  /** Currency symbol shown against the amounts. */
  currency: string;
  /** Quick-pick amounts, mirroring the app's giving flow. */
  quickAmounts: number[];
  /** Recurring cadences offered to a Keeper. */
  frequencies: { value: "weekly" | "monthly" | "yearly"; label: string }[];
} = {
  provider: "undecided",
  url: null,
  currency: "R",
  quickAmounts: [50, 100, 250, 500],
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

/** Pricing shown on the plans strip. Mirrors the App Store listing. */
export const PRICING = {
  freeLabel: "Free",
  premiumLabel: "Premium",
  premiumPrice: "$6.99",
  premiumPeriod: "/mo",
} as const;
