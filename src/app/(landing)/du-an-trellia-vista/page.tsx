import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trellia Vista – Căn hộ bên sông tại Mizuki Park | ERA",
  description:
    "Trellia Vista – tháp TC3 thuộc phân khu Trellia Cove, Mizuki Park, Nam Sài Gòn. Đăng ký nhận mặt bằng, bảng giá và chính sách từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-trellia-vista/" },
  openGraph: {
    title: "Trellia Vista – Căn hộ bên sông tại Mizuki Park",
    description: "Đăng ký nhận thông tin dự án Trellia Vista từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-trellia-vista/",
    images: [
      {
        url: "/landing/trellia-vista/assets/img/og-trellia-vista-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Trellia Vista",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TrelliaVistaPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Trellia Vista"
        src="/landing/trellia-vista/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
