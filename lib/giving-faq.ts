/**
 * Giving FAQs — carried over from the ForTheRestOfUs studio site
 * (app/apps/inspiritintruth/giving/faq), converted to plain data so the
 * LegalDocument renderer can auto-link the emails.
 *
 * Kept in step with how giving actually works now: on this website, through
 * Paystack, with no account and no local gift ledger. Answers that assumed an
 * in-app giving profile have been corrected.
 */
import { HELLO_EMAIL } from "@/lib/site";

export const GIVING_FAQ_INTRO = [
  "Everything you might want to know before you give to InSpiritInTruth. Still stuck? Email us and a real person will help.",
];

export const GIVING_FAQ_SECTIONS = [
  {
    heading: "Where does my gift go?",
    body: [
      "Two places, and we would rather be specific than reassuring.",
      "Half funds the work: the hours of building, fixing and maintaining the app; the running costs — hosting, the Bible text licences, and the AI behind tailored devotionals; writing and checking every devotional; and making the app better over time.",
      "Half goes to acts of kindness: charities and churches doing good in their communities, and people we are pointed to who need help with living expenses, school fees, or a bill that came at the wrong time.",
      "Every cent of the kindness half reaches a person or a cause. Transfer fees, travel and anyone's time come out of the work half — it is deducted from our side, never from theirs.",
    ],
  },
  {
    heading: "How will I know where the kindness half went?",
    body: [
      "We email you. Everyone who gives gets a note showing what the kindness half paid for and where it landed. We hold back a name when someone's dignity asks for it — we never hold back the numbers.",
    ],
  },
  {
    heading: "Does Premium give to the kindness fund as well?",
    body: [
      "Yes. A tenth of what reaches us from every Premium subscription — after Apple and Google take their commission — joins the same kindness fund and is reported in the same email. We tithe on what actually arrives rather than on profit, because a profit figure is something you would have to take our word for.",
    ],
  },
  {
    heading: "Do I get anything in return?",
    body: [
      "No — and that's the point. Giving is a gift, not a purchase: it doesn't unlock features or content, and it isn't required. (The app does have an optional Premium subscription — unlimited tailored devotionals and deeper reflections — but that's bought in the app through the App Store or Google Play, entirely separate from giving.)",
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
      `Anytime — there's no lock-in and no penalty. Paystack's subscription emails carry a link that lets you manage or cancel it yourself. If you'd rather we did it, email ${HELLO_EMAIL} and we will.`,
    ],
  },
  {
    heading: "How are payments handled?",
    body: [
      "Securely, through Paystack. Your card details go straight to them — they never touch our servers, and we never see or store them. Gifts are processed in South African Rand (ZAR).",
    ],
  },
  {
    heading: "Will I get a receipt?",
    body: [
      "Yes. Paystack emails it to the address you enter when you give, so put in one you actually read. We ask for your name and email and nothing else — no address, no phone number, no account to create.",
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
