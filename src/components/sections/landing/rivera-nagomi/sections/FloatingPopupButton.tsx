"use client";

import { motion } from "framer-motion";
import { usePopup } from "./PopupForm";

/* Nút nổi góc phải màn hình — bấm để mở popup form nhận bảng giá */
export function FloatingPopupButton() {
  const openPopup = usePopup();

  return (
    <motion.button
      type="button"
      className="pop-fab"
      aria-label="Nhận tư vấn nhanh"
      title="Nhận tư vấn nhanh"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      onClick={() => openPopup()}
    >
      ✉
    </motion.button>
  );
}
