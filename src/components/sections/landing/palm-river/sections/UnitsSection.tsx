"use client";

import { useState } from "react";
import Image from "next/image";
import { CMP_ROWS, UNITS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";
import { prFormProduct } from "./form-product";

export function UnitsSection() {
  const [unit, setUnit] = useState(UNITS[0].key);
  const openLightbox = useLightbox();
  const cur = UNITS.find((u) => u.key === unit)!;

  const nhanRoHang = (can: string) => {
    prFormProduct.current = can;
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sec" id="can-ho">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Layout căn hộ</h2>
            <svg className="song" aria-hidden="true">
              <use href="#song" />
            </svg>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn loại căn">
            {UNITS.map((u) => (
              <button
                key={u.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={unit === u.key}
                onClick={() => setUnit(u.key)}
              >
                {u.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="pane can-card">
            {cur.duplex ? (
              <div className="can-trong">
                <svg className="song" aria-hidden="true" style={{ margin: 0, width: 160, height: 30 }}>
                  <use href="#song" />
                </svg>
                <p>
                  Layout Duplex và Penthouse được gửi riêng cùng rổ hàng — số lượng giới hạn ở các
                  tầng cao.
                </p>
              </div>
            ) : (
              <figure
                className="zoomable cursor-zoom-in"
                onClick={() => cur.img && openLightbox(cur.img.replace("-800.webp", ".webp"), cur.imgAlt ?? "")}
              >
                <Image
                  src={cur.img!}
                  width={cur.w!}
                  height={cur.h!}
                  loading="lazy"
                  decoding="async"
                  alt={cur.imgAlt ?? ""}
                />
              </figure>
            )}
            <div className="can-info">
              <div className="code">
                {cur.code}
                <small>{cur.codeSub}</small>
              </div>
              <p className="ds">{cur.ds}</p>
              <dl>
                {cur.specs.map((s) => (
                  <div key={s.k} style={{ display: "contents" }}>
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
              <button type="button" className="btn cursor-pointer" onClick={() => nhanRoHang(cur.btnCan)}>
                {cur.btn}
              </button>
              <p className="fine">{cur.fine}</p>
            </div>
          </div>
        </Reveal>

        {/* <Reveal>
          <table className="cmp">
            <caption>Diện tích tham khảo các loại căn (theo mặt bằng chủ đầu tư)</caption>
            <thead>
              <tr>
                <th scope="col">Loại căn</th>
                <th scope="col">Tim tường (GSA)</th>
                <th scope="col">Thông thủy (NSA)</th>
              </tr>
            </thead>
            <tbody>
              {CMP_ROWS.map((r) => (
                <tr key={r.loai}>
                  <th scope="row">{r.loai}</th>
                  <td data-l="Tim tường">{r.gsa}</td>
                  {r.nsa ? (
                    <td data-l="Thông thủy">{r.nsa}</td>
                  ) : (
                    <td data-l="Diện tích" colSpan={2}>
                      {r.gsa}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal> */}
      </div>
    </section>
  );
}
