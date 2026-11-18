import type { Metadata } from "next";
import { SunwahPearlLanding } from "@/components/sections/landing/sunwah-pearl/SunwahPearlLanding";

export const metadata: Metadata = {
  title: "Sunwah Pearl | ERA Vietnam",
  description: "Khám phá Sunwah Pearl và các giải pháp đầu tư, tích sản bất động sản ven sông tại TP.HCM.",
  alternates: { canonical: "https://era.com.vn/du-an-sunwah-pearl-dau-tu/" },
  robots: { index: true, follow: true },
};

export default function SunwahPearlPage() {
  return <SunwahPearlLanding />;
}
