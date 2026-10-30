import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/landing/newtown-legend/assets/img/newtown-legend-official-favicon.png",
  },
  title: "Newtown Legend Đà Nẵng – Biệt thự sân golf đường Trường Sa | ERA",
  description:
    "Newtown Legend – A Golf Villas Park: biệt thự và nhà liền kề sở hữu lâu dài bên sân golf Legend Danang, đường Trường Sa, Ngũ Hành Sơn, Đà Nẵng.",
  alternates: { canonical: "https://era.com.vn/du-an-newtown-legend/" },
  openGraph: {
    title: "Newtown Legend – A Golf Villas Park bên sân golf Legend Danang",
    description:
      "Khám phá Newtown Legend với biệt thự Legacy Street và nhà liền kề Newtown Avenue tại Đà Nẵng.",
    type: "website",
    url: "https://era.com.vn/du-an-newtown-legend/",
    images: [
      {
        url: "/landing/newtown-legend/assets/img/og-newtown-legend-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Newtown Legend bên sân golf Legend Danang",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function NewtownLegendPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Newtown Legend Đà Nẵng"
        src="/landing/newtown-legend/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
