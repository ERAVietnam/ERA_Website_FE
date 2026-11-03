import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOLARIA RISE | Căn hộ chuẩn resort giữa lòng Waterpoint",
  description:
    "Khám phá SOLARIA RISE tại Waterpoint: quy mô 3,1 ha, 698 sản phẩm, gần 30 tiện ích chuẩn resort. Xem mặt bằng và đăng ký nhận thông tin cùng ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-solaria-rise/" },
  openGraph: {
    title: "SOLARIA RISE | Căn hộ chuẩn resort giữa lòng Waterpoint",
    description:
      "Khám phá SOLARIA RISE tại Waterpoint: quy mô 3,1 ha, 698 sản phẩm, gần 30 tiện ích chuẩn resort.",
    type: "website",
    url: "https://era.com.vn/du-an-solaria-rise/",
    images: [
      {
        url: "/landing/solaria-rise/assets/img/og-solaria-rise.jpg",
        width: 1200,
        height: 630,
        alt: "SOLARIA RISE tại Waterpoint",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SolariaRisePage() {
  return (
    <iframe
      title="SOLARIA RISE – Căn hộ chuẩn resort giữa lòng Waterpoint"
      src="/landing/solaria-rise/index.html"
      style={{ display: "block", width: "100%", minHeight: "100vh", border: 0 }}
    />
  );
}
