/**
 * Shared devotional: https://inspiritintruth.net/d/<slug>
 *
 * A route handler rather than a rewrite so the response carries our own
 * Content-Type — see lib/share-link.ts for why that matters.
 *
 * Phones WITH the app installed never reach this: the verified App Link /
 * Universal Link opens the app first. It is reached from desktop, from
 * phones without the app, by preview crawlers, and from in-app browsers
 * (X, Instagram, Gmail) that refuse to hand the tap to the system.
 */
import { proxyShareLink } from "@/lib/share-link";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return proxyShareLink(req, "d", slug);
}
