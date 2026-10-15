import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LA Home | Khu đô thị sinh thái 100 ha bên dòng Vàm Cỏ Đông | ERA",
  description:
    "LA Home – khu đô thị sinh thái 100 ha tại Lương Hòa, Bến Lức, với 6 phân khu nhà phố, biệt thự ven kênh, 7 con kênh tự nhiên và công viên trung tâm 2,2 ha.",
  alternates: { canonical: "https://era.com.vn/du-an-la-home/" },
  openGraph: {
    title: "LA Home – Khu đô thị sinh thái 100 ha bên dòng Vàm Cỏ Đông",
    description:
      "Nhà phố, biệt thự ven kênh và sản phẩm thương mại tại LA Home. Xem mặt bằng, thông tin dự án và đăng ký nhận bảng giá từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-la-home/",
    images: [
      {
        url: "/landing/la-home/assets/img/og-lahome-cong-chinh-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "LA Home",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function LaHomePage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="LA Home"
        src="/landing/la-home/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
