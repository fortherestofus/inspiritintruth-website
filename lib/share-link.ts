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

/**
 * SHARE-LINK OPENS, counted anonymously (2026-10-14).
 *
 * These routes are server handlers, so the browser PostHog script never
 * runs on them and a link someone opened was invisible, which left the
 * growth loop (share, open, install, sign up) unmeasurable at its first
 * step. This sends ONE server-side event per request.
 *
 * What it carries, and nothing else: whether it was a devotional or a verse
 * link, and a coarse class of who asked ("preview" = a chat app or social
 * crawler building the link card; "ios" / "android" / "desktop" = a person).
 * NOT the slug or reference (a slug identifies one devotional, and so one
 * sender), NOT the IP, NOT the user-agent string. `$process_person_profile:
 * false` means no person is created, and the id is random per request, so
 * it cannot be joined to anyone. Same public project key as the browser
 * script (a PostHog project key can only send events). Fire-and-forget: the
 * reader's page never waits on analytics, and a failure is silent.
 */
const POSTHOG_KEY = "phc_wWTjtN8SbviS5ANvbAEiZmH5dZEVCBodMsbKmE6D2PB8";
const POSTHOG_CAPTURE = "https://eu.i.posthog.com/capture/";

function visitorClass(ua: string): "preview" | "ios" | "android" | "desktop" {
  if (/bot|crawler|spider|preview|facebookexternalhit|whatsapp|slack|telegram|discord|twitter|linkedin|skype|embedly|quora|pinterest/i.test(ua)) {
    return "preview";
  }
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

function recordOpen(kind: "d" | "v", ua: string): void {
  try {
    void fetch(POSTHOG_CAPTURE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: POSTHOG_KEY,
        event: "share_link_opened",
        distinct_id: crypto.randomUUID(),
        properties: {
          kind: kind === "d" ? "devotional" : "verse",
          visitor: visitorClass(ua),
          $process_person_profile: false,
          $lib: "share-link-proxy",
        },
      }),
    }).catch(() => {});
  } catch {
    /* analytics must never be the reason a shared link fails */
  }
}

export async function proxyShareLink(
  req: Request,
  kind: "d" | "v",
  value: string,
): Promise<Response> {
  recordOpen(kind, req.headers.get("user-agent") ?? "");
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
