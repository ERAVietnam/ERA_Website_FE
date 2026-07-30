"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";

const slides = [
  { id: 1, image: "/academy/7ea82947a4bdd06d4bbde0f684dd2269c1d263a7.webp", alt: "ERA Academy banner 1" },
  { id: 2, image: "/academy/7ea82947a4bdd06d4bbde0f684dd2269c1d263a7.webp", alt: "ERA Academy banner 2" },
  { id: 3, image: "/academy/7ea82947a4bdd06d4bbde0f684dd2269c1d263a7.webp", alt: "ERA Academy banner 3" },
  { id: 4, image: "/academy/7ea82947a4bdd06d4bbde0f684dd2269c1d263a7.webp", alt: "ERA Academy banner 4" },
  { id: 5, image: "/academy/7ea82947a4bdd06d4bbde0f684dd2269c1d263a7.webp", alt: "ERA Academy banner 5" },
];

const stats = [
  { value: "30+", label: "KHÓA HỌC\nĐA DẠNG" },
  { value: "2000+", label: "HỌC VIÊN\nTHAM GIA" },
  { value: "90+", label: "HỌC VIÊN HÀI LÒNG\nVỚI CHƯƠNG TRÌNH" },
  { value: "3x", label: "TĂNG TRƯỞNG\nTRUNG BÌNH\nSAU ĐÀO TẠO" },
];

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
      sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 100}vw + ${diff}px))`;
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
      sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 100}vw))`;
    }

    translateXRef.current = 0;
    autoSlideRef.current = setInterval(nextSlide, 7000);
  };

  return (
    <>
      <Section padding="none" bg="white" noContainer>
        <section className="relative h-[52vh] overflow-hidden bg-[#071331] md:hidden">
          <Image
            src={slides[0].image}
            alt={slides[0].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </section>

        <section
          className="relative hidden h-[80vh] cursor-grab overflow-hidden bg-[#071331] active:cursor-grabbing md:block"
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
            className="absolute inset-y-0 left-0 flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${currentSlide * 100}vw))` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="relative h-full flex-shrink-0 overflow-hidden"
                style={{ width: "100vw" }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
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
