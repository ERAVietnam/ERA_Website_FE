import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maia Resort Ho Tram – Căn hộ & villa mặt tiền biển Hồ Tràm | ERA",
  description:
    "Maia Resort Ho Tram – khu căn hộ và villa nghỉ dưỡng mặt tiền biển Hồ Tràm, gồm Happy Tower và villa biệt lập. Khám phá mặt bằng, tiện ích và thông tin dự án cùng ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-maia-ho-tram/" },
  openGraph: {
    title: "Maia Resort Ho Tram – Căn hộ & villa mặt tiền biển Hồ Tràm",
    description: "Khám phá Maia Resort Ho Tram với căn hộ Happy Tower, villa nghỉ dưỡng và hệ tiện ích ven biển.",
    type: "website",
    url: "https://era.com.vn/du-an-maia-ho-tram/",
    images: [{ url: "/landing/maia-ho-tram/assets/img/og-maia-ho-tram-1200x630.jpg", width: 1200, height: 630, alt: "Maia Resort Ho Tram" }],
  },
  robots: { index: true, follow: true },
};

export default function MaiaHoTramPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe title="Maia Resort Ho Tram" src="/landing/maia-ho-tram/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} />
    </main>
  );
}
