/**
 * Captures one PostHog event when it mounts. For server-rendered pages that
 * need to record an outcome only the server knows — the thank-you page
 * verifies a gift with Paystack before this is ever rendered.
 */
"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function TrackEvent({
  event,
  properties,
}: {
  event: string;
  properties?: Record<string, string | number | boolean | null>;
}) {
  useEffect(() => {
    posthog.capture(event, properties);
    // Once per page load. The props are fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
