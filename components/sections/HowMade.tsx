/**
 * How our devotions are made — the transparency section. This is the trust
 * slot (where the Housemait example puts "Private by design"), and for this
 * app honesty about the AI is the thing that earns trust.
 */
import { BadgeCheck } from "lucide-react";
import { HOW_MADE } from "@/lib/content";

export default function HowMade() {
  return (
    <section
      id="how-made"
      className="scroll-mt-24 border-y border-border bg-sunken px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid max-w-content gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
            {HOW_MADE.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
            {HOW_MADE.title}
          </h2>

          <div className="mt-8 space-y-4">
            {HOW_MADE.paragraphs.map((p) => (
              <p key={p} className="text-pretty leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {HOW_MADE.markers.map((marker, i) => (
            <div
              key={marker.label}
              className="flex items-start gap-4 rounded-well border border-border bg-surface p-6 shadow-card"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                <span className="nums text-[0.8125rem] font-medium text-accent-deep">
                  {i + 1}
                </span>
              </span>
              <div>
                <p className="font-medium text-ink">{marker.label}</p>
                <p className="mt-1 text-pretty leading-relaxed text-muted">
                  {marker.note}
                </p>
              </div>
            </div>
          ))}

          <div className="flex items-start gap-4 rounded-well border border-accent/30 bg-accent-soft p-6">
            <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-accent-deep" />
            <p className="text-pretty leading-relaxed text-ink">
              Where something slips through, we trust our community to tell us
              &mdash; so we keep getting better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
