"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const IMAGES = [
  {
    src: "truong-emasi-plus",
    alt: "Trường EMASI Plus với sân bóng cỏ nhân tạo và đường chạy điền kinh đã hoàn thiện",
    ten: "Trường EMASI Plus",
    mo: "Trường đã vận hành ngay trong khu",
  },
  {
    src: "giai-quan-vot-cup-nam-long",
    alt: "Giải quần vợt Cúp Nam Long tổ chức trên cụm sân tennis Waterpoint",
    ten: "Giải quần vợt Cúp Nam Long",
    mo: "Sân đấu chuẩn quốc gia, cư dân chơi mỗi ngày",
  },
  {
    src: "club-house-ho-boi",
    alt: "Club House Waterpoint với hồ bơi lát hoa văn, dù nghỉ và hàng cọ",
    ten: "Club House & hồ bơi",
    mo: "Tiện ích đã bàn giao và đang dùng",
  },
  {
    src: "biet-thu-club-house-ven-song",
    alt: "Bến du thuyền Waterpoint bên Club House và khu biệt thự mái đỏ ven sông",
    ten: "Bến du thuyền",
    mo: "Bến đã hoạt động, biệt thự ven sông đã có ngườI ở",
  },
  {
    src: "harbour-bai-co-ven-song",
    alt: "Khu Harbour ven sông với cư dân cắm trại và thả diều",
    ten: "Harbour bãi cỏ ven sông",
    mo: "Cuối tuần cư dân cắm trại, thả diều",
  },
  {
    src: "duong-noi-khu-vong-xoay",
    alt: "Đường nội khu Waterpoint với vòng xoay cảnh quan và hàng cây đã lớn",
    ten: "Đường nội khu",
    mo: "Hạ tầng hoàn thiện, cây đã lớn",
  },
];

const STATS = [
  {
    value: "1.500+",
    size: "clamp(24px,2.6vw,32px)",
    label: "sản phẩm thấp tầng đã bàn giao, nhà đã đón cư dân",
  },
  {
    value: "EMASI Plus",
    size: "clamp(20px,2.2vw,27px)",
    label: "trường học đã vận hành ngay trong Waterpoint",
  },
  {
    value: "3 ha",
    size: "clamp(24px,2.6vw,32px)",
    label: "Country Club, cùng Harbour, Central Park, Bus Hub đã hiện hữu",
  },
];

export function ExistingSection() {
  return (
    <section id="hien-huu" className="w-full" style={{ background: theme.iceMid, padding: "clamp(58px,6vw,96px) 22px" }}>
      <div className="mx-auto max-w-[1180px]">
        {/* Heading */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-[34px] max-w-[880px] text-center"
        >
          <span className="text-sm font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
            WATERPOINT HIỆN HỮU
          </span>
          <h2
            className="mt-3 font-extrabold"
            style={{ color: theme.primary, fontSize: "clamp(22px,3.1vw,40px)", lineHeight: 1.15 }}
          >
            MỘT ĐẠI ĐÔ THỊ ĐÃ BƯỚC VÀO CUỘC SỐNG
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
            Một nơi cho cả gia đình không nên chỉ đẹp trên bản vẽ.
          </p>
        </motion.div>

        {/* Accordion ảnh */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="aq-hh-acc"
        >
          {IMAGES.map((img) => (
            <figure key={img.src} className="aq-hh-o">
              <Image
                src={`/landing/waterpoint/waterpoint-${img.src}.webp`}
                alt={img.alt}
                fill
                sizes="(max-width: 760px) 50vw, 20vw"
                className="aq-hh-img"
              />
              <figcaption className="aq-hh-cap">
                <span className="aq-hh-ten">{img.ten}</span>
                <span className="aq-hh-mo">{img.mo}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>

        {/* Mô tả */}
        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-[clamp(24px,2.6vw,34px)] mb-0 text-center"
          style={{ color: theme.text, fontSize: 18, lineHeight: 1.75, maxWidth: 860 }}
        >
          Waterpoint hôm nay không còn là một đô thị của tương lai. Cuộc sống đã hiện hữu qua
          những mái nhà sáng đèn, ngôi trường đón học sinh và những không gian cộng đồng được sử
          dụng mỗi ngày.
        </motion.p>

        {/* 3 stat cards */}
        <div
          className="mt-[clamp(22px,2.4vw,32px)] grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              {...fadeUp}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-[14px] bg-white"
              style={{ padding: 24, borderTop: "3px solid #1D5866" }}
            >
              <div className="leading-none font-black" style={{ color: theme.primary, fontSize: s.size }}>
                {s.value}
              </div>
              <div className="mt-2 text-[15.5px] leading-normal" style={{ color: theme.primarySoft }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote kết */}
        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-[clamp(24px,2.6vw,34px)] mb-0 text-center italic"
          style={{
            fontFamily: "'WP Cormorant Garamond', serif",
            color: theme.primary,
            fontSize: "clamp(18px,2vw,25px)",
            lineHeight: 1.45,
            maxWidth: 820,
          }}
        >
          The Aqua đã hiện hữu để bước vào và cảm nhận. Không chỉ xem nơi mình sẽ sống, mà bắt đầu
          hình dung những ngày cả gia đình thật sự sống tại đây.
        </motion.p>
      </div>
    </section>
  );
}
