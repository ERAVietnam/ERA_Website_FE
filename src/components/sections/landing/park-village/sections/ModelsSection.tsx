"use client";

import { useState } from "react";
import Image from "next/image";
import { CMP_ROWS, MODELS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";
import { usePopup } from "./PopupForm";

export function ModelsSection() {
  const [tab, setTab] = useState(MODELS[0].key);
  const openLightbox = useLightbox();
  const openPopup = usePopup();
  const current = MODELS.find((m) => m.key === tab) ?? MODELS[0];

  return (
    <section className="sec" id="nha-mau">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Các sản phẩm nhà mẫu</h2>
            <p className="serif-lead">Garden Grand Villa · Park Grand Villa · Canal Grand Villa</p>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">
            Park Village có ba mẫu Grand Villa tiêu biểu: Garden Grand Villa VB1.1 (đất ~300 m²,
            sàn ~268 m²), Park Grand Villa VB2.1 (đất ~300 m², sàn ~296 m²) và Canal Grand Villa
            VB3.1 (đất ~468 m², sàn ~458 m², có hồ bơi riêng), đều 4 phòng ngủ.
          </p>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn mẫu nhà">
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
              <button className="tang" type="button" onClick={() => openLightbox(current.tangImg, `Mặt bằng ${current.name}`)}>
                <Image
                  src={current.tangImg}
                  alt={current.tangAlt}
                  width={current.tangW}
                  height={current.tangH}
                  sizes="(max-width: 900px) 100vw, 500px"
                  loading="lazy"
                />
                Xem mặt bằng tầng 1 · tầng 2
              </button>
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
                Mẫu tiêu biểu, vị trí căn điển hình minh hoạ. Thông tin chính thức căn cứ theo hợp
                đồng mua bán.
              </p>
              <button
                className="btn"
                type="button"
                onClick={() =>
                  openPopup(
                    `Nhận thông tin mẫu ${current.code}`,
                    `Em gửi mặt bằng, phối cảnh và giá mẫu ${current.name} ${current.code} qua Zalo ngay khi chủ đầu tư công bố.`
                  )
                }
              >
                {current.btn}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="cmp-scroll">
            <table className="cmp">
              <caption>So sánh ba mẫu Grand Villa</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: "left" }}>
                    Mẫu
                  </th>
                  <th scope="col">Diện tích đất</th>
                  <th scope="col">Sàn sử dụng</th>
                  <th scope="col">Phòng ngủ</th>
                  <th scope="col">WC</th>
                  <th scope="col">Điểm riêng</th>
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
                    <td data-l="Điểm riêng">{r.rieng}</td>
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
