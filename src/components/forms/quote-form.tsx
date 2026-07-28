"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { leadEvent } from "./analytics-events";
import { getAttribution } from "./attribution";
import { Field, inputClass } from "./form-field";
import { submitLead, type QuoteRequestPayload } from "./submission";
import { TurnstileWidget } from "./turnstile-widget";

const projectTypes = [
  "New Website",
  "Website Redesign",
  "E-Commerce Website",
  "Campaign Landing Page",
  "Website Care",
  "SEO & Local Optimization",
  "AI or Workflow Integration",
  "Custom Website Design",
  "Website Development",
  "Conversion Optimization",
  "Content & Copywriting",
  "Hosting & Security",
  "Analytics & Reporting",
  "Not Sure Yet",
] as const;

const serviceProjectTypes: Record<string, string> = {
  "custom-website-design": "Custom Website Design",
  "website-development": "Website Development",
  "e-commerce-solutions": "E-Commerce Website",
  "conversion-optimization": "Conversion Optimization",
  "seo-local-optimization": "SEO & Local Optimization",
  "content-copywriting": "Content & Copywriting",
  "hosting-security": "Hosting & Security",
  "analytics-reporting": "Analytics & Reporting",
};

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

const packageOptions = [
  {
    value: "Starter — $499",
    slug: "starter",
    title: "Starter",
    price: "$499",
    detail: "A focused website of up to 5 pages.",
  },
  {
    value: "Business — $899",
    slug: "business",
    title: "Business",
    price: "$899",
    detail: "More room for services and customer journeys.",
  },
  {
    value: "Growth — $1,499",
    slug: "growth",
    title: "Growth",
    price: "$1,499",
    detail: "A broader build with e-commerce capability.",
  },
  {
    value: "Custom Scope",
    slug: "custom",
    title: "Custom",
    price: "Scoped",
    detail: "For requirements outside the package foundations.",
  },
  {
    value: "Not Sure Yet",
    slug: "not-sure",
    title: "Not sure",
    price: "We’ll help",
    detail: "Share the details and we’ll recommend a starting point.",
  },
] as const;

const budgets = [
  "Under $500",
  "$500–$999",
  "$1,000–$1,499",
  "$1,500–$2,999",
  "$3,000+",
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
  ["Project Type", "Choose everything that applies. You can adjust the details later."],
  ["Website Shape", "Give us a useful first picture of the content and functionality."],
  ["Starting Point", "Compare the practical package foundations and share your timing."],
  ["Final Details", "Add the context that will make our review more useful."],
] as const;

const guideReactions = [
  "First, a quick introduction.",
  "Now we’re mapping the kind of work.",
  "The website shape is taking form.",
  "Here’s a practical starting point.",
  "Last step—add the context that matters.",
] as const;

function initialPackage(requestedPackage: string) {
  return packageOptions.find(({ slug }) => slug === requestedPackage)?.value ?? "";
}

function empty(
  preferredPackage: string,
  service = "",
  industry = "",
): QuoteRequestPayload {
  return {
    contact: { fullName: "", email: "", phone: "" },
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
    package: { preferred: preferredPackage, budget: "", timing: "" },
    consent: false,
    source: "get-started",
  };
}

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function recommendationFor(data: QuoteRequestPayload) {
  const needsCommerce =
    data.project.types.includes("E-Commerce Website") ||
    data.project.features.includes("E-commerce") ||
    data.project.features.includes("Payment integration");

  if (needsCommerce || data.project.pages === "More than 15 pages") {
    return packageOptions[2];
  }

  if (
    data.project.pages === "6–10 pages" ||
    data.project.pages === "11–15 pages" ||
    data.project.types.length > 1
  ) {
    return packageOptions[1];
  }

  return packageOptions[0];
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
  return (
    <fieldset className="quote-choice-fieldset">
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
      {error ? <p className="quote-field-error">{error}</p> : null}
    </fieldset>
  );
}

type QuoteFormProps = {
  requestedPackage?: string;
  requestedService?: string;
  requestedIndustry?: string;
};

export function QuoteForm({
  requestedPackage = "",
  requestedService = "",
  requestedIndustry = "",
}: QuoteFormProps) {
  const preferredPackage = initialPackage(requestedPackage);
  const [data, setData] = useState(() =>
    empty(preferredPackage, requestedService, requestedIndustry),
  );
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  const [formStartedAt, setFormStartedAt] = useState(() =>
    new Date().toISOString(),
  );
  const [reference, setReference] = useState("");
  const [attribution] = useState(getAttribution);
  const startedRef = useRef(false);
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const recommendation = recommendationFor(data);
  const onToken = useCallback((token: string) => setTurnstileToken(token), []);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    leadEvent("wdd_quote_start", {
      formType: "quote",
      packageSlug: requestedPackage,
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
      if (!data.business.name.trim()) nextErrors.business = "Enter your business name.";
      if (!data.business.industry.trim()) nextErrors.industry = "Enter your industry.";
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
      if (!data.package.preferred) nextErrors.preferred = "Choose a preferred package.";
      if (!data.package.budget) nextErrors.budget = "Choose a budget range.";
      if (!data.package.timing) nextErrors.timing = "Choose preferred timing.";
    }

    if (targetStep === 4) {
      if (data.project.notWorking.trim().length < 10) {
        nextErrors.notWorking = "Share what is not working today.";
      }
      if (data.project.accomplish.trim().length < 10) {
        nextErrors.accomplish = "Share what the new website should accomplish.";
      }
      if (!data.consent) nextErrors.consent = "Confirm consent to be contacted.";
      if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
        nextErrors.turnstile = "Complete the anti-spam verification.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function focusStage() {
    requestAnimationFrame(() => stageHeadingRef.current?.focus());
  }

  function next() {
    markStarted();
    if (!validate()) return;
    const nextStep = Math.min(4, step + 1);
    setStep(nextStep);
    setStatus(`Step ${nextStep + 1} of 5: ${stageDetails[nextStep][0]}`);
    focusStage();
  }

  function back() {
    const nextStep = Math.max(0, step - 1);
    setStep(nextStep);
    setStatus(`Step ${nextStep + 1} of 5: ${stageDetails[nextStep][0]}`);
    focusStage();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setStatus("");
    setReference("");
    if (!validate(4)) {
      setStatus("Please review the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    leadEvent("wdd_lead_submit", {
      formType: "quote",
      packageSlug: data.package.preferred,
      utmCampaign: attribution.utmCampaign,
      pagePath: location.pathname,
    });

    const response = await submitLead(data, {
      submissionId,
      formStartedAt,
      turnstileToken,
      verificationCode: new FormData(event.currentTarget)
        .get("company-url")
        ?.toString(),
      attribution,
    });

    setSubmitting(false);
    setStatus(response.message);
    setResetKey((key) => key + 1);

    if (response.ok) {
      leadEvent("wdd_lead_success", {
        eventId: submissionId,
        formType: "quote",
        packageSlug: data.package.preferred,
        utmCampaign: attribution.utmCampaign,
        pagePath: location.pathname,
      });
      setReference(response.referenceId || "");
      setData(empty(preferredPackage, requestedService, requestedIndustry));
      setStep(0);
      setErrors({});
      setSubmissionId(crypto.randomUUID());
      setFormStartedAt(new Date().toISOString());
      startedRef.current = false;
    } else {
      leadEvent("wdd_lead_error", {
        formType: "quote",
        packageSlug: data.package.preferred,
        utmCampaign: attribution.utmCampaign,
        failureCategory: response.code,
        pagePath: location.pathname,
      });
      if (response.fieldErrors) setErrors(response.fieldErrors);
      setStep(4);
    }

    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const summaryProject =
    data.project.types.length > 0
      ? data.project.types.slice(0, 2).join(", ")
      : "Not chosen yet";
  const summaryPackage = data.package.preferred || "Not chosen yet";

  return (
    <form
      onSubmit={submit}
      onChange={markStarted}
      noValidate
      className="quote-builder"
      aria-busy={submitting}
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
            <strong>{Math.round(((step + 1) / 5) * 100)}% complete</strong>
          </div>
          <div
            className="quote-progress__track"
            role="progressbar"
            aria-label="Quote progress"
            aria-valuemin={1}
            aria-valuemax={5}
            aria-valuenow={step + 1}
          >
            <span style={{ width: `${((step + 1) / 5) * 100}%` }} />
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
          <p>Step {step + 1} of 5</p>
          <h2 ref={stageHeadingRef} tabIndex={-1}>
            {stageDetails[step][0]}
          </h2>
          <span>{stageDetails[step][1]}</span>
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
              <Field id="q-phone" label="Phone">
                <input
                  id="q-phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                  value={data.contact.phone}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      contact: { ...current.contact, phone: event.target.value },
                    }))
                  }
                />
              </Field>
            </div>
            <Field id="q-website" label="Current website">
              <input
                id="q-website"
                type="url"
                autoComplete="url"
                placeholder="https://"
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
            <Field id="q-industry" label="Industry" required error={errors.industry}>
              <input
                id="q-industry"
                className={inputClass}
                placeholder="For example, home services"
                value={data.business.industry}
                onChange={(event) =>
                  setData((current) => ({
                    ...current,
                    business: { ...current.business, industry: event.target.value },
                  }))
                }
              />
            </Field>
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
            <Field id="platform" label="Existing platform">
              <input
                id="platform"
                className={inputClass}
                placeholder="Optional"
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
              />
            </Field>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="quote-stage-fields">
            <div className="quote-recommendation">
              <span>Practical recommendation</span>
              <div>
                <strong>{recommendation.title}</strong>
                <p>{recommendation.detail}</p>
              </div>
              {data.package.preferred !== recommendation.value ? (
                <button
                  type="button"
                  onClick={() =>
                    setData((current) => ({
                      ...current,
                      package: {
                        ...current.package,
                        preferred: recommendation.value,
                      },
                    }))
                  }
                >
                  Use recommendation
                </button>
              ) : (
                <b>Selected</b>
              )}
              <small>
                This is an early guide based on your answers, not a final scope or quote.
              </small>
            </div>

            <fieldset className="quote-package-fieldset">
              <legend>Preferred package *</legend>
              <div className="quote-package-options">
                {packageOptions.map((option) => (
                  <label
                    key={option.value}
                    className={
                      data.package.preferred === option.value
                        ? "quote-package-option quote-package-option--selected"
                        : "quote-package-option"
                    }
                  >
                    <input
                      type="radio"
                      name="preferred-package"
                      value={option.value}
                      aria-label={option.value}
                      checked={data.package.preferred === option.value}
                      onChange={() =>
                        setData((current) => ({
                          ...current,
                          package: { ...current.package, preferred: option.value },
                        }))
                      }
                    />
                    <span>
                      <strong>{option.title}</strong>
                      <b>{option.price}</b>
                    </span>
                    <small>{option.detail}</small>
                  </label>
                ))}
              </div>
              {errors.preferred ? (
                <p className="quote-field-error">{errors.preferred}</p>
              ) : null}
            </fieldset>

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
          </div>
        ) : null}

        {step === 4 ? (
          <div className="quote-stage-fields">
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
              label="What should the new website help accomplish?"
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
                checked={data.consent}
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
              <p className="quote-field-error">{errors.consent}</p>
            ) : null}
            <TurnstileWidget
              action="quote_lead"
              cData={submissionId}
              onToken={onToken}
              resetKey={resetKey}
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
          {step < 4 ? (
            <Button key="next-step" type="button" onClick={next}>
              Next
            </Button>
          ) : (
            <Button key="submit-brief" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send Quote Request"}
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
          <Image
            src="/brand/mascot/wdd-mascot-transparent.png"
            width={720}
            height={1024}
            alt="Website Design Dogs project guide"
          />
          <p>{guideReactions[step]}</p>
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
              <dt>Package</dt>
              <dd>{summaryPackage}</dd>
            </div>
          </dl>
          <small>Your choices stay editable until you submit.</small>
        </div>
      </aside>
    </form>
  );
}
