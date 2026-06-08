"use client";

import Image from "next/image";
import { c } from "../theme";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex items-center text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/landing/forest-onsen/02_img/canh/forest-onsen-4-thap-view-ho-thien-nga.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(28,40,32,.42),rgba(28,40,32,.15) 45%,rgba(28,40,32,.55))",
        }}
      />
      <div className="relative z-10 max-w-[680px] px-7 mx-auto pt-10">
        <div className="text-xs font-medium tracking-[2.5px] uppercase text-white/90">
          Onsen cao tầng đầu tiên Miền Nam
        </div>
        <h1
          className="mt-5 mb-5 leading-[1.04]"
          style={{
            fontSize: "clamp(46px,7vw,82px)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 500,
            textShadow: "0 2px 40px rgba(0,0,0,.25)",
          }}
        >
          Mỗi ngày,
          <br />
          <em className="not-italic" style={{ fontStyle: "italic" }}>
            một kỳ nghỉ dưỡng.
          </em>
        </h1>
        <p
          className="max-w-[500px]"
          style={{
            fontSize: "clamp(16px,1.7vw,20px)",
            color: "rgba(255,255,255,.92)",
          }}
        >
          Khoáng nóng Onsen chuẩn Nhật ngay dưới thềm nhà, giữa đại đô thị xanh
          Eco Retreat 220ha.
        </p>
        <div className="flex flex-wrap gap-3 mt-9">
          <a
            href="#dang-ky"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-medium text-white transition-all"
            style={{ background: c.green }}
          >
            Nhận bảng giá & tài liệu{" "}
            <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px]">
              →
            </span>
          </a>
          <a
            href="#dang-ky"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-medium text-white border border-white/55 backdrop-blur-sm transition-all bg-white/10 hover:bg-white/20"
          >
            Đặt lịch tham quan
          </a>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10.5px] tracking-[2px] uppercase text-white/65">
        Khám phá
        <span className="w-px h-[30px] bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}

/* ─── Trust Bar ─── */
