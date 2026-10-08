import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celesta Gold Nhà Bè – Căn hộ chuẩn xanh Singapore | ERA Vietnam",
  description:
    "Celesta Gold của liên danh Keppel – Phú Long – Nomura: 2 tháp 25 tầng, 420 căn hộ, 9 căn/sàn, mặt tiền đại lộ Nguyễn Hữu Thọ, Nhà Bè. Hơn 40 tiện ích xanh, theo đuổi chứng nhận BCA Green Mark Gold.",
  alternates: {
    canonical: "https://era.com.vn/du-an-celesta-gold/",
  },
  keywords: [
    "Celesta Gold",
    "căn hộ Celesta Gold",
    "Celesta Gold Nhà Bè",
    "Celesta Gold Nguyễn Hữu Thọ",
    "Keppel Celesta",
    "căn hộ Nhà Bè",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Celesta Gold – Chuẩn sống xanh Singapore trên trục Nguyễn Hữu Thọ",
    description:
      "Phân khu căn hộ cao cấp tiếp theo của khu đô thị Celesta: 2 tháp 25 tầng, 420 căn hộ, 9 căn/sàn, theo đuổi chứng nhận xanh BCA Green Mark Gold.",
    type: "website",
    url: "https://era.com.vn/du-an-celesta-gold/",
    images: [
      {
        url: "/landing/celesta-gold-static/assets/img/og-celesta-gold-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Celesta Gold – 2 tháp căn hộ 25 tầng của liên danh Keppel – Phú Long – Nomura trên đại lộ Nguyễn Hữu Thọ, Nhà Bè",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Celesta Gold – Chuẩn sống xanh Singapore trên trục Nguyễn Hữu Thọ",
    description:
      "2 tháp 25 tầng, 420 căn hộ, 9 căn/sàn trên đại lộ Nguyễn Hữu Thọ, xã Nhà Bè, TP.HCM.",
    images: ["/landing/celesta-gold-static/assets/img/og-celesta-gold-1200x630.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CelestaGoldPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Celesta Gold Nhà Bè"
        src="/landing/celesta-gold-static/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
