"use client";

import Image from "next/image";
import { GM_TEXT, OVERVIEW_FACT, OVERVIEW_STATS, SPEC_ROWS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="vach" aria-hidden="true"></span>
            <h2>
              Tổng quan dự án <span className="nw">Celesta Gold</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">{OVERVIEW_FACT}</p>
        </Reveal>

        <Reveal>
          <div className="stats">
            {OVERVIEW_STATS.map((s) => (
              <div key={s.span}>
                <b>{s.b}</b>
                <span>{s.span}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="ov">
          {/* figure phải là grid item trực tiếp của .ov để sticky ăn — không bọc Reveal */}
          <figure
            className="ov-fig"
            onClick={() =>
              openLightbox(
                `${IMG}/celesta-gold-tong-quan-phoi-canh-2-thap-25-tang.webp`,
                "Phối cảnh Celesta Gold: 2 tháp 25 tầng trên khối đế thương mại"
              )
            }
          >
            <Image
              src={`${IMG}/celesta-gold-tong-quan-phoi-canh-2-thap-25-tang-800.webp`}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              alt="Phối cảnh Celesta Gold dưới nắng: 2 tháp 25 tầng mặt kính viền đồng, khối đế shophouse và hàng cây dọc đường"
            />
            <figcaption className="fcap">2 tháp 25 tầng trên khối đế thương mại · bấm để phóng to</figcaption>
          </figure>
          <Reveal delay={0.1}>
            <table className="spec">
              <caption className="sr">Thông số tổng quan Celesta Gold</caption>
              <tbody>
                {SPEC_ROWS.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        <Reveal>
          <div className="gm">
            <div className="gm-dau">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="24" cy="24" r="20" />
                <path d="M15 31c0-10 6-16 18-17-1 11-7 17-18 17Z" />
                <path d="M15 31c4-5 8-8 12-10" />
              </svg>
              <b>
                <small>Chuẩn xanh Singapore</small>BCA Green Mark Gold
              </b>
            </div>
            <p>{GM_TEXT}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
