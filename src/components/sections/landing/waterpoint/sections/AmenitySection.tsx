"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const COLUMNS = [
  {
    img: "canh-quan-hoa-ven-song",
    alt: "Cảnh quan hoa và hàng dừa ven sông tại Waterpoint",
    label: "CHO ÔNG BÀ",
    desc: "Công viên, đường dạo, sông nước và những khoảng xanh cho một nhịp sống thư thái.",
  },
  {
    img: "ho-boi-ngoai-troi",
    alt: "Hồ bơi ngoài trờI trong khu tiện ích Waterpoint",
    label: "CHO BA MẸ",
    desc: "Country Club 3 ha, gym, tennis, hồ bơi, Harbour và kết nối thuận tiện về TP.HCM.",
  },
  {
    img: "san-choi-tre-em",
    alt: "Sân chơi trẻ em giữa khu biệt thự Waterpoint",
    label: "CHO CÁC CON",
    desc: "EMASI Plus, sân chơi, thể thao và không gian xanh để tự do học hỏi, vui chơi, lớn lên.",
  },
];

export function AmenitySection() {
  return (
    <section
      id="tien-ich"
      className="w-full"
      style={{ background: "#FFFFFF", padding: "clamp(58px,6vw,96px) 22px" }}
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Heading */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-[34px] max-w-[880px] text-center"
        >
          <span className="text-sm font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
            HỆ TIỆN ÍCH NỘI KHU
          </span>
          <h2
            className="mt-3 font-extrabold"
            style={{ color: theme.primary, fontSize: "clamp(22px,3.1vw,40px)", lineHeight: 1.15 }}
          >
            MỘT NƠI CHO CẢ BA THẾ HỆ
          </h2>
          <p
            className="mt-3 italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(18px,2vw,25px)",
              lineHeight: 1.4,
            }}
          >
            Ba thế hệ, ba nhịp sống. Vẫn có thể gặp nhau mỗi ngày.
          </p>
        </motion.div>

        {/* Mô tả giới thiệu */}
        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto text-center"
          style={{
            color: theme.text,
            fontSize: 18,
            lineHeight: 1.75,
            maxWidth: 860,
            marginBottom: "clamp(26px,2.8vw,36px)",
          }}
        >
          Đón ba mẹ về ở cùng, thêm một phòng ngủ là chưa đủ. Ở lâu dài cần đủ không gian và
          tiện ích để mỗi thế hệ vẫn có cuộc sống của riêng mình.
        </motion.p>

        {/* 3 cột ảnh */}
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {COLUMNS.map((c, i) => (
            <motion.div
              key={c.label}
              {...fadeUp}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: "clamp(200px,22vw,280px)" }}>
                <Image
                  src={`/landing/waterpoint/waterpoint-${c.img}.webp`}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                className="mt-4 text-[13px] font-extrabold tracking-[0.13em]"
                style={{ color: theme.primary }}
              >
                {c.label}
              </div>
              <p className="mt-[7px] mb-0 text-[17px] leading-[1.7]" style={{ color: theme.primarySoft }}>
                {c.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Box CHO CẢ GIA ĐÌNH */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mt-[18px] rounded-2xl"
          style={{ background: theme.cream, padding: "clamp(24px,2.6vw,34px)" }}
        >
          <div className="text-[13px] font-extrabold tracking-[0.13em]" style={{ color: theme.primary }}>
            CHO CẢ GIA ĐÌNH
          </div>
          <p className="mt-2 mb-0 text-[18px] leading-[1.7]" style={{ color: theme.text }}>
            Thêm những khoảng thời gian bên nhau, từ một vòng đi bộ ven sông đến những cuối tuần
            quây quần.
          </p>
        </motion.div>

        {/* Quote kết */}
        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-[clamp(26px,2.8vw,38px)] mb-0 text-center italic"
          style={{
            fontFamily: "'WP Cormorant Garamond', serif",
            color: theme.primary,
            fontSize: "clamp(20px,2.4vw,30px)",
            lineHeight: 1.4,
            maxWidth: 860,
          }}
        >
          &ldquo;Gần nhau khi muốn, có khoảng riêng khi cần&rdquo; - Để ba thế hệ thực sự sống cùng
          nhau, căn nhà cần đủ chỗ cho cả sự sum vầy lẫn cuộc sống riêng tư.
        </motion.p>
      </div>
    </section>
  );
}
