"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export function ProductSection() {
  return (
    <section className="relative w-full bg-[#FBF7EF]">
      {/* Title + text with custom background */}
      <div className="w-full bg-[#fdecd2]">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 text-center sm:px-10 sm:py-20 lg:px-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
              <Image
                src="/landing/phu-gia-bao-loc/images/product_title.svg"
                alt="Vị Trí Đắc Địa"
                width={403}
                height={64}
                className="mx-auto h-12 w-auto sm:h-16"
              />
            </motion.div>
            <motion.p
              className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#555555] sm:text-base"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Tọa lạc ngay giao điểm Quốc lộ 20 và đường tránh, kết nối trục cao tốc Dầu Giây – Liên Khương, dự án sở
              hữu tọa độ kết nối hoàn hảo, di chuyển thông suốt không qua nội thị sầm uất, đón trọn biến độ tăng giá theo
              từng km hệ thống hoàn thiện ngay trước ngưỡng cửa.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Map full width */}
      <motion.div
        className="w-full overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/landing/phu-gia-bao-loc/images/product_map.webp"
          alt="Bản đồ vị trí"
          width={1280}
          height={720}
          className="h-auto w-full"
        />
      </motion.div>

      {/* Brochure */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/landing/phu-gia-bao-loc/images/product_brochure.webp"
          alt="Brochure Phú Gia Bảo Lộc"
          width={390}
          height={253}
          className="block w-full transition-transform duration-300 hover:scale-[1.01] sm:hidden"
        />
        <Image
          src="/landing/phu-gia-bao-loc/images/product_brochure.webp"
          alt="Brochure Phú Gia Bảo Lộc"
          width={1920}
          height={960}
          className="hidden w-full transition-transform duration-300 hover:scale-[1.01] sm:block"
        />
      </motion.div>
    </section>
  );
}
