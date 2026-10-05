"use client";

import Image from "next/image";
import { INFRASTRUCTURE, LOCATION_FACT, TRAVEL_TIMES } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LocationSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="vi-tri">
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
              Vị trí <span className="nw">Thanh Phú Centre Point</span>{" "}
              <span className="dong2">Điểm giao thương nối TP.HCM với 13 tỉnh miền Tây</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">{LOCATION_FACT}</p>
        </Reveal>

        <div className="vt">
          <Reveal>
            <figure
              className="map-fig"
              onClick={() =>
                openLightbox(
                  `${IMG}/thanh-phu-centre-point-ban-do-vi-tri-ket-noi-lon.webp`,
                  "Bản đồ vị trí Thanh Phú Centre Point"
                )
              }
            >
              <Image
                src={`${IMG}/thanh-phu-centre-point-ban-do-vi-tri-ket-noi.webp`}
                width={1400}
                height={990}
                loading="lazy"
                decoding="async"
                alt="Bản đồ vị trí Thanh Phú Centre Point: cao tốc TP.HCM – Trung Lương, Nguyễn Hữu Trí, ĐT.830C, Vành đai 4, thờI gian di chuyển"
              />
              <figcaption className="fcap">Bản đồ vị trí của chủ đầu tư · bấm để phóng to, xem tên đường</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card">
              <h3>ThờI gian di chuyển tham khảo</h3>
              {TRAVEL_TIMES.map((t) => (
                <div key={t.span} className="rt">
                  <b>{t.b}</b>
                  <span>{t.span}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="ht-wrap">
          <Reveal>
            <figure
              onClick={() =>
                openLightbox(
                  `${IMG}/thanh-phu-centre-point-ket-noi-vung-tphcm.webp`,
                  "Sơ đồ kết nối vùng Thanh Phú Centre Point"
                )
              }
            >
              <Image
                src={`${IMG}/thanh-phu-centre-point-ket-noi-vung-tphcm.webp`}
                width={1320}
                height={908}
                loading="lazy"
                decoding="async"
                alt="Sơ đồ kết nối vùng: Thanh Phú Centre Point với TP.HCM, Quốc lộ 1A, Vành đai 3, Vành đai 4 và hướng sân bay Long Thành"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="sub-k">Hạ tầng 2026 – 2028</p>
              <ul className="ht" aria-label="Hạ tầng quanh dự án">
                {INFRASTRUCTURE.map((t) => (
                  <li key={t.span}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 20 9 4M20 20 15 4M12 6v2M12 11v2M12 16v2" />
                    </svg>
                    <div>
                      <b>{t.b}</b>
                      <span>{t.span}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            ThờI gian di chuyển mang tính tham khảo, phụ thuộc điều kiện giao thông thực tế. Hạ tầng
            theo quy hoạch, tiến độ do cơ quan nhà nước công bố.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
