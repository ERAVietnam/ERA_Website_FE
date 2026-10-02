"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";
import { LOCATION_TABS, QUANH } from "../data";
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
              Vị trí <span className="dong2">Trung tâm khu đô thị</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="body" style={{ maxWidth: 900, margin: "0 auto clamp(24px,2.6vw,34px)", textAlign: "center" }}>
            Ở vị trí trung tâm thành phố bên sông Waterpoint, Park Village được ví như trái tim
            sinh thái biểu tượng cho nhịp sống hiện đại, vừa kết nối chuỗi tiện ích đẳng cấp tầm đô
            thị vừa hội tụ không khí trong lành, lan tỏa nguồn năng lượng xanh dạt dào. Với ba mặt
            được bao bọc bởi kênh đào, mặt còn lại trải dọc bởi hành lang cảnh quan sinh thái và
            công viên trung tâm lên đến 25ha, Park Village là mảnh ghép đầy chất thơ, nhẹ nhàng và
            êm đềm để gác lại bao tấp nập, bộn bề, tìm về vẻ đẹp thanh bình, yên ả.
          </p>
        </Reveal>

        <div className="vt">
          <Reveal>
            <figure
              className="map-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/park-village-ban-do-tien-ich-waterpoint.webp`,
                  "Vị trí Park Village trên phối cảnh khu đô thị Waterpoint"
                )
              }
            >
              <Image
                src={`${IMG}/park-village-ban-do-tien-ich-waterpoint.webp`}
                alt="Phối cảnh Waterpoint đánh dấu Park Village cạnh Central Park, trường học, CLB ven sông, Harbour và bệnh viện"
                width={1400}
                height={914}
                sizes="(max-width: 900px) 100vw, 760px"
                loading="lazy"
              />
              <figcaption className="fcap">
                Vị trí Park Village trên phối cảnh khu đô thị Waterpoint · bấm để phóng to
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="quanh" aria-label="Tiện ích quanh Park Village">
              <h3>Quanh Park Village</h3>
              <ul>
                {QUANH.map((q) => (
                  <li key={q.name} className={q.pv ? "pv" : ""}>
                    {q.name}
                  </li>
                ))}
              </ul>
              <p className="note" style={{ margin: "12px 0 0" }}>
                Theo phối cảnh quy hoạch của chủ đầu tư.
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
