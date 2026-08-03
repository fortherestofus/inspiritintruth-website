/**
 * Phone frame for app screenshots — a CSS bezel rather than a PNG mock, so it
 * stays crisp at any size and recolours with the theme.
 */
import Image from "next/image";

export default function Phone({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] ${className}`}>
      {/* Soft ground shadow so the device sits on the page rather than floating */}
      <div
        aria-hidden
        className="absolute inset-x-6 bottom-0 h-10 rounded-[50%] bg-ink/10 blur-2xl"
      />
      <div className="relative rounded-[2.75rem] border border-border bg-ink p-2 shadow-card-hover">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-sunken">
          {/* Dynamic-island style notch */}
          <div
            aria-hidden
            className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink"
          />
          <Image
            src={src}
            alt={alt}
            width={560}
            height={1212}
            priority={priority}
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
