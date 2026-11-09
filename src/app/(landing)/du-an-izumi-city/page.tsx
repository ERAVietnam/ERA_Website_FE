import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Izumi City | Đô thị bên sông Đồng Nai | ERA Vietnam",
  description: "Khám phá Izumi City bên sông Đồng Nai, Izumi Canaria và Izumi Gardenia cùng ERA Vietnam.",
  keywords: ["Izumi City", "Izumi Canaria", "Izumi Gardenia", "Nam Long", "Long Hưng Đồng Nai"],
  alternates: { canonical: "https://era.com.vn/du-an-izumi-city/" },
  openGraph: {
    title: "Izumi City – Đô thị bên sông Đồng Nai | ERA Vietnam",
    description: "Khám phá Izumi City, Izumi Canaria và Izumi Gardenia bên sông Đồng Nai.",
    type: "website",
    url: "https://era.com.vn/du-an-izumi-city/",
    siteName: "ERA Vietnam",
    locale: "vi_VN",
    images: [{ url: "https://era.com.vn/landing/izumi-city/assets/img/og-izumi-city.jpg", width: 1200, height: 630, alt: "Izumi City – ERA Vietnam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Izumi City – Đô thị bên sông Đồng Nai | ERA Vietnam",
    description: "Khám phá Izumi City, Izumi Canaria và Izumi Gardenia bên sông Đồng Nai.",
    images: ["https://era.com.vn/landing/izumi-city/assets/img/og-izumi-city.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function IzumiCityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: "Izumi City",
    description: "Đô thị bên sông Đồng Nai với Izumi Canaria và Izumi Gardenia.",
    url: "https://era.com.vn/du-an-izumi-city/",
    image: "https://era.com.vn/landing/izumi-city/assets/img/og-izumi-city.jpg",
    address: { "@type": "PostalAddress", addressLocality: "Long Hưng", addressRegion: "Đồng Nai", addressCountry: "VN" },
    brand: { "@type": "Brand", name: "Izumi City" },
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><main className="min-h-screen w-full bg-white"><iframe title="Izumi City" src="/landing/izumi-city/index.html?v=20261109-2" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} /></main></>;
}
