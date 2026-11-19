import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trellia Cove Mizuki Park – Căn hộ và nhà phố Nam Long | ERA",
  description:
    "Trellia Cove tại Mizuki Park, Nguyễn Văn Linh, Nam Sài Gòn. Khám phá không gian sống ven sông, tiện ích compound, mặt bằng căn hộ và thông tin từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-trellia-cove/" },
  openGraph: {
    title: "Trellia Cove – Không gian sống ven sông tại Mizuki Park",
    description:
      "Trellia Cove tại Mizuki Park, Nguyễn Văn Linh, Nam Sài Gòn. Khám phá không gian sống ven sông, tiện ích compound, mặt bằng căn hộ và thông tin từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-trellia-cove/",
    images: [
      {
        url: "/landing/trellia-cove/assets/img/og-trellia-cove.jpg",
        width: 1200,
        height: 630,
        alt: "Trellia Cove – phân khu ven sông tại Mizuki Park, Nam Sài Gòn",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TrelliaCovePage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Trellia Cove"
        src="/landing/trellia-cove/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
