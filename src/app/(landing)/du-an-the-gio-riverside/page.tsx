import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Gió Riverside – Căn hộ bên sông Đồng Nai | ERA Vietnam",
  description:
    "The Gió Riverside của An Gia: 2 tháp 40 tầng bên sông Đồng Nai, 68 tiện ích nội khu, gần metro số 1 và Bến xe Miền Đông mới.",
  alternates: {
    canonical: "https://era.com.vn/du-an-the-gio-riverside/",
  },
  openGraph: {
    title: "The Gió Riverside – Căn hộ bên sông Đồng Nai",
    description:
      "Khám phá The Gió Riverside của An Gia cùng ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-the-gio-riverside/",
    images: [
      {
        url: "/landing/the-gio-riverside/assets/img/og-the-gio-riverside-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "The Gió Riverside – căn hộ bên sông Đồng Nai",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TheGioRiversideLandingPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="The Gió Riverside"
        src="/landing/the-gio-riverside/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
