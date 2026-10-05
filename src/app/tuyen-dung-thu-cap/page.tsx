import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { ResalesPage } from "@/components/sections/resales";

export const metadata: Metadata = {
  title: "Workshop Bản Đồ Sự Nghiệp Môi Giới | Tuyển Dụng Thứ Cấp ERA Vietnam",
  description:
    "Quy định đã siết, môi giới tự do sẽ đi về đâu? Tham dự workshop miễn phí của ERA Vietnam: 09:00 Thứ 7 ngày 24/10/2026, văn phòng ERA Vietnam, 300 chỗ giới hạn. Đăng ký tư vấn gia nhập đội ngũ môi giới thứ cấp.",
  alternates: {
    canonical: "https://era.com.vn/tuyen-dung-thu-cap/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Workshop Bản Đồ Sự Nghiệp Môi Giới | Tuyển Dụng Thứ Cấp ERA Vietnam",
    description:
      "Quy định đã siết, môi giới tự do sẽ đi về đâu? Workshop miễn phí 09:00 Thứ 7 ngày 24/10/2026 — 300 chỗ giới hạn. Đăng ký ngay!",
    type: "website",
    url: "https://era.com.vn/tuyen-dung-thu-cap/",
    images: [
      {
        url: "/resale/og-tuyen-dung-thu-cap.jpg",
        width: 1200,
        height: 630,
        alt: "Workshop Bản Đồ Sự Nghiệp Môi Giới — Tuyển dụng thứ cấp ERA Vietnam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workshop Bản Đồ Sự Nghiệp Môi Giới | Tuyển Dụng Thứ Cấp ERA Vietnam",
    description:
      "Workshop miễn phí 09:00 Thứ 7 ngày 24/10/2026 — 300 chỗ giới hạn. Đăng ký ngay!",
    images: ["/resale/og-tuyen-dung-thu-cap.jpg"],
  },
};

export default function TuyenDungThuCap() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Workshop Bản Đồ Sự Nghiệp Môi Giới — Tuyển Dụng Thứ Cấp ERA Vietnam",
          description:
            "Workshop miễn phí dành cho môi giới bất động sản: quy định đã siết, môi giới tự do sẽ đi về đâu? 300 chỗ giới hạn.",
          startDate: "2026-10-24T09:00:00+07:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Văn phòng ERA Vietnam",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Số 22 - 24, Đường số 5, KĐT Sala",
              addressLocality: "Phường An Khánh",
              addressRegion: "TP. Hồ Chí Minh",
              addressCountry: "VN",
            },
          },
          organizer: {
            "@type": "Organization",
            name: "ERA Vietnam",
            url: "https://era.com.vn/",
          },
          image: ["https://era.com.vn/resale/og-tuyen-dung-thu-cap.jpg"],
          url: "https://era.com.vn/tuyen-dung-thu-cap/",
        }}
      />
      <ResalesPage />
    </>
  );
}
