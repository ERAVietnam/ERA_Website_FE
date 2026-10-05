"use client";

import Image from "next/image";
import { LEGAL_TIMELINE, MILESTONES } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LegalSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-sand" id="phap-ly">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="vach" aria-hidden="true"></span>
            <h2>
              Pháp lý &amp; tiến độ <span className="dong2">Pháp lý vững vàng, sẵn sàng ký kết</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <ol className="tl">
            {LEGAL_TIMELINE.map((t) => (
              <li key={t.b} className={t.sap ? "sap" : ""}>
                <b>{t.b}</b>
                <span>{t.span}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="ev">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.src} delay={i * 0.1}>
              <figure onClick={() => openLightbox(m.src, "")}>
                <Image
                  src={m.src800}
                  width={m.w}
                  height={m.h}
                  loading="lazy"
                  decoding="async"
                  alt={m.alt}
                />
                <figcaption>{m.cap}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
