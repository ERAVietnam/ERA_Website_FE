import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gem Park – Căn hộ N.H.O tại Hải Phòng | ERA",
  description:
    "Gem Park – căn hộ N.H.O tại Khu đô thị mới 2A, phường Hồng Bàng, TP. Hải Phòng. Đăng ký nhận mặt bằng, bảng giá và chính sách từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-gem-park/" },
  openGraph: {
    title: "Gem Park – Căn hộ N.H.O tại Hải Phòng",
    description: "Đăng ký nhận thông tin dự án Gem Park từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-gem-park/",
    images: [
      {
        url: "/landing/gem-park/assets/img/og-gem-park-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Gem Park",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function GemParkPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Gem Park"
        src="/landing/gem-park/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
