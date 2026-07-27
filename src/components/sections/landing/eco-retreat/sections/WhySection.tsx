"use client";

import Image from "next/image";
import { c, fonts } from "../theme";
import { whyItems } from "../data";

export function WhySection() {
  return (
    <section className="reveal max-w-[1180px] mx-auto px-5 md:px-6 py-[88px]">
      <div className="max-w-[940px] mx-auto mb-10 text-center">
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
          Lý do chọn Rừng Phượng
        </span>
        <h2
          className="font-black leading-[1.06] tracking-tight mt-3.5"
          style={{ color: c.green, fontSize: "clamp(30px,4.4vw,54px)" }}
        >
          Vì sao một gia đình{" "}
          <span style={{ color: c.red }}>chọn về đây</span>
        </h2>
      </div>

      <div
        className="grid md:grid-cols-[1fr_1.05fr] gap-8 md:gap-12 items-center"
        data-stack
      >
        <div className="group overflow-hidden rounded-[22px] min-h-[420px] h-full" style={{ boxShadow: "0 22px 54px rgba(0,0,0,0.16)" }}>
          <Image
            src="/landing/eco-retreat/02_img/rung-phuong-phoi-canh-sp-biet-thu-san-vuon-01.webp"
            alt="Biệt thự sân vườn Rừng Phượng buổi chiều, gia đình quây quần bên vườn phượng"
            width={580}
            height={620}
            loading="lazy"
            className="w-full h-full object-cover block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            style={{ willChange: "transform" }}
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-[18px]">
          {whyItems.map((item) => (
            <div
              key={item.title}
              className="pl-5"
              style={{ borderLeft: "3px solid #E5391C" }}
            >
              <div
                className="font-bold text-[16.5px] mb-1"
                style={{ color: c.green }}
              >
                {item.title}
              </div>
              <p
                className="m-0 text-[14.5px] leading-relaxed"
                style={{ color: c.text }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
