"use client";

import { motion } from "framer-motion";
import { theme } from "../theme";
import { connectionPoints } from "../data";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

export function ConnectionSection() {
  return (
    <section
      className="w-full"
      style={{ padding: "clamp(58px,6vw,96px) 22px", backgroundColor: "#F4F9FA" }}
    >
      <div className="mx-auto max-w-[1180px]">
      {/* Heading giữa */}
      <motion.div
        {...fadeUp}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mb-10 max-w-[880px] text-center"
      >
        <h2 className="m-0 font-normal">
          <span
            className="block font-bold tracking-[0.16em]"
            style={{ color: "#7A9AA2", fontSize: "clamp(12.5px,1.65vw,20px)", lineHeight: 1.4 }}
          >
            WATERPOINT 355HA
          </span>
          <span
            className="mt-[0.1em] block font-extrabold tracking-[0.005em]"
            style={{ color: theme.primary, fontSize: "clamp(25px,3.95vw,50px)", lineHeight: 1.2 }}
          >
            VẪN Ở SÀI GÒN, VẪN GẦN QUÊ
          </span>
        </h2>
        <p
          className="mt-3.5 italic"
          style={{
            fontFamily: "'WP Cormorant Garamond', serif",
            color: theme.primary,
            fontSize: "clamp(18px,2vw,25px)",
            lineHeight: 1.4,
          }}
        >
          Thêm một căn nhà, và thêm cả một đại đô thị bên sông.
        </p>
      </motion.div>

      {/* 4 cards */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
      >
        {connectionPoints.map((p, i) => (
          <motion.div
            key={p.no}
            {...fadeUp}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="rounded-2xl transition-transform duration-300 hover:-translate-y-1.5"
            style={{ background: theme.cream, padding: "clamp(22px,2.4vw,30px)" }}
          >
            <div
              className="leading-none font-semibold"
              style={{
                fontFamily: "'WP Cormorant Garamond', serif",
                fontSize: 32,
                color: theme.primaryLight,
              }}
            >
              {p.no}
            </div>
            <div className="mt-2 text-[17px] font-extrabold" style={{ color: theme.primary }}>
              {p.title}
            </div>
            <p className="mt-2 mb-0 text-[17px] leading-[1.65]" style={{ color: theme.primarySoft }}>
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Hộp teal */}
      <motion.div
        {...fadeUp}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="mt-4 rounded-[18px] text-center"
        style={{ background: theme.primary, padding: "clamp(28px,3.4vw,48px)" }}
      >
        <p
          className="m-0 italic"
          style={{
            fontFamily: "'WP Cormorant Garamond', serif",
            color: theme.white,
            fontSize: "clamp(20px,2.4vw,31px)",
            lineHeight: 1.4,
          }}
        >
          Ngôi nhà có thể rộng vài trăm mét vuông. Không gian sống của gia đình có thể rộng đến
          355 ha.
        </p>
      </motion.div>

      {/* Note cuối */}
      <motion.p
        {...fadeUp}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-[22px] mb-0 text-center"
        style={{ color: theme.textSoft, fontSize: 17, lineHeight: 1.7, maxWidth: 760 }}
      >
        Nhưng một nơi &ldquo;ở giữa&rdquo; chỉ thực sự có ý nghĩa khi việc di chuyển đủ thuận tiện
        để trở thành một phần của cuộc sống.
      </motion.p>
      </div>
    </section>
  );
}
