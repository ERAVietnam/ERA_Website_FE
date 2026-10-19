import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artisan Park – Nhà phố thương mại cạnh WTC Bình Dương | ERA",
  description:
    "Khám phá Artisan Park – khu nhà phố thương mại cạnh WTC Bình Dương, quy hoạch compound hiện đại tại trung tâm Thành phố mới Bình Dương.",
  alternates: { canonical: "https://era.com.vn/du-an-artisan-park/" },
  openGraph: {
    title: "Artisan Park – Nhà phố thương mại cạnh WTC Bình Dương",
    description:
      "Khu nhà phố thương mại Artisan Park tại trung tâm Thành phố mới Bình Dương, kết nối WTC và các tiện ích đô thị.",
    type: "website",
    url: "https://era.com.vn/du-an-artisan-park/",
    images: [
      {
        url: "/landing/artisan-park/assets/img/og-artisan-park-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Artisan Park Bình Dương",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function ArtisanParkPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Artisan Park Bình Dương"
        src="/landing/artisan-park/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
