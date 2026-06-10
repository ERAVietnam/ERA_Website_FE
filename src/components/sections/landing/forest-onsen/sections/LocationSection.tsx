"use client";

import Image from "next/image";
import { c } from "../theme";

export function LocationSection() {
  return (
    <section id="vi-tri" className="py-16 md:py-28" style={{ background: c.mist }}>
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="reveal text-center max-w-[680px] mx-auto mb-11">
          <div className="w-[46px] h-px mx-auto mb-5" style={{ background: c.gold }} />
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,44px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Sáng đi làm ở phố.
            <br />Tối về sống wellness.
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: c.inkSoft }}>
            Hạ tầng phía Tây hoàn thiện từng ngày, trung tâm TP.HCM ngày một gần -
            để wellness thành nhịp sống mỗi tối, không còn là chuyến đi xa.
          </p>
        </div>
        <div
          className="rounded-2xl overflow-hidden bg-white"
          style={{ boxShadow: "0 26px 60px -32px rgba(39,68,52,.4)" }}
        >
          <Image
            src="/landing/forest-onsen/02_img/vitri/forest-onsen-ban-do-lien-ket-vung.jpg"
            alt="Bản đồ liên kết vùng Forest Onsen"
            width={1200}
            height={826}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

