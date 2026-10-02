"use client";

import { useState } from "react";
import Image from "next/image";
import { LOCATION_TABS, QUANH } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LocationSection() {
  const [tab, setTab] = useState("vitri");
  const openLightbox = useLightbox();
  const current = LOCATION_TABS.find((t) => t.key === tab) ?? LOCATION_TABS[0];

  return (
    <section className="sec" id="vi-tri">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>
              Nam Mekong Grand Plaza sở hữu vị trí “Kim Cương”
              <br />
              tại Vòng xoay WTC Gateway
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ maxWidth: 920, margin: "0 auto clamp(26px,3vw,38px)" }}>
            <p className="body">
              Tọa lạc tại trái tim của Thành phố Mới Bình Dương, Nam Mekong Grand Plaza sở hữu vị
              trí “vàng” ngay mặt tiền các trục lộ huyết mạch, gần công viên trung tâm Thành phố
              mới. Vị trí đắc địa này không chỉ mang đến không gian sống xanh mát, thoáng đãng mà
              còn giúp cư dân dễ dàng tiếp cận hệ thống tiện ích đẳng cấp quốc tế như Trung tâm hành
              chính tập trung, Trung tâm thương mại thế giớI (WTC) và các trường đại học hàng đầu
              chỉ trong vài phút di chuyển.
            </p>
            <p className="body">
              Với lợi thế kết nối đa chiều qua các tuyến giao thông trọng điểm như đường Mỹ Phước –
              Tân Vạn, Quốc lộ 13 và đường Vành đai 4, dự án trở thành cửa ngõ giao thương chiến
              lược giữa Bình Dương với TP.HCM và các vùng kinh tế trọng điểm phía Nam.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Chọn bản đồ">
            {LOCATION_TABS.map((t) => (
              <button
                key={t.key}
                className="tab"
                role="tab"
                type="button"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="pane vt">
          <figure className="map-fig" onClick={() => openLightbox(current.fig, current.cap)}>
            <Image
              src={current.fig}
              alt={current.figAlt}
              width={current.figW}
              height={current.figH}
              sizes="(max-width: 900px) 100vw, 740px"
              loading="lazy"
            />
            <figcaption className="fcap">{current.cap}</figcaption>
          </figure>
          <aside className="phut" aria-label={current.title}>
            <h3>{current.title}</h3>
            {current.items.map((it) => (
              <div className="rt" key={it.b}>
                <b>{it.b}</b>
                <span>{it.span}</span>
              </div>
            ))}
          </aside>
        </div>

        <Reveal>
          <div className="box" style={{ marginTop: "clamp(26px,3vw,38px)" }}>
            <h3 className="card-h">Quanh dự án (theo tài liệu chủ đầu tư)</h3>
            <ul className="quanh" style={{ marginTop: 12 }}>
              {QUANH.map((q) => (
                <li key={q.name}>
                  {q.name} <b>{q.d}</b>
                </li>
              ))}
            </ul>
            <p className="note" style={{ margin: "14px 0 0" }}>
              Khoảng cách và thờI gian di chuyển theo tài liệu của chủ đầu tư, mang tính tham khảo.
              Các tuyến metro, Vành đai 4 đang ở giai đoạn quy hoạch/triển khai.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
