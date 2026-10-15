import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Norton Park | Tinh chọn chuẩn chuyên gia | ERA",
  description:
    "Norton Park – khu căn hộ Gamuda Land tại Thuận Giao, TP.HCM, gồm 6 tòa tháp, cảnh quan xanh và hệ tiện ích hoàn chỉnh. Đăng ký nhận mặt bằng, bảng hàng và chính sách từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-norton-park/" },
  openGraph: {
    title: "Norton Park – Tinh chọn chuẩn chuyên gia | Gamuda Land",
    description:
      "Khám phá Norton Park với 6 tòa tháp giữa công viên xanh, đa dạng loại căn Studio, 1PN+, 2PN, 3PN, Duplex và Shop.",
    type: "website",
    url: "https://era.com.vn/du-an-norton-park/",
    images: [{ url: "/landing/norton-park/assets/img/og-norton-park-1200x630.jpg", width: 1200, height: 630, alt: "Norton Park" }],
  },
  robots: { index: true, follow: true },
};

export default function NortonParkPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe title="Norton Park" src="/landing/norton-park/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} />
    </main>
  );
}
