"use client";

import Image from "next/image";
import { IMG } from "../theme";

const FACTS = [
  { b: "4 tháp", span: "36 tầng nổi" },
  { b: "620", span: "Căn hộ" },
  { b: "3 mặt", span: "Giáp sông" },
];

export function HeroSection() {
  return (
    <section className="hero" aria-label="Giới thiệu Palm River">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/palm-river-hero-mobile.webp`} />
        <Image
          src={`${IMG}/palm-river-hero-4-thap-ven-song.webp`}
          alt="Phối cảnh Palm River: 4 tòa tháp 36 tầng bên sông Giồng Ông Tố, khu đô thị Nam Rạch Chiếc, phường Bình Trưng"
          fill
          priority
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "56% 42%" }}
        />
      </picture>
      <div className="hero-scrim" aria-hidden="true"></div>
      <div className="hero-in">
        <div className="hero-box">
          <h1>
            Palm River{" "}
            <em>Nơi kết nối đô thị, thiên nhiên và hệ sinh thái nghỉ dưỡng hội tụ trong một chuẩn sống mới</em>
          </h1>
          <ul className="hero-facts">
            {FACTS.map((f) => (
              <li key={f.b}>
                <b>{f.b}</b>
                <span>{f.span}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
