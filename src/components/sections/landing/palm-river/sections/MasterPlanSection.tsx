"use client";

import { useState } from "react";
import Image from "next/image";
import { TOWERS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function MasterPlanSection() {
  const [tower, setTower] = useState(TOWERS[0].key);
  const openLightbox = useLightbox();
  const cur = TOWERS.find((t) => t.key === tower)!;

  return (
    <section className="sec" id="mat-bang">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Mặt bằng điển hình</h2>
            <svg className="song" aria-hidden="true">
              <use href="#song" />
            </svg>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn tháp">
            {TOWERS.map((t) => (
              <button
                key={t.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={tower === t.key}
                onClick={() => setTower(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <figure className="mb-fig zoomable" onClick={() => openLightbox(cur.zoom, cur.alt)}>
            <Image
              src={cur.fig}
              width={cur.w}
              height={cur.h}
              loading="lazy"
              decoding="async"
              alt={cur.alt}
            />
            <figcaption className="fcap">{cur.cap}</figcaption>
          </figure>
          <ul className="loai-can" aria-label={`Diện tích căn ${cur.label}`}>
            {cur.loai.map((l) => (
              <li key={l.b}>
                <b>{l.b}</b>
                <span>{l.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            Diện tích ghi theo dạng tim tường (GSA) / thông thủy (NSA), theo mặt bằng chủ đầu tư
            công bố.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
