"use client";

import { c } from "../theme";

export function ProofSection() {
  return (
    <section className="py-16 md:py-28 text-center" style={{ background: c.mist }}>
      <div className="max-w-[820px] mx-auto px-7">
        <p
          className="italic font-medium leading-[1.4]"
          style={{
            fontSize: "clamp(22px,3vw,34px)",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: c.greenDeep,
          }}
        >
          &quot;Onsen đích thực không nằm ở nhiệt độ nước, mà ở chất lượng khoáng và sự
          tĩnh tại.&quot;
        </p>
        <div className="mt-5 text-[13.5px] tracking-wider font-medium" style={{ color: c.greenSoft }}>
          KTS Tadakatsu Honda - Cố vấn khoáng nóng dự án
        </div>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mt-10 pt-8 border-t" style={{ borderColor: c.line }}>
          {["ECOPARK", "MORI ONSEN HƯNG YÊN", "VNEXPRESS", "TUỔI TRẺ", "ZNEWS", "ERA VIETNAM"].map(
            (logo) => (
              <span key={logo} className="text-xs tracking-wider font-medium opacity-75" style={{ color: c.inkSoft }}>
                {logo}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

