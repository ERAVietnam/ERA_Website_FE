"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";
import { LOCATION_FACT, LOCATION_TABS, QUANH } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LocationSection() {
  const [tab, setTab] = useState("bo");
  const openLightbox = useLightbox();
  const current = LOCATION_TABS.find((t) => t.key === tab) ?? LOCATION_TABS[0];

  return (
    <section className="sec" id="vi-tri">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>
              Vị trí <span className="dong2">Bên Vịnh Cảng nước ngọt 8,6 ha</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="body" style={{ maxWidth: 900, margin: "0 auto clamp(24px,2.6vw,34px)", textAlign: "center" }}>
            {LOCATION_FACT}
          </p>
        </Reveal>

        <div className="vt">
          <Reveal>
            <figure
              className="map-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/the-aqua-vi-tri-phan-khu-aquaria-waterpoint.webp`,
                  "Phân khu Aquaria – nơi có The Aqua – trên phối cảnh Waterpoint"
                )
              }
            >
              <Image
                src={`${IMG}/the-aqua-vi-tri-phan-khu-aquaria-waterpoint.webp`}
                alt="Vị trí phân khu Aquaria (chứa The Aqua) bên Vịnh Cảng, giữa khúc sông Vàm Cỏ Đông ôm quanh khu đô thị Waterpoint"
                width={1400}
                height={803}
                sizes="(max-width: 900px) 100vw, 760px"
                loading="lazy"
              />
              <figcaption className="fcap">
                Phân khu Aquaria (khung sáng) – nơi có The Aqua – trên phối cảnh Waterpoint · bấm
                để phóng to
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="quanh" aria-label="Điểm nhấn vị trí The Aqua">
              <h3>Điểm nhấn vị trí</h3>
              <ul>
                {QUANH.map((q) => (
                  <li key={q.name} className={q.pv ? "pv" : ""}>
                    {q.name}
                  </li>
                ))}
              </ul>
              <p className="note" style={{ margin: "12px 0 0" }}>
                Theo trang chủ đầu tư waterpoint.com.vn.
              </p>
            </aside>
          </Reveal>
        </div>

        <div style={{ marginTop: "clamp(30px,3.4vw,46px)" }}>
          <Reveal>
            <div className="tabs" role="tablist" aria-label="Chọn hình thức kết nối">
              {LOCATION_TABS.map((t) => (
                <button
                  key={t.key}
                  className="tab"
                  role="tab"
                  type="button"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="pane route" role="tabpanel" aria-label={current.title}>
              <figure className="route-fig" onClick={() => openLightbox(current.fig, current.title)}>
                <Image
                  src={current.fig}
                  alt={current.figAlt}
                  width={1400}
                  height={788}
                  sizes="(max-width: 860px) 100vw, 700px"
                  loading="lazy"
                />
              </figure>
              <div className="route-card">
                <h3>{current.title}</h3>
                <p className="body" style={{ fontSize: 15, margin: "10px 0 0" }}>
                  {current.desc}
                </p>
                {current.routes.map((r) => (
                  <div className="rt" key={r.t + r.label}>
                    <b className={r.alt ? "alt" : ""}>{r.t}</b>
                    <span>{r.label}</span>
                  </div>
                ))}
                {current.groups.map((g) => (
                  <div key={g.sub}>
                    <div className="sub">{g.sub}</div>
                    {g.items.map((it) => (
                      <div className="rt" key={it.t}>
                        <b className="alt">{it.t}</b>
                        <span>{it.label}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            ThờI gian di chuyển theo tài liệu của chủ đầu tư, mang tính tham khảo và phụ thuộc điều
            kiện giao thông thực tế. Tuyến metro đang ở dạng dự kiến.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
