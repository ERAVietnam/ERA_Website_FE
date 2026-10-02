"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";

const FACTS = [
  { b: "96 căn", span: "Tuyệt tác Grand Villa" },
  { b: "6,6 ha", span: "Diện tích phân khu" },
  { b: "3,2 km", span: "Kênh đào bao quanh" },
];

export function HeroSection() {
  return (
    <section className="hero" aria-label="Giới thiệu Park Village">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/park-village-hero-compound-mobile.webp`} />
        <Image
          src={`${IMG}/park-village-hero-compound-ba-mat-kenh-dao.webp`}
          alt="Phối cảnh Park Village từ trên cao: compound 96 biệt thự Grand Villa ba mặt giáp kênh đào trong khu đô thị Waterpoint"
          width={1600}
          height={698}
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
              Park Village <em>Họa phẩm châu Âu của riêng bạn</em>
            </h1>
            <p className="hero-sub">
              Park Village là compound biệt thự Grand Villa ba mặt giáp kênh đào, ngay trung tâm
              khu đô thị Waterpoint, Bến Lức.
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
