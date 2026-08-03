/**
 * App Store / Google Play buttons.
 *
 * Badges are inline SVG so there are no image requests and they recolour with
 * the theme. Until STORE_LINKS has real URLs the buttons render disabled with
 * a "Coming soon" note — one edit in lib/site.ts turns every instance live.
 */
import { STORE_LINKS, APP_IS_LIVE } from "@/lib/site";

function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" className={className} fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className={className} fill="currentColor">
      <path d="M47.6 269.5 4.2 313c-1.4-5.6-2.2-11.5-2.2-17.6V216.6c0-6.1.8-12 2.2-17.6l43.4 43.5c-3.5 3.5-3.5 23.5 0 27zM325 195l-59-34.1L84.6 55.2c-5.6-3.2-11.4-5-17-5.5L242.3 224.6 325 195zM67.6 456.3c5.6-.5 11.4-2.3 17-5.5L266 345.1l59-34.1-82.7-29.6-174.7 175zM368 236.4l-63.7-36.8-88.7 88.7 88.7 88.7 63.7-36.8c22.5-13 22.5-40.7 0-53.7v-50.1z" />
    </svg>
  );
}

function StoreButton({
  href,
  mark,
  eyebrow,
  name,
  tone,
}: {
  href: string | null;
  mark: React.ReactNode;
  eyebrow: string;
  name: string;
  tone: "ink" | "light";
}) {
  const base =
    "inline-flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-200";
  const skin =
    tone === "ink"
      ? "bg-ink-text text-ink-surface hover:-translate-y-0.5 hover:shadow-pill"
      : "bg-ink text-bg hover:-translate-y-0.5 hover:shadow-pill";
  const dead =
    tone === "ink"
      ? "bg-ink-raised text-ink-muted border border-ink-border cursor-default"
      : "bg-surface text-faint border border-border cursor-default";

  const inner = (
    <>
      <span className="shrink-0">{mark}</span>
      <span className="flex flex-col text-left leading-none">
        <span className="text-[0.6875rem] opacity-70">{eyebrow}</span>
        <span className="mt-1 text-[0.9375rem] font-medium">{name}</span>
      </span>
    </>
  );

  if (!href) {
    return (
      <span className={`${base} ${dead}`} aria-disabled="true">
        {inner}
      </span>
    );
  }

  return (
    <a className={`${base} ${skin}`} href={href} target="_blank" rel="noreferrer">
      {inner}
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
        <StoreButton
          href={STORE_LINKS.ios}
          mark={<AppleMark className="h-6 w-6" />}
          eyebrow={STORE_LINKS.ios ? "Download on the" : "Coming to the"}
          name="App Store"
          tone={tone}
        />
        <StoreButton
          href={STORE_LINKS.android}
          mark={<PlayMark className="h-6 w-6" />}
          eyebrow={STORE_LINKS.android ? "Get it on" : "Coming to"}
          name="Google Play"
          tone={tone}
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
