"use client";

import Image from "next/image";
import { OVERVIEW_STATS, REASONS, SPEC_ROWS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-paper" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">Thông tin dự án</p>
            <h2>
              Tổng quan dự án <span className="nw">Green Skyline</span>
            </h2>
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
            className="ov-fig"
            onClick={() =>
              openLightbox(`${IMG}/green-skyline-thap-can-ho-tbs-land.webp`, "Phối cảnh Green Skyline")
            }
          >
            <Image
              src={`${IMG}/green-skyline-thap-can-ho-tbs-land.webp`}
              width={800}
              height={870}
              loading="lazy"
              decoding="async"
              alt="Phối cảnh tháp căn hộ Green Skyline của TBS Land với khối đế thương mại 3 tầng bên đường GS1"
            />
            <figcaption className="fcap">Phối cảnh Green Skyline · bấm để phóng to</figcaption>
          </figure>
          <Reveal delay={0.1}>
            <table className="spec">
              <caption className="sr">Thông số tổng quan Green Skyline</caption>
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
          <h3 className="sub-h ly-h">
            7 lý do chọn <span className="nw">Green Skyline</span>
          </h3>
          <ul className="ly" aria-label="7 lý do chọn Green Skyline">
            {REASONS.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="note" style={{ marginTop: 14 }}>
            Theo tài liệu chủ đầu tư. Các dự án hạ tầng theo quy hoạch và tiến độ do cơ quan nhà
            nước công bố.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
