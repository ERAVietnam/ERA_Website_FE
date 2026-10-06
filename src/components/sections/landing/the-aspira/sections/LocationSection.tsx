"use client";

import Image from "next/image";
import { LOCATION_FACT, MAPS_LINK, REGIONAL_LINKS, ROADS, ROAD_ICONS } from "../data";
import { IMG } from "../theme";
import { AMark, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

export function LocationSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="vi-tri">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <AMark />
            <h2>
              Vị trí The Aspira <span className="nw">– Tọa độ năng lượng</span>{" "}
              <span className="dong2">Vùng phát triển TOD quanh ga S12 – S13 của tuyến Metro số 1 kéo dài</span>
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
                openLightbox(`${IMG}/the-aspira-ban-do-vi-tri-ket-noi.svg`, "Bản đồ vị trí The Aspira")
              }
            >
              <Image
                src={`${IMG}/the-aspira-ban-do-vi-tri-ket-noi.svg`}
                width={1361}
                height={1080}
                loading="lazy"
                decoding="async"
                alt="Bản đồ vị trí The Aspira: ga Metro S12, S13, Quốc lộ 1K, Mỹ Phước – Tân Vạn, ĐT743, cao tốc TP.HCM – Chơn Thành"
              />
              <figcaption className="fcap">Bản đồ vị trí của chủ đầu tư · tuyến Metro đang chạy hiệu ứng · bấm để phóng to</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card">
              <h3>Liên kết vùng</h3>
              <p className="note">ThờI gian di chuyển tham khảo</p>
              {REGIONAL_LINKS.map((t) => (
                <div key={t.span} className="lk">
                  <b>{t.b}</b>
                  <span>{t.span}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="vt-2">
          <Reveal>
            <figure
              onClick={() =>
                openLightbox(`${IMG}/the-aspira-so-do-lien-ket-vung.svg`, "Sơ đồ liên kết vùng The Aspira")
              }
            >
              <Image
                src={`${IMG}/the-aspira-so-do-lien-ket-vung.svg`}
                width={2163}
                height={1730}
                loading="lazy"
                decoding="async"
                alt="Sơ đồ liên kết vùng The Aspira theo 3 vòng thờI gian: trường học, chợ, KCN gần nhất ở trong; sân bay, Khu CNC ở vòng ngoài"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="sub-k">Trục giao thông kết nối</p>
              <ul className="ht" aria-label="Trục giao thông quanh dự án">
                {ROADS.map((t) => (
                  <li key={t.b}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {ROAD_ICONS[t.icon]}
                    </svg>
                    <div>
                      <b>{t.b}</b>
                      <span>{t.span}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <a className="nut vien" href={MAPS_LINK} target="_blank" rel="noopener">
                Xem trên Google Maps{" "}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="note" style={{ textAlign: "center", marginTop: 16 }}>
            ThờI gian di chuyển mang tính tham khảo. Tuyến Metro số 1 kéo dài và các ga theo quy
            hoạch, tiến độ do cơ quan nhà nước công bố.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
