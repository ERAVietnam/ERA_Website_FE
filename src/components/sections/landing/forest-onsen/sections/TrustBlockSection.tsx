"use client";

import Image from "next/image";
import { c } from "../theme";

export function TrustBlockSection() {
  return (
    <section className="py-0 md:pt-0 md:pb-16 bg-white">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-12">
          {[
            { b: "Q1/2026", s: "Khởi công" },
            { b: "Q3/2028", s: "Bàn giao dự kiến" },
            { b: "662", s: "Căn tháp Onsen R1 - R2" },
            { b: "Sổ hồng", s: "Sở hữu lâu dài" },
          ].map((item) => (
            <div
              key={item.s}
              className="p-6 rounded-2xl border"
              style={{ background: c.mist2, borderColor: c.line }}
            >
              <b
                className="block text-[34px] font-semibold leading-none"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: c.green,
                }}
              >
                {item.b}
              </b>
              <span className="text-[13px] mt-2 block" style={{ color: c.inkSoft }}>
                {item.s}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-10 items-center rounded-2xl p-6 md:p-10" style={{ background: c.mist }}>
          <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 18px 44px -26px rgba(39,68,52,.4)" }}>
            <Image
              src="/landing/forest-onsen/02_img/brand/forest-onsen-chung-nhan-era.jpg"
              alt="Chứng nhận đại lý phân phối chính thức"
              width={1100}
              height={646}
              className="w-full"
            />
          </div>
          <div>
            <h3
              className="font-semibold leading-tight mb-3"
              style={{
                fontSize: "clamp(22px,2.6vw,30px)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: c.ink,
              }}
            >
              Phân phối chính thức bởi ERA Vietnam.
            </h3>
            <p className="text-[15px]" style={{ color: c.inkSoft }}>
              Phát triển bởi Tập đoàn Ecopark - đơn vị kiến tạo các đại đô thị
              Ecopark Hưng Yên, Eco Central Park Vinh. Cố vấn khoáng nóng bởi KTS
              Tadakatsu Honda.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-full bg-white border" style={{ color: c.greenDeep, borderColor: c.line }}>
              ✓ Đại lý phân phối chính thức
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

