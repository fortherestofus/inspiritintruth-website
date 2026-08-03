/**
 * Closing CTA — the dark ink block, closing on the last line of copy.md's
 * description: "We hope it's a blessing to you."
 */
import StoreButtons from "@/components/ui/StoreButtons";
import { CLOSING } from "@/lib/content";

export default function Closing() {
  return (
    <section id="download" className="scroll-mt-24 px-5 pb-8 sm:px-8">
      <div className="grain mx-auto max-w-content overflow-hidden rounded-block bg-ink-surface px-8 py-20 text-center sm:px-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.03em] text-ink-text sm:text-[2.75rem]">
            {CLOSING.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
            {CLOSING.body}
          </p>

          <div className="mt-10 flex justify-center">
            <StoreButtons tone="ink" />
          </div>
        </div>
      </div>
    </section>
  );
}
