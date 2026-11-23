import type { Metadata } from "next";
import { SunwahPearlResidentialLanding } from "@/components/sections/landing/sunwah-pearl/SunwahPearlResidentialLanding";

export const metadata: Metadata = {
  title: "Sunwah Pearl – Căn hộ mua ở | ERA Vietnam",
  description: "Nâng tầm chất lượng cuộc sống tại Sunwah Pearl: kết nối trung tâm, tiện ích chuẩn resort và không gian sống ven sông Sài Gòn dành cho gia đình.",
  alternates: { canonical: "https://era.com.vn/du-an-sunwah-pearl-mua-o/" },
  openGraph: {
    title: "Sunwah Pearl – Căn hộ mua ở | ERA Vietnam",
    description: "Nâng tầm chất lượng cuộc sống tại Sunwah Pearl: kết nối trung tâm, tiện ích chuẩn resort và không gian sống ven sông Sài Gòn dành cho gia đình.",
    type: "website",
    url: "https://era.com.vn/du-an-sunwah-pearl-mua-o/",
    siteName: "ERA Vietnam",
    locale: "vi_VN",
    images: [{ url: "https://era.com.vn/landing/sunwah-pearl-mua-o/assets/hero.webp", width: 1440, height: 960, alt: "Gia đình tận hưởng hoàng hôn bên sông Sài Gòn tại Sunwah Pearl" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunwah Pearl – Căn hộ mua ở | ERA Vietnam",
    description: "Nâng tầm chất lượng cuộc sống tại Sunwah Pearl: kết nối trung tâm, tiện ích chuẩn resort và không gian sống ven sông Sài Gòn dành cho gia đình.",
    images: [{ url: "https://era.com.vn/landing/sunwah-pearl-mua-o/assets/hero.webp", alt: "Gia đình tận hưởng hoàng hôn bên sông Sài Gòn tại Sunwah Pearl" }],
  },
  robots: { index: true, follow: true },
};

export default function SunwahPearlResidentialPage() {
  return <SunwahPearlResidentialLanding />;
}
