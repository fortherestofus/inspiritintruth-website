/**
 * Footer — dark ink surface, carrying the legal links and the cross-link back
 * to the ForTheRestOfUs studio page for this app.
 */
import Link from "next/link";
import Image from "next/image";
import { FTROU_APP_URL, FTROU_URL, HELLO_EMAIL } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain bg-ink-surface px-5 py-16 text-ink-text sm:px-8">
      <div className="relative z-10 mx-auto max-w-content">
        <div className="flex flex-col gap-10 border-b border-ink-border pb-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            {/* Always the cream mark — this surface is dark in both themes. */}
            <Image
              src="/icons/logo-cream.png"
              alt="InSpiritInTruth"
              width={242}
              height={100}
              className="h-8 w-auto"
            />
            <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
              A real-life devotional app for imperfect journeys. Faith at the
              pace of a life that already has enough going on.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[0.9375rem] sm:gap-x-16">
            <div className="flex flex-col gap-3">
              <p className="text-[0.75rem] uppercase tracking-[0.14em] text-ink-muted">
                The app
              </p>
              <a href="#inside" className="text-ink-muted transition-colors hover:text-ink-text">
                What&rsquo;s inside
              </a>
              <a href="#how-made" className="text-ink-muted transition-colors hover:text-ink-text">
                How it&rsquo;s made
              </a>
              <a href="#give" className="text-ink-muted transition-colors hover:text-ink-text">
                Support
              </a>
              <a href="#faq" className="text-ink-muted transition-colors hover:text-ink-text">
                FAQ
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[0.75rem] uppercase tracking-[0.14em] text-ink-muted">
                Legal
              </p>
              <Link href="/privacy/" className="text-ink-muted transition-colors hover:text-ink-text">
                Privacy Policy
              </Link>
              <Link href="/terms/" className="text-ink-muted transition-colors hover:text-ink-text">
                Terms of Service
              </Link>
              <Link
                href="/giving-faq/"
                className="text-ink-muted transition-colors hover:text-ink-text"
              >
                Giving FAQs
              </Link>
              <a
                href={`mailto:${HELLO_EMAIL}`}
                className="text-ink-muted transition-colors hover:text-ink-text"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-[0.875rem] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} InSpiritInTruth. An app by{" "}
            <a
              href={FTROU_URL}
              target="_blank"
              rel="noreferrer"
              className="text-ink-text underline decoration-ink-border underline-offset-4 transition-colors hover:decoration-ink-text"
            >
              For The Rest Of Us
            </a>
            .
          </p>
          <a
            href={FTROU_APP_URL}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink-text"
          >
            See it on the studio site →
          </a>
        </div>
      </div>
    </footer>
  );
}
