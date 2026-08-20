import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import { SUPPORT_INTRO, SUPPORT_SECTIONS } from "@/lib/support";

/**
 * /support/ — the Support URL submitted to App Store Connect.
 *
 * Apple requires an http(s) URL there (a mailto: is rejected) and expects it
 * to help a user of this app. It has to resolve for someone who has never
 * installed it, so it is a plain public page with no auth and no app
 * dependency, the same shape as /delete-account/.
 */
export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Support" },
  description:
    "Help with InSpiritInTruth: cancelling or restoring Premium, signing in, tailored devotionals, notifications, offline reading, and deleting your account.",
  alternates: { canonical: "/support/" },
};

export default function SupportPage() {
  return (
    <LegalDocument
      title="Support"
      lastUpdated={LEGAL_LAST_UPDATED}
      backHref="/"
      backLabel="Back to InSpiritInTruth"
      intro={SUPPORT_INTRO}
      sections={SUPPORT_SECTIONS}
    />
  );
}
