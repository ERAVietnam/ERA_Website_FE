"use client";

import { useState } from "react";
import Image from "next/image";
import { ACC_SLIDES, AMENITY_FACT, AMENITY_FLOORS, SECURITY } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const AN_ICONS = [
  <path key="a1" d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />,
  (<g key="a2"><path d="M8 11V7a4 4 0 0 1 8 0v4M5 11h14v10H5zM12 15v2" /></g>),
  <path key="a3" d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
];

export function AmenitiesSection() {
  const [floor, setFloor] = useState("t3");
  const [on, setOn] = useState(0);
  const openLightbox = useLightbox();
  const cur = AMENITY_FLOORS.find((f) => f.key === floor)!;

  return (
    <section className="sec ti" id="tien-ich">
      <svg className="hoa" viewBox="0 0 560 560" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <path d="M0 140H560M0 280H560M0 420H560M140 0V560M280 0V560M420 0V560" />
        <path d="M280 0A280 280 0 0 0 560 280M140 140A140 140 0 0 1 280 280M420 280A140 140 0 0 0 560 420M280 420A140 140 0 0 1 420 560M0 280A140 140 0 0 1 140 420M140 0A140 140 0 0 0 280 140" />
      </svg>
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">Tiện ích nội khu</p>
            <h2>
              Tiện ích <span className="nw">Green Skyline</span>{" "}
              <span className="dong2">Resort giữa phố – trải trên 4 tầng tiện ích</span>
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
                  src={s.src}
                  width={s.w}
                  height={s.h}
                  loading="lazy"
                  decoding="async"
                  alt={s.alt}
                />
                {s.that ? <span className="that">Ảnh thực tế</span> : null}
                <figcaption>
                  <span className="ten">{s.ten}</span>
                  <span className="mo">{s.mo}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn tầng tiện ích">
            {AMENITY_FLOORS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={floor === f.key}
                onClick={() => setFloor(f.key)}
              >
                {f.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="tp" role="tabpanel">
            <figure onClick={() => openLightbox(cur.map, cur.mapAlt)}>
              <Image
                src={cur.map}
                width={cur.w}
                height={cur.h}
                loading="lazy"
                decoding="async"
                alt={cur.mapAlt}
              />
              <figcaption className="fcap">Mặt bằng tiện ích {cur.tab} · bấm để phóng to</figcaption>
            </figure>
            <div>
              <h3>{cur.h3}</h3>
              <p className="phu">{cur.phu}</p>
              <ol className="dsso">
                {cur.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
              {cur.anh && (
                <figure className="anh" onClick={() => openLightbox(cur.anh!.src, cur.anh!.alt)}>
                  <Image
                    src={cur.anh.src}
                    width={cur.anh.w}
                    height={cur.anh.h}
                    loading="lazy"
                    decoding="async"
                    alt={cur.anh.alt}
                  />
                  {cur.anh.that ? <span className="that">Ảnh thực tế 03/2026</span> : null}
                </figure>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ul className="an" aria-label="An ninh">
            {SECURITY.map((t, i) => (
              <li key={t}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {AN_ICONS[i]}
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
