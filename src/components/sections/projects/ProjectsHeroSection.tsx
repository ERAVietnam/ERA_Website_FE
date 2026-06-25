"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { getProjectCardImage } from "@/lib/projects";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { Search, ChevronDown, ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/types/api";

interface ProjectsHeroSectionProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  suggestions?: Project[];
  showSuggestions?: boolean;
  setShowSuggestions?: (show: boolean) => void;
  onSelectSuggestion?: (project: Project) => void;
}

export function ProjectsHeroSection({
  value = "",
  onChange,
  onSearch,
  suggestions = [],
  showSuggestions = false,
  setShowSuggestions,
  onSelectSuggestion,
}: ProjectsHeroSectionProps) {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="/project/project_hero_banner.webp"
          alt="Dự án Bất động sản"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${colors.primary.navy.DEFAULT} 0%, ${colors.primary.navy.DEFAULT}dd 30%, transparent 70%)`,
          }}
        />
        {/* Content */}
        <Container size="lg" className="relative h-full flex flex-col justify-end pb-20 md:pb-24">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
            Dự án Bất động sản
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed">
            Khám phá danh mục dự án được chọn lọc khắt khe nhất từ ERA Vietnam.
            <br className="hidden md:block" />
            Tương lai của bạn bắt đầu từ đây.
          </p>
        </Container>
      </div>

      {/* Search Bar */}
      <Container size="lg" className="relative -mt-10 z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-5 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
          {/* Search Input */}
          <div className="flex-[2] relative flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-50">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              onFocus={() => setShowSuggestions?.(true)}
              onBlur={() => setTimeout(() => setShowSuggestions?.(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch?.();
              }}
              placeholder="Khám phá giỏ hàng 100+ dự án của ERA"
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-20">
                {suggestions.map((project) => {
                  const thumbnailUrl = getProjectCardImage(project);
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onSelectSuggestion?.(project);
                      }}
                      className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        {thumbnailUrl ? (
                          <Image
                            src={thumbnailUrl}
                            alt={project.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-xs">No img</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {project.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <MapPin size={10} className="shrink-0" />
                          {project.location || "—"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {/* Search Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSearch?.()}
            className="gap-1.5 px-4 py-2 text-xs"
          >
            TÌM <ArrowRight size={12} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
