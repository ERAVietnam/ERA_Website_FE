"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { c } from "../theme";
import { infrastructureItems } from "../data";

export function InfrastructureSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const onMouseUp = () => setIsDragging(false);

  return (
    <section className="py-16 md:py-24 overflow-hidden" style={{ background: "#1b2c21" }}>
      <div className="text-center max-w-[820px] mx-auto px-6 mb-9">
        <div className="text-xs font-medium tracking-[2.5px] uppercase" style={{ color: c.gold }}>
          Lộ trình hạ tầng 2025 - 2026
        </div>
        <h2
          className="font-medium mt-3 leading-[1.1] tracking-wide text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(26px,3.4vw,44px)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          Hạ tầng hoàn thiện tới đâu, phố gần tới đó.
        </h2>
        <p className="text-xs tracking-[1.5px] uppercase mt-4 flex items-center justify-center gap-2" style={{ color: c.gold }}>
          Kéo ngang, vuốt, hoặc bấm mũi tên để xem tuyến thời gian
        </p>
      </div>
      <div className="relative">
        <button
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-2xl transition-colors"
          style={{ background: "rgba(27,44,33,.72)", border: "1px solid rgba(205,180,135,.55)" }}
          onClick={() => scrollRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
        >
          ‹
        </button>
        <button
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-2xl transition-colors"
          style={{ background: "rgba(27,44,33,.72)", border: "1px solid rgba(205,180,135,.55)" }}
          onClick={() => scrollRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
        >
          ›
        </button>
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-[clamp(18px,2vw,30px)] overflow-x-auto scrollbar-thin px-6 md:px-[clamp(24px,7vw,90px)] pb-5"
          style={{ scrollSnapType: "x proximity", cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* 2025 marker */}
          <div
            className="flex-shrink-0 flex flex-col justify-center border-l-2 pl-5"
            style={{ borderColor: c.gold, flexBasis: "clamp(148px,15vw,194px)", scrollSnapAlign: "start" }}
          >
            <span
              className="font-semibold leading-[.95] block"
              style={{
                fontSize: "clamp(46px,5.5vw,70px)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: c.gold,
              }}
            >
              2025
            </span>
            <span className="text-xs mt-2 uppercase tracking-wider font-medium" style={{ color: "rgba(255,255,255,.72)" }}>
              Khởi động
              <br />
              trục kết nối phía Tây
            </span>
          </div>

          {/* 2025 feature card */}
          <article
            className="flex-shrink-0 flex flex-col justify-center rounded-2xl p-7"
            style={{
              flexBasis: "clamp(256px,27vw,320px)",
              scrollSnapAlign: "start",
              background: "linear-gradient(140deg,rgba(178,154,106,.22),rgba(255,255,255,.03))",
              border: "1px solid rgba(178,154,106,.34)",
            }}
          >
            <div className="text-[32px] mb-3" style={{ color: c.gold }}>✦</div>
            <h4 className="text-white text-lg font-medium leading-snug">
              Khởi điểm thúc đẩy kết nối cửa ngõ phía Tây TP.HCM
            </h4>
            <p className="text-[13.5px] mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,.72)" }}>
              Bệ phóng cho cả vùng đô thị phía Tây bứt tốc.
            </p>
          </article>

          {/* 2025 items */}
          {infrastructureItems[0].items.map((item) => (
            <article
              key={item.title}
              className="flex-shrink-0 flex flex-col"
              style={{ flexBasis: "clamp(256px,27vw,320px)", scrollSnapAlign: "start" }}
            >
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-white/10">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-white text-base font-medium mt-4 leading-snug">{item.title}</h4>
              <dl className="mt-3 flex flex-col gap-2">
                {item.meta.map((m) => (
                  <div key={m.label} className="grid grid-cols-[58px_1fr] gap-2.5 items-baseline">
                    <dt className="text-[10.5px] uppercase tracking-wider font-semibold" style={{ color: c.gold }}>
                      {m.label}
                    </dt>
                    <dd className="text-[13.5px] text-white/85 leading-snug">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}

          {/* 2026 marker */}
          <div
            className="flex-shrink-0 flex flex-col justify-center border-l-2 pl-5"
            style={{ borderColor: c.gold, flexBasis: "clamp(148px,15vw,194px)", scrollSnapAlign: "start" }}
          >
            <span
              className="font-semibold leading-[.95] block"
              style={{
                fontSize: "clamp(46px,5.5vw,70px)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: c.gold,
              }}
            >
              2026
            </span>
            <span className="text-xs mt-2 uppercase tracking-wider font-medium" style={{ color: "rgba(255,255,255,.72)" }}>
              Đón
              <br />
              "điểm rơi" hạ tầng
            </span>
          </div>

          {/* 2026 items */}
          {infrastructureItems[1].items.map((item, idx) => (
            <article
              key={item.title}
              className="flex-shrink-0 flex flex-col"
              style={{
                flexBasis:
                  idx === 1
                    ? "clamp(320px,36vw,420px)"
                    : "clamp(256px,27vw,320px)",
                scrollSnapAlign: "start",
              }}
            >
              <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-white/10">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-white text-base font-medium mt-4 leading-snug">{item.title}</h4>
              <dl className="mt-3 flex flex-col gap-2">
                {item.meta.map((m) => (
                  <div key={m.label} className="grid grid-cols-[58px_1fr] gap-2.5 items-baseline">
                    <dt className="text-[10.5px] uppercase tracking-wider font-semibold" style={{ color: c.gold }}>
                      {m.label}
                    </dt>
                    <dd className="text-[13.5px] text-white/85 leading-snug">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
          <div className="flex-shrink-0 flex flex-col justify-center text-center" style={{ flexBasis: "clamp(168px,16vw,200px)" }}>
            <div className="text-[28px]" style={{ color: c.gold }}>◉</div>
            <span
              className="block text-xl font-semibold mt-2 leading-snug text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Forest Onsen
              <br />tâm điểm kết nối vùng
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Lead Band (Form A) ─── */
