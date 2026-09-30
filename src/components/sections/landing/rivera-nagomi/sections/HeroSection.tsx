"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMG } from "../theme";

const FACTS = [
  { b: "158 căn", span: "4 dòng sản phẩm" },
  { b: "5,8 ha", span: "~3 ha mặt nước" },
  { b: "09/2026", span: "Ra mắt thị trường" },
];

export function HeroSection() {
  return (
    <section className="hero" aria-label="Giới thiệu Rivera Nagomi">
      <Image
        src={`${IMG}/rivera-nagomi-hero-toan-canh-ven-song.webp`}
        alt="Phối cảnh toàn cảnh phân khu Rivera Nagomi 158 căn ven sông Vàm Cỏ Đông trong khu đô thị Waterpoint, Bến Lức"
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: "50% 40%" }}
      />
      <div className="hero-scrim" aria-hidden="true"></div>
      <div className="hero-in">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-box"
        >
          <h1>
            Rivera Nagomi <em>mảnh ghép mới tại Waterpoint</em>
          </h1>
          <p className="hero-sub">
            Cùng khám phá phân khu thấp tầng ven sông của Nam Long và Nishi-Nippon Railroad, mặt
            tiền ĐT.830, Bến Lức.
          </p>
          <ul className="hero-facts">
            {FACTS.map((f) => (
              <li key={f.b}>
                <b>{f.b}</b>
                <span>{f.span}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
