"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { theme, MAPS_LINK } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const CITY_ICON = (
  <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 21h18M5 21V8.5l5.2-3V21M13.6 21V11l5.4-2.6V21M7.4 11h.9M7.4 14h.9M7.4 17h.9M16 13.4h.9M16 16.2h.9"
      stroke="#1D5866"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RIVER_ICON = (
  <svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M2.6 16.4c1.7 0 1.7 1.5 3.5 1.5s1.7-1.5 3.5-1.5 1.7 1.5 3.5 1.5 1.7-1.5 3.5-1.5 1.7 1.5 3.5 1.5M2.6 20c1.7 0 1.7 1.5 3.5 1.5S7.8 20 9.6 20s1.7 1.5 3.5 1.5S14.8 20 16.6 20s1.7 1.5 3.5 1.5M12 3.2c2.6 1.9 4 4 4 6.2a4 4 0 0 1-8 0c0-2.2 1.4-4.3 4-6.2Z"
      stroke="#1D5866"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CAR_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 17h14M6.5 17v1.6M17.5 17v1.6M4.2 17l1-5.2 1.6-3.4h10.4l1.6 3.4 1 5.2M7 11.8h10"
      stroke="#FFFFFF"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PIN_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
      stroke="#1D5866"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.6" stroke="#1D5866" strokeWidth="1.7" />
  </svg>
);

function RouteSegment({ time }: { time: string }) {
  return (
    <div className="aq-route-seg flex-1 text-center" style={{ minWidth: 96, flexBasis: 96 }}>
      <div
        className="inline-flex items-center gap-1.5 whitespace-nowrap font-extrabold text-white"
        style={{
          background: theme.primary,
          fontSize: 12.5,
          padding: "6px 12px",
          borderRadius: 999,
        }}
      >
        {CAR_ICON}
        {time}
      </div>
      <div className="aq-route-line mt-[11px] border-t-4 border-dotted" style={{ borderColor: "#9DC2CB" }} />
    </div>
  );
}

export function LocationSection() {
  return (
    <section id="vi-tri" className="w-full" style={{ background: theme.cream, padding: "clamp(58px,6vw,96px) 22px" }}>
      <div className="mx-auto max-w-[1180px]">
        {/* Heading */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-[34px] max-w-[860px] text-center"
        >
          <span className="text-sm font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
            VỊ TRÍ &amp; KẾT NỐI
          </span>
          <h2
            className="mt-3 font-extrabold"
            style={{ color: theme.primary, fontSize: "clamp(22px,3.1vw,40px)", lineHeight: 1.15 }}
          >
            TP.HCM ← WATERPOINT → MIỀN TÂY
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
            Ở giữa không có nghĩa là xa cả hai. Mà là thuận cả hai hướng.
          </p>
        </motion.div>

        {/* Sơ đồ tuyến */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[18px] bg-white"
          style={{ padding: "clamp(26px,3.2vw,46px) clamp(18px,2.4vw,36px)", boxShadow: "0 20px 50px rgba(16,51,59,0.12)" }}
        >
          <div id="aq-route-row" className="aq-route-row flex items-center justify-center gap-[clamp(10px,1.4vw,18px)]">
            {/* TP.HCM */}
            <div className="min-w-0 flex-1 text-center">
              <div
                className="mx-auto mb-3 flex items-center justify-center rounded-full"
                style={{ width: 56, height: 56, background: theme.cream }}
              >
                {CITY_ICON}
              </div>
              <div className="text-[15.5px] font-extrabold tracking-[0.04em]" style={{ color: theme.primary }}>
                TP.HCM
              </div>
              <div className="mt-[3px] text-[13px] leading-normal" style={{ color: "#5A7C84" }}>
                Phú Mỹ Hưng · Quận 7
              </div>
            </div>

            <RouteSegment time="~40 phút" />

            {/* WATERPOINT */}
            <div className="text-center" style={{ flex: "0 0 auto" }}>
              <div
                className="relative mx-auto mb-3.5"
                style={{ width: "clamp(126px,15vw,170px)", height: "clamp(126px,15vw,170px)" }}
              >
                <span
                  aria-hidden
                  className="absolute rounded-full border-2 border-[#A8CBD3]"
                  style={{ inset: -9 }}
                />
                <Image
                  src="/landing/waterpoint/waterpoint-flycam-dai-do-thi-ven-song.webp"
                  alt="Ảnh flycam khu đô thị Waterpoint 355ha bên sông Vàm Cỏ Đông"
                  fill
                  sizes="170px"
                  className="rounded-full border-5 border-white object-cover"
                  style={{ boxShadow: "0 12px 30px rgba(16,51,59,.28)" }}
                />
                <span
                  aria-hidden
                  className="absolute bottom-[-9px] left-1/2 -translate-x-1/2 rounded-full whitespace-nowrap font-extrabold tracking-[0.1em] text-white"
                  style={{
                    background: "#C8102E",
                    fontSize: 10.5,
                    padding: "5px 11px",
                    boxShadow: "0 4px 12px rgba(16,51,59,.25)",
                  }}
                >
                  355 HA
                </span>
              </div>
              <div
                className="mt-3.5 font-extrabold tracking-[0.05em]"
                style={{ color: theme.primary, fontSize: "clamp(17px,1.9vw,21px)" }}
              >
                WATERPOINT
              </div>
              <div className="mt-[3px] text-[13px] leading-normal" style={{ color: "#5A7C84" }}>
                An Thạnh · Bến Lức · Long An
              </div>
            </div>

            <RouteSegment time="~35 phút" />

            {/* MIỀN TÂY */}
            <div className="min-w-0 flex-1 text-center">
              <div
                className="mx-auto mb-3 flex items-center justify-center rounded-full"
                style={{ width: 56, height: 56, background: theme.cream }}
              >
                {RIVER_ICON}
              </div>
              <div className="text-[15.5px] font-extrabold tracking-[0.04em]" style={{ color: theme.primary }}>
                MIỀN TÂY
              </div>
              <div className="mt-[3px] text-[13px] leading-normal" style={{ color: "#5A7C84" }}>
                Tiền Giang · các tỉnh phía Tây
              </div>
            </div>
          </div>

          {/* Chân sơ đồ */}
          <div
            className="mt-[clamp(26px,3vw,38px)] flex flex-wrap items-center justify-center gap-x-[22px] gap-y-3.5 border-t pt-[clamp(20px,2.4vw,28px)]"
            style={{ borderColor: "#E6EFF1" }}
          >
            <span className="inline-flex items-center gap-[9px] text-left text-[13.5px] leading-normal" style={{ color: theme.text }}>
              <span
                className="rounded-md font-extrabold whitespace-nowrap text-white"
                style={{ background: theme.primaryLight, fontSize: 10.5, letterSpacing: "0.09em", padding: "5px 10px" }}
              >
                CAO TỐC
              </span>
              Nằm trên trục TP.HCM - Trung Lương, kết nối trực tiếp
            </span>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FDF3EA] px-[18px] py-[11px] text-[13.5px] font-extrabold whitespace-nowrap text-[#1D5866] no-underline transition-colors hover:bg-white"
            >
              {PIN_ICON}
              Xem tuyến trên Google Maps
            </a>
          </div>
        </motion.div>

        {/* Mô tả + 2 card thờI gian */}
        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-[clamp(24px,2.6vw,34px)] mb-0 text-center"
          style={{ color: theme.text, fontSize: 18, lineHeight: 1.75, maxWidth: 860 }}
        >
          Waterpoint kết nối trực tiếp với cao tốc TP.HCM - Trung Lương và mạng lưới giao thông
          liên vùng, thuận tiện cho những gia đình có cuộc sống gắn với cả Sài Gòn và miền Tây.
        </motion.p>

        <div className="mt-[clamp(22px,2.4vw,32px)] grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
          {/* HƯỚNG TP.HCM */}
          <motion.div
            {...fadeUp}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-white"
            style={{ padding: "clamp(22px,2.4vw,30px)" }}
          >
            <div className="text-[13px] font-extrabold tracking-[0.13em]" style={{ color: theme.primary }}>
              HƯỚNG TP.HCM
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { t: "~40′", label: "đến Phú Mỹ Hưng" },
                { t: "~55′", label: "đến trung tâm TP.HCM" },
                { t: "~50′", label: "bằng Waterpoint Bus đến Bến xe Miền Tây" },
              ].map((it) => (
                <div key={it.t + it.label} className="flex items-center gap-3.5">
                  <span
                    className="min-w-[62px] rounded-lg py-2.5 px-3 text-center text-sm font-extrabold text-white"
                    style={{ background: theme.primary }}
                  >
                    {it.t}
                  </span>
                  <span className="text-[15px]" style={{ color: theme.text }}>
                    {it.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* HƯỚNG MIỀN TÂY */}
          <motion.div
            {...fadeUp}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-white"
            style={{ padding: "clamp(22px,2.4vw,30px)" }}
          >
            <div className="text-[13px] font-extrabold tracking-[0.13em]" style={{ color: theme.primary }}>
              HƯỚNG MIỀN TÂY
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3.5">
                <span
                  className="min-w-[62px] rounded-lg py-2.5 px-3 text-center text-sm font-extrabold text-white"
                  style={{ background: theme.primary }}
                >
                  ~35′
                </span>
                <span className="text-[15px]" style={{ color: theme.text }}>
                  đến Tiền Giang, thuận trục kết nối về các tỉnh phía Tây
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <span
                  className="aq-cautoc min-w-[62px] rounded-lg py-2.5 px-3 text-center font-extrabold whitespace-nowrap text-white"
                  style={{ background: theme.primaryLight, fontSize: 11, letterSpacing: "0.08em" }}
                >
                  CAO TỐC
                </span>
                <span className="text-[15px]" style={{ color: theme.text }}>
                  TP.HCM - Trung Lương, kết nối trực tiếp
                </span>
              </div>
            </div>
          </motion.div>
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
          Sáng vẫn có thể về Sài Gòn khi công việc cần. Cuối tuần vẫn thuận đường về thăm ba mẹ -
          Một vị trí giúp khoảng cách giữa công việc, quê nhà và gia đình trở nên gần hơn.
        </motion.p>
        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-4 mb-0 text-center"
          style={{ color: theme.textSoft, fontSize: 12.5, lineHeight: 1.6, maxWidth: 720 }}
        >
          Thời gian di chuyển mang tính tham khảo và phụ thuộc điều kiện giao thông thực tế.
        </motion.p>
      </div>

      {/* Mobile: sơ đồ tuyến xếp dọc */}
    </section>
  );
}
