import type { NextConfig } from "next";

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

// The share-link edge function that renders /d/<slug> (devotionals) and
// /v/<reference> (verses). This domain is the public face of those links, so
// the rewrites below are what make a shared link resolve — they replace the
// WordPress Redirection-plugin rules from the app build.
const SHARE_LINK_FN =
  "https://xjhkvphnxzuqookjqkjc.supabase.co/functions/v1/share-link";

const nextConfig: NextConfig = {
  // Server-mode build (so `next start` works on Hostinger), same as FTROU.
  trailingSlash: true,
  images: { unoptimized: true },

  // The Apple association file sets its own Content-Type from a route handler
  // (app/.well-known/apple-app-site-association/route.ts) rather than here.
  // A header rule was not enough: the file has no extension and Hostinger's CDN
  // serves public/ directly, so the response went out with no Content-Type and
  // none of these headers applied to it at all.
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },

  // Rewrite (not redirect) so the shared URL stays in the address bar and the
  // universal-link match on the app side is not broken by a 30x hop.
  async rewrites() {
    return [
      { source: "/d/:slug", destination: `${SHARE_LINK_FN}/d/:slug` },
      { source: "/v/:reference", destination: `${SHARE_LINK_FN}/v/:reference` },
    ];
  },
};

export default nextConfig;
