/**
 * "Leave a review": https://inspiritintruth.net/rate
 *
 * WHY A WEB HOP AND NOT AN IN-APP ROUTE: an announcement is ONE row shown
 * to every reader, so its CTA is one string — and the review destination
 * is platform-specific (App Store vs Play). The only place that choice can
 * be made per reader without an app release is here, from the User-Agent.
 * It also means the same link works in a push, an email or a post, and on
 * every installed bundle, including ones that will never take another OTA.
 *
 * iOS gets `?action=write-review`, which opens the App Store straight on
 * the review sheet — Apple allows the LINK; what guideline 1.1.7 forbids
 * is a custom prompt standing in for SKStoreReviewController. Play has no
 * equivalent parameter, so Android lands on the listing, where the rating
 * control is the first thing on the page. Desktop gets both links rather
 * than a redirect, because neither store lets you review from a browser.
 *
 * /rate is NOT claimed by the app (the association files cover /d/* and
 * /v/* only), so a tap inside the app opens the browser and hands off to
 * the store app from there — which is what we want.
 */

export const dynamic = "force-dynamic";

const APP_STORE =
  "https://apps.apple.com/app/inspiritintruth-devotional/id6795657774?action=write-review";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.fortherestofus.inspirit";

const PAGE = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Rate InSpiritInTruth</title>
  <meta name="robots" content="noindex" />
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center;
           background: #0A0A0B; color: #FDFBF7;
           font: 17px/1.5 -apple-system, system-ui, sans-serif; }
    main { max-width: 26rem; padding: 2rem; text-align: center; }
    h1 { font-size: 1.35rem; line-height: 1.3; margin: 0 0 .75rem; }
    p { color: #b9b5ad; margin: 0 0 1.5rem; }
    .btn { display: inline-block; margin: 0 .35rem .6rem; background: #9fe870;
           color: #0A0A0B; text-decoration: none; font-weight: 600;
           padding: .85rem 1.6rem; border-radius: 999px; }
  </style>
</head>
<body>
  <main>
    <h1>Rate InSpiritInTruth</h1>
    <p>Reviews are left in the store on your phone. Open one of these there.</p>
    <a class="btn" href="${APP_STORE}">App Store</a>
    <a class="btn" href="${PLAY_STORE}">Google Play</a>
  </main>
</body>
</html>`;

export function GET(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  const store = /iphone|ipad|ipod/i.test(ua)
    ? APP_STORE
    : /android/i.test(ua)
      ? PLAY_STORE
      : null;

  if (store) {
    return new Response(null, {
      status: 302,
      headers: { Location: store, "Cache-Control": "no-store", Vary: "User-Agent" },
    });
  }

  return new Response(PAGE, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // MUST NOT be shared-cached: the response is chosen from the
      // User-Agent, so one cached copy would send iPhones to Play.
      "Cache-Control": "no-store",
      Vary: "User-Agent",
    },
  });
}
