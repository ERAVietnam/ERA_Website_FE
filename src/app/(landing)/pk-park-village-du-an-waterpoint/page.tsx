import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { ParkVillageLanding } from "@/components/sections/landing/park-village";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Park Village – Compound 96 biệt thự Grand Villa tại Waterpoint | ERA Vietnam",
  description:
    "Park Village: compound 96 biệt thự Grand Villa ba mặt giáp kênh đào ngay trung tâm khu đô thị Waterpoint, Bến Lức. Garden · Park · Canal Grand Villa, diện tích đất từ 300 m². Xem mặt bằng, nhà mẫu, đăng ký tham quan.",
  alternates: {
    canonical: "https://era.com.vn/pk-park-village-du-an-waterpoint/",
  },
  keywords: [
    "Park Village",
    "Park Village Waterpoint",
    "biệt thự Waterpoint",
    "Grand Villa Waterpoint",
    "compound biệt thự Bến Lức",
    "Nam Long Nishi Nippon",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Park Village – Họa phẩm châu Âu của riêng bạn",
    description:
      "Compound 96 biệt thự Grand Villa ba mặt giáp kênh đào 3,2 km ngay trung tâm khu đô thị Waterpoint. Nhà mẫu đã sẵn sàng đón khách.",
    type: "website",
    url: "https://era.com.vn/pk-park-village-du-an-waterpoint/",
    images: [
      {
        url: "/landing/park-village/park-village-hero-compound-ba-mat-kenh-dao.webp",
        width: 1600,
        height: 698,
        alt: "Phối cảnh Park Village từ trên cao: compound 96 biệt thự Grand Villa ba mặt giáp kênh đào trong khu đô thị Waterpoint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Park Village – Compound 96 biệt thự Grand Villa tại Waterpoint",
    description:
      "96 căn Grand Villa · 6,6 ha · 3,2 km kênh đào bao quanh ngay trung tâm Waterpoint. Đăng ký tham quan nhà mẫu.",
    images: ["/landing/park-village/park-village-hero-compound-ba-mat-kenh-dao.webp"],
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
  { name: "Park Village", url: "https://era.com.vn/pk-park-village-du-an-waterpoint/" },
];

export default function ParkVillagePage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <ParkVillageLanding />
    </div>
  );
}
