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
  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <select
        aria-label="Phone country"
        autoComplete="tel-country-code"
        className={inputClass}
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
