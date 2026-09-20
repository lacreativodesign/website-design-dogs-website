"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { mascotDesigner } from "@/content/illustrations";
import {
  allPackages,
  packageBySlug,
  packageCategoryBySlug,
  type PackageCategorySlug,
} from "@/content/packages";
import { platformPreferenceOptions } from "@/content/platforms";
import { services } from "@/content/services";
import { leadEvent } from "./analytics-events";
import { getAttribution } from "./attribution";
import { Field, inputClass } from "./form-field";
import { submitLead, type QuoteRequestPayload } from "./submission";
import { TurnstileWidget } from "./turnstile-widget";

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

type PackageOption = { value: string; slug: string; title: string; price: string; detail: string };

const catalogPackageOptions: PackageOption[] = allPackages.map((item) => ({
  value: `${item.name} — ${item.price} ${item.priceSuffix}`,
  slug: item.slug,
  title: item.name,
  price: item.price,
  detail: item.tagline,
}));

const flexiblePackageOptions: PackageOption[] = [
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
];

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
  return catalogPackageOptions.find(({ slug }) => slug === requestedPackage)?.value ?? "";
}

function projectCategories(data: QuoteRequestPayload): PackageCategorySlug[] {
  const categories = new Set<PackageCategorySlug>();
  const types = data.project.types;

  if (types.includes("Mobile App Development")) categories.add("mobile-apps");
  if (types.includes("Social Media Marketing")) categories.add("social-media");
  if (types.includes("SEO & Local Optimization")) categories.add("seo-local");
  if (
    types.includes("Website Care") ||
    types.includes("Website Care, Hosting & Security")
  ) {
    categories.add("website-care");
  }
  if (
    types.includes("E-Commerce Solutions") ||
    data.project.features.includes("E-commerce") ||
    data.project.features.includes("Payment integration")
  ) {
    categories.add("e-commerce");
  }

  const websiteSignals = [
    "New Website",
    "Website Redesign",
    "Campaign Landing Page",
    "Custom Website Design",
    "Website Development",
    "Conversion Optimization",
    "Content & Copywriting",
    "Analytics & Reporting",
    "AI or Workflow Integration",
  ];
  if (websiteSignals.some((type) => types.includes(type))) {
    categories.add("website-design");
  }

  if (categories.size === 0) categories.add("website-design");
  return [...categories];
}

function categoryForProject(
  data: QuoteRequestPayload,
): PackageCategorySlug | null {
  const categories = projectCategories(data);
  return categories.length === 1 ? categories[0] : null;
}

function packageOptionsFor(data: QuoteRequestPayload) {
  const categorySlug = categoryForProject(data);
  if (!categorySlug) return flexiblePackageOptions;

  const category = packageCategoryBySlug.get(categorySlug);
  const scopedOptions = (category?.packages ?? [])
    .map((item) => catalogPackageOptions.find(({ slug }) => slug === item.slug))
    .filter((item): item is PackageOption => Boolean(item));

  return [...scopedOptions, ...flexiblePackageOptions];
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
  const unknownValues = new Set(["Not Sure Yet", "Not sure yet"]);

  if (unknownValues.has(value)) {
    return values.includes(value) ? [] : [value];
  }

  const knownValues = values.filter((item) => !unknownValues.has(item));
  return knownValues.includes(value)
    ? knownValues.filter((item) => item !== value)
    : [...knownValues, value];
}

function recommendationFor(
  data: QuoteRequestPayload,
  options: PackageOption[],
  requestedPackage: string,
) {
  if (
    data.project.types.length === 1 &&
    data.project.types.includes("Not Sure Yet")
  ) {
    return {
      option: flexiblePackageOptions[1],
      reason:
        "You marked the project type as not sure yet, so we’ll review the brief before steering you into a package.",
    };
  }

  const requested = options.find(({ slug }) => slug === requestedPackage);
  if (requested) {
    return {
      option: requested,
      reason:
        "You arrived with this package selected. We’ll use it as the starting point and confirm fit after reviewing the full brief.",
    };
  }

  const scoped = options.filter(
    ({ slug }) => slug !== "custom" && slug !== "not-sure",
  );

  if (scoped.length === 0) {
    return {
      option: flexiblePackageOptions[0],
      reason:
        "Your brief spans multiple service areas, so a custom scope is safer than forcing the project into one package.",
    };
  }

  const category =
    packageBySlug.get(scoped[0].slug)?.categorySlug ?? "website-design";
  const featureCount = data.project.features.filter(
    (feature) => feature !== "Not sure yet",
  ).length;
  const breadth = data.project.types.filter(
    (type) => type !== "Not Sure Yet",
  ).length + featureCount;

  let index = 0;
  let reason = "This is the closest starting point based on the scope you entered.";

  if (category === "website-design") {
    if (data.project.pages === "More than 15 pages") index = Math.min(4, scoped.length - 1);
    else if (data.project.pages === "11–15 pages") index = Math.min(3, scoped.length - 1);
    else if (data.project.pages === "6–10 pages") index = Math.min(2, scoped.length - 1);
    else if (featureCount >= 4) index = Math.min(1, scoped.length - 1);

    reason =
      data.project.pages === "1–5 pages"
        ? "Your page count and requested functionality point to a focused website starting point."
        : "Your page count and requested functionality call for more room than the entry website scope.";
  } else if (category === "e-commerce") {
    index =
      breadth >= 7
        ? Math.min(2, scoped.length - 1)
        : breadth >= 4
          ? Math.min(1, scoped.length - 1)
          : 0;
    reason =
      "Your commerce or payment requirements make an e-commerce package the responsible starting point.";
  } else if (category === "mobile-apps") {
    index = breadth >= 6 ? Math.min(1, scoped.length - 1) : 0;
    reason =
      index === 0
        ? "A blueprint is the responsible first step before committing to a coded app build."
        : "The breadth of the app requirements suggests moving beyond discovery into an MVP starting point.";
  } else {
    index =
      breadth >= 7
        ? Math.min(2, scoped.length - 1)
        : breadth >= 4
          ? Math.min(1, scoped.length - 1)
          : 0;
    reason =
      "The number of selected needs places this brief at this service tier as a starting point.";
  }

  return { option: scoped[index], reason };
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
  const [submitted, setSubmitted] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationExecuteKey, setVerificationExecuteKey] = useState(0);
  const [attribution] = useState(getAttribution);
  const startedRef = useRef(false);
  const pendingVerificationRef = useRef(false);
  const turnstileTokenRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLElement>(null);
  const packageOptions = packageOptionsFor(data);
  const recommendation = recommendationFor(data, packageOptions, requestedPackage);
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
      if (!data.package.preferred || !packageOptions.some(({ value }) => value === data.package.preferred)) {
        nextErrors.preferred = "Choose a package shown for this project type.";
      }
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
    const nextStep = Math.min(4, step + 1);

    if (step === 2) {
      const nextOptions = packageOptionsFor(data);
      const nextRecommendation = recommendationFor(
        data,
        nextOptions,
        requestedPackage,
      );
      const currentChoiceIsValid = nextOptions.some(
        ({ value }) => value === data.package.preferred,
      );

      if (!currentChoiceIsValid) {
        setData((current) => ({
          ...current,
          package: {
            ...current.package,
            preferred: nextRecommendation.option.value,
          },
        }));
      }
    }

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
        const { turnstile: _turnstile, ...rest } = current;
        return rest;
      });
      setStatus("Securely verifying your request…");
      setVerificationExecuteKey((key) => key + 1);
      return;
    }

    setVerifying(false);
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
      turnstileToken: turnstileTokenRef.current || turnstileToken,
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
      setErrors({});
      setSubmitted(true);
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

  if (submitted) {
    return (
      <section
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="mx-auto max-w-4xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center shadow-[var(--shadow-md)] sm:p-10"
      >
        <p className="home-eyebrow">Request received</p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] sm:text-4xl">
          Thanks — your project brief is in.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-muted)]">
          We received your details successfully. Our team will review the brief and
          respond using the contact information you provided. You do not need to
          submit it again.
        </p>
        <div className="mx-auto mt-7 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-section-alt)] p-4">
            <strong className="block">What happens next</strong>
            <span className="mt-1 block text-sm text-[var(--color-text-muted)]">
              We’ll review the scope, package fit, timing, and any questions in your brief.
            </span>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-section-alt)] p-4">
            <strong className="block">Your request is safely recorded</strong>
            <span className="mt-1 block text-sm text-[var(--color-text-muted)]">
              Your submission has already been delivered to Website Design Dogs for review.
            </span>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link className="btn btn-primary btn-medium" href="/">
            Back to Home
          </Link>
          <Link className="btn btn-outline btn-medium" href="/packages">
            Review Packages
          </Link>
        </div>
        {reference ? (
          <p className="mt-5 text-xs text-[var(--color-text-subtle)]">
            Submission reference: {reference}
          </p>
        ) : null}
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
            <div className="quote-recommendation">
              <span>Recommended starting point</span>
              <div>
                <strong>{recommendation.option.title}</strong>
                <p>{recommendation.reason}</p>
              </div>
              <b>Recommended</b>
              <small>
                {recommendation.option.detail} This is an early guide based on your
                answers, not a final scope or quote. You can choose a different
                starting point below.
              </small>
            </div>

            <fieldset className="quote-package-fieldset" aria-invalid={errors.preferred ? true : undefined} aria-describedby={errors.preferred ? "preferred-package-error" : undefined}>
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
                <p id="preferred-package-error" className="quote-field-error">{errors.preferred}</p>
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
          {step < 4 ? (
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
