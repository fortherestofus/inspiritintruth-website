import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { DELETE_ACCOUNT_INTRO, DELETE_ACCOUNT_SECTIONS } from "@/lib/delete-account";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

/**
 * /delete-account/ — the URL submitted to Google Play's Data safety form as
 * the account-deletion request link. It has to resolve for someone who has
 * never installed the app, so it is a plain public page with no auth and no
 * app dependency.
 */
export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Delete your account" },
  description:
    "How to permanently delete your InSpiritInTruth account and everything in it — in the app, or by asking us. What gets removed, what we keep, and how to cancel Premium first.",
  alternates: { canonical: "/delete-account/" },
};

export default function DeleteAccountPage() {
  return (
    <LegalDocument
      title="Delete your account"
      lastUpdated={LEGAL_LAST_UPDATED}
      backHref="/"
      backLabel="Back to InSpiritInTruth"
      intro={DELETE_ACCOUNT_INTRO}
      sections={DELETE_ACCOUNT_SECTIONS}
    />
  );
}
