"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { LEGEND } from "../data";
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
          <p className="fact">
            Mặt bằng Park Village gồm 96 lô biệt thự thuộc ba dòng Garden Grand Villa, Park Grand
            Villa và Canal Grand Villa, bao quanh bởi kênh đào, clubhouse và hồ bơi nằm giữa
            compound.
          </p>
        </Reveal>

        <div className="mb">
          <Reveal>
            <figure
              className="mb-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/park-village-mat-bang-tong-the-3000.webp`,
                  "Mặt bằng tổng thể Park Village — 96 lô Grand Villa"
                )
              }
            >
              <Image
                src={`${IMG}/park-village-mat-bang-tong-the.webp`}
                alt="Mặt bằng tổng thể Park Village: 96 lô biệt thự Garden, Park và Canal Grand Villa bao quanh bởi kênh đào"
                width={1400}
                height={788}
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
              <h3>Ba dòng Grand Villa</h3>
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
