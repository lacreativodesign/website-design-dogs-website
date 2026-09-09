import type { ReactNode } from "react";
import { connection } from "next/server";
import { siteConfig } from "@/content/site";
import { isLeadSubmissionAvailable } from "@/lib/leads/availability";

const contactOptions = [
  { label: "Email your project", ...siteConfig.contact.email },
  { label: "Message on WhatsApp", ...siteConfig.contact.whatsapp },
  { label: "Call us", ...siteConfig.contact.phone },
] as const;

export function LeadUnavailable({ headingId }: { headingId?: string }) {
  return (
    <div className="grid gap-5" data-testid="lead-unavailable">
      <div className="grid gap-3">
        <p className="home-eyebrow">Direct contact</p>
        <h2 id={headingId} className="text-2xl font-black sm:text-3xl">
          Let’s talk about your project.
        </h2>
        <p className="text-[var(--color-text-muted)]">
          Our online enquiry forms are temporarily unavailable. You can still
          reach us directly—send your project details by email or WhatsApp, or
          give us a call. We’ll help you find the right next step.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {contactOptions.map((option, index) => (
          <a
            key={option.label}
            className={`btn ${index === 0 ? "btn-primary" : "btn-secondary"} btn-medium`}
            href={option.href}
            {...(index === 1
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="btn__label">{option.label}</span>
          </a>
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">
        {siteConfig.contact.availability.days} · {siteConfig.contact.availability.hours}
      </p>
    </div>
  );
}

type LeadFormGateProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export async function LeadFormGate({ children, fallback }: LeadFormGateProps) {
  // Read the current server environment at request time, not at static build time.
  await connection();
  return isLeadSubmissionAvailable()
    ? children
    : (fallback ?? <LeadUnavailable />);
}
