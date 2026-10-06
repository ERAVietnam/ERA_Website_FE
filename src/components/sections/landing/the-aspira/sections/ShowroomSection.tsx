"use client";

import { useState } from "react";
import Image from "next/image";
import { SHOWROOMS } from "../data";
import { AMark, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

/* Nhà mẫu — 3 tab theo loại căn, gallery ảnh lớn + thumbnails + prev/next (React state) */
export function ShowroomSection() {
  const [tab, setTab] = useState("2pn");
  const [idx, setIdx] = useState<Record<string, number>>({});
  const openLightbox = useLightbox();
  const cur = SHOWROOMS.find((s) => s.key === tab)!;
  const curIdx = idx[tab] ?? 0;
  const photo = cur.photos[curIdx];

  const go = (dir: number) =>
    setIdx((prev) => ({
      ...prev,
      [tab]: (curIdx + dir + cur.photos.length) % cur.photos.length,
    }));

  return (
    <section className="sec" id="nha-mau">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <AMark />
            <h2>
              Nhà mẫu The Aspira{" "}
              <span className="dong2">Ba phong cách theo loại căn – bàn giao thiết bị bếp, thiết bị vệ sinh thương hiệu Häfele</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Nhà mẫu theo loại căn">
            {SHOWROOMS.map((s) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={tab === s.key}
                onClick={() => setTab(s.key)}
              >
                {s.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="nm" role="tabpanel">
            <div className="nm-khung">
              <figure className="nm-lon" onClick={() => openLightbox(photo.lon, photo.alt)}>
                <Image
                  key={photo.lon}
                  src={photo.src800}
                  width={photo.w}
                  height={photo.h}
                  loading="lazy"
                  decoding="async"
                  alt={photo.alt}
                />
              </figure>
              <button type="button" className="nm-truoc" aria-label="Ảnh trước" onClick={() => go(-1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button type="button" className="nm-sau" aria-label="Ảnh sau" onClick={() => go(1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <span className="nm-dem" aria-live="polite">
                {curIdx + 1} / {cur.photos.length}
              </span>
            </div>
            <div className="spec-box">
              <em>{cur.em}</em>
              <h3>{cur.h3}</h3>
              <ul className="chk">
                {cur.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <ul className="nm-nho" aria-label={`Ảnh nhà mẫu ${cur.tab}`}>
                {cur.photos.map((p, i) => (
                  <li key={p.lon}>
                    <button
                      type="button"
                      aria-pressed={i === curIdx}
                      onClick={() => setIdx((prev) => ({ ...prev, [tab]: i }))}
                    >
                      <Image
                        src={p.nho}
                        width={360}
                        height={289}
                        loading="lazy"
                        decoding="async"
                        alt={p.alt}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <a
                className="nm-xem"
                href="#mat-bang"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#mat-bang")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Xem mặt bằng và diện tích loại căn{" "}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", margin: "18px 0 0" }}>
            Ảnh chụp căn hộ mẫu, chưa kê nội thất rờI. Ảnh bìa từng tab minh hoạ phong cách thiết
            kế. Danh mục thiết bị bàn giao theo hợp đồng mua bán.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
