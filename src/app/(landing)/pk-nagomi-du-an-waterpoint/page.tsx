import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { RiveraNagomiLanding } from "@/components/sections/landing/rivera-nagomi";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Rivera Nagomi – Nhà phố, biệt thự ven sông Bến Lức | ERA Vietnam",
  description:
    "Rivera Nagomi: phân khu thấp tầng 158 căn trong đô thị Waterpoint của Nam Long, mặt tiền ĐT.830 Bến Lức. Xem giá tham khảo, chính sách, đăng ký tham quan.",
  alternates: {
    canonical: "https://era.com.vn/pk-nagomi-du-an-waterpoint/",
  },
  keywords: [
    "Rivera Nagomi",
    "phân khu Rivera Nagomi",
    "Rivera Nagomi Waterpoint",
    "nhà phố vườn Rivera Nagomi",
    "biệt thự Rivera Nagomi",
    "shophouse Rivera Nagomi",
    "Waterpoint Nam Long",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Rivera Nagomi – mảnh ghép mới tại Waterpoint",
    description:
      "Phân khu thấp tầng 158 căn ven sông trong đô thị Waterpoint, Nam Long hợp tác Nishi-Nippon Railroad. Nhận bảng giá và lịch tham quan.",
    type: "website",
    url: "https://era.com.vn/pk-nagomi-du-an-waterpoint/",
    images: [
      {
        url: "/landing/rivera-nagomi/og-rivera-nagomi-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phối cảnh toàn cảnh phân khu Rivera Nagomi ven sông trong đô thị Waterpoint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rivera Nagomi – mảnh ghép mới tại Waterpoint",
    description:
      "Phân khu thấp tầng 158 căn ven sông trong đô thị Waterpoint. Nhận bảng giá và lịch tham quan.",
    images: ["/landing/rivera-nagomi/og-rivera-nagomi-1200x630.jpg"],
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
  { name: "Rivera Nagomi", url: "https://era.com.vn/pk-nagomi-du-an-waterpoint/" },
];

export default function RiveraNagomiPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <RiveraNagomiLanding />
    </div>
  );
}
