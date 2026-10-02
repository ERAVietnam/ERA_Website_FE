"use client";

import { useState } from "react";
import Image from "next/image";
import { DT_RANGES, FLOOR_PLANS, UNITS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function UnitsSection() {
  const [tab, setTab] = useState(UNITS[0].key);
  const [floor, setFloor] = useState(FLOOR_PLANS[0].key);
  const openLightbox = useLightbox();
  const current = UNITS.find((u) => u.key === tab) ?? UNITS[0];
  const currentFloor = FLOOR_PLANS.find((f) => f.key === floor) ?? FLOOR_PLANS[0];

  return (
    <section className="sec" id="can-ho">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Layout căn hộ</h2>
          </div>
        </Reveal>

        <Reveal>
          <ul className="dien-tich">
            {DT_RANGES.map((d) => (
              <li key={d.label}>
                {d.label}: <b>{d.b}</b>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn loại căn">
            {UNITS.map((u) => (
              <button
                key={u.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={tab === u.key}
                onClick={() => setTab(u.key)}
              >
                {u.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          {current.shophouse ? (
            <div className="pane" role="tabpanel" aria-label={current.name}>
              <div className="lo2">
                {current.shImgs?.map((im) => (
                  <figure key={im.src} onClick={() => openLightbox(im.src, current.name)}>
                    <Image
                      src={im.src}
                      alt={im.alt}
                      width={im.w}
                      height={im.h}
                      sizes="(max-width: 640px) 100vw, 580px"
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
              <div className="lo-card" style={{ marginTop: 14 }}>
                <div className="dt">
                  {current.dt}
                  <small>{current.dtSmall}</small>
                </div>
                <h3>{current.name}</h3>
                <ul>
                  {current.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="pane lo" role="tabpanel" aria-label={current.name}>
              <figure onClick={() => current.img && openLightbox(current.img, current.name)}>
                <Image
                  src={current.img!}
                  alt={current.imgAlt!}
                  width={current.w!}
                  height={current.h!}
                  sizes="(max-width: 900px) 100vw, 700px"
                  loading="lazy"
                />
              </figure>
              <div className="lo-card">
                <div className="dt">
                  {current.dt}
                  <small>{current.dtSmall}</small>
                </div>
                <h3>{current.name}</h3>
                <dl>
                  {current.specs.map((s) => (
                    <div key={s.k} style={{ display: "contents" }}>
                      <dt>{s.k}</dt>
                      <dd>{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <ul>
                  {current.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Reveal>

        <Reveal>
          <div className="mbt-h">
            <h3>Mặt bằng tầng</h3>
            <p>
              NSA: diện tích thông thủy · NFA: diện tích tim tường (đơn giá trong HĐMB tính theo
              tim tường). 19 thang máy, 5–10 căn/tầng mỗi block.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn mặt bằng tầng">
            {FLOOR_PLANS.map((f) => (
              <button
                key={f.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={floor === f.key}
                onClick={() => setFloor(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="pane" role="tabpanel" aria-label={currentFloor.label}>
            <figure className="map-fig" onClick={() => openLightbox(currentFloor.zoom, currentFloor.label)}>
              <Image
                src={currentFloor.fig}
                alt={currentFloor.alt}
                width={currentFloor.w}
                height={currentFloor.h}
                sizes="(max-width: 1180px) 100vw, 1180px"
                loading="lazy"
              />
              <figcaption className="fcap">{currentFloor.cap}</figcaption>
            </figure>
          </div>
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            Layout và diện tích theo brochure của chủ đầu tư, mang tính chất minh họa; số liệu
            chính thức theo hợp đồng mua bán.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
