/**
 * Every word on the page.
 *
 * Sources, in order of authority:
 *  1. "InSpiritInTruth copy.md" → the REFINED COPY section, which the app repo
 *     marks as the App Store + website source of truth.
 *  2. The ISIT entry in the ForTheRestOfUs studio site (lib/apps.ts) — the
 *     feature and story blocks, so both pages tell the same story.
 *
 * Keep this file the only place copy lives, so a wording change never means
 * hunting through components.
 */

export const HERO = {
  eyebrow: "A devotional for real life",
  /** Rotating audiences — the opening line of copy.md. */
  audiences: [
    "the devoted",
    "the questioning",
    "the unchurched",
    "the overwhelmed",
    "the busy",
    "the curious",
  ],
  title: "Bible study tailored to you.",
  body:
    "InSpiritInTruth is a real-life devotional app for imperfect journeys. Whether you're navigating faith outside traditional church walls, struggling to stay consistent, or simply looking for a quiet moment of truth in a busy day, it meets you right where you are.",
} as const;

/** The three story blocks, alternating with phone screenshots. */
export const STORY = [
  {
    eyebrow: "One a week",
    title: "A devotional you can actually finish.",
    body:
      "One grounded, true-to-life reflection each week, written to be read slowly and sat with rather than rushed through. Faith at the pace of a life that already has enough going on.",
    image: "/screenshots/isit-devotionals.jpg",
  },
  {
    eyebrow: "For what you are carrying",
    title: "Tell it what is going on. It writes for that.",
    body:
      "When the weekly devotional is not the thing you need, describe what you are feeling or facing and get a personal, scripture-rooted reflection written for that moment. Not a generic prepared study that may or may not meet your need.",
    image: "/screenshots/isit-personalise-2.jpg",
  },
  {
    eyebrow: "The whole Bible, in hand",
    title: "Verses, bookmarks, and notes that stay yours.",
    body:
      "A full in-app Bible, a daily verse to keep you connected between devotionals, and somewhere to keep the passages and thoughts you return to. No algorithm, no ads, no pressure to perform.",
    image: "/screenshots/isit-bible.jpg",
  },
] as const;

/**
 * The tailored-devotional journey, shown with real captures from one real run
 * — WiFi, 72% battery, an honest confession and all. We seek God randomly; the
 * point is honesty, not polish, so these screenshots stay exactly as taken.
 */
export const JOURNEY = {
  eyebrow: "How it actually happens",
  title: "From what you share to what you read.",
  intro:
    "A real run, captured as it happened. You say something honest, it takes you seriously, and two minutes later you are reading a devotional written for exactly that.",
  steps: [
    {
      label: "You tell it",
      caption:
        "Whatever you are feeling or facing, in your own words. Messy is fine.",
      image: "/screenshots/isit-journey-share-2.jpg",
      time: "15:14",
    },
    {
      label: "It names where you are",
      caption:
        "Before the devotional, it reflects back what you shared — so you know it actually listened.",
      image: "/screenshots/isit-journey-named-2.jpg",
      time: "15:15",
    },
    {
      label: "You choose the depth",
      caption:
        "A quick moment or a deeper sit. The devotional is written to the time you actually have.",
      image: "/screenshots/isit-journey-time-2.jpg",
      time: "15:15",
    },
    {
      label: "You read",
      caption:
        "A full devotional — title, scripture, reflection — written for that exact moment.",
      image: "/screenshots/isit-journey-read-2.jpg",
      time: "15:16",
    },
  ],
  timeNote: "Shared at 15:14. Reading by 15:16.",
  excerpt: {
    lead: "From that exact devotional:",
    text:
      "Living in a broken world means loss visits the faithful and unfaithful alike. Ecclesiastes is unflinching about this — the same events happen to all. This isn’t a comforting truth in the moment, but it is a freeing one: suffering is not proof of divine rejection. It is proof of living in a world still groaning, waiting for restoration (Romans 8:22).",
    source: "When God Feels Absent (Even Though You Know the Word)",
  },
} as const;

/** WHAT'S INSIDE, straight from copy.md. */
export const INSIDE = [
  {
    icon: "Sparkles",
    title: "Tailored devotionals",
    body: "Built from what you share, rooted first and always in Scripture.",
  },
  {
    icon: "BookOpen",
    title: "A beautiful Bible reader",
    body: "Multiple versions, and the words of Jesus in red.",
  },
  {
    icon: "Layers",
    title: "Curated devotionals & plans",
    body: "Reading plans you can follow at your own pace.",
  },
  {
    icon: "Quote",
    title: "A verse each day",
    body: "Plus topics to explore when you need them: love, anxiety, hope and more.",
  },
  {
    icon: "Flame",
    title: "A gentle streak",
    body: "Helps you stay consistent, without the guilt.",
  },
  {
    icon: "Moon",
    title: "A calm reading experience",
    body: "Quiet by design, built for focus.",
  },
] as const;

/** HOW OUR DEVOTIONS ARE MADE — the transparency section. */
export const HOW_MADE = {
  eyebrow: "How our devotions are made",
  title: "Scripture first. Always.",
  paragraphs: [
    "Some devotions are written by everyday believers like you and me. Where technology helps, it draws from Scripture first, then trusted voices like Matthew Henry's commentary, writers like C.S. Lewis, and what we've learned from psychology.",
    "Every devotion follows a careful template, is checked by our system and then by us. Where something slips through, we trust our community to tell us so we keep getting better.",
  ],
  /** Small trust markers, in reading order. */
  markers: [
    { label: "Scripture", note: "First and most important source of truth" },
    { label: "Trusted voices", note: "Matthew Henry, C.S. Lewis, and more" },
    { label: "Checked twice", note: "By our system, then by us" },
  ],
} as const;

/** Vision + Note from Alroy — the "Website only" section of copy.md. */
export const VISION = {
  eyebrow: "Our vision",
  verse: "God is Spirit, and those who worship Him must worship in spirit and truth.",
  verseRef: "John 4:24",
  body:
    "To nurture deeper spiritual growth in real life, through thoughtful devotionals that speak to the overwhelmed, the curious, the inconsistent, and the quietly devoted. We believe faith can flourish beyond guilt, beyond routine, and beyond walls.",
  backstory:
    "InSpiritInTruth was born from a desire to meet people where they are. As devotion, worship and church life evolve through the shifting sands of time, we keep seeking meaningful ways to connect with God and the world around us.",
} as const;

export const NOTE_FROM_ALROY = {
  eyebrow: "A note from Alroy",
  name: "Alroy Ndhlovu",
  role: "Founder, InSpiritInTruth",
  paragraphs: [
    "Hi there. Thank you so much for considering InSpiritInTruth. I built this app out of a need I had. I had been a Christian and in church for the longest time (I almost became a pastor once).",
    "Over the years I found that even though God stayed the same, I didn't. My circumstances changed and so did my interests, which shaped the way I connected with God.",
    "I couldn't go to church all the time. At times I couldn't, at times I didn't want to, and other times I just felt nothing was speaking to me.",
    "I went from reading my Bible every day, multiple times, to once daily, to a few times a week. Even when I do read it daily, some days all I take in is one verse, and I properly meditate on it.",
    "All I am saying is it has been a journey. I went from being churchy to being more in touch with humanity. I saw clearly what working out my salvation with fear and trembling meant, and that I needed to take a conscious step in drawing closer to God.",
    "So that is where I am. InSpiritInTruth came from a need to help people reach God, both communally and individually.",
    "I hope this app is a blessing to you.",
  ],
} as const;

/** Giving — condensed from the FTROU giving page, styled like the app's flow. */
export const GIVE = {
  eyebrow: "Support",
  title: "You can help keep this going.",
  body:
    "InSpiritInTruth is built with care — the devotionals, the Bible, the daily verses. If it's meant something to you, a gift funds the work behind it and helps it reach more hearts.",
  splitIntro:
    "Every gift does two things. Most of it funds the work — building new features, keeping the quality high, and creating the devotional content itself. And 10% goes to acts of kindness: donations to people and organisations doing good for others. We'll share where it lands.",
  /** Sits under the quick amounts so the hero numeral reads as editable. */
  customAmount: "Tap the amount to give any figure you like.",
  keeper: {
    title: "Become a Keeper",
    body:
      "“Am I my brother's keeper?” someone once asked, hoping the answer was no. A Keeper gives a little each month to keep InSpiritInTruth going — for themselves, and for the next person who needs it. It's an ordinary way to answer yes. You choose the amount and how often, and you can change or cancel anytime.",
  },
  notAPurchase: {
    title: "A gift, not a purchase",
    body:
      "Giving is exactly that — a gift. It doesn't unlock anything, and it isn't required. You give because you want to keep something good going, not to get something back.",
  },
} as const;

export const FAQ = [
  {
    q: "Is InSpiritInTruth free?",
    a: "Yes — free to download and free to use. The weekly devotional, the full Bible reader, daily verses, bookmarks and notes cost nothing and always will, and every reader gets three tailored devotionals to start. An optional Premium subscription ($7.99 a month, or $59.99 a year) makes those unlimited and adds deeper reflections.",
  },
  {
    q: "How many tailored devotionals do I get for free?",
    a: "Three — yours to keep, with no time limit on when you use them. They're a one-time welcome rather than a weekly or monthly allowance, so once you've written all three, Premium is what makes them unlimited. Everything else in the app carries on unchanged.",
  },
  {
    q: "How are the tailored devotionals written?",
    a: "You share what you're going through and a devotional is written for that moment — drawing on Scripture first, then trusted voices like Matthew Henry's commentary and writers like C.S. Lewis. Every one follows a careful template, is checked by our system, and then by us.",
  },
  {
    q: "Which Bible versions are included?",
    a: "Multiple translations are available in the app's reader, with the words of Jesus in red. You can tap any verse for instant context, bookmark it, or keep your own notes alongside it.",
  },
  {
    q: "Is giving the same as subscribing?",
    a: "No — they're entirely separate. Giving is a gift that funds the work and never unlocks anything. Premium is an optional subscription for unlimited tailored devotionals. Giving is never required for it.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, both a Premium subscription and a recurring gift can be changed or cancelled anytime, with no lock-in and no penalty.",
  },
  {
    q: "Who is behind InSpiritInTruth?",
    a: "It's built by For The Rest Of Us, a solutions studio in Johannesburg, and founded by Alroy Ndhlovu — a believer who needed an app like this himself.",
  },
] as const;

export const CLOSING = {
  title: "We hope it's a blessing to you.",
  body: "Faith at the pace of a real life. Download InSpiritInTruth and start where you are.",
} as const;
