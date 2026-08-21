"use client";

import { useState, useRef, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { colors, withOpacity } from "@/lib/theme";
import { offices } from "@/lib/offices";

const officeLabels: Record<string, string> = {
  south: "TPHCM",
  central: "Đà Nẵng",
  north: "Hà Nội",
  "artisan-park": "Artisan Park",
  "nha-be": "Nhà Bè",
  "binh-tan": "Bình Tân",
  "eco-retreat": "Eco Retreat",
};

function MarqueeOfficeTabs({
  activeOffice,
  onSelect,
}: {
  activeOffice: string;
  onSelect: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let lastTime = performance.now();
    const step = (time: number) => {
      if (!container || isDraggingRef.current) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const delta = time - lastTime;
      if (delta > 16) {
        container.scrollLeft += 0.5;
        const singleSetWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        }
        lastTime = time;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
    container.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDrag = () => {
    const container = scrollRef.current;
    if (container) container.style.cursor = "grab";
    isDraggingRef.current = false;
  };

  const duplicatedOffices = [...offices, ...offices, ...offices];

  return (
    <div
      ref={scrollRef}
      className="flex gap-3 overflow-x-auto select-none w-full"
      style={{
        cursor: "grab",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {duplicatedOffices.map((office, idx) => {
        const isActive = office.id === activeOffice;
        return (
          <button
            key={`${office.id}-${idx}`}
            onClick={() => onSelect(office.id)}
            className="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: isActive
                ? colors.primary.navy.DEFAULT
                : colors.gray[100],
              color: isActive ? colors.neutral.white : colors.gray[500],
            }}
          >
            {officeLabels[office.id] || office.name}
          </button>
        );
      })}
    </div>
  );
}

export function ContactOfficesSection() {
  const [activeOffice, setActiveOffice] = useState("south");
  const active = offices.find((o) => o.id === activeOffice) || offices[0];

  return (
    <Section padding="sm" bg="white">
      <div data-nosnippet="true">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: colors.primary.navy.DEFAULT }}
          />
          <h2
            style={{
              color: colors.primary.navy.DEFAULT,
              fontWeight: 700,
              fontSize: '30px',
            }}
          >
            Hệ thống văn phòng
          </h2>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Tabs - marquee auto-scroll */}
          <MarqueeOfficeTabs activeOffice={activeOffice} onSelect={setActiveOffice} />

          {/* Map */}
          <div className="relative h-[280px]">
            <div
              className="relative rounded-xl p-2 h-full"
              style={{
                backgroundColor: colors.neutral.white,
                boxShadow: `0 20px 50px -12px ${withOpacity(colors.neutral.black, 0.15)}`,
              }}
            >
              <div className="absolute inset-2 rounded-lg overflow-hidden">
                <iframe
                  key={active.mapSrc}
                  src={active.mapSrc}
                  title={`ERA Vietnam Office - ${active.name}`}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: colors.primary.navy.DEFAULT }}
          >
            <p
              className="tracking-wider mb-1"
              style={{
                color: colors.tertiary.orange.DEFAULT,
                fontWeight: 600,
                fontSize: '12px',
              }}
            >
              {active.region}
            </p>
            <h3
              className="mb-3"
              style={{
                color: colors.neutral.white,
                fontWeight: 700,
                fontSize: '20px',
              }}
            >
              {active.name}
            </h3>

            <div className="flex items-start gap-2 mb-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={colors.neutral.white} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p
                style={{
                  color: colors.neutral.white,
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: 1.5,
                }}
              >
                {active.address}
              </p>
            </div>
            {active.phone && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={colors.neutral.white} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <p
                  style={{
                    color: withOpacity(colors.neutral.white, 0.85),
                    fontSize: '14px',
                  }}
                >
                  {active.phone}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {/* Left - Office List */}
          <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto scrollbar-thin p-3">
            {offices.map((office) => {
              const isActive = office.id === activeOffice;
              return (
                <button
                  key={office.id}
                  onClick={() => setActiveOffice(office.id)}
                  className="w-full text-left rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:scale-[1.01]"
                  style={{
                    backgroundColor: isActive ? colors.primary.navy.DEFAULT : colors.neutral.white,
                    boxShadow: isActive
                      ? `0 10px 30px ${withOpacity(colors.neutral.black, 0.18)}`
                      : `0 4px 14px ${withOpacity(colors.neutral.black, 0.08)}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className="tracking-wider mb-0.5"
                        style={{
                          color: isActive ? colors.tertiary.orange.DEFAULT : colors.secondary.DEFAULT,
                          fontWeight: 600,
                          fontSize: '11px',
                        }}
                      >
                        {office.region}
                      </p>
                      <h3
                        className="mb-2"
                        style={{
                          color: isActive ? colors.neutral.white : colors.gray[600],
                          fontWeight: 700,
                          fontSize: '18px',
                        }}
                      >
                        {office.name}
                      </h3>

                      {isActive && (
                        <>
                          {/* Divider */}
                          <div
                            className="mb-2"
                            style={{
                              height: '1px',
                              backgroundColor: withOpacity(colors.neutral.white, 0.2),
                            }}
                          />

                          <div className="flex items-start gap-2 mb-1.5">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={colors.neutral.white} strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <p
                              style={{
                                color: colors.neutral.white,
                                fontWeight: 400,
                                fontSize: '13px',
                                lineHeight: 1.5,
                              }}
                            >
                              {office.address}
                            </p>
                          </div>
                          {office.phone && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={colors.neutral.white} strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                              </svg>
                              <p
                                className="text-xs"
                                style={{
                                  color: withOpacity(colors.neutral.white, 0.85),
                                }}
                              >
                                {office.phone}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isActive ? withOpacity(colors.neutral.white, 0.1) : colors.gray[50] }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isActive ? colors.neutral.white : colors.gray[400]} strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right - Map */}
          <div className="lg:col-span-2 relative h-[400px] lg:h-auto lg:min-h-[520px]">
            <div
              className="relative rounded-xl p-3 h-full"
              style={{
                backgroundColor: colors.neutral.white,
                boxShadow: `0 20px 50px -12px ${withOpacity(colors.neutral.black, 0.15)}`,
              }}
            >
              <div className="absolute inset-3 rounded-lg overflow-hidden">
                <iframe
                  key={active.mapSrc}
                  src={active.mapSrc}
                  title={`ERA Vietnam Office - ${active.name}`}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}
