"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      start = 2;
      end = Math.min(totalPages - 1, 4);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - 3);
      end = totalPages - 1;
    }

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors",
          currentPage <= 1
            ? "cursor-not-allowed opacity-50"
            : "hover:border-gray-300 hover:bg-gray-50"
        )}
        aria-label="Trang trước"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, index) => (
        <button
          key={`${page}-${index}`}
          type="button"
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={cn(
            "flex h-9 min-w-[36px] items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors",
            page === currentPage
              ? "border-[#C8102E] bg-[#C8102E] text-white"
              : page === "..."
              ? "cursor-default border-transparent bg-transparent text-gray-400"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors",
          currentPage >= totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:border-gray-300 hover:bg-gray-50"
        )}
        aria-label="Trang sau"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
