/**
 * /kindness/ — the public ledger.
 *
 * Received is read from Paystack, Given from Supabase, and neither is typed by
 * hand. Revalidates every five minutes: a ledger nobody has to remember to
 * refresh is the only kind that stays true.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GIVING, HELLO_EMAIL } from "@/lib/site";
import {
  fetchKindnessEntries,
  fetchKindnessReceived,
  KINDNESS_PAGE,
} from "@/lib/kindness";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — The kindness ledger" },
  description:
    "Every rand of the kindness half of giving to InSpiritInTruth, and what it paid for.",
  alternates: { canonical: "/kindness/" },
};

/** A figure we could not read is shown as a dash, never as zero. */
function rands(value: number | null): string {
  if (value === null) return "—";
  return `${GIVING.currency}${value.toLocaleString("en-ZA")}`;
}

function Figure({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-well border border-border bg-surface p-6">
      <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
        {label}
      </p>
      <p className="nums mt-3 text-[2rem] font-medium leading-none tracking-[-0.03em] text-ink">
        {value}
      </p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{note}</p>
    </div>
  );
}

export default async function KindnessPage() {
  const [entries, received] = await Promise.all([
    fetchKindnessEntries(),
    fetchKindnessReceived(),
  ]);

  const given = entries ? entries.reduce((sum, e) => sum + e.amount, 0) : null;
  // Only meaningful when both sides are known.
  const held = received !== null && given !== null ? received - given : null;

  return (
    <div className="bg-bg">
      <article className="mx-auto max-w-content px-5 py-24 sm:px-8 sm:py-32">
        <Link
          href="/#give"
          className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Giving
        </Link>

        <h1 className="mt-8 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
          {KINDNESS_PAGE.title}
        </h1>

        <div className="mt-6 max-w-reading space-y-4">
          {KINDNESS_PAGE.intro.map((para) => (
            <p key={para} className="text-pretty leading-relaxed text-ink">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-8 max-w-reading rounded-well border border-border bg-surface p-6">
          <h2 className="font-medium text-ink">
            {KINDNESS_PAGE.notACharity.title}
          </h2>
          <p className="mt-2 text-pretty leading-relaxed text-muted">
            {KINDNESS_PAGE.notACharity.body}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <Figure
            label="Received"
            value={rands(received)}
            note={KINDNESS_PAGE.receivedNote}
          />
          <Figure
            label="Given"
            value={rands(given)}
            note={KINDNESS_PAGE.givenNote}
          />
          <Figure
            label={held !== null && held < 0 ? "Given ahead" : "Held"}
            value={rands(held === null ? null : Math.abs(held))}
            note={
              held !== null && held < 0
                ? KINDNESS_PAGE.aheadNote
                : KINDNESS_PAGE.heldNote
            }
          />
        </div>

        <div className="mt-16">
          {entries === null ? (
            <p className="max-w-reading text-pretty leading-relaxed text-muted">
              {KINDNESS_PAGE.unavailable}
            </p>
          ) : entries.length === 0 ? (
            <p className="max-w-reading text-pretty leading-relaxed text-muted">
              {KINDNESS_PAGE.empty}
            </p>
          ) : (
            <ul className="space-y-10">
              {entries.map((entry) => (
                <li key={entry.id} className="border-t border-border pt-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h2 className="text-pretty text-lg font-medium text-ink">
                      {entry.title}
                    </h2>
                    <span className="nums font-medium text-accent-deep">
                      {rands(entry.amount)}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.9375rem] text-faint">
                    <time dateTime={entry.happenedOn}>
                      {new Date(entry.happenedOn).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    {" · "}
                    {entry.recipient}
                  </p>
                  {entry.note && (
                    <p className="mt-4 max-w-reading text-pretty leading-relaxed text-muted">
                      {entry.note}
                    </p>
                  )}
                  {entry.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entry.photoUrl}
                      alt=""
                      className="mt-5 w-full max-w-reading rounded-well border border-border"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8">
          <Link
            href="/#give"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent-deep"
          >
            Give
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/giving-faq/"
            className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            Giving FAQs
          </Link>
          <a
            href={`mailto:${HELLO_EMAIL}?subject=The%20kindness%20ledger`}
            className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            Question about a line here?
          </a>
        </div>
      </article>
    </div>
  );
}
