import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOHO at The Global City | Phố thương mại quốc tế | ERA",
  description:
    "SOHO at The Global City – phố thương mại quốc tế tại cửa ngõ The Global City, TP.HCM. Khám phá mặt bằng, tiện ích và các mẫu nhà SOHO từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/pk-soho-du-an-the-global-city/" },
  openGraph: {
    title: "SOHO at The Global City – Phố thương mại quốc tế",
    description: "Không gian LIVE – WORK – PLAY tại The Global City với các mẫu nhà phố SOHO đa dạng.",
    type: "website",
    url: "https://era.com.vn/pk-soho-du-an-the-global-city/",
    images: [{ url: "/landing/soho/assets/img/og-soho-the-global-city-thuc-te-1200x630.jpg", width: 1200, height: 630, alt: "SOHO at The Global City" }],
  },
  robots: { index: true, follow: true },
};

export default function SohoPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe title="SOHO at The Global City" src="/landing/soho/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} />
    </main>
  );
}
