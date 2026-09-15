"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { villaTypes } from "../data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

// Mẫu đang TẠM ẨN "Biệt thự vịnh cảng" (Harborfront) chờ CĐT xác nhận
const VILLAS = villaTypes.filter((v) => v.en !== "Harborfront Grand Villa");

export function VillaSection() {
  return (
    <section
      id="biet-thu"
      className="w-full"
      style={{ background: "#FFFFFF", padding: "clamp(58px,6vw,96px) 22px" }}
    >
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-[34px] max-w-[880px] text-center"
        >
          <span className="text-sm font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
            BỘ SƯU TẬP BIỆT THỰ THE AQUA
          </span>
          <h2
            className="mt-3 font-extrabold"
            style={{ color: theme.primary, fontSize: "clamp(22px,3.1vw,40px)", lineHeight: 1.15 }}
          >
            MỖI GIA ĐÌNH MỘT QUY MÔ
          </h2>
          <p
            className="mt-3 italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(18px,2vw,25px)",
              lineHeight: 1.4,
            }}
          >
            Mỗi thế hệ một khoảng riêng.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto grid max-w-[920px] gap-4"
          style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
        >
          {VILLAS.map((v) => (
            <div
              key={v.en}
              className="group flex flex-col overflow-hidden rounded-2xl"
              style={{ border: "1px solid #E3EDEF" }}
            >
              <div className="relative overflow-hidden" style={{ height: "clamp(200px,22vw,300px)" }}>
                <Image
                  src={`/landing/waterpoint/waterpoint-${v.img}.webp`}
                  alt={v.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 460px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="text-[17px] leading-[1.25] font-extrabold" style={{ color: theme.primary }}>
                  {v.name}
                </div>
                <div
                  className="mt-[3px] text-[12.5px] font-semibold tracking-[0.06em]"
                  style={{ color: "#7A9AA2" }}
                >
                  {v.en}
                </div>
                <div className="mt-1 text-[14.5px] font-bold" style={{ color: theme.primary }}>
                  {v.size} · {v.rooms}
                </div>
                <p className="mt-2.5 mb-0 text-[15.5px] leading-[1.6]" style={{ color: theme.primarySoft }}>
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
