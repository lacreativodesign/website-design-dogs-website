"use client";

import { inputClass } from "./form-field";
import {
  inferPhoneCountryFromInput,
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
    <input
      id={id}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      className={`${inputClass} min-w-0`}
      value={number}
      placeholder="(000) 000-0000"
      onChange={(event) => {
        const value = event.target.value;
        onNumberChange(value);

        const inferred = inferPhoneCountryFromInput(value);
        if (inferred !== country) {
          onCountryChange(inferred);
        }
      }}
      aria-invalid={invalid || undefined}
    />
  );
}
