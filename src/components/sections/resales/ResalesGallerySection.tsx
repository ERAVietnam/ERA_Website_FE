"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { rc } from "./palette";
import { Reveal } from "./Reveal";

const GALLERY = [
  { src: "/resale/0992014297d91e6635f5e1cceff7380586aeecbc.webp", alt: "Toàn thể ERA Vietnam tại sự kiện VNBC", w: 2048, h: 1365 },
  { src: "/resale/75dcbe43aaf523c873d1d1ed206f035ec904b7d7.webp", alt: "Văn phòng ERA Vietnam", w: 2000, h: 1500 },
  { src: "/resale/fac080afdc07323d29cefc885bb1eb7e113f2713.webp", alt: "ERA VNBC 2025 - Vinh danh thành tích", w: 2048, h: 1085 },
  { src: "/resale/fde10684caa6e931310178f93fef82fcf5c04ce0.webp", alt: "ERA Academy - Lễ khai giảng", w: 2048, h: 1365 },
];

/* Section: gallery môi trường làm việc — đang để placeholder ảnh,
   phần chọn/chỉnh ảnh thật sẽ làm ở đợt chỉnh chi tiết */
export function ResalesGallerySection() {
  return (
    <Section bg="white" padding="none" className="py-10 md:py-14">
      <Reveal>
      <div className="text-base font-extrabold tracking-[0.16em]" style={{ color: colors.primary.DEFAULT }}>
        #TEAMERA
      </div>
      <h2
        className="mt-3 font-black"
        style={{
          color: rc.navy,
          fontSize: "clamp(22px, 3vw, 38px)",
          lineHeight: 1.25,
        }}
      >
        MÔI TRƯỜNG LÀM VIỆC TẠI
        <br />
        <span style={{ color: colors.primary.DEFAULT }}>ERA VIETNAM</span>
      </h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {GALLERY.map((g) => (
          <div key={g.src} className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>      </Reveal>

    </Section>
  );
}
