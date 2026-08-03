import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { GIVING_FAQ_INTRO, GIVING_FAQ_SECTIONS } from "@/lib/giving-faq";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Giving FAQs" },
  description:
    "Answers about giving to InSpiritInTruth — where gifts go, what a Keeper is, recurring gifts, receipts, security, and tax.",
  alternates: { canonical: "/giving-faq/" },
};

export default function GivingFaqPage() {
  return (
    <LegalDocument
      title="Giving FAQs"
      lastUpdated={LEGAL_LAST_UPDATED}
      backHref="/#give"
      backLabel="Back to Giving"
      intro={GIVING_FAQ_INTRO}
      sections={GIVING_FAQ_SECTIONS}
    />
  );
}
