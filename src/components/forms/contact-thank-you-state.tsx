"use client";

import { useEffect } from "react";
import { leadEvent } from "@/components/forms/analytics-events";
import { consumeContactSuccess } from "@/lib/leads/contact-success";

export function ContactThankYouState() {
  useEffect(() => {
    const success = consumeContactSuccess();
    if (!success) return;

    leadEvent("wdd_lead_success", {
      eventId: success.eventId,
      formType: "contact",
      serviceSlug: success.serviceSlug,
      utmCampaign: success.utmCampaign,
      pagePath: "/contact",
    });
  }, []);

  return (
    <p className="text-[var(--color-text-muted)]">
      A confirmation email should arrive shortly when delivery completes.
      Please check your inbox, including spam or junk if needed.
    </p>
  );
}
