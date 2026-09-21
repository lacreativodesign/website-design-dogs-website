import { after, NextResponse } from "next/server";
import { MAX_BODY_BYTES } from "@/lib/leads/constants";
import { deliverLead } from "@/lib/leads/delivery";
import { LeadError, errorResponse } from "@/lib/leads/errors";
import { logLead, logLeadError } from "@/lib/leads/logger";
import {
  assertCanSubmit,
  assertOrigin,
  clientId,
  getLeadConfig,
} from "@/lib/leads/request-security";
import { checkRateLimit } from "@/lib/leads/rate-limit";
import { verifyTurnstile } from "@/lib/leads/turnstile";
import { validateLeadPayload } from "@/lib/leads/validation";
import {
  sendMetaLeadEvent,
  shouldSendMetaCapi,
} from "@/lib/tracking/meta-capi";
import type {
  ClientLeadPayload,
  FormType,
  LeadSubmissionResponse,
} from "@/lib/leads/types";

const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

const turnstileActions: Record<
  FormType,
  "contact_lead" | "quote_lead" | "campaign_lead"
> = {
  contact: "contact_lead",
  quote: "quote_lead",
  campaign: "campaign_lead",
};

function json(
  body: LeadSubmissionResponse,
  status: number,
  extra?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: { ...headers, ...extra },
  });
}

export async function POST(request: Request) {
  const started = Date.now();
  const requestId = crypto.randomUUID();
  let payload: ClientLeadPayload | undefined;

  try {
    const config = getLeadConfig();
    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .includes("application/json")
    ) {
      throw new LeadError(
        "INVALID_REQUEST",
        "Unsupported content type.",
        415,
      );
    }

    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
      throw new LeadError(
        "INVALID_REQUEST",
        "Request body is too large.",
        413,
      );
    }

    try {
      payload = JSON.parse(text) as ClientLeadPayload;
    } catch {
      throw new LeadError("INVALID_REQUEST", "Invalid JSON request.", 400);
    }

    assertOrigin(request, config);
    assertCanSubmit(config);
    const requester = clientId(request);
    await checkRateLimit(request, requester, config);
    const envelope = validateLeadPayload(payload);
    await verifyTurnstile(payload.turnstileToken, requester, config, {
      action: turnstileActions[envelope.formType],
      cData: envelope.submissionId,
      idempotencyKey: requestId,
    });

    const deliveryStarted = Date.now();
    const delivery = await deliverLead(envelope, config);

    for (const channel of delivery.channels) {
      const meta = {
        requestId,
        submissionId: envelope.submissionId,
        formType: envelope.formType,
        stage: channel.channel,
        status: channel.ok ? "success" : "failed",
        durationMs: Date.now() - deliveryStarted,
        upstreamStatus: channel.upstreamStatus,
        duplicate: channel.duplicate,
        ...(channel.error?.code ? { failure: channel.error.code } : {}),
        ...(channel.error?.upstreamMessage
          ? { upstreamError: channel.error.upstreamMessage }
          : {}),
      };

      if (channel.ok) logLead(meta);
      else logLeadError(meta);
    }

    if (shouldSendMetaCapi(payload.metaTracking)) {
      const tracking = payload.metaTracking!;
      const userAgent = request.headers.get("user-agent") || undefined;

      after(async () => {
        const metaStarted = Date.now();
        try {
          const metaResult = await sendMetaLeadEvent(
            envelope,
            tracking,
            { ip: requester, userAgent },
          );
          logLead({
            requestId,
            submissionId: envelope.submissionId,
            formType: envelope.formType,
            stage: "meta-capi",
            status: "success",
            durationMs: Date.now() - metaStarted,
            upstreamStatus: metaResult.upstreamStatus,
          });
        } catch {
          logLeadError({
            requestId,
            submissionId: envelope.submissionId,
            formType: envelope.formType,
            stage: "meta-capi",
            status: "failed",
            durationMs: Date.now() - metaStarted,
            failure: "META_CAPI_DELIVERY_FAILED",
          });
        }
      });
    }

    const successMessage = delivery.customerConfirmationSent
      ? `Thanks — your request was received successfully. We’ve sent a confirmation email with a copy of your submission to ${envelope.contact.email}. Please check your inbox, including spam or junk if needed.`
      : "Thanks — your request was received successfully. We’ll review the details and respond using the contact information you provided.";

    return json(
      {
        ok: true,
        message: successMessage,
        confirmationEmailSent: delivery.customerConfirmationSent,
        ...(delivery.referenceId ? { referenceId: delivery.referenceId } : {}),
        ...(delivery.duplicate ? { duplicate: true } : {}),
      },
      201,
    );
  } catch (error) {
    const leadError =
      error instanceof LeadError
        ? error
        : new LeadError(
            "INTERNAL_ERROR",
            "We couldn’t send your request right now. Your information is still in the form, so you can try again.",
            500,
          );
    const meta = {
      requestId,
      submissionId: payload?.submissionId,
      formType: payload?.formType,
      stage: "api",
      status: "failed",
      durationMs: Date.now() - started,
      failure: leadError.code,
      ...(leadError.upstreamStatus
        ? { upstreamStatus: leadError.upstreamStatus }
        : {}),
      ...(leadError.upstreamMessage
        ? { upstreamError: leadError.upstreamMessage }
        : {}),
    };

    if (leadError.status >= 500) logLeadError(meta);
    else logLead(meta);

    const extra = leadError.retryAfterSeconds
      ? { "Retry-After": String(leadError.retryAfterSeconds) }
      : undefined;
    return json(errorResponse(leadError), leadError.status, extra);
  }
}
