"use client";

import Image from "next/image";
import { INTRO, INTRO_MOSAIC } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function IntroSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-pale" id="gioi-thieu">
      <div className="wrap gt">
        <Reveal>
          <div>
            <p className="ky">{INTRO.ky}</p>
            <h2>{INTRO.h2}</h2>
            <svg className="song trai" aria-hidden="true">
              <use href="#song" />
            </svg>
            <p className="body" style={{ marginTop: 18 }}>
              {INTRO.body1}
            </p>
            <p className="body">{INTRO.body2}</p>
            <p className="body">{INTRO.body3}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mosaic">
            {INTRO_MOSAIC.map((m) => (
              <figure key={m.cls} className={`${m.cls} zoomable`} onClick={() => openLightbox(m.src, m.alt)}>
                <Image
                  src={m.src}
                  width={m.w}
                  height={m.h}
                  loading="lazy"
                  decoding="async"
                  alt={m.alt}
                />
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
