"use client";

import Image from "next/image";
import { c, fonts } from "../theme";

const connections = [
  {
    title: "Cao tốc Trung Lương",
    text: "Cách ~5 km, về trung tâm TP.HCM 30-40 phút.",
  },
  {
    title: "Bến Lức - Long Thành",
    text: "Đang hoàn thiện, nối Long An - TP.HCM - Đồng Nai - BR Vũng Tàu.",
  },
  {
    title: "Vành đai 3 TP.HCM",
    text: "Đang triển khai, điểm giao cao tốc Trung Lương cách ~10 phút.",
  },
  {
    title: "QL1A - Võ Văn Kiệt",
    text: "Về Bình Chánh, Q8, Q7 khu Nam TP.HCM qua các nút giao lớn.",
  },
];

export function LocationSection() {
  return (
    <section
      id="vi-tri"
      className="reveal max-w-[1180px] mx-auto px-5 md:px-6 py-[88px]"
    >
      <div className="max-w-[940px] mx-auto mb-10 md:mb-11 text-center">
        <span
          className="inline-block mb-0.5"
          style={{
            color: c.red,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: "clamp(24px,2.5vw,34px)",
            lineHeight: 1.05,
          }}
        >
          Vị trí & kết nối
        </span>
        <h2
          className="font-black leading-[1.06] tracking-tight mt-3.5 mb-4"
          style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
        >
          <span className="block mb-[0.6rem]">
            Về trung tâm TP.HCM <span style={{ color: c.red }}>30-40</span>
          </span>
          <span className="block">
            <span style={{ color: c.red }}>phút</span>, đón ba trục cao tốc lớn
          </span>
        </h2>
        <p
          className="mx-auto max-w-[820px]"
          style={{
            color: c.text,
            fontSize: "clamp(16px,1.5vw,18.5px)",
            lineHeight: 1.7,
          }}
        >
          Khoảng cách không phải là vấn đề nếu đường đi rõ ràng. Rừng Phượng cách cao tốc TP.HCM - Trung Lương khoảng{" "}
          <strong style={{ color: c.red }}>5 km</strong>, từ đó về trung tâm TP.HCM mất{" "}
          <strong style={{ color: c.red }}>30-40 phút</strong>, đồng thởi đón thêm hai tuyến hạ tầng lớn đang hình thành.
        </p>
      </div>

      <div className="group overflow-hidden rounded-[22px]" style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}>
        <Image
          src="/landing/eco-retreat/02_img/rp-vitri-ketnoi.webp"
          alt="Bản đồ kết nối tiểu khu Rừng Phượng với cao tốc TP.HCM - Trung Lương và đường Nguyễn Hữu Trí"
          width={1180}
          height={640}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          style={{ willChange: "transform" }}
        />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7"
        data-grid4
      >
        {connections.map((item) => (
          <div
            key={item.title}
            className="rounded-[14px] p-5"
            style={{ background: c.mist, borderTop: "3px solid #E5391C" }}
          >
            <div
              className="font-extrabold text-[15.5px] mb-1.5"
              style={{ color: c.green }}
            >
              {item.title}
            </div>
            <div className="text-sm leading-relaxed" style={{ color: c.text }}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
