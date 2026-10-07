"use client";

import { useState } from "react";
import Image from "next/image";
import { COLLECTION_ROWS, INTERIOR_RENDER, UNIT_TYPES } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";
import { gsFormProduct } from "./form-product";

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function UnitsSection() {
  const [tab, setTab] = useState("studio");
  const openLightbox = useLightbox();
  const cur = UNIT_TYPES.find((u) => u.key === tab)!;

  /* Nút "Nhận giá căn" — ghi loại căn rồi cuộn xuống form đăng ký */
  const nhanGia = (loai: string) => {
    gsFormProduct.current = loai;
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
    const select = document.querySelector<HTMLSelectElement>("#dang-ky select[name='product']");
    if (select) select.value = loai;
  };

  return (
    <section className="sec bg-paper" id="can-ho">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">May đo từng nhịp sống</p>
            <h2>
              Bộ sưu tập căn hộ{" "}
              <span className="dong2">Diện tích tim tường (GFA) / diện tích sử dụng (NFA) theo tài liệu chủ đầu tư</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="bst-wrap">
            <table className="bst">
              <caption className="sr">Bộ sưu tập căn hộ Green Skyline: số căn và diện tích</caption>
              <thead>
                <tr>
                  <th scope="col">Loại căn</th>
                  <th scope="col">Số căn</th>
                  <th scope="col">Tim tường (GFA)</th>
                  <th scope="col">Sử dụng (NFA)</th>
                </tr>
              </thead>
              <tbody>
                {COLLECTION_ROWS.map((r) => (
                  <tr key={r.loai}>
                    <th scope="row">{r.loai}</th>
                    <td className="so">{r.so}</td>
                    <td>{r.gfa}</td>
                    <td>{r.nfa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="sub-h">Layout căn hộ</h3>
          <p className="sub-p">Mẫu đại diện từng loại căn · bấm ảnh để phóng to</p>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn loại căn hộ">
            {UNIT_TYPES.map((u) => (
              <button
                key={u.key}
                type="button"
                role="tab"
                aria-selected={tab === u.key}
                onClick={() => setTab(u.key)}
              >
                {u.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="lo" role="tabpanel">
            <figure onClick={() => openLightbox(cur.img, cur.alt)}>
              <Image
                src={cur.img800 ?? cur.img}
                width={cur.w}
                height={cur.h}
                loading="lazy"
                decoding="async"
                alt={cur.alt}
              />
            </figure>
            <div className="spec-box">
              <em>{cur.em}</em>
              <h3>{cur.h3}</h3>
              <ul className="chk">
                {cur.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="spec-dt">
                Tim tường (GFA) / sử dụng (NFA)
                <b>{cur.dt}</b>
                {cur.extraLayout && (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="lk"
                      onClick={() => openLightbox(cur.extraLayout!.src, cur.extraLayout!.alt)}
                    >
                      xem layout
                    </button>
                  </>
                )}
              </p>
              <button type="button" className="nut cursor-pointer" onClick={() => nhanGia(cur.loai)}>
                Nhận giá căn {cur.tab} {ARROW}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="sub-h nt-h">Phối cảnh nội thất căn hộ mẫu</h3>
          <p className="sub-p">
            Ảnh phối cảnh của chủ đầu tư, mang tính chất minh họa · căn hộ bàn giao theo danh mục
            tiêu chuẩn bên dưới
          </p>
          <div className="nt">
            {INTERIOR_RENDER.map((g) => (
              <figure key={g.src} onClick={() => openLightbox(g.src, g.cap)}>
                <Image
                  src={g.src}
                  width={g.w}
                  height={g.h}
                  loading="lazy"
                  decoding="async"
                  alt={g.alt}
                />
                <figcaption>{g.cap}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
