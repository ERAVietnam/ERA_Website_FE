import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { PhuGiaBaoLocLanding } from "@/components/sections/landing/phu-gia-bao-loc";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dự án Phú Gia Bảo Lộc",
  description: "Landing page dự án Phú Gia Bảo Lộc.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PhuGiaBaoLocPage() {
  return (
    <div className={montserrat.variable}>
      <PhuGiaBaoLocLanding />
    </div>
  );
}
