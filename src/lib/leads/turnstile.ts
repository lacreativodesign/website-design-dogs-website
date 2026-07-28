import { setTimeout as delay } from "timers/promises";
import { LeadError } from "./errors";
import type { LeadConfig } from "./request-security";

const siteverifyUrl =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const maxTokenLength = 2_048;
const maxTokenAgeMs = 5 * 60 * 1_000;

type TurnstileResponse = {
  success?: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
  "error-codes"?: string[];
};

type TurnstileContext = {
  action: "contact_lead" | "quote_lead" | "campaign_lead";
  cData: string;
  idempotencyKey: string;
};

async function validateOnce(
  token: string,
  ip: string,
  config: LeadConfig,
  context: TurnstileContext,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const body = new URLSearchParams({
      secret: config.turnstileSecret || "",
      response: token,
      idempotency_key: context.idempotencyKey,
    });
    if (ip !== "unknown") body.set("remoteip", ip);

    const response = await fetch(siteverifyUrl, {
      method: "POST",
      body,
      signal: controller.signal,
      cache: "no-store",
    });
    const data = (await response.json().catch(() => undefined)) as
      | TurnstileResponse
      | undefined;

    if (!response.ok || !data || typeof data !== "object") {
      throw new Error("Turnstile Siteverify was unavailable.");
    }

    return data;
  } finally {
    clearTimeout(timeout);
  }
}

export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
  config: LeadConfig,
  context: TurnstileContext,
) {
  if (!config.turnstileRequired) return;
  if (!token || token.length > maxTokenLength) {
    throw new LeadError(
      "SPAM_REJECTED",
      "Please complete the anti-spam check and try again.",
      403,
    );
  }

  let data: TurnstileResponse | undefined;
  try {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      data = await validateOnce(token, ip, config, context);
      if (
        data.success ||
        !data["error-codes"]?.includes("internal-error") ||
        attempt === 1
      ) {
        break;
      }
      await delay(150);
    }
  } catch {
    throw new LeadError(
      "UPSTREAM_UNAVAILABLE",
      "We couldn’t send your request right now. Your information is still in the form, so you can try again.",
      503,
    );
  }

  const challengeTime = Date.parse(data?.challenge_ts || "");
  const tokenAge = Date.now() - challengeTime;
  const hostname = data?.hostname?.toLowerCase();
  const valid =
    data?.success === true &&
    Boolean(hostname) &&
    config.turnstileAllowedHostnames.includes(hostname || "") &&
    data?.action === context.action &&
    data?.cdata === context.cData &&
    Number.isFinite(tokenAge) &&
    tokenAge >= -30_000 &&
    tokenAge <= maxTokenAgeMs;

  if (!valid) {
    throw new LeadError(
      "SPAM_REJECTED",
      "Please complete the anti-spam check and try again.",
      403,
    );
  }
}
