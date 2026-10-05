"use client";

import { useState } from "react";
import Image from "next/image";
import { ACC_SLIDES, AMENITY_DAILY, AMENITY_SPOTLIGHT } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function AmenitiesSection() {
  const [on, setOn] = useState(0);
  const openLightbox = useLightbox();

  return (
    <section className="sec ti" id="tien-ich">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <svg className="hoa" viewBox="0 0 32 32" aria-hidden="true">
              <g fill="currentColor">
                <ellipse cx="16" cy="8" rx="2.6" ry="7" />
                <ellipse cx="16" cy="24" rx="2.6" ry="7" />
                <ellipse cx="8" cy="16" rx="7" ry="2.6" />
                <ellipse cx="24" cy="16" rx="7" ry="2.6" />
              </g>
            </svg>
            <h2>
              32 tiện ích trong bán kính 10 phút đi bộ{" "}
              <span className="dong2">48% quỹ đất dành cho cây xanh, mặt nước và hạ tầng công cộng</span>
            </h2>
          </div>
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
                  src={s.src}
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

        <div className="ti-mb">
          <Reveal>
            <figure
              className="ti-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/thanh-phu-centre-point-mat-bang-32-tien-ich.webp`,
                  "Mặt bằng 32 tiện ích Thanh Phú Centre Point"
                )
              }
            >
              <Image
                src={`${IMG}/thanh-phu-centre-point-mat-bang-32-tien-ich.webp`}
                width={1400}
                height={788}
                loading="lazy"
                decoding="async"
                alt="Mặt bằng 32 tiện ích Thanh Phú Centre Point: công viên trung tâm, hồ cảnh quan, Mega Mall, Club House, sân thể thao"
              />
              <figcaption className="fcap">Mặt bằng 32 tiện ích · bấm để phóng to, xem chú thích</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="ti-ds">
              <h3>Tiện ích biểu tượng</h3>
              <ul>
                {AMENITY_SPOTLIGHT.map((t) => (
                  <li key={t} dangerouslySetInnerHTML={{ __html: t }} />
                ))}
              </ul>
              <h3>Tiện ích sống hằng ngày</h3>
              <ul>
                {AMENITY_DAILY.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
