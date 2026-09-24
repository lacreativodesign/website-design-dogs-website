"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Button } from "@/components/ui/button";
import { packageBySlug } from "@/content/packages";
import { serviceBySlug } from "@/content/services";
import { SERVICES } from "@/lib/leads/constants";
import { leadEvent } from "./analytics-events";
import { normalizePhoneNumber } from "@/lib/leads/phone";
import { storeContactSuccess } from "@/lib/leads/contact-success";
import { isValidWebsiteInput, normalizeWebsiteInput } from "@/lib/leads/website";
import { getAttribution } from "./attribution";
import { Field, inputClass } from "./form-field";
import { InternationalPhoneInput } from "./international-phone-input";
import { WddSelect } from "./wdd-select";
import {
  submitLead,
  type ContactRequestPayload,
} from "./submission";
import { TurnstileWidget } from "./turnstile-widget";

const empty: ContactRequestPayload = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  phoneCountry: "US",
  website: "",
  service: "",
  summary: "",
  consent: false,
  source: "contact",
};

const uuid = () => crypto.randomUUID();

function subscribeToUrlChange(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getClientSearch() {
  return window.location.search;
}

function getServerSearch() {
  return "";
}

function getPreferences(search: string) {
  const params = new URLSearchParams(search);
  const packageSlug = params.get("package") || "";
  const selectedPackage = packageBySlug.get(packageSlug);
  const packageLabel = selectedPackage
    ? `${selectedPackage.name} — ${selectedPackage.price} ${selectedPackage.priceSuffix}`
    : packageSlug === "custom"
      ? "Custom Project"
      : undefined;
  const requestedService = params.get("service");
  const resolvedService = requestedService
    ? serviceBySlug.get(requestedService)?.title ?? requestedService
    : "";
  const service = SERVICES.includes(resolvedService)
    ? resolvedService
    : packageLabel
      ? "New Website"
      : "";

  return {
    packageSlug: packageLabel ? packageSlug : undefined,
    initialData: packageLabel
      ? {
          ...empty,
          service,
          summary: `Package preference: ${packageLabel}.\n\n`,
        }
      : { ...empty, service },
  };
}

export function ContactForm() {
  const router = useRouter();
  const search = useSyncExternalStore(
    subscribeToUrlChange,
    getClientSearch,
    getServerSearch,
  );
  const preferences = getPreferences(search);

  const [started, setStarted] = useState(false);
  const [data, setData] = useState<ContactRequestPayload>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [turnstile, setTurnstile] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [submissionId, setSubmissionId] = useState(uuid);
  const [formStartedAt, setFormStartedAt] = useState(() =>
    new Date().toISOString(),
  );
  const statusRef = useRef<HTMLParagraphElement>(null);
  const formData = started ? data : preferences.initialData;
  const onToken = useCallback((token: string) => setTurnstile(token), []);

  const set = (key: keyof ContactRequestPayload, value: string | boolean) => {
    if (!started) {
      leadEvent("wdd_quote_start", {
        formType: "contact",
        packageSlug: preferences.packageSlug,
        serviceSlug: formData.service,
        pagePath: location.pathname,
      });
    }

    setStarted(true);
    setData({ ...formData, [key]: value });
  };

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Enter your full name.";
    }
    if (!formData.businessName.trim()) {
      nextErrors.businessName = "Enter your business name.";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!normalizePhoneNumber(formData.phoneCountry, formData.phone)) {
      nextErrors.phone = "Enter a valid phone number. Include +country code for international numbers.";
    }
    if (!isValidWebsiteInput(formData.website)) {
      nextErrors.website = "Enter a valid website address.";
    }
    if (!formData.service) {
      nextErrors.service = "Choose the service needed.";
    }
    if (formData.summary.trim().length < 20) {
      nextErrors.summary = "Share at least 20 characters about the project.";
    }
    if (!formData.consent) {
      nextErrors.consent =
        "Confirm consent and Privacy Policy acknowledgement.";
    }
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstile) {
      nextErrors.turnstile = "Complete the anti-spam verification.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (submitting) {
      return;
    }

    setStatus("");
    if (!validate()) {
      setStatus("Please review the highlighted fields and try again.");
      requestAnimationFrame(() => {
        const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
        firstInvalid?.focus();
      });
      return;
    }

    setSubmitting(true);
    leadEvent("wdd_lead_submit", {
      formType: "contact",
      serviceSlug: formData.service,
      utmCampaign: getAttribution().utmCampaign,
      pagePath: location.pathname,
    });

    const normalizedPhone = normalizePhoneNumber(
      formData.phoneCountry,
      formData.phone,
    )!;

    const result = await submitLead(
      {
        ...formData,
        phone: normalizedPhone,
        website: normalizeWebsiteInput(formData.website),
      },
      {
      submissionId,
      formStartedAt,
      turnstileToken: turnstile,
      verificationCode: new FormData(form)
        .get("company-url")
        ?.toString(),
      attribution: getAttribution(),
      },
    );

    setSubmitting(false);

    if (result.ok) {
      const attribution = getAttribution();
      storeContactSuccess({
        eventId: submissionId,
        formType: "contact",
        serviceSlug: formData.service,
        utmCampaign: attribution.utmCampaign,
        confirmationEmailSent: result.confirmationEmailSent === true,
        referenceId: result.referenceId,
      });
      router.replace("/thank-you");
      return;
    }

    setStatus(result.message);
    statusRef.current?.focus();
    setResetKey((key) => key + 1);
    leadEvent("wdd_lead_error", {
      formType: "contact",
      serviceSlug: formData.service,
      utmCampaign: getAttribution().utmCampaign,
      failureCategory: result.code,
      pagePath: location.pathname,
    });
    if (result.fieldErrors) {
      setErrors(result.fieldErrors);
    }
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid gap-5"
      aria-describedby="contact-status"
      aria-busy={submitting}
    >
      <div className="hidden" aria-hidden="true">
        <label>
          Company URL
          <input name="company-url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
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
            value={formData.fullName}
            onChange={(event) => set("fullName", event.target.value)}
            placeholder="John Smith"
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
            value={formData.businessName}
            onChange={(event) => set("businessName", event.target.value)}
            placeholder="Your Business Name"
            aria-invalid={Boolean(errors.businessName)}
          />
        </Field>
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
            value={formData.email}
            onChange={(event) => set("email", event.target.value)}
            placeholder="john@yourbusiness.com"
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
        <Field
          id="phone"
          label="Phone number"
          required
          error={errors.phone}
        >
          <InternationalPhoneInput
            id="phone"
            country={formData.phoneCountry}
            number={formData.phone}
            onCountryChange={(country) => set("phoneCountry", country)}
            onNumberChange={(number) => set("phone", number)}
            invalid={Boolean(errors.phone)}
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
          type="text"
          inputMode="url"
          autoComplete="url"
          className={inputClass}
          value={formData.website}
          onChange={(event) => set("website", event.target.value)}
          placeholder="yourbusiness.com"
          aria-invalid={Boolean(errors.website)}
        />
      </Field>
      <Field
        id="service"
        label="Service needed"
        required
        error={errors.service}
      >
        <WddSelect
          id="service"
          value={formData.service}
          options={SERVICES.map((service) => ({
            value: service,
            label: service,
          }))}
          onChange={(value) => set("service", value)}
          placeholder="Select a service"
          aria-invalid={Boolean(errors.service)}
        />
      </Field>
      <Field
        id="summary"
        label="Project summary"
        required
        error={errors.summary}
      >
        <textarea
          id="summary"
          rows={6}
          className={inputClass}
          value={formData.summary}
          onChange={(event) => set("summary", event.target.value)}
          placeholder="Briefly tell us what you need help with..."
          aria-invalid={Boolean(errors.summary)}
        />
      </Field>
      <label className="flex gap-3 text-sm text-[var(--color-text-muted)]">
        <input
          type="checkbox"
          required
          className="mt-1 h-5 w-5"
          checked={formData.consent}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? "contact-consent-error" : undefined}
          onChange={(event) => set("consent", event.target.checked)}
        />
        <span>
          I consent to Website Design Dogs using these details to review and
          respond to this enquiry, and I acknowledge the{" "}
          <Link className="font-bold underline" href="/privacy-policy">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {errors.consent ? (
        <p id="contact-consent-error" className="text-sm font-bold text-orange-300">{errors.consent}</p>
      ) : null}
      <TurnstileWidget
        action="contact_lead"
        cData={submissionId}
        onToken={onToken}
        resetKey={resetKey}
      />
      {errors.turnstile ? (
        <p className="text-sm font-bold text-orange-300">
          {errors.turnstile}
        </p>
      ) : null}
      <Button type="submit" size="large" disabled={submitting}>
        {submitting ? "Sending…" : "Send Enquiry"}
      </Button>
      <p
        id="contact-status"
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className={
          status
            ? "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-4 text-sm font-bold text-[var(--color-text-muted)]"
            : "sr-only"
        }
      >
        {status || "Form status"}
      </p>
    </form>
  );
}
