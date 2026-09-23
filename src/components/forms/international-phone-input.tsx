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
    <div className="grid min-w-0 grid-cols-1 gap-2 min-[360px]:grid-cols-[8.25rem_minmax(0,1fr)]">
      <div className="relative min-w-0 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] focus-within:border-[var(--color-primary-orange)]">
        <div
          aria-hidden="true"
          className="flex min-h-[3rem] min-w-0 items-center justify-between gap-2 whitespace-nowrap py-3 pl-3 pr-4 text-[var(--color-foreground)]"
        >
          <span className="inline-flex min-w-0 items-center gap-2 font-bold">
            <span className="text-xs font-black tracking-wide">
              {country === "INTL" ? "INTL" : country}
            </span>
            {selected?.dialCode ? (
              <span className="tabular-nums">+{selected.dialCode}</span>
            ) : null}
          </span>
          <span
            aria-hidden="true"
            className="mr-1 shrink-0 text-xs text-[var(--color-text-muted)]"
          >
            ▾
          </span>
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
        className={`${inputClass} min-w-0`}
        value={number}
        placeholder={phonePlaceholder(country)}
        onChange={(event) => onNumberChange(event.target.value)}
        aria-invalid={invalid || undefined}
      />
    </div>
  );
}
