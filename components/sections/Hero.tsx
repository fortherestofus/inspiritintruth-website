"use client";

/**
 * Hero — the rotating-audience line from copy.md ("a devotional for the
 * devoted | questioning | unchurched...") made literal, over the app's home
 * screen. Cycling the words is the one bit of motion above the fold.
 */
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Phone from "@/components/ui/Phone";
import StoreButtons from "@/components/ui/StoreButtons";
import { HERO } from "@/lib/content";

export default function Hero() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const tick = setInterval(
      () => setI((v) => (v + 1) % HERO.audiences.length),
      2200,
    );
    return () => clearInterval(tick);
  }, [reduced]);

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
      {/* Warm wash behind the hero, in the app's green */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.55]"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, var(--color-accent-soft) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-content items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
            {HERO.eyebrow}
          </p>

          <h1 className="mt-5 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[3.5rem] lg:text-[4rem]">
            A devotional for
            <br />
            <span className="relative inline-block align-top">
              {/* Reserve the widest word so the line never reflows mid-cycle */}
              <span aria-hidden className="invisible whitespace-nowrap">
                the overwhelmed
              </span>
              {/* The swap animates transform only — opacity is never touched.
                  A fade needs the word to pass through opacity 0, and any
                  stall there (throttled background tab, frozen compositor,
                  a delayed timer) leaves the headline reading "A devotional
                  for ___". Sliding cannot hide it: worst case the word rests
                  mid-slide, still fully legible, and it is absolutely
                  positioned so nothing around it shifts. */}
              <span
                key={i}
                className="absolute inset-0 whitespace-nowrap text-accent-deep"
                style={reduced ? undefined : { animation: "wordIn 260ms ease-out" }}
              >
                {HERO.audiences[i]}
              </span>
            </span>
            <br />
            and everyone in between.
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {HERO.body}
          </p>

          <StoreButtons className="mt-9" />
        </div>

        <Phone src="/screenshots/isit-home.jpg" alt="The InSpiritInTruth home screen" priority />
      </div>
    </section>
  );
}
