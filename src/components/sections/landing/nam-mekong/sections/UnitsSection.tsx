"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";
import { AREA_ROWS, TC, UNITS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function UnitsSection() {
  const [tab, setTab] = useState(UNITS[0].key);
  const openLightbox = useLightbox();
  const current = UNITS.find((u) => u.key === tab) ?? UNITS[0];

  return (
    <section className="sec" id="can-ho">
      <div className="wrap">
        <div className="nm-top">
          <Reveal>
            <div>
              <h2>Nhà mẫu Nam Mekong Grand Plaza</h2>
              <p className="body" style={{ marginTop: 18 }}>
                Nhà mẫu Nam Mekong Grand Plaza Bình Dương được phát triển nhằm giúp khách hàng
                hình dung rõ nhất về không gian sống, phong cách thiết kế và tiêu chuẩn bàn giao
                của dự án. Với hai dòng căn hộ 2 phòng ngủ và 3 phòng ngủ, nhà mẫu thể hiện triết
                lý thiết kế hiện đại, tối ưu diện tích sử dụng, đồng thờI mang đến trải nghiệm sống
                sang trọng phù hợp cho gia đình trẻ, chuyên gia và khách hàng có nhu cầu an cư lâu
                dài.
              </p>
              <p className="body">
                Không chỉ đơn thuần là nơi trưng bày nội thất, nhà mẫu còn phản ánh định hướng
                phát triển của Nam Mekong Grand Plaza: tối ưu công năng, đề cao tính thẩm mỹ và tạo
                nên không gian sống tiện nghi ngay giữa trung tâm phường Bình Dương, TP.HCM.
              </p>
              <div className="mau-2">
                <div>
                  <b>65 m²</b>
                  <span>Nhà mẫu căn 2PN</span>
                </div>
                <div>
                  <b>85 m²</b>
                  <span>Nhà mẫu căn 3PN</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <figure
                onClick={() =>
                  openLightbox(
                    `${IMG}/nam-mekong-grand-plaza-phong-khach-can-ho-view-ban-cong.webp`,
                    "Phòng khách căn hộ mẫu Nam Mekong Grand Plaza"
                  )
                }
              >
                <Image
                  src={`${IMG}/nam-mekong-grand-plaza-phong-khach-can-ho-view-ban-cong.webp`}
                  alt="Phòng khách căn hộ Nam Mekong Grand Plaza với cửa kính Low-E hai lớp mở ra ban công nhìn thành phố"
                  width={1400}
                  height={788}
                  sizes="(max-width: 900px) 100vw, 520px"
                  loading="lazy"
                />
              </figure>
              <ul>
                <li>Thiết kế tối ưu ánh sáng và thông gió tự nhiên.</li>
                <li>Trần cao tạo cảm giác rộng rãi.</li>
                <li>Không gian liên thông giữa phòng khách và phòng ăn.</li>
                <li>Nội thất hiện đại theo xu hướng quốc tế.</li>
                <li>Màu sắc trung tính, sang trọng và bền theo thờI gian.</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="head" style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: "clamp(20px,2.2vw,28px)" }}>Các dòng căn hộ</h2>
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
                aria-selected={tab === u.key}
                onClick={() => setTab(u.key)}
              >
                {u.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="pane can-card" role="tabpanel" aria-label={current.tab}>
            <figure onClick={() => openLightbox(current.img, `${current.tab} Nam Mekong Grand Plaza`)}>
              <Image
                src={current.img}
                alt={current.alt}
                width={current.w}
                height={current.h}
                sizes="(max-width: 900px) 100vw, 700px"
                loading="lazy"
              />
            </figure>
            <div className="can-info">
              <div className="code">
                {current.code}
                <small>{current.codeSub}</small>
              </div>
              <p className="ds">{current.ds}</p>
              <dl>
                {current.specs.map((s) => (
                  <div key={s.k} style={{ display: "contents" }}>
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="fine">{current.fine}</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <table className="cmp">
            <caption>Diện tích các loại sản phẩm (theo tài liệu chủ đầu tư)</caption>
            <thead>
              <tr>
                <th scope="col">Loại sản phẩm</th>
                <th scope="col">Diện tích</th>
              </tr>
            </thead>
            <tbody>
              {AREA_ROWS.map((r) => (
                <tr key={r.loai}>
                  <th scope="row">{r.loai}</th>
                  <td>{r.dt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <div className="tc">
            {TC.map((t) => (
              <div key={t.b}>
                <b>{t.b}</b>
                <span>{t.span}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
