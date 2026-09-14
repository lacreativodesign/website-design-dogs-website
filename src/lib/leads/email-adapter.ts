import { setTimeout as delay } from "timers/promises";
import { LeadError } from "./errors";
import type { LeadConfig } from "./request-security";
import type { LeadSubmissionEnvelope } from "./types";

export type EmailDeliveryResult = {
  upstreamStatus: number;
  providerMessageId: string;
};

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const unavailableMessage =
  "We couldn’t send your request right now. Your information is still in the form, so you can try again.";

function inline(value: string | undefined) {
  return (value || "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function optionalLine(label: string, value?: string) {
  const clean = inline(value);
  return clean ? [`${label}: ${clean}`] : [];
}

export function toLeadEmailText(envelope: LeadSubmissionEnvelope) {
  const project = envelope.project;
  const selectedPackage = envelope.package;
  const campaign = envelope.campaign;
  const attribution = envelope.attribution;

  return [
    "New Website Design Dogs lead",
    "",
    `Submission ID: ${envelope.submissionId}`,
    `Form: ${envelope.formType}`,
    `Submitted: ${envelope.submittedAt}`,
    "",
    "CONTACT",
    `Name: ${inline(envelope.contact.fullName)}`,
    `Email: ${inline(envelope.contact.email)}`,
    ...optionalLine("Phone", envelope.contact.phone),
    "",
    "BUSINESS",
    `Business: ${inline(envelope.business.name)}`,
    ...optionalLine("Website", envelope.business.website),
    ...optionalLine("Industry", envelope.business.industry),
    "",
    "ENQUIRY",
    ...optionalLine("Service", envelope.enquiry.service),
    ...optionalLine("Project summary", envelope.enquiry.summary),
    ...(project
      ? [
          ...optionalLine("Project types", project.types.join(", ")),
          ...optionalLine("Estimated pages", project.pages),
          ...optionalLine("Business goal", project.goal),
          ...optionalLine("Requested features", project.features.join(", ")),
          ...optionalLine("Content status", project.contentStatus),
          ...optionalLine("Branding status", project.brandingStatus),
          ...optionalLine("Existing platform", project.existingPlatform),
          ...optionalLine("Current challenges", project.notWorking),
          ...optionalLine("Desired outcome", project.accomplish),
          ...optionalLine("Additional details", project.details),
        ]
      : []),
    ...(selectedPackage
      ? [
          ...optionalLine("Preferred package", selectedPackage.preferred),
          ...optionalLine("Budget", selectedPackage.budget),
          ...optionalLine("Preferred timing", selectedPackage.timing),
        ]
      : []),
    ...(campaign
      ? [
          ...optionalLine("Campaign", campaign.slug),
          ...optionalLine("Offer", campaign.offerCode),
        ]
      : []),
    "",
    "ATTRIBUTION",
    ...optionalLine("Landing page", attribution.landingPage),
    ...optionalLine("Current page", attribution.currentPage),
    ...optionalLine("Referrer", attribution.referrer),
    ...optionalLine("UTM source", attribution.utmSource),
    ...optionalLine("UTM medium", attribution.utmMedium),
    ...optionalLine("UTM campaign", attribution.utmCampaign),
    ...optionalLine("UTM term", attribution.utmTerm),
    ...optionalLine("UTM content", attribution.utmContent),
    ...optionalLine("Google click ID", attribution.gclid),
    ...optionalLine("Meta click ID", attribution.fbclid),
    "",
    "CONSENT",
    `Contact consent: ${envelope.consent.contact ? "yes" : "no"}`,
    `Privacy policy consent: ${envelope.consent.privacyPolicy ? "yes" : "no"}`,
    `Consent recorded: ${envelope.consent.agreedAt}`,
  ].join("\n");
}

function responseDetails(value: unknown) {
  if (!value || typeof value !== "object") return undefined;
  return value as { id?: unknown; message?: unknown; error?: unknown };
}

function sanitizeProviderError(value: unknown, apiKey?: string) {
  if (typeof value !== "string") return undefined;
  let message = value.replace(/[\r\n]+/g, " ").trim();
  if (apiKey) message = message.replaceAll(apiKey, "[redacted]");
  return message.slice(0, 500) || undefined;
}

async function once(
  envelope: LeadSubmissionEnvelope,
  config: LeadConfig,
): Promise<EmailDeliveryResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.emailTimeoutMs);

  try {
    const response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.emailApiKey || ""}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Idempotency-Key": `wdd-lead/${envelope.submissionId}`,
      },
      body: JSON.stringify({
        from: config.emailFrom,
        to: [config.emailTo],
        reply_to: envelope.contact.email,
        subject: `WDD ${envelope.formType} lead — ${inline(envelope.business.name) || inline(envelope.contact.fullName)}`,
        text: toLeadEmailText(envelope),
      }),
      signal: controller.signal,
    });

    const status = response.status;
    const body: unknown = await response.json().catch(() => undefined);
    const details = responseDetails(body);

    if (response.ok && typeof details?.id === "string" && details.id) {
      return { upstreamStatus: status, providerMessageId: details.id };
    }

    const upstreamMessage = sanitizeProviderError(
      details?.message || details?.error || (response.ok ? "Invalid email provider response." : undefined),
      config.emailApiKey,
    );
    const retryable = status >= 500 || status === 429 || status === 409 || response.ok;

    throw new LeadError(
      retryable ? "UPSTREAM_UNAVAILABLE" : "INTEGRATION_MISCONFIGURED",
      unavailableMessage,
      retryable ? 502 : 503,
      undefined,
      undefined,
      status,
      upstreamMessage,
    );
  } catch (error) {
    if (error instanceof LeadError) throw error;
    throw new LeadError("UPSTREAM_UNAVAILABLE", unavailableMessage, 502);
  } finally {
    clearTimeout(timer);
  }
}

export async function sendLeadEmail(
  envelope: LeadSubmissionEnvelope,
  config: LeadConfig,
): Promise<EmailDeliveryResult> {
  try {
    return await once(envelope, config);
  } catch (error) {
    if (error instanceof LeadError && error.status === 502) {
      await delay(250);
      return once(envelope, config);
    }
    throw error;
  }
}
