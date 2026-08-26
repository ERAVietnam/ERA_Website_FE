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

const stats = [
  { icon: "/landing/phu-gia-bao-loc/images/overview_logo_1.svg", label: "SỔ HỒNG RIÊNG", sub: "Quy hoạch 1/500" },
  { icon: "/landing/phu-gia-bao-loc/images/overview_logo_2.svg", label: "~30%", sub: "Mật độ xây dựng" },
  { icon: "/landing/phu-gia-bao-loc/images/overview_logo_3.svg", label: "9,12 ha", sub: "Quy mô dự án" },
  { icon: "/landing/phu-gia-bao-loc/images/overview_logo_4.svg", label: "357", sub: "Sản phẩm" },
  { icon: "/landing/phu-gia-bao-loc/images/overview_logo_5.svg", label: "Quốc lộ 20", sub: "Mặt tiền huyết mạch" },
];

const highlights = [
  [
    "Sổ hồng từng nền, quy hoạch 1/500,\nXây dựng ngay",
    "Ngân hàng Nam Á hỗ trợ vay với\nChính sách đặc biệt",
    "Tiến độ thanh toán đến 15 tháng,\nÂn hạn gốc 24 tháng",
  ],
  [
    "Mặt tiền QL20, kết nối cao tốc\nDầu Giây - Liên Khương",
    "Tiện ích nội khu gắn kết đa thế hệ",
    "Cộng đồng văn minh\nAn ninh khép kín 24/7",
  ],
];

export function OverviewSection() {
  return (
    <section className="relative flex min-h-[170dvh] w-full flex-col items-center sm:min-h-[220dvh]">
      {/* Background */}
      <div
        className="absolute inset-0 block bg-cover bg-center bg-no-repeat sm:hidden"
        style={{ backgroundImage: "url('/landing/phu-gia-bao-loc/images/overview_bg_mobile.png')" }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat sm:block"
        style={{ backgroundImage: "url('/landing/phu-gia-bao-loc/images/overview_bg.png')" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-16 sm:px-10 sm:pt-24 lg:px-16">
        {/* Stats row */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-5 sm:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="flex flex-row items-center gap-4 text-left sm:flex-col sm:items-center sm:text-center"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src={stat.icon}
                alt={stat.label}
                width={64}
                height={64}
                className="h-20 w-20 shrink-0 object-contain sm:h-14 sm:w-auto"
              />
              <div className="flex flex-col gap-1">
                <div className="text-xl font-semibold sm:mt-3 sm:text-xl" style={gradientText}>
                  {stat.label}
                </div>
                <div className="whitespace-pre-line text-base font-semibold text-white/80 sm:text-sm">
                  {stat.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leaf divider */}
        <motion.div
          className="my-10 flex items-center justify-center sm:my-14"
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="h-px max-w-md flex-1 sm:max-w-lg"
            style={{
              background: "linear-gradient(90deg, rgba(75,213,150,0), #4BD596 20%, #276F4E 70%, rgba(199,154,107,0.1))",
            }}
          />
          <Image
            src="/landing/phu-gia-bao-loc/images/overview_leaf.svg"
            alt="leaf"
            width={48}
            height={48}
            className="mx-4 h-8 w-auto sm:h-10"
          />
          <div
            className="h-px max-w-md flex-1 sm:max-w-lg"
            style={{
              background: "linear-gradient(90deg, rgba(199,154,107,0.1), #276F4E 30%, #4BD596 80%, rgba(75,213,150,0))",
            }}
          />
        </motion.div>

        {/* Highlights */}
        <motion.div
          className="flex flex-col"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {highlights.map((row, rowIdx) => (
            <div key={rowIdx}>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                {row.flatMap((item, colIdx) => {
                  const cells = [
                    <motion.div
                      key={`item-${colIdx}`}
                      className={`flex flex-col items-start justify-center px-4 pb-4 text-left sm:items-center sm:py-10 sm:text-center ${
                        rowIdx === 0 && colIdx === 0 ? "pt-1 sm:pt-10" : "pt-4 sm:pt-10"
                      }`}
                      variants={fadeUp}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div
                        className="whitespace-pre-line text-lg font-bold sm:text-lg"
                        style={{ ...gradientText, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.45))" }}
                      >
                        {item}
                      </div>
                    </motion.div>,
                  ];

                  if (colIdx < 2) {
                    cells.push(
                      <div
                        key={`divider-${colIdx}`}
                        className="hidden h-full w-[0.5px] sm:block"
                        style={{
                          background: "linear-gradient(180deg, #C9A373, #FFE59B, #B18755)",
                        }}
                      />
                    );
                  }

                  return cells;
                })}
              </div>

              {rowIdx === 0 && (
                <div
                  className="hidden h-[0.5px] w-full sm:block"
                  style={{
                    background: "linear-gradient(90deg, rgba(243,236,224,0), rgba(243,236,224,1) 50%, rgba(243,236,224,0))",
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
