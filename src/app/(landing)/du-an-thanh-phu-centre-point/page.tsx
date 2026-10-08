import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh Phú Centre Point Bến Lức – Khu đô thị sinh thái thương mại | ERA Vietnam",
  description:
    "Thanh Phú Centre Point của BIM Land: GĐ1 Miền Thương Phú 85,2 ha, 1.251 nhà phố, shophouse, biệt thự mặt tiền Nguyễn Hữu Trí & ĐT.830C, Bến Lức — sát nút giao Mỹ Yên 2 cao tốc. 32 tiện ích, Cầu Rồng 50 m, Mega Mall 9,5 ha. Đăng ký tham quan.",
  alternates: {
    canonical: "https://era.com.vn/du-an-thanh-phu-centre-point/",
  },
  keywords: [
    "Thanh Phú Centre Point",
    "BIM Thanh Phú",
    "khu đô thị Bến Lức",
    "nhà phố Bến Lức",
    "shophouse Thanh Phú",
    "BIM Land",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Thanh Phú Centre Point – Tâm điểm giao thương cửa ngõ Tây TP.HCM",
    description:
      "Khu đô thị sinh thái – thương mại thấp tầng của BIM Land: 85,2 ha, 1.251 sản phẩm, 32 tiện ích, sát nút giao Mỹ Yên 2 cao tốc.",
    type: "website",
    url: "https://era.com.vn/du-an-thanh-phu-centre-point/",
    images: [
      {
        url: "/landing/thanh-phu-static/assets/img/og-thanh-phu-centre-point-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phối cảnh tổng thể Thanh Phú Centre Point: khu đô thị thấp tầng, hồ trung tâm và Mega Mall bên đường Nguyễn Hữu Trí, Bến Lức",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanh Phú Centre Point – Tâm điểm giao thương cửa ngõ Tây TP.HCM",
    description:
      "GĐ1 Miền Thương Phú 85,2 ha · 1.251 sản phẩm · 32 tiện ích · sát nút giao Mỹ Yên 2 cao tốc.",
    images: ["/landing/thanh-phu-static/assets/img/og-thanh-phu-centre-point-1200x630.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ThanhPhuPage() {
  return (
    <iframe
      title="Thanh Phú Centre Point – Khu đô thị sinh thái thương mại"
      src="/landing/thanh-phu-static/index.html"
      style={{ display: "block", width: "100%", minHeight: "100vh", border: 0 }}
    />
  );
}
