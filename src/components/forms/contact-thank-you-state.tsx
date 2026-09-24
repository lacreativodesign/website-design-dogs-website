"use client";

import { useEffect, useState } from "react";
import { leadEvent } from "@/components/forms/analytics-events";
import { consumeContactSuccess } from "@/lib/leads/contact-success";

export function ContactThankYouState() {
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    const success = consumeContactSuccess();
    if (!success) return;

    setConfirmationEmailSent(success.confirmationEmailSent);
    setReferenceId(success.referenceId || "");

    leadEvent("wdd_lead_success", {
      eventId: success.eventId,
      formType: "contact",
      serviceSlug: success.serviceSlug,
      utmCampaign: success.utmCampaign,
      pagePath: "/contact",
    });
  }, []);

  return (
    <div className="grid gap-3">
      <p className="text-[var(--color-text-muted)]">
        {confirmationEmailSent
          ? "A confirmation email with a copy of your enquiry has been sent to the email address you provided. Please check your inbox, including spam or junk if needed."
          : "Your enquiry has been received. Our team will review it and respond using the contact information you provided."}
      </p>
      {referenceId ? (
        <p className="text-sm font-bold text-[var(--color-text-muted)]">
          Reference: {referenceId}
        </p>
      ) : null}
    </div>
  );
}
