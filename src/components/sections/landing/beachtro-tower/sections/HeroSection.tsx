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
    <section className="hero" aria-label="Giới thiệu Beachtro Tower">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/beachtro-tower-hero-mobile.webp`} />
        <Image
          src={`${IMG}/beachtro-tower-blanca-city-phoi-canh-toa-thap-ben-cong-vien.webp`}
          alt="Phối cảnh Beachtro Tower – Blanca City: tổ hợp tháp căn hộ bên công viên và dãy biệt thự, hướng biển Bãi Sau Vũng Tàu"
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
          <p className="kick">Blanca City · Sun Group</p>
          <h1>
            <span className="a">Beachtro Tower</span>
            <em>Tuyệt phẩm căn hộ biển sở hữu lâu dài cuối cùng tại Blanca City</em>
          </h1>
          <p className="hero-sub">
            Một mặt chạm biển Bãi Sau, một mặt tựa đại lộ 3 Tháng 2, bốn mặt mở ra công viên xanh –
            Vũng Tàu.
          </p>
          <a className="nut hero-nut" href="#dang-ky" onClick={toForm}>
            Nhận bảng tính giá &amp; mặt bằng{" "}
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
