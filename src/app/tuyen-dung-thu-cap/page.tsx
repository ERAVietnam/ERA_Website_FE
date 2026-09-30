import type { Metadata } from "next";
import { ResalesPage } from "@/components/sections/resales";

export const metadata: Metadata = {
  title: "Workshop Bản Đồ Sự Nghiệp Môi Giới | Tuyển Dụng Thứ Cấp ERA Vietnam",
  description:
    "Quy định đã siết, môi giới tự do sẽ đi về đâu? Tham dự workshop miễn phí của ERA Vietnam: 09:00 Thứ 7 ngày 24/10/2026, văn phòng ERA Vietnam, 300 chỗ giới hạn. Đăng ký tư vấn gia nhập đội ngũ môi giới thứ cấp.",
  openGraph: {
    title: "Workshop Bản Đồ Sự Nghiệp Môi Giới | Tuyển Dụng Thứ Cấp ERA Vietnam",
    description:
      "Quy định đã siết, môi giới tự do sẽ đi về đâu? Workshop miễn phí 09:00 Thứ 7 ngày 24/10/2026 — 300 chỗ giới hạn. Đăng ký ngay!",
    type: "website",
  },
};

export default function TuyenDungThuCap() {
  return <ResalesPage />;
}
