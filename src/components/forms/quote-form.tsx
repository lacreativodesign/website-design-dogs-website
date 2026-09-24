"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { mascotDesigner } from "@/content/illustrations";
import {
  isLeadIndustryOption,
  leadIndustryOptions,
  type LeadIndustryOption,
} from "@/content/lead-industries";
import { platformPreferenceOptions } from "@/content/platforms";
import { services } from "@/content/services";
import { leadEvent } from "./analytics-events";
import { getAttribution } from "./attribution";
import { Field, inputClass } from "./form-field";
import { submitLead, type QuoteRequestPayload } from "./submission";
import { TurnstileWidget } from "./turnstile-widget";
import { InternationalPhoneInput } from "./international-phone-input";
import { normalizePhoneNumber } from "@/lib/leads/phone";
import { normalizeWebsiteInput } from "@/lib/leads/website";
import { LiveChatButton } from "./live-chat-button";

const projectTypes = [
  "New Website",
  "Website Redesign",
  "E-Commerce Solutions",
  "Campaign Landing Page",
  "Website Care",
  "SEO & Local Optimization",
  "Social Media Marketing",
  "Mobile App Development",
  "AI or Workflow Integration",
  "Custom Website Design",
  "Website Development",
  "Conversion Optimization",
  "Content & Copywriting",
  "Website Care, Hosting & Security",
  "Analytics & Reporting",
  "Not Sure Yet",
] as const;

const serviceProjectTypes: Record<string, string> = Object.fromEntries(
  services.map((service) => [service.slug, service.title]),
);

const features = [
  "Contact or quote form",
  "Online booking",
  "E-commerce",
  "Blog",
  "Portfolio",
  "Location pages",
  "CRM integration",
  "Email automation",
  "Analytics",
  "Payment integration",
  "Customer portal",
  "Not sure yet",
] as const;

const budgets = [
  "Under $500",
  "$500–$999",
  "$1,000–$1,499",
  "$1,500–$2,499",
  "$2,500–$4,999",
  "$5,000–$12,499",
  "$12,500–$24,999",
  "$25,000+",
  "Monthly service budget",
  "Not Sure Yet",
] as const;

const timings = [
  "As soon as practical",
  "Within 30 days",
  "Within 60 days",
  "Within 90 days",
  "Researching options",
] as const;

const stageDetails = [
  ["Your Business", "Start with the essentials so we know who the project is for."],
  ["Project Type", "Choose everything that applies."],
  ["Project Details", "Tell us the basics we need to understand your request."],
  ["Final Details", "Share your budget, timing, and any context that will help us prepare the quote."],
] as const;

const guideReactions = [
  "First, a quick introduction.",
  "Now we’re mapping the kind of work you need.",
  "A few practical details will help us understand the request.",
  "Last step—add the context that matters.",
] as const;

function empty(
  service = "",
  industry = "",
): QuoteRequestPayload {
  return {
    contact: { fullName: "", email: "", phone: "", phoneCountry: "US" },
    business: { name: "", website: "", industry },
    project: {
      types: serviceProjectTypes[service] ? [serviceProjectTypes[service]] : [],
      pages: "",
      goal: "",
      features: [],
      contentStatus: "",
      brandingStatus: "",
      existingPlatform: "",
      notWorking: "",
      accomplish: "",
      details: "",
    },
    package: { budget: "", timing: "" },
    consent: false,
    source: "get-started",
  };
}

function toggleValue(values: string[], value: string) {
  const unknownValues = new Set(["Not Sure Yet", "Not sure yet"]);

  if (unknownValues.has(value)) {
    return values.includes(value) ? [] : [value];
  }

  const knownValues = values.filter((item) => !unknownValues.has(item));
  return knownValues.includes(value)
    ? knownValues.filter((item) => item !== value)
    : [...knownValues, value];
}

function ChoiceGrid({
  legend,
  values,
  selected,
  onChange,
  error,
}: {
  legend: string;
  values: readonly string[];
  selected: string[];
  onChange: (values: string[]) => void;
  error?: string;
}) {
  const errorId = `choice-${legend.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-error`;
  return (
    <fieldset className="quote-choice-fieldset" aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : undefined}>
      <legend className="sr-only">{legend}</legend>
      <div className="quote-choice-grid">
        {values.map((value) => {
          const checked = selected.includes(value);
          return (
            <label
              key={value}
              className={
                checked
                  ? "quote-choice-card quote-choice-card--selected"
                  : "quote-choice-card"
              }
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(toggleValue(selected, value))}
              />
              <span aria-hidden="true">{checked ? "✓" : "+"}</span>
              <strong>{value}</strong>
            </label>
          );
        })}
      </div>
      {error ? <p id={errorId} className="quote-field-error">{error}</p> : null}
    </fieldset>
  );
}

type QuoteFormProps = {
  requestedService?: string;
  requestedIndustry?: string;
};

export function QuoteForm({
  requestedService = "",
  requestedIndustry = "",
}: QuoteFormProps) {
  const [data, setData] = useState(() =>
    empty(requestedService, requestedIndustry),
  );
  const initialIndustryChoice: LeadIndustryOption | "" =
    requestedIndustry && isLeadIndustryOption(requestedIndustry)
      ? requestedIndustry
      : requestedIndustry
        ? "Other"
        : "";
  const [industryChoice, setIndustryChoice] =
    useState<LeadIndustryOption | "">(initialIndustryChoice);
  const [otherIndustry, setOtherIndustry] = useState(
    initialIndustryChoice === "Other" && requestedIndustry !== "Other"
      ? requestedIndustry
      : "",
  );
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [submissionId] = useState(() => crypto.randomUUID());
  const [formStartedAt] = useState(() => new Date().toISOString());
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationExecuteKey, setVerificationExecuteKey] = useState(0);
  const [attribution] = useState(getAttribution);
  const startedRef = useRef(false);
  const pendingVerificationRef = useRef(false);
  const turnstileTokenRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const onToken = useCallback((token: string) => {
    turnstileTokenRef.current = token;
    setTurnstileToken(token);

    if (token && pendingVerificationRef.current) {
      pendingVerificationRef.current = false;
      setVerifying(false);
      requestAnimationFrame(() => formRef.current?.requestSubmit());
    } else if (!token && pendingVerificationRef.current) {
      pendingVerificationRef.current = false;
      setVerifying(false);
      setErrors((current) => ({
        ...current,
        turnstile:
          "Secure verification could not complete. Please click Send Quote Request to try again.",
      }));
    }
  }, []);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    leadEvent("wdd_quote_start", {
      formType: "quote",
      serviceSlug: requestedService,
      pagePath: location.pathname,
      utmCampaign: attribution.utmCampaign,
    });
  }

  function validate(targetStep = step) {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 0) {
      if (!data.contact.fullName.trim()) nextErrors.fullName = "Enter your full name.";
      if (!/^\S+@\S+\.\S+$/.test(data.contact.email)) {
        nextErrors.email = "Enter a valid email.";
      }
      if (!normalizePhoneNumber(data.contact.phoneCountry, data.contact.phone)) {
        nextErrors.phone = "Enter a valid phone number. Include +country code for international numbers.";
      }
      if (data.business.website && !normalizeWebsiteInput(data.business.website)) {
        nextErrors.website = "Enter a valid website address.";
      }
      if (!data.business.name.trim()) nextErrors.business = "Enter your business name.";
      if (!industryChoice) nextErrors.industry = "Select your industry.";
      if (industryChoice === "Other" && !otherIndustry.trim()) {
        nextErrors.otherIndustry = "Tell us your industry.";
      }
    }

    if (targetStep === 1 && data.project.types.length === 0) {
      nextErrors.types = "Select at least one project type.";
    }

    if (targetStep === 2) {
      if (!data.project.pages) nextErrors.pages = "Choose an estimated page count.";
      if (!data.project.goal.trim()) nextErrors.goal = "Enter the main business goal.";
      if (data.project.features.length === 0) {
        nextErrors.features = "Select at least one feature or Not sure yet.";
      }
      if (!data.project.contentStatus) {
        nextErrors.contentStatus = "Choose a content status.";
      }
      if (!data.project.brandingStatus) {
        nextErrors.brandingStatus = "Choose a branding status.";
      }
    }

    if (targetStep === 3) {
      if (!data.package.budget) nextErrors.budget = "Choose a budget range.";
      if (!data.package.timing) nextErrors.timing = "Choose preferred timing.";
      if (data.project.notWorking.trim().length < 10) {
        nextErrors.notWorking = "Share what is not working today.";
      }
      if (data.project.accomplish.trim().length < 10) {
        nextErrors.accomplish = "Share what this project should accomplish.";
      }
      if (!data.consent) nextErrors.consent = "Confirm consent to be contacted.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function focusStage() {
    requestAnimationFrame(() => stageHeadingRef.current?.focus());
  }

  function focusFirstError() {
    requestAnimationFrame(() => {
      const firstInvalid = document.querySelector<HTMLElement>(
        ".quote-builder [aria-invalid='true']",
      );
      if (firstInvalid instanceof HTMLFieldSetElement) {
        firstInvalid.querySelector<HTMLElement>("input, select, textarea")?.focus();
      } else {
        firstInvalid?.focus();
      }
    });
  }

  function next() {
    markStarted();
    if (!validate()) {
      focusFirstError();
      return;
    }
    const nextStep = Math.min(3, step + 1);

    setStep(nextStep);
    setStatus(`Step ${nextStep + 1} of 4: ${stageDetails[nextStep][0]}`);
    focusStage();
  }

  function back() {
    const nextStep = Math.max(0, step - 1);
    setStep(nextStep);
    setStatus(`Step ${nextStep + 1} of 4: ${stageDetails[nextStep][0]}`);
    focusStage();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setStatus("");
    setReference("");
    if (!validate(3)) {
      setStatus("Please review the highlighted fields and try again.");
      focusFirstError();
      return;
    }

    if (
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
      !turnstileTokenRef.current
    ) {
      pendingVerificationRef.current = true;
      setVerifying(true);
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors.turnstile;
        return nextErrors;
      });
      setStatus("Securely verifying your request…");
      setVerificationExecuteKey((key) => key + 1);
      return;
    }

    setVerifying(false);
    setSubmitting(true);
    leadEvent("wdd_lead_submit", {
      formType: "quote",
      utmCampaign: attribution.utmCampaign,
      pagePath: location.pathname,
    });

    const normalizedPhone = normalizePhoneNumber(
      data.contact.phoneCountry,
      data.contact.phone,
    )!;

    const response = await submitLead(
      {
        ...data,
        contact: {
          ...data.contact,
          phone: normalizedPhone,
        },
        business: {
          ...data.business,
          website: normalizeWebsiteInput(data.business.website),
        },
      },
      {
      submissionId,
      formStartedAt,
      turnstileToken: turnstileTokenRef.current || turnstileToken,
      verificationCode: new FormData(event.currentTarget)
        .get("company-url")
        ?.toString(),
      attribution,
      },
    );

    setSubmitting(false);
    setStatus(response.message);
    setResetKey((key) => key + 1);

    if (response.ok) {
      leadEvent("wdd_lead_success", {
        eventId: submissionId,
        formType: "quote",
          utmCampaign: attribution.utmCampaign,
        pagePath: location.pathname,
      });
      setReference(response.referenceId || "");
      setConfirmationEmailSent(response.confirmationEmailSent === true);
      setErrors({});
      setSubmitted(true);
    } else {
      leadEvent("wdd_lead_error", {
        formType: "quote",
          utmCampaign: attribution.utmCampaign,
        failureCategory: response.code,
        pagePath: location.pathname,
      });
      if (response.fieldErrors) setErrors(response.fieldErrors);
      setStep(3);
    }

    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const summaryProject =
    data.project.types.length > 0
      ? data.project.types.slice(0, 2).join(", ")
      : "Not chosen yet";

  if (submitted) {
    return (
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)]">
        <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,.65fr)]">
          <div className="p-6 sm:p-9 lg:p-11">
            <p
              ref={statusRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="home-eyebrow"
            >
              Request received
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              Thanks — your project brief is safely in.
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
              We have your details. Our team will review the brief and respond using
              the contact information you provided. There is no need to submit it again.
            </p>

            {confirmationEmailSent ? (
              <div className="mt-6 max-w-3xl rounded-[var(--radius-md)] border border-[rgb(255_106_0_/_0.42)] bg-[rgb(255_106_0_/_0.08)] p-4 sm:p-5">
                <span className="block text-xs font-black uppercase tracking-[0.12em] text-[var(--color-primary-orange)]">
                  Confirmation sent
                </span>
                <strong className="mt-2 block text-base text-[var(--color-foreground)]">
                  Check your inbox at {data.contact.email}
                </strong>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  We sent a professional confirmation email with a complete copy of
                  your submitted brief for your records. If it does not appear within
                  a few minutes, please check spam or junk.
                </p>
              </div>
            ) : (
              <div className="mt-6 max-w-3xl rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-section-alt)] p-4 sm:p-5">
                <strong className="block">Your request is safely recorded</strong>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                  We could not confirm delivery of the receipt email, but Website
                  Design Dogs still has your submission for review.
                </p>
              </div>
            )}

            <div className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-section-alt)] p-4">
                <span className="text-xs font-black uppercase tracking-[0.1em] text-[var(--color-primary-orange)]">
                  01 · Review
                </span>
                <strong className="mt-2 block">We review the complete brief</strong>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                  Requirements, budget, timing, goals, and project context are reviewed together.
                </p>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-section-alt)] p-4">
                <span className="text-xs font-black uppercase tracking-[0.1em] text-[var(--color-primary-orange)]">
                  02 · Follow-up
                </span>
                <strong className="mt-2 block">We prepare the practical next step</strong>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">
                  Our team will contact you if clarification is needed before scope or pricing is confirmed.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn btn-primary btn-medium" href="/">
                Back to Home
              </Link>
              <Link className="btn btn-outline btn-medium" href="/services">
                Explore Services
              </Link>
            </div>

            {reference ? (
              <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-section-alt)] px-3 py-2 text-xs text-[var(--color-text-subtle)]">
                <span className="font-black uppercase tracking-[0.08em]">Reference</span>
                <code className="overflow-hidden text-ellipsis">{reference}</code>
              </div>
            ) : null}
          </div>

          <div className="relative min-h-[20rem] overflow-hidden border-t border-[var(--color-border)] bg-[#061426] lg:min-h-full lg:border-l lg:border-t-0">
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 50% 32%, rgba(255,106,0,.22), transparent 34%), linear-gradient(180deg, rgba(7,24,44,.2), #061426)",
              }}
            />
            <div className="relative flex h-full min-h-[20rem] flex-col justify-between p-6 sm:p-8">
              <div className="max-w-xs rounded-[var(--radius-md)] border border-[rgb(255_106_0_/_0.35)] bg-[rgb(5_20_38_/_0.88)] p-4">
                <span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--color-primary-orange)]">
                  Project received
                </span>
                <p className="mt-2 text-sm font-bold leading-6 text-[var(--color-foreground)]">
                  Your brief is now with the Website Design Dogs team.
                </p>
              </div>
              <picture className="mt-4 flex flex-1 items-end justify-center">
                <source type="image/avif" srcSet={mascotDesigner.avif} />
                <Image
                  src={mascotDesigner.webp}
                  width={900}
                  height={900}
                  alt="Website Design Dogs project specialist ready to review the submitted brief"
                  className="max-h-[22rem] w-auto max-w-full object-contain drop-shadow-2xl"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      onChange={markStarted}
      noValidate
      className="quote-builder"
      aria-busy={submitting || verifying}
    >
      <div className="hidden" aria-hidden="true">
        <label>
          Company URL
          <input name="company-url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="quote-builder__main">
        <div className="quote-progress">
          <div className="quote-progress__label">
            <span>Project brief</span>
            <strong>{Math.round(((step + 1) / 4) * 100)}% complete</strong>
          </div>
          <div
            className="quote-progress__track"
            role="progressbar"
            aria-label="Quote progress"
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuenow={step + 1}
          >
            <span style={{ width: `${((step + 1) / 4) * 100}%` }} />
          </div>
          <ol className="quote-progress__steps">
            {stageDetails.map(([label], index) => (
              <li
                key={label}
                className={index <= step ? "quote-progress__step--active" : ""}
                aria-current={index === step ? "step" : undefined}
              >
                <span>{index + 1}</span>
                <small>{label}</small>
              </li>
            ))}
          </ol>
        </div>

        <header className="quote-stage-heading">
          <p>Step {step + 1} of 4</p>
          <h2 ref={stageHeadingRef} tabIndex={-1}>
            {stageDetails[step][0]}
          </h2>
          <span>{stageDetails[step][1]}</span>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Have a question? <LiveChatButton label="Start a live chat" />
          </p>
        </header>

        {step === 0 ? (
          <div className="quote-stage-fields">
            <div className="quote-field-grid">
              <Field id="q-name" label="Full name" required error={errors.fullName}>
                <input
                  id="q-name"
                  autoComplete="name"
                  className={inputClass}
                  value={data.contact.fullName}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      contact: { ...current.contact, fullName: event.target.value },
                    }))
                  }
                />
              </Field>
              <Field id="q-business" label="Business name" required error={errors.business}>
                <input
                  id="q-business"
                  autoComplete="organization"
                  className={inputClass}
                  value={data.business.name}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      business: { ...current.business, name: event.target.value },
                    }))
                  }
                />
              </Field>
              <Field id="q-email" label="Email" required error={errors.email}>
                <input
                  id="q-email"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  value={data.contact.email}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      contact: { ...current.contact, email: event.target.value },
                    }))
                  }
                />
              </Field>
              <Field
                id="q-phone"
                label="Phone number"
                required
                error={errors.phone}
              >
                <InternationalPhoneInput
                  id="q-phone"
                  country={data.contact.phoneCountry}
                  number={data.contact.phone}
                  onCountryChange={(country) =>
                    setData((current) => ({
                      ...current,
                      contact: { ...current.contact, phoneCountry: country },
                    }))
                  }
                  onNumberChange={(number) =>
                    setData((current) => ({
                      ...current,
                      contact: { ...current.contact, phone: number },
                    }))
                  }
                  invalid={Boolean(errors.phone)}
                />
              </Field>
            </div>
            <Field
              id="q-website"
              label="Current website"
              error={errors.website}
              hint="Optional. You can enter your domain without https://."
            >
              <input
                id="q-website"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="example.com"
                aria-invalid={Boolean(errors.website)}
                className={inputClass}
                value={data.business.website}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    business: { ...current.business, website: event.target.value },
                  }))
                }
              />
            </Field>
            <Field
              id="q-industry"
              label="Industry"
              required
              error={errors.industry}
            >
              <select
                id="q-industry"
                className={inputClass}
                value={industryChoice}
                onChange={(event) => {
                  const choice = event.target.value as LeadIndustryOption | "";
                  setIndustryChoice(choice);
                  setData((current) => ({
                    ...current,
                    business: {
                      ...current.business,
                      industry: choice === "Other" ? otherIndustry : choice,
                    },
                  }));
                }}
              >
                <option value="">Select your industry</option>
                {leadIndustryOptions.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </Field>
            {industryChoice === "Other" ? (
              <Field
                id="q-industry-other"
                label="Please specify your industry"
                required
                error={errors.otherIndustry}
              >
                <input
                  id="q-industry-other"
                  className={inputClass}
                  placeholder="For example, pet services"
                  value={otherIndustry}
                  onChange={(event) => {
                    const value = event.target.value;
                    setOtherIndustry(value);
                    setData((current) => ({
                      ...current,
                      business: { ...current.business, industry: value },
                    }));
                  }}
                />
              </Field>
            ) : null}
          </div>
        ) : null}

        {step === 1 ? (
          <ChoiceGrid
            legend="Project Type"
            values={projectTypes}
            selected={data.project.types}
            onChange={(types) =>
              setData((current) => ({
                ...current,
                project: { ...current.project, types },
              }))
            }
            error={errors.types}
          />
        ) : null}

        {step === 2 ? (
          <div className="quote-stage-fields">
            <div className="quote-field-grid">
              <Field
                id="pages"
                label="Estimated number of pages"
                required
                error={errors.pages}
              >
                <select
                  id="pages"
                  className={inputClass}
                  value={data.project.pages}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      project: { ...current.project, pages: event.target.value },
                    }))
                  }
                >
                  <option value="">Select</option>
                  <option>1–5 pages</option>
                  <option>6–10 pages</option>
                  <option>11–15 pages</option>
                  <option>More than 15 pages</option>
                  <option>Not sure yet</option>
                </select>
              </Field>
              <Field id="goal" label="Main business goal" required error={errors.goal}>
                <input
                  id="goal"
                  className={inputClass}
                  placeholder="For example, generate enquiries"
                  value={data.project.goal}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      project: { ...current.project, goal: event.target.value },
                    }))
                  }
                />
              </Field>
            </div>

            <div>
              <p className="quote-field-label">Features required *</p>
              <ChoiceGrid
                legend="Features required"
                values={features}
                selected={data.project.features}
                onChange={(selectedFeatures) =>
                  setData((current) => ({
                    ...current,
                    project: { ...current.project, features: selectedFeatures },
                  }))
                }
                error={errors.features}
              />
            </div>

            <div className="quote-field-grid">
              <Field
                id="content"
                label="Content status"
                required
                error={errors.contentStatus}
              >
                <select
                  id="content"
                  className={inputClass}
                  value={data.project.contentStatus}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      project: { ...current.project, contentStatus: event.target.value },
                    }))
                  }
                >
                  <option value="">Select</option>
                  <option>Ready</option>
                  <option>Needs organization</option>
                  <option>Needs copywriting</option>
                  <option>Not sure yet</option>
                </select>
              </Field>
              <Field
                id="branding"
                label="Branding status"
                required
                error={errors.brandingStatus}
              >
                <select
                  id="branding"
                  className={inputClass}
                  value={data.project.brandingStatus}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      project: { ...current.project, brandingStatus: event.target.value },
                    }))
                  }
                >
                  <option value="">Select</option>
                  <option>Brand materials ready</option>
                  <option>Some materials ready</option>
                  <option>Needs brand direction</option>
                  <option>Not sure yet</option>
                </select>
              </Field>
            </div>
            <Field id="platform" label="Existing or preferred platform" hint="Choose Help me choose if platform selection is part of the project.">
              <select
                id="platform"
                className={inputClass}
                value={data.project.existingPlatform}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    project: {
                      ...current.project,
                      existingPlatform: event.target.value,
                    },
                  }))
                }
              >
                <option value="">Select (optional)</option>
                {platformPreferenceOptions.map((platform) => <option key={platform}>{platform}</option>)}
              </select>
            </Field>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="quote-stage-fields">
            <div className="quote-field-grid">
              <Field id="budget" label="Budget range" required error={errors.budget}>
                <select
                  id="budget"
                  className={inputClass}
                  value={data.package.budget}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      package: { ...current.package, budget: event.target.value },
                    }))
                  }
                >
                  <option value="">Select</option>
                  {budgets.map((budget) => (
                    <option key={budget}>{budget}</option>
                  ))}
                </select>
              </Field>
              <Field
                id="timing"
                label="Preferred start timing"
                required
                error={errors.timing}
              >
                <select
                  id="timing"
                  className={inputClass}
                  value={data.package.timing}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      package: { ...current.package, timing: event.target.value },
                    }))
                  }
                >
                  <option value="">Select</option>
                  {timings.map((timing) => (
                    <option key={timing}>{timing}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field
              id="notWorking"
              label="What is not working today?"
              required
              error={errors.notWorking}
            >
              <textarea
                id="notWorking"
                rows={4}
                className={inputClass}
                placeholder="A sentence or two is enough."
                value={data.project.notWorking}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    project: { ...current.project, notWorking: event.target.value },
                  }))
                }
              />
            </Field>
            <Field
              id="accomplish"
              label="What should this project help accomplish?"
              required
              error={errors.accomplish}
            >
              <textarea
                id="accomplish"
                rows={4}
                className={inputClass}
                placeholder="Describe the main outcome you want."
                value={data.project.accomplish}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    project: { ...current.project, accomplish: event.target.value },
                  }))
                }
              />
            </Field>
            <Field id="details" label="Additional details">
              <textarea
                id="details"
                rows={4}
                className={inputClass}
                placeholder="Optional links, constraints, or questions."
                value={data.project.details}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    project: { ...current.project, details: event.target.value },
                  }))
                }
              />
            </Field>
            <label className="quote-consent">
              <input
                type="checkbox"
                required
                checked={data.consent}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "quote-consent-error" : undefined}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    consent: event.target.checked,
                  }))
                }
              />
              <span>
                I consent to Website Design Dogs using these details to review and
                respond to this enquiry, and I acknowledge the{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </span>
            </label>
            {errors.consent ? (
              <p id="quote-consent-error" className="quote-field-error">{errors.consent}</p>
            ) : null}
            <TurnstileWidget
              action="quote_lead"
              cData={submissionId}
              onToken={onToken}
              resetKey={resetKey}
              execution="execute"
              executeKey={verificationExecuteKey}
            />
            {errors.turnstile ? (
              <p className="quote-field-error">{errors.turnstile}</p>
            ) : null}
          </div>
        ) : null}

        <div className="quote-builder__actions">
          <Button
            type="button"
            variant="outline"
            onClick={back}
            disabled={step === 0 || submitting}
          >
            Back
          </Button>
          {step < 3 ? (
            <Button key="next-step" type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button
              key="submit-brief"
              type="submit"
              disabled={submitting || verifying}
            >
              {verifying
                ? "Verifying…"
                : submitting
                  ? "Sending…"
                  : "Send Quote Request"}
            </Button>
          )}
        </div>

        <p
          ref={statusRef}
          tabIndex={-1}
          aria-live="polite"
          className={status ? "quote-status" : "sr-only"}
        >
          {status || "Quote form status"}
          {reference ? ` Reference: ${reference}` : ""}
        </p>
      </div>

      <aside className="quote-summary" aria-label="Your project summary">
        <div className="quote-summary__guide">
          <div className="quote-summary__guide-art">
            <picture>
              <source type="image/avif" srcSet={mascotDesigner.avif} />
              <Image
                src={mascotDesigner.webp}
                width={900}
                height={900}
                alt="Website Design Dogs project guide"
              />
            </picture>
          </div>
          <div className="quote-summary__guide-copy">
            <span>Project guide</span>
            <p>{guideReactions[step]}</p>
          </div>
        </div>
        <div className="quote-summary__card">
          <p className="home-eyebrow">Your brief so far</p>
          <dl>
            <div>
              <dt>Business</dt>
              <dd>{data.business.name || "Not added yet"}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{data.business.industry || "Not added yet"}</dd>
            </div>
            <div>
              <dt>Project</dt>
              <dd>{summaryProject}</dd>
            </div>
            <div>
              <dt>Pages</dt>
              <dd>{data.project.pages || "Not chosen yet"}</dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>{data.package.budget || "Not chosen yet"}</dd>
            </div>
          </dl>
          <small>Your choices stay editable until you submit.</small>
        </div>
      </aside>
    </form>
  );
}
