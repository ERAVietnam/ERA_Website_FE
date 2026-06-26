import type { Metadata } from "next";
import { ForestOnsenLanding } from "@/components/sections/landing/forest-onsen";

export const metadata: Metadata = {
  title: "Forest Onsen - Khoáng nóng Onsen chuẩn Nhật giữa Eco Retreat | Bến Lức, Long An",
  description:
    "Forest Onsen - tổ hợp khoáng nóng Onsen cao tầng đầu tiên Miền Nam, trực diện Hồ Thiên Nga 12ha trong đại đô thị Eco Retreat 220ha. Phát triển bởi Ecopark, cố vấn KTS Tadakatsu Honda, phân phối ERA Vietnam.",
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
        url: "/landing/forest-onsen/02_img/canh/forest-onsen-4-thap-view-ho-thien-nga.jpg",
        alt: "Forest Onsen",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ForestOnsenPage() {
  return <ForestOnsenLanding />;
}
