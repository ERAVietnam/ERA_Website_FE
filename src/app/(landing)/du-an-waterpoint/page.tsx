import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { WaterpointLanding } from "@/components/sections/landing/waterpoint";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Waterpoint | Đô thị nghỉ dưỡng liền kề Sài Gòn",
  description:
    "Waterpoint — đại đô thị 355ha bên sông Vàm Cỏ Đông, liền kề TP.HCM. The Aqua: biệt thự hiện hữu 225 - 1.302 m², sổ hồng riêng, 8,6 ha mặt nước, kết nối cao tốc TP.HCM - Trung Lương. Nhận bảng giá & đặt lịch tham quan.",
  alternates: {
    canonical: "https://era.com.vn/du-an-waterpoint/",
  },
  keywords: [
    "Waterpoint",
    "The Aqua",
    "Waterpoint Nam Long",
    "biệt thự Bến Lức",
    "biệt thự Long An",
    "đại đô thị ven sông",
    "bất động sản Long An",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Waterpoint | Đô thị nghỉ dưỡng liền kề Sài Gòn",
    description:
      "Đại đô thị 355ha bên sông Vàm Cỏ Đông, liền kề TP.HCM. Biệt thự hiện hữu 225 - 1.302 m², sổ hồng riêng, 8,6 ha mặt nước. Nhận bảng giá & đặt lịch tham quan.",
    type: "website",
    url: "https://era.com.vn/du-an-waterpoint/",
    images: [
      {
        url: "/landing/waterpoint/og-waterpoint-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Waterpoint — The Aqua",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waterpoint — The Aqua | Đại đô thị ven sông 355ha liền kề Sài Gòn",
    description:
      "Đại đô thị 355ha bên sông Vàm Cỏ Đông, liền kề TP.HCM. Biệt thự hiện hữu 225 - 1.302 m², sổ hồng riêng.",
    images: ["/landing/waterpoint/og-waterpoint-1200x630.jpg"],
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
];

export default function WaterpointPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <WaterpointLanding />
    </div>
  );
}
