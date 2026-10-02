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
              Khu phức hợp nhà ở và thương mại cao cấp <span className="dong2">Park Village</span>
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
                  `${IMG}/park-village-vi-tri-trung-tam-waterpoint.webp`,
                  "Vị trí Park Village giữa khu đô thị Waterpoint"
                )
              }
            >
              <Image
                src={`${IMG}/park-village-vi-tri-trung-tam-waterpoint.webp`}
                alt="Vị trí Park Village ở trung tâm khu đô thị Waterpoint 355 ha, ba mặt giáp kênh đào, cạnh Central Park"
                width={1200}
                height={728}
                sizes="(max-width: 900px) 100vw, 660px"
                loading="lazy"
              />
              <figcaption className="fcap">
                Park Village (khoanh sáng, nhãn “Central Park Village”) giữa khu đô thị Waterpoint ·
                bấm để phóng to
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <table className="spec">
              <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                Thông số tổng quan phân khu Park Village
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
            Nguồn: tài liệu giới thiệu Park Village và trang waterpoint.com.vn của chủ đầu tư.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
