"use client";

import { motion } from "framer-motion";
import { theme } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const PRICE_CARDS = [
  { value: "12 – 35", unit: " tỷ", label: "khoảng giá mỗi căn" },
  { value: "470 – 682", unit: " m²", label: "diện tích đất" },
  { value: "366 – 478", unit: " m²", label: "diện tích xây dựng" },
  { value: "Đã xây", unit: "", label: "nhà hiện hữu, xem được ngay" },
];

export function PriceSection() {
  const scrollToForm = () =>
    document.getElementById("dang-ky")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="gia" className="w-full" style={{ background: "#FFFFFF", padding: "clamp(58px,6vw,96px) 22px" }}>
      <div className="mx-auto max-w-[1180px]">
        {/* Heading — mẫu KHÔNG có h2, chỉ eyebrow + quote */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-8 max-w-[880px] text-center"
        >
          <span className="text-sm font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
            GIÁ &amp; PHƯƠNG ÁN SỞ HỮU
          </span>
          <p
            className="mt-3.5 mb-0 italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(19px,2.2vw,28px)",
              lineHeight: 1.4,
            }}
          >
            Một quyết định lớn cần nhìn rõ cả ngôi nhà lẫn dòng tiền.
          </p>
        </motion.div>

        {/* Khối giá nền kem */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[20px]"
          style={{ background: theme.cream, padding: "clamp(28px,3.4vw,52px)" }}
        >
          <div className="text-center">
            <div className="text-[15.5px] font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
              RỔ HÀNG THE AQUA · CẬP NHẬT 07/2026
            </div>
            <div
              className="mt-2 leading-[1.05] font-black"
              style={{ color: theme.primary, fontSize: "clamp(36px,5.4vw,70px)" }}
            >
              từ 46 triệu
              <span className="text-[0.42em] font-bold">/m²</span>
            </div>
            <div className="mt-[9px] text-[14.5px] leading-[1.6]" style={{ color: theme.primarySoft }}>
              46 – 59 triệu/m² đất, tuỳ căn, vị trí và hướng cảnh quan
              <br />
              <span className="text-[12.5px]">đã gồm VAT và chính sách bán hàng · chưa gồm phí bảo trì</span>
            </div>
          </div>

          {/* 4 ô số liệu */}
          <div
            className="mt-[clamp(24px,2.8vw,34px)] grid gap-3.5"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))" }}
          >
            {PRICE_CARDS.map((c, i) => (
              <motion.div
                key={c.label}
                {...fadeUp}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-[14px] bg-white text-center"
                style={{ padding: "18px 16px" }}
              >
                <div className="leading-[1.15] font-black" style={{ color: theme.primary, fontSize: "clamp(19px,2.3vw,25px)" }}>
                  {c.value}
                  {c.unit && <span className="text-[0.6em] font-bold">{c.unit}</span>}
                </div>
                <div className="mt-1.5 text-[12.5px] leading-[1.45]" style={{ color: theme.primarySoft }}>
                  {c.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 2 card nhận giỏ hàng + chính sách */}
          <div
            className="mt-[clamp(26px,3vw,40px)] grid gap-[18px]"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
          >
            <motion.div
              {...fadeUp}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-[14px] bg-white"
              style={{ padding: 24 }}
            >
              <div className="text-[13px] font-extrabold tracking-[0.13em]" style={{ color: theme.primary }}>
                NHẬN GIỎ HÀNG THE AQUA
              </div>
              <ul className="mt-3 mb-0 pl-5 text-[17px] leading-[1.8]" style={{ color: theme.primarySoft }}>
                <li>Vị trí căn &amp; giá bán</li>
                <li>Diện tích &amp; tầm view</li>
                <li>Lịch &amp; chính sách thanh toán</li>
              </ul>
            </motion.div>
            <motion.div
              {...fadeUp}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-[14px] bg-white"
              style={{ padding: 24 }}
            >
              <div className="text-[13px] font-extrabold tracking-[0.13em]" style={{ color: theme.primary }}>
                CHÍNH SÁCH THAM KHẢO
              </div>
              <ul className="mt-3 mb-0 pl-5 text-[17px] leading-[1.8]" style={{ color: theme.primarySoft }}>
                <li>Hỗ trợ lãi suất tối đa 9%/năm</li>
                <li>Ân hạn gốc &amp; ưu đãi theo từng chương trình</li>
              </ul>
            </motion.div>
          </div>

          <p
            className="mx-auto mt-[18px] mb-0 text-center"
            style={{ fontSize: 12, color: "#6B8A90", maxWidth: 640, lineHeight: 1.65 }}
          >
            Số liệu theo giỏ hàng chủ đầu tư cập nhật tháng 07/2026. Giá và tình trạng căn thay
            đổi theo từng thời điểm, vui lòng liên hệ để nhận bảng hàng mới nhất.
          </p>

          <div className="mt-[clamp(24px,2.8vw,34px)] flex justify-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="cursor-pointer rounded-full border-none bg-[#1D5866] px-[34px] py-[18px] font-extrabold tracking-[0.08em] text-white transition-colors hover:bg-[#2E7C8C]"
              style={{
                fontSize: "clamp(13px,1.4vw,15px)",
              }}
            >
              NHẬN GIỎ HÀNG & LỊCH THANH TOÁN
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
