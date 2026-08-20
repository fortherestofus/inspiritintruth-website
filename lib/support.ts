/**
 * Support content for InSpiritInTruth.
 *
 * WHY THIS PAGE EXISTS: App Store Connect requires a Support URL, and it must
 * be an http(s) address — a mailto: is rejected — that actually helps a user
 * of THIS app. The studio's /contact/ page does not: it is a page for
 * commissioning work ("Start a project"), never mentions InSpiritInTruth, and
 * would meet a reader whose subscription will not restore with a question
 * about scope and budget. Reviewers open this link, and "your Support URL does
 * not provide support for your app" is a standard rejection.
 *
 * DELIBERATELY NO GIVING LINK. A support page is not a place to ask for money,
 * and keeping the two apart is the same 3.2.2(iv) separation the app keeps.
 *
 * PORTABILITY: plain data, no JSX, like lib/legal.ts and lib/delete-account.ts
 * — emails and URLs in the copy are auto-linked by LegalDocument.
 *
 * KEEP IN STEP WITH: the in-app routes named below. If Settings moves, or the
 * Premium card stops being the first thing under the name on Profile, the
 * directions here become wrong and someone follows them into a dead end.
 */
import { SITE_URL } from "@/lib/site";

export const SUPPORT_EMAIL = "support@inspiritintruth.net";

/** What we tell people to expect. Change the copy, not just this line. */
export const SUPPORT_REPLY_TIME = "within two working days";

export const SUPPORT_INTRO = [
  `Something not working, or not making sense? Email ${SUPPORT_EMAIL} and a person will answer, usually ${SUPPORT_REPLY_TIME}.`,
  "Most of what people write in about is answered below, so it is worth a look first — several of these you can sort out yourself in under a minute.",
];

export const SUPPORT_SECTIONS = [
  {
    id: "premium",
    heading: "Cancel or change Premium",
    body: [
      "Premium is billed by Apple, not by us, so the cancel switch lives in your iPhone's own settings and only you can reach it. We cannot cancel a subscription on your behalf, and neither can Apple Support ask us to.",
    ],
    bullets: [
      "Open Settings on your iPhone and tap your name at the top.",
      "Tap Subscriptions, then InSpiritInTruth Premium.",
      "Choose Cancel Subscription, or switch between monthly and yearly.",
      "You keep Premium until the end of the period you have already paid for.",
    ],
  },
  {
    id: "restore",
    heading: "You paid, but Premium is not showing",
    body: [
      "This is nearly always a sign-in mismatch rather than a lost payment.",
    ],
    bullets: [
      "In the app, go to Profile, then Settings, and tap Restore Purchases.",
      "Check you are signed in to the same Apple Account that made the purchase — a subscription belongs to an Apple Account, not to an InSpiritInTruth account.",
      `If it still does not appear, email ${SUPPORT_EMAIL} with the email address on your InSpiritInTruth account and roughly when you subscribed, and we will sort it out.`,
    ],
  },
  {
    id: "signing-in",
    heading: "Trouble signing in",
    body: [
      "You can sign in with an email and password, with Apple, or with Google. Whichever you used the first time is the one that holds your account — signing in a different way makes a second, empty account rather than opening the first.",
      "If you used Sign in with Apple and chose to hide your email, your account is held under Apple's private relay address rather than your usual one. That is normal and nothing is lost.",
    ],
    bullets: [
      `Forgotten your password: email ${SUPPORT_EMAIL} from the address you signed up with and we will send you a reset link.`,
      "Signed in with Apple or Google and cannot remember which: try the other one before making a new account. An account made the second way starts empty; it does not merge with the first.",
    ],
  },
  {
    id: "tailored",
    heading: "Tailored devotionals",
    body: [
      "Every account gets three tailored devotionals at no cost — a one-time welcome, not a weekly allowance. Premium removes the limit.",
      "We do not keep what you write. The words you type about what you are facing are sent to be turned into a devotional and then discarded; we keep the devotional, not your description of your life. The privacy policy sets this out in full.",
    ],
    bullets: [
      "Deleting a devotional you created does not give the free one back — the count is of devotionals made, not of ones you still have.",
      "If a devotional quotes scripture that looks wrong to you, please tell us. Test everything, as the Bereans did.",
    ],
  },
  {
    id: "notifications",
    heading: "Notifications and the daily rhythm",
    body: [
      "A verse in the morning, a devotional when one is published, and a quote in the evening — each at a time you choose, in your own timezone. All of it is optional.",
    ],
    bullets: [
      "Change or switch off any of them in the app: Profile, then Settings, then Notifications.",
      "Getting nothing at all: check InSpiritInTruth is allowed to send notifications in your iPhone's Settings, under Notifications.",
    ],
  },
  {
    id: "offline",
    heading: "Reading without a signal",
    body: [
      "Any Bible chapter you have already opened stays readable with no connection, and you can download a whole translation to your phone for the rest.",
    ],
    bullets: [
      "In the Bible tab, tap the translation name at the top, then the download arrow beside the translation you want.",
      "A translation takes about 6MB on your phone, and rather less than that over the network. It only has to happen once, and you can remove it from the same place whenever you like.",
    ],
  },
  {
    id: "shared",
    heading: "A devotional someone shared with you",
    body: [
      "Anyone can send you a devotional they were given. You can read the whole thing without paying, and you only need an account if you want to keep it.",
      "If something shared with you is abusive, misleading, or not what this app is for, report it from the menu in the top corner of the devotional. Reports come to us and we read them.",
    ],
  },
  {
    id: "account",
    heading: "Deleting your account",
    body: [
      `You can delete your account and everything in it from inside the app, at Profile, then Settings, then Account. If you have already uninstalled, ${SITE_URL}/delete-account/ explains how to ask us instead.`,
      "Deleting is permanent, and it does not cancel a subscription — that belongs to your Apple Account and has to be cancelled separately, using the steps at the top of this page.",
    ],
  },
  {
    id: "privacy",
    heading: "Privacy and terms",
    body: [
      `What we collect and what we refuse to collect is set out at ${SITE_URL}/privacy/, and the terms are at ${SITE_URL}/terms/.`,
    ],
  },
  {
    id: "still-stuck",
    heading: "Still stuck",
    body: [
      `Write to ${SUPPORT_EMAIL}. Tell us what you were doing, what happened, and what you expected instead — and if you can, which iPhone you are on. A paragraph is plenty, and a real person reads it, usually ${SUPPORT_REPLY_TIME}.`,
    ],
  },
];
