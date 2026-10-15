import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { ResalesPage } from "@/components/sections/resales";

const pageUrl = "https://era.com.vn/thu-cap-era/";
const pageTitle = "Workshop Bản Đồ Sự Nghiệp Môi Giới | Tuyển dụng thứ cấp ERA Vietnam";
const pageDescription = "Tham dự workshop miễn phí của ERA Vietnam dành cho môi giới bất động sản thứ cấp: cập nhật quy định, định hướng nghề nghiệp và cơ hội gia nhập đội ngũ môi giới thứ cấp.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: { title: pageTitle, description: pageDescription, type: "website", url: pageUrl, images: [{ url: "/resale/og-tuyen-dung-thu-cap.jpg", width: 1200, height: 630, alt: pageTitle }] },
  twitter: { card: "summary_large_image", title: pageTitle, description: pageDescription, images: ["/resale/og-tuyen-dung-thu-cap.jpg"] },
};

export default function ThuCapEraPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Event",
        name: pageTitle,
        description: pageDescription,
        startDate: "2026-10-24T09:00:00+07:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: "Văn phòng ERA Vietnam", address: { "@type": "PostalAddress", streetAddress: "Số 22 - 24, Đường số 5, KĐT Sala", addressLocality: "Phường An Khánh", addressRegion: "TP. Hồ Chí Minh", addressCountry: "VN" } },
        organizer: { "@type": "Organization", name: "ERA Vietnam", url: "https://era.com.vn/" },
        image: ["https://era.com.vn/resale/og-tuyen-dung-thu-cap.jpg"],
        url: pageUrl,
      }} />
      <ResalesPage />
    </>
  );
}
