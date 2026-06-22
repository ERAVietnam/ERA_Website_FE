import SG from "country-flag-icons/react/3x2/SG";
import US from "country-flag-icons/react/3x2/US";
import VN from "country-flag-icons/react/3x2/VN";
import { getCountryLabel } from "@/lib/country";
import type { ComponentType, SVGProps } from "react";

const flags: Record<string, ComponentType<any>> = {
  SG,
  US,
  VN,
};

interface CountryFlagProps {
  code?: string | null;
  className?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
}

export function CountryFlag({ code, title, ...props }: CountryFlagProps) {
  const Flag = code ? flags[code] : null;
  if (!Flag) return null;
  return <Flag {...props} title={title ?? getCountryLabel(code)} />;
}
