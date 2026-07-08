"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors, withOpacity } from "@/lib/theme";
import { getProjectCardImage } from "@/lib/projects";
import { projectsApi } from "@/api/domains/projects";
import type { Project } from "@/types/api";

export function ProjectsSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Project[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const data = await projectsApi.getPublishedProjects({
        search: query.trim(),
        limit: 8,
      });
      setSuggestions(data.items);
    } catch {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchSuggestions]);

  const handleSearch = () => {
    const search = searchQuery.trim();
    setShowSuggestions(false);
    router.push(search ? `/du-an/?search=${encodeURIComponent(search)}` : "/du-an/");
  };

  const handleSelectSuggestion = (project: Project) => {
    setSearchQuery(project.name);
    setShowSuggestions(false);
    router.push(`/du-an/${project.slug}/`);
  };

  return (
    <Section
      padding="md" bg="gray"
    >
        {/* Title - Mobile: stacked centered 32px; Desktop: inline left 48px */}
        <h2 
          className="mb-4 text-center lg:text-left"
          style={{
            fontWeight: 900,
          }}
        >
          <span 
            className="text-[32px] lg:text-[48px] lg:mr-2"
            style={{ color: colors.primary.navy.DEFAULT }}
          >
            DANH MỤC DỰ ÁN
          </span>
          <br className="lg:hidden" />
          <span 
            className="text-[32px] lg:text-[48px]"
            style={{ color: colors.primary.DEFAULT }}
          >
            ĐA DẠNG
          </span>
        </h2>

        {/* Description - Mobile: centered 16px; Desktop: left 18px */}
        <p 
          className="mb-10 text-center lg:text-left"
          style={{
            color: colors.gray[600],
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: 1.6,
          }}
        >
          ERA Vietnam là một trong những đơn vị phân phối nhiều dự án nhất thị trường bất động sản. Mạng lưới ERA Vietnam không chỉ mang về nguồn hàng dồi dào mà còn chứng minh năng lực triển khai thực tế xuất sắc.
        </p>

        {/* Search Box - Mobile: icon button; Desktop: text button */}
        <div 
          className="relative flex items-center gap-3 lg:gap-4 p-3 lg:p-4 lg:pr-5 rounded-2xl lg:rounded-3xl mb-12 lg:mb-16"
          style={{ 
            backgroundColor: colors.neutral.white, 
            boxShadow: `0 10px 60px ${withOpacity(colors.neutral.black, 0.12)}` 
          }}
        >
          <div 
            className="flex-1 flex items-center gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl"
            style={{ backgroundColor: colors.gray[50] }}
          >
            {/* Search icon - desktop only */}
            <svg className="hidden lg:block w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={colors.gray[400]} strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Khám phá giỏ hàng 100+ dự án của ERA"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="flex-1 outline-none text-sm bg-transparent"
              style={{ 
                color: colors.gray[700],
              }}
            />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-3 right-3 lg:left-4 lg:right-[156px] top-full mt-2 z-20 max-h-[360px] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-xl">
              {suggestions.map((project) => {
                const thumbnailUrl = getProjectCardImage(project);
                return (
                  <button
                    key={project.id}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectSuggestion(project);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={project.name}
                          fill
                          className="object-cover"
                          style={{ objectPosition: "top right" }}
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                          ERA
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {project.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {project.location || "—"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
          {/* Mobile: Icon button */}
          <Button
            variant="primary"
            size="sm"
            className="lg:hidden w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 p-0"
            onClick={handleSearch}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </Button>
          {/* Desktop: Text button */}
          <Button
            variant="primary"
            size="md"
            className="hidden lg:block px-10 py-3 rounded-xl font-semibold text-sm"
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </div>

        {/* Mobile: Text on top + Images vertical; Desktop: Images horizontal + Text bottom */}
        <div className="flex flex-col">
          {/* Stats - Mobile: top center; Desktop: center */}
          <div className="flex flex-col lg:flex-col mb-6 lg:mt-6 lg:mb-0 order-1 lg:order-2 text-center">
            {/* Desktop: 110 DỰ ÁN cùng hàng, cùng size, căn giữa */}
            <div 
              className="hidden lg:flex items-baseline mt-10 justify-center gap-4 leading-none"
              style={{
                color: colors.secondary.DEFAULT,
                fontWeight: 900,
                fontSize: 'clamp(80px, 10vw, 140px)',
              }}
            >
              <span>110</span>
              <span>DỰ ÁN</span>
            </div>
            
            {/* Mobile: 110 DỰ ÁN cùng hàng, cùng size */}
            <div 
              className="flex items-baseline justify-center gap-2 lg:hidden leading-none"
              style={{
                color: colors.secondary.DEFAULT,
                fontWeight: 900,
                fontSize: 'clamp(56px, 12vw, 80px)',
              }}
            >
              <span>110</span>
              <span>DỰ ÁN</span>
            </div>
            
            {/* Subtitle */}
            <span 
              className="mt-2 lg:mt-4"
              style={{
                color: colors.primary.navy.DEFAULT,
                fontWeight: 500,
                fontSize: 'clamp(20px, 5vw, 42px)',
              }}
            >
              Giao dịch thành công năm 2025
            </span>
          </div>

          {/* Project Images - Mobile: vertical stack; Desktop: horizontal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
              <Image
                src="/home/home_pj_01.webp"
                alt="Dự án 1"
                width={800}
                height={600}
                className="w-full h-auto transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
              <Image
                src="/home/home_pj_02.webp"
                alt="Dự án 2"
                width={800}
                height={600}
                className="w-full h-auto transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
              <Image
                src="/home/home_pj_03.webp"
                alt="Dự án 3"
                width={800}
                height={600}
                className="w-full h-auto transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
    </Section>
  );
}
