"use client";

/**
 * Support — composed like the app's giving screen: a hero amount card
 * (superscript currency + large numeral), quick amounts, and the Keeper card
 * with a frequency row.
 *
 * The verb is aimed at the work rather than at us. Apple treats "tip the
 * developer" and "donate to a cause" as different categories with different
 * rules, and the fundraising one — collect outside the app, via the browser —
 * is exactly the architecture here. The nouns stay charitable ("your gift",
 * "Where your gift goes") for the same reason.
 *
 * Posts to /api/give, which talks to Paystack server-side and returns a hosted
 * checkout URL.
 */
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Sprout } from "lucide-react";
import { GIVE } from "@/lib/content";
import { GIVING, GIVING_SPLIT } from "@/lib/site";

export default function Give() {
  const [amount, setAmount] = useState<number | "">(GIVING.quickAmounts[1]);
  const [email, setEmail] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState(GIVING.frequencies[1].value);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value = typeof amount === "number" && amount > 0 ? amount : null;
  // Any amount is welcome between the guard rails; the quick picks only
  // prefill the field. /api/give checks the same bounds server-side.
  const inRange =
    value !== null && value >= GIVING.minAmount && value <= GIVING.maxAmount;
  const ready = inRange && email.includes("@");

  const ctaLabel = !value
    ? "Enter a gift amount"
    : !inRange
      ? `Give ${GIVING.currency}${GIVING.minAmount}–${GIVING.maxAmount.toLocaleString()}`
      : `Support the work · ${GIVING.currency}${value.toLocaleString()}${recurring ? ` ${frequency}` : ""}`;

  async function startGift() {
    if (!ready || busy) return;
    setBusy(true);
    setError(null);
    try {
      // Trailing slash matters: next.config sets trailingSlash: true, so
      // "/api/give" answers with a 308 to "/api/give/". A 308 does preserve
      // the method and body, but posting straight to the canonical path skips
      // a needless round trip and any client that mishandles the redirect.
      const resp = await fetch("/api/give/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value, email, recurring, frequency }),
      });
      const data = await resp.json();
      if (!resp.ok || !data?.url) {
        setError(data?.error ?? "Could not start the gift just now.");
        setBusy(false);
        return;
      }
      // Hand off to Paystack's hosted checkout.
      window.location.href = data.url;
    } catch {
      setError("Could not reach the payment service. Please try again.");
      setBusy(false);
    }
  }

  return (
    <section id="give" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-content">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Left — the why */}
          <div>
            <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              {GIVE.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
              {GIVE.title}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink">
              {GIVE.body}
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              {GIVE.splitIntro}
            </p>

            {/* 90/10 split */}
            <div className="mt-8 flex h-4 overflow-hidden rounded-full">
              <div className="bg-accent" style={{ flex: GIVING_SPLIT.work }} />
              <div
                className="ml-1 rounded-full bg-kindness"
                style={{ flex: GIVING_SPLIT.kindness }}
              />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="ml-3 flex-1 text-ink">
                  Building the app &amp; its content
                </span>
                <span className="nums font-medium text-ink">
                  {GIVING_SPLIT.work}%
                </span>
              </div>
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-kindness" />
                <span className="ml-3 flex-1 text-ink">
                  Acts of kindness &mdash; helping others
                </span>
                <span className="nums font-medium text-ink">
                  {GIVING_SPLIT.kindness}%
                </span>
              </div>
            </div>

            <div className="mt-8 rounded-well border border-border bg-surface p-6">
              <h3 className="font-medium text-ink">{GIVE.notAPurchase.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted">
                {GIVE.notAPurchase.body}
              </p>
            </div>
          </div>

          {/* Right — the give card, mirroring the app */}
          <div>
            <div className="rounded-block border border-border bg-surface p-7 shadow-card sm:p-8">
              <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
                Your gift
              </p>

              {/* Amount — free to type. The instruction sits above the field
                  where a label belongs, and the border makes the big numeral
                  read as a field rather than a figure we chose for them.
                  Without both, the quick picks look like the only options. */}
              <p id="give-amount-hint" className="mt-2 leading-relaxed text-muted">
                {GIVE.amountLabel}
              </p>

              <label
                htmlFor="give-amount"
                className="mt-4 flex cursor-text items-start justify-center gap-1 rounded-well border border-border bg-bg py-4 transition-colors focus-within:border-accent"
              >
                <span className="mt-3 text-2xl font-medium text-muted">
                  {GIVING.currency}
                </span>
                <input
                  id="give-amount"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  aria-label="Gift amount"
                  aria-describedby="give-amount-hint give-amount-range"
                  value={amount}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setAmount(raw === "" ? "" : Number(raw));
                    if (error) setError(null);
                  }}
                  className="nums w-full max-w-[7ch] bg-transparent text-center text-[3.5rem] font-medium leading-none tracking-[-0.03em] text-ink outline-none placeholder:text-faint"
                  placeholder="0"
                />
              </label>

              {/* Quick amounts */}
              <div className="mt-2 grid grid-cols-4 gap-2">
                {GIVING.quickAmounts.map((quick) => {
                  const active = amount === quick;
                  return (
                    <button
                      key={quick}
                      type="button"
                      onClick={() => setAmount(quick)}
                      className={`nums rounded-full border py-2.5 text-[0.9375rem] font-medium transition-colors ${
                        active
                          ? "border-accent bg-accent-soft text-accent-deep"
                          : "border-border bg-bg text-muted hover:text-ink"
                      }`}
                    >
                      {GIVING.currency}
                      {quick}
                    </button>
                  );
                })}
              </div>

              {/* The range is stated up front rather than only on rejection —
                  a giver should not have to trip the guard rail to find it. */}
              <p
                id="give-amount-range"
                className="mt-3 text-center text-[0.8125rem] leading-relaxed text-faint"
              >
                Any amount from {GIVING.currency}
                {GIVING.minAmount} to {GIVING.currency}
                {GIVING.maxAmount.toLocaleString()}.
              </p>

              {/* Keeper */}
              <div className="mt-6 rounded-well border border-border bg-bg p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <Sprout className="h-5 w-5 text-accent-deep" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-medium text-ink">
                        {GIVE.keeper.title}
                      </h3>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={recurring}
                        aria-label="Support regularly"
                        onClick={() => setRecurring((v) => !v)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                          recurring ? "bg-accent" : "bg-border"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow-sm transition-transform ${
                            recurring ? "translate-x-[1.375rem]" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                      {GIVE.keeper.body}
                    </p>
                  </div>
                </div>

                {recurring && (
                  <div className="mt-4 flex gap-2 border-t border-border pt-4">
                    {GIVING.frequencies.map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        onClick={() => setFrequency(f.value)}
                        className={`flex-1 rounded-full border py-2 text-[0.875rem] font-medium transition-colors ${
                          frequency === f.value
                            ? "border-accent bg-accent-soft text-accent-deep"
                            : "border-border text-muted hover:text-ink"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Email — Paystack needs it for the receipt, and it is the
                  only way to reach a giver since there are no accounts here. */}
              <div className="mt-6">
                <label
                  htmlFor="give-email"
                  className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint"
                >
                  Email for your receipt
                </label>
                <input
                  id="give-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-full border border-border bg-bg px-5 py-3 text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
                />
              </div>

              <button
                type="button"
                onClick={startGift}
                disabled={!ready || busy}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 font-medium transition-all duration-200 ${
                  ready && !busy
                    ? "bg-accent text-accent-ink hover:-translate-y-0.5 hover:shadow-pill"
                    : "cursor-not-allowed bg-sunken text-faint"
                }`}
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Taking you to checkout…
                  </>
                ) : (
                  <>
                    {ctaLabel}
                    {ready && <ArrowRight className="h-4 w-4" />}
                  </>
                )}
              </button>

              {error && (
                <p
                  role="alert"
                  className="mt-3 text-center text-[0.875rem] leading-relaxed text-kindness"
                >
                  {error}
                </p>
              )}

              <p className="mt-5 text-center text-[0.8125rem] leading-relaxed text-faint">
                Gifts are processed securely by Paystack in South African Rand.
                We never see or store your card details.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 px-1">
              <Link
                href="/giving-faq/"
                className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent-deep"
              >
                Giving FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/privacy/#sensitive"
                className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
              >
                How we handle your details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
