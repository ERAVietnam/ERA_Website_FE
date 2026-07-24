"use client";

import Image from "next/image";
import { c, fonts } from "../theme";

const items = [
  "Phát triển trong đại đô thị Eco Retreat, thuộc hệ sinh thái Ecopark - đơn vị có lịch sử triển khai các khu đô thị xanh.",
  "Sản phẩm cấp sổ từng căn. Hồ sơ pháp lý chi tiết được đội ngũ cung cấp khi tư vấn trực tiếp.",
  "Thanh toán gắn với tiến độ, giúp khách kiểm soát rủi ro.",
  "Tiện ích lõi (trường, đại lộ, công viên) nằm trong quy hoạch tiểu khu, không phải hạng mục \"sẽ có\".",
];

export function TrustSection() {
  return (
    <section
      className="reveal relative py-[100px] px-5 md:px-6 overflow-hidden group"
      style={{ background: "linear-gradient(120deg,#14421E,#1b3a2a)" }}
    >
      <Image
        src="/landing/eco-retreat/02_img/rung-phuong-phoi-canh-tong-toan-canh-ven-song-03.png"
        alt="Phối cảnh tiểu khu Rừng Phượng ven sông với biệt thự, tháp cao và cụm trường học"
        fill
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        style={{ willChange: "transform" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg,rgba(15,52,26,0.85),rgba(15,52,26,0.45))",
        }}
      />
      <div className="relative z-[2] max-w-[960px] mx-auto">
        <span
          className="inline-block mb-0.5"
          style={{
            color: c.lime,
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: "clamp(24px,2.5vw,34px)",
            lineHeight: 1.05,
          }}
        >
          An tâm · Chủ đầu tư & pháp lý
        </span>
        <h2
          className="font-black leading-[1.06] tracking-tight mt-3.5 mb-6 md:mb-7 max-w-[720px]"
          style={{ color: c.white, fontSize: "clamp(30px,4.4vw,54px)" }}
        >
          Chọn nơi đã có tên tuổi,{" "}
          <span style={{ color: c.lime }}>thay vì đánh cược</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-4" data-stack>
          {items.map((item) => (
            <div
              key={item}
              className="rounded-[14px] p-5 md:p-[20px_22px] text-[14.5px] leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
