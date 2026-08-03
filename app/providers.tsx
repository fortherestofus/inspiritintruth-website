"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {/* Honour prefers-reduced-motion for all framer-motion animations. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
