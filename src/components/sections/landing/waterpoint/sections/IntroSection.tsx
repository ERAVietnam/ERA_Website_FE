"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const MASK_FADE =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.05) 8%, rgba(0,0,0,.13) 15%, rgba(0,0,0,.25) 22%, rgba(0,0,0,.4) 29%, rgba(0,0,0,.57) 36%, rgba(0,0,0,.74) 43%, rgba(0,0,0,.89) 50%, #000 58%)";

function StatCaption({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <figcaption
      className="absolute inset-x-0 bottom-0"
      style={{
        padding: "clamp(16px,1.9vw,26px)",
        background:
          "linear-gradient(to top, rgba(9,42,48,.82) 0%, rgba(9,42,48,.42) 48%, rgba(9,42,48,0) 100%)",
      }}
    >
      <span
        className="block leading-none font-extrabold tracking-[-0.01em] text-white"
        style={{ fontSize: "clamp(30px,3.6vw,46px)" }}
      >
        {value}
        <span
          className="ml-[0.14em] font-semibold opacity-90"
          style={{ fontSize: "0.42em", letterSpacing: "0.02em" }}
        >
          {unit}
        </span>
      </span>
      <span
        className="mt-2 block text-xs font-semibold tracking-[0.11em] text-white/85"
      >
        {label}
      </span>
    </figcaption>
  );
}

const MOSAIC = [
  {
    area: "big",
    src: "waterpoint-flycam-dai-do-thi-ven-song",
    alt: "Flycam toàn cảnh đại đô thị Waterpoint bên sông với hàng trăm căn nhà đã hoàn thiện",
    value: "355",
    unit: "ha",
    label: "ĐẠI ĐÔ THỊ",
    eager: true,
  },
  {
    area: "side1",
    src: "waterpoint-bo-ke-hoa-mat-nuoc",
    alt: "Bờ kè hoa chạy dọc mặt nước trong khu",
    value: "8,6",
    unit: "ha",
    label: "MẶT NƯỚC",
    eager: false,
  },
  {
    area: "side2",
    src: "waterpoint-canh-quan-hoa-ven-song",
    alt: "Công viên và cảnh quan hoa ven sông",
    value: "3,5",
    unit: "ha",
    label: "CÔNG VIÊN VEN SÔNG",
    eager: false,
  },
  {
    area: "wide",
    src: "waterpoint-duong-pho-noi-khu-shophouse",
    alt: "Đường nội khu Waterpoint với dãy shophouse đã hoàn thiện, cây xanh và xe cộ qua lại",
    value: "1.500+",
    unit: "căn",
    label: "ĐÃ BÀN GIAO",
    eager: false,
  },
] as const;

export function IntroSection() {
  return (
    <section className="w-full" style={{ backgroundColor: "#F4F9FA", padding: "clamp(56px,6vw,92px) 22px" }}>
      <div className="mx-auto max-w-[1180px]">
        {/* Block 1: text phải + ảnh dọc mask fade */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="aq-intro mb-[clamp(30px,3.4vw,48px)] grid grid-cols-[1.12fr_0.88fr] items-center gap-[clamp(24px,3.4vw,54px)]"
        >
          <div className="aq-intro-text text-right">
            <span
              className="block leading-[1.1] italic"
              style={{
                fontFamily: "'WP Cormorant Garamond', serif",
                color: theme.primarySoft,
                fontSize: "clamp(23px,2.7vw,35px)",
              }}
            >
              &ldquo;Thành phố bên sông&rdquo;
            </span>
            <h2
              className="mt-1.5 font-extrabold tracking-[0.01em]"
              style={{
                color: theme.primary,
                fontSize: "clamp(27px,4.2vw,54px)",
                lineHeight: 1.06,
              }}
            >
              WATERPOINT
              <br />
              355HA
            </h2>
            <span
              className="my-[clamp(16px,1.8vw,24px)] ml-auto block"
              style={{
                width: 1,
                height: "clamp(26px,3vw,44px)",
                backgroundColor: "rgba(29,88,102,.3)",
              }}
            />
            <p
              className="ml-auto"
              style={{ color: theme.primarySoft, fontSize: 17, lineHeight: 1.8, maxWidth: "46ch" }}
            >
              Sông lớn ôm ba mặt, kênh đào chạy trong lòng khu, cây đã cao quá đầu ngườI và bãi
              cỏ đủ rộng để thả một cánh diều. Không phải bản vẽ — đây là Waterpoint của hôm nay.
            </p>
          </div>

          <figure className="aq-intro-fig relative aspect-[2/3] overflow-hidden">
            <Image
              src="/landing/waterpoint/waterpoint-cha-con-tha-dieu-cong-vien.webp"
              alt="Hai cha con thả diều trên bãi cỏ rộng trong công viên Waterpoint, phía sau là hàng dừa và khu nhà đã hoàn thiện"
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover"
              style={{
                WebkitMaskImage: MASK_FADE,
                maskImage: MASK_FADE,
              }}
            />
          </figure>
        </motion.div>

        {/* Block 2: mosaic ảnh + caption số liệu */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="aq-mosaic grid gap-[clamp(10px,1.1vw,16px)]"
          style={{
            gridTemplateColumns: "1.55fr 1fr",
            gridTemplateRows:
              "clamp(165px,18vw,248px) clamp(165px,18vw,248px) clamp(200px,23vw,320px)",
            gridTemplateAreas: "'big side1' 'big side2' 'wide wide'",
          }}
        >
          {MOSAIC.map((m) => (
            <figure key={m.area} className="group relative m-0 overflow-hidden" style={{ gridArea: m.area }}>
              <Image
                src={`/landing/waterpoint/${m.src}.webp`}
                alt={m.alt}
                fill
                priority={m.eager}
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <StatCaption value={m.value} unit={m.unit} label={m.label} />
            </figure>
          ))}
        </motion.div>

        {/* Block 3: quote giữa */}
        <motion.p
          {...fadeUp}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-[clamp(26px,3vw,40px)] text-center italic"
          style={{
            maxWidth: 660,
            fontFamily: "'WP Cormorant Garamond', serif",
            color: theme.primary,
            fontSize: "clamp(19px,2.1vw,27px)",
            lineHeight: 1.45,
          }}
        >
          Sông nước, cây xanh, khoảng trờI rộng — quê mình,
          <br className="hidden sm:block" /> ở một phiên bản đầy đủ hơn.
        </motion.p>
      </div>

      {/* Mobile: đơn giản hóa grid */}
    </section>
  );
}
