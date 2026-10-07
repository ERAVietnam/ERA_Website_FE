import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diamond Sky Vạn Phúc City – Căn hộ cao cấp | ERA Vietnam",
  description:
    "Diamond Sky tại Van Phuc City, 375 Quốc lộ 13: căn hộ cao cấp 1PN+1 đến 5PN, view hồ Đại Nhật và sông Sài Gòn. Nhận bảng giá, mặt bằng và lịch tham quan căn hộ mẫu.",
  alternates: {
    canonical: "https://era.com.vn/du-an-diamond-sky/",
  },
  keywords: [
    "Diamond Sky",
    "Diamond Sky Vạn Phúc City",
    "căn hộ Diamond Sky",
    "căn hộ Van Phuc City",
    "Vạn Phúc Group",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Diamond Sky – Tinh anh hội tụ, đẳng cấp thăng hoa",
    description:
      "Căn hộ cao cấp Diamond Sky tại Van Phuc City, 375 Quốc lộ 13. Nhận bảng giá và mặt bằng căn.",
    type: "website",
    url: "https://era.com.vn/du-an-diamond-sky/",
    images: [
      {
        url: "/landing/diamond-sky/assets/img/og-diamond-sky-van-phuc-city-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phối cảnh Diamond Sky tại Van Phuc City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diamond Sky – Vạn Phúc City",
    description: "Nhận bảng giá, mặt bằng và lịch tham quan căn hộ mẫu Diamond Sky.",
    images: ["/landing/diamond-sky/assets/img/og-diamond-sky-van-phuc-city-1200x630.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function DiamondSkyPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Diamond Sky – Vạn Phúc City"
        src="/landing/diamond-sky/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
