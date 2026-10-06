"use client";

import Image from "next/image";
import { ECOSYSTEM, ECOSYSTEM_BODY, LOCATION_FACT, TRAVEL_TIMES } from "../data";
import { IMG } from "../theme";
import { Quat, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const ECO_ICONS = [
  <path key="e1" d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />,
  (<g key="e2"><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" /></g>),
  <path key="e3" d="M4 21V5h10v16M14 9h6v12M7 9h2M7 13h2M7 17h2" />,
  (<g key="e4"><path d="M3 9l9-5 9 5-9 5-9-5Z" /><path d="M7 11.5V16c0 1.5 2.5 3 5 3s5-1.5 5-3v-4.5" /></g>),
  <path key="e5" d="M2 18c3-2 5-2 8 0s5 2 8 0 3-1 4-1M2 13c3-2 5-2 8 0s5 2 8 0 3-1 4-1" />,
];

export function LocationSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec" id="vi-tri">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Vị trí <span className="nw">Beachtro Tower</span>{" "}
              <span className="dong2">Gia tăng giá trị từ tọa độ vàng</span>
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
                  `${IMG}/beachtro-tower-ban-do-vi-tri-ket-noi-lon.webp`,
                  "Bản đồ vị trí Beachtro Tower – Blanca City"
                )
              }
            >
              <Image
                src={`${IMG}/beachtro-tower-ban-do-vi-tri-ket-noi.webp`}
                width={1400}
                height={1041}
                loading="lazy"
                decoding="async"
                alt="Bản đồ vị trí Beachtro Tower – Blanca City, đường 3 Tháng 2 Vũng Tàu: cao tốc Biên Hòa – Vũng Tàu, sân bay Long Thành"
              />
              <figcaption className="fcap">Bản đồ vị trí của chủ đầu tư · bấm để phóng to</figcaption>
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
              <div className="mat" aria-label="Tọa độ xanh">
                <span>1 mặt biển</span>
                <span>1 mặt đại lộ</span>
                <span>4 mặt công viên</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="hst">
          <Reveal>
            <figure
              onClick={() =>
                openLightbox(
                  `${IMG}/blanca-city-he-sinh-thai-all-in-one-96-6-ha-lon.webp`,
                  "Hệ sinh thái Blanca City 96,6 ha"
                )
              }
            >
              <Image
                src={`${IMG}/blanca-city-he-sinh-thai-all-in-one-96-6-ha.webp`}
                width={1400}
                height={1041}
                loading="lazy"
                decoding="async"
                alt="Hệ sinh thái Blanca City 96,6 ha quanh Beachtro Tower: Sun World 15 ha, TTTM mặt biển 5 ha, khách sạn 5 sao, 1 km bờ biển"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="sub-k">Hệ sinh thái 96,6 ha</p>
              <p className="body" style={{ margin: "0 0 14px" }}>
                {ECOSYSTEM_BODY}
              </p>
              <ul className="ds" aria-label="Hệ sinh thái quanh dự án">
                {ECOSYSTEM.map((t, i) => (
                  <li key={t.b}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {ECO_ICONS[i]}
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
            ThờI gian di chuyển mang tính tham khảo, phụ thuộc điều kiện giao thông thực tế. Tiện
            ích theo quy hoạch, tiến độ do chủ đầu tư công bố.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
