"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG, VIDEO_MP4 } from "../theme";
import { Reveal } from "../Reveal";

/* Bấm mới tải: phát MP4 tự host (preload=none) theo mẫu */
export function VideoSection() {
  const [play, setPlay] = useState(false);

  return (
    <div className="vid-band">
      <Reveal>
        <div
          className="vid"
          role="button"
          tabIndex={0}
          aria-label="Phát phim giới thiệu The Aqua"
          onClick={() => setPlay(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setPlay(true);
          }}
        >
          {play ? (
            <video
              src={VIDEO_MP4}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              aria-label="Phim giới thiệu The Aqua"
            />
          ) : (
            <>
              <Image
                src={`${IMG}/the-aqua-phim-gioi-thieu-hoang-hon-ben-thuyen.webp`}
                alt="Bến thuyền và khu thư giãn ven sông của The Aqua lúc hoàng hôn, khung hình từ phim giới thiệu"
                width={1400}
                height={788}
                sizes="(max-width: 944px) 100vw, 900px"
                loading="lazy"
              />
              <div className="shade" aria-hidden="true"></div>
              <div className="play" aria-hidden="true">
                <i></i>
              </div>
            </>
          )}
          <div className="cap">
            <b>Phim giới thiệu The Aqua</b>
            <span>MỞ RA 4 MÙA NGHỈ DƯỠNG ĐẬM CHẤT NHẬT</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
