"use client";

import { useState } from "react";
import Image from "next/image";
import { ACC_ITEMS, TI_NGOAI, TI_TRONG } from "../data";
import { Reveal } from "../Reveal";

/* Accordion theo mẫu: hover (desktop) + bấm (mọi nơi) để mở rộng thẻ */
export function AmenitiesSection() {
  const [on, setOn] = useState(0);

  return (
    <section className="sec bg-pale" id="tien-ich">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Tiện ích nội khu</h2>
            <p className="serif-lead">Khởi tạo cảm hứng từ chuỗi trải nghiệm ngay trước thềm nhà</p>
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
              <h3>Từ ngoài trờI</h3>
              <ul>
                {TI_NGOAI.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="ti-box trong">
              <h3>Đến trong nhà</h3>
              <div className="cl">Clubhouse</div>
              <ul>
                {TI_TRONG.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
