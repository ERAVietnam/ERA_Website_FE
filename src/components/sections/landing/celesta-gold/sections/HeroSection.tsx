"use client";

import Image from "next/image";
import { HERO_FACTS } from "../data";
import { IMG } from "../theme";

export function HeroSection() {
  return (
    <section className="hero" aria-label="Giới thiệu Celesta Gold">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/celesta-gold-hero-mobile.webp`} />
        <Image
          src={`${IMG}/celesta-gold-hero-2-thap-can-ho-nguyen-huu-tho-nha-be.webp`}
          alt="Phối cảnh Celesta Gold: 2 tháp căn hộ 25 tầng trên khối đế thương mại, mặt tiền đại lộ Nguyễn Hữu Thọ, Nhà Bè"
          fill
          priority
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "60% 40%" }}
        />
      </picture>
      <div className="hero-scrim" aria-hidden="true"></div>
      <div className="hero-in">
        <div className="hero-top">
          <h1>
            Celesta Gold <em>Chuẩn sống xanh Singapore trên trục Nguyễn Hữu Thọ</em>
          </h1>
          <p className="hero-sub">
            Phân khu căn hộ cao cấp tiếp theo của khu đô thị Celesta, do liên danh Keppel
            (Singapore), Phú Long (Việt Nam) và Nomura Real Estate Vietnam (Nhật Bản) phát triển.
          </p>
          <span className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
              <path d="M5 19c3-4 6-7 10-9" />
            </svg>
            Theo đuổi chứng nhận BCA Green Mark Gold
          </span>
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
