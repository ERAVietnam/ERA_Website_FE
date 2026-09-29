"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { projectInfo, projectBadges } from "../data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

// Slider chuyển góc nhìn: 0 = phối cảnh nghiêng, 100 = mặt bằng từ trên xuống
function GocSlider() {
  const [value, setValue] = useState(0);
  const v = value / 100;

  return (
    <figure className="m-0" style={{ marginBottom: "clamp(24px,2.8vw,38px)" }}>
      <div
        className="relative overflow-hidden rounded-[14px]"
        style={{ aspectRatio: "1800/1056", background: "#0E3A44", perspective: 1300 }}
      >
        <Image
          src="/landing/waterpoint/waterpoint-masterplan-xoay-180.webp"
          alt="Mặt bằng tổng thể Waterpoint 355 ha nhìn từ trên xuống: bán đảo ba mặt sông Vàm Cỏ Đông với các phân khu Aquaria, Park Village, Rivera, The Marina, Southgate"
          fill
          sizes="(max-width: 1224px) 100vw, 1136px"
          className="object-cover transition-opacity duration-150"
          style={{
            opacity: v,
            transform: `rotateX(${(1 - v) * -8}deg) scale(${1 + (1 - v) * 0.04})`,
            transformOrigin: "50% 40%",
          }}
        />
        <Image
          src="/landing/waterpoint/waterpoint-355ha-phoi-canh-nghieng-1800.webp"
          alt="Phối cảnh nghiêng khu đô thị Waterpoint 355 ha bên sông Vàm Cỏ Đông, ghi vị trí các phân khu Aquaria, Park Village, Rivera, Solaria, The Pearl, The Marina, Ehome Southgate"
          fill
          sizes="(max-width: 1224px) 100vw, 1136px"
          className="object-cover transition-opacity duration-150"
          style={{
            opacity: 1 - v,
            transform: `rotateX(${v * 6}deg) scale(${1 + v * 0.03})`,
            transformOrigin: "50% 60%",
          }}
        />
        <span
          className="pointer-events-none absolute top-3.5 right-3.5 rounded-full font-extrabold tracking-[0.08em]"
          style={{
            background: "#F5D5A0",
            color: "#10333B",
            fontSize: 11,
            padding: "8px 13px",
          }}
        >
          ⟷ KÉO NGANG ĐỂ XEM TỪ TRÊN XUỐNG
        </span>
        <div
          className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full"
          style={{ background: "rgba(16,51,59,.86)", backdropFilter: "blur(6px)", padding: "6px 14px" }}
        >
          <button
            type="button"
            onClick={() => setValue(0)}
            className="cursor-pointer border-none bg-transparent font-extrabold whitespace-nowrap text-white"
            style={{ fontSize: 11, letterSpacing: "0.08em", padding: "6px 4px" }}
          >
            GÓC NGHIÊNG
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label="Chuyển từ góc nghiêng sang nhìn từ trên"
            className="cursor-pointer"
            style={{ width: "clamp(90px,16vw,200px)", accentColor: "#F5D5A0" }}
          />
          <button
            type="button"
            onClick={() => setValue(100)}
            className="cursor-pointer border-none bg-transparent font-extrabold whitespace-nowrap text-white"
            style={{ fontSize: 11, letterSpacing: "0.08em", padding: "6px 4px" }}
          >
            TỪ TRÊN XUỐNG
          </button>
        </div>
      </div>
      <figcaption
        className="mt-2.5 text-center"
        style={{ fontSize: 12, color: "#5B7B82", letterSpacing: "0.04em" }}
      >
        Waterpoint 355 ha — kéo để chuyển từ phối cảnh nghiêng sang mặt bằng tổng thể. Phối cảnh
        minh hoạ của chủ đầu tư.
      </figcaption>
    </figure>
  );
}

export function MasterPlanSection() {
  return (
    <section
      className="w-full"
      style={{ background: "#FFFFFF", padding: "clamp(58px,6vw,96px) 22px" }}
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Heading */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mb-[34px] text-center"
        >
          <span className="text-sm font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
            THÔNG TIN DỰ ÁN
          </span>
          <h2
            className="mt-3 font-extrabold"
            style={{ color: theme.primary, fontSize: "clamp(22px,3.1vw,40px)", lineHeight: 1.15 }}
          >
            Tổng quan khu đô thị Waterpoint
          </h2>
        </motion.div>

        <motion.div {...fadeUp} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
          <GocSlider />
        </motion.div>

        {/* Bảng thông tin: label nền teal, value nền kem */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="aq-tq-bang flex flex-col gap-[3px] overflow-hidden rounded-[14px]"
        >
          {projectInfo.map((row) => (
            <div
              key={row.label}
              className="grid"
              style={{ gridTemplateColumns: "minmax(140px, 220px) 1fr" }}
            >
              <div
                className="font-bold tracking-[0.08em] text-white"
                style={{ background: theme.primary, fontSize: 12.5, padding: "18px 20px" }}
              >
                {row.label}
              </div>
              <div
                style={{
                  background: theme.cream,
                  fontSize: 16,
                  color: theme.text,
                  padding: "18px 20px",
                  lineHeight: 1.6,
                }}
              >
                {row.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Badges */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mt-5 flex flex-wrap justify-center gap-3"
        >
          {projectBadges.map((b) => (
            <span
              key={b}
              className="rounded-full font-bold"
              style={{
                border: "1.5px solid #2E7C8C",
                color: theme.primary,
                fontSize: 13,
                padding: "11px 18px",
                letterSpacing: "0.06em",
              }}
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
