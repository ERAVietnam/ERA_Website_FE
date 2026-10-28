import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elyse Island | Biệt thự đảo Đại Phước | ERA",
  description:
    "Khám phá Elyse Island tại đảo Đại Phước, Đồng Nai: biệt thự đơn lập, song lập, 45 ha và 1,5 km mặt sông. Nhận bảng giá, mặt bằng và tư vấn từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-elyse-island/" },
  openGraph: {
    title: "Elyse Island | Biệt thự đảo Đại Phước | ERA",
    description:
      "Khám phá Elyse Island tại đảo Đại Phước, Đồng Nai: biệt thự đơn lập, song lập, 45 ha và 1,5 km mặt sông.",
    type: "website",
    url: "https://era.com.vn/du-an-elyse-island/",
    images: [
      {
        url: "/landing/elyse-island/assets/img/og-elyse-island.jpg",
        width: 1200,
        height: 630,
        alt: "Elyse Island tại đảo Đại Phước",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function ElyseIslandPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Elyse Island"
        src="/landing/elyse-island/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
