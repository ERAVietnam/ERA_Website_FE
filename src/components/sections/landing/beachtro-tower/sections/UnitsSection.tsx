"use client";

import { useState } from "react";
import Image from "next/image";
import { TOWERS, UNIT_LAYOUTS, VIEWS } from "../data";
import { IMG } from "../theme";
import { Quat, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";
import { btFormProduct } from "./form-product";

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function UnitsSection() {
  const [tab, setTab] = useState("studio");
  const openLightbox = useLightbox();
  const cur = UNIT_LAYOUTS.find((u) => u.key === tab)!;

  /* Nút "Nhận giá căn" — ghi loại căn rồi cuộn xuống form đăng ký */
  const nhanGia = (loai: string) => {
    btFormProduct.current = loai;
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
    const select = document.querySelector<HTMLSelectElement>("#dang-ky select[name='product']");
    if (select) select.value = loai;
  };

  return (
    <section className="sec" id="mat-bang">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Mặt bằng dự án <span className="nw">Beachtro Tower</span> – <span className="nw">Blanca City</span>{" "}
              <span className="dong2">4 tòa tháp · 4 hướng view panorama</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-wrap">
            <figure
              className="panel"
              onClick={() =>
                openLightbox(
                  `${IMG}/beachtro-tower-mat-bang-tang-dien-hinh-4-toa-lon.webp`,
                  "Mặt bằng tầng điển hình Beachtro Tower 4 tòa"
                )
              }
            >
              <Image
                src={`${IMG}/beachtro-tower-mat-bang-tang-dien-hinh-4-toa.webp`}
                width={1400}
                height={1041}
                loading="lazy"
                decoding="async"
                alt="Mặt bằng tầng điển hình Beachtro Tower 4 tòa E6, E7, E8, E9: căn Studio, 1BR+, 2BR, 2BR+, 3BR, 3BR+ và 4 hướng view"
              />
              <figcaption className="fcap">Mặt bằng tầng điển hình · bấm để phóng to, xem mã căn</figcaption>
            </figure>
            <ul className="toa" aria-label="4 tòa tháp">
              {TOWERS.map((t) => (
                <li key={t.b}>
                  <b>{t.b}</b>
                  <span>{t.span}</span>
                </li>
              ))}
            </ul>
            <ul className="views" aria-label="4 hướng view">
              {VIEWS.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="sub-h">Layout căn điển hình</h3>
          <p className="sub-p">Chiều cao tầng 3,5 m · diện tích theo tờ gập chủ đầu tư · bấm ảnh để phóng to</p>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn mẫu căn">
            {UNIT_LAYOUTS.map((u) => (
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
                src={cur.img800}
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
                Diện tích thông thủy / tim tường
                <b>{cur.dt}</b>
                {cur.extraLayout && (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="lk"
                      onClick={() => openLightbox(cur.extraLayout!.src, cur.extraLayout!.alt)}
                    >
                      xem layout mẫu lớn
                    </button>
                  </>
                )}
              </p>
              <button type="button" className="nut cursor-pointer" onClick={() => nhanGia(cur.loai)}>
                Nhận giá căn {cur.loai} {ARROW}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
