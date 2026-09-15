"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";

const VIDEO_ID = "qMOtesQSSW4";
const VIDEO_START = 28;

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="w-full px-[22px]"
      style={{
        background:
          "linear-gradient(to bottom, #D8EAEC 0%, #D8EAEC 50%, #F4F9FA 50%, #F4F9FA 100%)",
      }}
    >
      <figure className="mx-auto max-w-[820px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative aspect-video overflow-hidden rounded-[14px]"
          role={playing ? undefined : "button"}
          tabIndex={playing ? undefined : 0}
          aria-label={playing ? undefined : "Phát video: Một ngày ở Waterpoint"}
          style={{ background: theme.primaryDeep, boxShadow: "0 20px 52px rgba(16,51,59,.2)", cursor: playing ? "default" : "pointer" }}
          onClick={() => !playing && setPlaying(true)}
          onKeyDown={(e) => {
            if (!playing && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setPlaying(true);
            }
          }}
        >
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?start=${VIDEO_START}&autoplay=1&rel=0`}
              title="Một ngày ở Waterpoint"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <>
              <Image
                src="/landing/waterpoint/waterpoint-poster-video-cuoc-song.webp"
                alt="Cư dân cắm trại, dựng lều và vui chơi trên bãi cỏ lớn trong Waterpoint"
                fill
                sizes="(max-width: 864px) 100vw, 820px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(9,42,48,.62) 0%, rgba(9,42,48,.12) 45%, rgba(9,42,48,.05) 100%)",
                }}
              />
              {/* Nút play */}
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{
                  width: "clamp(56px,6.6vw,78px)",
                  height: "clamp(56px,6.6vw,78px)",
                  backgroundColor: "rgba(255,255,255,.92)",
                  boxShadow: "0 6px 22px rgba(9,42,48,.3)",
                }}
              >
                <span
                  className="block"
                  style={{
                    width: 0,
                    height: 0,
                    marginLeft: 5,
                    borderStyle: "solid",
                    borderWidth: "clamp(9px,1.1vw,12px) 0 clamp(9px,1.1vw,12px) clamp(15px,1.8vw,20px)",
                    borderColor: "transparent transparent transparent #1D5866",
                  }}
                />
              </div>
              <figcaption
                className="absolute inset-x-0 bottom-0 text-white"
                style={{ padding: "clamp(15px,1.8vw,24px)" }}
              >
                <span
                  className="block leading-[1.25] font-bold"
                  style={{ fontSize: "clamp(15px,1.7vw,21px)" }}
                >
                  Một ngày ở Waterpoint
                </span>
                <span
                  className="mt-1.5 block text-xs font-semibold tracking-[0.11em] text-white/90"
                >
                  CUỘC SỐNG THẬT CỦA CƯ DÂN
                </span>
              </figcaption>
            </>
          )}
        </motion.div>
      </figure>
    </div>
  );
}
