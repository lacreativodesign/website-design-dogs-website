import { setTimeout as delay } from "timers/promises";
import { LeadError } from "./errors";
import type { LeadConfig } from "./request-security";
import type { LeadSubmissionEnvelope } from "./types";
import { phoneCountryName } from "./phone";

export type EmailDeliveryResult = {
  upstreamStatus: number;
  providerMessageId: string;
};

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const unavailableMessage =
  "We couldn’t send your request right now. Your information is still in the form, so you can try again.";

function inline(value: string | undefined) {
  return (value || "")
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function optionalLine(label: string, value?: string) {
  const clean = inline(value);
  return clean ? [`${label}: ${clean}`] : [];
}

function escapeHtml(value: string | undefined) {
  return (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function customerSubject(envelope: LeadSubmissionEnvelope) {
  if (envelope.formType === "quote") {
    return "Your Website Design Dogs project brief";
  }
  if (envelope.formType === "campaign") {
    return "Your Website Design Dogs Starter Website request";
  }
  return "We received your Website Design Dogs enquiry";
}

function customerHeading(envelope: LeadSubmissionEnvelope) {
  if (envelope.formType === "quote") return "Your project brief is safely in.";
  if (envelope.formType === "campaign") return "Your Starter Website request is in.";
  return "We’ve received your enquiry.";
}

function customerIntro(envelope: LeadSubmissionEnvelope) {
  if (envelope.formType === "quote") {
    return "Thanks for taking the time to complete the project brief. This email is your record of the information you submitted, including the package starting point you selected.";
  }
  if (envelope.formType === "campaign") {
    return "Thanks for requesting a Starter Website review. This email is your record of the information you submitted.";
  }
  return "Thanks for getting in touch. This email is your record of the enquiry you submitted.";
}

function customerRows(envelope: LeadSubmissionEnvelope) {
  const rows: Array<[string, string | undefined]> = [
    ["Name", envelope.contact.fullName],
    ["Email", envelope.contact.email],
    ["Phone", envelope.contact.phone],
    ["Phone country", phoneCountryName(envelope.contact.phoneCountry)],
    ["Business", envelope.business.name],
    ["Website", envelope.business.website],
    ["Industry", envelope.business.industry],
    ["Service", envelope.enquiry.service],
    ["Project summary", envelope.enquiry.summary],
  ];

  if (envelope.project) {
    rows.push(
      ["Project types", envelope.project.types.join(", ")],
      ["Estimated pages", envelope.project.pages],
      ["Business goal", envelope.project.goal],
      ["Requested features", envelope.project.features.join(", ")],
      ["Content status", envelope.project.contentStatus],
      ["Branding status", envelope.project.brandingStatus],
      ["Existing platform", envelope.project.existingPlatform],
      ["Current challenges", envelope.project.notWorking],
      ["Desired outcome", envelope.project.accomplish],
      ["Additional details", envelope.project.details],
    );
  }

  if (envelope.package) {
    rows.push(
      ["Preferred package", envelope.package.preferred],
      ["Budget", envelope.package.budget],
      ["Preferred timing", envelope.package.timing],
    );
  }

  if (envelope.campaign) {
    rows.push(
      ["Campaign", envelope.campaign.slug],
      ["Offer", envelope.campaign.offerCode],
    );
  }

  rows.push(
    ["Contact consent", envelope.consent.contact ? "Yes" : "No"],
    [
      "Privacy policy acknowledgement",
      envelope.consent.privacyPolicy ? "Yes" : "No",
    ],
  );

  return rows.filter(([, value]) => inline(value).length > 0);
}

export function toLeadEmailText(envelope: LeadSubmissionEnvelope) {
  const project = envelope.project;
  const selectedPackage = envelope.package;
  const campaign = envelope.campaign;
  const attribution = envelope.attribution;

  return [
    "New Website Design Dogs lead",
    "",
    `Submission ID: ${envelope.submissionId}`,
    `Form: ${envelope.formType}`,
    `Submitted: ${envelope.submittedAt}`,
    "",
    "CONTACT",
    `Name: ${inline(envelope.contact.fullName)}`,
    `Email: ${inline(envelope.contact.email)}`,
    ...optionalLine("Phone", envelope.contact.phone),
    ...optionalLine("Phone country", phoneCountryName(envelope.contact.phoneCountry)),
    "",
    "BUSINESS",
    `Business: ${inline(envelope.business.name)}`,
    ...optionalLine("Website", envelope.business.website),
    ...optionalLine("Industry", envelope.business.industry),
    "",
    "ENQUIRY",
    ...optionalLine("Service", envelope.enquiry.service),
    ...optionalLine("Project summary", envelope.enquiry.summary),
    ...(project
      ? [
          ...optionalLine("Project types", project.types.join(", ")),
          ...optionalLine("Estimated pages", project.pages),
          ...optionalLine("Business goal", project.goal),
          ...optionalLine("Requested features", project.features.join(", ")),
          ...optionalLine("Content status", project.contentStatus),
          ...optionalLine("Branding status", project.brandingStatus),
          ...optionalLine("Existing platform", project.existingPlatform),
          ...optionalLine("Current challenges", project.notWorking),
          ...optionalLine("Desired outcome", project.accomplish),
          ...optionalLine("Additional details", project.details),
        ]
      : []),
    ...(selectedPackage
      ? [
          ...optionalLine("Preferred package", selectedPackage.preferred),
          ...optionalLine("Budget", selectedPackage.budget),
          ...optionalLine("Preferred timing", selectedPackage.timing),
        ]
      : []),
    ...(campaign
      ? [
          ...optionalLine("Campaign", campaign.slug),
          ...optionalLine("Offer", campaign.offerCode),
        ]
      : []),
    "",
    "ATTRIBUTION",
    ...optionalLine("Landing page", attribution.landingPage),
    ...optionalLine("Current page", attribution.currentPage),
    ...optionalLine("Referrer", attribution.referrer),
    ...optionalLine("UTM source", attribution.utmSource),
    ...optionalLine("UTM medium", attribution.utmMedium),
    ...optionalLine("UTM campaign", attribution.utmCampaign),
    ...optionalLine("UTM term", attribution.utmTerm),
    ...optionalLine("UTM content", attribution.utmContent),
    ...optionalLine("Google click ID", attribution.gclid),
    ...optionalLine("Meta click ID", attribution.fbclid),
    "",
    "CONSENT",
    `Contact consent: ${envelope.consent.contact ? "yes" : "no"}`,
    `Privacy policy consent: ${envelope.consent.privacyPolicy ? "yes" : "no"}`,
    `Consent recorded: ${envelope.consent.agreedAt}`,
  ].join("\n");
}

export function toCustomerConfirmationText(envelope: LeadSubmissionEnvelope) {
  const lines = customerRows(envelope).flatMap(([label, value]) => [
    `${label}: ${inline(value)}`,
  ]);

  return [
    `Hi ${inline(envelope.contact.fullName)},`,
    "",
    customerHeading(envelope),
    customerIntro(envelope),
    "",
    "WHAT HAPPENS NEXT",
    "Our team will review your submission carefully and respond using the contact information you provided. A package selection is a starting point until scope, timing, and requirements are confirmed.",
    "",
    "YOUR SUBMISSION",
    ...lines,
    "",
    `Submission reference: ${envelope.submissionId}`,
    `Submitted: ${envelope.submittedAt}`,
    "",
    "If you need to add context, reply to this email.",
    "",
    "Website Design Dogs",
    "Loyal to the Game.",
    "https://www.websitedesigndogs.com",
  ].join("\n");
}

export function toCustomerConfirmationHtml(envelope: LeadSubmissionEnvelope) {
  const rows = customerRows(envelope)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;color:#607086;font-size:13px;font-weight:700;vertical-align:top;width:34%;border-bottom:1px solid #e8edf2;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;color:#0b1d33;font-size:14px;line-height:1.55;border-bottom:1px solid #e8edf2;">${escapeHtml(inline(value))}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#eef2f5;font-family:Arial,Helvetica,sans-serif;color:#0b1d33;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef2f5;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 14px 40px rgba(11,29,51,.10);">
            <tr>
              <td style="background:#081a2f;padding:24px 28px;border-bottom:5px solid #ff6a00;">
                <div style="font-size:20px;line-height:1;font-weight:900;letter-spacing:.6px;color:#ffffff;">WEBSITE DESIGN <span style="color:#ff6a00;">DOGS</span></div>
                <div style="margin-top:8px;color:#aeb9c8;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">Loyal to the Game.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 28px 12px;">
                <div style="display:inline-block;background:#fff1e7;color:#c94f00;border-radius:999px;padding:7px 11px;font-size:11px;font-weight:800;letter-spacing:.8px;text-transform:uppercase;">Request received</div>
                <h1 style="margin:18px 0 10px;font-size:30px;line-height:1.15;color:#081a2f;">${escapeHtml(customerHeading(envelope))}</h1>
                <p style="margin:0;color:#4f6074;font-size:15px;line-height:1.7;">Hi ${escapeHtml(inline(envelope.contact.fullName))},</p>
                <p style="margin:10px 0 0;color:#4f6074;font-size:15px;line-height:1.7;">${escapeHtml(customerIntro(envelope))}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f9fb;border:1px solid #e4eaf0;border-radius:14px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <div style="font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#ff6a00;">What happens next</div>
                      <div style="margin-top:7px;color:#4f6074;font-size:14px;line-height:1.65;">Our team will review your submission carefully and respond using the contact information you provided. A package selection is a starting point until scope, timing, and requirements are confirmed.</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 28px 8px;">
                <h2 style="margin:0 0 12px;font-size:19px;color:#081a2f;">Your submission</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e8edf2;border-radius:12px;border-collapse:separate;border-spacing:0;overflow:hidden;">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#081a2f;border-radius:14px;">
                  <tr>
                    <td style="padding:18px 20px;color:#ffffff;">
                      <div style="font-size:12px;color:#ff9a55;font-weight:800;text-transform:uppercase;letter-spacing:.8px;">Submission record</div>
                      <div style="margin-top:7px;font-size:13px;line-height:1.6;color:#d9e1ea;">Reference: ${escapeHtml(envelope.submissionId)}<br>Submitted: ${escapeHtml(envelope.submittedAt)}</div>
                    </td>
                  </tr>
                </table>
                <p style="margin:22px 0 0;color:#4f6074;font-size:14px;line-height:1.65;">Need to add something? Simply reply to this email and your message will reach the Website Design Dogs team.</p>
                <p style="margin:22px 0 0;"><a href="https://www.websitedesigndogs.com" style="display:inline-block;background:#ff6a00;color:#ffffff;text-decoration:none;font-size:14px;font-weight:800;padding:13px 18px;border-radius:9px;">Visit Website Design Dogs</a></p>
              </td>
            </tr>
            <tr>
              <td style="background:#f7f9fb;border-top:1px solid #e8edf2;padding:20px 28px;color:#738196;font-size:12px;line-height:1.6;">
                This is a transactional confirmation of a request you submitted at Website Design Dogs. Keep it for your records.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function responseDetails(value: unknown) {
  if (!value || typeof value !== "object") return undefined;
  return value as { id?: unknown; message?: unknown; error?: unknown };
}

function sanitizeProviderError(value: unknown, apiKey?: string) {
  if (typeof value !== "string") return undefined;
  let message = value.replace(/[\r\n]+/g, " ").trim();
  if (apiKey) message = message.replaceAll(apiKey, "[redacted]");
  return message.slice(0, 500) || undefined;
}

async function sendOnce(
  envelope: LeadSubmissionEnvelope,
  config: LeadConfig,
  options: {
    kind: "lead" | "customer-confirmation";
    to: string;
    replyTo: string;
    subject: string;
    text: string;
    html?: string;
  },
): Promise<EmailDeliveryResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.emailTimeoutMs);

  try {
    const response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.emailApiKey || ""}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Idempotency-Key":
          options.kind === "lead"
            ? `wdd-lead/${envelope.submissionId}`
            : `wdd-confirmation/${envelope.submissionId}`,
      },
      body: JSON.stringify({
        from: config.emailFrom,
        to: [options.to],
        reply_to: options.replyTo,
        subject: options.subject,
        text: options.text,
        ...(options.html ? { html: options.html } : {}),
      }),
      signal: controller.signal,
    });

    const status = response.status;
    const body: unknown = await response.json().catch(() => undefined);
    const details = responseDetails(body);

    if (response.ok && typeof details?.id === "string" && details.id) {
      return { upstreamStatus: status, providerMessageId: details.id };
    }

    const upstreamMessage = sanitizeProviderError(
      details?.message ||
        details?.error ||
        (response.ok ? "Invalid email provider response." : undefined),
      config.emailApiKey,
    );
    const retryable =
      status >= 500 || status === 429 || status === 409 || response.ok;

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
    throw new LeadError("UPSTREAM_UNAVAILABLE", unavailableMessage, 502);
  } finally {
    clearTimeout(timer);
  }
}

async function withRetry(send: () => Promise<EmailDeliveryResult>) {
  try {
    return await send();
  } catch (error) {
    if (error instanceof LeadError && error.status === 502) {
      await delay(250);
      return send();
    }
    throw error;
  }
}

export function sendLeadEmail(
  envelope: LeadSubmissionEnvelope,
  config: LeadConfig,
): Promise<EmailDeliveryResult> {
  return withRetry(() =>
    sendOnce(envelope, config, {
      kind: "lead",
      to: config.emailTo || "",
      replyTo: envelope.contact.email,
      subject: `WDD ${envelope.formType} lead — ${inline(envelope.business.name) || inline(envelope.contact.fullName)}`,
      text: toLeadEmailText(envelope),
    }),
  );
}

export function sendCustomerConfirmationEmail(
  envelope: LeadSubmissionEnvelope,
  config: LeadConfig,
): Promise<EmailDeliveryResult> {
  return withRetry(() =>
    sendOnce(envelope, config, {
      kind: "customer-confirmation",
      to: envelope.contact.email,
      replyTo: config.emailTo || "",
      subject: customerSubject(envelope),
      text: toCustomerConfirmationText(envelope),
      html: toCustomerConfirmationHtml(envelope),
    }),
  );
}
