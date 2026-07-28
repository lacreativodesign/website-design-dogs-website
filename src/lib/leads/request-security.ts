import { LeadError } from "./errors";

export type LeadConfig = {
  enabled: boolean;
  apiUrl?: string;
  tenantId?: string;
  apiKey?: string;
  apiKeyHeader: string;
  tenantHeader: string;
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
    apiUrl: process.env.BIZOSTO_API_URL || undefined,
    tenantId: process.env.BIZOSTO_TENANT_ID || undefined,
    apiKey: process.env.BIZOSTO_API_KEY || undefined,
    apiKeyHeader: process.env.BIZOSTO_API_KEY_HEADER || "x-api-key",
    tenantHeader: process.env.BIZOSTO_TENANT_HEADER || "x-tenant-id",
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
  if (!config.apiUrl || !config.tenantId || !config.apiKey) {
    throw new LeadError("INTEGRATION_MISCONFIGURED", unavailable, 503);
  }
  if (
    !/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(config.apiKeyHeader) ||
    !/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(config.tenantHeader)
  ) {
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
