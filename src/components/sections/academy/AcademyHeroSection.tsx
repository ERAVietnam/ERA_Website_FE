"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";

const slides = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

const stats = [
  { value: "30+", label: "KHÓA HỌC\nĐA DẠNG" },
  { value: "2000+", label: "HỌC VIÊN\nTHAM GIA" },
  { value: "90+", label: "HỌC VIÊN HÀI LÒNG\nVỚI CHƯƠNG TRÌNH" },
  { value: "3x", label: "TĂNG TRƯỞNG\nTRUNG BÌNH\nSAU ĐÀO TẠO" },
];

function AcademyBanner({ priority = false }: { priority?: boolean }) {
  return (
    // Desktop coordinates follow the original 1920 × 600 canvas; mobile uses normal flow.
    <div className="relative isolate grid grid-cols-[min(100%,480px)] justify-center justify-items-center gap-6 bg-[#17115b] px-4 pb-20 pt-20 md:aspect-[16/5] md:block md:p-0">
      <Image
        src="/academy/hero-background.webp"
        alt=""
        fill
        className="-z-10 object-cover"
        sizes="100vw"
        priority={priority}
      />
      <Image
        src="/academy/hero-people.webp"
        alt="Đội ngũ ERA ứng dụng công nghệ và kiến thức trong đào tạo bất động sản"
        width={858}
        height={600}
        className="block h-auto w-full max-w-[480px] md:absolute md:left-[22.864583%] md:top-0 md:w-[44.6875%] md:max-w-none"
        sizes="(min-width: 768px) 45vw, (min-width: 512px) 480px, calc(100vw - 32px)"
        priority={priority}
      />
      <Image
        src="/academy/hero-logo.png"
        alt="ERA Academy"
        width={701}
        height={208}
        className="relative z-10 -mt-20 h-auto w-[76%] max-w-[320px] justify-self-start md:absolute md:left-[0.729167%] md:top-[55.333333%] md:mt-0 md:w-[36.510417%] md:max-w-none md:justify-self-auto"
        sizes="(min-width: 768px) 37vw, 76vw"
        priority={priority}
      />
      <h1 className="relative z-10 w-full max-w-[480px] md:absolute md:left-[55.989583%] md:top-[28.333333%] md:w-[42.760417%] md:max-w-none">
        <picture>
          <source media="(min-width: 768px)" srcSet="/academy/hero-heading-desktop.png" width={821} height={369} />
          <Image
            src="/academy/hero-heading.webp"
            alt="Hệ thống đào tạo nội bộ. Phát triển năng lực toàn diện. Học mọi lúc – Giỏi mọi nơi – Đột phá mọi rào cản."
            width={821}
            height={369}
            className="block h-auto w-full"
            sizes="(min-width: 768px) 43vw, (min-width: 512px) 480px, calc(100vw - 32px)"
          />
        </picture>
      </h1>
    </div>
  );
}

export function AcademyHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const translateXRef = useRef(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    autoSlideRef.current = setInterval(nextSlide, 7000);
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [nextSlide]);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    translateXRef.current = 0;
    sliderRef.current?.classList.remove("transition-transform");
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    translateXRef.current = diff;
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 100}% + ${diff}px))`;
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (translateXRef.current > 50) {
      prevSlide();
    } else if (translateXRef.current < -50) {
      nextSlide();
    } else if (sliderRef.current) {
      sliderRef.current.classList.add("transition-transform");
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    translateXRef.current = 0;
    autoSlideRef.current = setInterval(nextSlide, 7000);
  };

  return (
    <>
      <Section id="academy-hero" padding="none" bg="white" noContainer>
        <section className="relative bg-[#071331] md:hidden">
          <AcademyBanner priority />
        </section>

        <section
          className="relative hidden aspect-[16/5] cursor-grab overflow-hidden bg-[#071331] active:cursor-grabbing md:block"
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => {
            e.preventDefault();
            handleStart(e.clientX);
          }}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={() => {
            if (isDragging) handleEnd();
          }}
        >
          <div
            ref={sliderRef}
            className="absolute inset-0 flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="relative h-full w-full flex-shrink-0"
                aria-hidden={index !== currentSlide}
              >
                <AcademyBanner priority={index === 0} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-[5.333333%] left-1/2 z-20 flex -translate-x-1/2 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: index === currentSlide ? "40px" : "24px",
                  backgroundColor: index === currentSlide
                    ? colors.neutral.white
                    : `${colors.neutral.white}66`,
                }}
                aria-label={`Đi đến banner ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </Section>

      <Section padding="none" bg="gray" className="pb-0 pt-0 md:pt-12">
        <div className="relative z-10 -mt-16 mb-[-56px] grid grid-cols-2 gap-4 md:mt-0 md:mb-[-64px] md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl bg-white px-4 py-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="text-4xl font-black text-academy-red md:text-5xl">{stat.value}</div>
              <div className="mt-3 whitespace-pre-line text-xs font-black leading-tight tracking-wide text-[#070A3D]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
