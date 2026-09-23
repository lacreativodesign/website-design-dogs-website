"use client";

import { inputClass } from "./form-field";
import { WddSelect } from "./wdd-select";
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
    <div className="grid min-w-0 grid-cols-1 gap-2 min-[360px]:grid-cols-[8.25rem_minmax(0,1fr)]">
      <WddSelect
        id={`${id}-country`}
        ariaLabel="Phone country"
        value={country}
        options={phoneCountries.map((option) => ({
          value: option.code,
          label: `${option.name}${option.dialCode ? ` (+${option.dialCode})` : ""}`,
          displayLabel:
            option.code === "INTL"
              ? "INTL"
              : `${option.code}${option.dialCode ? ` +${option.dialCode}` : ""}`,
        }))}
        onChange={(value) => onCountryChange(value as PhoneCountryCode)}
        placeholder="Country"
        buttonClassName="px-3"
        menuClassName="w-[min(18rem,calc(100vw-2rem))]"
      />

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
