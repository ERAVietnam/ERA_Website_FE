"use client";

import Image from "next/image";
import { c, fonts } from "../theme";

export function HeroSection() {
  return (
    <section id="top" className="relative pt-[54px] md:pt-[64px]">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/landing/eco-retreat/02_img/hero-rung-phuong.jpg"
          alt="Biệt thự vườn Rừng Phượng giữa hàng phượng đỏ, ông bà nghỉ ngơi bên hiên, hai trẻ đọc sách trên thảm cỏ - Eco Retreat"
          width={1920}
          height={1022}
          priority
          className="w-full object-cover"
          style={{ height: "clamp(540px,76vh,840px)", objectPosition: "center bottom" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.16) 34%, rgba(255,255,255,0) 54%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 px-5 md:px-6 pt-4 md:pt-16">
          <div className="max-w-[1180px] mx-auto text-center">
            <span
              className="inline-block border px-3.5 py-1.5 rounded-full text-[10px] md:text-[12.5px] font-bold tracking-[0.14em] uppercase mb-3 md:mb-[clamp(10px,1.6vw,18px)]"
              style={{
                background: "rgba(255,255,255,0.82)",
                borderColor: "rgba(20,66,30,0.18)",
                color: c.green,
                backdropFilter: "blur(4px)",
              }}
            >
              Phân khu Mùa Lễ Hội · Eco Retreat
            </span>
            <h1
              className="font-black leading-none tracking-tight mx-auto"
              style={{
                color: c.green,
                fontSize: "clamp(30px,5.6vw,72px)",
                maxWidth: "14ch",
                textShadow: "0 2px 18px rgba(255,255,255,0.6)",
              }}
            >
              <span
                className="block"
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: "0.5em",
                  color: c.green,
                  marginBottom: "-0.04em",
                }}
              >
                Nơi
              </span>
              <span className="block" style={{ color: c.red, marginBottom: "0.2em" }}>
                mùa tựu
              </span>
              <span className="block" style={{ color: c.red, marginBottom: "0.06em" }}>
                trường đầu tiên
              </span>
              <span
                className="block"
                style={{
                  fontSize: "0.44em",
                  fontWeight: 800,
                  color: c.green,
                  marginTop: "0.1em",
                }}
              >
                của con bắt đầu
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
