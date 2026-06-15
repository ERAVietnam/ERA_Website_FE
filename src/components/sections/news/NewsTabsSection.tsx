"use client";

import { useState, useRef, useEffect, memo } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors, withOpacity } from "@/lib/theme";
import type { NewsCategory } from "@/types/api";

const eMagazineTab = { id: "magazine", label: "E-Magazine", targetId: "e-magazine" };

function buildTabs(categories: NewsCategory[]) {
  return [
    ...categories.map((cat) => ({
      id: cat.slug,
      label: cat.name,
      targetId: cat.slug,
    })),
    eMagazineTab,
  ];
}

function MarqueeTabs({
  tabs,
  onTabClick,
}: {
  tabs: { id: string; label: string; targetId: string }[];
  onTabClick: (id: string) => void;
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

  const duplicatedTabs = [...tabs, ...tabs, ...tabs];
  if (tabs.length === 0) return null;

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scrollbar-hide select-none w-full"
      style={{ cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {duplicatedTabs.map((tab, idx) => (
        <button
          key={`${tab.id}-${idx}`}
          onClick={() => onTabClick(tab.targetId)}
          className="relative pb-3 cursor-pointer flex-shrink-0 text-gray-500 hover:text-primary transition-colors duration-200 whitespace-nowrap"
          style={{
            fontSize: '18px',
            fontWeight: 500,
          }}
        >
          {tab.label}
          <span
            className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 hover:scale-x-100 transition-transform origin-left duration-200"
            style={{ backgroundColor: colors.primary.DEFAULT }}
          />
        </button>
      ))}
    </div>
  );
}

interface NewsTabsSectionProps {
  categories: NewsCategory[];
}

export const NewsTabsSection = memo(function NewsTabsSection({ categories }: NewsTabsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const tabs = buildTabs(categories);

  const handleTabClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section padding="xs" bg="white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Desktop Tabs */}
          <div className="hidden lg:flex gap-4 lg:gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.targetId)}
                className="group relative pb-3 cursor-pointer whitespace-nowrap flex-shrink-0 text-gray-500 hover:text-primary transition-colors duration-200"
                style={{
                  fontSize: '18px',
                  fontWeight: 500,
                }}
              >
                {tab.label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"
                  style={{ backgroundColor: colors.primary.DEFAULT }}
                />
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto">
            <div
              className="flex items-center px-5 py-3 h-12 flex-1 lg:w-[380px] transition-shadow duration-200 hover:shadow-md"
              style={{
                backgroundColor: colors.neutral.white,
                borderRadius: '12px',
                boxShadow: `0 4px 20px ${withOpacity(colors.neutral.black, 0.08)}`,
              }}
            >
              <input
                type="text"
                placeholder="Tìm kiếm tin tức, dự án hoặc xu hướng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none min-w-0"
                style={{
                  color: colors.gray[700],
                  fontSize: '14px',
                }}
              />
            </div>
            <Button
              aria-label="Tìm kiếm"
              variant="primary"
              size="sm"
              className="h-12 w-12 rounded-xl p-0 flex-shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </Button>
          </div>

          {/* Mobile Tabs - Marquee */}
          <div className="lg:hidden order-3">
            <MarqueeTabs tabs={tabs} onTabClick={handleTabClick} />
          </div>
        </div>
    </Section>
  );
});
