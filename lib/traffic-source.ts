/**
 * Where this visit came from — "tiktok", "instagram", "google" — so a tap
 * on a store badge can carry it into the App Store / Play link.
 *
 * WHY: an install has no referrer of its own. The stores only know a
 * source if the link that sent someone there says so. Tagging the badge
 * link lets Play Console (and App Store Connect, once a provider token is
 * set in lib/site.ts) split installs by the social account that started
 * the visit.
 *
 * Held in memory only, never in storage — the site promises nothing is
 * stored in the browser. That still survives navigation here: client-side
 * route changes keep `document.referrer` as the original external one,
 * and the value is read once on first load (instrumentation-client.ts)
 * before any `?utm_source=` can drop off the URL.
 */
import { SITE_URL, STORE_LINKS, APPLE_PROVIDER_TOKEN } from "@/lib/site";

/** Hostname suffix → the label we want to see in the store dashboards. */
const KNOWN_SOURCES: [string, string][] = [
  ["tiktok.com", "tiktok"],
  ["instagram.com", "instagram"],
  ["facebook.com", "facebook"],
  ["fb.com", "facebook"],
  ["threads.net", "threads"],
  ["threads.com", "threads"],
  ["t.co", "x"],
  ["x.com", "x"],
  ["twitter.com", "x"],
  ["youtube.com", "youtube"],
  ["whatsapp.com", "whatsapp"],
  ["linkedin.com", "linkedin"],
  ["lnkd.in", "linkedin"],
  ["pinterest.com", "pinterest"],
  ["bing.com", "bing"],
  ["duckduckgo.com", "duckduckgo"],
];

const SOCIAL = new Set([
  "tiktok", "instagram", "facebook", "threads", "x", "youtube",
  "whatsapp", "linkedin", "pinterest",
]);
const SEARCH = new Set(["google", "bing", "duckduckgo"]);

const OWN_HOST = new URL(SITE_URL).hostname;

/** Store-safe label: lowercase letters, digits, dot, dash. */
function clean(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9.-]/g, "").slice(0, 30);
}

function fromReferrer(referrer: string): string | null {
  let host: string;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  if (!host || host === OWN_HOST || host.endsWith(`.${OWN_HOST}`)) return null;
  if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google";
  const hit = KNOWN_SOURCES.find(
    ([suffix]) => host === suffix || host.endsWith(`.${suffix}`),
  );
  return hit ? hit[1] : clean(host);
}

let cached: string | null | undefined;

/** The visit's source, or null for a direct visit. Read once, then fixed. */
export function getTrafficSource(): string | null {
  if (cached !== undefined) return cached;
  if (typeof window === "undefined") return null;
  const utm = new URLSearchParams(window.location.search).get("utm_source");
  cached = utm ? clean(utm) || null : fromReferrer(document.referrer);
  return cached;
}

function medium(source: string): string {
  if (SOCIAL.has(source)) return "social";
  if (SEARCH.has(source)) return "search";
  return "referral";
}

/**
 * The store link with the source attached. `utm_campaign=website` marks
 * every install that came through this site, so a direct visit still
 * shows up as "website" rather than nothing.
 */
export function taggedStoreLink(platform: "ios" | "android"): string | null {
  const base = STORE_LINKS[platform];
  if (!base) return null;
  const source = getTrafficSource();
  const url = new URL(base);

  if (platform === "android") {
    const referrer = new URLSearchParams({
      utm_source: source ?? "website",
      utm_medium: source ? medium(source) : "direct",
      utm_campaign: "website",
    });
    url.searchParams.set("referrer", referrer.toString());
    return url.toString();
  }

  // Apple ignores `ct` without the provider token, so leave the link
  // untouched until there is one. App Store Connect still credits
  // inspiritintruth.net as a web referrer in the meantime.
  if (!APPLE_PROVIDER_TOKEN) return base;
  url.searchParams.set("pt", APPLE_PROVIDER_TOKEN);
  url.searchParams.set("ct", `web-${source ?? "direct"}`.slice(0, 40));
  url.searchParams.set("mt", "8");
  return url.toString();
}
