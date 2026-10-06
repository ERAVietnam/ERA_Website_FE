"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* Bọc nội dung section — fade + trượt nhẹ khi cuộn tới (chỉ chạy 1 lần).
   Thay thế hệ reveal .rv của mẫu. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* Biểu tượng cái quạt dùng ở mọi .head của mẫu */
export function Quat() {
  return (
    <svg className="quat" viewBox="0 0 34 28" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 26a14 14 0 0 1 28 0" />
        <path d="M8 26a9 9 0 0 1 18 0" />
        <path d="M13 26a4 4 0 0 1 8 0" />
        <path d="M17 4v22M7 9l10 17M27 9 17 26" />
      </g>
    </svg>
  );
}
