import type { Metadata } from "next";
import { PhuGiaBaoLocFrame } from "./PhuGiaBaoLocFrame";
import { JsonLd } from "@/components/shared/JsonLd";
import { staticRealEstateListingJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Phú Gia Bảo Lộc – Khu biệt thự compound mặt tiền QL20 | ERA",
  description:
    "Dự án Khu biệt thự Phú Gia Bảo Lộc: compound 9,1 ha mặt tiền QL20, 357 nền liên kế, song lập và đơn lập, sổ riêng từng nền.",
  alternates: { canonical: "https://era.com.vn/phu-gia-bao-loc/" },
  openGraph: {
    type: "website",
    url: "https://era.com.vn/phu-gia-bao-loc/",
    title: "Phú Gia Bảo Lộc – Khu biệt thự compound mặt tiền QL20 | ERA",
    description: "Khu biệt thự compound 9,1 ha tại trung tâm Bảo Lộc, Lâm Đồng.",
    images: [
      {
        url: "https://era.com.vn/landing/phu-gia-bao-loc-new/assets/img/og-phu-gia-bao-loc-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phú Gia Bảo Lộc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phú Gia Bảo Lộc – Khu biệt thự compound mặt tiền QL20 | ERA",
    description: "Khu biệt thự compound 9,1 ha tại trung tâm Bảo Lộc, Lâm Đồng.",
    images: ["https://era.com.vn/landing/phu-gia-bao-loc-new/assets/img/og-phu-gia-bao-loc-1200x630.jpg"],
  },
  robots: { index: true, follow: true },
};

const listingJsonLd = staticRealEstateListingJsonLd({
  name: "Phú Gia Bảo Lộc",
  description: "Phú Gia Bảo Lộc – khu biệt thự compound mặt tiền Quốc lộ 20 tại trung tâm Bảo Lộc, Lâm Đồng.",
  url: "https://era.com.vn/phu-gia-bao-loc/",
  image: "https://era.com.vn/landing/phu-gia-bao-loc-new/assets/img/og-phu-gia-bao-loc-1200x630.jpg",
  address: "Quốc lộ 20, Bảo Lộc, Việt Nam",
  category: "Biệt thự compound",
});

export default function PhuGiaBaoLocNewPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={listingJsonLd} />
      <PhuGiaBaoLocFrame />
    </main>
  );
}
