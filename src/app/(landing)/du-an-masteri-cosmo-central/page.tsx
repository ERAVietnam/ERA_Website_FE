import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masteri Cosmo Central – Căn hộ tại The Global City | ERA",
  description:
    "Masteri Cosmo Central tại The Global City, TP.HCM – căn hộ Terra Tropical, tiện ích nội khu và kết nối trung tâm.",
  alternates: { canonical: "https://era.com.vn/du-an-masteri-cosmo-central/" },
  openGraph: {
    title: "Masteri Cosmo Central – Căn hộ tại The Global City",
    description: "Khám phá Masteri Cosmo Central và đăng ký nhận thông tin dự án từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-masteri-cosmo-central/",
    images: [
      {
        url: "/landing/masteri-cosmo-central/assets/img/og-masteri-cosmo-central-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Masteri Cosmo Central",
      },
    ],
  },
  robots: { index: false, follow: false },
};

export default function MasteriCosmoCentralPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Masteri Cosmo Central"
        src="/landing/masteri-cosmo-central/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
