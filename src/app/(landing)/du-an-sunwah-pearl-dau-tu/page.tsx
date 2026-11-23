import type { Metadata } from "next";
import { SunwahPearlLanding } from "@/components/sections/landing/sunwah-pearl/SunwahPearlLanding";

export const metadata: Metadata = {
  title: "Sunwah Pearl | ERA Vietnam",
  description: "Khám phá Sunwah Pearl và các giải pháp đầu tư, tích sản bất động sản ven sông tại TP.HCM.",
  alternates: { canonical: "https://era.com.vn/du-an-sunwah-pearl-dau-tu/" },
  openGraph: {
    title: "Sunwah Pearl | ERA Vietnam",
    description: "Khám phá Sunwah Pearl và các giải pháp đầu tư, tích sản bất động sản ven sông tại TP.HCM.",
    type: "website",
    url: "https://era.com.vn/du-an-sunwah-pearl-dau-tu/",
    siteName: "ERA Vietnam",
    locale: "vi_VN",
    images: [{ url: "https://era.com.vn/landing/sunwah-pearl/assets/sunwah-pearl-hero.webp", width: 1440, height: 960, alt: "Sunwah Pearl – không gian sống ven sông tại trung tâm TP.HCM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunwah Pearl | ERA Vietnam",
    description: "Khám phá Sunwah Pearl và các giải pháp đầu tư, tích sản bất động sản ven sông tại TP.HCM.",
    images: [{ url: "https://era.com.vn/landing/sunwah-pearl/assets/sunwah-pearl-hero.webp", alt: "Sunwah Pearl – không gian sống ven sông tại trung tâm TP.HCM" }],
  },
  robots: { index: true, follow: true },
};

export default function SunwahPearlPage() {
  return <SunwahPearlLanding />;
}
