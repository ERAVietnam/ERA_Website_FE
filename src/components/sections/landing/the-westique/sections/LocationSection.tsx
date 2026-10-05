"use client";

import Image from "next/image";
import { INFRASTRUCTURE, LOCATION_FACT, NEARBY_AMENITIES } from "../data";
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
              Vị trí <span className="nw">The Westique Residences</span>{" "}
              <span className="dong2">Mặt tiền Kinh Dương Vương, cửa ngõ phía Tây TP.HCM</span>
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
                  `${IMG}/the-westique-residences-ban-do-vi-tri-kinh-duong-vuong-an-lac.webp`,
                  "Bản đồ vị trí The Westique Residences trên Kinh Dương Vương"
                )
              }
            >
              <Image
                src={`${IMG}/the-westique-residences-ban-do-vi-tri-kinh-duong-vuong-an-lac-800.webp`}
                width={1600}
                height={900}
                loading="lazy"
                decoding="async"
                alt="Bản đồ vị trí The Westique Residences trên Kinh Dương Vương: Metro số 3A, đại lộ Võ Văn Kiệt, Quốc lộ 1A, Bến xe Miền Tây"
              />
              <figcaption className="fcap">Bản đồ vị trí The Westique Residences · bấm để phóng to, xem tên đường</figcaption>
            </figure>
          </Reveal>
          <div className="vt-side">
            <Reveal delay={0.1}>
              <div className="card">
                <h3>Tiện ích quanh dự án</h3>
                {NEARBY_AMENITIES.map((t) => (
                  <div key={t.b} className="rt">
                    <b>{t.b}</b>
                    <span>{t.span}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <figure
            className="aerial"
            onClick={() =>
              openLightbox(
                `${IMG}/the-westique-residences-phoi-canh-vi-tri-metro-3a-kinh-duong-vuong.webp`,
                "Phối cảnh trên cao The Westique Residences cạnh tuyến Metro số 3A"
              )
            }
          >
            <Image
              src={`${IMG}/the-westique-residences-phoi-canh-vi-tri-metro-3a-kinh-duong-vuong-800.webp`}
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              alt="Phối cảnh trên cao The Westique Residences cạnh tuyến Metro số 3A dọc Kinh Dương Vương, gần ga Bến xe Miền Tây"
            />
            <span className="tag" style={{ left: "40%", top: "30%" }}>
              <i></i>The Westique Residences
            </span>
            <span className="tag an" style={{ left: "22%", top: "58%" }}>
              <i></i>Đại lộ Kinh Dương Vương
            </span>
            <span className="tag an" style={{ left: "74%", top: "72%" }}>
              <i></i>Hướng Bến xe Miền Tây
            </span>
          </figure>
        </Reveal>

        <Reveal>
          <ul className="ht" aria-label="Hạ tầng sắp tới quanh dự án">
            {INFRASTRUCTURE.map((t) => (
              <li key={t.b}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="3" width="14" height="14" rx="3" />
                  <path d="M5 11h14M9 21l-2-4M15 21l2-4M9 14h.01M15 14h.01" />
                </svg>
                <div>
                  <b>{t.b}</b>
                  <span>{t.span}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

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
