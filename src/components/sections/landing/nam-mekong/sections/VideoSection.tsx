"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG, VIDEO_ID } from "../theme";
import { Reveal } from "../Reveal";

/* Bấm mới tải: chỉ hiện ảnh poster, khách bấm mới nhét iframe YouTube (theo mẫu) */
export function VideoSection() {
  const [play, setPlay] = useState(false);

  return (
    <div className="vid-band">
      <Reveal>
        <div
          className="vid"
          id="vid"
          role="button"
          tabIndex={0}
          aria-label="Phát phim giới thiệu Nam Mekong Grand Plaza"
          onClick={() => setPlay(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setPlay(true);
          }}
        >
          {play ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Phim giới thiệu Nam Mekong Grand Plaza"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={`${IMG}/nam-mekong-grand-plaza-toan-canh-tod-wtc.webp`}
                alt="Toàn cảnh Nam Mekong Grand Plaza giữa quần thể TOD vòng xoay WTC với nhà ga trung tâm và tuyến metro trên cao"
                width={1400}
                height={788}
                sizes="(max-width: 1004px) 100vw, 960px"
                loading="lazy"
              />
              <div className="shade" aria-hidden="true"></div>
              <div className="play" aria-hidden="true">
                <i></i>
              </div>
            </>
          )}
          <div className="cap">
            <b>Phim giới thiệu Nam Mekong Grand Plaza</b>
            <span>MEKONG CHARM · BÌNH DƯƠNG</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
