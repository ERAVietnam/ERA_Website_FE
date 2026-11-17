import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newtown Diamond Đà Nẵng | Căn hộ 1–3 phòng ngủ ven biển",
  description:
    "Khám phá Newtown Diamond tại Trường Sa – Nam Kỳ Khởi Nghĩa, Đà Nẵng: 3 tòa tháp, 1.733 căn hộ 1–3 phòng ngủ cùng ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-newtown-diamond/" },
  openGraph: {
    title: "Newtown Diamond Đà Nẵng | Căn hộ 1–3 phòng ngủ ven biển",
    description:
      "3 tòa tháp, 1.733 căn hộ tại Trường Sa – Nam Kỳ Khởi Nghĩa, Đà Nẵng.",
    type: "website",
    url: "https://era.com.vn/du-an-newtown-diamond/",
    images: [
      {
        url: "/landing/newtown-diamond/assets/img/og-newtown-diamond.jpg",
        width: 1200,
        height: 630,
        alt: "Newtown Diamond Đà Nẵng – căn hộ 1–3 phòng ngủ ven biển",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newtown Diamond Đà Nẵng | Căn hộ 1–3 phòng ngủ ven biển",
    description:
      "3 tòa tháp, 1.733 căn hộ tại Trường Sa – Nam Kỳ Khởi Nghĩa, Đà Nẵng.",
    images: ["/landing/newtown-diamond/assets/img/og-newtown-diamond.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function NewtownDiamondPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Newtown Diamond Đà Nẵng"
        src="/landing/newtown-diamond/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
