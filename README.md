# InSpiritInTruth — website

The landing page for the InSpiritInTruth devotional app, and the public face of
the `inspiritintruth.net` domain used for shared devotional and verse links.

Next.js (App Router, server mode) — deploys to Hostinger the same way the
ForTheRestOfUs studio site does.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

## What lives where

| Path | Purpose |
| --- | --- |
| `lib/site.ts` | URLs, store links, contact addresses, **the giving provider slot** |
| `lib/content.ts` | Every word on the one-pager |
| `lib/legal.ts` | Privacy Policy + Terms of Service (canonical copy) |
| `lib/giving-faq.ts` | Giving FAQs |
| `components/sections/` | The one-pager, section by section |
| `public/.well-known/` | `apple-app-site-association` + `assetlinks.json` |

## Share links

`/d/<slug>` (devotionals) and `/v/<reference>` (verses) are **rewritten** —
not redirected — to the Supabase `share-link` edge function in
`next.config.ts`. A rewrite keeps the URL in the address bar, which matters
because a 30x hop breaks the iOS universal-link match. This replaces the
WordPress Redirection-plugin rules the app build previously relied on.

## Design system

Tokens, radii, shadows and the Apfel Grotezk family are lifted from the
ForTheRestOfUs studio site so the two read as one family. The difference: there
the ISIT green is scoped to the app's own pages, here it is the site accent, set
globally in `app/globals.css`. Light and dark are both defined.

## Before launch

- [ ] **Giving provider** — set `GIVING.provider` + `url` in `lib/site.ts`
      (currently `"undecided"`, which renders a placeholder in the give card)
- [ ] **Store URLs** — `STORE_LINKS` is `null/null`; every badge shows
      "Coming soon" until filled
- [ ] **`ANDROID_CERT_SHA256`** — `public/.well-known/assetlinks.json` still
      holds a placeholder fingerprint
- [ ] **Legal review** — `lib/legal.ts` is a thorough draft, not
      attorney-reviewed

## Related

- Mirror of the legal pages lives in the ForTheRestOfUs repo at
  `lib/legal/inspiritintruth.ts` and `app/apps/inspiritintruth/{privacy,terms}`.
  Those pages set their canonical URL here. **Edit one, edit both.**
- The app's `src/constants/links.ts` points its Settings rows at
  `/privacy/` and `/terms/` on this domain.
