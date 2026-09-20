// Plain ESM, deliberately — NOT next.config.ts.
//
// Next has to transpile a TypeScript config before it can read it, and it does
// that with its native binary, writing the result to a temporary
// <hash>.next.config file. On the Hostinger build container that step failed
// (the log reported a GLIBC mismatch alongside "cannot find
// 6a730267af9b7.next.config"), so the temp file was never produced and the
// build died looking for it. No such file exists in this repo — it was Next's
// own artifact, and its absence was the symptom rather than the cause.
//
// A .mjs config sidesteps the whole thing: Node loads it directly, no
// transpile, no native binary, no temp file. Types still come from the JSDoc
// annotation below, so editor support is unchanged.

// Baseline security headers applied to every route. Mirrors the FTROU studio
// site; no CSP yet for the same reason (inline styles need their own pass).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-mode build (so `next start` works on Hostinger), same as FTROU.
  trailingSlash: true,
  // ...but WITHOUT the automatic 308 that trailingSlash normally adds.
  // Share links are sent from the app as /d/<slug> (no slash), and Apple's
  // LinkPresentation — which builds the iMessage preview card on the
  // sender's device — mishandles that 308 hop: instead of following it to
  // the HTML page it presented the share as a downloadable "Text Document"
  // of raw markup (observed from a real share, Aug 2026). WhatsApp's
  // crawler follows the same 308 fine, which is why only iMessage broke.
  // With the skip, /d/<slug> and /d/<slug>/ both serve directly; internal
  // marketing links keep their trailing slashes (trailingSlash still shapes
  // link generation — only the redirect is dropped).
  skipTrailingSlashRedirect: true,
  images: { unoptimized: true },

  // The Apple association file sets its own Content-Type from a route handler
  // (app/.well-known/apple-app-site-association/route.ts) rather than here.
  // A header rule was not enough: the file has no extension and Hostinger's CDN
  // serves public/ directly, so the response went out with no Content-Type and
  // none of these headers applied to it at all.
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },

      // HTML documents must not be cached for a year.
      //
      // Next stamps prerendered pages with `s-maxage=31536000`, on the
      // assumption that the CDN in front of it is purged on every deploy.
      // Hostinger's CDN is not: a copy change went live in the build but the
      // homepage kept serving 26-hour-old HTML from the edge, and a
      // cache-busting query string did not shift it either.
      //
      // So HTML gets a short shared cache with a long stale-while-revalidate:
      // still served instantly from the edge, but revalidated within minutes
      // of a deploy instead of a year later. The negative lookahead keeps
      // immutable build assets on their own long-lived caching — those are
      // content-hashed and genuinely safe to keep for a year.
      //
      // /screenshots is deliberately NOT excluded. Those filenames are stable
      // while their contents get replaced, so a year-long cache serves the
      // previous screenshot from the same URL — which is precisely what
      // happened when the tailored-devotional captures were swapped and the
      // old ones kept showing for everyone who had already loaded the page.
      // /d/ and /v/ are excluded: those route handlers set their own
      // `no-store`, and this blanket rule would otherwise override it. They
      // MUST NOT be shared-cached — the page varies by User-Agent (the
      // "open in the app" link is an Android intent:// or an iOS custom
      // scheme), so one cached copy would hand the wrong platform's link to
      // everyone. A slug can also be unshared at any time.
      {
        source:
          "/((?!_next/static|_next/image|icons|fonts|d/|v/|\\.well-known).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  // /d/<slug> and /v/<ref> are NOT rewrites any more. A rewrite streams the
  // upstream headers through verbatim, and Supabase downgrades text/html to
  // text/plain on its own domain — so a shared devotional rendered as raw
  // markup. They are route handlers now (app/d/[slug], app/v/[reference]),
  // which fetch the same function but re-emit the body under our own
  // Content-Type. The shared URL still stays in the address bar, so the
  // universal-link match on the app side is unaffected.
};

export default nextConfig;
