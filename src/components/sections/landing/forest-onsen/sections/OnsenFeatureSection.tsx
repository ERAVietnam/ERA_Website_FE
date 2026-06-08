"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { c } from "../theme";

export function OnsenFeatureSection() {
  return (
    <section id="onsen" className="py-16 md:py-28 overflow-hidden" style={{ background: c.mist }}>
      <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[clamp(34px,5vw,70px)] items-center">
        <div className="rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[4/5] relative" style={{ boxShadow: "0 30px 70px -34px rgba(39,68,52,.5)" }}>
          <Image
            src="/landing/forest-onsen/02_img/canh/forest-onsen-vuon-onsen-cay-xanh.webp"
            alt="Vườn Onsen cây xanh kiểu Nhật"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2
            className="font-medium leading-[1.05] tracking-wide"
            style={{
              fontSize: "clamp(30px,4vw,50px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Onsen chuẩn Nhật,
            <br />
            <em style={{ color: c.green, fontStyle: "italic" }}>giữa vườn thiền.</em>
          </h2>
          <p className="mt-5 text-[17px] max-w-[440px]" style={{ color: c.inkSoft }}>
            Công nghệ ion hóa và tạo vi bọt, phân tách 3 dòng khoáng riêng biệt.
            Không phải nước nóng pha bột - một di sản trị liệu thật sự, vận hành
            chuẩn Nhật.
          </p>
          <div className="flex gap-8 mt-8">
            <div className="text-sm" style={{ color: c.inkSoft }}>
              <b
                className="block text-3xl font-semibold leading-none mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: c.green,
                }}
              >
                3
              </b>
              dòng khoáng riêng biệt
            </div>
            <div className="text-sm" style={{ color: c.inkSoft }}>
              <b
                className="block text-3xl font-semibold leading-none mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: c.green,
                }}
              >
                20&quot;
              </b>
              mỗi tối, gột sạch một ngày
            </div>
            <div className="text-sm" style={{ color: c.inkSoft }}>
              <b
                className="block text-3xl font-semibold leading-none mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: c.green,
                }}
              >
                40+
              </b>
              năm kinh nghiệm cố vấn
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Benefits ─── */
