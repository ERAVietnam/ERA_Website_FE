"use client";

import { useState } from "react";
import Image from "next/image";
import { ACC_ITEMS, FLOOR_TABS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

/* Tiện ích: accordion ảnh + tabs 4 tầng với mặt bằng và danh mục đánh số */
export function AmenitiesSection() {
  const [on, setOn] = useState(0);
  const [tab, setTab] = useState(FLOOR_TABS[0].key);
  const openLightbox = useLightbox();
  const current = FLOOR_TABS.find((t) => t.key === tab) ?? FLOOR_TABS[0];

  return (
    <section className="sec bg-sand" id="tien-ich">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Mặt bằng tiện ích – 4 tầng tiện ích</h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="acc" id="acc">
            {ACC_ITEMS.map((it, i) => (
              <figure
                key={it.ten}
                className={on === i ? "on" : ""}
                onMouseEnter={() => setOn(i)}
                onClick={() => setOn(i)}
              >
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 760px) 100vw, 640px" : "(max-width: 760px) 50vw, 640px"}
                  loading="lazy"
                  className="object-cover"
                />
                <figcaption>
                  <span className="ten">{it.ten}</span>
                  <span className="mo">{it.mo}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn tầng tiện ích">
            {FLOOR_TABS.map((t) => (
              <button
                key={t.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="pane tang" role="tabpanel" aria-label={current.title}>
            <figure className="map-fig" onClick={() => openLightbox(current.zoom, current.title)}>
              <Image
                src={current.fig}
                alt={current.alt}
                width={current.w}
                height={current.h}
                sizes="(max-width: 960px) 100vw, 740px"
                loading="lazy"
              />
              <figcaption className="fcap">{current.cap}</figcaption>
            </figure>
            <div className="ti-box">
              <h3>
                {current.title} <span>{current.count}</span>
              </h3>
              <ol className={current.twoCol ? "c2" : ""}>
                {current.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
              {current.note && <p>{current.note}</p>}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="phi">
            <b>Tiện ích dành riêng cư dân</b>
            <span>Phí quản lý dự kiến 12.000 – 15.000 đ/m², đã gồm tiện ích</span>
            <span>An ninh đa lớp 24/7, camera nhận diện khuôn mặt tại sảnh</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
