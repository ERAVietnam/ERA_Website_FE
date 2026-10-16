import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Berkley Thảo Điền – 85 căn hộ hoàn thiện cạnh metro An Phú | ERA",
  description:
    "The Berkley Thảo Điền – 85 căn hộ cuối cùng tại trung tâm Thảo Điền, trần cao 3,3 m, đã hoàn thiện và cạnh ga metro An Phú. Khám phá mặt bằng và thông tin dự án cùng ERA Vietnam.",
  alternates: { canonical: "https://era.com.vn/du-an-the-berkley/" },
  openGraph: {
    title: "The Berkley Thảo Điền – 85 căn hộ hoàn thiện cạnh metro An Phú",
    description: "Khám phá The Berkley với 85 căn hộ hoàn thiện tại Thảo Điền, TP. Hồ Chí Minh.",
    type: "website",
    url: "https://era.com.vn/du-an-the-berkley/",
    images: [{ url: "/landing/the-berkley/assets/img/og-the-berkley-1200x630.jpg", width: 1200, height: 630, alt: "The Berkley Thảo Điền" }],
  },
  robots: { index: true, follow: true },
};

export default function TheBerkleyPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe title="The Berkley Thảo Điền" src="/landing/the-berkley/index.html" className="block min-h-screen w-full border-0" style={{ height: "100vh" }} />
    </main>
  );
}
