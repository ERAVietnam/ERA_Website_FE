"use client";

import { useState } from "react";
import Image from "next/image";
import { ACC_SLIDES, AMENITY_FACT, FLOOR_STACK, OPERATING_SERVICES } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const SERVICE_ICONS = [
  // An ninh 6 lớp
  <g key="s1"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6Z" /><path d="m9 12 2 2 4-4" /></g>,
  // Bảo vệ 24/7
  <g key="s2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
  // Lễ tân
  <path key="s3" d="M4 18h16M6 18a6 6 0 0 1 12 0M12 9V7M10 7h4" />,
  // Khu giao nhận hàng
  <path key="s4" d="M3 8 12 3l9 5v8l-9 5-9-5Z" />,
  // 10 trạm sạc xe điện
  <path key="s5" d="M13 2 5 14h6l-1 8 8-12h-6Z" />,
];

export function AmenitiesSection() {
  const [on, setOn] = useState(0);
  const openLightbox = useLightbox();

  return (
    <section className="sec ti" id="tien-ich">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <img className="ky" src={`${IMG}/the-westique-residences-chu-ky-o.svg`} width={59} height={78} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <h2>
              2 tầng tiện ích cho 11 tầng căn hộ{" "}
              <span className="dong2">Không gian retreat riêng của cộng đồng 99 sản phẩm</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">{AMENITY_FACT}</p>
        </Reveal>

        {/* Accordion — hover/tap để mở rộng ảnh; bấm phóng to qua lightbox */}
        <Reveal>
          <div className="acc" id="acc">
            {ACC_SLIDES.map((s, i) => (
              <figure
                key={s.ten}
                className={on === i ? "on" : ""}
                onMouseEnter={() => setOn(i)}
                onClick={() => openLightbox(s.src, s.ten)}
              >
                <Image
                  src={s.src800 ?? s.src}
                  width={s.w}
                  height={s.h}
                  loading="lazy"
                  decoding="async"
                  alt={s.alt}
                />
                <figcaption>
                  <span className="ten">{s.ten}</span>
                  <span className="mo">{s.mo}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <div className="tang">
          <Reveal>
            <ol className="stack" aria-label="Cấu trúc tầng The Westique Residences, từ trên xuống">
              {FLOOR_STACK.map((f) => (
                <li key={f.t} className={f.hl ? "hl" : ""}>
                  <i>{f.t}</i>
                  <div>
                    <b>{f.b}</b>
                    <span>{f.span}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <figure
              className="tang-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/the-westique-residences-so-do-3-tang-tien-ich.webp`,
                  "Sơ đồ 3 tầng tiện ích The Westique Residences"
                )
              }
            >
              <Image
                src={`${IMG}/the-westique-residences-so-do-3-tang-tien-ich-800.webp`}
                width={1400}
                height={702}
                loading="lazy"
                decoding="async"
                alt="Sơ đồ 3 tầng tiện ích The Westique Residences: tầng 1 cổng biểu tượng, tầng 4 hồ bơi, tầng thượng Sky Park"
              />
              <figcaption className="fcap">
                Tầng 1 “Ánh sáng” · Tầng 4 “Suối nước” · Tầng thượng “Hang động” · bấm để phóng to
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <ul className="dv" aria-label="Dịch vụ vận hành">
            {OPERATING_SERVICES.map((t, i) => (
              <li key={t}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {SERVICE_ICONS[i]}
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
