"use client";

import { useState } from "react";
import Image from "next/image";
import { ACC_ITEMS, TI_NHOM1, TI_NHOM2 } from "../data";
import { Reveal } from "../Reveal";

/* Accordion theo mẫu: hover (desktop) + bấm, mỗi ảnh có nhãn phối cảnh / ảnh thật */
export function AmenitiesSection() {
  const [on, setOn] = useState(0);

  return (
    <section className="sec bg-pale" id="tien-ich">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Tiện ích nội khu</h2>
            <p className="serif-lead">Mỗi ngày đều là kỳ nghỉ, ngay trong compound biệt lập</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="acc" id="acc">
            {ACC_ITEMS.map((it, i) => (
              <figure
                key={it.ten}
                className={on === i ? "on" : ""}
                onMouseEnter={() => setOn(i)}
                onClick={() => setOn(i)}
              >
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 760px) 100vw, 700px" : "(max-width: 760px) 50vw, 700px"}
                  loading="lazy"
                  className="object-cover"
                />
                <span className="nhan">{it.nhan}</span>
                <figcaption>
                  <span className="ten">{it.ten}</span>
                  <span className="mo">{it.mo}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="ti2">
            <div className="ti-box">
              <h3>Tiện ích nội khu The Aqua</h3>
              <ul>
                {TI_NHOM1.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="ti-box phu">
              <h3>Theo sơ đồ tiện ích chủ đầu tư</h3>
              <ul>
                {TI_NHOM2.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            Ảnh thực tế chụp tại các tiện ích đang vận hành trong khu đô thị Waterpoint; phối cảnh
            mang tính chất minh hoạ.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
