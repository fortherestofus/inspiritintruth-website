/**
 * Pricing — two columns, deliberately plain. The point of the section is that
 * the free tier is genuinely usable, so it leads.
 */
import { Check } from "lucide-react";
import { PRICING } from "@/lib/site";

const FREE = [
  "The weekly devotional",
  "Three tailored devotionals to start",
  "The full Bible reader, multiple versions",
  "A verse each day",
  "Bookmarks, notes and reading plans",
  "Your streak",
];

const PREMIUM = [
  "Everything in Free",
  "Unlimited tailored devotionals",
  "Deeper reflections",
  "Support the work directly",
];

export default function Pricing() {
  return (
    <section className="border-y border-border bg-sunken px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-content">
        <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
          Pricing
        </p>
        <h2 className="mt-4 max-w-2xl text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
          Free to use, properly. Premium if you want more.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-block border border-border bg-surface p-8 shadow-card">
            <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              {PRICING.freeLabel}
            </p>
            <p className="mt-4 text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-ink">
              {PRICING.freePrice}
            </p>
            <p className="mt-3 text-muted">No ads. No algorithm. No catch.</p>
            <ul className="mt-7 space-y-3">
              {FREE.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-block border border-accent/40 bg-surface p-8 shadow-card">
            <div className="flex items-center gap-3">
              <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-accent-deep">
                {PRICING.premiumLabel}
              </p>
            </div>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="nums text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-ink">
                {PRICING.premiumPrice}
              </span>
              <span className="text-muted">{PRICING.premiumPeriod}</span>
            </p>
            <p className="mt-3 text-muted">
              {PRICING.premiumAnnualNote}. Cancel anytime, from your app store.
            </p>
            <ul className="mt-7 space-y-3">
              {PREMIUM.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-[0.9375rem] text-faint">
          Premium is a subscription. Giving is a gift &mdash; the two are
          entirely separate, and giving is never required.
        </p>
      </div>
    </section>
  );
}
