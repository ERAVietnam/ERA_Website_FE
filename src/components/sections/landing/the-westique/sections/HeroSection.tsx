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
    <section className="hero" aria-label="Giới thiệu The Westique Residences">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/the-westique-residences-hero-mobile.webp`} />
        <Image
          src={`${IMG}/the-westique-residences-hero-thap-can-ho-boutique-kinh-duong-vuong.webp`}
          alt="Phối cảnh The Westique Residences lúc hoàng hôn: tháp căn hộ boutique 15 tầng trên Kinh Dương Vương, phường An Lạc"
          fill
          priority
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "30% 50%" }}
        />
      </picture>
      <div className="hero-scrim" aria-hidden="true"></div>
      <div className="hero-in">
        <div className="hero-top">
          <h1>
            <span className="a">The Westique</span>
            <span className="b">Residences</span>
            <em>Chất boutique nơi tâm điểm khu Tây</em>
          </h1>
          <p className="hero-sub">
            99 sản phẩm tinh tuyển của VCRE tại 289 Kinh Dương Vương, phường An Lạc – kế bên 2 ga
            tương lai của tuyến Metro số 3A.
          </p>
          <a className="nut hero-nut" href="#dang-ky" onClick={toForm}>
            Nhận bảng giá &amp; mặt bằng{" "}
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
          <div className="hero-badge-wrap">
            <span className="hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="9" r="6" />
                <path d="m8.5 13.8-1.5 7.2 5-2.6 5 2.6-1.5-7.2" />
              </svg>
              2 giải Asia Pacific Property Awards 2026–2027
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
