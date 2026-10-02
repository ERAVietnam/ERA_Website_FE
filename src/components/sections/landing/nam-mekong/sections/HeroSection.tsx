"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";

const FACTS = [
  { b: "1.622", span: "Căn hộ" },
  { b: "2 tháp", span: "30 tầng nổi" },
  { b: "50+", span: "Tiện ích nội khu" },
];

/* Hero dùng ảnh dọc riêng cho mobile (theo mẫu <picture>) */
export function HeroSection() {
  return (
    <section className="hero" aria-label="Giới thiệu Nam Mekong Grand Plaza">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/nam-mekong-grand-plaza-hero-mobile.webp`} />
        <Image
          src={`${IMG}/nam-mekong-grand-plaza-hero-vong-xoay-wtc.webp`}
          alt="Phối cảnh Nam Mekong Grand Plaza: hai tháp 30 tầng bên vòng xoay WTC và nhà ga metro trung tâm, Thành phố mới Bình Dương"
          width={1600}
          height={900}
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </picture>
      <div className="hero-scrim" aria-hidden="true"></div>
      <div className="hero-in" style={{ paddingLeft: "clamp(68px, 11vw, 192px)" }}>
        <Reveal>
          <div className="hero-box">
            <h1>
              Nam Mekong Grand Plaza{" "}
              <em>Tiên phong đánh thức dòng chảy tiềm năng ẩn sâu trong lòng đô thị</em>
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
        </Reveal>
      </div>
    </section>
  );
}
