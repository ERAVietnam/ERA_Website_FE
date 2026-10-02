import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { NamMekongLanding } from "@/components/sections/landing/nam-mekong";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Nam Mekong Grand Plaza – Căn hộ TOD vòng xoay WTC Thành phố mới Bình Dương | ERA Vietnam",
  description:
    "Nam Mekong Grand Plaza: 2 tháp 30 tầng, 1.622 căn hộ Studio – Penthouse ngay vòng xoay WTC, Thành phố mới Bình Dương. Chủ đầu tư Mekong Group (VC3), 50+ tiện ích, mô hình TOD. Xem mặt bằng, chính sách thanh toán, đăng ký tham quan nhà mẫu.",
  alternates: {
    canonical: "https://era.com.vn/du-an-nam-mekong-grand-plaza/",
  },
  keywords: [
    "Nam Mekong Grand Plaza",
    "căn hộ Thành phố mới Bình Dương",
    "căn hộ vòng xoay WTC",
    "Mekong Group",
    "VC3",
    "căn hộ TOD Bình Dương",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Nam Mekong Grand Plaza – Tiên phong đánh thức dòng chảy tiềm năng ẩn sâu trong lòng đô thị",
    description:
      "2 tháp 30 tầng · 1.622 căn hộ · 50+ tiện ích ngay vòng xoay WTC, Thành phố mới Bình Dương. Nhà mẫu 2PN & 3PN đã sẵn sàng đón khách.",
    type: "website",
    url: "https://era.com.vn/du-an-nam-mekong-grand-plaza/",
    images: [
      {
        url: "/landing/nam-mekong/nam-mekong-grand-plaza-hero-vong-xoay-wtc.webp",
        width: 1600,
        height: 900,
        alt: "Phối cảnh Nam Mekong Grand Plaza: hai tháp 30 tầng bên vòng xoay WTC và nhà ga metro trung tâm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nam Mekong Grand Plaza – Căn hộ TOD vòng xoay WTC Thành phố mới Bình Dương",
    description:
      "2 tháp 30 tầng · 1.622 căn hộ · 50+ tiện ích ngay vòng xoay WTC. Nhà mẫu đã sẵn sàng đón khách.",
    images: ["/landing/nam-mekong/nam-mekong-grand-plaza-hero-vong-xoay-wtc.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Trang chủ", url: "https://era.com.vn/" },
  { name: "Dự án", url: "https://era.com.vn/du-an/" },
  { name: "Nam Mekong Grand Plaza", url: "https://era.com.vn/du-an-nam-mekong-grand-plaza/" },
];

export default function NamMekongPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <NamMekongLanding />
    </div>
  );
}
