import type { Metadata } from "next";
import { NewsPage } from "@/components/sections/news";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tin tức ERA Vietnam - Cập nhật thị trường BĐS và hoạt động nội bộ",
  description:
    "Cập nhật tin tức thị trường, thông tin dự án bất động sản mới nhất và các hoạt động nội bộ từ ERA Vietnam. Tải miễn phí tài liệu eBook và báo cáo chuyên sâu được chọn lọc uy tín.",
  openGraph: {
    title: "Tin tức ERA Vietnam - Cập nhật thị trường BĐS và hoạt động nội bộ",
    description:
      "Cập nhật tin tức thị trường, thông tin dự án bất động sản mới nhất và các hoạt động nội bộ từ ERA Vietnam. Tải miễn phí tài liệu eBook và báo cáo chuyên sâu được chọn lọc uy tín.",
    type: "website",
    images: [
      {
        url: "/news/news_banner.webp",
        alt: "ERA INSIGHTS",
      },
    ],
  },
};

export default async function News() {
  return <NewsPage />;
}
