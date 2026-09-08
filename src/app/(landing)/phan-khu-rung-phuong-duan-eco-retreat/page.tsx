import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { EcoRetreatLanding } from "@/components/sections/landing/eco-retreat";
import { faqItems, projectInfo } from "@/components/sections/landing/eco-retreat/data";
import { faqPageJsonLd, staticRealEstateListingJsonLd } from "@/lib/jsonLd";

const pageUrl = "https://era.com.vn/phan-khu-rung-phuong-duan-eco-retreat/";
const pageDescription =
  "Rừng Phượng – tiểu khu 325 căn nhà phố, shophouse & biệt thự trong đại đô thị Eco Retreat (Long An, giáp Nam TP.HCM), cạnh trường liên cấp Edison. Nhận bảng giá & mặt bằng đợt mới nhất.";
const pageImage = "https://era.com.vn/landing/eco-retreat/02_img/hero-rung-phuong.webp";

export const metadata: Metadata = {
  title: "Rừng Phượng Eco Retreat – Nhà phố & biệt thự cạnh trường Edison, Long An | ERA Vietnam",
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  keywords: [
    "nhà phố Rừng Phượng",
    "biệt thự Rừng Phượng",
    "phân khu Rừng Phượng",
    "dự án Eco Retreat",
    "Eco Retreat Long An",
    "nhà phố Eco Retreat",
    "shophouse Eco Retreat",
    "ERA Vietnam",
  ],
  openGraph: {
    title: "Rừng Phượng Eco Retreat – Nhà phố & biệt thự cạnh trường Edison, Long An",
    description:
      "Tiểu khu 325 căn nhà phố, shophouse & biệt thự trong đại đô thị Eco Retreat, cạnh trường liên cấp Edison. Nhận bảng giá & mặt bằng.",
    type: "website",
    images: [
      {
        url: "/landing/eco-retreat/02_img/hero-rung-phuong.webp",
        alt: "Rừng Phượng Eco Retreat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rừng Phượng Eco Retreat – Nhà phố & biệt thự cạnh trường Edison, Long An",
    description:
      "Tiểu khu 325 căn nhà phố, shophouse & biệt thự trong đại đô thị Eco Retreat, cạnh trường liên cấp Edison. Nhận bảng giá & mặt bằng.",
    images: ["/landing/eco-retreat/02_img/hero-rung-phuong.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EcoRetreatPage() {
  return (
    <>
      <JsonLd
        data={staticRealEstateListingJsonLd({
          name: "Rừng Phượng Eco Retreat",
          description: pageDescription,
          url: pageUrl,
          image: pageImage,
          address: "Eco Retreat, Long An, Việt Nam",
          telephone: projectInfo.phone,
          category: "Nhà phố, shophouse và biệt thự",
        })}
      />
      <JsonLd data={faqPageJsonLd(faqItems)} />
      <EcoRetreatLanding />
    </>
  );
}
