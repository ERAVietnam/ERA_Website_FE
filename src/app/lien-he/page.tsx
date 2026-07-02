import type { Metadata } from "next";
import {
  ContactHeroSection,
  ContactCardsSection,
  ContactOfficesSection,
  ContactFormSection,
} from "@/components/sections/contact";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/jsonLd";
import { mainOffices } from "@/lib/offices";

export const metadata: Metadata = {
  title: "Liên hệ ERA Vietnam - Tư vấn bất động sản chuyên nghiệp",
  description:
    "Kết nối với ERA Vietnam - Thương hiệu môi giới BĐS quốc tế. Chúng tôi sẵn sàng hỗ trợ tư vấn dự án, ký gửi nhà đất và giải đáp thông tin tuyển dụng. Gọi ngay hotline 1800 6701!",
  keywords: ["ERA Vietnam", "liên hệ ERA", "tư vấn BĐS", "hotline ERA"],
  openGraph: {
    title: "Liên hệ ERA Vietnam - Tư vấn bất động sản chuyên nghiệp",
    description:
      "Kết nối với ERA Vietnam - Thương hiệu môi giới BĐS quốc tế. Chúng tôi sẵn sàng hỗ trợ tư vấn dự án, ký gửi nhà đất và giải đáp thông tin tuyển dụng. Gọi ngay hotline 1800 6701!",
    type: "website",
    images: [
      {
        url: "/contact/contact_hero_banner.webp",
        alt: "Contact ERA Vietnam",
      },
    ],
  },
};

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Trang chủ", url: "https://era.com.vn/" },
    { name: "Liên hệ", url: "https://era.com.vn/lien-he/" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      {mainOffices.map((office) => (
        <JsonLd key={office.id} data={localBusinessJsonLd(office)} />
      ))}
      <main>
        <ContactHeroSection />
        <ContactCardsSection />
        <ContactOfficesSection />
        <ContactFormSection />
      </main>
    </>
  );
}
