import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { PRIVACY_INTRO, PRIVACY_SECTIONS, LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Privacy Policy" },
  description:
    "What InSpiritInTruth collects, why, who processes it, and how to get it back or delete it. Including how we handle the personal things you share to get a devotional.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      lastUpdated={LEGAL_LAST_UPDATED}
      backHref="/"
      backLabel="Back to InSpiritInTruth"
      intro={PRIVACY_INTRO}
      sections={PRIVACY_SECTIONS}
    />
  );
}
