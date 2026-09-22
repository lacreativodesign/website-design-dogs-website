"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { leadEvent } from "@/components/forms/analytics-events";
import { getAttribution } from "@/components/forms/attribution";
import { Field, inputClass } from "@/components/forms/form-field";
import { InternationalPhoneInput } from "@/components/forms/international-phone-input";
import { submitLead } from "@/components/forms/submission";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { normalizePhoneNumber, type PhoneCountryCode } from "@/lib/leads/phone";
import { isValidWebsiteInput, normalizeWebsiteInput } from "@/lib/leads/website";

const projectTypes = [
  "New Website",
  "Website Redesign",
  "E-Commerce Solutions",
  "Campaign Landing Page",
  "Not Sure Yet",
] as const;

type Placement = "hero" | "mid" | "final";

type Fields = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  phoneCountry: PhoneCountryCode;
  website: string;
  projectType: (typeof projectTypes)[number];
  note: string;
  consent: boolean;
  verificationCode: string;
};

const initial: Fields = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  phoneCountry: "US",
  website: "",
  projectType: "New Website",
  note: "",
  consent: false,
  verificationCode: "",
};

const campaignSlug = "october-offer" as const;
const offerCode = "OCTOBER-2026-40-OFF";

export function OfferLeadForm({
  placement,
  compact = false,
}: {
  placement: Placement;
  compact?: boolean;
}) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [ok, setOk] = useState(false);
  const [reference, setReference] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  const [startedAt, setStartedAt] = useState(() => new Date().toISOString());
  const [attribution] = useState(getAttribution);
  const startedRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const id = (field: string) => `offer-${placement}-${field}`;

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((current) => ({ ...current, [key]: value }));

    if (!startedRef.current) {
      startedRef.current = true;
      leadEvent("wdd_quote_start", {
        campaignSlug,
        offerCode,
        placement,
        pagePath: location.pathname,
        utmCampaign: attribution.utmCampaign,
        utmSource: attribution.utmSource,
        utmMedium: attribution.utmMedium,
      });
    }
  };

  const onToken = useCallback((token: string) => setTurnstileToken(token), []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const nextErrors: Record<string, string> = {};
    if (values.fullName.trim().length < 2) nextErrors.fullName = "Enter your full name.";
    if (!values.businessName.trim()) nextErrors.businessName = "Enter your business name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    const normalizedPhone = normalizePhoneNumber(values.phoneCountry, values.phone);
    if (!normalizedPhone) {
      nextErrors.phone = "Enter a valid phone number for the selected country.";
    }
    if (!isValidWebsiteInput(values.website)) {
      nextErrors.website = "Enter a valid website address.";
    }
    if (!values.consent) nextErrors.consent = "Confirm consent.";
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      nextErrors.turnstile = "Complete the anti-spam verification.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setBusy(true);
    setOk(false);
    setStatus("Sending your October offer request…");

    leadEvent("wdd_lead_submit", {
      campaignSlug,
      offerCode,
      placement,
      pagePath: location.pathname,
      projectType: values.projectType,
    });

    const eventId = submissionId;
    const result = await submitLead(
      {
        source: "campaign",
        campaignSlug,
        contact: {
          fullName: values.fullName,
          email: values.email,
          phone: normalizedPhone!,
          phoneCountry: values.phoneCountry,
        },
        business: {
          name: values.businessName,
          website: normalizeWebsiteInput(values.website),
        },
        project: {
          type: values.projectType,
          note: values.note || undefined,
        },
        consent: values.consent,
        verificationCode: values.verificationCode,
      },
      {
        submissionId: eventId,
        formStartedAt: startedAt,
        turnstileToken,
        attribution,
      },
    );

    setBusy(false);

    if (result.ok) {
      setOk(true);
      setReference(result.referenceId || eventId);
      setStatus(
        result.confirmationEmailSent
          ? "Request received. Check your inbox for your Website Design Dogs confirmation."
          : "Request received. Your details are safely recorded for review.",
      );
      leadEvent("wdd_lead_success", {
        eventId,
        campaignSlug,
        offerCode,
        placement,
        pagePath: location.pathname,
        projectType: values.projectType,
      });
      setValues(initial);
      setSubmissionId(crypto.randomUUID());
      setStartedAt(new Date().toISOString());
    } else {
      setStatus(result.message);
      setErrors(result.fieldErrors ?? {});
      leadEvent("wdd_lead_error", {
        campaignSlug,
        offerCode,
        placement,
        pagePath: location.pathname,
        projectType: values.projectType,
        failureCategory: result.code,
      });
    }

    setResetKey((key) => key + 1);
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (ok) {
    return (
      <div
        data-offer-lead-form={placement}
        className="rounded-[1.4rem] border border-[rgb(255_106_0_/_0.42)] bg-[linear-gradient(145deg,rgba(255,106,0,.12),rgba(5,20,38,.96)_42%)] p-5 shadow-[0_24px_70px_rgba(0,0,0,.28)] sm:p-6"
      >
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-primary-orange)]">
          Offer request received
        </p>
        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">
          You’re in. We’ll review the project next.
        </h3>
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]"
        >
          {status}
        </div>
        {reference ? (
          <p className="mt-3 break-all text-xs text-[var(--color-text-subtle)]">
            Reference: {reference}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/get-started?service=website-design&utm_source=website&utm_medium=offer-page&utm_campaign=october-2026-40-off&utm_content=offer-form-success"
            className="btn btn-primary btn-small"
          >
            Add More Project Details
          </Link>
          <Link href="/portfolio" className="btn btn-outline btn-small">
            Explore Our Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      data-offer-lead-form={placement}
      className="rounded-[1.4rem] border border-[rgb(255_255_255_/_0.13)] bg-[linear-gradient(160deg,rgba(11,31,52,.98),rgba(4,17,31,.96))] p-5 shadow-[0_26px_90px_rgba(0,0,0,.34)] backdrop-blur sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--color-primary-orange)]">
            October 40% offer
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.03em] sm:text-[1.75rem]">
            Get my discounted project quote
          </h2>
        </div>
        <span className="rounded-full border border-[rgb(255_106_0_/_0.35)] bg-[rgb(255_106_0_/_0.1)] px-3 py-1 text-xs font-black text-orange-200">
          No obligation
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
        Tell us the essentials. We’ll review eligibility, scope, timing, and the October promotion before anything is booked.
      </p>

      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className={status ? "mt-4 rounded-xl border border-[var(--color-border)] bg-black/15 p-3 text-sm font-bold" : "sr-only"}
      >
        {status || "Offer form status"}
      </div>

      <form onSubmit={onSubmit} aria-busy={busy} className="mt-5 grid gap-4">
        <input
          type="text"
          name="company"
          value={values.verificationCode}
          onChange={(event) => update("verificationCode", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={id("fullName")} label="Full name" required error={errors.fullName}>
            <input
              id={id("fullName")}
              autoComplete="name"
              className={inputClass}
              value={values.fullName}
              onChange={(event) => update("fullName", event.target.value)}
            />
          </Field>
          <Field id={id("businessName")} label="Business name" required error={errors.businessName}>
            <input
              id={id("businessName")}
              autoComplete="organization"
              className={inputClass}
              value={values.businessName}
              onChange={(event) => update("businessName", event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id={id("email")} label="Email" required error={errors.email}>
            <input
              id={id("email")}
              type="email"
              autoComplete="email"
              className={inputClass}
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </Field>
          <Field id={id("phone")} label="Phone" required error={errors.phone}>
            <InternationalPhoneInput
              id={id("phone")}
              country={values.phoneCountry}
              number={values.phone}
              onCountryChange={(country) => update("phoneCountry", country)}
              onNumberChange={(number) => update("phone", number)}
              invalid={Boolean(errors.phone)}
            />
          </Field>
        </div>

        <Field
          id={id("website")}
          label="Current website"
          error={errors.website}
          hint="Optional. Just type your domain — https:// is not required."
        >
          <input
            id={id("website")}
            type="text"
            inputMode="url"
            autoComplete="url"
            className={inputClass}
            value={values.website}
            onChange={(event) => update("website", event.target.value)}
            placeholder="example.com"
          />
        </Field>

        <Field id={id("projectType")} label="Project type" required error={errors.projectType}>
          <select
            id={id("projectType")}
            className={inputClass}
            value={values.projectType}
            onChange={(event) =>
              update(
                "projectType",
                event.target.value as Fields["projectType"],
              )
            }
          >
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>

        {!compact ? (
          <Field id={id("note")} label="What do you want the website to accomplish?" error={errors.note}>
            <textarea
              id={id("note")}
              className={inputClass}
              rows={3}
              value={values.note}
              onChange={(event) => update("note", event.target.value)}
              placeholder="More leads, online sales, a stronger first impression…"
            />
          </Field>
        ) : null}

        <TurnstileWidget
          action="campaign_lead"
          cData={submissionId}
          onToken={onToken}
          resetKey={resetKey}
        />

        {errors.turnstile ? (
          <p className="text-sm font-bold text-orange-300">{errors.turnstile}</p>
        ) : null}

        <label className="flex items-start gap-3 text-xs leading-5 text-[var(--color-text-muted)]">
          <input
            type="checkbox"
            required
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            className="mt-1"
          />
          <span>
            I consent to Website Design Dogs using these details to review and respond to this enquiry, and I acknowledge the{" "}
            <Link className="font-bold text-white underline underline-offset-2" href="/privacy-policy">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {errors.consent ? (
          <p className="text-sm font-bold text-orange-300">{errors.consent}</p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--color-primary-orange)] px-5 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(255,106,0,.28)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Sending…" : "Get My 40% Off Quote"}
        </button>

        <p className="text-center text-[11px] leading-5 text-[var(--color-text-subtle)]">
          Qualifying website design/development service fees only. Final scope and promotional eligibility are confirmed in writing before work begins.
        </p>
      </form>
    </div>
  );
}
