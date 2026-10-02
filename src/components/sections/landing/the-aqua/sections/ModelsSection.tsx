"use client";

import { useState } from "react";
import Image from "next/image";
import { CMP_ROWS, MODELS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function ModelsSection() {
  const [tab, setTab] = useState(MODELS[0].key);
  const openLightbox = useLightbox();
  const current = MODELS.find((m) => m.key === tab) ?? MODELS[0];

  return (
    <section className="sec" id="nha-mau">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Các sản phẩm nhà mẫu</h2>
            <p className="serif-lead">Đa dạng mẫu thiết kế thể hiện chất riêng của Gia Chủ</p>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">
            The Aqua có bốn dòng Grand Villa theo vị thế. Mẫu tiêu biểu: Harborfront VC3.1 (đất ~20
            x 30 m, sàn ~568 m²), Riverfront VC1.1 (đất ~20 x 30 m, sàn ~427 m²), Canal VC1.2 (đất
            ~20 x 30 m, sàn ~425 m²) và Garden VB1.1 (đất ~15 x 20 m, sàn ~299 m²).
          </p>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn dòng sản phẩm">
            {MODELS.map((m) => (
              <button
                key={m.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={tab === m.key}
                onClick={() => setTab(m.key)}
              >
                {m.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="pane mau-card" role="tabpanel" aria-label={current.name}>
            <div className="hinh">
              <figure onClick={() => openLightbox(current.img, current.name)}>
                <Image
                  src={current.img}
                  alt={current.imgAlt}
                  width={current.w}
                  height={current.h}
                  sizes="(max-width: 900px) 100vw, 700px"
                  loading="lazy"
                />
              </figure>
              <p className="goi-y">Phối cảnh, vị trí lô và mặt bằng từng tầng · bấm để phóng to</p>
            </div>
            <div className="mau-info">
              <div className="code">
                {current.code}
                <small>{current.codeSub}</small>
              </div>
              <h3>{current.name}</h3>
              <p className="ds">{current.ds}</p>
              <dl>
                {current.specs.map((s) => (
                  <div key={s.k} style={{ display: "contents" }}>
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="fine">
                Mẫu tiêu biểu; diện tích thay đổi tuỳ vị trí lô đất. Thông tin chính thức căn cứ
                theo hợp đồng mua bán.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="cmp-scroll">
            <table className="cmp">
              <caption>So sánh bốn mẫu Grand Villa</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: "left" }}>
                    Mẫu
                  </th>
                  <th scope="col">Diện tích đất</th>
                  <th scope="col">Sàn sử dụng</th>
                  <th scope="col">Phòng ngủ</th>
                  <th scope="col">WC</th>
                  <th scope="col">Tầng · mái</th>
                </tr>
              </thead>
              <tbody>
                {CMP_ROWS.map((r) => (
                  <tr key={r.mau}>
                    <th scope="row">{r.mau}</th>
                    <td data-l="Diện tích đất">{r.dat}</td>
                    <td data-l="Sàn sử dụng">{r.san}</td>
                    <td data-l="Phòng ngủ">{r.pn}</td>
                    <td data-l="WC">{r.wc}</td>
                    <td data-l="Tầng · mái">{r.tang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
