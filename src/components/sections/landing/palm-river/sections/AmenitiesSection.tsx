"use client";

import { useState } from "react";
import Image from "next/image";
import { AMENITY_FLOORS, TI_BOX1, TI_BOX2, TI_BOX2_IMG, TI_SLIDES } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";
import { Slider } from "./Slider";

export function AmenitiesSection() {
  const [floor, setFloor] = useState(AMENITY_FLOORS[0].key);
  const openLightbox = useLightbox();
  const cur = AMENITY_FLOORS.find((f) => f.key === floor)!;

  return (
    <section className="sec bg-sand" id="tien-ich">
      <div className="wrap">
        <div className="ti-top">
          <Reveal>
            <div>
              <p className="ky">68 tiện ích nghỉ dưỡng giữa lòng thành phố</p>
              <h2>Tiện ích</h2>
              <svg className="song trai" aria-hidden="true">
                <use href="#song" />
              </svg>
              <p className="body" style={{ marginTop: 18 }}>
                Hệ tiện ích Palm River trải trên tầng 1, tầng 2 và tầng 20, mọi cư dân của 4 tòa
                tháp đều được sử dụng — từ hồ bơi 70 m giữa vườn nhiệt đới đến Sky Onsen và hồ bơi
                vô cực trên cao.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <figure
              className="zoomable"
              onClick={() =>
                openLightbox(`${IMG}/palm-river-toan-canh-tu-tren-cao.webp`, "Toàn cảnh Palm River từ trên cao")
              }
            >
              <Image
                src={`${IMG}/palm-river-toan-canh-tu-tren-cao-800.webp`}
                width={1400}
                height={750}
                loading="lazy"
                decoding="async"
                alt="Toàn cảnh Palm River từ trên cao: khu đất 2,7 km mặt tiền sông, công viên ven sông và cao tốc phía trước"
              />
            </figure>
          </Reveal>
        </div>

        <div className="ti-2">
          <Reveal>
            <div className="ti-box">
              <h3 className="card-h">Tiện ích nội khu – nghỉ dưỡng trên cao</h3>
              <ul>
                {TI_BOX1.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="ti-box">
              <h3 className="card-h">Tiện ích ven sông &amp; ngoại khu</h3>
              <ul>
                {TI_BOX2.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <figure
                className="zoomable"
                onClick={() => openLightbox(TI_BOX2_IMG.src, TI_BOX2_IMG.alt)}
              >
                <Image
                  src={TI_BOX2_IMG.src}
                  width={TI_BOX2_IMG.w}
                  height={TI_BOX2_IMG.h}
                  loading="lazy"
                  decoding="async"
                  alt={TI_BOX2_IMG.alt}
                />
              </figure>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <Slider slides={TI_SLIDES} ariaLabel="Tiện ích tiêu biểu Palm River" />
        </Reveal>

        {/* 68 tiện ích theo tầng — số thứ tự đúng sơ đồ brochure CĐT; tầng xếp từ dưới lên như mặt cắt tòa nhà */}
        <Reveal>
          <div className="tang-wrap">
            <div className="tang-nut" role="tablist" aria-label="Chọn tầng tiện ích">
              {AMENITY_FLOORS.map((f) => (
                <button
                  key={f.key}
                  className="tab"
                  role="tab"
                  type="button"
                  aria-selected={floor === f.key}
                  onClick={() => setFloor(f.key)}
                >
                  {f.label} <small>{f.small}</small>
                </button>
              ))}
            </div>
            <div className="pane tang-list" role="tabpanel">
              <h3>{cur.title}</h3>
              <ol>
                {cur.items.map((it, i) => (
                  <li key={it}>
                    <i>{cur.start + i}</i>
                    {it}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            Danh mục và hình ảnh tiện ích theo brochure chủ đầu tư, mang tính chất minh họa. Dự án có
            nhà trẻ 1.404,52 m².
          </p>
        </Reveal>
      </div>
    </section>
  );
}
