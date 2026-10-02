"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { OVERVIEW_STATS, SPEC_ROWS } from "../data";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>
              Tổng quan dự án
              <br />
              Nam Mekong Grand Plaza
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
          <Reveal>
            <figure
              className="ov-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/nam-mekong-grand-plaza-ban-cong-view-vong-xoay-wtc.webp`,
                  "Tầm nhìn từ ban công căn hộ ra vòng xoay WTC"
                )
              }
            >
              <Image
                src={`${IMG}/nam-mekong-grand-plaza-ban-cong-view-vong-xoay-wtc.webp`}
                alt="Ban công căn hộ Nam Mekong Grand Plaza nhìn ra vòng xoay WTC, nhà ga trung tâm và Trung tâm hành chính Bình Dương"
                width={1400}
                height={788}
                sizes="(max-width: 900px) 100vw, 575px"
                loading="lazy"
              />
              <figcaption className="fcap">
                Tầm nhìn từ ban công căn hộ ra vòng xoay WTC · bấm để phóng to
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <table className="spec">
              <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                Bảng thông tin tổng quan dự án Nam Mekong Grand Plaza
              </caption>
              <tbody>
                {SPEC_ROWS.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td>{r.bold ? <b>{r.value}</b> : r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        <Reveal>
          <p className="note" style={{ textAlign: "center", margin: "18px 0 0" }}>
            Nguồn: sheet nội dung dự án và bộ Hỏi – Đáp của chủ đầu tư. Thông tin chính thức căn cứ
            trên hợp đồng mua bán.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
