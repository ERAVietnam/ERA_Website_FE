export const COUNTRY_OPTIONS = [
  { value: "SG", label: "Singapore", flag: "🇸🇬" },
  { value: "US", label: "Mỹ", flag: "🇺🇸" },
  { value: "VN", label: "Việt Nam", flag: "🇻🇳" },
] as const;

export type CountryCode = (typeof COUNTRY_OPTIONS)[number]["value"];

export function getCountryByCode(code?: string | null) {
  return COUNTRY_OPTIONS.find((c) => c.value === code);
}

export function getCountryFlag(code?: string | null): string {
  return getCountryByCode(code)?.flag ?? "";
}

export function getCountryLabel(code?: string | null): string {
  return getCountryByCode(code)?.label ?? "";
}
