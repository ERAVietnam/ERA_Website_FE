"use client";

import Image from "next/image";
import { AWARDS, CONSULTANTS, VCRE_PROJECTS } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function InvestorSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="chu-dau-tu">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="vach" aria-hidden="true"></span>
            <h2>
              VCRE – nhà phát triển boutique{" "}
              <span className="dong2">Công ty Cổ phần Bất động sản Bản Việt (Viet Capital Real Estate)</span>
            </h2>
          </div>
        </Reveal>

        <div className="cdt">
          <Reveal>
            <div>
              <div className="cdt-logo">
                <Image
                  src={`${IMG}/vcre-logo.webp`}
                  alt="Logo VCRE – Viet Capital Real Estate, chủ đầu tư The Westique Residences"
                  width={300}
                  height={98}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3>Boutique là định hướng phát triển được theo đuổi lâu dài</h3>
              <p className="body">
                VCRE theo đuổi định hướng Boutique Developer: quy mô hữu hạn, kiến trúc điểm nhấn,
                không gian tinh tuyển. Theo tài liệu chủ đầu tư, VCRE thuộc hệ sinh thái Phoenix
                Holdings – trải trên các lĩnh vực tài chính (Vietcap, BVBank, VCAM, VietCredit),
                F&amp;B (McDonald&apos;s, 7-Eleven), thể thao (Saigon Heat) và truyền thông (Beacon
                Media).
              </p>
              <div className="nhom-cdt">
                <p>Danh mục dự án VCRE</p>
                <ul className="chips">
                  {VCRE_PROJECTS.map((p) => (
                    <li key={p.b} className={p.hl ? "hl" : ""}>
                      {p.b} <small>· {p.s}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="giai">
              {AWARDS.map((a) => (
                <figure key={a.b} onClick={() => openLightbox(a.src, a.b)}>
                  <Image
                    src={a.src800 ?? a.src}
                    width={a.w}
                    height={a.h}
                    loading="lazy"
                    decoding="async"
                    alt={a.alt}
                  />
                  <figcaption>
                    <b>{a.b}</b>
                    {a.span}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ul className="tv" aria-label="Đội ngũ tư vấn">
            {CONSULTANTS.map((t) => (
              <li key={t.b}>
                <b>{t.b}</b>
                <span>{t.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
