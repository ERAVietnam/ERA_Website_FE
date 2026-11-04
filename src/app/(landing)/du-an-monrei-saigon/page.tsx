import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monrei Saigon | Căn hộ ven sông tại Thuận Giao | ERA Vietnam",
  description:
    "Khám phá Monrei Saigon tại Thuận Giao, TP.HCM: không gian sống ven sông, tiện ích thủy lực và thông tin sản phẩm từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-monrei-saigon/" },
  openGraph: {
    title: "Monrei Saigon | Căn hộ ven sông tại Thuận Giao",
    description: "Nhận thông tin mặt bằng, sản phẩm và chính sách Monrei Saigon từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-monrei-saigon/",
    images: [
      {
        url: "/landing/monrei-saigon/assets/img/og-monrei-saigon-cdt.jpg",
        width: 1200,
        height: 630,
        alt: "Monrei Saigon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monrei Saigon | ERA Vietnam",
    description: "Thông tin dự án Monrei Saigon tại Thuận Giao.",
    images: ["/landing/monrei-saigon/assets/img/og-monrei-saigon-cdt.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function MonreiSaigonPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Monrei Saigon"
        src="/landing/monrei-saigon/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
