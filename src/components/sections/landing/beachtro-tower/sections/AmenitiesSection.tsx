"use client";

import { useState } from "react";
import Image from "next/image";
import { ACC_SLIDES, AMENITY_FACT, FLOOR_AMENITIES } from "../data";
import { IMG } from "../theme";
import { Quat, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function AmenitiesSection() {
  const [on, setOn] = useState(0);
  const openLightbox = useLightbox();

  return (
    <section className="sec ti" id="tien-ich">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Tiện ích <span className="nw">Beachtro Tower</span> – <span className="nw">Blanca City</span>{" "}
              <span className="dong2">Tro Collection · trọn vẹn 5 Golden Hours</span>
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

        <div className="ti-mb">
          <Reveal>
            <figure
              className="ti-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/beachtro-tower-tro-collection-tien-ich-tung-tang-lon.webp`,
                  "Tro Collection – tiện ích Beachtro Tower theo tầng"
                )
              }
            >
              <Image
                src={`${IMG}/beachtro-tower-tro-collection-tien-ich-tung-tang.webp`}
                width={1400}
                height={1041}
                loading="lazy"
                decoding="async"
                alt="Tro Collection – tiện ích Beachtro Tower theo tầng: Tro Chill, Tro Work & Fitness, Tro Play, Tro Nest, Tro Signature"
              />
              <figcaption className="fcap">Tro Collection – tiện ích trải dài tới tầng cao · bấm để phóng to</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="tang" aria-label="Tiện ích theo tầng">
              {FLOOR_AMENITIES.map((f) => (
                <li key={f.t}>
                  <i>{f.t}</i>
                  <div>
                    <b>{f.b}</b>
                    <span>{f.span}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
