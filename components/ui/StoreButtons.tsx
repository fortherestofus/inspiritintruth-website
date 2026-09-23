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
"use client";

import Image from "next/image";
import posthog from "posthog-js";

import { STORE_LINKS, APP_IS_LIVE } from "@/lib/site";
import { getTrafficSource, taggedStoreLink } from "@/lib/traffic-source";

const BADGE_HEIGHT = 48;
const BADGE_WIDTH = Math.round(BADGE_HEIGHT * 3.375);

function Badge({
  href,
  src,
  alt,
  platform,
}: {
  href: string | null;
  src: string;
  alt: string;
  platform: "ios" | "android";
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
      // noopener but NOT noreferrer: the store needs to see this site as the
      // referrer to credit it in App Store Connect's "Web Referrer" report.
      rel="noopener"
      className="inline-flex transition-transform duration-200 hover:-translate-y-0.5"
      // The one click on this site worth measuring: it is the last thing
      // we can see before an install, which carries no referrer of its own.
      // The source tag is added at click time, not render time, so server
      // and client render the same href.
      onClick={(e) => {
        const tagged = taggedStoreLink(platform);
        if (tagged) e.currentTarget.href = tagged;
        posthog.capture("store_badge_clicked", {
          platform,
          source: getTrafficSource() ?? "direct",
        });
      }}
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
          platform="ios"
        />
        <Badge
          href={STORE_LINKS.android}
          src="/icons/google-play-badge-2022-2.svg"
          alt="Get it on Google Play"
          platform="android"
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
