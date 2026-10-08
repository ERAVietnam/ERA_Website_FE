import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Aspira Tân Đông Hiệp – Căn hộ 2 tháp 30 tầng chuẩn EDGE | ERA Vietnam",
  description:
    "The Aspira của Phúc An Gia – Sài Gòn High Rise: căn hộ 2 tháp 30 tầng, 1.212 sản phẩm trên đường Nguyễn Thị Minh Khai, phường Tân Đông Hiệp. Chứng chỉ xanh EDGE, cất nóc 10/4/2026, bàn giao Quý II/2027. 1PN – 2PN+, giá từ ~37,9 triệu/m². Nhận báo giá.",
  alternates: {
    canonical: "https://era.com.vn/du-an-the-aspira/",
  },
  keywords: [
    "The Aspira",
    "căn hộ The Aspira",
    "The Aspira Tân Đông Hiệp",
    "The Aspira Dĩ An",
    "căn hộ Nguyễn Thị Minh Khai",
    "Phúc An Gia",
    "Sài Gòn High Rise",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "The Aspira – Sống năng lượng, chọn The Aspira",
    description:
      "Căn hộ 2 tháp 30 tầng, 1.212 sản phẩm tại Tân Đông Hiệp – gần ga Metro số 1 kéo dài, chuẩn xanh EDGE, bàn giao Quý II/2027.",
    type: "website",
    url: "https://era.com.vn/du-an-the-aspira/",
    images: [
      {
        url: "/landing/the-aspira-static/assets/img/og-the-aspira-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phối cảnh The Aspira lúc hoàng hôn: 2 tháp 30 tầng bên đường Nguyễn Thị Minh Khai, phường Tân Đông Hiệp, TP.HCM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Aspira – Sống năng lượng, chọn The Aspira",
    description:
      "2 tháp 30 tầng · 1.212 sản phẩm · chuẩn xanh EDGE · bàn giao Quý II/2027 tại Tân Đông Hiệp.",
    images: ["/landing/the-aspira-static/assets/img/og-the-aspira-1200x630.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TheAspiraPage() {
  return (
    <iframe
      title="The Aspira – Căn hộ 2 tháp 30 tầng tại Tân Đông Hiệp"
      src="/landing/the-aspira-static/index.html"
      style={{ display: "block", width: "100%", minHeight: "100vh", border: 0 }}
    />
  );
}
