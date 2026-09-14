import { LeadError } from "./errors";

export type LeadConfig = {
  enabled: boolean;
  bizostoEnabled: boolean;
  emailEnabled: boolean;
  apiUrl: string;
  apiKey?: string;
  emailApiKey?: string;
  emailFrom?: string;
  emailTo?: string;
  emailTimeoutMs: number;
  timeoutMs: number;
  rateWindowMs: number;
  rateMax: number;
  distributedRateLimitId?: string;
  distributedRateLimitRequired: boolean;
  turnstileRequired: boolean;
  turnstileSecret?: string;
  turnstileAllowedHostnames: string[];
  allowedOrigins: string[];
  allowPreview: boolean;
  siteUrl?: string;
};

const bool = (value: string | undefined, fallback = false) =>
  value ? value.toLowerCase() === "true" : fallback;

const num = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const csv = (value: string | undefined) =>
  (value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

export const BIZOSTO_INGEST_URL =
  "https://app.bizosto.com/api/ingest/leads";

export function getLeadConfig(): LeadConfig {
  const origins = [
    process.env.LEAD_ALLOWED_ORIGINS,
    process.env.NEXT_PUBLIC_SITE_URL,
  ]
    .filter(Boolean)
    .flatMap((value) => String(value).split(","))
    .map(normalizeOrigin)
    .filter((value): value is string => Boolean(value));

  const originHostnames = origins.flatMap((origin) => {
    try {
      return [new URL(origin).hostname.toLowerCase()];
    } catch {
      return [];
    }
  });

  return {
    enabled: bool(process.env.LEAD_SUBMISSION_ENABLED),
    bizostoEnabled: bool(process.env.LEAD_BIZOSTO_ENABLED, true),
    emailEnabled: bool(process.env.LEAD_EMAIL_ENABLED),
    apiUrl: process.env.BIZOSTO_API_URL || BIZOSTO_INGEST_URL,
    apiKey: process.env.BIZOSTO_INGEST_KEY || undefined,
    emailApiKey: process.env.RESEND_API_KEY || undefined,
    emailFrom: process.env.LEAD_EMAIL_FROM || undefined,
    emailTo: process.env.LEAD_EMAIL_TO || undefined,
    emailTimeoutMs: num(process.env.LEAD_EMAIL_TIMEOUT_MS, 8_000),
    timeoutMs: num(process.env.LEAD_REQUEST_TIMEOUT_MS, 10_000),
    rateWindowMs: num(process.env.LEAD_RATE_LIMIT_WINDOW_MS, 600_000),
    rateMax: num(process.env.LEAD_RATE_LIMIT_MAX, 5),
    distributedRateLimitId:
      process.env.LEAD_DISTRIBUTED_RATE_LIMIT_ID || undefined,
    distributedRateLimitRequired: bool(
      process.env.LEAD_DISTRIBUTED_RATE_LIMIT_REQUIRED,
      true,
    ),
    turnstileRequired: bool(process.env.TURNSTILE_REQUIRED, true),
    turnstileSecret: process.env.TURNSTILE_SECRET_KEY || undefined,
    turnstileAllowedHostnames: [
      ...new Set([
        ...csv(process.env.TURNSTILE_ALLOWED_HOSTNAMES),
        ...originHostnames,
      ]),
    ],
    allowedOrigins: [...new Set(origins)],
    allowPreview: bool(process.env.ALLOW_PREVIEW_LEAD_SUBMISSION),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  };
}

export function normalizeOrigin(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return `${url.protocol}//${url.host}`.replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

export function assertOrigin(request: Request, config: LeadConfig) {
  const origin = normalizeOrigin(request.headers.get("origin") || undefined);
  if (!origin) {
    throw new LeadError(
      "ORIGIN_REJECTED",
      "Request origin was not accepted.",
      403,
    );
  }

  const production = process.env.NODE_ENV === "production";
  if (production && !origin.startsWith("https://")) {
    throw new LeadError(
      "ORIGIN_REJECTED",
      "Request origin was not accepted.",
      403,
    );
  }

  if (!config.allowedOrigins.includes(origin)) {
    throw new LeadError(
      "ORIGIN_REJECTED",
      "Request origin was not accepted.",
      403,
    );
  }
}

export function assertCanSubmit(config: LeadConfig) {
  const unavailable =
    "Secure online submission is temporarily unavailable. Your information has not been sent.";

  if (!config.enabled) {
    throw new LeadError("SUBMISSION_DISABLED", unavailable, 503);
  }
  if (process.env.VERCEL_ENV === "preview" && !config.allowPreview) {
    throw new LeadError("SUBMISSION_DISABLED", unavailable, 503);
  }

  const bizostoReady =
    config.bizostoEnabled && Boolean(config.apiUrl && config.apiKey);
  const emailReady =
    config.emailEnabled &&
    Boolean(config.emailApiKey && config.emailFrom && config.emailTo);

  if (!bizostoReady && !emailReady) {
    throw new LeadError("INTEGRATION_MISCONFIGURED", unavailable, 503);
  }

  if (
    config.distributedRateLimitRequired &&
    !config.distributedRateLimitId
  ) {
    throw new LeadError("INTEGRATION_MISCONFIGURED", unavailable, 503);
  }
  if (
    config.turnstileRequired &&
    (!config.turnstileSecret ||
      config.turnstileAllowedHostnames.length === 0)
  ) {
    throw new LeadError("INTEGRATION_MISCONFIGURED", unavailable, 503);
  }
}

export function clientId(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
