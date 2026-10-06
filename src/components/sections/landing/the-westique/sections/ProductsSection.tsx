"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FLOOR_PLANS,
  HANDOVER_STANDARDS,
  INTERIOR_GALLERY,
  PRODUCT_ROWS,
  UNIT_LAYOUTS,
} from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";
import { wqFormProduct } from "./form-product";

export function ProductsSection() {
  const [floor, setFloor] = useState(FLOOR_PLANS[0].key);
  const [layout, setLayout] = useState(UNIT_LAYOUTS[0].key);
  const openLightbox = useLightbox();
  const curFloor = FLOOR_PLANS.find((f) => f.key === floor)!;
  const curLayout = UNIT_LAYOUTS.find((l) => l.key === layout)!;

  /* Nút "Nhận bảng giá" — ghi loại căn rồi cuộn xuống form đăng ký */
  const nhanBaoGia = (loai: string) => {
    wqFormProduct.current = loai;
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
    const select = document.querySelector<HTMLSelectElement>("#dang-ky select[name='product']");
    if (select) select.value = loai;
  };

  return (
    <section className="sec bg-cream" id="san-pham">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="vach" aria-hidden="true"></span>
            <h2>
              Cơ cấu sản phẩm <span className="nw">The Westique</span>{" "}
              <span className="dong2">95 căn hộ Studio – 3 phòng ngủ và 4 shophouse</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="tbl-wrap">
            <table className="dt">
              <caption className="sr">Diện tích và số lượng từng loại sản phẩm The Westique Residences</caption>
              <thead>
                <tr>
                  <th scope="col">Loại sản phẩm</th>
                  <th scope="col" className="so">Số lượng</th>
                  <th scope="col" className="so">Tim tường<small>GFA, m²</small></th>
                  <th scope="col" className="so">Thông thủy<small>NSA, m²</small></th>
                </tr>
              </thead>
              <tbody>
                {PRODUCT_ROWS.map((r) => (
                  <tr key={r.loai}>
                    <td>{r.loai}</td>
                    <td className="so">{r.sl}</td>
                    <td className="so">{r.gfa}</td>
                    <td className="so">{r.nsa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="tbl-note">
              Diện tích theo tài liệu chủ đầu tư tháng 08/2026, mang tính tham khảo; số liệu chính
              xác theo hợp đồng mua bán.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-nut">
            <span>Nhận bảng giá từng căn</span>
            {[
              { loai: "Studio", label: "Studio" },
              { loai: "1 phòng ngủ", label: "1PN" },
              { loai: "2 phòng ngủ", label: "2PN" },
              { loai: "3 phòng ngủ", label: "3PN" },
              { loai: "Shophouse", label: "Shophouse" },
            ].map((b) => (
              <button key={b.loai} type="button" className="nut cursor-pointer" onClick={() => nhanBaoGia(b.loai)}>
                {b.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-wrap">
            <h3 className="sub-h">Mặt bằng căn hộ điển hình</h3>
            <p className="sub-p">8–10 căn mỗi sàn quanh lõi 3 thang máy</p>
            <div className="tabs" role="tablist" aria-label="Chọn tầng">
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
            <figure className="panel" role="tabpanel" onClick={() => openLightbox(curFloor.src, curFloor.alt)}>
              <Image
                src={curFloor.src800}
                width={curFloor.w}
                height={curFloor.h}
                loading="lazy"
                decoding="async"
                alt={curFloor.alt}
              />
            </figure>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-wrap">
            <h3 className="sub-h">Layout từng loại căn</h3>
            <p className="sub-p">12 loại layout · mỗi căn ghi rõ diện tích tim tường và thông thủy</p>
            <div className="tabs" role="tablist" aria-label="Chọn loại căn">
              {UNIT_LAYOUTS.map((l) => (
                <button
                  key={l.key}
                  type="button"
                  role="tab"
                  aria-selected={layout === l.key}
                  onClick={() => setLayout(l.key)}
                >
                  {l.tab}
                </button>
              ))}
            </div>
            <figure className="panel" role="tabpanel" onClick={() => openLightbox(curLayout.src, curLayout.alt)}>
              <Image
                src={curLayout.src800}
                width={curLayout.w}
                height={curLayout.h}
                loading="lazy"
                decoding="async"
                alt={curLayout.alt}
              />
            </figure>
          </div>
        </Reveal>

        <Reveal>
          <img className="ky ky-sub" src={`${IMG}/the-westique-residences-chu-ky-gu.svg`} width={92} height={64} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <h3 className="sub-h">Nội thất &amp; tiêu chuẩn bàn giao</h3>
          <p className="sub-p">“In urban rhythm” – tinh gọn, cân bằng, linh hoạt</p>
          <div className="nt">
            <figure onClick={() => openLightbox(INTERIOR_GALLERY[0].src, INTERIOR_GALLERY[0].cap)}>
              <Image
                src={INTERIOR_GALLERY[0].src800}
                width={INTERIOR_GALLERY[0].w}
                height={INTERIOR_GALLERY[0].h}
                loading="lazy"
                decoding="async"
                alt={INTERIOR_GALLERY[0].alt}
              />
              <figcaption>{INTERIOR_GALLERY[0].cap}</figcaption>
            </figure>
            <figure onClick={() => openLightbox(INTERIOR_GALLERY[1].src, INTERIOR_GALLERY[1].cap)}>
              <Image
                src={INTERIOR_GALLERY[1].src800}
                width={INTERIOR_GALLERY[1].w}
                height={INTERIOR_GALLERY[1].h}
                loading="lazy"
                decoding="async"
                alt={INTERIOR_GALLERY[1].alt}
              />
              <figcaption>{INTERIOR_GALLERY[1].cap}</figcaption>
            </figure>
            <div className="bg-box" style={{ gridRow: "span 2" }}>
              <h3>Tiêu chuẩn bàn giao</h3>
              <p>Theo tài liệu chủ đầu tư</p>
              <ul className="chk">
                {HANDOVER_STANDARDS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <figure onClick={() => openLightbox(INTERIOR_GALLERY[2].src, INTERIOR_GALLERY[2].cap)}>
              <Image
                src={INTERIOR_GALLERY[2].src800}
                width={INTERIOR_GALLERY[2].w}
                height={INTERIOR_GALLERY[2].h}
                loading="lazy"
                decoding="async"
                alt={INTERIOR_GALLERY[2].alt}
              />
              <figcaption>{INTERIOR_GALLERY[2].cap}</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
