"use client";

import { colors } from "@/lib/theme";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "about", label: "Về ERA Vietnam" },
  { id: "philosophy", label: "Triết lý kinh doanh" },
  { id: "services", label: "Lĩnh vực hoạt động" },
  { id: "divisions", label: "Đội ngũ Divisions" },
  { id: "awards", label: "Vinh danh" },
  { id: "esg", label: "ESG & CSR" },
];

interface AboutERAVNTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AboutERAVNTabs({ activeTab, onTabChange }: AboutERAVNTabsProps) {
  return (
    <div className="bg-gray-50 shadow-sm pt-10 md:pt-30">
      {/* Desktop: centered static tabs */}
      <div className="hidden md:block overflow-hidden">
        <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 sm:px-8 lg:px-10 py-3 mx-auto max-w-6xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group relative pb-3 px-2 text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-primary whitespace-nowrap"
              )}
            >
              {tab.label}
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"
                style={{ backgroundColor: colors.primary.DEFAULT }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: auto-scroll marquee with duplicated items */}
      <div className="md:hidden overflow-hidden py-3 group/tabs">
        <div
          className="flex w-max animate-tabs-marquee gap-3 px-4 group-hover/tabs:[animation-play-state:paused]"
          style={{ "--tabs-marquee-duration": "16s" } as React.CSSProperties}
        >
          {[...tabs, ...tabs].map((tab, i) => (
            <button
              key={`${tab.id}-m-${i}`}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group relative pb-2 px-2 text-xs font-medium transition-colors duration-200 text-gray-500 hover:text-primary whitespace-nowrap"
              )}
            >
              {tab.label}
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"
                style={{ backgroundColor: colors.primary.DEFAULT }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
