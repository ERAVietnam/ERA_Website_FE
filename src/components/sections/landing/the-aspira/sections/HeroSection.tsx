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
    <section className="hero" aria-label="Giới thiệu The Aspira">
      <picture>
        <source media="(max-width:760px)" srcSet={`${IMG}/the-aspira-hero-mobile.webp`} />
        <Image
          src={`${IMG}/the-aspira-hero-phoi-canh-2-thap-tan-dong-hiep.webp`}
          alt="Phối cảnh The Aspira lúc hoàng hôn: 2 tháp 30 tầng bên đường Nguyễn Thị Minh Khai, phường Tân Đông Hiệp, TP.HCM"
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
          <p className="kick">Tân Đông Hiệp · TP.HCM</p>
          <h1>
            <span className="a">The Aspira</span>
            <em>
              Sống năng lượng – <b>Chọn The Aspira</b>
            </em>
          </h1>
          <p className="hero-sub">
            Căn hộ 2 tháp 30 tầng trên đường Nguyễn Thị Minh Khai, phường Tân Đông Hiệp, TP.HCM –
            gần các ga quy hoạch của tuyến Metro số 1 kéo dài.
          </p>
          <a className="nut" href="#dang-ky" onClick={toForm}>
            Đăng ký nhận báo giá{" "}
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
