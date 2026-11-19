import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { staticRealEstateListingJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Phú Gia Bảo Lộc – Khu biệt thự compound mặt tiền QL20 | ERA",
  description:
    "Khám phá Khu biệt thự Phú Gia Bảo Lộc: compound 9,12 ha mặt tiền Quốc lộ 20, 357 nền liên kế, song lập, đơn lập, 27 tiện ích nội khu và sổ riêng từng nền.",
  alternates: { canonical: "https://era.com.vn/du-an-phu-gia-bao-loc/" },
  openGraph: {
    type: "website",
    url: "https://era.com.vn/du-an-phu-gia-bao-loc/",
    title: "Phú Gia Bảo Lộc – Khu biệt thự compound mặt tiền QL20 | ERA",
  description: "Khu biệt thự compound 9,12 ha tại trung tâm Bảo Lộc, Lâm Đồng, với 357 nền và 27 tiện ích nội khu.",
    images: [{ url: "/landing/phu-gia-bao-loc-new/assets/img/og-phu-gia-bao-loc-1200x630.jpg", width: 1200, height: 630, alt: "Phú Gia Bảo Lộc" }],
  },
  robots: { index: true, follow: true },
};

const listingJsonLd = staticRealEstateListingJsonLd({
  name: "Phú Gia Bảo Lộc",
  description: "Phú Gia Bảo Lộc – khu biệt thự compound 9,12 ha mặt tiền Quốc lộ 20 tại trung tâm Bảo Lộc, Lâm Đồng.",
  url: "https://era.com.vn/du-an-phu-gia-bao-loc/",
  image: "https://era.com.vn/landing/phu-gia-bao-loc-new/assets/img/og-phu-gia-bao-loc-1200x630.jpg",
  address: "Quốc lộ 20, Bảo Lộc, Việt Nam",
  category: "Biệt thự compound",
});

export default function PhuGiaBaoLocPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <JsonLd data={listingJsonLd} />
      <iframe title="Phú Gia Bảo Lộc" src="/landing/phu-gia-bao-loc-new/index.html?v=20261119-1" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} />
    </main>
  );
}
