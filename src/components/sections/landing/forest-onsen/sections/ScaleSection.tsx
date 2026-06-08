"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { c } from "../theme";

export function ScaleSection() {
  const stats = [
    { num: "220", unit: "ha", lbl: "Đại đô thị Eco Retreat" },
    { num: "12", unit: "ha", lbl: "Mặt nước Hồ Thiên Nga" },
    { num: "5.000", unit: "m²", lbl: "Tiện ích wellness tầng 5A" },
    { num: "45", unit: "phút", lbl: "Về trung tâm TP.HCM" },
  ];
  return (
    <section className="text-center py-16 md:py-28" style={{ background: c.mist }}>
      <div className="max-w-[740px] mx-auto px-7 mb-10">
        <h2
          className="font-medium leading-[1.1] tracking-wide"
          style={{
            fontSize: "clamp(30px,4vw,50px)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: c.ink,
          }}
        >
          Một đại đô thị 220ha.
          <br />Một tổ hợp trị liệu dưới chân&nbsp;nhà.
        </h2>
        <p className="mt-4 text-base md:text-lg" style={{ color: c.inkSoft }}>
          Forest Onsen tọa lạc giữa lòng Eco Retreat, cửa ngõ phía Tây TP.HCM - đủ
          gần để điều hành công việc, đủ tĩnh để chữa lành mỗi tối.
        </p>
      </div>
      <div
        className="w-full bg-cover bg-center bg-fixed"
        style={{
          height: "clamp(420px,60vh,620px)",
          backgroundImage:
            "url('/landing/forest-onsen/02_img/vitri/forest-onsen-masterplan-eco-retreat.jpg')",
        }}
      />
      <div className="max-w-[920px] mx-auto px-7 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.lbl} className="text-center">
              <div
                className="font-semibold leading-none"
                style={{
                  fontSize: "clamp(36px,4.6vw,54px)",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: c.green,
                }}
              >
                {s.num}
                <small className="text-[.42em] font-medium">{s.unit}</small>
              </div>
              <div className="text-xs tracking-wider mt-2" style={{ color: c.inkSoft }}>
                {s.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── USP Grid ─── */
