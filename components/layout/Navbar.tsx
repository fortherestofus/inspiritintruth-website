"use client";

/**
 * Floating pill nav — the FTROU studio shape, with the Housemait example's
 * behaviour: transparent over the hero, then condensing into a solid pill once
 * you scroll past it.
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#inside", label: "Inside" },
  { href: "#how-made", label: "How it's made" },
  { href: "#give", label: "Support" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <nav
        className={`mx-auto flex max-w-content items-center justify-between rounded-full px-5 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border border-border bg-surface/85 shadow-nav backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        {/* Both logo variants ship and swap via CSS rather than reading the
            theme in JS — no hydration mismatch, no flash of the wrong mark. */}
        <a href="#top" className="flex items-center" aria-label="InSpiritInTruth — home">
          <Image
            src="/icons/logo-lockup-ink.png"
            alt="InSpiritInTruth"
            width={420}
            height={100}
            priority
            className="h-7 w-auto dark:hidden"
          />
          <Image
            src="/icons/logo-lockup-cream.png"
            alt=""
            aria-hidden
            width={420}
            height={100}
            priority
            className="hidden h-7 w-auto dark:block"
          />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            className="rounded-full bg-ink px-5 py-2.5 text-[0.9375rem] font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pill"
          >
            Get the app
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-content rounded-well border border-border bg-surface p-5 shadow-nav md:hidden">
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-ink last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-ink py-3 text-center font-medium text-bg"
            >
              Get the app
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
