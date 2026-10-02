"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { LEGEND, MB_FACT } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function MasterPlanSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-mist" id="mat-bang">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Mặt bằng tổng thể</h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">{MB_FACT}</p>
        </Reveal>

        <div className="mb">
          <Reveal>
            <figure
              className="mb-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/the-aqua-mat-bang-tong-the-3000.webp`,
                  "Mặt bằng tổng thể The Aqua"
                )
              }
            >
              <Image
                src={`${IMG}/the-aqua-mat-bang-tong-the.webp`}
                alt="Mặt bằng tổng thể The Aqua: các dãy Riverfront, Harborfront, Canal và Garden Grand Villa dọc sông và Vịnh Cảng"
                width={1400}
                height={752}
                sizes="(max-width: 900px) 100vw, 860px"
                loading="lazy"
              />
              <figcaption className="fcap">
                Mặt bằng tổng thể · bấm để phóng to, xem mã từng lô
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="legend" aria-label="Chú thích mặt bằng">
              <h3>Chú thích</h3>
              <ul>
                {LEGEND.map((l) => (
                  <li key={l.b}>
                    <i style={{ background: l.color }}></i>
                    <b>{l.b}</b>
                    <span>{l.span}</span>
                  </li>
                ))}
              </ul>
              <p className="note">
                Màu theo chú thích trên mặt bằng của chủ đầu tư. Vị trí và phân loại từng lô căn cứ
                theo hợp đồng mua bán.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
