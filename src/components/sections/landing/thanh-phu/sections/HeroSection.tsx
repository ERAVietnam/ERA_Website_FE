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
    <section className="hero" aria-label="Giới thiệu Thanh Phú Centre Point">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/thanh-phu-centre-point-hero-mobile.webp`} />
        <Image
          src={`${IMG}/thanh-phu-centre-point-hero-phoi-canh-tong-the-ben-luc.webp`}
          alt="Phối cảnh tổng thể Thanh Phú Centre Point: khu đô thị thấp tầng, hồ trung tâm và Mega Mall bên đường Nguyễn Hữu Trí, Bến Lức"
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
          <p className="kick">BIM Land · Miền Thương Phú</p>
          <h1>
            <span className="a">Thanh Phú</span>
            <span className="b">Centre Point</span>
            <em>Tâm điểm giao thương cửa ngõ Tây TP.HCM</em>
          </h1>
          <p className="hero-sub">
            Khu đô thị sinh thái – thương mại thấp tầng mặt tiền Nguyễn Hữu Trí và ĐT.830C, xã Bến
            Lức, tỉnh Tây Ninh.
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
        </div>
      </div>
    </section>
  );
}
