/**
 * The share card for a devotional: https://inspiritintruth.net/og/d/<slug>
 *
 * A rendered 1200x630 PNG — ink ground, the wordmark, the title in Apfel
 * Grotezk and the key verse in Lora — served as `og:image` for every
 * shared devotional.
 *
 * WHY RENDER RATHER THAN SERVE THE HERO. A devotional written in the app
 * has no `image_url` at all: its header is one of 45 images bundled INTO
 * the app and picked on the phone by a hash (see the app's
 * `aiDevotionalBackground`), so the row carries nothing the web could
 * serve and those shares previewed with no picture. Publishing the same
 * bundled images here and re-implementing that hash was the alternative,
 * and it would put the picker in two languages, to drift the first time
 * one gains an image. A card also beats a hero where one DOES exist:
 * platforms crop a portrait photo badly at 1.91:1, and the words are
 * what earn the tap.
 *
 * Teaser discipline holds: title and key verse only, never the body.
 *
 * Data comes from the share-link function's /meta/d/<slug> endpoint so
 * this route needs no Supabase key of its own.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

const META =
  "https://xjhkvphnxzuqookjqkjc.supabase.co/functions/v1/share-link/meta/d";

const INK = "#0A0A0B";
const CREAM = "#F6F1E9";
const MUTED = "#B9B3A8";
const GOLD = "#C9933A";

type Meta = { title: string; verse: string | null; by: string | null };

/** Fonts are read from disk: Satori takes TTF/OTF/WOFF — never WOFF2,
 *  which is all the site itself ships. */
async function font(file: string) {
  return readFile(path.join(process.cwd(), "fonts", "og", file));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let meta: Meta | null = null;
  try {
    const res = await fetch(`${META}/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (res.ok) meta = (await res.json()) as Meta;
  } catch {
    /* fall through to the generic card — a preview must never 500 */
  }

  const title = meta?.title ?? "A devotional shared with you";
  const verse = meta?.verse ?? null;
  const by = meta?.by ?? null;

  const [mittel, regular, lora, lockup] = await Promise.all([
    font("ApfelGrotezk-Mittel.otf"),
    font("ApfelGrotezk-Regular.otf"),
    font("Lora_400Regular.ttf"),
    readFile(path.join(process.cwd(), "public", "icons", "logo-lockup-cream.png")),
  ]);

  // A long title has to shrink or it pushes the verse off the card.
  const titleSize = title.length > 78 ? 56 : title.length > 52 ? 66 : 76;
  // And a long verse has to be trimmed. Satori has no line clamp, so an
  // over-long block simply grows — which, under `space-between`, pushed
  // the text UP and over the wordmark (caught rendering Ephesians 6:12,
  // a three-line verse). Trim on a word boundary; the recipient reads
  // the whole thing in the app, which is the point of a teaser.
  const VERSE_MAX = 150;
  const trimmedVerse =
    verse && verse.length > VERSE_MAX
      ? `${verse.slice(0, verse.lastIndexOf(" ", VERSE_MAX))}…”`
      : verse;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: "64px 72px",
          fontFamily: "Apfel",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${lockup.toString("base64")}`}
          width={232}
          height={94}
          alt="InSpiritInTruth"
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
            paddingTop: 28,
            paddingBottom: 16,
          }}
        >
          <div style={{ width: 64, height: 3, background: GOLD, marginBottom: 28 }} />
          <div
            style={{
              fontFamily: "ApfelMittel",
              fontSize: titleSize,
              lineHeight: 1.12,
              color: CREAM,
              letterSpacing: -1.5,
              // Satori has no line clamp; the shrink above plus this cap
              // keeps even a very long title inside the card.
              display: "block",
            }}
          >
            {title}
          </div>
          {trimmedVerse ? (
            <div
              style={{
                fontFamily: "Lora",
                fontSize: 30,
                lineHeight: 1.45,
                color: MUTED,
                marginTop: 26,
                display: "block",
              }}
            >
              {trimmedVerse}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: MUTED }}>
          {by ? `Shared by ${by} · inspiritintruth.net` : "inspiritintruth.net"}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Apfel", data: regular, weight: 400, style: "normal" },
        { name: "ApfelMittel", data: mittel, weight: 500, style: "normal" },
        { name: "Lora", data: lora, weight: 400, style: "normal" },
      ],
      headers: {
        // Crawlers refetch often; the card only changes if the devotional
        // is retitled. Short enough that an unshare stops mattering fast.
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    },
  );
}
