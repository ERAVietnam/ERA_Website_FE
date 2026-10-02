import type { Metadata } from "next";
import { PalmRiverLanding } from "@/components/sections/landing/palm-river";

export const metadata: Metadata = {
  title: "Palm River – 4 tháp căn hộ 36 tầng ven sông tại Nam Rạch Chiếc | ERA Vietnam",
  description:
    "Palm River: 4 tòa tháp 36 tầng, 620 căn hộ Studio – 3PN, Duplex, Penthouse ven sông Giồng Ông Tố, khu đô thị Nam Rạch Chiếc, mặt tiền Song Hành cao tốc TP.HCM – Long Thành – Dầu Giây. Xem mặt bằng, layout căn hộ, nhận rổ hàng độc quyền.",
  alternates: {
    canonical: "https://era.com.vn/palm-river/",
  },
  keywords: [
    "Palm River",
    "căn hộ Palm River",
    "Nam Rạch Chiếc",
    "Palm City",
    "căn hộ ven sông Thủ Đức",
    "căn hộ Bình Trưng",
    "Hướng Việt Properties",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Palm River – Chuẩn sống nghỉ dưỡng giữa lòng thành phố",
    description:
      "4 tháp 36 tầng · 620 căn hộ · 3 mặt giáp sông Giồng Ông Tố tại khu đô thị Nam Rạch Chiếc. Nhận rổ hàng & bảng tính dòng tiền từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/palm-river/",
    images: [
      {
        url: "/landing/palm-river/og-palm-river-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phối cảnh Palm River: 4 tòa tháp 36 tầng bên sông Giồng Ông Tố, khu đô thị Nam Rạch Chiếc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm River – 4 tháp căn hộ 36 tầng ven sông tại Nam Rạch Chiếc",
    description:
      "620 căn hộ · 3 mặt giáp sông · Sky Onsen tầng 20. Nhận rổ hàng độc quyền từ ERA Vietnam.",
    images: ["/landing/palm-river/og-palm-river-1200x630.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PalmRiverPage() {
  return <PalmRiverLanding />;
}
