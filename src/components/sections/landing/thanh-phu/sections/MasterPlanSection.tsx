"use client";

import { useState } from "react";
import Image from "next/image";
import { HOI_PHU_DETAIL, MASTER_PLANS, STREET_WIDTHS, SUBDIVISIONS } from "../data";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function MasterPlanSection() {
  const [tab, setTab] = useState(MASTER_PLANS[0].key);
  const openLightbox = useLightbox();
  const cur = MASTER_PLANS.find((p) => p.key === tab)!;

  return (
    <section className="sec" id="mat-bang">
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
              Mặt bằng GĐ1 <span className="nw">Miền Thương Phú</span>{" "}
              <span className="dong2">1 trục đô thị – 3 tầng giao thương – 6 cộng đồng</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-wrap">
            <div className="tabs" role="tablist" aria-label="Chọn phân khu">
              {MASTER_PLANS.map((p) => (
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
            <figure className="panel" role="tabpanel" onClick={() => openLightbox(cur.src, cur.alt)}>
              <Image
                src={cur.src}
                width={cur.w}
                height={cur.h}
                loading="lazy"
                decoding="async"
                alt={cur.alt}
              />
            </figure>
          </div>
        </Reveal>

        <Reveal>
          <ul className="pk" aria-label="Các phân khu giai đoạn 1">
            {SUBDIVISIONS.map((p) => (
              <li key={p.b}>
                <b>{p.b}</b>
                <em>{p.em}</em>
                <span>{p.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="mb-wrap" style={{ marginBottom: 0 }}>
            <h3 className="sub-h">
              Mặt bằng chi tiết <span className="nw">phân khu Hội Phú</span>
            </h3>
            <p className="sub-p">Từng dãy nhà phố thương mại và liền kề quanh hồ trung tâm · bấm để phóng to, xem mã lô</p>
            <figure className="panel" onClick={() => openLightbox(HOI_PHU_DETAIL.zoom, HOI_PHU_DETAIL.alt)}>
              <Image
                src={HOI_PHU_DETAIL.src}
                width={HOI_PHU_DETAIL.w}
                height={HOI_PHU_DETAIL.h}
                loading="lazy"
                decoding="async"
                alt={HOI_PHU_DETAIL.alt}
              />
            </figure>
            <ul className="lg" aria-label="Lộ giới đường nội khu">
              <li className="t">Đường nội khu lộ giới</li>
              {STREET_WIDTHS.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
