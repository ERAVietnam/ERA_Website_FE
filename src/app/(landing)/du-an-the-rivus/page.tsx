import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Rivus by ELIE SAAB – Bộ sưu tập dinh thự The Sava | ERA",
  description:
    "Khám phá The Rivus by ELIE SAAB – bộ sưu tập dinh thự The Sava ven sông Đồng Nai, với thiết kế Haute Couture và không gian sống riêng tư.",
  alternates: { canonical: "https://era.com.vn/du-an-the-rivus/" },
  openGraph: {
    title: "The Rivus by ELIE SAAB – Bộ sưu tập dinh thự The Sava",
    description:
      "Bộ sưu tập dinh thự The Sava ven sông Đồng Nai, phát triển bởi Masterise Homes.",
    type: "website",
    url: "https://era.com.vn/du-an-the-rivus/",
    images: [
      {
        url: "/landing/the-rivus/assets/img/og-the-rivus-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "The Rivus by ELIE SAAB – Bộ sưu tập dinh thự The Sava",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function TheRivusPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="The Rivus by ELIE SAAB – Bộ sưu tập dinh thự The Sava"
        src="/landing/the-rivus/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
