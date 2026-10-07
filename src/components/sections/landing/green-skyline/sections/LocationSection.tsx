"use client";

import Image from "next/image";
import { LOCATION_FACT, MAP_MAIN, REGION, TRAVEL_TIMES } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LocationSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="vi-tri">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">Vị trí &amp; kết nối</p>
            <h2>
              Vị trí <span className="nw">Green Skyline</span>{" "}
              <span className="dong2">Giao điểm Quốc lộ 1K với đường GS1, GS5 – trong khu đô thị Green Square</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">{LOCATION_FACT}</p>
        </Reveal>

        <div className="vt">
          <Reveal>
            <figure className="map-fig" onClick={() => openLightbox(MAP_MAIN.zoom, "Sơ đồ vị trí Green Skyline")}>
              <Image
                src={MAP_MAIN.src}
                width={MAP_MAIN.w}
                height={MAP_MAIN.h}
                loading="lazy"
                decoding="async"
                alt={MAP_MAIN.alt}
              />
              <figcaption className="fcap">Sơ đồ vị trí &amp; tiện ích của chủ đầu tư · bấm để phóng to</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card">
              <h3>ThờI gian di chuyển tham khảo</h3>
              {TRAVEL_TIMES.map((t) => (
                <div key={t.span} className="rt">
                  <b>{t.b}</b>
                  <span>{t.span}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="vung">
          <Reveal>
            <div>
              <p className="kick">{REGION.kick}</p>
              <h3 className="sub-h">{REGION.h3}</h3>
              <div className="body">
                {REGION.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <ul className="duong" aria-label="Trục kết nối">
                {REGION.roads.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <figure onClick={() => openLightbox(REGION.map.zoom, "Bản đồ vùng 25 phút Green Skyline")}>
              <Image
                src={REGION.map.src}
                width={REGION.map.w}
                height={REGION.map.h}
                loading="lazy"
                decoding="async"
                alt={REGION.map.alt}
              />
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <p className="note" style={{ marginTop: 16 }}>
            ThờI gian di chuyển mang tính tham khảo, phụ thuộc điều kiện giao thông thực tế. Thông
            tin hạ tầng theo quy hoạch, tiến độ do cơ quan nhà nước công bố.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
