/**
 * Proxy for the share-link edge function.
 *
 * WHY THIS EXISTS: Supabase rewrites any text/html response to text/plain on
 * the default *.supabase.co domain — documented behaviour ("serving of HTML
 * content is only supported with custom domains"), and their anti-phishing
 * measure for a shared hostname. A Next.js REWRITE streams those degraded
 * headers straight through, so a shared devotional rendered as raw markup in
 * the browser, with the charset dropped too (a "·" arrived as "Â·").
 *
 * Fetching the function server-side and re-emitting the body under OUR
 * Content-Type sidesteps that entirely: the HTML is unchanged, only the
 * header is ours. This is also why the /d and /v rewrites were removed from
 * next.config.mjs — a rewrite cannot set the header, a route handler can.
 *
 * The user-agent is forwarded because the function branches on it (store
 * redirect once the listings exist, and the platform-correct "open in the
 * app" link), and redirects are mirrored rather than followed so that
 * behaviour still works through this hop.
 */

const SHARE_LINK_FN =
  "https://xjhkvphnxzuqookjqkjc.supabase.co/functions/v1/share-link";

export async function proxyShareLink(
  req: Request,
  kind: "d" | "v",
  value: string,
): Promise<Response> {
  const upstream = await fetch(`${SHARE_LINK_FN}/${kind}/${encodeURIComponent(value)}`, {
    headers: {
      "user-agent": req.headers.get("user-agent") ?? "",
      "accept-language": req.headers.get("accept-language") ?? "",
    },
    // Mirror a 302 instead of following it, so the store redirect stays a
    // redirect for the phone rather than being resolved here.
    redirect: "manual",
  });

  const location = upstream.headers.get("location");
  if (location && upstream.status >= 300 && upstream.status < 400) {
    return new Response(null, {
      status: upstream.status,
      headers: { Location: location, "Cache-Control": "no-store" },
    });
  }

  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: {
      // The whole point: our header, not the one Supabase forced.
      "Content-Type": "text/html; charset=utf-8",
      // A share link must never be cached — the devotional behind a slug can
      // be unshared, and the preview crawlers should always see current data.
      "Cache-Control": "no-store",
      // Belt and braces: this page's "open in the app" link is chosen from
      // the User-Agent, so any cache that ignores no-store must at least not
      // serve an Android intent:// URL to an iPhone.
      Vary: "User-Agent",
    },
  });
}
