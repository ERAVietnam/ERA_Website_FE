import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grand Marina Saigon – Căn hộ hàng hiệu Marriott bên sông Sài Gòn | ERA",
  description:
    "Grand Marina Saigon – khu căn hộ hàng hiệu Marriott tại số 2 Tôn Đức Thắng, TP. Hồ Chí Minh. Khám phá mặt bằng, tiện ích và chính sách dự án cùng ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-grand-marina-saigon/" },
  openGraph: {
    title: "Grand Marina Saigon – Căn hộ hàng hiệu Marriott bên sông Sài Gòn",
    description:
      "Khám phá Grand Marina Saigon với các thương hiệu Marriott International, mặt bằng và thông tin dự án từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-grand-marina-saigon/",
    images: [{ url: "/landing/grand-marina-saigon/assets/img/og-grand-marina-saigon-1200x630.jpg", width: 1200, height: 630, alt: "Grand Marina Saigon" }],
  },
  robots: { index: true, follow: true },
};

export default function GrandMarinaSaigonPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe title="Grand Marina Saigon" src="/landing/grand-marina-saigon/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} />
    </main>
  );
}
