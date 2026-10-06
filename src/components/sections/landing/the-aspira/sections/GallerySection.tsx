"use client";

import { useState } from "react";
import Image from "next/image";
import { DOCS, GALLERY_PHOTOS, TOUR_360_LINK } from "../data";
import { VIDEO_TEASER } from "../theme";
import { AMark, Reveal } from "../Reveal";
import { useLightbox } from "./Lightbox";

const TABS = [
  { key: "hinh", label: "Hình ảnh" },
  { key: "video", label: "Video" },
  { key: "tailieu", label: "Tài liệu" },
] as const;

const DOC_ICONS = [
  <path key="d1" d="M6 3h9l4 4v14H6Z" />,
  <g key="d2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h9V3M12 12v9M16 12h5" /></g>,
  <g key="d3"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 19h8" /></g>,
];

export function GallerySection() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("hinh");
  const [play, setPlay] = useState(false);
  const openLightbox = useLightbox();

  const toForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sec" id="thu-vien">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <AMark />
            <h2>
              Thư viện The Aspira{" "}
              <span className="dong2">Phối cảnh dự án, tiện ích tầng trệt, tiện ích tầng thượng và phim teaser</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist" aria-label="Thư viện">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        {tab === "hinh" && (
          <Reveal>
            <div role="tabpanel">
              <div className="tv-anh">
                {GALLERY_PHOTOS.map((p) => (
                  <figure key={p.src} onClick={() => openLightbox(p.src.replace("-800.webp", ".webp"), p.alt)}>
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
            </div>
          </Reveal>
        )}

        {tab === "video" && (
          <Reveal>
            <div role="tabpanel">
              <div className="vid" id="vid">
                {play ? (
                  <video
                    src={VIDEO_TEASER}
                    poster="/landing/the-aspira/the-aspira-video-teaser-poster.webp"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <>
                    <Image
                      src={`/landing/the-aspira/the-aspira-video-teaser-poster.webp`}
                      width={1280}
                      height={720}
                      loading="lazy"
                      decoding="async"
                      alt="Phim teaser The Aspira – Sống năng lượng, chọn The Aspira (Sài Gòn High Rise)"
                    />
                    <button type="button" onClick={() => setPlay(true)} aria-label="Phát phim teaser The Aspira">
                      <span className="play">
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M7 4.5v15l12.5-7.5Z" />
                        </svg>
                      </span>
                      <span className="lbl">Teaser The Aspira · 47 giây · bấm để xem</span>
                    </button>
                  </>
                )}
              </div>
              <p className="note vid-note">Phim teaser của chủ đầu tư.</p>
            </div>
          </Reveal>
        )}

        {tab === "tailieu" && (
          <Reveal>
            <div role="tabpanel">
              <ul className="tl">
                {DOCS.map((d, i) => (
                  <li key={d.b}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {DOC_ICONS[i]}
                    </svg>
                    <b>{d.b}</b>
                    <span>{d.span}</span>
                    <a className="lay" href="#dang-ky" onClick={toForm}>
                      Đăng ký nhận tài liệu →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="tour">
            <div>
              <b>Tham quan 360°</b>
              <span>Đi một vòng dự án và tiện ích bằng tour 360° của chủ đầu tư.</span>
            </div>
            <a className="nut" href={TOUR_360_LINK} target="_blank" rel="noopener">
              Mở tour 360°{" "}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
