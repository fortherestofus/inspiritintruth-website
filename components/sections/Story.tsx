/**
 * Story — the three narrative beats, alternating sides. Same three blocks the
 * FTROU studio page tells, so both pages tell one story.
 */
import Phone from "@/components/ui/Phone";
import { STORY } from "@/lib/content";

export default function Story() {
  return (
    <section className="px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-content space-y-24 sm:space-y-32">
        {STORY.map((block, i) => (
          <div
            key={block.eyebrow}
            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-accent-deep">
                {block.eyebrow}
              </p>
              <h2 className="mt-4 text-balance text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
                {block.title}
              </h2>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted">
                {block.body}
              </p>
            </div>

            <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
              <Phone src={block.image} alt={block.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
