/**
 * App Store / Google Play buttons.
 *
 * These are Apple's and Google's official badges, used as supplied — both
 * carry their own wordmark and neither may be recoloured, re-typeset or
 * rebuilt, so they are dropped in whole rather than composed from an icon plus
 * our own text. Both artworks share a 3.375:1 ratio, so one height keeps them
 * level.
 *
 * Until STORE_LINKS has real URLs the badges are not links, and the "Launching
 * soon" note carries that instead — the badge itself stays unmodified rather
 * than being dimmed. One edit in lib/site.ts turns every instance live.
 */
import Image from "next/image";
import { STORE_LINKS, APP_IS_LIVE } from "@/lib/site";

const BADGE_HEIGHT = 48;
const BADGE_WIDTH = Math.round(BADGE_HEIGHT * 3.375);

function Badge({
  href,
  src,
  alt,
}: {
  href: string | null;
  src: string;
  alt: string;
}) {
  const img = (
    <Image
      src={src}
      alt={alt}
      width={BADGE_WIDTH}
      height={BADGE_HEIGHT}
      className="h-12 w-auto"
    />
  );

  if (!href) {
    // Not a link yet, and deliberately not styled as a dead one: dimming or
    // greying the badge would be a modification of someone else's mark.
    return (
      <span aria-disabled="true" className="inline-flex cursor-default">
        {img}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex transition-transform duration-200 hover:-translate-y-0.5"
    >
      {img}
    </a>
  );
}

export default function StoreButtons({
  tone = "light",
  className = "",
}: {
  tone?: "ink" | "light";
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          href={STORE_LINKS.ios}
          src="/icons/download-on-the-app-store-1.svg"
          alt="Download on the App Store"
        />
        <Badge
          href={STORE_LINKS.android}
          src="/icons/google-play-badge-2022-2.svg"
          alt="Get it on Google Play"
        />
      </div>
      {!APP_IS_LIVE && (
        <p
          className={`mt-3 text-[0.8125rem] ${
            tone === "ink" ? "text-ink-muted" : "text-faint"
          }`}
        >
          Launching soon on iOS and Android.
        </p>
      )}
    </div>
  );
}
