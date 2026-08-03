/**
 * What's inside — the six-card grid, straight from copy.md's WHAT'S INSIDE.
 */
import {
  BookOpen,
  Flame,
  Layers,
  Moon,
  Quote,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { INSIDE } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  BookOpen,
  Layers,
  Quote,
  Flame,
  Moon,
};

export default function Inside() {
  return (
    <section id="inside" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-content">
        <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
          What&rsquo;s inside
        </p>
        <h2 className="mt-4 max-w-2xl text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
          Everything you need to keep a real practice going.
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INSIDE.map((item) => {
            const Icon = ICONS[item.icon] ?? Sparkles;
            return (
              <div
                key={item.title}
                className="rounded-well border border-border bg-surface p-7 shadow-card transition-shadow duration-200 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                  <Icon className="h-5 w-5 text-accent-deep" />
                </span>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-pretty leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
