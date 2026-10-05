"use client";

import Image from "next/image";
import { INFRA_ITEMS, LOCATION_FACT, TRAVEL_TIMES } from "../data";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LocationSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="vi-tri">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <span className="vach" aria-hidden="true"></span>
            <h2>
              Vị trí <span className="nw">Celesta Gold</span>{" "}
              <span className="dong2">Mặt tiền đại lộ Nguyễn Hữu Thọ, liền kề Phú Mỹ Hưng</span>
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
                  `${IMG}/celesta-gold-ban-do-vi-tri-nguyen-huu-tho-nha-be.webp`,
                  "Bản đồ vị trí Celesta Gold trên đại lộ Nguyễn Hữu Thọ, Nhà Bè"
                )
              }
            >
              <Image
                src={`${IMG}/celesta-gold-ban-do-vi-tri-nguyen-huu-tho-nha-be-800.webp`}
                width={1500}
                height={1155}
                loading="lazy"
                decoding="async"
                alt="Bản đồ vị trí Celesta Gold trên đại lộ Nguyễn Hữu Thọ, Nhà Bè: Phú Mỹ Hưng, SC VivoCity, RMIT, metro tương lai, Quận 1"
              />
              <figcaption className="fcap">Bản đồ vị trí Celesta Gold · bấm để phóng to, xem tên đường</figcaption>
            </figure>
          </Reveal>
          <div className="vt-side">
            <Reveal>
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
            <Reveal delay={0.1}>
              <div className="card">
                <h3>Hạ tầng đang triển khai / theo quy hoạch</h3>
                <ul className="ht">
                  {INFRA_ITEMS.map((t) => (
                    <li key={t}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 20 9 4M20 20 15 4M12 6v2M12 11v2M12 16v2" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
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
