/**
 * Privacy Policy and Terms of Service for InSpiritInTruth.
 *
 * PORTABILITY: this file is plain data — no JSX — so the identical content can
 * be dropped into the ForTheRestOfUs repo and rendered by its own copy of
 * LegalDocument. Emails and URLs written in plain text are auto-linked by the
 * renderer. Keep it that way.
 *
 * SCOPE NOTE: written to cover the same ground a mature Bible/devotional app
 * policy covers (YouVersion's structure was used as a coverage checklist), then
 * adapted to what InSpiritInTruth actually does: Supabase for accounts and
 * storage, Anthropic's Claude for devotional generation, API.Bible and helloao
 * for scripture text, RevenueCat for subscriptions, Paystack for giving, and
 * Expo for push notifications. Drafted for review — not a substitute for sign
 * off by a qualified attorney before launch.
 */
import { HELLO_EMAIL, LEGAL_EMAIL, SITE_URL } from "@/lib/site";

export const LEGAL_LAST_UPDATED = "20 August 2026";

const STUDIO = "For The Rest Of Us";

export const PRIVACY_INTRO = [
  "InSpiritInTruth is a devotional app, and a devotional app works best when you can be honest in it. That means some of what you tell us is genuinely personal — what you are struggling with, what you are praying about, what you are carrying. This policy explains, in plain language, what we collect, why, who else touches it, and how to get it back or get rid of it.",
];

export const PRIVACY_SECTIONS = [
  {
    id: "short-version",
    heading: "The short version",
    bullets: [
      "We do not sell your personal information. Not to advertisers, not to anyone.",
      "There are no ads in InSpiritInTruth, and no ad tracking.",
      "What you write when you ask for a tailored devotional is used to write it — and then not kept. We store the devotional, not your words. It is not used to train anyone's AI model.",
      "You can read, export, correct or permanently delete everything we hold about you, at any time.",
      "The rest of this document is the detail behind those four statements.",
    ],
  },
  {
    id: "who-we-are",
    heading: "Who we are",
    body: [
      `InSpiritInTruth is built and operated by ${STUDIO}, a solutions studio based in Johannesburg, South Africa. In this policy "we", "us" and "our" mean ${STUDIO}, and "the app" means the InSpiritInTruth mobile app together with this website at ${SITE_URL}.`,
      `We are the responsible party (under South Africa's Protection of Personal Information Act) and the data controller (under the UK and EU GDPR) for the information described here. For anything in this policy, write to ${LEGAL_EMAIL}.`,
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: [
      "We collect the following kinds of information, and only what we actually need. Most of it comes from using the app; the last one only applies if you give on our website.",
    ],
    bullets: [
      "Account information — your email address, and your name or display name if you give one. If you sign in with Apple or Google we receive a unique identifier and the email you choose to share, including Apple's private relay address if you opt to hide your real one. We never receive your Apple or Google password.",
      "What you share for a tailored devotional — the words you write when you tell the app what you are going through, feeling, facing or curious about. This is the most sensitive thing you give us, and it is the one thing we deliberately do not keep. It has its own section below.",
      "Your practice in the app — devotionals you read or save, verses you bookmark, notes and reflections you write, your streak, and the themes you explore.",
      "Subscription records — whether your account has an active Premium subscription, so the app knows what to unlock. We never see or store your full card number, CVV, or bank details.",
      "Technical information — device type, operating system version, app version, language and region, and your notification token if you turn notifications on. We use this to keep the app working, not to build a profile of you. We do not currently use any analytics or crash-reporting tools at all; if that changes, this page and our App Store privacy labels change with it.",
      "Giving details — if you give on our website, your first name, surname and email address. We ask for a name so a receipt, a reply, or the email telling you where the kindness share went can address you as a person rather than an inbox. These are held by Paystack, our payment processor, not on our own servers. Giving is entirely optional and none of it is linked to your app account.",
    ],
  },
  {
    id: "sensitive",
    heading: "The sensitive part, treated as such",
    body: [
      "Two categories of what we hold are treated as special or sensitive personal information by law: information revealing your religious beliefs, and anything about your health — including mental and emotional health. Using a devotional app reveals the first. Writing “I am anxious about my marriage” or “I am grieving” reveals the second.",
      "We handle this on the basis of your explicit consent, which you give by choosing to write it and asking for a devotional. You are never required to share anything to use the app: the weekly devotionals, the Bible reader, daily verses, bookmarks and notes all work without you telling us a single personal thing.",
      "So we do not store it. Your words are used to write your devotional and are then discarded — they are not saved to your account, and there is no copy on our servers for anyone here to open, no copy to leak in a breach, and no copy we could be compelled to hand over. That is not a policy we promise to follow; it is the way the app is built. What we do keep about the request is deliberately shapeless: which feeling you tapped, how long you asked for, and how many characters you typed. None of it can reconstruct a word of what you said.",
      "It is never published, never shown to another reader, never shared with any church or organisation, never sold, and never used to target you with anything.",
      "The devotional that comes back is a different matter, because it is yours to keep: it is saved to your library so you can read it again, and it stays until you delete it. It is private to your account. Deleting it from the app removes it from our systems.",
      "One honest limit: to write your devotional at all, your words have to reach the model that writes it. That journey is described in the next section.",
    ],
  },
  {
    id: "how-we-use",
    heading: "How we use your information",
    bullets: [
      "To create your account, sign you in and keep it secure.",
      "To write tailored devotionals from what you share, and to show the finished devotionals to you again later in your library. What you wrote to get there is not retained.",
      "To keep your bookmarks, notes, plans and streak in sync across your devices.",
      "To send the notifications you have asked for, and nothing else. You choose whether to receive them and can turn them off at any time, in the app or in your device settings.",
      "To keep your Premium subscription in step across your devices, and to honour cancellations.",
      "To find and fix faults, understand which features are used, and make the app better.",
      "To respond when you contact us for support.",
      "To meet our legal obligations, including keeping financial records for the period the law requires.",
    ],
  },
  {
    id: "the-ai",
    heading: "The AI that writes your devotionals",
    body: [
      "Tailored devotionals are generated using Claude, a large language model provided by Anthropic. When you ask for one, the text you wrote is sent to Anthropic's API together with our instructions and the scripture references involved, and the devotional comes back to us and then to you.",
      "Anthropic processes that text on our behalf as our service provider. Under our commercial terms with them, your text is not used to train their models. We do not use it to train any model either, and we do not sell or share it. Once the devotional comes back, we keep the devotional and discard what you wrote.",
      "AI gets things wrong. Every devotional follows a fixed template and is checked by our system, and we review the content that goes out. Scripture is always the first and governing source. If something reads as off, unbiblical, or simply wrong, please tell us at " +
        HELLO_EMAIL +
        " — reports from readers are how this stays trustworthy.",
      "A devotional is spiritual encouragement. It is not counselling, therapy, medical advice, or a substitute for a pastor, doctor or qualified mental-health professional. If you are in crisis or at risk of harm, please contact your local emergency services or a crisis line.",
    ],
  },
  {
    id: "processors",
    heading: "Who else processes your information",
    body: [
      "We keep this list short on purpose. Each of these is a service provider acting on our instructions, under contract, and none of them may use your information for their own purposes.",
    ],
    bullets: [
      "Supabase — accounts, authentication, and the database where your devotionals, notes, bookmarks and preferences are stored.",
      "Anthropic — generates tailored devotionals from the text you share, as described above.",
      "API.Bible and helloao — supply the Bible text you read. Passage requests are served without an account, and we do not send them anything that identifies you.",
      "RevenueCat — manages Premium subscription status across platforms. We send it your account id, and your name and email address, so we can recognise your subscription and find your account if you contact us for help.",
      "Paystack — processes gifts made on our website. Your first name, surname and email address are stored against a Paystack customer record so gifts, receipts and our kindness-report email can reach the right person; your card details go directly to Paystack. None of it reaches our own servers, and we keep no separate record of the gift. Paystack's own privacy terms govern what they hold.",
      "Apple and Google — process subscription payments made through their stores under their own terms, and deliver push notifications.",
      "Expo — delivers push notifications to your device.",
      "We may also disclose information where the law genuinely requires it, to protect someone's safety, or to a buyer if the app is ever transferred — in which case this policy travels with it and we will tell you first.",
    ],
  },
  {
    id: "never",
    heading: "What we never do",
    bullets: [
      "We never sell your personal information.",
      "We never show you ads, and we do not use advertising or cross-site tracking technology.",
      "We never share what you wrote about your own life with other users, churches, or organisations.",
      "We never use your personal reflections to train AI models.",
      "We never ask for your card details directly, and we cannot see them.",
    ],
  },
  {
    id: "storage",
    heading: "Where your information is kept",
    body: [
      "Your information is stored on servers operated by our providers, which are located outside South Africa — principally in the United States and the European Union. Our service providers are bound by contract to protect it to a standard consistent with POPIA and the GDPR, including standard contractual clauses where those apply.",
      "Information is encrypted in transit and at rest. No system is perfectly secure, and we will not pretend otherwise, but we limit who can access what, and we will notify you and the relevant regulator without undue delay if a breach affects your information.",
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it, and how to delete it",
    body: [
      "We keep your account information and your practice in the app for as long as your account exists. Delete your account and we remove your personal information from our live systems within 30 days, and from routine backups within 90 days.",
      "Two exceptions: records of subscription payments are kept for as long as tax and financial law requires, and anonymised statistics that can no longer identify you may be retained. Gifts are not stored by us at all — those records live with Paystack.",
      `You can delete your account from within the app. If you cannot reach it, email ${LEGAL_EMAIL} from your account address and we will do it for you.`,
    ],
  },
  {
    id: "children",
    heading: "Children and young people",
    body: [
      "You need to be 18 or over to create an InSpiritInTruth account.",
      "It is worth saying why we set it there, because a devotional app is not an obvious place to find an age limit. South African law requires a competent person's consent before anyone may process the personal information of a person under 18, and the most personal thing this app does is invite you to write about what you are actually going through so a devotional can be shaped around it. Accepting that from a child on the strength of a tick-box claiming a parent agreed would not be real consent. We would rather not collect it at all than pretend otherwise.",
      `We do not knowingly collect information from anyone under 18. If you believe someone under 18 has given us information, contact ${LEGAL_EMAIL} and we will delete it promptly.`,
      "None of this stops a young person reading scripture. A verse or a devotional that someone shares with them by link opens without an account, and we ask nothing of them to read it.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      "Wherever you live, you can exercise all of the following with us. We do not charge for it and we will respond within 30 days.",
    ],
    bullets: [
      "Access — ask what we hold about you and get a copy.",
      "Correction — fix anything inaccurate or incomplete.",
      "Deletion — have your information erased, as described above.",
      "Portability — receive your devotionals, notes and bookmarks in a machine-readable format.",
      "Objection and restriction — object to a particular use, or ask us to pause it.",
      "Withdraw consent — stop the tailored-devotional feature processing what you share, at any time, without affecting anything done before you withdrew.",
      `To exercise any of these, email ${LEGAL_EMAIL}.`,
      "If we do not resolve it, you may complain to the Information Regulator of South Africa (inforegulator.org.za), or to your local data protection authority if you are in the UK or EU.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "When we change this policy we update the date at the top. If a change materially affects how we handle your information, we will tell you in the app or by email before it takes effect, and where the law requires it we will ask for your consent again.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      `Questions, requests, or concerns about privacy: ${LEGAL_EMAIL}. Anything else: ${HELLO_EMAIL}. A real person reads both.`,
      `${STUDIO}, Johannesburg, South Africa.`,
    ],
  },
];

export const TERMS_INTRO = [
  "These terms are the agreement between you and For The Rest Of Us for using InSpiritInTruth. We have kept them as readable as we can. By creating an account or using the app you agree to them, so it is worth the few minutes.",
];

export const TERMS_SECTIONS = [
  {
    id: "the-app",
    heading: "The app",
    body: [
      `InSpiritInTruth is a devotional app: a weekly devotional, tailored devotionals written from what you share, a Bible reader, a daily verse, and somewhere to keep bookmarks and notes. It is operated by ${STUDIO} from Johannesburg, South Africa.`,
      "We offer it for personal, devotional and non-commercial use.",
    ],
  },
  {
    id: "account",
    heading: "Your account",
    body: [
      "You need an account for anything that syncs. You agree to give accurate information, to keep your sign-in details to yourself, and to tell us promptly at " +
        HELLO_EMAIL +
        " if you think someone else has got into your account. What happens under your account is your responsibility.",
      "You must be 18 or over to create an InSpiritInTruth account. If we find out that an account belongs to someone under 18, we will close it and delete what is on it.",
    ],
  },
  {
    id: "not-counselling",
    heading: "Devotionals are encouragement, not professional advice",
    body: [
      "This one matters more than the rest, so it is near the top. InSpiritInTruth offers spiritual encouragement and reflection. It is not counselling, therapy, medical advice, legal advice, or pastoral care from a qualified minister, and it is not a substitute for any of them.",
      "If you are struggling with your mental or physical health, please speak to a qualified professional. If you are in immediate danger or thinking about harming yourself, contact your local emergency services or a crisis line right away. The app cannot help you in an emergency and does not monitor what you write for signs of crisis.",
    ],
  },
  {
    id: "ai-content",
    heading: "AI-written devotionals — use your judgement",
    body: [
      "Tailored devotionals are generated by AI (Anthropic's Claude) working from what you share, our template, and Scripture. Every one is checked by our system and reviewed by us, but AI can still produce something inaccurate, poorly judged, or theologically off.",
      "Scripture is the authority, not the devotional. Read anything the app writes with discernment, weigh it against the Bible, and where it matters, against the counsel of people you trust. You rely on AI-generated content at your own discretion, and we are not liable for decisions you make on the strength of it.",
      `Tell us when something is wrong — ${HELLO_EMAIL}. We would much rather hear it.`,
    ],
  },
  {
    id: "scripture",
    heading: "Scripture and third-party content",
    body: [
      "Bible text in the app is supplied by third parties, including API.Bible and helloao. Each translation remains the copyright of its publisher and is used under the licence that publisher grants. Those licences, not these terms, govern what you may do with the translation text — in general, personal reading and reasonable quotation are fine, and republishing at scale is not.",
      "Quotations from commentators and authors are used for the purpose of comment and study, and remain the property of their copyright holders.",
    ],
  },
  {
    id: "your-content",
    heading: "What you write stays yours",
    body: [
      "Your notes, reflections, bookmarks and the things you share to get a devotional belong to you. We claim no ownership of them.",
      "You give us only the permission we need to run the service: to store your content, show it back to you, sync it to your devices, and send the relevant part to our AI provider so a devotional can be written for you. That permission ends when you delete the content or your account.",
      "Do not put anything into the app that you have no right to share, or that infringes someone else's rights.",
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: ["You agree not to:"],
    bullets: [
      "Use the app for anything unlawful, or to harm, harass or exploit anyone — children above all.",
      "Try to break, overload, probe or gain unauthorised access to the app, our servers, or anyone's account.",
      "Copy, scrape, resell or redistribute the app's content, including bulk extraction of devotionals or Bible text.",
      "Reverse engineer the app, or strip out any notice of ownership.",
      "Use the app to generate content that is hateful, obscene, deceptive, or intended to mislead people about what Scripture says.",
      "Impersonate anyone, or misrepresent your connection to us.",
      "Resell or commercialise access to the app or anything in it.",
    ],
  },
  {
    id: "premium",
    heading: "Premium subscriptions",
    body: [
      "Some features, including unlimited tailored devotionals, require a paid Premium subscription. Prices are shown in the app before you buy.",
      "Subscriptions bought through the App Store or Google Play are billed by Apple or Google under their terms. They renew automatically at the end of each period unless you cancel at least 24 hours before it ends, and you manage or cancel them in your Apple or Google account settings — not through us.",
      "Refunds for store purchases are handled by Apple or Google under their policies. We will help where we can, but we cannot issue a refund for a payment we did not take.",
      "We may change what Premium includes or what it costs. If a price goes up, we will tell you before it applies to you, and you can cancel.",
    ],
  },
  {
    id: "giving",
    heading: "Giving",
    body: [
      "Giving is a gift, not a purchase. It does not unlock features, it is never required, and it buys you nothing. Half of every gift funds the work behind the app; half goes to acts of kindness — people and organisations we support directly. The halves are calculated on the amount remaining after our payment processor's card fee, which is deducted before the money reaches us and is borne equally by both halves. Every cost after that — transfers, travel and administration — is met from the work half. We additionally commit a tenth of the Premium subscription income we receive, after the app stores' commission, to the same kindness fund. These are commitments we make and report on, not a trust or a legal obligation, and we may change the proportions in future — if we do, we will say so plainly here and on the giving page rather than quietly.",
      `${STUDIO} is not a registered public-benefit organisation, so gifts are not tax-deductible and we cannot issue a tax certificate.`,
      `Giving happens on this website, through Paystack, and never inside the app. You give your first name, surname and an email address — the name so we can thank you, reply to you, and tell you where the kindness share went by name rather than by inbox. There is no account to create, and none of it is linked to your app account.`,
      `Recurring gifts can be changed or cancelled at any time, with no penalty — Paystack's subscription emails carry a link to do it yourself. Because a gift is voluntary and nothing is supplied in return, gifts are generally non-refundable, but if you gave by mistake or something went wrong, email ${HELLO_EMAIL} and we will sort it out.`,
    ],
  },
  {
    id: "availability",
    heading: "Availability and changes",
    body: [
      "We work to keep the app running, but we cannot promise it will always be available or error-free. Parts of it depend on third-party services that can fail or change.",
      "We may add, change, or remove features, and we may stop offering the app entirely. If we discontinue it, we will give reasonable notice and a way to export your content first.",
    ],
  },
  {
    id: "ip",
    heading: "Our intellectual property",
    body: [
      `The app itself — its name, design, code, original devotional content and templates — belongs to ${STUDIO} and is protected by copyright and trade mark law. These terms give you a personal, limited, non-transferable, revocable licence to use the app. They do not give you any ownership of it.`,
    ],
  },
  {
    id: "termination",
    heading: "Suspension and termination",
    body: [
      "You can stop using the app and delete your account whenever you like.",
      "We may suspend or close an account that breaks these terms, that puts other people or the service at risk, or where the law requires it. Where it is reasonable to do so we will warn you first and give you a chance to put it right. If we close your account without cause, we will refund the unused part of any subscription we billed.",
    ],
  },
  {
    id: "warranty",
    heading: "No warranty",
    body: [
      "The app is provided as it is and as it is available. To the fullest extent the law allows, we make no warranties of any kind — express or implied — about the app's accuracy, reliability, availability, or fitness for a particular purpose, including any spiritual, emotional or practical outcome.",
      "Nothing here takes away rights you have under South Africa's Consumer Protection Act or any other law that cannot be excluded by agreement.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, we are not liable for indirect, incidental, special or consequential loss arising from your use of the app, or for any decision you take on the basis of content it produced.",
      "Where liability cannot be excluded, our total liability to you is limited to the greater of the amount you paid us in the 12 months before the claim, or ZAR 1,000.",
      "We do not exclude liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot lawfully be excluded.",
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: [
      "If someone brings a claim against us because of how you used the app — content you put into it, terms you broke, or rights you infringed — you agree to cover the reasonable costs of defending it.",
    ],
  },
  {
    id: "law",
    heading: "Governing law and disputes",
    body: [
      "These terms are governed by the law of the Republic of South Africa, and the courts of South Africa have jurisdiction. If you are a consumer somewhere else, you keep the protection of any mandatory laws of your own country.",
      `Before anything formal, please just talk to us at ${LEGAL_EMAIL}. Almost everything is resolvable that way.`,
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      "We may update these terms. The date at the top tells you when they last changed, and we will give notice in the app or by email before a material change takes effect. Carrying on using the app after that means you accept the new version. If you do not, you can close your account.",
    ],
  },
  {
    id: "general",
    heading: "The usual general clauses",
    body: [
      "If any part of these terms is found unenforceable, the rest still stands. If we do not enforce something straight away, we have not given up the right to. These terms, with the Privacy Policy, are the whole agreement between us about the app. You may not transfer your rights under them; we may transfer ours if the app changes hands, and we will tell you if that happens.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      `Legal matters: ${LEGAL_EMAIL}. Support and everything else: ${HELLO_EMAIL}.`,
      `${STUDIO}, Johannesburg, South Africa.`,
    ],
  },
];
