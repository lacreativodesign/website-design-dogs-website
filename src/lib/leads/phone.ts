export type PhoneCountryCode =
  | "US"
  | "CA"
  | "GB"
  | "AU"
  | "NZ"
  | "PK"
  | "IN"
  | "AE"
  | "SA"
  | "QA"
  | "BH"
  | "KW"
  | "OM"
  | "DE"
  | "FR"
  | "ES"
  | "IT"
  | "NL"
  | "IE"
  | "SE"
  | "NO"
  | "DK"
  | "CH"
  | "AT"
  | "BE"
  | "PT"
  | "PL"
  | "SG"
  | "MY"
  | "PH"
  | "ZA"
  | "MX"
  | "BR"
  | "JP"
  | "KR"
  | "CN"
  | "HK"
  | "INTL";

type PhoneCountry = {
  code: PhoneCountryCode;
  name: string;
  dialCode: string;
  minNationalDigits: number;
  maxNationalDigits: number;
  stripNationalPrefix?: boolean;
  example: string;
};

export const phoneCountries: readonly PhoneCountry[] = [
  { code: "US", name: "United States", dialCode: "1", minNationalDigits: 10, maxNationalDigits: 10, example: "(415) 900-2374" },
  { code: "CA", name: "Canada", dialCode: "1", minNationalDigits: 10, maxNationalDigits: 10, example: "(416) 555-0199" },
  { code: "GB", name: "United Kingdom", dialCode: "44", minNationalDigits: 9, maxNationalDigits: 10, stripNationalPrefix: true, example: "020 7946 0018" },
  { code: "AU", name: "Australia", dialCode: "61", minNationalDigits: 9, maxNationalDigits: 9, stripNationalPrefix: true, example: "0412 345 678" },
  { code: "NZ", name: "New Zealand", dialCode: "64", minNationalDigits: 8, maxNationalDigits: 10, stripNationalPrefix: true, example: "021 123 4567" },
  { code: "PK", name: "Pakistan", dialCode: "92", minNationalDigits: 9, maxNationalDigits: 10, stripNationalPrefix: true, example: "0300 1234567" },
  { code: "IN", name: "India", dialCode: "91", minNationalDigits: 10, maxNationalDigits: 10, stripNationalPrefix: true, example: "98765 43210" },
  { code: "AE", name: "United Arab Emirates", dialCode: "971", minNationalDigits: 8, maxNationalDigits: 9, stripNationalPrefix: true, example: "050 123 4567" },
  { code: "SA", name: "Saudi Arabia", dialCode: "966", minNationalDigits: 8, maxNationalDigits: 9, stripNationalPrefix: true, example: "050 123 4567" },
  { code: "QA", name: "Qatar", dialCode: "974", minNationalDigits: 8, maxNationalDigits: 8, example: "3312 3456" },
  { code: "BH", name: "Bahrain", dialCode: "973", minNationalDigits: 8, maxNationalDigits: 8, example: "3600 1234" },
  { code: "KW", name: "Kuwait", dialCode: "965", minNationalDigits: 8, maxNationalDigits: 8, example: "500 12345" },
  { code: "OM", name: "Oman", dialCode: "968", minNationalDigits: 8, maxNationalDigits: 8, example: "9212 3456" },
  { code: "DE", name: "Germany", dialCode: "49", minNationalDigits: 7, maxNationalDigits: 12, stripNationalPrefix: true, example: "030 123456" },
  { code: "FR", name: "France", dialCode: "33", minNationalDigits: 9, maxNationalDigits: 9, stripNationalPrefix: true, example: "06 12 34 56 78" },
  { code: "ES", name: "Spain", dialCode: "34", minNationalDigits: 9, maxNationalDigits: 9, example: "612 34 56 78" },
  { code: "IT", name: "Italy", dialCode: "39", minNationalDigits: 8, maxNationalDigits: 11, example: "320 123 4567" },
  { code: "NL", name: "Netherlands", dialCode: "31", minNationalDigits: 9, maxNationalDigits: 9, stripNationalPrefix: true, example: "06 12345678" },
  { code: "IE", name: "Ireland", dialCode: "353", minNationalDigits: 8, maxNationalDigits: 9, stripNationalPrefix: true, example: "087 123 4567" },
  { code: "SE", name: "Sweden", dialCode: "46", minNationalDigits: 7, maxNationalDigits: 10, stripNationalPrefix: true, example: "070 123 45 67" },
  { code: "NO", name: "Norway", dialCode: "47", minNationalDigits: 8, maxNationalDigits: 8, example: "412 34 567" },
  { code: "DK", name: "Denmark", dialCode: "45", minNationalDigits: 8, maxNationalDigits: 8, example: "20 12 34 56" },
  { code: "CH", name: "Switzerland", dialCode: "41", minNationalDigits: 9, maxNationalDigits: 9, stripNationalPrefix: true, example: "079 123 45 67" },
  { code: "AT", name: "Austria", dialCode: "43", minNationalDigits: 7, maxNationalDigits: 12, stripNationalPrefix: true, example: "0664 123456" },
  { code: "BE", name: "Belgium", dialCode: "32", minNationalDigits: 8, maxNationalDigits: 9, stripNationalPrefix: true, example: "0470 12 34 56" },
  { code: "PT", name: "Portugal", dialCode: "351", minNationalDigits: 9, maxNationalDigits: 9, example: "912 345 678" },
  { code: "PL", name: "Poland", dialCode: "48", minNationalDigits: 9, maxNationalDigits: 9, example: "512 345 678" },
  { code: "SG", name: "Singapore", dialCode: "65", minNationalDigits: 8, maxNationalDigits: 8, example: "8123 4567" },
  { code: "MY", name: "Malaysia", dialCode: "60", minNationalDigits: 8, maxNationalDigits: 10, stripNationalPrefix: true, example: "012 345 6789" },
  { code: "PH", name: "Philippines", dialCode: "63", minNationalDigits: 9, maxNationalDigits: 10, stripNationalPrefix: true, example: "0917 123 4567" },
  { code: "ZA", name: "South Africa", dialCode: "27", minNationalDigits: 9, maxNationalDigits: 9, stripNationalPrefix: true, example: "082 123 4567" },
  { code: "MX", name: "Mexico", dialCode: "52", minNationalDigits: 10, maxNationalDigits: 10, example: "55 1234 5678" },
  { code: "BR", name: "Brazil", dialCode: "55", minNationalDigits: 10, maxNationalDigits: 11, stripNationalPrefix: true, example: "(11) 91234-5678" },
  { code: "JP", name: "Japan", dialCode: "81", minNationalDigits: 9, maxNationalDigits: 10, stripNationalPrefix: true, example: "090-1234-5678" },
  { code: "KR", name: "South Korea", dialCode: "82", minNationalDigits: 9, maxNationalDigits: 10, stripNationalPrefix: true, example: "010-1234-5678" },
  { code: "CN", name: "China", dialCode: "86", minNationalDigits: 10, maxNationalDigits: 11, stripNationalPrefix: true, example: "138 0013 8000" },
  { code: "HK", name: "Hong Kong", dialCode: "852", minNationalDigits: 8, maxNationalDigits: 8, example: "5123 4567" },
  { code: "INTL", name: "Other international", dialCode: "", minNationalDigits: 7, maxNationalDigits: 15, example: "+ country code and number" },
] as const;

const countryByCode = new Map(phoneCountries.map((country) => [country.code, country]));

export function isPhoneCountryCode(value: string): value is PhoneCountryCode {
  return countryByCode.has(value as PhoneCountryCode);
}

export function phoneCountryName(code: string) {
  return countryByCode.get(code as PhoneCountryCode)?.name || code;
}

export function phonePlaceholder(code: PhoneCountryCode) {
  return countryByCode.get(code)?.example || "Phone number";
}

export function isE164Phone(value: string) {
  return /^\+[1-9]\d{7,14}$/.test(value);
}

export function normalizePhoneNumber(
  countryCode: PhoneCountryCode,
  input: string,
): string | undefined {
  const country = countryByCode.get(countryCode);
  const raw = input.trim();
  if (!country || !raw || raw.length > 60 || /[A-Za-z]/.test(raw)) return undefined;

  const international = raw.startsWith("+") || raw.startsWith("00");
  const digits = raw.replace(/\D/g, "");

  if (countryCode === "INTL") {
    if (!international) return undefined;
    const normalized = `+${raw.startsWith("00") ? digits.slice(2) : digits}`;
    return isE164Phone(normalized) ? normalized : undefined;
  }

  let national = digits;

  if (international) {
    const internationalDigits = raw.startsWith("00") ? digits.slice(2) : digits;
    if (!internationalDigits.startsWith(country.dialCode)) return undefined;
    national = internationalDigits.slice(country.dialCode.length);
  } else {
    if (country.dialCode === "1" && national.length === 11 && national.startsWith("1")) {
      national = national.slice(1);
    } else if (country.stripNationalPrefix && national.startsWith("0")) {
      national = national.slice(1);
    }
  }

  if (
    national.length < country.minNationalDigits ||
    national.length > country.maxNationalDigits
  ) {
    return undefined;
  }

  if ((countryCode === "US" || countryCode === "CA") && !/^[2-9]\d{2}[2-9]\d{6}$/.test(national)) {
    return undefined;
  }

  const normalized = `+${country.dialCode}${national}`;
  return isE164Phone(normalized) ? normalized : undefined;
}
