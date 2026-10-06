"use client";

import { useState } from "react";
import Image from "next/image";
import { DESIGN_ICONS, DESIGN_PLUS, FLOOR_PLANS, UNIT_MIX, UNIT_TYPES } from "../data";
import { AMark, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";
import { aspFormProduct } from "./form-product";

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function UnitsSection() {
  const [unit, setUnit] = useState("2pn");
  const [floor, setFloor] = useState("t430");
  const openLightbox = useLightbox();
  const cur = UNIT_TYPES.find((u) => u.key === unit)!;
  const curFloor = FLOOR_PLANS.find((f) => f.key === floor)!;

  /* Nút "Nhận báo giá" — ghi loại căn rồi cuộn xuống form đăng ký */
  const nhanBaoGia = (loai: string) => {
    aspFormProduct.current = loai;
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
    const select = document.querySelector<HTMLSelectElement>("#dang-ky select[name='product']");
    if (select) select.value = loai;
  };

  return (
    <section className="sec bg-cream" id="mat-bang">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <AMark />
            <h2>
              Mặt bằng &amp; loại căn hộ <span className="nw">The Aspira</span>{" "}
              <span className="dong2">1.204 căn hộ từ 1 đến 2 phòng ngủ và 8 shophouse khối đế</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <ul className="co-cau" aria-label="Cơ cấu sản phẩm">
            {UNIT_MIX.map((u) => (
              <li key={u.em} style={{ ["--p" as string]: u.p }}>
                <em>{u.em}</em>
                <b>{u.b}</b>
                <span>{u.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Loại căn">
            {UNIT_TYPES.map((u) => (
              <button
                key={u.key}
                type="button"
                role="tab"
                aria-selected={unit === u.key}
                onClick={() => setUnit(u.key)}
              >
                {u.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="can" role="tabpanel">
            <div className="can-anh">
              <figure
                onClick={() => openLightbox(cur.layout.src, cur.layout.cap)}
              >
                <Image
                  src={cur.layout.src800 ?? cur.layout.src}
                  width={cur.layout.w}
                  height={cur.layout.h}
                  loading="lazy"
                  decoding="async"
                  alt={cur.layout.alt}
                />
                <figcaption>{cur.layout.cap}</figcaption>
              </figure>
            </div>
            <div className="spec-box">
              <em>{cur.em}</em>
              <h3>{cur.h3}</h3>
              {cur.dt && (
                <div className="dt">
                  <div>
                    <i>Tim tường</i>
                    <b>{cur.dt.gfa}</b>
                  </div>
                  <div>
                    <i>Thông thủy</i>
                    <b>{cur.dt.nsa}</b>
                  </div>
                </div>
              )}
              <ul className="chk">
                {cur.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {cur.render3d && (
                <figure
                  style={{ marginTop: 14 }}
                  onClick={() => openLightbox(cur.render3d!.src, "Phối cảnh 3D")}
                >
                  <Image
                    src={cur.render3d.src800}
                    width={cur.render3d.w}
                    height={cur.render3d.h}
                    loading="lazy"
                    decoding="async"
                    alt={cur.render3d.alt}
                  />
                  <figcaption>Phối cảnh 3D</figcaption>
                </figure>
              )}
              <button type="button" className="nut cursor-pointer" onClick={() => nhanBaoGia(cur.loai)}>
                Nhận báo giá {cur.tab.toLowerCase() === "shophouse" ? "shophouse" : cur.tab} {ARROW}
              </button>
              <p className="spec-foot">{cur.foot}</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ul className="cong" aria-label="Điểm cộng thiết kế">
            {DESIGN_PLUS.map((t, i) => (
              <li key={i}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {DESIGN_ICONS[i]}
                </svg>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="mb-h">
            <h3>Mặt bằng tầng điển hình 2 tháp</h3>
            <p>Bấm vào mặt bằng để phóng to, xem vị trí từng căn.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Mặt bằng tầng">
            {FLOOR_PLANS.map((f) => (
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
          <figure className="mb-tang" role="tabpanel" onClick={() => openLightbox(curFloor.zoom, curFloor.alt)}>
            <Image
              src={curFloor.src}
              width={curFloor.w}
              height={curFloor.h}
              loading="lazy"
              decoding="async"
              alt={curFloor.alt}
            />
          </figure>
          <ul className="thap" aria-label="Tên 2 tháp">
            <li className="t">2 tháp:</li>
            <li>Sunara</li>
            <li>Moonara</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
