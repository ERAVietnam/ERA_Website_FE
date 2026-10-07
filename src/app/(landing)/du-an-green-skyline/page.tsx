import type { Metadata } from "next";
import { GreenSkylineLanding } from "@/components/sections/landing/green-skyline";

export const metadata: Metadata = {
  title: "Green Skyline Green Square – Căn hộ TBS Land đã cất nóc | ERA Vietnam",
  description:
    "Green Skyline của TBS Land: 1.296 căn hộ 4 tháp T1–T3B cao 28–40 tầng mặt tiền Quốc lộ 1K, trong khu đô thị Green Square 39 ha, TP.HCM. Đã cất nóc 22/12/2024, đủ điều kiện bán (20795/SXD-PTĐT), nhận nhà từ Quý 1/2027, vận hành Savills. Đăng ký tham quan.",
  alternates: {
    canonical: "https://era.com.vn/du-an-green-skyline/",
  },
  keywords: [
    "Green Skyline",
    "căn hộ Green Skyline",
    "Green Skyline Green Square",
    "TBS Land",
    "căn hộ Dĩ An",
    "căn hộ Quốc lộ 1K",
    "Green Square",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Green Skyline – Căn hộ “may đo” từ những giá trị thật",
    description:
      "1.296 căn hộ · 4 tháp 28–40 tầng · mặt tiền Quốc lộ 1K, Green Square 39 ha · đã cất nóc, nhận nhà từ Quý 1/2027 · vận hành Savills.",
    type: "website",
    url: "https://era.com.vn/du-an-green-skyline/",
    images: [
      {
        url: "/landing/green-skyline/og-green-skyline-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phối cảnh Green Skyline: 4 tháp căn hộ TBS Land bên Quốc lộ 1K, trong khu đô thị Green Square 39 ha lúc bình minh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Skyline – Căn hộ “may đo” từ những giá trị thật",
    description:
      "1.296 căn hộ · 4 tháp 28–40 tầng · đã cất nóc · Green Square 39 ha · vận hành Savills.",
    images: ["/landing/green-skyline/og-green-skyline-1200x630.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GreenSkylinePage() {
  return <GreenSkylineLanding />;
}
