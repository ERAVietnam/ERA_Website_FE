"use client";

import { X, ExternalLink } from "lucide-react";
import { AdminDialog } from "@/components/ui/admin/AdminDialog";
import { NewsDetailPage } from "@/components/sections/news/NewsDetailPage";
import { newsStatusConfig } from "@/lib/news/status";
import type { NewsArticle } from "@/types/api";

interface NewsPreviewDialogProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NewsPreviewDialog({ article, isOpen, onClose }: NewsPreviewDialogProps) {
  if (!isOpen || !article) return null;

  const status = newsStatusConfig[article.status] ?? newsStatusConfig.draft;

  // Đồng bộ với BE (getArticleBySlug): bài chỉ công khai khi đã published
  // VÀ thờ điểm đăng hiển thị không ở tương lai.
  const now = new Date();
  const isPubliclyViewable =
    article.status === "published" &&
    (article.displayPublishedAt
      ? new Date(article.displayPublishedAt) <= now
      : !article.publishedAt || new Date(article.publishedAt) <= now);

  return (
    <AdminDialog isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl">
        <div className="flex-shrink-0 z-10 flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-primary to-primary-deeper px-5 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white">Xem trước bài viết</h3>
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: status.bg,
                  color: status.color,
                }}
              >
                {status.label}
              </span>
            </div>
            <p className="text-xs text-white/80 truncate">{article.title}</p>
          </div>
          <div className="flex items-center gap-2 ml-3">
            {isPubliclyViewable && (
              <a
                href={`/tin-tuc/${article.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/30"
                title="Mở bài viết công khai"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Xem bài đăng</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NewsDetailPage article={article} isPreview />
        </div>
    </AdminDialog>
  );
}
