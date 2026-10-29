/**
 * iPhone Duo — one short clip of the app on the foldable, after What's inside.
 * Plays on request (no autoplay) so motion is the reader's choice and the
 * 0.9 MB file only loads when asked for.
 */
import { DUO } from "@/lib/content";

export default function Duo() {
  return (
    <section id="duo" className="scroll-mt-24 px-5 pb-24 sm:px-8 sm:pb-32">
      <div className="mx-auto max-w-content">
        <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
          {DUO.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
          {DUO.title}
        </h2>
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">{DUO.body}</p>

        <video
          className="mt-10 block aspect-[16/10] w-full rounded-well border border-border bg-surface shadow-card"
          src={DUO.video}
          poster={DUO.poster}
          aria-label={DUO.videoLabel}
          preload="none"
          controls
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}
