"use client";

import { inputClass } from "./form-field";
import {
  phoneCountries,
  phonePlaceholder,
  type PhoneCountryCode,
} from "@/lib/leads/phone";

export function InternationalPhoneInput({
  id,
  country,
  number,
  onCountryChange,
  onNumberChange,
  invalid,
}: {
  id: string;
  country: PhoneCountryCode;
  number: string;
  onCountryChange: (country: PhoneCountryCode) => void;
  onNumberChange: (number: string) => void;
  invalid?: boolean;
}) {
  const selected = phoneCountries.find((option) => option.code === country);

  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
      <div className="relative rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] focus-within:border-[var(--color-primary-orange)]">
        <div
          aria-hidden="true"
          className="flex min-h-[3rem] items-center justify-between gap-2 px-4 py-3 text-[var(--color-foreground)]"
        >
          <span className="inline-flex min-w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-section-alt)] px-2 py-1 text-xs font-black tracking-wide">
            {country === "INTL" ? "INTL" : country}
          </span>
          <span className="truncate font-bold">
            {selected?.dialCode ? `+${selected.dialCode}` : "International"}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">▾</span>
        </div>
        <select
          aria-label="Phone country"
          autoComplete="tel-country-code"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          value={country}
          onChange={(event) =>
            onCountryChange(event.target.value as PhoneCountryCode)
          }
        >
          {phoneCountries.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
              {option.dialCode ? ` (+${option.dialCode})` : ""}
            </option>
          ))}
        </select>
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        className={inputClass}
        value={number}
        placeholder={phonePlaceholder(country)}
        onChange={(event) => onNumberChange(event.target.value)}
        aria-invalid={invalid || undefined}
      />
    </div>
  );
}
