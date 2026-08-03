import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { TERMS_INTRO, TERMS_SECTIONS, LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Terms of Service" },
  description:
    "The agreement between you and For The Rest Of Us for using InSpiritInTruth — accounts, AI-written devotionals, scripture licensing, subscriptions, giving and liability.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      lastUpdated={LEGAL_LAST_UPDATED}
      backHref="/"
      backLabel="Back to InSpiritInTruth"
      intro={TERMS_INTRO}
      sections={TERMS_SECTIONS}
    />
  );
}
