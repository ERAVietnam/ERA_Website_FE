"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ChevronLeft, ChevronRight } from "lucide-react";

const activityImages = [
  "/academy/985925bac5e00bd13350a5dfa95f0210167e31c8.webp",
  "/academy/f2e95d3ee9547d79ed49d882343a65773056796f.webp",
  "/academy/493f656c5855be30ee01d5dbab9165c0d92bbc98.webp",
  "/academy/f9caffdd2a8780e1a41ae1238aa7ab6f7f243705.webp",
  "/academy/e88127e1cd44b5ef4cd683a59f6a10e06970cfc2.webp",
];

export function AcademyActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + activityImages.length) % activityImages.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % activityImages.length);
  };

  return (
    <Section padding="md" bg="gray">
      <h2 className="mb-8 text-center text-3xl font-black leading-tight md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
        CÁC HOẠT ĐỘNG <span style={{ color: colors.primary.DEFAULT }}>NỔI BẬT</span>
      </h2>

      <div className="mx-auto max-w-4xl">
        <div className="relative h-[260px] overflow-hidden rounded-2xl bg-gray-100 shadow-[0_8px_24px_rgba(15,23,42,0.15)] ring-4 ring-white md:h-[420px]">
          <Image
            key={activityImages[activeIndex]}
            src={activityImages[activeIndex]}
            alt={`Hoạt động ERA Academy ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="900px"
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#D4112D] shadow transition hover:scale-105"
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-4 overflow-x-auto px-2 py-2">
            {activityImages.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setActiveIndex(index)}
                className={`relative mx-1 h-14 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 shadow transition duration-300 ${
                  index === activeIndex ? "scale-110 ring-2 ring-[#D4112D]" : "opacity-55 hover:opacity-80"
                }`}
                aria-label={`Xem hoạt động ${index + 1}`}
              >
                <Image src={image} alt={`Hoạt động ${index + 1}`} fill className="object-cover" sizes="96px" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#D4112D] shadow transition hover:scale-105"
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
}
