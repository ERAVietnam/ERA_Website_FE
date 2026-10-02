import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { TheAquaLanding } from "@/components/sections/landing/the-aqua";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "The Aqua – Compound biệt thự bên Vịnh Cảng Waterpoint | ERA Vietnam",
  description:
    "The Aqua: compound biệt thự biệt lập thuộc phân khu Aquaria, trải dài bên Vịnh Cảng nước ngọt 8,6 ha và công viên ven sông 3,5 ha trong khu đô thị Waterpoint. 4 dòng Harborfront, Riverfront, Canal, Garden Grand Villa. Xem mặt bằng, nhà mẫu, đăng ký tham quan.",
  alternates: {
    canonical: "https://era.com.vn/the-aqua/",
  },
  keywords: [
    "The Aqua",
    "The Aqua Waterpoint",
    "compound biệt thự Waterpoint",
    "Grand Villa Aquaria",
    "biệt thự Vịnh Cảng Waterpoint",
    "Nam Long Nishi-Nippon",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "The Aqua – Chất riêng bên Vịnh Cảng",
    description:
      "Compound biệt thự biệt lập bên Vịnh Cảng nước ngọt 8,6 ha, phân khu Aquaria, khu đô thị Waterpoint. 4 dòng Grand Villa theo vị thế.",
    type: "website",
    url: "https://era.com.vn/the-aqua/",
    images: [
      {
        url: "/landing/the-aqua/the-aqua-hero-biet-thu-ben-vinh-cang.webp",
        width: 1600,
        height: 900,
        alt: "Phối cảnh The Aqua từ trên cao: dãy biệt thự, công viên ven sông và bến thuyền bên Vịnh Cảng nước ngọt, Waterpoint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Aqua – Compound biệt thự bên Vịnh Cảng Waterpoint",
    description:
      "Vịnh Cảng nước ngọt 8,6 ha · công viên ven sông 3,5 ha · 4 dòng Grand Villa. Đăng ký tham quan The Aqua.",
    images: ["/landing/the-aqua/the-aqua-hero-biet-thu-ben-vinh-cang.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Trang chủ", url: "https://era.com.vn/" },
  { name: "Dự án", url: "https://era.com.vn/du-an/" },
  { name: "Waterpoint", url: "https://era.com.vn/du-an-waterpoint/" },
  { name: "The Aqua", url: "https://era.com.vn/the-aqua/" },
];

export default function TheAquaPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <TheAquaLanding />
    </div>
  );
}
