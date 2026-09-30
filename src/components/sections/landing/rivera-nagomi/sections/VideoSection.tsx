"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMG, VIDEO_ID } from "../theme";

/* Bấm mới tải: chỉ hiện ảnh poster, khách bấm mới nhét iframe YouTube (theo mẫu) */
export function VideoSection() {
  const [play, setPlay] = useState(false);

  return (
    <div className="vid-band">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="vid"
        id="vid"
        role="button"
        tabIndex={0}
        aria-label="Phát video giới thiệu Rivera Nagomi"
        onClick={() => setPlay(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setPlay(true);
        }}
      >
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
            title="Video giới thiệu Rivera Nagomi"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={`${IMG}/rivera-nagomi-phoi-canh-phan-khu-ben-song.webp`}
              alt="Phối cảnh phân khu Rivera Nagomi bên sông với các dãy biệt thự và cây xanh ven bờ"
              fill
              sizes="(max-width: 944px) 100vw, 900px"
              className="object-cover"
            />
            <div className="shade" aria-hidden="true"></div>
            <div className="play" aria-hidden="true">
              <i></i>
            </div>
          </>
        )}
        <div className="cap">
          <b>Video giới thiệu Rivera Nagomi</b>
          <span>PHÂN KHU MỚI TẠI WATERPOINT</span>
        </div>
      </motion.div>
    </div>
  );
}
