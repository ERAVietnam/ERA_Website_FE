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

/* Dấu ấn hình chữ A dùng ở mọi .head của mẫu */
export function AMark() {
  return (
    <svg className="amark" viewBox="0 0 34 26" aria-hidden="true">
      <path d="M17 1 33 25h-7L17 11 8 25H1Z" fill="currentColor" />
    </svg>
  );
}
