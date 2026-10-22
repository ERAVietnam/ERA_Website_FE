import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bán đảo SOLA – The Global City | ERA",
  description: "Khám phá Bán đảo SOLA tại The Global City và đăng ký nhận thông tin từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-ban-dao-sola/" },
  openGraph: {
    title: "Bán đảo SOLA – The Global City",
    description: "Đăng ký nhận thông tin Bán đảo SOLA từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-ban-dao-sola/",
    images: [{ url: "/landing/sola/assets/img/og-sola-the-global-city-1200x630.jpg", width: 1200, height: 630, alt: "Bán đảo SOLA – The Global City" }],
  },
  robots: { index: false, follow: false },
};

export default function SolaDangKyPage() {
  return <main className="min-h-screen w-full bg-white"><iframe title="Bán đảo SOLA – The Global City" src="/landing/sola/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} /></main>;
}
