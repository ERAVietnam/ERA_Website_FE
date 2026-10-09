import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hanoi Signature – Căn hộ hạng sang Nguyễn Văn Huyên | ERA",
  description: "Hanoi Signature by Swiss-Belhotel tại số 6 Nguyễn Văn Huyên, Hà Nội. Đăng ký tham quan căn hộ thực tế và nhận thông tin dự án từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-hanoi-signature/" },
  openGraph: {
    title: "Hanoi Signature – Căn hộ hạng sang Nguyễn Văn Huyên",
    description: "Đăng ký tham quan và nhận thông tin dự án Hanoi Signature từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-hanoi-signature/",
    images: [{ url: "/landing/hanoi-signature/assets/img/og-hanoi-signature-1200x630.jpg", width: 1200, height: 630, alt: "Hanoi Signature" }],
  },
  robots: { index: true, follow: true },
};

export default function HanoiSignaturePage() {
  return <main className="min-h-screen w-full bg-white"><iframe title="Hanoi Signature" src="/landing/hanoi-signature/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} /></main>;
}
