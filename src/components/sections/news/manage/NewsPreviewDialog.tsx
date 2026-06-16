"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { NewsDetailPage } from "@/components/sections/news/NewsDetailPage";
import type { NewsArticle } from "@/types/api";

interface NewsPreviewDialogProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NewsPreviewDialog({ article, isOpen, onClose }: NewsPreviewDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 overflow-y-auto">
      <div
        ref={dialogRef}
        className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl my-6"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#C8102E] to-[#9A0B22] px-5 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white">Xem trước bài viết</h3>
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: article.status === "published" ? "#D1FAE5" : article.status === "pending" ? "#FEF3C7" : "#F3F4F6",
                  color: article.status === "published" ? "#059669" : article.status === "pending" ? "#D97706" : "#6B7280",
                }}
              >
                {article.status === "published" ? "Đã đăng" : article.status === "pending" ? "Chờ duyệt" : "Bản nháp"}
              </span>
            </div>
            <p className="text-xs text-white/80 truncate">{article.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-hidden rounded-b-2xl">
          <NewsDetailPage article={article} isPreview />
        </div>
      </div>
    </div>
  );
}
