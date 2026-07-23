"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";
import { colors, withOpacity } from "@/lib/theme";

export function AcademySection() {
  return (
    <Section padding="lg" bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col order-2 lg:order-1">
            {/* Logo - ERA Academy */}
            <img
              src="/home/aca_era_logo.svg"
              alt="ERA Academy"
              className="h-20 md:h-20 lg:h-24 w-auto mb-6 lg:mb-10 mx-auto lg:ml-0 lg:mr-auto block"
            />

            {/* Description - Mobile: centered, Desktop: left */}
            <p 
              className="mb-6 lg:mb-8 lg:max-w-lg text-center lg:text-left"
              style={{
                color: colors.gray[600],
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: 1.6,
              }}
            >
              ERA Academy là hệ thống đào tạo và phát triển năng lực được thiết kế theo tiêu chuẩn quốc tế. Tại đây, Agent được định hướng đào tạo và trang bị đầy đủ kiến thức, kỹ năng cần thiết để trở thành một chuyên viên tư vấn bất động sản toàn diện.
            </p>

            {/* Mobile Image - shown between description and button */}
            <div
              className="relative lg:hidden mb-6 rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/3' }}
            >
              <Image
                src="/home/home_academy.webp"
                alt="ERA Academy Training"
                fill
                className="object-cover"
                sizes="100vw"
                loading="lazy"
              />
            </div>

            {/* CTA Button - Mobile: full width, Desktop: fit content */}
            <Button asChild variant="primary" size="lg" className="w-full lg:w-fit gap-3 uppercase" style={{ } as React.CSSProperties}>
              <Link href={ROUTES.academy}>
                Xem thông tin chi tiết
                <svg className="hidden lg:block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </Button>
          </div>

          {/* Right Content - Desktop Image only */}
          <div className="relative hidden lg:block order-1 lg:order-2">
            {/* Desktop: Frame with shadow and caption */}
            <div 
              className="relative rounded-xl p-3"
              style={{ 
                backgroundColor: colors.neutral.white,
                boxShadow: `0 20px 50px -12px ${withOpacity(colors.neutral.black, 0.15)}`,
              }}
            >
              {/* Main Image */}
              <div
                className="relative rounded-lg overflow-hidden"
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src="/home/home_academy.webp"
                  alt="ERA Academy Training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Desktop: Caption - positioned outside the frame at bottom left */}
            <div 
              className="absolute -bottom-4 left-[-16] px-5 py-3 rounded-lg"
              style={{
                backgroundColor: colors.primary.navy.DEFAULT,
              }}
            >
              <p 
                className="text-white text-sm"
                style={{
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                Chương trình đào tạo kỹ năng, kiến thức
                <br />
                phong phú, chuyên sâu hàng tuần
              </p>
            </div>
          </div>
        </div>
    </Section>
  );
}
