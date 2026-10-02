"use client";

import Image from "next/image";
import { OVERVIEW_STATS, SPEC_ROWS } from "../data";
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
            <h2>Thông tin tổng quan Palm River</h2>
            <svg className="song" aria-hidden="true">
              <use href="#song" />
            </svg>
          </div>
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
            className="ov-fig zoomable"
              onClick={() =>
                openLightbox(
                  `${IMG}/palm-river-tong-the-palm-city-2600.webp`,
                  "Palm River trong tổng thể khu đô thị Palm City 30,6 ha"
                )
              }
            >
              <Image
                src={`${IMG}/palm-river-tong-the-palm-city-800.webp`}
                width={1400}
                height={878}
                loading="lazy"
                decoding="async"
                alt="Tổng thể Palm City nhìn từ trên cao với các tháp Palm River ven sông, phía xa là Thủ Thiêm"
              />
              <figcaption className="fcap">Palm River trong tổng thể khu đô thị Palm City 30,6 ha · bấm để phóng to</figcaption>
            </figure>
          <Reveal delay={0.1}>
            <table className="spec">
              <caption className="sr">Bảng thông tin tổng quan dự án Palm River</caption>
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
          <p className="note" style={{ textAlign: "center", margin: "18px 0 0" }}>
            Các thông số theo landing ERA hiện tại và tài liệu dự án, cập nhật tháng 9/2026. Thông tin
            chính thức căn cứ trên hợp đồng mua bán.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
