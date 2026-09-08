import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { ForestOnsenLanding } from "@/components/sections/landing/forest-onsen";
import { faqList, projectInfo } from "@/components/sections/landing/forest-onsen/data";
import { faqPageJsonLd, staticRealEstateListingJsonLd } from "@/lib/jsonLd";

const pageUrl = "https://era.com.vn/duan-canho-forest-onsen/";
const pageDescription =
  "Forest Onsen - tổ hợp khoáng nóng Onsen cao tầng đầu tiên Miền Nam, trực diện Hồ Thiên Nga 12ha trong đại đô thị Eco Retreat 220ha. Phát triển bởi Ecopark, cố vấn KTS Tadakatsu Honda, phân phối ERA Vietnam.";
const pageImage =
  "https://era.com.vn/landing/forest-onsen/02_img/canh/forest-onsen-4-thap-view-ho-thien-nga.webp";

export const metadata: Metadata = {
  title: "Forest Onsen - Khoáng nóng Onsen chuẩn Nhật giữa Eco Retreat | Bến Lức, Long An",
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  keywords: [
    "Forest Onsen",
    "Eco Retreat",
    "Onsen chuẩn Nhật",
    "căn hộ Bến Lức",
    "bất động sản Long An",
    "ERA Vietnam",
    "Ecopark",
  ],
  openGraph: {
    title: "Forest Onsen - Mỗi ngày, một kỳ nghỉ dưỡng",
    description:
      "Khoáng nóng Onsen chuẩn Nhật ngay dưới thềm nhà, giữa đại đô thị xanh Eco Retreat 220ha.",
    type: "website",
    images: [
      {
        url: "/landing/forest-onsen/02_img/canh/forest-onsen-4-thap-view-ho-thien-nga.webp",
        alt: "Forest Onsen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forest Onsen - Mỗi ngày, một kỳ nghỉ dưỡng",
    description:
      "Khoáng nóng Onsen chuẩn Nhật ngay dưới thềm nhà, giữa đại đô thị xanh Eco Retreat 220ha.",
    images: ["/landing/forest-onsen/02_img/canh/forest-onsen-4-thap-view-ho-thien-nga.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ForestOnsenPage() {
  return (
    <>
      <JsonLd
        data={staticRealEstateListingJsonLd({
          name: "Forest Onsen Eco Retreat",
          description: pageDescription,
          url: pageUrl,
          image: pageImage,
          address: `${projectInfo.location}, Việt Nam`,
          telephone: projectInfo.phone,
          category: "Căn hộ nghỉ dưỡng wellness",
        })}
      />
      <JsonLd data={faqPageJsonLd(faqList)} />
      <ForestOnsenLanding />
    </>
  );
}
