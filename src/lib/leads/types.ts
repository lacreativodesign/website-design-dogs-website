import type { PhoneCountryCode } from "./phone";

export type FormType = "contact" | "quote" | "campaign";

export type LeadResponseCode =
  | "INVALID_REQUEST"
  | "VALIDATION_FAILED"
  | "ORIGIN_REJECTED"
  | "SPAM_REJECTED"
  | "RATE_LIMITED"
  | "SUBMISSION_DISABLED"
  | "INTEGRATION_MISCONFIGURED"
  | "UPSTREAM_UNAVAILABLE"
  | "INTERNAL_ERROR";

export type LeadSubmissionResponse =
  | {
      ok: true;
      message: string;
      referenceId?: string;
      duplicate?: boolean;
      confirmationEmailSent?: boolean;
    }
  | {
      ok: false;
      code: LeadResponseCode;
      message: string;
      fieldErrors?: Record<string, string>;
      retryAfterSeconds?: number;
    };

export type Attribution = {
  landingPage?: string;
  currentPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  fbclid?: string;
  gclid?: string;
};

export type MetaTrackingContext = {
  marketingConsent: boolean;
  fbp?: string;
  fbc?: string;
  eventSourceUrl?: string;
};

export type LeadSubmissionEnvelope = {
  schemaVersion: "1.0";
  submissionId: string;
  formType: FormType;
  brand: "Website Design Dogs";
  brandSlug: "website-design-dogs";
  submittedAt: string;
  source: "website";
  contact: {
    fullName: string;
    email: string;
    phone: string;
    phoneCountry: PhoneCountryCode;
  };
  business: {
    name: string;
    website?: string;
    industry?: string;
  };
  enquiry: {
    service?: string;
    summary?: string;
  };
  project?: {
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
  package?: {
    budget: string;
    timing: string;
  };
  campaign?: {
    slug: string;
    industry: string;
    offerCode: string;
    regularPrice: number;
    promotionalPrice: number;
    savings: number;
    currency: "USD";
    qualifyingScope: "Campaign Starter" | "October Website Offer";
  };
  attribution: Attribution;
  consent: {
    contact: boolean;
    privacyPolicy: boolean;
    agreedAt: string;
  };
};

export type ClientLeadPayload = {
  submissionId: string;
  formType: FormType;
  formStartedAt: string;
  turnstileToken?: string;
  verificationCode?: string;
  attribution?: Attribution;
  metaTracking?: MetaTrackingContext;
  contact?: {
    fullName?: string;
    email?: string;
    phone?: string;
    phoneCountry?: string;
  };
  business?: {
    name?: string;
    website?: string;
    industry?: string;
  };
  enquiry?: {
    service?: string;
    summary?: string;
  };
  project?: {
    types?: string[];
    pages?: string;
    goal?: string;
    features?: string[];
    contentStatus?: string;
    brandingStatus?: string;
    existingPlatform?: string;
    notWorking?: string;
    accomplish?: string;
    details?: string;
    type?: string;
    note?: string;
  };
  package?: {
    budget?: string;
    timing?: string;
  };
  consent?: boolean;
  campaignSlug?: string;
};
