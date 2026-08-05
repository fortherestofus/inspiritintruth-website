/**
 * FAQ — native <details> accordion, so it works without JS and stays
 * accessible for free.
 */
import { Plus } from "lucide-react";
import { FAQ } from "@/lib/content";
import { HELLO_EMAIL } from "@/lib/site";

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      {/* Two columns, like How-it's-made and Support: the heading holds the
          left rail so the accordion can keep its reading width without
          stranding empty space beside it. */}
      <div className="mx-auto grid max-w-content gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
            FAQ
          </p>
          <h2 className="mt-4 text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
            Questions, answered.
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted">
            Still wondering about something?{" "}
            <a
              href={`mailto:${HELLO_EMAIL}`}
              className="text-accent-deep underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Email us
            </a>{" "}
            and a real person will answer.
          </p>
        </div>

        <div className="max-w-reading">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group border-b border-border py-5 first:border-t"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                <span className="text-pretty">{item.q}</span>
                <Plus className="mt-1 h-5 w-5 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="mt-4 max-w-[60ch] text-pretty leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
