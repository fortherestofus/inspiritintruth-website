/**
 * Root layout — fonts, metadata, theme provider.
 *
 * Typography is Apfel Grotezk (SIL Open Font License, Collletttivo),
 * self-hosted from /fonts — the same family as the ForTheRestOfUs studio site.
 * The family has no italics; globals.css neutralises <i>/<em> so the browser
 * never synthesises a slant.
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { SITE_URL } from "@/lib/site";

const apfel = localFont({
  variable: "--font-apfel",
  display: "swap",
  src: [
    { path: "../fonts/ApfelGrotezk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ApfelGrotezk-Mittel.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ApfelGrotezk-Fett.woff2", weight: "700", style: "normal" },
  ],
});

const SITE_DESCRIPTION =
  "A real-life devotional app for imperfect journeys. Tailored devotionals rooted first in Scripture, a beautiful Bible reader, and a verse each day — for iOS and Android.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "InSpiritInTruth — Bible study tailored to you",
    template: "%s — InSpiritInTruth",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "InSpiritInTruth",
    "devotional app",
    "daily devotional",
    "Bible app",
    "tailored devotional",
    "Christian app",
    "Bible study",
    "daily verse",
    "prayer",
    "faith",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "InSpiritInTruth — Bible study tailored to you",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "InSpiritInTruth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InSpiritInTruth — Bible study tailored to you",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={apfel.variable}>
      {/* suppressHydrationWarning on <body> too: extensions (ColorZilla's
          cz-shortcut-listen, Grammarly, password managers) stamp attributes
          onto the body before React hydrates, which React otherwise reports as
          a mismatch. It only suppresses attribute noise on this element. */}
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
