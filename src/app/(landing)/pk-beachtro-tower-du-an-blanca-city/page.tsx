import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beachtro Tower Blanca City – Căn hộ biển sở hữu lâu dài cuối cùng | ERA Vietnam",
  description:
    "Beachtro Tower của Sun Group – Sun Property: 1.785 căn hộ biển sở hữu lâu dài cuối cùng tại đại đô thị Blanca City 96,6 ha, Vũng Tàu. 4 tháp E6–E9 cao 36–40 tầng, 1 mặt biển Bãi Sau – 1 mặt đại lộ 3 Tháng 2 – 4 mặt công viên, nhận nhà dự kiến 31/08/2028. Đăng ký tham quan.",
  alternates: {
    canonical: "https://era.com.vn/pk-beachtro-tower-du-an-blanca-city/",
  },
  keywords: [
    "Beachtro Tower",
    "căn hộ Beachtro Tower",
    "Beachtro Tower Blanca City",
    "căn hộ biển Vũng Tàu",
    "Blanca City Sun Group",
    "căn hộ sở hữu lâu dài Vũng Tàu",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Beachtro Tower – Tuyệt phẩm căn hộ biển sở hữu lâu dài cuối cùng tại Blanca City",
    description:
      "1.785 căn hộ · 4 tháp 36–40 tầng · 1 mặt biển Bãi Sau – 1 mặt đại lộ 3 Tháng 2 – 4 mặt công viên · nhận nhà 31/08/2028.",
    type: "website",
    url: "https://era.com.vn/pk-beachtro-tower-du-an-blanca-city/",
    images: [
      {
        url: "/landing/beachtro-tower-static/assets/img/og-beachtro-tower-blanca-city-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phối cảnh Beachtro Tower – Blanca City: tổ hợp tháp căn hộ bên công viên và dãy biệt thự, hướng biển Bãi Sau Vũng Tàu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beachtro Tower – Căn hộ biển sở hữu lâu dài cuối cùng tại Blanca City",
    description:
      "1.785 căn hộ · 4 tháp 36–40 tầng · 1 mặt biển – 1 mặt đại lộ – 4 mặt công viên · Vũng Tàu.",
    images: ["/landing/beachtro-tower-static/assets/img/og-beachtro-tower-blanca-city-1200x630.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BeachtroTowerPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Beachtro Tower Blanca City"
        src="/landing/beachtro-tower-static/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
