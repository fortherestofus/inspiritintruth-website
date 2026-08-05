/**
 * Vision + Note from Alroy — the "Website only" copy from copy.md.
 *
 * This occupies the slot the Housemait example gives to reviews. There are no
 * reviews yet, and for an app built out of one person's need the founder's
 * note does more work than testimonials would.
 */
import Image from "next/image";
import { VISION, NOTE_FROM_ALROY } from "@/lib/content";

export default function Vision() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-content">
        {/* The verse the app is named for */}
        <figure className="mx-auto max-w-reading text-center">
          <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
            {VISION.eyebrow}
          </p>
          <blockquote className="mt-6 text-balance text-[1.5rem] font-medium leading-[1.3] tracking-[-0.02em] text-ink sm:text-[2rem]">
            &ldquo;{VISION.verse}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-accent-deep">{VISION.verseRef}</figcaption>
        </figure>

        {/* Stays centred with the verse: the two read as one statement of
            intent, so splitting the alignment mid-column only looked like
            broken centring. Held narrower than the reading column because
            centred lines get harder to track the longer they run. */}
        <div className="mx-auto mt-12 max-w-[38rem] space-y-4 text-center">
          <p className="text-pretty text-lg leading-relaxed text-ink">{VISION.body}</p>
          <p className="text-pretty leading-relaxed text-muted">{VISION.backstory}</p>
        </div>

        {/* Note from Alroy — left-aligned, and far enough down that the change
            reads as a new voice rather than a stray paragraph. */}
        <div className="mx-auto mt-20 max-w-reading rounded-block border border-border bg-surface p-8 shadow-card sm:p-12">
          <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
            {NOTE_FROM_ALROY.eyebrow}
          </p>

          <div className="mt-7 space-y-4">
            {NOTE_FROM_ALROY.paragraphs.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
            <Image
              src="/alroy-ndhlovu.jpg"
              alt="Alroy Ndhlovu"
              width={400}
              height={500}
              className="h-14 w-14 shrink-0 rounded-full object-cover object-top"
            />
            <div>
              <p className="font-medium text-ink">{NOTE_FROM_ALROY.name}</p>
              <p className="text-[0.875rem] text-faint">{NOTE_FROM_ALROY.role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
