import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "M Landmark Residences – Căn hộ bên sông Hàn, Đà Nẵng | ERA",
  description:
    "M Landmark Residences – tòa M Landmark tại 58 Bạch Đằng, bên sông Hàn, Đà Nẵng. Đăng ký nhận mặt bằng, bảng giá và chính sách từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-m-landmark-residences/" },
  openGraph: {
    title: "M Landmark Residences – Căn hộ bên sông Hàn, Đà Nẵng",
    description: "Đăng ký nhận thông tin dự án M Landmark Residences từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-m-landmark-residences/",
    images: [
      {
        url: "/landing/m-landmark-residences/assets/img/og-m-landmark-residences-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "M Landmark Residences",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function MLandmarkResidencesPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="M Landmark Residences"
        src="/landing/m-landmark-residences/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
