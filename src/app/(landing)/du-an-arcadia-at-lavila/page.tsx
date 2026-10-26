import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcadia at Lavila – Căn hộ chất Pháp | ERA",
  description: "Arcadia at Lavila – căn hộ phong cách Pháp trên trục Nguyễn Hữu Thọ, Nhà Bè, TP.HCM.",
  alternates: { canonical: "https://era.com.vn/du-an-arcadia-at-lavila/" },
  openGraph: {
    title: "Arcadia at Lavila – Căn hộ chất Pháp",
    description: "Khám phá Arcadia at Lavila và đăng ký nhận thông tin từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-arcadia-at-lavila/",
    images: [{ url: "/landing/arcadia/assets/img/og-arcadia-at-lavila-1200x630.jpg", width: 1200, height: 630, alt: "Arcadia at Lavila" }],
  },
  robots: { index: true, follow: true },
};

export default function ArcadiaPage() {
  return <main className="min-h-screen w-full bg-white"><iframe title="Arcadia at Lavila" src="/landing/arcadia/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} /></main>;
}
