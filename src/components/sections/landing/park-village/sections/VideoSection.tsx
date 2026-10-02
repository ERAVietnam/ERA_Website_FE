"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG, VIDEO_ID } from "../theme";
import { Reveal } from "../Reveal";
import { usePopup } from "./PopupForm";

/* VIDEO_ID đang trống (theo mẫu — chờ link phim): bấm vào mở popup "Nhận video qua Zalo".
   Khi có link YouTube, điền VIDEO_ID trong theme.ts — khối này tự đổi sang phát iframe. */
export function VideoSection() {
  const [play, setPlay] = useState(false);
  const openPopup = usePopup();

  const onClick = () => {
    if (VIDEO_ID) setPlay(true);
    else
      openPopup(
        "Nhận video giới thiệu Park Village",
        "Video đang được cập nhật. Để lại số, em gửi video phim 3D qua Zalo ngay."
      );
  };

  return (
    <div className="vid-band">
      <Reveal>
        <div
          className="vid"
          role="button"
          tabIndex={0}
          aria-label="Phát video giới thiệu Park Village"
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onClick();
          }}
        >
          {play && VIDEO_ID ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Video giới thiệu Park Village"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={`${IMG}/park-village-phim-3d-toan-canh-hoang-hon.webp`}
                alt="Toàn cảnh làng biệt thự Park Village bên kênh đào lúc hoàng hôn, khung hình từ phim 3D giới thiệu"
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
            <b>Phim 3D giới thiệu Park Village</b>
            <span>LÀNG ÂU GIỮA KHU ĐÔ THỊ WATERPOINT</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
