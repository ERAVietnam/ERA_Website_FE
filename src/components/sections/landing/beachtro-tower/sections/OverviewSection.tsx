"use client";

import Image from "next/image";
import { OVERVIEW_FACT, OVERVIEW_STATS, REASONS, SPEC_ROWS } from "../data";
import { IMG } from "../theme";
import { Quat, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Tổng quan <span className="nw">Beachtro Tower</span> <span className="nw">(Blanca City)</span>{" "}
              <span className="dong2">Mở cánh cửa xanh – chào ốc đảo nhiệt đới</span>
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
                `${IMG}/beachtro-tower-toan-canh-dai-lo-3-thang-2.webp`,
                "Beachtro Tower bên đại lộ 3 Tháng 2"
              )
            }
          >
            <Image
              src={`${IMG}/beachtro-tower-toan-canh-dai-lo-3-thang-2.webp`}
              width={1000}
              height={840}
              loading="lazy"
              decoding="async"
              alt="Toàn cảnh Beachtro Tower nhìn từ công viên: các tháp căn hộ bên đại lộ 3 Tháng 2, phía xa là biển Bãi Sau và Blanca City"
            />
            <figcaption className="fcap">Beachtro Tower bên đại lộ 3 Tháng 2 · bấm để phóng to</figcaption>
          </figure>
          <Reveal delay={0.1}>
            <table className="spec">
              <caption className="sr">Thông số tổng quan Beachtro Tower</caption>
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
          <h3 className="sub-h ly-h">6 lý do nên sở hữu căn hộ Beachtro Tower</h3>
          <ul className="ly" aria-label="6 lý do nên sở hữu căn hộ Beachtro Tower">
            {REASONS.map((r) => (
              <li key={r.b}>
                <b>{r.b}</b>
                <strong>{r.strong}</strong>
                <span>{r.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
