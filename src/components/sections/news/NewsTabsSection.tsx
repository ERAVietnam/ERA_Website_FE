"use client";

import { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors, withOpacity } from "@/lib/theme";
import { newsApi } from "@/api/domains/news";
import { getArticleImage } from "@/lib/news";
import { formatDate } from "@/lib/date";
import { Search, Loader2, Calendar, ArrowRight } from "lucide-react";
import type { NewsCategory, NewsArticle } from "@/types/api";

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

interface NewsSearchBoxProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit?: () => void;
}

export function NewsSearchBox({ query, onQueryChange, onSubmit }: NewsSearchBoxProps) {
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const term = query.trim();
    if (!term) {
      queueMicrotask(() => {
        setResults([]);
        setLoading(false);
        setOpen(false);
      });
      return;
    }

    queueMicrotask(() => setLoading(true));
    const timer = setTimeout(async () => {
      try {
        const data = await newsApi.getPublishedArticles({ search: term, limit: 8 });
        setResults(data);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open && query.trim()) {
        setOpen(true);
        return;
      }
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        window.location.href = `/tin-tuc/${results[activeIndex].slug}/`;
      } else if (onSubmit) {
        onSubmit();
      } else {
        window.location.href = `/tin-tuc/tim-kiem?search=${encodeURIComponent(query.trim())}`;
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleViewAll = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      window.location.href = `/tin-tuc/tim-kiem?search=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 lg:w-[380px]">
      <div
        className="flex items-center px-5 py-3 h-12 transition-shadow duration-200 hover:shadow-md"
        style={{
          backgroundColor: colors.neutral.white,
          borderRadius: '12px',
          boxShadow: `0 4px 20px ${withOpacity(colors.neutral.black, 0.08)}`,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm tin tức, dự án hoặc xu hướng..."
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            if (query.trim() && results.length > 0) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none min-w-0"
          style={{
            color: colors.gray[700],
            fontSize: '14px',
          }}
        />
      </div>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          style={{ boxShadow: `0 8px 30px ${withOpacity(colors.neutral.black, 0.12)}` }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-500">
              <Loader2 size={16} className="animate-spin" />
              Đang tìm kiếm...
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-6 text-sm text-gray-500 text-center">
              Không tìm thấy bài viết nào.
            </div>
          ) : (
            <>
              <div className="max-h-[360px] overflow-y-auto">
                {results.map((article, index) => {
                  const image = getArticleImage(article);
                  const isActive = index === activeIndex;
                  return (
                    <Link
                      key={article.id}
                      href={`/tin-tuc/${article.slug}/`}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex items-start gap-3 px-4 py-3 transition-colors border-b border-gray-50 last:border-0 ${
                        isActive ? "bg-gray-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {image ? (
                          <Image
                            src={image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                            ERA
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                          <span style={{ color: colors.primary.DEFAULT }}>{article.category.name}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {formatDate(article.displayPublishedAt || article.publishedAt || article.createdAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={handleViewAll}
                className="w-full flex items-center justify-center gap-1.5 py-3 text-sm font-semibold border-t border-gray-100 transition-colors hover:bg-gray-50"
                style={{ color: colors.primary.DEFAULT }}
              >
                Xem tất cả kết quả <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export const NewsTabsSection = memo(function NewsTabsSection({ categories }: NewsTabsSectionProps) {
  const tabs = buildTabs(categories);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/tin-tuc/tim-kiem?search=${encodeURIComponent(query.trim())}`;
    }
  };

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
            <NewsSearchBox
              query={query}
              onQueryChange={setQuery}
              onSubmit={handleSearch}
            />
            <Button
              aria-label="Tìm kiếm"
              variant="primary"
              size="sm"
              className="h-12 w-12 rounded-xl p-0 flex-shrink-0"
              onClick={handleSearch}
            >
              <Search size={20} />
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
