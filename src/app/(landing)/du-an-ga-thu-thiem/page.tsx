import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ga Thủ Thiêm – Khu đô thị phức hợp tại TP.HCM | ERA",
  description:
    "Khu đô thị phức hợp Ga Thủ Thiêm – không gian sống, thương mại và giao thông thế hệ mới tại TP.HCM. Đăng ký nhận thông tin từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-ga-thu-thiem/" },
  openGraph: {
    title: "Ga Thủ Thiêm – Khu đô thị phức hợp tại TP.HCM",
    description: "Đăng ký nhận thông tin dự án Khu đô thị phức hợp Ga Thủ Thiêm từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-ga-thu-thiem/",
    images: [
      {
        url: "/landing/ga-thu-thiem/assets/img/og-ga-thu-thiem-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Khu đô thị phức hợp Ga Thủ Thiêm",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function GaThuThiemPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Khu đô thị phức hợp Ga Thủ Thiêm"
        src="/landing/ga-thu-thiem/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
