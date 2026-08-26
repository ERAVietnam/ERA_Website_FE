"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const gradientText = {
  background: "linear-gradient(90deg, #C9A373, #FFE59B, #B18755)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as React.CSSProperties;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const leftColumn = {
  time: "10 PHÚT",
  title: "Tâm điểm kết nối",
  points: [
    "Vincom Plaza, Co.opmart & Chợ Bảo Lộc",
    "Nút giao Cao tốc Dầu Giây - Liên Khương",
    "Cụm du lịch: Thác Damb'ri, Đồi chè Tâm\nChâu, Tea Connect",
  ],
};

const rightColumn = {
  time: "20 PHÚT",
  title: "Liên tuyến kết nối",
  points: [
    "1h30 → Sân bay Quốc tế Liên Khương",
    "2h00 → Tp. Đà Lạt, TP. Phan Thiết\n(QL55), TP. Gia Nghĩa",
    "2h30 → TP. Hồ Chí Minh (Kết nối thông\nsuốt qua Cao tốc)",
  ],
};

const mobileGroups = [
  {
    time: "05 PHÚT",
    title: "Tiện ích dân sinh",
    points: [
      "Bệnh viện Đa khoa Lâm Đồng 2 & Hệ thống Y tế Phường 3",
      "Hệ thống trường học các cấp (THPT Nguyễn Du, THCS Hùng Vương)",
      "Danh thắng Hồ Nam Phương, Chùa Trà",
    ],
  },
  {
    time: "10 PHÚT",
    title: "Tâm điểm kết nối",
    points: [
      "Vincom Plaza, Co.opmart & Chợ Bảo Lộc",
      "Nút giao Cao tốc Dầu Giây - Liên Khương",
      "Cụm du lịch: Thác Damb'ri, Đồi chè Tâm Châu, Tea Connect",
    ],
  },
  {
    time: "20 PHÚT",
    title: "Liên tuyến kết nối",
    points: [
      "1h30 → Sân bay Quốc tế Liên Khương",
      "2h00 → Tp. Đà Lạt, TP. Phan Thiết (QL55), TP. Gia Nghĩa",
      "2h30 → TP. Hồ Chí Minh (Kết nối thông suốt qua Cao tốc)",
    ],
  },
];

const dividerHorizontal = {
  background: "linear-gradient(90deg, transparent, #C9A373, #FFE59B, #B18755, transparent)",
} as React.CSSProperties;

function PointsList({ points }: { points: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-white/90 sm:text-sm">
      {points.map((point, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/80" />
          <span className="whitespace-pre-line">{point}</span>
        </li>
      ))}
    </ul>
  );
}

export function LocationSection() {
  return (
    <section className="relative flex min-h-[90dvh] w-full items-center justify-center overflow-hidden py-14 sm:min-h-[80dvh] sm:py-20">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/landing/phu-gia-bao-loc/images/location_bg.png')" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <motion.div
          className="mb-10 flex flex-col items-center text-white sm:mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            className="inline-grid grid-cols-[auto_auto] gap-x-1 sm:gap-x-2"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="whitespace-nowrap text-right text-2xl font-bold tracking-wide sm:text-4xl">
              MỘT TỌA
            </div>
            <div className="whitespace-nowrap text-left text-2xl font-bold tracking-wide sm:text-4xl">
              ĐỘ
            </div>
            <div />
            <div className="whitespace-nowrap text-left text-2xl font-bold tracking-wide sm:text-4xl">
              VẠN KẾT NỐI
            </div>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <Image
              src="/landing/phu-gia-bao-loc/images/location_title.png"
              alt="Đắt Giá"
              width={589}
              height={204}
              className="mx-auto mt-2 h-24 w-auto sm:h-32"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Mobile content */}
        <motion.div
          className="mx-auto block max-w-md px-6 sm:hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {mobileGroups.map((group, idx) => (
            <motion.div key={idx} variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
              {idx > 0 && <div className="my-6 h-px w-full" style={dividerHorizontal} />}
              <div className="text-4xl font-semibold" style={gradientText}>
                {group.time}
              </div>
              <div className="mt-1 text-lg font-semibold text-white">{group.title}</div>
              <PointsList points={group.points} />
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop content */}
        <motion.div
          className="hidden grid-cols-1 gap-10 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* 10 phút */}
          <motion.div className="sm:justify-self-end sm:pr-8" variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div className="text-4xl font-semibold sm:text-5xl" style={gradientText}>
              {leftColumn.time}
            </div>
            <div className="mt-1 text-lg font-semibold text-white sm:text-xl">
              {leftColumn.title}
            </div>
            <PointsList points={leftColumn.points} />
          </motion.div>

          {/* Vertical divider */}
          <div
            className="hidden w-px opacity-60 sm:block"
            style={{
              background: "linear-gradient(180deg, transparent, #C9A373, #FFE59B, #B18755, transparent)",
            }}
          />

          {/* 20 phút */}
          <motion.div className="sm:pl-8" variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div className="text-4xl font-semibold sm:text-5xl" style={gradientText}>
              {rightColumn.time}
            </div>
            <div className="mt-1 text-lg font-semibold text-white sm:text-xl">
              {rightColumn.title}
            </div>
            <PointsList points={rightColumn.points} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
