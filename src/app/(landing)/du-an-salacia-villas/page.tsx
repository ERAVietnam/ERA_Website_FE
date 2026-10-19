import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salacia Villas Phú Mỹ – Biệt thự compound 7,2 ha có sổ hồng | ERA",
  description:
    "Khám phá Salacia Villas Phú Mỹ – khu biệt thự compound 7,2 ha, không gian sống riêng tư với pháp lý sổ hồng tại Phú Mỹ.",
  alternates: { canonical: "https://era.com.vn/du-an-salacia-villas/" },
  openGraph: {
    title: "Salacia Villas Phú Mỹ – Biệt thự compound 7,2 ha có sổ hồng",
    description:
      "Khu biệt thự compound Salacia Villas tại Phú Mỹ, không gian sống riêng tư và kết nối thuận tiện vùng Đông Nam Bộ.",
    type: "website",
    url: "https://era.com.vn/du-an-salacia-villas/",
    images: [
      {
        url: "/landing/salacia-villas/assets/img/og-salacia-villas-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Salacia Villas Phú Mỹ",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function SalaciaVillasPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Salacia Villas Phú Mỹ"
        src="/landing/salacia-villas/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
