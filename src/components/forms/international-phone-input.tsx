"use client";

import { inputClass } from "./form-field";
import type { PhoneCountryCode } from "@/lib/leads/phone";

export function InternationalPhoneInput({
  id,
  number,
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
      onChange={(event) => onNumberChange(event.target.value)}
      aria-invalid={invalid || undefined}
    />
  );
}
