"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const stats = [
  { value: "03", label: "VĂN PHÒNG" },
  { value: "2,700+", label: "AGENTS" },
  { value: "150+", label: "DỰ ÁN SƠ CẤP\n& THỨ CẤP" },
];

export default function AboutERAVNHeroSection() {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px]">
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

      {/* Content anchored to bottom — giống APAC, không padding-bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <Container size="lg">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
                ERA VIETNAM
              </h1>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                Kế thừa di sản toàn cầu từ mạng lưới môi giới hàng đầu thế giới, ERA Vietnam là bệ phóng vững chắc
                cho hành trình phát triển sự nghiệp bền vững của bạn
              </p>
            </div>

            {/* Stats — translate-y-1/2: nửa trong hero, nửa ngoài hero */}
            <div className="relative z-10 translate-y-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 md:p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                >
                  <p
                    className="text-2xl md:text-3xl font-extrabold"
                    style={{ color: colors.primary.DEFAULT }}
                  >
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-600 mt-1.5 whitespace-pre-line font-semibold uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
