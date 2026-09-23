/**
 * PostHog web analytics — inspiritintruth.net.
 *
 * WHY IT EXISTS: the one step before an install that is actually
 * measurable. An app install carries no referrer, so nothing can tell
 * you where a download came from (that lives in App Store Connect and
 * Play Console). What IS knowable is how many people reach this site and
 * then tap through to a store badge — which is the only evidence this
 * site earns its keep.
 *
 * COOKIELESS, DELIBERATELY. `cookieless_mode: 'always'` means PostHog
 * stores nothing in cookies, localStorage or sessionStorage. No consent
 * banner is needed, because there is nothing to consent to — which
 * matches the promise the app makes rather than fighting it. The
 * trade-off is real and accepted: no cross-visit identity, and country
 * is not resolved on web events (PostHog strips the IP before its GeoIP
 * step in this mode). Neither costs us the question we are asking.
 *
 * Events go to the SAME project as the app (279600), so a visit and an
 * app open sit in one place. They are distinguishable by `$host` and by
 * `$lib` being `web` rather than `posthog-react-native`.
 */
import posthog from "posthog-js";

import { getTrafficSource } from "@/lib/traffic-source";

/**
 * Written here rather than read from an env var, on purpose. A PostHog
 * PROJECT key only permits sending events, and `NEXT_PUBLIC_*` values
 * are inlined into the client bundle at build time anyway — so an env
 * var would be exactly as public as this constant, while adding a way
 * for the build on Hostinger to silently end up without it and quietly
 * collect nothing. EU cloud; the US host ingests nothing.
 */
const KEY = "phc_wWTjtN8SbviS5ANvbAEiZmH5dZEVCBodMsbKmE6D2PB8";
// Our own domain, proxied to PostHog's EU ingest by the rewrites in
// next.config.mjs — so an ad blocker doesn't silently drop the visit.
const HOST = "/ingest";
const UI_HOST = "https://eu.posthog.com";

if (process.env.NODE_ENV === "production") {
  posthog.init(KEY, {
    api_host: HOST,
    ui_host: UI_HOST,
    // No cookies, no local storage, no banner. See the note above.
    cookieless_mode: "always",
    // Left at the default (capture on page load). `history_change` was
    // tried first and measurably did NOT fire the initial $pageview on
    // this site — production showed three $pageleave events and zero
    // $pageview, i.e. exits recorded with no visits. This is a mostly
    // static marketing site where navigation is full page loads anyway,
    // so page-load pageviews are both correct and simpler.
    // Autocapture would record clicks on every element including the
    // text inside them. The store-badge click is captured explicitly in
    // components/ui/StoreButtons.tsx, which is the only click that
    // answers a question we actually have.
    autocapture: false,
    // Nothing here is worth recording someone's screen for, and the
    // app's policy says we never do.
    disable_session_recording: true,
    capture_heatmaps: false,
    // Page-speed numbers (LCP, CLS, INP, FCP) for the Web Vitals tab.
    capture_performance: { web_vitals: true },
  });

  // Fired explicitly rather than left to `capture_pageview`.
  // MEASURED, not assumed: with `history_change` the site produced
  // $pageleave events and no $pageview at all, and removing the option
  // (so it fell back to the library default) changed nothing — exits
  // recorded with no visits, which is worse than no data because it
  // looks like it works. One explicit call is deterministic, and the
  // thing being counted here is page loads anyway.
  posthog.capture("$pageview");
}

// Read the visit's source on first load, before a client-side navigation
// can drop `?utm_source=` from the URL. The store badges use it later.
getTrafficSource();
