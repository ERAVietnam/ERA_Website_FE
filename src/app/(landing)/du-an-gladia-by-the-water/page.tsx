import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GLADIA BY THE WATER | Biet thu ven song Binh Trung | ERA",
  description: "Khu biet thu ven song 11,8 ha, 226 san pham va 5 cong vien chu de. Dang ky nhan bang gia va mat bang tu ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-gladia-by-the-water/" },
  openGraph: {
    title: "GLADIA BY THE WATER | Biet thu ven song Binh Trung",
    description: "Khu biet thu ven song do Keppel va Khang Dien hop tac phat trien.",
    type: "website",
    url: "https://era.com.vn/du-an-gladia-by-the-water/",
    images: [{
      url: "/landing/gladia-by-the-water/assets/img/og-gladia-by-the-water.jpg",
      width: 1200,
      height: 630,
      alt: "GLADIA BY THE WATER",
    }],
  },
  robots: { index: true, follow: true },
};

export default function GladiaByTheWaterPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="GLADIA BY THE WATER"
        src="/landing/gladia-by-the-water/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
