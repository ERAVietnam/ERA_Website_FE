"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { academyCoursesApi } from "@/api/domains/academy-courses";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { formatDate } from "@/lib/date";
import { ChevronDown, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import type { AcademyCourse, AcademyCourseTag, PaginationMeta } from "@/types/api";

const DEFAULT_LIMIT = 3;
const ALL_TAG_NAME = "Tất cả khóa học";

function extractBulletsFromHtml(html: string) {
  if (typeof window === "undefined" || !html) return [];

  const doc = new DOMParser().parseFromString(html, "text/html");
  const listItems = Array.from(doc.querySelectorAll("li"))
    .map((item) => item.textContent?.trim() || "")
    .filter(Boolean);

  if (listItems.length > 0) return listItems;

  return Array.from(doc.body.children)
    .map((item) => item.textContent?.trim() || "")
    .filter(Boolean);
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    start = 2;
    end = 4;
  } else if (currentPage >= totalPages - 2) {
    start = totalPages - 3;
    end = totalPages - 1;
  }

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("...");
  pages.push(totalPages);

  return pages;
}

export function AcademyCoursesSection() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [courses, setCourses] = useState<AcademyCourse[]>([]);
  const [tags, setTags] = useState<AcademyCourseTag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });

  const filterTags = useMemo(() => {
    const allTag = tags.find((tag) => tag.name.trim().toLowerCase() === ALL_TAG_NAME.toLowerCase());
    const rest = tags.filter((tag) => tag.id !== allTag?.id);
    return [{ id: "", name: allTag?.name || ALL_TAG_NAME }, ...rest];
  }, [tags]);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [courseResponse, tagResponse] = await Promise.all([
        academyCoursesApi.getPublicCourses({
          page,
          limit: DEFAULT_LIMIT,
          tagIds: selectedTagIds.length > 0 ? selectedTagIds.join(",") : undefined,
        }),
        academyCoursesApi.getPublicTags(),
      ]);

      setCourses(courseResponse.items);
      setMeta(courseResponse.meta);
      setTags(tagResponse);
    } catch {
      setCourses([]);
      setMeta({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
      setError(
        selectedTagIds.length > 0
          ? ""
          : "Không thể tải danh sách khóa học. Vui lòng thử lại sau.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, selectedTagIds]);

  useEffect(() => {
    queueMicrotask(() => loadCourses());
  }, [loadCourses]);

  const handleSelectTag = (tagId: string) => {
    setSelectedTagIds((prev) => {
      if (!tagId) return [];
      return prev.includes(tagId)
        ? prev.filter((item) => item !== tagId)
        : [...prev, tagId];
    });
    setPage(1);
  };

  const visiblePages = getVisiblePages(meta.page, meta.totalPages);

  return (
    <Section padding="sm" bg="white" className="pt-24 md:pt-28">
      <div className="text-center">
        <h2 className="text-3xl font-black leading-tight md:text-4xl" style={{ color: colors.primary.navy.DEFAULT }}>
          <span className="block md:inline" style={{ color: colors.primary.DEFAULT }}>
            ERA ACADEMY
          </span>
          <span className="block md:inline md:ml-2">PHÙ HỢP VỚI AI ?</span>
        </h2>
        <p className="mt-3 text-sm" style={{ color: colors.primary.navy.DEFAULT }}>
          Bắt đầu đúng cách từ việc chọn đúng khóa học
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[180px_1fr]">
        <aside className="h-fit rounded-xl lg:bg-white lg:p-5 lg:shadow-[0_8px_28px_rgba(15,23,42,0.08)]">
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="mb-0 flex w-full items-center justify-between rounded-lg bg-[#C8102E] px-4 py-3 text-left text-xs font-black uppercase text-white lg:pointer-events-none lg:mb-4 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 lg:text-[#C8102E]"
          >
            Chọn khóa học
            <ChevronDown
              size={16}
              className={`transition-transform lg:hidden ${isFilterOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div className={`${isFilterOpen ? "mt-4 block" : "hidden"} space-y-3 lg:mt-0 lg:block`}>
            {filterTags.map((filter) => {
              const active = filter.id ? selectedTagIds.includes(filter.id) : selectedTagIds.length === 0;
              return (
                <button
                  key={filter.id || "all"}
                  type="button"
                  onClick={() => handleSelectTag(filter.id)}
                  className="flex w-full cursor-pointer items-center gap-2 text-left text-xs font-medium text-gray-600"
                >
                  <span
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-sm border ${
                      active ? "border-[#D4112D] bg-[#D4112D]" : "border-gray-300 bg-white"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-sm bg-white" />}
                  </span>
                  {filter.name}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-8">
          {loading && (
            <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-[0_8px_28px_rgba(15,23,42,0.08)]">
              Đang tải khóa học...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl bg-white p-8 text-center text-sm text-red-500 shadow-[0_8px_28px_rgba(15,23,42,0.08)]">
              {error}
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-[0_8px_28px_rgba(15,23,42,0.08)]">
              Chưa có khóa học phù hợp.
            </div>
          )}

          {!loading &&
            !error &&
            courses.map((course) => {
              const bullets = extractBulletsFromHtml(course.description);
              return (
                <article
                  key={course.id}
                  className="group grid gap-6 rounded-xl bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.08)] md:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)]"
                >
                  <div className="relative min-h-[210px] overflow-hidden rounded-lg bg-gray-100">
                    {course.imageMedia?.url ? (
                      <img
                        src={course.imageMedia.url}
                        alt={course.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full min-h-[210px] w-full items-center justify-center text-gray-300">
                        <ImageIcon size={40} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="mb-2 text-xs font-medium text-gray-500">
                      {course.tags.length > 0 ? course.tags.map((tag) => tag.name).join(" / ") : "ERA Academy"}
                    </p>
                    <h3
                      className="text-xl font-bold leading-snug transition-all duration-300 group-hover:font-black"
                      style={{ color: colors.primary.DEFAULT }}
                    >
                      {course.title}
                    </h3>
                    <ol className="mt-4 list-decimal space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600">
                      {bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ol>
                    <p className="mt-4 text-xs italic text-gray-500">
                      Ngày mở dự kiến:{" "}
                      <span className="font-semibold text-[#F97316]">
                        {course.openingDate ? formatDate(course.openingDate) : "COMING SOON"}
                      </span>
                    </p>
                    <Button variant="primary" size="sm" className="mt-4 w-full rounded-lg">
                      ĐĂNG KÝ NGAY
                    </Button>
                  </div>
                </article>
              );
            })}

          {!loading && !error && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={meta.page <= 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-400 shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              {visiblePages.map((pageItem, index) =>
                typeof pageItem === "number" ? (
                  <button
                    key={pageItem}
                    type="button"
                    onClick={() => setPage(pageItem)}
                    className={`h-9 w-9 rounded-lg text-sm font-bold shadow-md ${
                      pageItem === meta.page ? "bg-[#D4112D] text-white" : "bg-white text-gray-500"
                    }`}
                  >
                    {pageItem}
                  </button>
                ) : (
                  <span key={`${pageItem}-${index}`} className="text-sm text-gray-400">
                    {pageItem}
                  </span>
                ),
              )}
              <button
                type="button"
                disabled={meta.page >= meta.totalPages}
                onClick={() => setPage((prev) => Math.min(meta.totalPages, prev + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-400 shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
