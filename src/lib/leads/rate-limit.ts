import { createHash } from "crypto";
import { checkRateLimit as checkVercelRateLimit } from "@vercel/firewall";
import { LeadError } from "./errors";
import type { LeadConfig } from "./request-security";

type Bucket = { count: number; resetAt: number };

const store = ((globalThis as typeof globalThis & {
  __wddLeadRate?: Map<string, Bucket>;
}).__wddLeadRate ??= new Map<string, Bucket>());

const rateLimitMessage =
  "Too many submission attempts were received. Please wait a little before trying again.";

function checkInstanceLimit(id: string, windowMs: number, max: number) {
  const now = Date.now();
  for (const [key, bucket] of store) {
    if (bucket.resetAt <= now) store.delete(key);
  }

  const key = createHash("sha256").update(id).digest("hex");
  const bucket = store.get(key);
  if (!bucket) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= max) {
    const retry = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    throw new LeadError(
      "RATE_LIMITED",
      rateLimitMessage,
      429,
      undefined,
      retry,
    );
  }

  bucket.count += 1;
}

export async function checkRateLimit(
  request: Request,
  id: string,
  config: LeadConfig,
) {
  checkInstanceLimit(id, config.rateWindowMs, config.rateMax);

  if (!config.distributedRateLimitId) {
    if (config.distributedRateLimitRequired) {
      throw new LeadError(
        "INTEGRATION_MISCONFIGURED",
        "Secure online submission is temporarily unavailable. Your information has not been sent.",
        503,
      );
    }
    return;
  }

  try {
    const result = await checkVercelRateLimit(
      config.distributedRateLimitId,
      {
        request,
        rateLimitKey: id,
      },
    );

    if (result.rateLimited) {
      throw new LeadError(
        "RATE_LIMITED",
        rateLimitMessage,
        429,
        undefined,
        Math.ceil(config.rateWindowMs / 1000),
      );
    }

    if (result.error === "not-found" && config.distributedRateLimitRequired) {
      throw new LeadError(
        "INTEGRATION_MISCONFIGURED",
        "Secure online submission is temporarily unavailable. Your information has not been sent.",
        503,
      );
    }
  } catch (error) {
    if (error instanceof LeadError) throw error;
    if (!config.distributedRateLimitRequired) return;

    throw new LeadError(
      "UPSTREAM_UNAVAILABLE",
      "We couldn’t send your request right now. Your information is still in the form, so you can try again.",
      503,
    );
  }
}
