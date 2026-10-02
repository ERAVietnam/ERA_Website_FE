"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { HATANG, ROUTE_TIMES, VI_TRI_FACT } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LocationSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="vi-tri">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Vị trí SkySOLIS – Tâm điểm kết nối</h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">{VI_TRI_FACT}</p>
        </Reveal>

        <div className="vt">
          <Reveal>
            <figure
              className="map-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/skysolis-ban-do-vi-tri-quoc-lo-13-lai-thieu-2300.webp`,
                  "Bản đồ vị trí SkySOLIS trên Quốc lộ 13, phường Lái Thiêu"
                )
              }
            >
              <Image
                src={`${IMG}/skysolis-ban-do-vi-tri-quoc-lo-13-lai-thieu.webp`}
                alt="Bản đồ vị trí SkySOLIS trên Quốc lộ 13, phường Lái Thiêu: Lotte Mart, BVQT Becamex, KCN VSIP, metro, sân bay"
                width={1300}
                height={1288}
                sizes="(max-width: 900px) 100vw, 600px"
                loading="lazy"
              />
              <figcaption className="fcap">
                Bản đồ vị trí của chủ đầu tư · bấm để phóng to, xem tên đường
              </figcaption>
            </figure>
          </Reveal>

          <div className="vt-side">
            <Reveal>
              <div className="card">
                <h3>ThờI gian di chuyển tham khảo</h3>
                {ROUTE_TIMES.map((r) => (
                  <div className="rt" key={r.b}>
                    <b>{r.b}</b>
                    <span>{r.span}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card">
                <h3>Hạ tầng sắp tới</h3>
                <ul className="ht">
                  {HATANG.map((h) => (
                    <li key={h.i}>
                      <i>{h.i}</i>
                      {h.span}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            ThờI gian di chuyển mang tính tham khảo, phụ thuộc điều kiện giao thông thực tế. Hạ
            tầng theo quy hoạch, tiến độ do cơ quan nhà nước công bố.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
