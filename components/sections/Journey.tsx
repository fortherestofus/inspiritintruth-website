/**
 * Journey — the tailored-devotional flow shown with real captures from one
 * real run. Story beat 2 makes the promise; this section is the proof. The
 * screenshots stay exactly as taken (LTE, 15% battery, 08:25 on the clock):
 * we seek God randomly, and honesty is the point.
 */
import Phone from "@/components/ui/Phone";
import { JOURNEY } from "@/lib/content";

export default function Journey() {
  return (
    <section id="journey" className="scroll-mt-24 border-y border-border bg-sunken px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-content">
        <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
          {JOURNEY.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
          {JOURNEY.title}
        </h2>
        <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          {JOURNEY.intro}
        </p>

        {/* The three steps, numbered */}
        <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {JOURNEY.steps.map((step, i) => (
            <div key={step.label} className="flex flex-col">
              <Phone src={step.image} alt={step.label} className="max-w-[240px]" />
              <div className="mx-auto mt-7 flex max-w-[240px] items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <span className="nums text-[0.8125rem] font-medium text-accent-deep">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <p className="font-medium text-ink">{step.label}</p>
                  <p className="mt-1 text-pretty text-[0.9375rem] leading-relaxed text-muted">
                    {step.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The clock tells the truth: two minutes, start to finish */}
        <p className="nums mt-10 text-center text-[0.9375rem] text-faint">
          {JOURNEY.timeNote}
        </p>

        {/* Excerpt as real text — crisper than a crop, and it reads like the app */}
        <figure className="mx-auto mt-14 max-w-reading rounded-block border border-border bg-surface p-8 shadow-card sm:p-12">
          <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
            {JOURNEY.excerpt.lead}
          </p>
          <blockquote className="mt-6 border-l-2 border-accent pl-6 font-serif text-lg leading-[1.7] text-ink">
            {JOURNEY.excerpt.text}
          </blockquote>
          <figcaption className="mt-6 text-[0.9375rem] text-muted">
            &ldquo;{JOURNEY.excerpt.source}&rdquo; &mdash; a tailored devotional
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
