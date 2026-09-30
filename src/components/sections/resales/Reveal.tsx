"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* Bọc nội dung section — fade + trượt nhẹ lên khi cuộn tới (chỉ chạy 1 lần) */
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
