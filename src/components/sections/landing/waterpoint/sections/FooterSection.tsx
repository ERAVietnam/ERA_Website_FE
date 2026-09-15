"use client";

import { motion } from "framer-motion";
import { theme, HOTLINE, HOTLINE_TEL, ZALO_LINK } from "../theme";

export function FooterSection() {
  return (
    <footer
      className="w-full text-center"
      style={{
        background: theme.primaryDark,
        padding: "clamp(36px,4vw,56px) 22px clamp(90px,9vw,110px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-[900px]"
      >
        <div
          className="font-black tracking-[0.02em] text-white"
          style={{ fontSize: 21 }}
        >
          THE AQUA{" "}
          <span
            className="font-semibold tracking-[0.11em]"
            style={{ fontSize: 12, color: "#9CC4CC" }}
          >
            WATERPOINT 355HA
          </span>
        </div>
        <div className="mt-[18px] flex flex-wrap justify-center gap-x-[22px] gap-y-2">
          <a
            href={`tel:${HOTLINE_TEL}`}
            className="font-bold transition-colors hover:text-white"
            style={{ color: "#BFDCDF", fontSize: 14.5 }}
          >
            Hotline: {HOTLINE}
          </a>
          <a
            href={ZALO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold transition-colors hover:text-white"
            style={{ color: "#BFDCDF", fontSize: 14.5 }}
          >
            Zalo tư vấn
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
