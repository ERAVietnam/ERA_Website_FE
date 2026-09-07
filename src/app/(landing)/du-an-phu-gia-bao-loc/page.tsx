import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { JsonLd } from "@/components/shared/JsonLd";
import { PhuGiaBaoLocLanding } from "@/components/sections/landing/phu-gia-bao-loc";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phú Gia Bảo Lộc",
  description:
    "Phú Gia Bảo Lộc – khu biệt thự compound duy nhất tại trung tâm Bảo Lộc, quy mô 9,12 ha với 357 sản phẩm, mặt tiền Quốc lộ 20, sổ hồng từng nền. Nhận bảng giá & thông tin mặt bằng mới nhất.",
  alternates: {
    canonical: "https://era.com.vn/du-an-phu-gia-bao-loc/",
  },
  keywords: [
    "Phú Gia Bảo Lộc",
    "biệt thự Bảo Lộc",
    "nhà phố Bảo Lộc",
    "compound Bảo Lộc",
    "bất động sản Bảo Lộc",
    "dự án Phú Gia Bảo Lộc",
    "sổ hồng từng nền Bảo Lộc",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Phú Gia Bảo Lộc – Biệt thự compound trung tâm Bảo Lộc",
    description:
      "Khu biệt thự compound duy nhất tại trung tâm Bảo Lộc, quy mô 9,12 ha, 357 sản phẩm, mặt tiền Quốc lộ 20. Nhận bảng giá & thông tin mặt bằng mới nhất.",
    type: "website",
    images: [
      {
        url: "/landing/phu-gia-bao-loc/images/hero_bg.webp",
        alt: "Phú Gia Bảo Lộc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phú Gia Bảo Lộc – Biệt thự compound trung tâm Bảo Lộc",
    description:
      "Khu biệt thự compound duy nhất tại trung tâm Bảo Lộc, quy mô 9,12 ha, 357 sản phẩm, mặt tiền Quốc lộ 20. Nhận bảng giá & thông tin mặt bằng mới nhất.",
    images: ["/landing/phu-gia-bao-loc/images/hero_bg.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Trang chủ", url: "https://era.com.vn/" },
  { name: "Dự án", url: "https://era.com.vn/du-an/" },
  { name: "Phú Gia Bảo Lộc", url: "https://era.com.vn/du-an-phu-gia-bao-loc/" },
];

export default function PhuGiaBaoLocPage() {
  return (
    <div className={montserrat.variable}>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <PhuGiaBaoLocLanding />
    </div>
  );
}
