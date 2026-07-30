"use client";

import { useState } from "react";
import Image from "next/image";
import { colors } from "@/lib/theme";

interface OrbitItem {
  logo: string;
  title: string;
  description: string;
  delay?: number;
}

const RING_INNER_ITEMS: OrbitItem[] = [
  {
    logo: "/join/join_century_21.webp",
    title: "CENTURY 21",
    description:
      "'Tiêu chuẩn vàng' của ngành môi giới. Sức mạnh nhận diện vô song cùng mạng lưới chuyên gia tận tâm, bức phá mọi giới hạn tại hơn 86 quốc gia.",
    delay: 0,
  },
  {
    logo: "/about/compass_b5.svg",
    title: "COLDWELL BANKER COMMERCIAL",
    description:
      "Mạng lưới môi giới bất động sản thương mại hàng đầu, kết nối cơ hội đầu tư và giải pháp tài sản chuyên nghiệp trên phạm vi toàn cầu.",
    delay: -7.5,
  },
  {
    logo: "/join/join_era.webp",
    title: "ERA REAL ESTATE",
    description:
      "Tiên phong công nghệ, nhạy bén thờị cuộc. Mạng lưới hiện đại trao quyền cho các nhà môi giới thế hệ mới, tối ưu hóa giao dịch trên toàn cầu.",
    delay: -15,
  },
  {
    logo: "/join/join_coldwell_banker.webp",
    title: "COLDWELL BANKER",
    description:
      "Di sản vĩ đại hơn một thế kỉ. Biểu tượng kinh điển của sự tin cậy, dẫn dắt những chuẩn mực khắt khe nhất trong dịch vụ môi giới chuyên nghiệp.",
    delay: -22.5,
  },
];

const RING_OUTER_ITEMS: OrbitItem[] = [
  {
    logo: "/join/join_sothebys.webp",
    title: "SOTHEBY'S",
    description: "Kế thừa di sản từ nhà đấu giá lừng danh. Đặc quyền kết nối giới siêu giàu toàn cầu với những kiệt tác bất động sản mang tính biểu tưởng.",
    delay: 0,
  },
  {
    logo: "/join/join_croran.webp",
    title: "CORCORAN",
    description: "Tôn vinh phong cách sống độc bản. Dịch vụ môi giới 'may đo' cao cấp, thấu hiểu sâu sắc gu thẩm mỹ của giới tinh hoa thành thị.",
    delay: -10,
  },
  {
    logo: "/join/join_christies.webp",
    title: "CHRISTIE'S",
    description: "Nơi kiến trúc giao thoa cùng nghệ thuật. Mạng lưới môi giới độc quyền chỉ dành riêng cho các dinh thự xa hoa và báu vật triệu đô.",
    delay: -20,
  },
  {
    logo: "/join/join_better_homes.webp",
    title: "BETTER HOMES",
    description: "Hơn cả một giao dịch bất động sản. Thương hiệu truyền cảm hứng, định hình phong cách sống và kiến tạo những không gian tổ ấm đích thực.",
    delay: -30,
  },
];

interface OrbitRingProps {
  radius: number;
  items: OrbitItem[];
  duration: number;
  reverse?: boolean;
  paused: boolean;
  onPauseChange: (paused: boolean) => void;
  zIndexBase: number;
  ringName: string;
  activeRing: string | null;
  onActiveRingChange: (ring: string | null) => void;
  iconSize?: number;
}

function OrbitRing({ radius, items, duration, reverse = false, paused, onPauseChange, zIndexBase, ringName, activeRing, onActiveRingChange, iconSize }: OrbitRingProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const direction = reverse ? " reverse" : "";
  const counterDirection = reverse ? "" : " reverse";
  const ringZIndex = activeRing === ringName ? 50 : zIndexBase;

  const marginOffset = iconSize != null ? iconSize / 2 : 28;

  return (
    <div
      className="absolute top-1/2 left-1/2 rounded-full border border-gray-200/80 pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        transform: "translate(-50%, -50%)",
        zIndex: ringZIndex,
      }}
    >
      {items.map((item, i) => {
        const delay = item.delay != null ? item.delay : -(i * (duration / items.length));
        const animState = paused ? "paused" : "running";

        return (
          <div
            key={item.logo}
            className="absolute top-1/2 left-1/2 w-0 h-0"
          >
            {/* 1. Spin around center */}
            <div
              className="w-0 h-0"
              style={{
                animation: `spin ${duration}s linear infinite${direction}`,
                animationDelay: `${delay}s`,
                animationPlayState: animState,
              }}
            >
              {/* 2. Push out to orbit radius */}
              <div className="w-0 h-0" style={{ transform: `translateY(-${radius}px)` }}>
                {/* 3. Counter-rotate so icon stays upright, centered on orbit */}
                <div
                  className="absolute top-0 left-0 group pointer-events-auto cursor-pointer"
                  style={{
                    marginTop: `-${marginOffset}px`,
                    marginLeft: `-${marginOffset}px`,
                    zIndex: hoveredIndex === i ? 50 : zIndexBase,
                    animation: `spin ${duration}s linear infinite${counterDirection}`,
                    animationDelay: `${delay}s`,
                    animationPlayState: animState,
                  }}
                  onMouseEnter={() => { onPauseChange(true); setHoveredIndex(i); onActiveRingChange(ringName); }}
                  onMouseLeave={() => { onPauseChange(false); setHoveredIndex(null); onActiveRingChange(null); }}
                >
                  {/* Icon placeholder */}
                  <div
                    className={`relative bg-white rounded-2xl border border-gray-100 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-primary shadow-[0_4px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(200,16,46,0.25)] overflow-hidden ${iconSize == null ? "w-14 h-14" : ""}`}
                    style={iconSize != null ? { width: iconSize, height: iconSize } : undefined}
                  >
                    <Image
                      src={item.logo}
                      alt={item.title}
                      fill
                      className="object-contain p-1.5"
                    />
                  </div>

                  {/* Tooltip — temporarily hidden */}
                  {/*
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div
                      className="relative rounded-xl shadow-xl border bg-white overflow-hidden"
                      style={{ borderColor: colors.border.DEFAULT }}
                    >
                      <div
                        className="px-4 py-2.5 text-sm font-bold text-white"
                        style={{ backgroundColor: colors.primary.navy.DEFAULT }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="px-4 py-3 text-sm leading-relaxed"
                        style={{ color: colors.gray[600] }}
                      >
                        {item.description}
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5">
                      <div className="w-3 h-3 rotate-45 bg-white" />
                    </div>
                  </div>
                  */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CompassOrbit({ mobile = false }: { mobile?: boolean }) {
  const [paused, setPaused] = useState(false);
  const [activeRing, setActiveRing] = useState<string | null>(null);

  if (mobile) {
    return (
      <div className="relative origin-center mx-auto" style={{ width: 380, height: 380 }}>
        {/* Center Compass */}
        <div
          className="absolute top-1/2 left-1/2 rounded-full bg-white flex items-center justify-center z-10"
          style={{
            width: 100,
            height: 100,
            transform: "translate(-50%, -50%)",
            boxShadow: `
              0 0 20px 8px rgba(65, 179, 224, 0.35),
              0 0 60px 25px rgba(65, 179, 224, 0.2),
              0 0 100px 50px rgba(65, 179, 224, 0.08)
            `,
          }}
        >
          <Image
            src="/about/about_compass_inter.webp"
            alt="Compass"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Inner ring: 4 icons, clockwise */}
        <OrbitRing radius={95} items={RING_INNER_ITEMS} duration={30} paused={paused} onPauseChange={setPaused} zIndexBase={10} ringName="inner" activeRing={activeRing} onActiveRingChange={setActiveRing} iconSize={38} />

        {/* Outer ring: 4 icons, counter-clockwise */}
        <OrbitRing radius={162} items={RING_OUTER_ITEMS} duration={40} reverse paused={paused} onPauseChange={setPaused} zIndexBase={20} ringName="outer" activeRing={activeRing} onActiveRingChange={setActiveRing} iconSize={38} />
      </div>
    );
  }

  return (
    <div className="relative w-[420px] h-[420px] scale-[0.72] md:scale-100 origin-center mx-auto">
      {/* Center Compass */}
      <div
        className="absolute top-1/2 left-1/2 w-[140px] h-[140px] rounded-full bg-white flex items-center justify-center z-10"
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow: `
            0 0 20px 8px rgba(65, 179, 224, 0.35),
            0 0 60px 25px rgba(65, 179, 224, 0.2),
            0 0 100px 50px rgba(65, 179, 224, 0.08)
          `,
        }}
      >
        <Image
          src="/about/about_compass_inter.webp"
          alt="Compass"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Inner ring: 3 icons, clockwise */}
      <OrbitRing radius={150} items={RING_INNER_ITEMS} duration={30} paused={paused} onPauseChange={setPaused} zIndexBase={10} ringName="inner" activeRing={activeRing} onActiveRingChange={setActiveRing} />

      {/* Outer ring: 4 icons, counter-clockwise */}
      <OrbitRing radius={240} items={RING_OUTER_ITEMS} duration={40} reverse paused={paused} onPauseChange={setPaused} zIndexBase={20} ringName="outer" activeRing={activeRing} onActiveRingChange={setActiveRing} />
    </div>
  );
}

