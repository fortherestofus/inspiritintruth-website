/**
 * /kindness/ — the public ledger.
 *
 * Received is read from Paystack, Given from Supabase, and neither is typed by
 * hand. Revalidates every five minutes: a ledger nobody has to remember to
 * refresh is the only kind that stays true.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sprout } from "lucide-react";
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

/**
 * One figure in the summary. Deliberately not a card — both of them live inside
 * a single well so the summary reads as one instrument rather than a row of
 * boxes each saying R0.
 */
function Figure({
  label,
  value,
  note,
  dot,
}: {
  label: string;
  value: string;
  note: string;
  /** Ties the figure to its band in the bar below. */
  dot?: string;
}) {
  return (
    <div className="px-6 py-6 sm:px-7 sm:py-7">
      <p className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-faint">
        {dot && <span className={`h-2 w-2 rounded-full ${dot}`} />}
        {label}
      </p>
      <p className="nums mt-2.5 text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-ink">
        {value}
      </p>
      <p className="mt-2 text-[0.875rem] leading-snug text-faint">{note}</p>
    </div>
  );
}

export default async function KindnessPage() {
  const [entries, money] = await Promise.all([
    fetchKindnessEntries(),
    fetchKindnessReceived(),
  ]);

  // Only what Paystack has actually paid counts as received. Money in transit
  // is not shown at all — the page reports what has landed, and nothing about
  // what is on its way.
  const received = money?.settled ?? null;

  const given = entries ? entries.reduce((sum, e) => sum + e.amount, 0) : null;
  // Only meaningful when both sides are known.
  const held = received !== null && given !== null ? received - given : null;
  // The bar divides what has landed. It is meaningless before anything has,
  // and misleading when we have given ahead of settlement.
  const showBar = received !== null && received > 0 && held !== null && held >= 0;

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

        {/* The fund in two numbers, in the order the money moves: what came in
            for kindness, and what has gone out of it. What is still held is the
            difference, and is shown by the bar rather than given a column of
            its own — a third figure that is only the other two subtracted adds
            a number without adding a fact. */}
        <div className="mt-12 overflow-hidden rounded-well border border-border bg-surface shadow-card">
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <Figure
              label="Received"
              value={rands(received)}
              note={KINDNESS_PAGE.receivedNote}
            />
            <Figure
              dot="bg-kindness"
              label="Given out"
              value={rands(given)}
              note={KINDNESS_PAGE.givenNote(entries?.length ?? 0)}
            />
          </div>

          {showBar && (
            <div className="border-t border-border px-6 py-6 sm:px-7 sm:py-7">
              {/* One bar divided, not two side by side — same shape as the
                  gift split on the giving section. */}
              <div className="flex h-2.5 overflow-hidden rounded-full bg-sunken">
                <div className="bg-kindness" style={{ flex: given ?? 0 }} />
                <div style={{ flex: held ?? 0 }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem] text-faint">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-kindness" />
                  {KINDNESS_PAGE.legend.given} {rands(given)}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full border border-border bg-sunken" />
                  {KINDNESS_PAGE.legend.held} {rands(held)}
                </span>
              </div>
            </div>
          )}

          {held !== null && held < 0 && (
            <p className="border-t border-border px-6 py-5 text-[0.875rem] leading-snug text-faint sm:px-7">
              {KINDNESS_PAGE.aheadNote}
            </p>
          )}
        </div>

        <div className="mt-16">
          {entries === null ? (
            <p className="max-w-reading text-pretty leading-relaxed text-muted">
              {KINDNESS_PAGE.unavailable}
            </p>
          ) : entries.length === 0 ? (
            <div className="rounded-well border border-border bg-sunken px-6 py-12 text-center">
              <Sprout className="mx-auto h-6 w-6 text-faint" aria-hidden />
              <p className="mx-auto mt-4 max-w-reading text-pretty leading-relaxed text-muted">
                {KINDNESS_PAGE.empty}
              </p>
            </div>
          ) : (
            <>
              {/* Statement rows: date rail, what it did, amount right-aligned
                  in tabular figures. The shape a ledger is expected to have. */}
              <ul>
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className="grid grid-cols-[1fr_auto] gap-x-6 border-t border-border py-7 sm:grid-cols-[8rem_1fr_auto]"
                  >
                    <time
                      dateTime={entry.happenedOn}
                      className="nums text-[0.875rem] text-faint sm:pt-1"
                    >
                      {new Date(entry.happenedOn).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>

                    {/* Amount sits beside the date on mobile and in its own
                        column on desktop, so it is never orphaned below the
                        note on a narrow screen. */}
                    <span className="nums text-right font-medium text-ink sm:order-last">
                      {rands(entry.amount)}
                    </span>

                    <div className="col-span-2 mt-2 sm:col-span-1 sm:mt-0">
                      <h2 className="text-pretty font-medium text-ink">
                        {entry.title}
                      </h2>
                      <p className="mt-1 text-[0.9375rem] text-muted">
                        {entry.recipient}
                      </p>
                      {entry.note && (
                        <p className="mt-3 max-w-reading text-pretty leading-relaxed text-muted">
                          {entry.note}
                        </p>
                      )}
                      {entry.photoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entry.photoUrl}
                          alt=""
                          className="mt-4 w-full max-w-sm rounded-card border border-border"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-reading border-t border-border pt-6 text-[0.9375rem] leading-relaxed text-faint">
                {KINDNESS_PAGE.withheldNote}
              </p>
            </>
          )}
        </div>

        {/* Footnotes. The correction still has to be here — giving half away
            invites the assumption that this is a charity — but it belongs at
            the foot of the page, not the head of it. */}
        <div className="mt-16 max-w-reading space-y-3 border-t border-border pt-8 text-[0.9375rem] leading-relaxed text-faint">
          <p className="text-pretty">{KINDNESS_PAGE.notACharity}</p>
          <p className="text-pretty">{KINDNESS_PAGE.newsletter}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
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
