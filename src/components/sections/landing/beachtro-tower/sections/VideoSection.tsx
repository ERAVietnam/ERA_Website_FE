"use client";

import { useState } from "react";
import Image from "next/image";
import { LIVINGS, VIDEO_PARAS, YT_ID } from "../data";
import { IMG } from "../theme";
import { Quat, Reveal } from "../Reveal";

/* Video YouTube click-to-load — bấm mới tải iframe (youtube-nocookie), trang nhẹ */
export function VideoSection() {
  const [play, setPlay] = useState(false);

  return (
    <section className="sec bg-cream" id="video">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <Quat />
            <h2>
              Video giới thiệu dự án{" "}
              <span className="dong2">Beachtro Tower – Sống trọn sắc riêng, bên biển nhiệt đới</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="vid" id="vid">
            {play ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0`}
                title="Phim giới thiệu Beachtro Tower"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src={`${IMG}/beachtro-tower-video-poster.webp`}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  alt="Phim giới thiệu Beachtro Tower – căn hộ mặt biển sở hữu lâu dài cuối cùng tại Blanca City của Sun Property"
                />
                <button type="button" onClick={() => setPlay(true)} aria-label="Phát video giới thiệu Beachtro Tower">
                  <span className="play">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7 4.5v15l12.5-7.5Z" />
                    </svg>
                  </span>
                </button>
              </>
            )}
          </div>
        </Reveal>

        <Reveal>
          <p className="note vid-note">Phim từ kênh YouTube chính thức Sun Property.</p>
        </Reveal>

        <Reveal>
          <div className="vid-chu body">
            {VIDEO_PARAS.map((p, i) =>
              i === VIDEO_PARAS.length - 1 ? (
                <p key={i} className="ket">
                  {p}
                </p>
              ) : (
                <p key={i}>{p}</p>
              )
            )}
          </div>
        </Reveal>

        <Reveal>
          <ul className="living" aria-label="3 sắc thái Beachtro Living">
            {LIVINGS.map((l) => (
              <li key={l.b}>
                <i>{l.i}</i>
                <b>{l.b}</b>
                <span>{l.span}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
