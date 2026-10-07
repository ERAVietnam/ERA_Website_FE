import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imperia Sensa Park Võ Chí Công – Căn hộ giữa hai dòng sông | ERA",
  description: "Imperia Sensa Park – căn hộ The Sensa giữa hai dòng sông, trên trục Võ Chí Công. Nhận mặt bằng và chính sách mới nhất từ ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-imperia-sensa-park/" },
  openGraph: {
    title: "Imperia Sensa Park Võ Chí Công – Căn hộ giữa hai dòng sông",
    description: "Nhận thông tin dự án Imperia Sensa Park từ ERA Vietnam.",
    type: "website",
    url: "https://era.com.vn/du-an-imperia-sensa-park/",
    images: [{ url: "/landing/imperia-sensa-park/assets/img/og-imperia-sensa-park-1200x630.jpg", width: 1200, height: 630, alt: "Imperia Sensa Park" }],
  },
  twitter: { card: "summary_large_image", title: "Imperia Sensa Park", images: ["/landing/imperia-sensa-park/assets/img/og-imperia-sensa-park-1200x630.jpg"] },
  robots: { index: true, follow: true },
};

export default function ImperiaSensaParkPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe title="Imperia Sensa Park" src="/landing/imperia-sensa-park/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} />
    </main>
  );
}
