import type { Metadata } from "next";
import { MagazinePublicPage } from "@/components/sections/magazines/MagazinePublicPage";

export const metadata: Metadata = {
  title: "E-Magazine ERA Vietnam - Tài liệu và báo cáo BĐS",
  description:
    "Khám phá các ấn phẩm điện tử, báo cáo thị trường và tài liệu chuyên sâu từ ERA Vietnam. Tải miễn phí e-magazine mới nhất.",
  openGraph: {
    title: "E-Magazine ERA Vietnam - Tài liệu và báo cáo BĐS",
    description:
      "Khám phá các ấn phẩm điện tử, báo cáo thị trường và tài liệu chuyên sâu từ ERA Vietnam.",
    type: "website",
  },
};

export default function MagazinePage() {
  return <MagazinePublicPage />;
}
