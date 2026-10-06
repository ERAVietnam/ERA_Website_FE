"use client";

import { useState } from "react";
import Image from "next/image";
import { AMENITY_FLOORS } from "../data";
import { AMark, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

/* Tabs 2 tầng tiện ích — pins đánh số đặt theo toạ độ %, tooltip tên tiện ích bằng CSS (data-ten) */
export function AmenitiesSection() {
  const [floor, setFloor] = useState("tret");
  const openLightbox = useLightbox();
  const cur = AMENITY_FLOORS.find((f) => f.key === floor)!;

  return (
    <section className="sec ti" id="tien-ich">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <AMark />
            <h2>
              Tiện ích – Trạm sạc năng lượng ngày &amp; đêm{" "}
              <span className="dong2">38 tiện ích nội khu trải trên tầng trệt và tầng thượng</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Tầng tiện ích">
            {AMENITY_FLOORS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={floor === f.key}
                onClick={() => setFloor(f.key)}
              >
                {f.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div role="tabpanel">
            <p className="ti-lead">{cur.lead}</p>
            <div className="mbti-cuon">
              <figure className="mbti">
                <Image
                  src={cur.map.src}
                  width={cur.map.w}
                  height={cur.map.h}
                  loading="lazy"
                  decoding="async"
                  alt={cur.map.alt}
                />
                {cur.pins.map((p, i) => (
                  <i
                    key={`${p.so}-${i}`}
                    className={`pin${p.sang ? " sang" : ""}`}
                    style={{ top: p.top, left: p.left, ["--c" as string]: p.c }}
                    data-ten={p.ten}
                    tabIndex={0}
                  >
                    {p.so}
                  </i>
                ))}
              </figure>
            </div>
            <p className="vuot">← Vuốt ngang để xem hết mặt bằng →</p>

            <div className={`cum${cur.key === "thuong" ? " c5" : ""}`}>
              {cur.groups.map((g) => (
                <div key={g.h3} className="nhom" style={{ ["--c" as string]: g.c }}>
                  <h3>{g.h3}</h3>
                  <ol>
                    {g.items.map((it) => (
                      <li key={`${it.so}-${it.ten}`}>
                        <i className={it.sang ? "sang" : ""}>{it.so}</i>
                        {it.ten}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <div className="anh-ti">
              {cur.photos.map((p) => (
                <figure key={p.src} onClick={() => openLightbox(p.src, p.cap)}>
                  <Image
                    src={p.src800 ?? p.src}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    decoding="async"
                    alt={p.alt}
                  />
                  <figcaption>{p.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16, color: "#D9C8B8" }}>
            Rê chuột hoặc chạm vào số trên mặt bằng để xem tên tiện ích. Tên và vị trí tiện ích theo
            website chủ đầu tư; hình ảnh mang tính minh họa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
