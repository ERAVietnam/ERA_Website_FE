"use client";

import Image from "next/image";
import { CORE_VALUES, OVERVIEW_FACT, OVERVIEW_STATS, SPEC_ROWS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <svg className="hoa" viewBox="0 0 32 32" aria-hidden="true">
              <g fill="currentColor">
                <ellipse cx="16" cy="8" rx="2.6" ry="7" />
                <ellipse cx="16" cy="24" rx="2.6" ry="7" />
                <ellipse cx="8" cy="16" rx="7" ry="2.6" />
                <ellipse cx="24" cy="16" rx="7" ry="2.6" />
              </g>
            </svg>
            <h2>
              Tổng quan dự án <span className="nw">Thanh Phú Centre Point</span>{" "}
              <span className="dong2">Giao thương – Trải nghiệm – Lễ hội</span>
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
                `${IMG}/thanh-phu-centre-point-mega-mall-cau-rong.webp`,
                "Mega Mall và Cầu Rồng – cổng chào biểu tượng Thanh Phú Centre Point"
              )
            }
          >
            <Image
              src={`${IMG}/thanh-phu-centre-point-mega-mall-cau-rong.webp`}
              width={1000}
              height={562}
              loading="lazy"
              decoding="async"
              alt="Phối cảnh Mega Mall và Cầu Rồng uốn lượn tại cổng chính Thanh Phú Centre Point lúc hoàng hôn"
            />
            <figcaption className="fcap">Mega Mall và Cầu Rồng – cổng chào biểu tượng · bấm để phóng to</figcaption>
          </figure>
          <Reveal delay={0.1}>
            <table className="spec">
              <caption className="sr">Thông số tổng quan Thanh Phú Centre Point</caption>
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
          <ul className="gt" aria-label="3 giá trị định vị">
            {CORE_VALUES.map((g) => (
              <li key={g.i}>
                <i>{g.i}</i>
                <b>{g.b}</b>
                <span>{g.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
