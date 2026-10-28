import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GLADIA BY THE WATER | Biệt thự ven sông Bình Trưng | ERA",
  description: "Khu biệt thự ven sông 11,8 ha, 226 sản phẩm và 5 công viên chủ đề. Đăng ký nhận bảng giá và mặt bằng ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-gladia-by-the-water/" },
  openGraph: {
    title: "GLADIA BY THE WATER | Biệt thự ven sông Bình Trưng",
    description: "Khu biệt thự ven sông do Keppel và Khang Điền hợp tác phát triển",
    type: "website",
    url: "https://era.com.vn/du-an-gladia-by-the-water/",
    images: [{
      url: "/landing/gladia-by-the-water/assets/img/og-gladia-by-the-water.jpg",
      width: 1200,
      height: 630,
      alt: "GLADIA BY THE WATER",
    }],
  },
  robots: { index: true, follow: true },
};

export default function GladiaByTheWaterPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="GLADIA BY THE WATER"
        src="/landing/gladia-by-the-water/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
