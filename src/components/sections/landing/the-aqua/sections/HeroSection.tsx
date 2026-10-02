"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";

const FACTS = [
  { b: "8,6 ha", span: "Vịnh Cảng nước ngọt" },
  { b: "3,5 ha", span: "Công viên ven sông" },
  { b: "4 dòng", span: "Grand Villa" },
];

export function HeroSection() {
  return (
    <section className="hero" aria-label="Giới thiệu The Aqua">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/the-aqua-hero-mobile.webp`} />
        <Image
          src={`${IMG}/the-aqua-hero-biet-thu-ben-vinh-cang.webp`}
          alt="Phối cảnh The Aqua từ trên cao: dãy biệt thự, công viên ven sông và bến thuyền bên Vịnh Cảng nước ngọt, Waterpoint"
          width={1600}
          height={900}
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </picture>
      <div className="hero-scrim" aria-hidden="true"></div>
      <div className="hero-in" style={{ paddingLeft: "clamp(80px, 12vw, 216px)" }}>
        <Reveal>
          <div className="hero-box">
            <h1>
              The Aqua <em>Chất riêng bên Vịnh Cảng</em>
            </h1>
            <p className="hero-sub">
              The Aqua là compound biệt thự biệt lập thuộc phân khu Aquaria, trải dài bên Vịnh Cảng
              nước ngọt trong khu đô thị Waterpoint, Bến Lức.
            </p>
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
