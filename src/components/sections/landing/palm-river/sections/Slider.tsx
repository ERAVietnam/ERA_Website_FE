"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Slide } from "../data";
import { useLightbox } from "./Lightbox";

/* Slider ngang dùng chung cho Tiện ích & Thư viện hình ảnh (thay JS của mẫu) */
export function Slider({
  slides,
  ariaLabel,
  zoom = true,
}: {
  slides: Slide[];
  ariaLabel: string;
  zoom?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const openLightbox = useLightbox();

  const update = () => {
    const t = trackRef.current;
    if (!t) return;
    const first = t.querySelector<HTMLElement>(".slide");
    if (!first) return;
    const step = first.offsetWidth + 14;
    setIdx(Math.min(slides.length, Math.round(t.scrollLeft / step) + 1));
  };

  const go = (dir: number) => {
    const t = trackRef.current;
    const first = t?.querySelector<HTMLElement>(".slide");
    if (!t || !first) return;
    t.scrollBy({ left: dir * (first.offsetWidth + 14), behavior: "smooth" });
  };

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="slider" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="track" ref={trackRef} tabIndex={0} onScroll={update}>
        {slides.map((s) => (
          <figure
            key={s.src}
            className={`slide${zoom ? " zoomable" : ""}`}
            onClick={zoom ? () => openLightbox(s.src.replace("-800.webp", ".webp"), s.ten) : undefined}
          >
            <Image src={s.src} width={s.w} height={s.h} loading="lazy" decoding="async" alt={s.alt} />
            <figcaption>
              <span className="ten">{s.ten}</span>
              {s.mo ? <span className="mo">{s.mo}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="sl-nav">
        <span aria-live="polite">
          {idx} / {slides.length}
        </span>
        <button className="sl-btn" type="button" aria-label="Ảnh trước" onClick={() => go(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button className="sl-btn" type="button" aria-label="Ảnh tiếp theo" onClick={() => go(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
