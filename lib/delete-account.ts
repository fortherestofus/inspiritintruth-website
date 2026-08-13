/**
 * Account deletion instructions for InSpiritInTruth.
 *
 * WHY THIS PAGE EXISTS: Google Play's account-deletion policy requires a
 * publicly reachable URL — reachable WITHOUT installing the app — where
 * someone can find out how to delete their account and request it if they
 * cannot. The URL is submitted in the Play Console Data safety form. Apple
 * guideline 5.1.1(v) requires the in-app route, which the app now has; this
 * page is the web half, and the fallback for anyone who has already
 * uninstalled.
 *
 * PORTABILITY: plain data, no JSX, like lib/legal.ts — emails and URLs in the
 * copy are auto-linked by LegalDocument. Keep it that way.
 *
 * KEEP IN STEP WITH: the `delete-account` edge function in the app repo
 * (supabase/functions/delete-account), which is what actually does the work.
 * If what it deletes changes, the lists below change with it.
 */
import { LEGAL_EMAIL, SITE_URL } from "@/lib/site";

export const DELETE_ACCOUNT_INTRO = [
  "You can delete your InSpiritInTruth account whenever you want, and you do not have to ask us to do it. Deleting is permanent — it removes the account itself along with everything in it, and there is no way for us to bring it back.",
  "If you still have the app installed, the quickest way is the first option below. If you have already uninstalled it, the second option works just as well.",
];

export const DELETE_ACCOUNT_SECTIONS = [
  {
    id: "in-the-app",
    heading: "Option 1 — delete it in the app",
    body: [
      "This takes about thirty seconds and happens immediately.",
    ],
    bullets: [
      "Open InSpiritInTruth and go to the Profile tab.",
      "Tap Settings.",
      "Scroll to the bottom, under Account, and tap Delete Account.",
      "Read what will be removed, type DELETE to confirm, then tap Delete my account.",
    ],
  },
  {
    id: "by-email",
    heading: "Option 2 — ask us to delete it",
    body: [
      `If you have uninstalled the app, cannot sign in, or would simply rather we did it, email ${LEGAL_EMAIL} from the email address on the account and ask us to delete it. Sending it from the account's own address is how we confirm it is really you — we will not delete an account on a request from a different address without checking first.`,
      "We will confirm once it is done. We aim to complete these within a few days and always within 30 days.",
    ],
  },
  {
    id: "what-goes",
    heading: "What gets deleted",
    body: [
      "Everything below is removed from our live systems when your account is deleted:",
    ],
    bullets: [
      "Your account and sign-in, including your email address and any Google sign-in link.",
      "Your profile — your name and your profile photo.",
      "Every tailored devotional you created, and anything you wrote when asking for one.",
      "Your saved devotionals, your reading history and your streak.",
      "Your Bible bookmarks and your notes.",
      "Your notification settings, reminder times and the device registration used to send them.",
      "Your customer record with RevenueCat, who handle subscriptions for us.",
    ],
  },
  {
    id: "what-stays",
    heading: "What we keep, and why",
    body: [
      "Three things outlive the account, and none of them identify you:",
    ],
    bullets: [
      "If you ever reported someone else's shared devotional, the report itself stays so we can act on it — but your name is removed from it.",
      "Records of subscription payments are kept for as long as tax and financial law requires. These sit with Apple, Google and RevenueCat, not with us.",
      "Anonymised statistics that can no longer be traced back to you.",
      "Deleted information is removed from our live systems immediately and clears our routine backups within 90 days.",
    ],
  },
  {
    id: "subscription",
    heading: "If you subscribe to Premium, cancel it first",
    body: [
      "This is the one part that catches people out. Deleting your InSpiritInTruth account does not cancel an InSpiritInTruth Premium subscription, and we have no way to cancel it for you — the subscription belongs to your Apple or Google account, not to us.",
      "On iPhone or iPad: Settings → your name → Subscriptions → InSpiritInTruth → Cancel Subscription.",
      "On Android: open Google Play → your profile picture → Payments and subscriptions → Subscriptions → InSpiritInTruth → Cancel subscription.",
      "Cancel there first, then delete your account.",
    ],
  },
  {
    id: "shared",
    heading: "Devotionals you shared with someone",
    body: [
      "If you shared a tailored devotional with a friend, the link stops working when your account is deleted, because the devotional goes with it. Anyone who saved a copy to their own library keeps their copy.",
    ],
  },
  {
    id: "instead",
    heading: "If you only want part of it gone",
    body: [
      "Deleting the whole account is not the only option. You can delete individual tailored devotionals, remove bookmarks and notes, turn every notification off, or stop sharing a devotional you shared — all inside the app, without losing the account.",
      `You also have the right to ask for a copy of everything we hold about you, or to have something corrected, rather than deleted. Email ${LEGAL_EMAIL} and we will sort it out.`,
    ],
  },
  {
    id: "more",
    heading: "More detail",
    body: [
      `Our full Privacy Policy explains what we collect, who processes it and how long we keep it: ${SITE_URL}/privacy/`,
      `Questions about any of this: ${LEGAL_EMAIL}.`,
    ],
  },
];
