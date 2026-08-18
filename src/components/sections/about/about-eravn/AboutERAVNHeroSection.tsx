"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const stats = [
  { value: "03", label: "VĂN PHÒNG" },
  { value: "2,700+", label: "AGENTS" },
  { value: "150+", label: "DỰ ÁN SƠ CẤP\n& THỨ CẤP" },
];

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.15)] h-full flex flex-col justify-center">
      <p
        className="text-2xl md:text-3xl font-extrabold"
        style={{ color: colors.primary.DEFAULT }}
      >
        {value}
      </p>
      <p className="text-xs text-gray-600 mt-1.5 whitespace-pre-line font-semibold uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function AboutERAVNHeroSection() {
  return (
    <>
      <section className="relative min-h-[400px] md:min-h-[500px] overflow-visible flex items-end">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/contact/contact_hero_banner.webp"
            alt="ERA Vietnam"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 100%)`,
          }}
        />

        <Container size="lg" className="relative z-10 w-full pb-0">
          {/* Title + description — desktop */}
          <div className="hidden md:block pb-4">
            <div className="flex flex-col gap-3 text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
                ERA VIETNAM
              </h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                Kế thừa di sản toàn cầu từ mạng lưới môi giới hàng đầu thế giới,
                ERA Vietnam là bệ phóng vững chắc cho hành trình phát triển sự
                nghiệp bền vững của bạn
              </p>
            </div>
          </div>

          {/* Title — mobile only */}
          <div className="md:hidden pb-0 text-center">
            <h1 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
              ERA VIETNAM
            </h1>
          </div>

          {/* Stats — mobile: card 1 half in/half out */}
          <div className="md:hidden translate-y-1/2">
            <StatCard value={stats[0].value} label={stats[0].label} />
          </div>

          {/* Stats — desktop: 1 row 3 cols */}
          <div className="hidden md:grid grid-cols-3 gap-4 translate-y-1/2 relative z-10">
            {stats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* Stats — mobile: cards 2 & 3 fully outside hero */}
      <div className="md:hidden bg-white pt-16 pb-8">
        <Container size="lg">
          <div className="grid grid-cols-1 gap-4 auto-rows-[1fr]">
            {stats.slice(1, 3).map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
