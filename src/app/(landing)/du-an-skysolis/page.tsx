import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "SkySOLIS – Căn hộ đầu tiên của SkyWorld tại Việt Nam, Lái Thiêu | ERA Vietnam",
  description:
    "SkySOLIS: dự án căn hộ cao tầng đầu tiên tại Việt Nam của SkyWorld Development (Malaysia) tại 88/10 Đại lộ Bình Dương (QL13), phường Lái Thiêu, TP.HCM. 3 tháp 40 tầng, 1.101 sản phẩm, tiêu chuẩn QLASSIC, ưu đãi đến 10%. Xem layout, chính sách thanh toán.",
  alternates: {
    canonical: "https://era.com.vn/du-an-skysolis/",
  },
  keywords: [
    "SkySOLIS",
    "SkySOLIS Lái Thiêu",
    "SkyWorld Development",
    "căn hộ Quốc lộ 13",
    "căn hộ Lái Thiêu",
    "căn hộ Thuận An",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "SkySOLIS – Khai mở tiềm năng vùng đất di sản",
    description:
      "Dự án căn hộ đầu tiên tại Việt Nam của SkyWorld Development: 3 tháp 40 tầng, 1.101 sản phẩm, tiêu chuẩn QLASSIC, ưu đãi đến 10% — mặt tiền Đại lộ Bình Dương, Lái Thiêu.",
    type: "website",
    url: "https://era.com.vn/du-an-skysolis/",
    images: [
      {
        url: "/landing/skysolis-static/assets/img/og-skysolis-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phối cảnh SkySOLIS: tháp căn hộ 40 tầng bên Đại lộ Bình Dương (Quốc lộ 13) và tuyến metro trên cao",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkySOLIS – Căn hộ đầu tiên của SkyWorld tại Việt Nam, Lái Thiêu",
    description:
      "3 tháp 40 tầng · 1.101 sản phẩm · QLASSIC · ưu đãi đến 10%. Mặt tiền Đại lộ Bình Dương, cách trạm metro ~100 m.",
    images: ["/landing/skysolis-static/assets/img/og-skysolis-1200x630.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Trang chủ", url: "https://era.com.vn/" },
  { name: "Dự án", url: "https://era.com.vn/du-an/" },
  { name: "SkySOLIS", url: "https://era.com.vn/du-an-skysolis/" },
];

export default function SkysolisPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <iframe
        title="SkySOLIS – Căn hộ Healthy Home tại Lái Thiêu"
        src="/landing/skysolis-static/index.html"
        style={{ display: "block", width: "100%", minHeight: "100vh", border: 0 }}
      />
    </>
  );
}
