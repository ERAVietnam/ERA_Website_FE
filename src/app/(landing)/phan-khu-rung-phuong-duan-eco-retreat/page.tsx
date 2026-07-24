import type { Metadata } from "next";
import { EcoRetreatLanding } from "@/components/sections/landing/eco-retreat";

export const metadata: Metadata = {
  title: "Rừng Phượng Eco Retreat – Nhà phố & biệt thự cạnh trường Edison, Long An | ERA Vietnam",
  description:
    "Rừng Phượng – tiểu khu 325 căn nhà phố, shophouse & biệt thự trong đại đô thị Eco Retreat (Long An, giáp Nam TP.HCM), cạnh trường liên cấp Edison. Nhận bảng giá & mặt bằng đợt mới nhất.",
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
        url: "/landing/eco-retreat/02_img/hero-rung-phuong.jpg",
        alt: "Rừng Phượng Eco Retreat",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EcoRetreatPage() {
  return <EcoRetreatLanding />;
}
