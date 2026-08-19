/**
 * Shared Bible verse: https://inspiritintruth.net/v/<book.chapter.verse>
 * Same rationale as app/d/[slug]/route.ts.
 */
import { proxyShareLink } from "@/lib/share-link";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  const { reference } = await params;
  return proxyShareLink(req, "v", reference);
}
