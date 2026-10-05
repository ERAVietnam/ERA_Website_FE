"use client";

import Image from "next/image";
import { BIM_PROJECTS, PROJECT_PARTIES, PROGRESS_PHOTOS } from "../data";
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
            <svg className="hoa" viewBox="0 0 32 32" aria-hidden="true">
              <g fill="currentColor">
                <ellipse cx="16" cy="8" rx="2.6" ry="7" />
                <ellipse cx="16" cy="24" rx="2.6" ry="7" />
                <ellipse cx="8" cy="16" rx="7" ry="2.6" />
                <ellipse cx="24" cy="16" rx="7" ry="2.6" />
              </g>
            </svg>
            <h2>
              Nhà phát triển BIM Land <span className="dong2">Đơn vị bất động sản của Tập đoàn BIM Group</span>
            </h2>
          </div>
        </Reveal>

        <div className="cdt">
          <Reveal>
            <div>
              <div className="cdt-logo">
                <Image
                  src={`${IMG}/bim-land-logo.webp`}
                  alt="Logo BIM Land – nhà phát triển Thanh Phú Centre Point"
                  width={360}
                  height={77}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3>Hơn 30 năm phát triển</h3>
              <p className="body">
                BIM Land là đơn vị bất động sản của Tập đoàn BIM Group, hơn 30 năm phát triển. Định
                hướng phát triển của BIM Land: giá trị bền vững, tiêu chuẩn công trình xanh EDGE và
                tôn vinh văn hóa bản địa.
              </p>
              <div className="nhom-cdt">
                <p>Dự án tiêu biểu</p>
                <ul className="chips">
                  {BIM_PROJECTS.map((p) => (
                    <li key={p} className={p === "Thanh Phú Centre Point" ? "hl" : ""}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="tv" aria-label="Đơn vị tham gia dự án">
              {PROJECT_PARTIES.map((t) => (
                <li key={t.b}>
                  <i>{t.i}</i>
                  <b>{t.b}</b>
                  {t.span ? <span>{t.span}</span> : null}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="td-h">
            <h3 className="sub-h">Tiến độ thi công</h3>
            <p className="sub-p" style={{ margin: 0 }}>
              Hình ảnh công trường ngày 24/08/2026
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="ev">
            {PROGRESS_PHOTOS.map((p) => (
              <figure key={p.src} onClick={() => openLightbox(p.src, p.alt)}>
                <Image
                  src={p.src}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  decoding="async"
                  alt={p.alt}
                />
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
