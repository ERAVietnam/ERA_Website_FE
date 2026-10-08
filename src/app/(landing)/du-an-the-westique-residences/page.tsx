import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Westique Residences An Lạc – Căn hộ boutique | ERA Vietnam",
  description:
    "The Westique Residences của VCRE: 1 tháp 15 tầng, 95 căn hộ và 4 shophouse tại 289 Kinh Dương Vương, phường An Lạc, kế bên 2 ga Metro số 3A tương lai. 2 tầng tiện ích, 12 loại layout.",
  alternates: {
    canonical: "https://era.com.vn/du-an-the-westique-residences/",
  },
  keywords: [
    "The Westique Residences",
    "The Westique",
    "căn hộ The Westique",
    "The Westique Kinh Dương Vương",
    "The Westique An Lạc",
    "VCRE",
    "căn hộ boutique Bình Tân",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "The Westique Residences – Chất boutique nơi tâm điểm khu Tây",
    description:
      "99 sản phẩm tinh tuyển của VCRE trên mặt tiền Kinh Dương Vương, phường An Lạc: 1 tháp 15 tầng, 2 tầng tiện ích, kế bên 2 ga Metro số 3A tương lai.",
    type: "website",
    url: "https://era.com.vn/du-an-the-westique-residences/",
    images: [
      {
        url: "/landing/the-westique-static/assets/img/og-the-westique-residences-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "The Westique Residences – căn hộ boutique 99 sản phẩm của VCRE trên mặt tiền Kinh Dương Vương, phường An Lạc, TP.HCM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Westique Residences – Chất boutique nơi tâm điểm khu Tây",
    description:
      "1 tháp 15 tầng, 95 căn hộ và 4 shophouse tại 289 Kinh Dương Vương, phường An Lạc, TP.HCM.",
    images: ["/landing/the-westique-static/assets/img/og-the-westique-residences-1200x630.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TheWestiquePage() {
  return (
    <iframe
      title="The Westique Residences – Căn hộ boutique tại An Lạc"
      src="/landing/the-westique-static/index.html"
      style={{ display: "block", width: "100%", minHeight: "100vh", border: 0 }}
    />
  );
}
