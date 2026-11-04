import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Persa Place | Căn hộ tại Spring Ville Nhơn Trạch | ERA Vietnam",
  description:
    "Khám phá Persa Place tại Spring Ville Nhơn Trạch: căn hộ 1–3 phòng ngủ, shophouse và tiện ích nội khu. Nhận thông tin dự án cùng ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-persa-place/" },
  openGraph: {
    title: "Persa Place | Căn hộ tại Spring Ville Nhơn Trạch",
    description: "Nhận thông tin mặt bằng, sản phẩm và chính sách Persa Place từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-persa-place/",
    images: [
      {
        url: "/landing/persa-place/assets/img/og-persa-place.jpg",
        width: 1200,
        height: 630,
        alt: "Persa Place tại Spring Ville Nhơn Trạch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Persa Place | ERA Vietnam",
    description: "Thông tin dự án Persa Place tại Spring Ville Nhơn Trạch.",
    images: ["/landing/persa-place/assets/img/og-persa-place.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function PersaPlacePage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Persa Place"
        src="/landing/persa-place/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
