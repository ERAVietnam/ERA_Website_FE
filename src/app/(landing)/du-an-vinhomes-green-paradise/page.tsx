import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinhomes Green Paradise Cần Giờ – Đô thị biển sinh thái | ERA",
  description:
    "Vinhomes Green Paradise Cần Giờ – khu đô thị du lịch lấn biển giữa biển Đông và rừng ngập mặn, gồm biệt thự, shophouse và căn hộ trong hệ sinh thái biển quy mô lớn.",
  alternates: { canonical: "https://era.com.vn/du-an-vinhomes-green-paradise/" },
  openGraph: {
    title: "Vinhomes Green Paradise Cần Giờ – Đô thị biển sinh thái",
    description:
      "Khám phá Vinhomes Green Paradise tại Cần Giờ, TP. Hồ Chí Minh cùng ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-vinhomes-green-paradise/",
    images: [
      {
        url: "/landing/vinhomes-green-paradise/assets/img/og-vinhomes-green-paradise-hoang-hon-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Vinhomes Green Paradise Cần Giờ lúc hoàng hôn",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function VinhomesGreenParadisePage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Vinhomes Green Paradise Cần Giờ"
        src="/landing/vinhomes-green-paradise/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
