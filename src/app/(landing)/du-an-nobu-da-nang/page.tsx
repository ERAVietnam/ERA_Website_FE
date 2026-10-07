import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nobu Residences Danang – Căn hộ hàng hiệu biển Mỹ Khê | ERA",
  description: "Nobu Residences Danang – căn hộ hàng hiệu bên biển Mỹ Khê, Đà Nẵng. Nhận thông tin mặt bằng và chính sách từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-nobu-da-nang/" },
  openGraph: {
    title: "Nobu Residences Danang – Căn hộ hàng hiệu biển Mỹ Khê",
    description: "Nhận thông tin dự án Nobu Residences Danang từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-nobu-da-nang/",
    images: [{ url: "/landing/nobu-da-nang/assets/img/og-nobu-da-nang-1200x630.jpg", width: 1200, height: 630, alt: "Nobu Residences Danang" }],
  },
  twitter: { card: "summary_large_image", title: "Nobu Residences Danang", images: ["/landing/nobu-da-nang/assets/img/og-nobu-da-nang-1200x630.jpg"] },
  robots: { index: true, follow: true },
};

export default function NobuDaNangPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe title="Nobu Residences Danang" src="/landing/nobu-da-nang/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} />
    </main>
  );
}
