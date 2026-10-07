import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Legend Đà Nẵng – Căn hộ chân cầu Rồng, view sông Hàn | ERA",
  description: "The Legend Đà Nẵng – căn hộ chân cầu Rồng, view sông Hàn. Nhận thông tin mặt bằng, tiện ích và chính sách dự án từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-the-legend-da-nang/" },
  openGraph: {
    title: "The Legend Đà Nẵng – Căn hộ chân cầu Rồng, view sông Hàn",
    description: "Nhận thông tin dự án The Legend Đà Nẵng từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-the-legend-da-nang/",
    images: [{ url: "/landing/the-legend-da-nang/assets/img/og-the-legend-da-nang-1200x630.jpg", width: 1200, height: 630, alt: "The Legend Đà Nẵng" }],
  },
  twitter: { card: "summary_large_image", title: "The Legend Đà Nẵng", images: ["/landing/the-legend-da-nang/assets/img/og-the-legend-da-nang-1200x630.jpg"] },
  robots: { index: true, follow: true },
};

export default function TheLegendDaNangPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="The Legend Đà Nẵng"
        src="/landing/the-legend-da-nang/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
