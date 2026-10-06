"use client";

import Image from "next/image";
import { CITY_AMENITIES, EXTERNAL_FACT, PARKS } from "../data";
import { IMG } from "../theme";
import { Quat, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const CITY_ICONS = [
  (<g key="c1"><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16" /></g>),
  <path key="c2" d="M2 18c3-2 5-2 8 0s5 2 8 0 3-1 4-1M5 14V8l7-4 7 4v6" />,
  (<g key="c3"><path d="M12 21c-4-3-7-6-7-10a7 7 0 0 1 14 0c0 4-3 7-7 10Z" /><circle cx="12" cy="11" r="2.5" /></g>),
];

const GALLERY = [
  {
    src: `${IMG}/blanca-city-trung-tam-thuong-mai-mat-bien.webp`,
    src800: `${IMG}/blanca-city-trung-tam-thuong-mai-mat-bien-800.webp`,
    w: 1000, h: 562,
    alt: "Trung tâm thương mại mặt biển Blanca City nhìn từ biển Bãi Sau, phía sau là các tháp căn hộ và Sun World",
    cap: "TTTM mặt biển Bãi Sau",
  },
  {
    src: `${IMG}/blanca-city-sport-park-nhin-ve-beachtro-tower.webp`,
    src800: `${IMG}/blanca-city-sport-park-nhin-ve-beachtro-tower-800.webp`,
    w: 1000, h: 562,
    alt: "Sport Park Blanca City với sân pickleball, sân bóng rổ, nhìn về các tháp Beachtro Tower",
    cap: "Sport Park",
  },
  {
    src: `${IMG}/beachtro-tower-view-bien-bai-sau-tu-ban-cong.webp`,
    src800: `${IMG}/beachtro-tower-view-bien-bai-sau-tu-ban-cong-800.webp`,
    w: 1000, h: 563,
    alt: "View biển Bãi Sau và sân golf từ ban công căn hộ Beachtro Tower, phía dưới là khu biệt thự Blanca City",
    cap: "View biển từ ban công",
  },
];

export function ExternalSection() {
  const openLightbox = useLightbox();

  return (
    <section className="sec bg-cream" id="ngoai-khu">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Tiện ích ngoại khu <span className="nw">Blanca City</span>{" "}
              <span className="dong2">Vũ trụ giải trí biển All-in-one ngay ngưỡng cửa</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <p className="fact">{EXTERNAL_FACT}</p>
        </Reveal>

        <div className="nk">
          <Reveal>
            <figure
              onClick={() =>
                openLightbox(
                  `${IMG}/blanca-city-tong-mat-bang-tien-ich-ngoai-khu-lon.webp`,
                  "Tổng mặt bằng Blanca City"
                )
              }
            >
              <Image
                src={`${IMG}/blanca-city-tong-mat-bang-tien-ich-ngoai-khu.webp`}
                width={1400}
                height={962}
                loading="lazy"
                decoding="async"
                alt="Tổng mặt bằng Blanca City: Beachtro Tower, Sun World, TTTM mặt biển, Whale Park, Central Park, Sport Park, Sea Soul Park"
              />
              <figcaption className="fcap">Tổng mặt bằng Blanca City · bấm để phóng to, xem chú thích tiện ích</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="sub-k">4 công viên bao quanh</p>
              <ul className="cv">
                {PARKS.map((p) => (
                  <li key={p.b}>
                    <b>{p.b}</b>
                    <span>{p.span}</span>
                  </li>
                ))}
              </ul>
              <ul className="ds" aria-label="Tiện ích đô thị">
                {CITY_AMENITIES.map((t, i) => (
                  <li key={t.b}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {CITY_ICONS[i]}
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

        <div className="gal">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.08}>
              <figure onClick={() => openLightbox(g.src, g.cap)}>
                <Image
                  src={g.src800}
                  width={g.w}
                  height={g.h}
                  loading="lazy"
                  decoding="async"
                  alt={g.alt}
                />
                <figcaption>{g.cap}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
