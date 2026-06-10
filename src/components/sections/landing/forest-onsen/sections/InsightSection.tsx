"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { c } from "../theme";

export function InsightSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: c.mist }}>
      <div className="relative min-h-[clamp(460px,58vh,600px)] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage:
              "url('/landing/forest-onsen/02_img/onsen/forest-onsen-co-gai-onsen-suong-may.jpg')",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg,rgba(238,243,238,0) 26%,rgba(238,243,238,.55) 48%,#eef3ee 68%)",
          }}
        />
        <div className="relative z-10 max-w-[1180px] mx-auto px-7 w-full flex justify-end">
          <div className="max-w-[470px] py-10 md:py-0">
            <div className="w-[46px] h-px mb-5" style={{ background: c.gold }} />
            <h2
              className="font-medium leading-[1.1] tracking-wide"
              style={{
                fontSize: "clamp(28px,3.6vw,46px)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: c.ink,
              }}
            >
              Có những món quà không gói được.
              <br />
              <em style={{ color: c.green, fontStyle: "italic" }}>
                Đó là một nơi để khỏe và đẹp mỗi ngày.
              </em>
            </h2>
            <p className="mt-6 text-base md:text-lg" style={{ color: c.inkSoft }}>
              Người đàn ông thành đạt muốn dành cho gia đình điều tốt nhất. Người
              phụ nữ xứng đáng một chốn riêng để chăm sóc bản thân - không phải
              đợi một kỳ nghỉ xa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

