"use client";

import Image from "next/image";
import { MILESTONES, PROGRESS_PHOTOS } from "../data";
import { AMark, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function ProgressSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="tien-do">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <AMark />
            <h2>
              Tiến độ thi công The Aspira{" "}
              <span className="dong2">Cất nóc ngày 10/4/2026 – sớm 30 ngày so với kế hoạch</span>
            </h2>
          </div>
        </Reveal>

        <div className="td">
          <Reveal>
            <ol className="moc" aria-label="Các mốc tiến độ">
              {MILESTONES.map((m) => (
                <li key={m.b} className={m.xong ? "xong" : "toi"}>
                  <b>{m.b}</b>
                  <span>{m.span}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="td-anh">
              {PROGRESS_PHOTOS.map((p) => (
                <figure key={p.src} onClick={() => openLightbox(p.src, p.alt)}>
                  <Image
                    src={p.src800}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    decoding="async"
                    alt={p.alt}
                  />
                  <figcaption>{p.cap}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
