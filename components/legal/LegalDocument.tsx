/**
 * LegalDocument — data-driven renderer for privacy, terms, and FAQ pages.
 * Sits on a narrow reading column so long copy stays comfortable.
 *
 * Ported from the ForTheRestOfUs studio site so both sites render the same
 * legal data identically. One addition here: `linkify` turns bare email
 * addresses and URLs in the copy into real links, which lets lib/legal.ts stay
 * plain data (no JSX) and therefore stay portable between the two repos.
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export interface LegalSection {
  id?: string;
  heading: string;
  body?: string[];
  bullets?: string[];
}

interface LegalDocumentProps {
  title: string;
  lastUpdated: string;
  backHref: string;
  backLabel: string;
  intro?: string[];
  sections: LegalSection[];
}

const TOKEN = /([\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s,)]+)/g;

/** Turn bare emails and URLs in plain-text copy into links. */
function linkify(text: string): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} className="text-accent-deep underline" href={`mailto:${part}`}>
          {part}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          className="text-accent-deep underline"
          href={part}
          target="_blank"
          rel="noreferrer"
        >
          {part.replace(/^https?:\/\//, "")}
        </a>
      );
    }
    return part;
  });
}

export default function LegalDocument({
  title,
  lastUpdated,
  backHref,
  backLabel,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <div className="bg-bg">
      <article className="mx-auto max-w-reading px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <h1 className="mt-9 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-4 text-[0.9375rem] text-faint">
          Last updated: {lastUpdated}
        </p>

        {intro && (
          <div className="mt-9 space-y-4 border-t border-border pt-9">
            {intro.map((paragraph, i) => (
              <p key={i} className="text-pretty text-lg leading-relaxed text-ink">
                {linkify(paragraph)}
              </p>
            ))}
          </div>
        )}

        {/* Jump list — these documents are long enough to need one. */}
        {sections.length > 6 && (
          <nav
            aria-label="On this page"
            className="mt-10 rounded-well border border-border bg-surface p-6"
          >
            <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              On this page
            </p>
            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#${section.id ?? `s${i}`}`}
                    className="text-[0.9375rem] leading-snug text-muted transition-colors hover:text-accent-deep"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="mt-12 space-y-11">
          {sections.map((section, i) => (
            <section key={i} id={section.id ?? `s${i}`} className="scroll-mt-32">
              <h2 className="text-xl font-medium tracking-[-0.01em] text-ink">
                {section.heading}
              </h2>
              {section.body && (
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-pretty leading-relaxed text-muted">
                      {linkify(paragraph)}
                    </p>
                  ))}
                </div>
              )}
              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((item, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-muted">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-pretty">{linkify(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
