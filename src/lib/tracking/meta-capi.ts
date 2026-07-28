import { createHash } from "crypto";
import { setTimeout as delay } from "timers/promises";
import type {
  LeadSubmissionEnvelope,
  MetaTrackingContext,
} from "@/lib/leads/types";
import { getSiteUrl } from "@/lib/site-config";

type MetaCapiConfig = {
  datasetId: string;
  accessToken: string;
  graphApiVersion: string;
  testEventCode?: string;
  timeoutMs: number;
};

type MetaRequestContext = {
  ip: string;
  userAgent?: string;
};

export type MetaCapiResult = {
  upstreamStatus: number;
  eventsReceived?: number;
};

const enabled = (value: string | undefined) => value === "true";

const timeout = (value: string | undefined) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 1_000 && parsed <= 10_000
    ? parsed
    : 4_000;
};

function getConfig(): MetaCapiConfig {
  const datasetId = process.env.META_DATASET_ID || "";
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN || "";
  const graphApiVersion = process.env.META_GRAPH_API_VERSION || "";

  if (
    !/^\d{5,30}$/.test(datasetId) ||
    accessToken.length < 20 ||
    !/^v\d{1,2}\.\d{1,2}$/.test(graphApiVersion)
  ) {
    throw new Error("Meta CAPI is enabled but not fully configured.");
  }

  return {
    datasetId,
    accessToken,
    graphApiVersion,
    testEventCode: process.env.META_CAPI_TEST_EVENT_CODE || undefined,
    timeoutMs: timeout(process.env.META_CAPI_TIMEOUT_MS),
  };
}

export function shouldSendMetaCapi(context?: MetaTrackingContext) {
  return enabled(process.env.META_CAPI_ENABLED) &&
    context?.marketingConsent === true;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizedPhone(value: string | undefined) {
  if (!value) return undefined;
  const digits = value.replace(/\D/g, "");
  const withCountryCode = digits.length === 10 ? `1${digits}` : digits;
  return withCountryCode.length >= 8 && withCountryCode.length <= 15
    ? withCountryCode
    : undefined;
}

function metaCookie(value: string | undefined) {
  if (!value || value.length > 255 || !/^fb\.1\.[A-Za-z0-9._-]+$/.test(value)) {
    return undefined;
  }
  return value;
}

function eventSourceUrl(
  envelope: LeadSubmissionEnvelope,
  context: MetaTrackingContext,
) {
  const site = getSiteUrl();
  const siteUrl = new URL(site);

  if (context.eventSourceUrl) {
    try {
      const candidate = new URL(context.eventSourceUrl);
      if (
        candidate.protocol === "https:" &&
        candidate.hostname === siteUrl.hostname
      ) {
        return `${candidate.origin}${candidate.pathname}`;
      }
    } catch {
      // Fall through to the validated attribution path.
    }
  }

  const currentPath = envelope.attribution.currentPage?.split("?")[0];
  return new URL(
    currentPath?.startsWith("/") ? currentPath : "/",
    `${site}/`,
  ).toString();
}

async function sendOnce(
  config: MetaCapiConfig,
  payload: Record<string, unknown>,
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  const endpoint =
    `https://graph.facebook.com/${config.graphApiVersion}/` +
    `${config.datasetId}/events`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: [payload],
        access_token: config.accessToken,
        ...(config.testEventCode
          ? { test_event_code: config.testEventCode }
          : {}),
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => undefined)) as
      | { events_received?: number }
      | undefined;

    if (!response.ok) {
      const error = new Error("Meta CAPI request failed.") as Error & {
        status?: number;
      };
      error.status = response.status;
      throw error;
    }

    return {
      upstreamStatus: response.status,
      eventsReceived: data?.events_received,
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function sendMetaLeadEvent(
  envelope: LeadSubmissionEnvelope,
  tracking: MetaTrackingContext,
  request: MetaRequestContext,
): Promise<MetaCapiResult> {
  const config = getConfig();
  const phone = normalizedPhone(envelope.contact.phone);
  const fbp = metaCookie(tracking.fbp);
  const fbc = metaCookie(tracking.fbc);
  const submittedAt = Math.floor(
    Date.parse(envelope.submittedAt) / 1_000,
  );

  const payload = {
    event_name: "Lead",
    event_time: Number.isFinite(submittedAt)
      ? submittedAt
      : Math.floor(Date.now() / 1_000),
    event_id: envelope.submissionId,
    event_source_url: eventSourceUrl(envelope, tracking),
    action_source: "website",
    user_data: {
      em: [sha256(envelope.contact.email.trim().toLowerCase())],
      ...(phone ? { ph: [sha256(phone)] } : {}),
      ...(request.ip !== "unknown"
        ? { client_ip_address: request.ip.slice(0, 64) }
        : {}),
      ...(request.userAgent
        ? { client_user_agent: request.userAgent.slice(0, 500) }
        : {}),
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
    },
    custom_data: {
      content_name: "Website Design Dogs lead",
      content_category: envelope.formType,
      ...(envelope.campaign?.offerCode
        ? { content_ids: [envelope.campaign.offerCode] }
        : {}),
    },
  };

  try {
    return await sendOnce(config, payload);
  } catch (error) {
    const status = (error as { status?: number }).status;
    if (!status || (status !== 429 && status < 500)) throw error;
    await delay(250);
    return sendOnce(config, payload);
  }
}
