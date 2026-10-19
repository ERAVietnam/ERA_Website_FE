import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setia Edenia – Căn hộ mặt tiền Quốc lộ 13, Lái Thiêu | ERA",
  description:
    "Setia Edenia – 3 tòa căn hộ 27–28 tầng, 852 căn hộ và 13 shophouse trong khu đô thị EcoXuân 10,9 ha, do S P Setia phát triển.",
  alternates: { canonical: "https://era.com.vn/du-an-setia-edenia/" },
  openGraph: {
    title: "Setia Edenia – Căn hộ mặt tiền Quốc lộ 13, Lái Thiêu",
    description:
      "Khám phá Setia Edenia trong khu đô thị EcoXuân, Lái Thiêu, TP. Hồ Chí Minh.",
    type: "website",
    url: "https://era.com.vn/du-an-setia-edenia/",
    images: [
      {
        url: "/landing/setia-edenia/assets/img/og-setia-edenia-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Setia Edenia – căn hộ mặt tiền Quốc lộ 13",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SetiaEdeniaPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Setia Edenia"
        src="/landing/setia-edenia/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
