"use client";

import Image from "next/image";
import { CELESTA_PHASES, INVESTORS, PARTNERS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function InvestorsSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="chu-dau-tu">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="vach" aria-hidden="true"></span>
            <h2>
              Liên danh phát triển <span className="nw">Keppel – Phú Long – Nomura</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <ul className="ld">
            {INVESTORS.map((inv) => (
              <li key={inv.b}>
                <div className="logo">
                  <Image
                    src={inv.logo}
                    width={inv.w}
                    height={inv.h}
                    loading="lazy"
                    decoding="async"
                    alt={inv.alt}
                  />
                </div>
                <b>{inv.b}</b>
                <i>{inv.i}</i>
                <p>{inv.p}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="kdt">
          <Reveal>
            <figure
              className="map-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/celesta-gold-khu-do-thi-celesta-avenue-heights-rise.webp`,
                  "Khu đô thị Celesta trên trục Nguyễn Hữu Thọ"
                )
              }
            >
              <Image
                src={`${IMG}/celesta-gold-khu-do-thi-celesta-avenue-heights-rise-800.webp`}
                width={1400}
                height={875}
                loading="lazy"
                decoding="async"
                alt="Khu đô thị Celesta trên trục Nguyễn Hữu Thọ: các phân khu Celesta Avenue, Celesta Heights, Celesta Rise và Celesta Gold"
              />
              <figcaption className="fcap">Khu đô thị Celesta trên trục Nguyễn Hữu Thọ · bấm để phóng to</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3>Bước tiếp theo của khu đô thị Celesta</h3>
              <p className="body">
                Celesta Gold là bước tiếp theo của khu đô thị Celesta trên trục Nguyễn Hữu Thọ, nối
                tiếp các phân khu đã ra mắt.
              </p>
              <ul className="chips">
                {CELESTA_PHASES.map((c) => (
                  <li key={c}>{c}</li>
                ))}
                <li className="hl">Celesta Gold</li>
              </ul>
              <div className="doi-tac">
                <p>Đối tác thiết kế &amp; thi công</p>
                <ul className="chips">
                  {PARTNERS.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
