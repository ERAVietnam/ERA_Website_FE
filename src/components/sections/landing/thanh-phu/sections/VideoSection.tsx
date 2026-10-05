"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";
import { Reveal } from "../Reveal";

const YT_ID = "8Izcee2cgMQ";

/* Video YouTube click-to-load — bấm mới tải iframe (youtube-nocookie), trang nhẹ */
export function VideoSection() {
  const [play, setPlay] = useState(false);

  return (
    <section className="sec bg-cream" id="video">
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
              Video giới thiệu dự án{" "}
              <span className="dong2">Thanh Phú Centre Point – Tâm điểm trù phú phía Tây TP.HCM</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="vid" id="vid">
            {play ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0`}
                title="Phim giới thiệu Thanh Phú Centre Point"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src={`${IMG}/thanh-phu-centre-point-video-poster.webp`}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  alt="Phim giới thiệu Thanh Phú Centre Point – Tâm điểm trù phú phía Tây TP.HCM của BIM Group"
                />
                <button type="button" onClick={() => setPlay(true)} aria-label="Phát video giới thiệu Thanh Phú Centre Point">
                  <span className="play">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7 4.5v15l12.5-7.5Z" />
                    </svg>
                  </span>
                  <span className="lbl">Phim phối cảnh BIM Thanh Phú · bấm để xem</span>
                </button>
              </>
            )}
          </div>
        </Reveal>

        <Reveal>
          <p className="note vid-note">Phim từ kênh YouTube chính thức BIM GROUP Official.</p>
        </Reveal>
      </div>
    </section>
  );
}
