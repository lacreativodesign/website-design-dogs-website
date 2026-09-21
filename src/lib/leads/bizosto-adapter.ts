import { setTimeout as delay } from "timers/promises";
import { LeadError } from "./errors";
import type { LeadConfig } from "./request-security";
import type { Attribution, LeadSubmissionEnvelope } from "./types";
import { phoneCountryName } from "./phone";
import { primaryLabel, scopeLabels } from "./package-recommendation";

export type BizostoResult = {
  referenceId?: string;
  upstreamStatus: number;
  duplicate: boolean;
};

type BizostoLeadPayload = {
  lead: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    source: "website";
  };
  attribution: {
    utm?: {
      source?: string;
      medium?: string;
      campaign?: string;
      term?: string;
      content?: string;
    };
    landingPage?: string;
    currentPage?: string;
    referrer?: string;
    gclid?: string;
    fbclid?: string;
  };
  consent: {
    contact: boolean;
    privacyPolicy: boolean;
    agreedAt: string;
  };
};

const unavailableMessage =
  "We couldn’t send your request right now. Your information is still in the form, so you can try again.";

function optionalValue(label: string, value?: string) {
  return value ? [`${label}: ${value}`] : [];
}

function leadMessage(envelope: LeadSubmissionEnvelope) {
  const project = envelope.project;
  const selectedPackage = envelope.package;
  const campaign = envelope.campaign;

  const details = [
    ...optionalValue("Service", envelope.enquiry.service),
    ...optionalValue("Project summary", envelope.enquiry.summary),
    ...optionalValue("Business website", envelope.business.website),
    ...optionalValue("Phone country", phoneCountryName(envelope.contact.phoneCountry)),
    ...optionalValue("Industry", envelope.business.industry),
    ...(project
      ? [
          ...(project.primaryType
            ? [
                ...optionalValue("Primary service", primaryLabel(project.primaryType)),
                ...(project.scope
                  ? scopeLabels(project.primaryType, project.scope).flatMap(([label, value]) =>
                      optionalValue(label, value),
                    )
                  : []),
              ]
            : []),
          ...optionalValue(
            "Additional needs",
            project.primaryType
              ? project.types
                  .filter((type) => type !== primaryLabel(project.primaryType!))
                  .join(", ")
              : project.types.join(", "),
          ),
          ...optionalValue("Estimated pages", project.pages),
          ...optionalValue("Business goal", project.goal),
          ...optionalValue("Requested features", project.features.join(", ")),
          ...optionalValue("Content status", project.contentStatus),
          ...optionalValue("Branding status", project.brandingStatus),
          ...optionalValue("Existing platform", project.existingPlatform),
          ...optionalValue("Current challenges", project.notWorking),
          ...optionalValue("Desired outcome", project.accomplish),
          ...optionalValue("Additional details", project.details),
        ]
      : []),
    ...(selectedPackage
      ? [
          ...optionalValue("Preferred package", selectedPackage.preferred),
          ...optionalValue("Budget", selectedPackage.budget),
          ...optionalValue("Preferred timing", selectedPackage.timing),
        ]
      : []),
    ...(campaign
      ? [
          ...optionalValue("Campaign", campaign.slug),
          ...optionalValue("Offer", campaign.offerCode),
        ]
      : []),
  ];

  return details.length ? details.join("\n") : undefined;
}

function mapAttribution(attribution: Attribution) {
  const utm = {
    ...(attribution.utmSource ? { source: attribution.utmSource } : {}),
    ...(attribution.utmMedium ? { medium: attribution.utmMedium } : {}),
    ...(attribution.utmCampaign
      ? { campaign: attribution.utmCampaign }
      : {}),
    ...(attribution.utmTerm ? { term: attribution.utmTerm } : {}),
    ...(attribution.utmContent ? { content: attribution.utmContent } : {}),
  };

  return {
    ...(Object.keys(utm).length ? { utm } : {}),
    ...(attribution.landingPage
      ? { landingPage: attribution.landingPage }
      : {}),
    ...(attribution.currentPage
      ? { currentPage: attribution.currentPage }
      : {}),
    ...(attribution.referrer ? { referrer: attribution.referrer } : {}),
    ...(attribution.gclid ? { gclid: attribution.gclid } : {}),
    ...(attribution.fbclid ? { fbclid: attribution.fbclid } : {}),
  };
}

export function toBizostoPayload(
  envelope: LeadSubmissionEnvelope,
): BizostoLeadPayload {
  const message = leadMessage(envelope);

  return {
    lead: {
      name: envelope.contact.fullName,
      email: envelope.contact.email,
      ...(envelope.contact.phone ? { phone: envelope.contact.phone } : {}),
      ...(envelope.business.name ? { company: envelope.business.name } : {}),
      ...(message ? { message } : {}),
      source: "website",
    },
    attribution: mapAttribution(envelope.attribution),
    consent: {
      contact: envelope.consent.contact,
      privacyPolicy: envelope.consent.privacyPolicy,
      agreedAt: envelope.consent.agreedAt,
    },
  };
}

function responseDetails(value: unknown) {
  if (!value || typeof value !== "object") return undefined;
  return value as {
    ok?: unknown;
    duplicate?: unknown;
    leadId?: unknown;
    error?: unknown;
  };
}

function sanitizeUpstreamError(value: unknown, apiKey?: string) {
  if (typeof value !== "string") return undefined;
  let message = value.replace(/[\r\n]+/g, " ").trim();
  if (apiKey) message = message.replaceAll(apiKey, "[redacted]");
  return message.slice(0, 500) || undefined;
}

async function once(
  envelope: LeadSubmissionEnvelope,
  config: LeadConfig,
): Promise<BizostoResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": config.apiKey || "",
        "Idempotency-Key": envelope.submissionId,
        "User-Agent": "Website Design Dogs website lead integration",
      },
      body: JSON.stringify(toBizostoPayload(envelope)),
      signal: controller.signal,
    });
    const status = response.status;
    const body: unknown = await response.json().catch(() => undefined);
    const details = responseDetails(body);

    if (response.ok && details?.ok === true) {
      return {
        ...(typeof details.leadId === "string" && details.leadId.length < 200
          ? { referenceId: details.leadId }
          : {}),
        upstreamStatus: status,
        duplicate: details.duplicate === true,
      };
    }

    const upstreamMessage = sanitizeUpstreamError(
      details?.error || (response.ok ? "Invalid Bizosto response." : undefined),
      config.apiKey,
    );
    const retryable = status >= 500 || response.ok;

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

    throw new LeadError(
      "UPSTREAM_UNAVAILABLE",
      unavailableMessage,
      502,
    );
  } finally {
    clearTimeout(timer);
  }
}

export async function sendToBizosto(
  envelope: LeadSubmissionEnvelope,
  config: LeadConfig,
): Promise<BizostoResult> {
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
