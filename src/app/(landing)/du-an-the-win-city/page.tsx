import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Win City – Khu đô thị căn hộ cửa ngõ Tây Sài Gòn | ERA",
  description:
    "The Win City – khu đô thị căn hộ 13,8 ha, 18 tòa tháp, gần 6.000 sản phẩm tại Đức Hòa, Tây Ninh. Phân khu Victory Heights 2.822 căn hộ do Tập đoàn Thắng Lợi phát triển.",
  alternates: { canonical: "https://era.com.vn/du-an-the-win-city/" },
  openGraph: {
    title: "The Win City – Khu đô thị căn hộ cửa ngõ Tây Sài Gòn",
    description:
      "Khám phá The Win City và phân khu Victory Heights tại Đức Hòa, Tây Ninh.",
    type: "website",
    url: "https://era.com.vn/du-an-the-win-city/",
    images: [
      {
        url: "/landing/the-win-city/assets/img/og-the-win-city-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "The Win City lúc hoàng hôn",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TheWinCityPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="The Win City"
        src="/landing/the-win-city/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
