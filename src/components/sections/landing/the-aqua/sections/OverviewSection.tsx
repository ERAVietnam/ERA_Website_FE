"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { OVERVIEW_FACT, OVERVIEW_STATS, SPEC_ROWS } from "../data";
import { useLightbox } from "./Lightbox";

export function OverviewSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="tong-quan">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>
              Tổng quan <span className="dong2">The Aqua · compound thuộc phân khu Aquaria</span>
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
          <Reveal>
            <figure
              className="ov-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/the-aqua-tong-quan-biet-thu-ven-song.webp`,
                  "Dãy biệt thự The Aqua dọc sông Vàm Cỏ Đông"
                )
              }
            >
              <Image
                src={`${IMG}/the-aqua-tong-quan-biet-thu-ven-song.webp`}
                alt="Toàn cảnh compound The Aqua dọc sông Vàm Cỏ Đông với lối dạo ven sông, hồ bơi riêng và du thuyền, Waterpoint"
                width={1400}
                height={788}
                sizes="(max-width: 900px) 100vw, 660px"
                loading="lazy"
              />
              <figcaption className="fcap">
                Dãy biệt thự The Aqua dọc sông Vàm Cỏ Đông · bấm để phóng to
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <table className="spec">
              <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                Thông số tổng quan The Aqua
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
            Nguồn: trang The Aqua và khu đô thị trên waterpoint.com.vn của chủ đầu tư.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
