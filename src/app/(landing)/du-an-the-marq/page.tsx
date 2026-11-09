import type { Metadata } from "next";
import AutoHeightIframe from "@/components/landing/AutoHeightIframe";
import TheMarqHeader from "./TheMarqHeader";

export const metadata: Metadata = {
  title: "The Marq Quận 1 | ERA Vietnam",
  description: "The Marq Quận 1 – không gian sống hạng sang từ Hongkong Land tại lõi trung tâm Quận 1.",
  keywords: ["The Marq", "The Marq Quận 1", "Hongkong Land", "căn hộ Quận 1", "căn hộ hạng sang"],
  alternates: { canonical: "https://era.com.vn/du-an-the-marq/" },
  openGraph: {
    title: "The Marq Quận 1 | ERA Vietnam",
    description: "Không gian sống hạng sang từ Hongkong Land tại lõi trung tâm Quận 1.",
    type: "website",
    url: "https://era.com.vn/du-an-the-marq/",
    siteName: "ERA Vietnam",
    locale: "vi_VN",
    images: [{ url: "https://era.com.vn/landing/the-marq/assets/img/og-image.webp", width: 1200, height: 630, alt: "The Marq Quận 1" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Marq Quận 1 | ERA Vietnam",
    description: "Không gian sống hạng sang từ Hongkong Land tại lõi trung tâm Quận 1.",
    images: ["https://era.com.vn/landing/the-marq/assets/img/og-image.webp"],
  },
  robots: { index: true, follow: true },
};

export default function TheMarqPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Residence", name: "The Marq Quận 1", description: "Không gian sống hạng sang từ Hongkong Land tại lõi trung tâm Quận 1.", url: "https://era.com.vn/du-an-the-marq/", image: "https://era.com.vn/landing/the-marq/assets/img/og-image.webp", address: { "@type": "PostalAddress", addressLocality: "Quận 1", addressRegion: "Thành phố Hồ Chí Minh", addressCountry: "VN" }, brand: { "@type": "Brand", name: "Hongkong Land" } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><main className="w-full bg-white"><TheMarqHeader /><AutoHeightIframe frameId="the-marq-frame" title="The Marq Quận 1" src="/landing/the-marq/index.html?v=20261109-62" /></main></>;
}
