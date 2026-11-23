import type { Metadata } from "next";
import AutoHeightIframe from "@/components/landing/AutoHeightIframe";
import TheMarqHeader from "./TheMarqHeader";

export const metadata: Metadata = {
  title: "The MARQ | ERA Vietnam",
  description: "The Marq Quận 1 – không gian sống hạng sang từ Hongkong Land tại lõi trung tâm Quận 1.",
  keywords: ["The Marq", "The Marq Quận 1", "Hongkong Land", "căn hộ Quận 1", "căn hộ hạng sang"],
  alternates: { canonical: "https://era.com.vn/du-an-the-marq/" },
  openGraph: {
    title: "The MARQ | ERA Vietnam",
    description: "Không gian sống hạng sang từ Hongkong Land tại lõi trung tâm Quận 1.",
    type: "website",
    url: "https://era.com.vn/du-an-the-marq/",
    siteName: "ERA Vietnam",
    locale: "vi_VN",
    images: [{ url: "https://era.com.vn/landing/the-marq/assets/img/the-marq-social-20261123.jpg", width: 1796, height: 842, alt: "The Marq Quận 1" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The MARQ | ERA Vietnam",
    description: "Không gian sống hạng sang từ Hongkong Land tại lõi trung tâm Quận 1.",
    images: ["https://era.com.vn/landing/the-marq/assets/img/the-marq-social-20261123.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function TheMarqPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": ["Residence", "RealEstateListing"], name: "The Marq Quận 1", description: "Không gian sống hạng sang từ Hongkong Land tại lõi trung tâm Quận 1.", url: "https://era.com.vn/du-an-the-marq/", image: "https://era.com.vn/landing/the-marq/assets/img/the-marq-social-20261123.jpg", address: { "@type": "PostalAddress", addressLocality: "Quận 1", addressRegion: "Thành phố Hồ Chí Minh", addressCountry: "VN" }, brand: { "@type": "Brand", name: "Hongkong Land" } };
  return <><style>{`@media (max-width: 767px){body:has(main.the-marq-page) > footer{padding-top:24px}}`}</style><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><main className="the-marq-page w-full bg-white"><TheMarqHeader /><AutoHeightIframe observeContentSize contentBottomSelector=".form-preview" frameId="the-marq-frame" title="The Marq Quận 1" src="/landing/the-marq/index.html?v=20261110-2" /></main></>;
}
