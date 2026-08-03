/**
 * Giving FAQs — carried over from the ForTheRestOfUs studio site
 * (app/apps/inspiritintruth/giving/faq), converted to plain data so the
 * LegalDocument renderer can auto-link the emails.
 *
 * One deliberate change from the FTROU original: the payment-processor answer
 * no longer names Paystack, because the web giving provider is still being
 * decided. Update it once GIVING.provider is set in lib/site.ts.
 */
import { HELLO_EMAIL } from "@/lib/site";

export const GIVING_FAQ_INTRO = [
  "Everything you might want to know before you give to InSpiritInTruth. Still stuck? Email us and a real person will help.",
];

export const GIVING_FAQ_SECTIONS = [
  {
    heading: "Where does my gift go?",
    body: [
      "Two places. Most of it funds the work behind InSpiritInTruth — building new features, keeping the quality high, and creating the devotional content itself: the design, the writing, the servers. And 10% of all giving goes to acts of kindness: donations to people and organisations doing good for others.",
    ],
  },
  {
    heading: "Do I get anything in return?",
    body: [
      "No — and that's the point. Giving is a gift, not a purchase: it doesn't unlock features or content. (The app does have an optional Premium subscription — unlimited personalised devotionals and deeper reflections — but that's entirely separate from giving, and giving is never required for it.)",
    ],
  },
  {
    heading: "What is a Keeper?",
    body: [
      "A Keeper gives a little on a regular schedule to keep InSpiritInTruth going — for themselves and for the next person. The name comes from an old question, “Am I my brother's keeper?” — giving is one small way to answer yes. You choose the amount and how often, and you can cancel anytime.",
    ],
  },
  {
    heading: "Can I change or cancel a recurring gift?",
    body: [
      `Anytime — there's no lock-in and no penalty. If you'd like a hand, email us at ${HELLO_EMAIL}.`,
    ],
  },
  {
    heading: "How are payments handled?",
    body: [
      "Securely, through a dedicated payment provider. We never see or store your card details. Gifts are processed in South African Rand (ZAR).",
    ],
  },
  {
    heading: "Will I get a receipt?",
    body: [
      "Yes — we send it to the email on your giving profile. We'll also send the occasional note on the good your giving does, and nothing more.",
    ],
  },
  {
    heading: "Is my gift tax-deductible?",
    body: [
      "No. InSpiritInTruth isn't a registered public-benefit organisation, so gifts aren't tax-deductible and we can't issue a tax certificate. You're giving simply to keep something good going.",
    ],
  },
  {
    heading: "Who is behind this?",
    body: [
      `InSpiritInTruth is built by For The Rest Of Us. Any question about giving? Email ${HELLO_EMAIL}.`,
    ],
  },
];
