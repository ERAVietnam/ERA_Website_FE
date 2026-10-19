import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capital Square Đà Nẵng – Căn hộ ven sông Hàn | ERA",
  description:
    "Khám phá Capital Square Đà Nẵng – tổ hợp căn hộ ven sông Hàn, kết nối trung tâm thành phố và giỏ hàng giai đoạn 3.",
  alternates: { canonical: "https://era.com.vn/du-an-capital-square/" },
  openGraph: {
    title: "Capital Square Đà Nẵng – Căn hộ ven sông Hàn",
    description:
      "Tổ hợp căn hộ Capital Square tại Đà Nẵng, vị trí ven sông Hàn và kết nối trung tâm thành phố.",
    type: "website",
    url: "https://era.com.vn/du-an-capital-square/",
    images: [
      {
        url: "/landing/capital-square/assets/img/og-capital-square-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Capital Square Đà Nẵng",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function CapitalSquarePage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Capital Square Đà Nẵng"
        src="/landing/capital-square/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
