"use client";

import { useState } from "react";
import Image from "next/image";
import { ACC_SLIDES, AMENITY_GROUPS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const GROUP_ICONS = [
  // Hồ bơi & thư giãn
  <path key="i1" d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 22c2 0 2-1.5 4-1.5S8 22 10 22s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8" />,
  // Trẻ em
  <g key="i2"><circle cx="12" cy="6" r="3" /><path d="M12 9v7M8 12h8M9 21l3-5 3 5" /></g>,
  // Sức khỏe
  <path key="i3" d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11" />,
  // Cầu kết nối trên cao
  <path key="i4" d="M4 21V5h5v16M15 21V3h5v18M9 10h6M9 13h6" />,
  // Cộng đồng
  <g key="i5"><circle cx="8" cy="7" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20c0-3.5 2.7-6 6-6s6 2.5 6 6M14 20c0-2.6 1.3-4.6 3-4.6s4 1.6 4 4.6" /></g>,
  // Thương mại
  <path key="i6" d="M3 9 5 4h14l2 5M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9ZM5 13v7h14v-7M10 20v-4h4v4" />,
];

export function AmenitiesSection() {
  const [on, setOn] = useState(0);
  const openLightbox = useLightbox();

  return (
    <section className="sec ti" id="tien-ich">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="vach" aria-hidden="true"></span>
            <h2>
              Hơn 40 tiện ích <span className="dong2">Nghỉ dưỡng sinh thái giữa đô thị</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">
            Điểm nhấn của Celesta Gold là hồ bơi resort dài hơn 63 m, công viên nước chủ đề Amazon
            cho trẻ em và cầu kết nối trên cao giữa 2 tháp.
          </p>
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
                  src={s.src800}
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

        <Reveal>
          <ul className="nhom">
            {AMENITY_GROUPS.map((g, i) => (
              <li key={g.b}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {GROUP_ICONS[i]}
                </svg>
                <b>{g.b}</b>
                <span>{g.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
