"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const INFO_ROWS: { label: string; value: React.ReactNode }[] = [
  { label: "QUY MÔ", value: "355ha" },
  {
    label: "PHÂN KHU",
    value: (
      <>
        Rivera · <b style={{ color: theme.primary }}>Aquaria</b> (gồm The Aqua 1, The Aqua 2, The
        Aqua Signature) · Park Village · Central Park · Southgate
      </>
    ),
  },
  {
    label: "VỊ TRÍ",
    value: "Vòng xoay Tỉnh lộ 830, xã Bến Lức, tỉnh Tây Ninh (trước là huyện Bến Lức, tỉnh Long An)",
  },
  { label: "CẢNH QUAN", value: "8,6 ha mặt nước - 3,5 ha công viên ven sông, tiện ích all-in-one" },
  { label: "LOẠI HÌNH", value: "Biệt thự & Dinh thự hạng sang, căn hộ cao tầng" },
  { label: "HIỆN TRẠNG", value: "Nhà đã xây, sổ hồng riêng" },
];

const BADGES = ["Nhà đã xây", "Có thể tham quan thực tế", "Không gian sống cho gia đình nhiều thế hệ"];

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

        {/* Ảnh masterplan + caption */}
        <motion.figure
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="m-0 overflow-hidden rounded-[14px]"
          style={{ marginBottom: "clamp(24px,2.8vw,38px)" }}
        >
          <Image
            src="/landing/waterpoint/waterpoint-masterplan-thanh-pho-ben-song.webp"
            alt="Mặt bằng tổng thể Waterpoint 355ha với các cụm phân khu Rivera, Aquaria, Park Village, Central Park và Southgate"
            width={1920}
            height={1080}
            className="block h-auto w-full"
          />
          <figcaption
            className="mt-2.5 text-center"
            style={{ fontSize: 12, color: "#5B7B82", letterSpacing: "0.04em" }}
          >
            Mặt bằng tổng thể 355 ha — các cụm phân khu
          </figcaption>
        </motion.figure>

        {/* Bảng thông tin: label nền teal, value nền kem */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-[3px] overflow-hidden rounded-[14px]"
        >
          {INFO_ROWS.map((row) => (
            <div
              key={row.label}
              className="grid"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
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
          {BADGES.map((b) => (
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
