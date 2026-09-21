import { sendToBizosto } from "./bizosto-adapter";
import {
  sendCustomerConfirmationEmail,
  sendLeadEmail,
} from "./email-adapter";
import { LeadError } from "./errors";
import type { LeadConfig } from "./request-security";
import type { LeadSubmissionEnvelope } from "./types";

export type DeliveryChannel = "bizosto" | "email" | "customer-email";

export type DeliveryChannelResult = {
  channel: DeliveryChannel;
  ok: boolean;
  upstreamStatus?: number;
  referenceId?: string;
  duplicate?: boolean;
  error?: LeadError;
};

export type LeadDeliveryResult = {
  accepted: true;
  channels: DeliveryChannelResult[];
  referenceId?: string;
  duplicate?: boolean;
  customerConfirmationSent: boolean;
};

const unavailableMessage =
  "We couldn’t send your request right now. Your information is still in the form, so you can try again.";

function asLeadError(error: unknown) {
  return error instanceof LeadError
    ? error
    : new LeadError("UPSTREAM_UNAVAILABLE", unavailableMessage, 502);
}

function failedChannel(channel: DeliveryChannel, error: unknown): DeliveryChannelResult {
  const leadError = asLeadError(error);
  return {
    channel,
    ok: false,
    upstreamStatus: leadError.upstreamStatus,
    error: leadError,
  };
}

function misconfiguredChannel(channel: DeliveryChannel): DeliveryChannelResult {
  return failedChannel(
    channel,
    new LeadError("INTEGRATION_MISCONFIGURED", unavailableMessage, 503),
  );
}

export async function deliverLead(
  envelope: LeadSubmissionEnvelope,
  config: LeadConfig,
): Promise<LeadDeliveryResult> {
  const attempts: Promise<DeliveryChannelResult>[] = [];

  if (config.bizostoEnabled) {
    if (!config.apiUrl || !config.apiKey) {
      attempts.push(Promise.resolve(misconfiguredChannel("bizosto")));
    } else {
      attempts.push(
        sendToBizosto(envelope, config)
          .then((result) => ({
            channel: "bizosto" as const,
            ok: true,
            upstreamStatus: result.upstreamStatus,
            referenceId: result.referenceId,
            duplicate: result.duplicate,
          }))
          .catch((error) => failedChannel("bizosto", error)),
      );
    }
  }

  if (config.emailEnabled) {
    if (!config.emailApiKey || !config.emailFrom || !config.emailTo) {
      attempts.push(Promise.resolve(misconfiguredChannel("email")));
      attempts.push(Promise.resolve(misconfiguredChannel("customer-email")));
    } else {
      attempts.push(
        sendLeadEmail(envelope, config)
          .then((result) => ({
            channel: "email" as const,
            ok: true,
            upstreamStatus: result.upstreamStatus,
          }))
          .catch((error) => failedChannel("email", error)),
      );
      attempts.push(
        sendCustomerConfirmationEmail(envelope, config)
          .then((result) => ({
            channel: "customer-email" as const,
            ok: true,
            upstreamStatus: result.upstreamStatus,
          }))
          .catch((error) => failedChannel("customer-email", error)),
      );
    }
  }

  if (!attempts.length) {
    throw new LeadError("INTEGRATION_MISCONFIGURED", unavailableMessage, 503);
  }

  const channels = await Promise.all(attempts);
  const successfulDurable = channels.filter(
    (channel) => channel.ok && channel.channel !== "customer-email",
  );

  if (!successfulDurable.length) {
    const misconfigured = channels.find(
      (channel) => channel.error?.code === "INTEGRATION_MISCONFIGURED",
    );
    if (misconfigured?.error) throw misconfigured.error;

    const firstFailure = channels.find((channel) => channel.error)?.error;
    throw firstFailure || new LeadError("UPSTREAM_UNAVAILABLE", unavailableMessage, 502);
  }

  const bizosto = channels.find(
    (channel) => channel.channel === "bizosto" && channel.ok,
  );

  return {
    accepted: true,
    channels,
    customerConfirmationSent: channels.some(
      (channel) => channel.channel === "customer-email" && channel.ok,
    ),
    ...(bizosto?.referenceId ? { referenceId: bizosto.referenceId } : {}),
    ...(bizosto?.duplicate ? { duplicate: true } : {}),
  };
}
