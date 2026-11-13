"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { useInView } from "@/hooks/useInView";
import { Reveal } from "./Reveal";

function useCountUp(end: number, duration = 3500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();
    let frameId = 0;
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration, end, start]);

  return count;
}

function AnimatedStat({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const count = useCountUp(value, 4000, isVisible);
  return <span>{count.toLocaleString("de-DE")}{suffix}</span>;
}

/** Section thay thế tạm thời cho hero workshop có form đặt lịch. */
export function ResalesWorkshopIntroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useInView(statsRef, { threshold: 0.2, once: true });

  return (
    <section className="relative min-h-[620px] overflow-hidden" style={{ backgroundColor: colors.primary.navy.DEFAULT }}>
      <div className="absolute inset-0 z-0">
        <Image
          src="/resale/faq_background.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 z-0 bg-black/10" />
      <Container className="relative z-10 py-12 md:py-16">
        <Reveal>
          <div>
            <div className="flex items-end justify-start gap-10">
              <Image src="/landing/beachtro-tower/era-vietnam-logo-trang.webp" alt="ERA Real Estate" width={100} height={100} className="h-24 w-auto object-contain" />
              <Image src="/resale/resale_logo_white.svg" alt="ERA Resales Expert" width={190} height={60} className="h-[38px] w-auto" />
            </div>

            <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="flex h-full flex-col pt-8 text-white lg:pt-10">
              <div className="translate-y-[10px]">
                <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-stretch">
                <h1 className="flex shrink-0 items-center font-black leading-[0.85] tracking-tight" style={{ fontSize: "clamp(56px, 8vw, 110px)" }}>
                  LUẬT
                </h1>
                <div className="flex flex-col justify-between text-base font-light italic leading-[1.05] text-white/90 md:text-2xl">
                  <span>Đã chọn</span>
                  <strong className="whitespace-nowrap not-italic font-black text-white">THAY BẠN MỘT NỬA</strong>
                  <span>Nửa còn lại</span>
                </div>
                </div>
                <p className="mt-5 max-w-2xl whitespace-nowrap text-lg font-black leading-tight md:mt-6 md:text-3xl">
                  CHỌN ĐI CÙNG MỘT HỆ THỐNG ĐỦ LỚN
                </p>
              </div>

              <p className="mt-7 max-w-xl translate-y-[10px] text-sm italic leading-relaxed text-white/85 md:text-base">
                Khi môi giới tự do không còn là giải pháp an toàn trước làn sóng chuẩn hóa pháp lý, đừng để rơi hạn hẹp và sự đơn độc cán bước bạn. Khai thác trọn vẹn đòn bẩy từ mạng lưới, nguồn hàng sơ cấp – thứ cấp dồi dào và hệ thống minh bạch tại ERA Vietnam.
              </p>

              <div ref={statsRef} className="mt-auto grid max-w-xl grid-cols-3 gap-2.5 pt-8 md:gap-3">
                {([
                  [2700, "+", "Agent", "/resale/stat-agents.png"],
                  [39, "", "Quốc gia", "/resale/stat-countries.png"],
                  [100, "%", "Minh bạch phí", "/resale/stat-fees.png"],
                ] as const).map(([value, suffix, label, icon]) => (
                  <div key={label} className="relative rounded-2xl border border-white/75 bg-white/10 px-2 pb-3 pt-8 text-center shadow-[inset_0_0_18px_rgba(255,255,255,0.08)] backdrop-blur-md md:px-4 md:pb-4 md:pt-10">
                    <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-3px] z-20 h-1 w-[92%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_18%,rgba(255,255,255,0.28)_30%,rgba(195,225,255,0.72)_50%,rgba(255,255,255,0.28)_70%,rgba(255,255,255,0.08)_82%,transparent_100%)] blur-[1px]" />
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-[-3px] left-1/2 z-20 h-1 w-[92%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_18%,rgba(255,255,255,0.28)_30%,rgba(195,225,255,0.72)_50%,rgba(255,255,255,0.28)_70%,rgba(255,255,255,0.08)_82%,transparent_100%)] blur-[1px]" />
                    <div className="absolute left-1/2 top-0 z-30 h-14 w-14 -translate-x-1/2 -translate-y-1/2 md:h-16 md:w-16">
                      <Image src={icon} alt="" fill className="object-contain" />
                    </div>
                    <div className="text-2xl font-black md:text-4xl"><AnimatedStat value={value} suffix={suffix} isVisible={statsVisible} /></div>
                    <div className="mt-1 text-sm italic text-white/90 md:text-base">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex h-full flex-col justify-between gap-5">
              <div className="relative aspect-[4/3] -translate-y-[22px]">
                <div className="absolute inset-[-10%] z-10">
                  <Image src="/resale/workshop-globe-arrow.png" alt="Mạng lưới ERA Vietnam" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain" />
                </div>
                <div className="absolute inset-x-[10%] bottom-0 top-[10%] z-30">
                  <Image src="/resale/workshop-people.png" alt="Đội ngũ ERA Vietnam" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain object-bottom" />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-40 h-[46%] translate-y-[5px]">
                  <Image src="/resale/workshop-light-ribbon.png" alt="Dải sáng kết nối" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain object-bottom" />
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-3">
                <button type="button" onClick={() => document.getElementById("resales-join-cta")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="group relative block w-[80%] overflow-hidden rounded-full shadow-lg">
                  <Image src="/resale/cta_join_bg.png" alt="" width={531} height={82} className="h-auto w-full" />
                  <span className="absolute inset-0 flex translate-x-[10px] items-center justify-center px-4 text-center text-xs font-black text-white transition-transform duration-300 group-hover:scale-110 md:text-sm">
                    GIA NHẬP ĐỘI NGŨ ERA VIETNAM NGAY
                  </span>
                </button>
                <button type="button" onClick={() => document.getElementById("resales-compare")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="group relative block w-[80%] overflow-hidden rounded-full shadow-lg">
                  <Image src="/resale/cta_compare_bg.png" alt="" width={518} height={74} className="h-auto w-full" />
                  <span className="absolute inset-0 flex translate-x-[10px] items-center justify-center px-4 text-center text-xs font-black text-[#d10024] transition-transform duration-300 group-hover:scale-110 md:text-sm">
                    XEM QUYỀN LỢI &amp; SO SÁNH MÔ HÌNH
                  </span>
                </button>
              </div>
            </div>
          </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
