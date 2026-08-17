"use client";

/**
 * Floating pill nav — the FTROU studio shape, with the Housemait example's
 * behaviour: transparent over the hero, then condensing into a solid pill once
 * you scroll past it.
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

/**
 * Anchors are root-relative ("/#give", not "#give") so they still reach the
 * homepage section from any page this nav is rendered on. A bare "#give" from
 * /kindness/ resolves to /kindness/#give and goes nowhere.
 *
 * They go through next/link rather than a plain <a>: a root-relative href on
 * an <a> costs a full page reload even when you are already on the homepage,
 * which is exactly where these links are used most.
 */
const LINKS = [
  { href: "/#inside", label: "Inside" },
  { href: "/#how-made", label: "How it's made" },
  { href: "/#give", label: "Support" },
  { href: "/kindness/", label: "Kindness" },
  { href: "/#faq", label: "FAQ" },
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
        /*
         * Opaque once scrolled, never translucent — the same fix the FTROU
         * studio site needed. A blurred 85% pill looked elegant over the hero
         * and then became unreadable the moment a dark section passed beneath
         * it (the ink Closing block), because ink type on a dark blur has no
         * contrast left. Every page top is light canvas, so transparent at
         * rest is safe; everything after it is not.
         */
        className={`mx-auto flex max-w-content items-center justify-between rounded-full px-5 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border border-border bg-surface shadow-nav"
            : "border border-transparent"
        }`}
      >
        {/* Both logo variants ship and swap via CSS rather than reading the
            theme in JS — no hydration mismatch, no flash of the wrong mark.
            The stacked wordmark is 2.47:1 (the old horizontal lockup was
            7.5:1), so it needs more height to keep the INTRUTH line legible —
            h-10 rather than h-7, which still leaves it narrower than before. */}
        <Link href="/#top" className="flex items-center" aria-label="InSpiritInTruth — home">
          <Image
            src="/icons/logo-lockup-ink.png"
            alt="InSpiritInTruth"
            width={1024}
            height={413}
            priority
            className="h-10 w-auto dark:hidden"
          />
          <Image
            src="/icons/logo-lockup-cream.png"
            alt=""
            aria-hidden
            width={1024}
            height={413}
            priority
            className="hidden h-10 w-auto dark:block"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#download"
            className="rounded-full bg-ink px-5 py-2.5 text-[0.9375rem] font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pill"
          >
            Get the app
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-content rounded-well border border-border bg-surface p-5 shadow-nav lg:hidden">
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-ink last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#download"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-ink py-3 text-center font-medium text-bg"
            >
              Get the app
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
