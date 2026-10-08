import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Làm Agent ERA – Đăng ký app My ERA | ERA Vietnam",
  description: "Đăng ký app My ERA và bắt đầu hành trình trở thành Agent ERA.",
  alternates: { canonical: "https://era.com.vn/app-era/" },
  openGraph: {
    title: "Làm Agent ERA – Đăng ký app My ERA",
    description: "Đăng ký app My ERA và bắt đầu hành trình trở thành Agent ERA.",
    type: "website",
    url: "https://era.com.vn/app-era/",
    images: [
      {
        url: "/landing/app-era/assets/img/dang-ky-my-era-chia-se.jpg",
        width: 1200,
        height: 630,
        alt: "Đăng ký app My ERA",
      },
    ],
  },
  robots: { index: false, follow: false },
};

export default function AppEraPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <iframe
        title="Đăng ký app My ERA"
        src="/landing/app-era/index.html"
        className="block min-h-screen w-full border-0"
        style={{ height: "100vh" }}
      />
    </main>
  );
}
