"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";
import { tpFormProduct } from "./form-product";

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ProductsSection() {
  const [tab, setTab] = useState(PRODUCTS[0].key);
  const openLightbox = useLightbox();
  const cur = PRODUCTS.find((p) => p.key === tab)!;

  /* Nút "Nhận báo giá" — ghi loại sản phẩm rồi cuộn xuống form đăng ký */
  const nhanBaoGia = (loai: string) => {
    tpFormProduct.current = loai;
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
    const select = document.querySelector<HTMLSelectElement>("#dang-ky select[name='product']");
    if (select) select.value = loai;
  };

  return (
    <section className="sec bg-cream" id="san-pham">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <svg className="hoa" viewBox="0 0 32 32" aria-hidden="true">
              <g fill="currentColor">
                <ellipse cx="16" cy="8" rx="2.6" ry="7" />
                <ellipse cx="16" cy="24" rx="2.6" ry="7" />
                <ellipse cx="8" cy="16" rx="7" ry="2.6" />
                <ellipse cx="24" cy="16" rx="7" ry="2.6" />
              </g>
            </svg>
            <h2>
              Thiết kế sản phẩm <span className="dong2">Kiến trúc Codinachs Architects (Tây Ban Nha)</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn loại sản phẩm">
            {PRODUCTS.map((p) => (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={tab === p.key}
                onClick={() => setTab(p.key)}
              >
                {p.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="sp" role="tabpanel">
            <figure onClick={() => openLightbox(cur.img, cur.figCap)}>
              <Image
                src={cur.img}
                width={cur.iw}
                height={cur.ih}
                loading="lazy"
                decoding="async"
                alt={cur.imgAlt}
              />
              <figcaption>{cur.figCap}</figcaption>
            </figure>
            <div className="spec-box">
              <em>{cur.em}</em>
              <h3>{cur.h3}</h3>
              <ul className="chk">
                {cur.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="spec-gia">
                {cur.giaLabel}
                <b>{cur.gia}</b>
                <a
                  href="#bang-gia"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#bang-gia")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Xem bảng giá
                </a>
              </p>
              <button type="button" className="nut cursor-pointer" onClick={() => nhanBaoGia(cur.loai)}>
                {cur.cta} {ARROW}
              </button>
            </div>
            <figure className="mb" onClick={() => openLightbox(cur.mb, cur.mbAlt)}>
              <Image
                src={cur.mb}
                width={cur.mbW}
                height={cur.mbH}
                loading="lazy"
                decoding="async"
                alt={cur.mbAlt}
              />
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
