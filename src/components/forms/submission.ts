import type {
  Attribution,
  LeadSubmissionResponse,
} from "@/lib/leads/types";
import { getMetaTrackingContext } from "@/lib/tracking/meta-browser";
import type { PhoneCountryCode } from "@/lib/leads/phone";

export type ContactRequestPayload = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  phoneCountry: PhoneCountryCode;
  website?: string;
  service: string;
  summary: string;
  consent: boolean;
  source: "contact";
};

export type CampaignRequestPayload = {
  source: "campaign";
  campaignSlug:
    | "cleaning"
    | "roofing"
    | "landscaping"
    | "home-services"
    | "october-offer";
  contact: {
    fullName: string;
    email: string;
    phone: string;
    phoneCountry: PhoneCountryCode;
  };
  business: {
    name: string;
    website?: string;
  };
  project: {
    type:
      | "New Website"
      | "Website Redesign"
      | "E-Commerce Solutions"
      | "Campaign Landing Page"
      | "Not Sure Yet";
    note?: string;
  };
  consent: boolean;
  verificationCode?: string;
};

export type QuoteRequestPayload = {
  contact: {
    fullName: string;
    email: string;
    phone: string;
    phoneCountry: PhoneCountryCode;
  };
  business: {
    name: string;
    website?: string;
    industry: string;
  };
  project: {
    types: string[];
    pages: string;
    goal: string;
    features: string[];
    contentStatus: string;
    brandingStatus: string;
    existingPlatform?: string;
    notWorking: string;
    accomplish: string;
    details?: string;
  };
  package: {
    budget: string;
    timing: string;
  };
  consent: boolean;
  source: "get-started";
};

type Options = {
  submissionId: string;
  formStartedAt: string;
  turnstileToken?: string;
  verificationCode?: string;
  attribution?: Attribution;
};

function isResponse(value: unknown): value is LeadSubmissionResponse {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    typeof (value as { ok?: unknown }).ok === "boolean"
  );
}

const unavailable: LeadSubmissionResponse = {
  ok: false,
  code: "UPSTREAM_UNAVAILABLE",
  message:
    "We couldn’t send your request right now. Your information is still in the form, so you can try again.",
};

export async function submitLead(
  payload:
    | ContactRequestPayload
    | QuoteRequestPayload
    | CampaignRequestPayload,
  options: Options,
): Promise<LeadSubmissionResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  const common = {
    submissionId: options.submissionId,
    formStartedAt: options.formStartedAt,
    turnstileToken: options.turnstileToken,
    attribution: options.attribution,
    metaTracking: getMetaTrackingContext(),
  };

  const body =
    payload.source === "contact"
      ? {
          ...common,
          formType: "contact",
          verificationCode: options.verificationCode,
          contact: {
            fullName: payload.fullName,
            email: payload.email,
            phone: payload.phone,
            phoneCountry: payload.phoneCountry,
          },
          business: {
            name: payload.businessName,
            website: payload.website,
          },
          enquiry: {
            service: payload.service,
            summary: payload.summary,
          },
          consent: payload.consent,
        }
      : payload.source === "campaign"
        ? {
            ...common,
            formType: "campaign",
            verificationCode:
              payload.verificationCode || options.verificationCode,
            campaignSlug: payload.campaignSlug,
            contact: payload.contact,
            business: payload.business,
            project: payload.project,
            consent: payload.consent,
          }
        : {
            ...common,
            formType: "quote",
            verificationCode: options.verificationCode,
            ...payload,
          };

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const json: unknown = await response.json().catch(() => undefined);
    return isResponse(json) ? json : unavailable;
  } catch {
    return unavailable;
  } finally {
    clearTimeout(timer);
  }
}
