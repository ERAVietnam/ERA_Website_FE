import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

const comingSoon = [
  {
    image: "/academy/96eea6f6fe868f0a9b527e1defc1fa4f3e1cfa77.webp",
    title: "SIÊU AGENT THỨ CẤP",
    color: colors.primary.DEFAULT,
  },
  {
    image: "/academy/e358269ef687fc8d097a3e5ddb30bd21a22cbddb.webp",
    title: "SIÊU AGENT SƠ CẤP",
    color: colors.primary.navy.DEFAULT,
  },
];

export function AcademyMyEraSection() {
  return (
    <Section padding="md" bg="white">
      <div className="text-center">
        <p className="mb-2 text-xl" style={{ color: colors.primary.navy.DEFAULT }}>
          Sự nghiệp của bạn
        </p>
        <h2 className="text-2xl font-black leading-tight md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
          <span className="md:hidden">
            <span className="block" style={{ color: colors.primary.DEFAULT }}>
              ĐỪNG CHỜ CƠ HỘI
            </span>
            <span className="block">TẠO LỢI THẾ</span>
            <span className="block">NGAY HÔM NAY</span>
          </span>
          <span className="hidden md:inline">
            <span style={{ color: colors.primary.DEFAULT }}>ĐỪNG CHỜ CƠ HỘI</span> - TẠO LỢI THẾ NGAY HÔM NAY
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl items-center gap-8 md:grid-cols-2">
        <div className="relative min-h-[320px] md:min-h-[460px]">
          <Image src="/academy/1dcbfb277bdbf8b44b5169a9976b672c6b035ce7.webp" alt="My ERA Academy" fill className="object-contain" sizes="480px" />
        </div>
        <div>
          <div className="relative h-28 w-full max-w-[420px] md:h-36">
            <Image
              src="/home/aca_era_logo.svg"
              alt="ERA Academy"
              fill
              className="object-contain object-left"
              sizes="420px"
            />
          </div>
          <p className="mt-8 text-2xl font-bold uppercase leading-snug text-academy-red md:text-3xl">
            HỌC MỌI LÚC, GIỎI MỌI NƠI<br />
            ĐỘT PHÁ MỌI RÀO CẢN
          </p>
          <div className="mt-8 max-w-md space-y-4">
            <Button
              asChild
              variant="primary"
              size="lg"
              className="w-full rounded-lg"
              style={{ backgroundColor: "#0B3279" }}
            >
              <Link href="https://app.era.com.vn">TRUY CẬP MY ERA</Link>
            </Button>
            <Button asChild variant="primary" size="lg" className="w-full rounded-lg">
              <Link href="https://app.era.com.vn/register">GIA NHẬP ERA VIETNAM</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h3 className="text-3xl font-black md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
          COMMING <span style={{ color: colors.primary.DEFAULT }}>SOON</span>
        </h3>
        <p className="mt-2 text-sm text-gray-500">Các khóa sắp ra mắt</p>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl gap-8 md:grid-cols-2">
        {comingSoon.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative h-56 overflow-hidden rounded-xl bg-gray-100 md:h-60">
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="420px" />
            </div>
            <h4 className="px-4 pb-2 pt-7 text-center text-2xl font-black leading-tight md:text-3xl" style={{ color: item.color }}>
              {item.title}
            </h4>
          </article>
        ))}
      </div>
    </Section>
  );
}
