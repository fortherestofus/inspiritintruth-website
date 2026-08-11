/**
 * Where Paystack returns after checkout.
 *
 * The reference is verified server-side before anything is celebrated — a
 * giver arriving with a reference in the URL is not proof the gift succeeded,
 * and never treating an unverified reference as paid is the whole point of
 * this page.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CircleAlert } from "lucide-react";
import { HELLO_EMAIL, GIVING, GIVING_SPLIT } from "@/lib/site";
import { GIVE } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Thank you" },
  description: "Thank you for giving to InSpiritInTruth.",
  robots: { index: false, follow: false },
};

type Verdict = "paid" | "failed" | "unknown";

async function verify(reference: string): Promise<{ verdict: Verdict; amount?: string }> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !reference) return { verdict: "unknown" };

  try {
    const resp = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${secret}` }, cache: "no-store" },
    );
    const body = await resp.json();
    if (!resp.ok || !body?.status) return { verdict: "unknown" };

    if (body.data?.status === "success") {
      const minor = Number(body.data.amount) || 0;
      return {
        verdict: "paid",
        amount: `${GIVING.currency}${(minor / 100).toLocaleString()}`,
      };
    }
    return { verdict: "failed" };
  } catch {
    return { verdict: "unknown" };
  }
}

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const params = await searchParams;
  // Paystack sends both; they carry the same value.
  const reference = params.reference ?? params.trxref ?? "";
  const { verdict, amount } = await verify(reference);

  const paid = verdict === "paid";

  return (
    <div className="bg-bg">
      <article className="mx-auto flex min-h-screen max-w-reading flex-col justify-center px-5 py-24 sm:px-8">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            paid ? "bg-accent-soft" : "bg-sunken"
          }`}
        >
          {paid ? (
            <CheckCircle2 className="h-7 w-7 text-accent-deep" />
          ) : (
            <CircleAlert className="h-7 w-7 text-muted" />
          )}
        </span>

        {paid ? (
          <>
            <h1 className="mt-8 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              Thank you.
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink">
              Your gift{amount ? ` of ${amount}` : ""} came through. A receipt is
              on its way to your email.
            </p>
            {/* The same breakdown as the give card, not a summary of it —
                this is the moment a giver is most owed the detail. */}
            <div className="mt-10 space-y-7 border-t border-border pt-8">
              {[
                { ...GIVE.where.work, share: GIVING_SPLIT.work },
                { ...GIVE.where.kindness, share: GIVING_SPLIT.kindness },
              ].map((band) => (
                <div key={band.label}>
                  <h2 className="flex items-baseline gap-3 font-medium text-ink">
                    <span className="nums text-accent-deep">{band.share}%</span>
                    {band.label}
                  </h2>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">
                    {band.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-well border border-accent bg-accent-soft p-6">
              <h2 className="font-medium text-accent-deep">
                {GIVE.passThrough.title}
              </h2>
              <p className="mt-2 text-pretty leading-relaxed text-ink">
                {GIVE.passThrough.body}
              </p>
            </div>

            <div className="mt-5 rounded-well border border-border bg-surface p-6">
              <h2 className="font-medium text-ink">{GIVE.report.title}</h2>
              <p className="mt-2 text-pretty leading-relaxed text-muted">
                {GIVE.report.body}
              </p>
            </div>
          </>
        ) : verdict === "failed" ? (
          <>
            <h1 className="mt-8 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              That gift didn&rsquo;t go through.
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink">
              Nothing was taken from your account. You&rsquo;re welcome to try
              again whenever you like.
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-8 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
              We couldn&rsquo;t confirm that just yet.
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink">
              If your gift went through, your receipt will still arrive by
              email. Nothing is lost — this page just couldn&rsquo;t check in
              time.
            </p>
          </>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent-deep"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to InSpiritInTruth
          </Link>
          <Link
            href="/kindness/"
            className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            The kindness ledger
          </Link>
          <Link
            href="/giving-faq/"
            className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            Giving FAQs
          </Link>
          <a
            href={`mailto:${HELLO_EMAIL}?subject=Giving%20support`}
            className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            Email giving support
          </a>
        </div>
      </article>
    </div>
  );
}
