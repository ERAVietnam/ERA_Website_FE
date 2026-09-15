"use client";

import { motion } from "framer-motion";
import { theme } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const PARAGRAPHS = [
  <>
    Công việc vẫn cần ở Sài Gòn. Con cái vẫn cần một môi trường học tập tốt để lớn lên. Nhưng{" "}
    <strong style={{ color: theme.primary }}>ba mẹ ở miền Tây thì ngày một lớn tuổi</strong>.
  </>,
  <>
    Căn hộ có thể vừa đủ cho gia đình nhỏ, nhưng khi ba mẹ lên ở lâu hơn, nhu cầu về{" "}
    <strong style={{ color: theme.primary }}>
      một phòng riêng, khoảng sân và không gian sống thoải mái cho nhiều thế hệ
    </strong>{" "}
    bắt đầu rõ hơn.
  </>,
  <>
    Chuyển hẳn về quê lại không dễ khi{" "}
    <strong style={{ color: theme.primary }}>
      công việc và tương lai của con vẫn gắn với TP.HCM
    </strong>
    .
  </>,
];

export function StorySection() {
  return (
    <section className="w-full" style={{ background: theme.iceMid, padding: "clamp(58px,6vw,96px) 22px" }}>
      <div className="mx-auto max-w-[1180px]">
        {/* Heading giữa */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[900px] text-center"
        >
          <span
            className="block leading-[1.1] italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(22px,2.5vw,33px)",
            }}
          >
            Đã đến lúc bạn cần một căn nhà…
          </span>
          <h2 className="mt-3.5 font-normal">
            <span
              className="mx-auto block font-semibold"
              style={{
                maxWidth: "38ch",
                color: "#5A7C84",
                fontSize: "clamp(14.5px,1.55vw,20px)",
                lineHeight: 1.55,
                letterSpacing: "0.005em",
              }}
            >
              Khi sự nghiệp đã vững vàng ở Sài Gòn,
              <br />
              điều cần vun đắp tiếp theo, là
            </span>
            <span
              className="mx-auto mt-[clamp(9px,1.1vw,14px)] block font-extrabold tracking-[0.005em]"
              style={{ color: theme.primary }}
            >
              <span
                className="block font-bold tracking-[0.05em]"
                style={{ fontSize: "clamp(15px,2.45vw,30px)", lineHeight: 1.2 }}
              >
                MỘT NƠI ĐỂ
              </span>
              <span
                className="-mt-[0.02em] block pt-[0.06em] pb-[0.04em] font-extrabold"
                style={{
                  fontSize: "clamp(33px,5.45vw,67px)",
                  lineHeight: 1.22,
                  backgroundImage:
                    "linear-gradient(96deg,#174C59 0%,#1D5866 38%,#2E7C8C 74%,#3F97A8 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                BA THẾ HỆ
              </span>
              <span
                className="block font-extrabold"
                style={{ fontSize: "clamp(23px,3.85vw,47px)", lineHeight: 1.2 }}
              >
                ĐƯỢC GẦN NHAU HƠN.
              </span>
            </span>
          </h2>
        </motion.div>

        {/* Trục TP.HCM ⇄ WATERPOINT ⇄ MIỀN TÂY */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="aq-truc my-[clamp(30px,3.4vw,48px)] flex flex-wrap items-center justify-center gap-[clamp(10px,2vw,22px)]"
        >
          <span
            className="rounded-xl px-[26px] py-[18px] font-bold tracking-[0.08em]"
            style={{
              background: theme.white,
              color: theme.primary,
              fontSize: "clamp(12px,1.3vw,15px)",
            }}
          >
            TP.HCM
          </span>
          <span aria-hidden className="text-2xl leading-none" style={{ color: theme.primaryLight, fontFamily: "'Segoe UI Symbol','Apple Symbols','Noto Sans Symbols 2',sans-serif" }}>
            ⇄
          </span>
          <span
            className="rounded-xl px-[34px] py-6 font-black tracking-[0.08em] text-white"
            style={{
              background: theme.primary,
              fontSize: "clamp(13px,1.5vw,18px)",
            }}
          >
            WATERPOINT
          </span>
          <span aria-hidden className="text-2xl leading-none" style={{ color: theme.primaryLight, fontFamily: "'Segoe UI Symbol','Apple Symbols','Noto Sans Symbols 2',sans-serif" }}>
            ⇄
          </span>
          <span
            className="rounded-xl px-[26px] py-[18px] font-bold tracking-[0.08em]"
            style={{
              background: theme.white,
              color: theme.primary,
              fontSize: "clamp(12px,1.3vw,15px)",
            }}
          >
            MIỀN TÂY
          </span>
        </motion.div>

        {/* 3 cột text */}
        <div
          className="grid gap-[clamp(18px,2.4vw,30px)]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              {...fadeUp}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="m-0"
              style={{ color: theme.text, fontSize: 18, lineHeight: 1.75 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Hộp kết luận */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mt-[clamp(20px,2.4vw,30px)] rounded-2xl text-center"
          style={{
            background: theme.cream,
            padding: "clamp(24px,3vw,40px)",
          }}
        >
          <p
            className="m-0 italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(19px,2.2vw,28px)",
              lineHeight: 1.4,
            }}
          >
            Bài toán vì thế không còn là chọn Sài Gòn hay miền Tây, mà là tìm một nơi thuận tiện
            để kết nối cả hai.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
