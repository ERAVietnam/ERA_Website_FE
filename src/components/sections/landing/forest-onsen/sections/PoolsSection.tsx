"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { c } from "../theme";

export function PoolsSection() {
  const pools = [
    { img: "/landing/forest-onsen/02_img/onsen/forest-onsen-be-onsen-ngoai-troi.webp", alt: "Bể Onsen ngoài trởi" },
    { img: "/landing/forest-onsen/02_img/onsen/forest-onsen-be-onsen-trong-nha.webp", alt: "Bể Onsen trong nhà" },
    { img: "/landing/forest-onsen/02_img/onsen/forest-onsen-be-suc-jacuzzi.webp", alt: "Bể sục Jacuzzi" },
    { img: "/landing/forest-onsen/02_img/onsen/forest-onsen-onsen-khu-tam-trang.webp", alt: "Khu tắm tráng Kakeyu" },
    { img: "/landing/forest-onsen/02_img/onsen/forest-onsen-be-ngam-chan.webp", alt: "Bể ngâm chân" },
    { img: "/landing/forest-onsen/02_img/onsen/forest-onsen-be-tam-chum.webp", alt: "Bể tắm chum" },
    { img: "/landing/forest-onsen/02_img/onsen/forest-onsen-be-tam-ngu-gat.webp", alt: "Bể tắm ngủ gật" },
    { img: "/landing/forest-onsen/02_img/onsen/forest-onsen-be-lanh.webp", alt: "Bể lạnh trị liệu" },
  ];
  return (
    <section id="kham-pha-onsen" className="py-16 md:py-28 bg-white">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="text-center max-w-[660px] mx-auto mb-12">
          <div className="text-xs font-medium tracking-[2.5px] uppercase" style={{ color: c.greenSoft }}>
            Bên trong tổ hợp Onsen
          </div>
          <div className="w-[46px] h-px mx-auto mt-5 mb-5" style={{ background: c.gold }} />
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,44px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Tám trải nghiệm khoáng nóng chuẩn Nhật.
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: c.inkSoft }}>
            Mỗi bể một công năng trị liệu riêng - từ Kakeyu tắm tráng, bể Onsen
            ngoài trởi, tới bể sục, bể ngâm chân, bể tắm chum.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pools.map((p) => (
            <div
              key={p.alt}
              className="relative rounded-2xl overflow-hidden aspect-square group"
              style={{ boxShadow: "0 16px 40px -26px rgba(39,68,52,.45)" }}
            >
              <Image
                src={p.img}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.07]"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(28,40,32,0) 55%,rgba(28,40,32,.25))",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Lookbook ─── */
