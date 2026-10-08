import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hoiana Residences – Sống giữa khu nghỉ dưỡng mỗi ngày | ERA",
  description:
    "Hoiana Residences – căn hộ khách sạn đã hoàn thiện tại Hoiana Resort & Golf. Đăng ký tham quan, nhận bảng giá và thông tin chương trình cho thuê từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-hoiana-residences/" },
  openGraph: {
    title: "Hoiana Residences – Sống giữa khu nghỉ dưỡng mỗi ngày",
    description: "Đăng ký tham quan căn hộ thực tế và nhận thông tin Hoiana Residences từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-hoiana-residences/",
    images: [
      {
        url: "/landing/hoiana-residences/assets/img/og-hoiana-residences-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Hoiana Residences",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function HoianaResidencesPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Hoiana Residences"
        src="/landing/hoiana-residences/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
