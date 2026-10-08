import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gladia Heights – Căn hộ bên sông TP. Hồ Chí Minh | ERA",
  description:
    "Gladia Heights – dự án căn hộ bên sông với hệ tiện ích đẳng cấp. Đăng ký nhận mặt bằng, bảng giá và chính sách từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-gladia-heights/" },
  openGraph: {
    title: "Gladia Heights – Future-First, chuẩn sống tương lai bên sông",
    description: "Đăng ký nhận thông tin dự án Gladia Heights từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-gladia-heights/",
    images: [
      {
        url: "/landing/gladia-heights-dang-ky/assets/img/og-gladia-heights-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Gladia Heights",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function GladiaHeightsPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Gladia Heights"
        src="/landing/gladia-heights-dang-ky/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
