import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The NEST Midori Park – Căn hộ Becamex Tokyu | ERA",
  description: "The NEST Midori Park – 972 căn hộ studio đến penthouse giữa trung tâm TOD Thành phố mới Bình Dương.",
  alternates: { canonical: "https://era.com.vn/du-an-the-nest/" },
  openGraph: {
    title: "The NEST Midori Park – Căn hộ Becamex Tokyu",
    description: "Khám phá The NEST Midori Park và đăng ký nhận thông tin từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-the-nest/",
    images: [{ url: "/landing/the-nest/assets/img/og-the-nest-1200x630.jpg", width: 1200, height: 630, alt: "The NEST Midori Park" }],
  },
  robots: { index: false, follow: false },
};

export default function TheNestPage() {
  return <main className="min-h-screen w-full bg-white"><iframe title="The NEST Midori Park" src="/landing/the-nest/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} /></main>;
}
