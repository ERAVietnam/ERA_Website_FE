"use client";

import Image from "next/image";
import { ARCH, ARCH_POINTS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const KT_ICONS = [
  <path key="k1" d="M4 21V8a4 4 0 0 1 8 0v13M12 21V5a4 4 0 0 1 8 0v16M2 21h20" />,
  <path key="k2" d="M3 21V5M21 21V5M3 11l9 4 9-4M12 15v-4" />,
  <path key="k3" d="M4 20h16M6 20V9l6-5 6 5v11M10 20v-6h4v6" />,
  <path key="k4" d="M3 9l1.5-5h15L21 9M3 9h18M3 9v11h18V9M8 20v-6h8v6" />,
];

export function ArchitectureSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="kien-truc">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">Kiến trúc &amp; phố thương mại</p>
            <h2>Kiến trúc City Resort – Dấu ấn cầu vọng cảnh</h2>
          </div>
        </Reveal>

        <div className="kt">
          <Reveal>
            <figure onClick={() => openLightbox(ARCH.main.src, "Cầu vọng cảnh nối 2 tháp – cảm hứng chim hạc")}>
              <Image
                src={ARCH.main.src800 ?? ARCH.main.src}
                width={ARCH.main.w}
                height={ARCH.main.h}
                loading="lazy"
                decoding="async"
                alt={ARCH.main.alt}
              />
              <figcaption className="fcap">Cầu vọng cảnh nối 2 tháp – cảm hứng chim hạc · bấm để phóng to</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <ul className="ds" aria-label="Điểm nhấn kiến trúc">
                {ARCH_POINTS.map((t, i) => (
                  <li key={t.b}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {KT_ICONS[i]}
                    </svg>
                    <div>
                      <b>{t.b}</b>
                      <span>{t.span}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <figure className="kt-tt" onClick={() => openLightbox(ARCH.thumb.src, "Cầu vọng cảnh – ảnh thực tế 03/2026")}>
                <Image
                  src={ARCH.thumb.src}
                  width={ARCH.thumb.w}
                  height={ARCH.thumb.h}
                  loading="lazy"
                  decoding="async"
                  alt={ARCH.thumb.alt}
                />
                <span className="that">Ảnh thực tế 03/2026</span>
              </figure>
            </div>
          </Reveal>
        </div>

        <div className="kg">
          {ARCH.gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.06}>
              <figure onClick={() => openLightbox(g.src, g.cap)}>
                <Image
                  src={g.src800 ?? g.src}
                  width={g.w}
                  height={g.h}
                  loading="lazy"
                  decoding="async"
                  alt={g.alt}
                />
                {g.that ? <span className="that">Ảnh thực tế</span> : null}
                <figcaption>{g.cap}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
