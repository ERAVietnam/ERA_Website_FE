import type { Metadata } from "next";
import { SunwahPearlResidentialLanding } from "@/components/sections/landing/sunwah-pearl/SunwahPearlResidentialLanding";

export const metadata: Metadata = {
  title: "Sunwah Pearl – Căn hộ mua ở | ERA Vietnam",
  description: "Nâng tầm chất lượng cuộc sống tại Sunwah Pearl: kết nối trung tâm, tiện ích chuẩn resort và không gian sống ven sông Sài Gòn dành cho gia đình.",
  alternates: { canonical: "https://era.com.vn/du-an-sunwah-pearl-mua-o/" },
  robots: { index: true, follow: true },
};

export default function SunwahPearlResidentialPage() {
  return <SunwahPearlResidentialLanding />;
}
