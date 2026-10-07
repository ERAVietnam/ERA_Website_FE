"use client";

import Image from "next/image";
import { HERO_FACTS } from "../data";
import { IMG } from "../theme";

export function HeroSection() {
  const toForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" aria-label="Giới thiệu Green Skyline">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/green-skyline-hero-mobile.webp`} />
        <Image
          src={`${IMG}/green-skyline-phoi-canh-4-thap-quoc-lo-1k.webp`}
          alt="Phối cảnh Green Skyline: 4 tháp căn hộ TBS Land bên Quốc lộ 1K, trong khu đô thị Green Square 39 ha lúc bình minh"
          fill
          priority
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          className="object-cover"
        />
      </picture>
      <div className="hero-scrim" aria-hidden="true"></div>
      <div className="hero-in">
        <div className="hero-top">
          <p className="kick">TBS Land · Green Square</p>
          <h1>
            <span className="a">Green Skyline</span>
            <em>Căn hộ “may đo” từ những giá trị thật</em>
          </h1>
          <p className="hero-sub">
            Mặt tiền Quốc lộ 1K, đường GS1 &amp; GS5 – trong khu đô thị Green Square 39 ha, TP. Hồ
            Chí Minh.
          </p>
          <a className="nut vang hero-nut" href="#dang-ky" onClick={toForm}>
            Nhận bảng giá &amp; tham quan căn hộ mẫu{" "}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        <div className="hero-bot">
          <ul className="hero-facts">
            {HERO_FACTS.map((f) => (
              <li key={f.span}>
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
