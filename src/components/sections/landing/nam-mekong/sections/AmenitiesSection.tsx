"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";
import { SLIDES, TANGS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

/* Slider tiện ích: cuộn ngang snap + nút trước/sau + đếm (thay JS của mẫu) */
function AmenitySlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const n = SLIDES.length;

  const nhay = (huong: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth * 0.7;
    track.scrollBy({ left: huong * width, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth * 0.7 || 1;
    const i = Math.min(n - 1, Math.max(0, Math.round(track.scrollLeft / width)));
    setIdx(i);
  };

  return (
    <div className="slider" aria-roledescription="carousel" aria-label="Tiện ích tiêu biểu">
      <div className="track" ref={trackRef} onScroll={onScroll} tabIndex={0}>
        {SLIDES.map((s) => (
          <figure className="slide" key={s.ten}>
            <Image src={s.src} alt={`${s.ten} Nam Mekong Grand Plaza`} width={s.w} height={s.h} loading="lazy" />
            <figcaption>
              <span className="ten">{s.ten}</span>
              <span className="mo">{s.mo}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="sl-nav">
        <span aria-live="polite">
          {idx + 1} / {n}
        </span>
        <button className="sl-btn" type="button" aria-label="Tiện ích trước" onClick={() => nhay(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button className="sl-btn" type="button" aria-label="Tiện ích tiếp theo" onClick={() => nhay(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function AmenitiesSection() {
  const [tang, setTang] = useState(TANGS[0].key);
  const openLightbox = useLightbox();
  const current = TANGS.find((t) => t.key === tang) ?? TANGS[0];

  return (
    <section className="sec bg-lav" id="tien-ich">
      <div className="wrap">
        <div className="ti-top">
          <Reveal>
            <div>
              <h2>
                Chuẩn sống nghỉ dưỡng ngay trong khuôn viên{" "}
                <span className="dong2">Hơn 50 tiện ích đặc quyền</span>
              </h2>
              <p className="body" style={{ marginTop: 18 }}>
                Tiện ích luôn là một trong những yếu tố tiên quyết mà chủ đầu tư Mekong Group đặc
                biệt quan tâm khi đầu tư vào dự án. Với thiết kế độc đáo, sang trọng, cùng hệ thống
                tiện ích nội khu đa dạng như bể bơi, phòng gym hiện đại, khu vui chơi trẻ em, dự án
                Nam Mekong Grand Plaza hứa hẹn mang đến một cuộc sống đẳng cấp và tiện nghi cho cư
                dân.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <figure
              onClick={() =>
                openLightbox(
                  `${IMG}/nam-mekong-grand-plaza-50-tien-ich-noi-khu.webp`,
                  "Hơn 50 tiện ích nội khu Nam Mekong Grand Plaza"
                )
              }
            >
              <Image
                src={`${IMG}/nam-mekong-grand-plaza-50-tien-ich-noi-khu.webp`}
                alt="Hơn 50 tiện ích nội khu Nam Mekong Grand Plaza trải từ tầng 1 đến tầng 29 của hai tòa tháp"
                width={1200}
                height={674}
                sizes="(max-width: 900px) 100vw, 480px"
                loading="lazy"
              />
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <AmenitySlider />
        </Reveal>

        {/* Danh mục tiện ích theo tầng — nguyên văn mẫu */}
        <Reveal>
          <div className="tang-wrap">
            <div className="tang-nut" role="tablist" aria-label="Chọn tầng tiện ích">
              {TANGS.map((t) => (
                <button
                  key={t.key}
                  className="tab"
                  role="tab"
                  type="button"
                  aria-selected={tang === t.key}
                  onClick={() => setTang(t.key)}
                >
                  {t.label} <small>{t.small}</small>
                </button>
              ))}
            </div>
            <div>
              <div className="pane tang-list" role="tabpanel" aria-label={current.title}>
                <h3>{current.title}</h3>
                <ul>
                  {current.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            Hình ảnh tiện ích là phối cảnh minh họa của chủ đầu tư. Nhà trẻ 984 m² tại tầng 2 tháp
            G2; khu Gym – Fitness tại tầng 2 tháp G1.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
