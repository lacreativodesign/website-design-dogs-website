"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { campaignEvent } from "@/components/forms/analytics-events";
import { getAttribution } from "@/components/forms/attribution";
import { Field, inputClass } from "@/components/forms/form-field";
import { submitLead } from "@/components/forms/submission";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  campaignOffer,
  campaignProjectTypes,
  type CampaignSlug,
} from "@/content/campaigns";

type Props = {
  campaignSlug: CampaignSlug;
};

type Fields = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  projectType: string;
  note: string;
  consent: boolean;
  verificationCode: string;
};

const initial: Fields = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  projectType: "New Website",
  note: "",
  consent: false,
  verificationCode: "",
};

function hasInvalidUrl(value: string) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return !["http:", "https:"].includes(url.protocol);
  } catch {
    return true;
  }
}

export function CampaignLeadForm({ campaignSlug }: Props) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [ok, setOk] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  const [startedAt, setStartedAt] = useState(() => new Date().toISOString());
  const statusRef = useRef<HTMLDivElement>(null);
  const [attribution] = useState(getAttribution);
  const startedRef = useRef(false);

  const update = (key: keyof Fields, value: string | boolean) => {
    setValues((current) => ({ ...current, [key]: value }));

    if (!startedRef.current) {
      startedRef.current = true;
      campaignEvent("wdd_quote_start", {
        campaignSlug,
        offerCode: campaignOffer.offerCode,
        pagePath: location.pathname,
        utmCampaign: attribution.utmCampaign,
        utmSource: attribution.utmSource,
        utmMedium: attribution.utmMedium,
      });
    }
  };

  const onToken = useCallback(
    (token: string) => setTurnstileToken(token),
    [],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const nextErrors: Record<string, string> = {};
    if (values.fullName.trim().length < 2) {
      nextErrors.fullName = "Enter your full name.";
    }
    if (!values.businessName.trim()) {
      nextErrors.businessName = "Enter the business name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (hasInvalidUrl(values.website)) {
      nextErrors.website = "Enter a valid public URL.";
    }
    if (!values.consent) {
      nextErrors.consent = "Confirm consent.";
    }
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      nextErrors.turnstile = "Complete the anti-spam verification.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setBusy(true);
    setOk(false);
    setStatus("Sending your request…");
    campaignEvent("wdd_lead_submit", {
      campaignSlug,
      offerCode: campaignOffer.offerCode,
      pagePath: location.pathname,
      projectType: values.projectType,
    });

    const result = await submitLead(
      {
        source: "campaign",
        campaignSlug,
        contact: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone || undefined,
        },
        business: {
          name: values.businessName,
          website: values.website || undefined,
        },
        project: {
          type: values.projectType as
            | "New Website"
            | "Website Redesign"
            | "Not Sure Yet",
          note: values.note || undefined,
        },
        consent: values.consent,
        verificationCode: values.verificationCode,
      },
      {
        submissionId,
        formStartedAt: startedAt,
        turnstileToken,
        attribution,
      },
    );

    setBusy(false);
    if (result.ok) {
      setOk(true);
      setStatus(
        `${result.message}${
          result.referenceId
            ? ` Reference ID: ${result.referenceId}`
            : ""
        }`,
      );
      setValues(initial);
      setSubmissionId(crypto.randomUUID());
      setStartedAt(new Date().toISOString());
      campaignEvent("wdd_lead_success", {
        eventId: submissionId,
        campaignSlug,
        offerCode: campaignOffer.offerCode,
        pagePath: location.pathname,
        projectType: values.projectType,
      });
    } else {
      setOk(false);
      setStatus(result.message);
      setErrors(result.fieldErrors ?? {});
      campaignEvent("wdd_lead_error", {
        campaignSlug,
        offerCode: campaignOffer.offerCode,
        pagePath: location.pathname,
        projectType: values.projectType,
        failureCategory: result.code,
      });
    }

    setResetKey((key) => key + 1);
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  return (
    <Section
      id="campaign-form"
      className="scroll-mt-24 pb-28 sm:pb-20"
    >
      <Container>
        <Card className="mx-auto max-w-3xl p-6 sm:p-8">
          <p className="eyebrow">Campaign lead form</p>
          <h2 className="mt-3 text-3xl font-black">
            Request a $499 Starter Website Quote
          </h2>
          <p className="mt-3 text-[var(--color-text-muted)]">
            Submitting this form requests a project review. It does not
            automatically confirm scope, timing, acceptance, or any
            requirements outside the Starter package.
          </p>
          <div
            ref={statusRef}
            tabIndex={-1}
            aria-live="polite"
            className={`mt-5 rounded-[var(--radius-md)] p-4 text-sm font-bold ${
              status ? "border border-[var(--color-border)]" : "sr-only"
            }`}
          >
            {status || "Campaign form status"}
          </div>
          <form
            onSubmit={onSubmit}
            aria-busy={busy}
            className="mt-6 grid gap-5"
          >
            <input
              type="text"
              name="company"
              value={values.verificationCode}
              onChange={(event) =>
                update("verificationCode", event.target.value)
              }
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <Field
              id="fullName"
              label="Full name"
              required
              error={errors.fullName}
            >
              <input
                id="fullName"
                autoComplete="name"
                className={inputClass}
                value={values.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                aria-invalid={Boolean(errors.fullName)}
              />
            </Field>
            <Field
              id="businessName"
              label="Business name"
              required
              error={errors.businessName}
            >
              <input
                id="businessName"
                autoComplete="organization"
                className={inputClass}
                value={values.businessName}
                onChange={(event) =>
                  update("businessName", event.target.value)
                }
                aria-invalid={Boolean(errors.businessName)}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="email"
                label="Email address"
                required
                error={errors.email}
              >
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>
              <Field id="phone" label="Phone number" error={errors.phone}>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                  value={values.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
              </Field>
            </div>
            <Field
              id="website"
              label="Current website"
              error={errors.website}
            >
              <input
                id="website"
                type="url"
                autoComplete="url"
                className={inputClass}
                value={values.website}
                onChange={(event) => update("website", event.target.value)}
                aria-invalid={Boolean(errors.website)}
              />
            </Field>
            <Field
              id="projectType"
              label="Project type"
              required
              error={errors.projectType}
            >
              <select
                id="projectType"
                className={inputClass}
                value={values.projectType}
                onChange={(event) =>
                  update("projectType", event.target.value)
                }
              >
                {campaignProjectTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>
            <Field
              id="note"
              label="Short project note"
              error={errors.note}
            >
              <textarea
                id="note"
                className={inputClass}
                rows={4}
                value={values.note}
                onChange={(event) => update("note", event.target.value)}
                aria-invalid={Boolean(errors.note)}
              />
            </Field>
            <TurnstileWidget
              action="campaign_lead"
              cData={submissionId}
              onToken={onToken}
              resetKey={resetKey}
            />
            {errors.turnstile ? (
              <p className="text-sm font-bold text-orange-300">
                {errors.turnstile}
              </p>
            ) : null}
            <label className="flex gap-3 text-sm">
              <input
                type="checkbox"
                required
                checked={values.consent}
                onChange={(event) =>
                  update("consent", event.target.checked)
                }
                aria-invalid={Boolean(errors.consent)}
              />
              <span>
                I consent to Website Design Dogs using these details to review
                and respond to this enquiry, and I acknowledge the{" "}
                <Link className="underline" href="/privacy-policy">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.consent ? (
              <p className="text-sm font-bold text-orange-300">
                {errors.consent}
              </p>
            ) : null}
            <Button type="submit" disabled={busy}>
              {busy ? "Sending…" : "Request a Starter Website Quote"}
            </Button>
            {ok ? null : (
              <p className="text-xs text-[var(--color-text-muted)]">
                Your information remains in the form unless submission is
                confirmed successful.
              </p>
            )}
          </form>
        </Card>
      </Container>
    </Section>
  );
}
