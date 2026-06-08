"use client";

import Image from "next/image";
import { c } from "../theme";
import { ritualSteps } from "../data";

export function RitualSection() {
  return (
    <section id="mot-ngay" className="py-16 md:py-28" style={{ background: c.mist }}>
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="text-center max-w-[560px] mx-auto mb-12">
          <div className="text-xs font-medium tracking-[2.5px] uppercase" style={{ color: c.greenSoft }}>
            Một ngày sống wellness
          </div>
          <div className="w-[46px] h-px mx-auto mt-5 mb-5" style={{ background: c.gold }} />
          <h2
            className="font-medium leading-[1.1] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,44px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: c.ink,
            }}
          >
            Không phải lịch trình. Là nhịp sống.
          </h2>
        </div>
        <div className="max-w-[780px] mx-auto">
          {ritualSteps.map((step, i) => (
            <div
              key={i}
              className="grid grid-cols-[64px_1fr] md:grid-cols-[84px_1fr_1.1fr] gap-4 md:gap-8 items-center py-6 border-t"
              style={{ borderColor: c.line }}
            >
              <div
                className="text-[27px] font-semibold"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: c.greenSoft,
                  fontStyle: "italic",
                }}
              >
                {step.time}
              </div>
              <div>
                <h4
                  className="text-[22px] font-semibold mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: c.ink,
                  }}
                >
                  {step.title}
                </h4>
                <p className="text-[15px]" style={{ color: c.inkSoft }}>
                  {step.desc}
                </p>
              </div>
              <div className="hidden md:block rounded-2xl overflow-hidden aspect-[16/10] relative group" style={{ boxShadow: "0 18px 44px -26px rgba(39,68,52,.4)" }}>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-[1s] group-hover:scale-[1.06]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Proof ─── */
