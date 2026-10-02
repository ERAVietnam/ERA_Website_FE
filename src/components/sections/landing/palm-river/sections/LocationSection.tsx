"use client";

import { Fragment } from "react";
import Image from "next/image";
import { LOCATION_BODY, LOCATION_GROUPS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LocationSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-pale" id="vi-tri">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Vị trí Palm River</h2>
            <svg className="song" aria-hidden="true">
              <use href="#song" />
            </svg>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ maxWidth: 900, margin: "0 auto clamp(26px,3vw,38px)" }}>
            {LOCATION_BODY.map((p) => (
              <p key={p.slice(0, 30)} className="body">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <div className="vt">
          <Reveal>
            <figure
              className="map-fig zoomable"
              onClick={() =>
                openLightbox(`${IMG}/palm-river-ban-do-vi-tri-ket-noi-3000.webp`, "Bản đồ kết nối theo tài liệu chủ đầu tư")
              }
            >
              <Image
                src={`${IMG}/palm-river-ban-do-vi-tri-ket-noi-800.webp`}
                width={1400}
                height={1050}
                loading="lazy"
                decoding="async"
                alt="Bản đồ vị trí và kết nối Palm River: ga Bình Trưng, nút giao An Phú, cao tốc TP.HCM – Long Thành – Dầu Giây và các trung tâm quanh khu Đông"
              />
              <figcaption className="fcap">Bản đồ kết nối theo tài liệu chủ đầu tư · bấm để phóng to</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="phut" aria-label="ThờI gian di chuyển từ Palm River">
              {LOCATION_GROUPS.map((g, gi) => (
                <Fragment key={g.h}>
                  {gi > 0 ? <div style={{ height: 22 }} aria-hidden="true" /> : null}
                  <h3>{g.h}</h3>
                  {g.items.map((it) => (
                    <div key={it.span} className="rt">
                      <b>{it.b}</b>
                      <span>{it.span}</span>
                    </div>
                  ))}
                </Fragment>
              ))}
            </aside>
          </Reveal>
        </div>

        <Reveal>
          <p className="note" style={{ textAlign: "center", margin: "16px 0 0" }}>
            ThờI gian di chuyển mang tính tham khảo. Tuyến đường sắt Thủ Thiêm – Long Thành theo tài
            liệu chủ đầu tư dự kiến hoàn thành năm 2030.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
