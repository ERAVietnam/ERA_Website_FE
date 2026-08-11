"use client";

import { useState } from "react";
import Link from "next/link";
import { colors } from "@/lib/theme";
import { authorsApi } from "@/api/domains/authors";
import { Pagination } from "@/components/ui/Pagination";
import { formatDate } from "@/lib/date";
import type { AuthorPublicArticle, PaginatedResponse } from "@/types/api";

const PAGE_LIMIT = 6;

type TabType = "written" | "reviewed";

interface AuthorPostsTabsProps {
  slug: string;
  written: PaginatedResponse<AuthorPublicArticle>;
  reviewed: PaginatedResponse<AuthorPublicArticle>;
  reviewNote?: string | null;
}

function ArticleCard({ article }: { article: AuthorPublicArticle }) {
  const dateValue = article.displayPublishedAt || article.publishedAt;

  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className="group rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <p className="mb-1.5 text-xs text-gray-500">
        {article.category?.name ? `${article.category.name} · ` : ""}
        {dateValue ? formatDate(dateValue) : ""}
      </p>
      <p
        className="line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-primary"
        style={{ color: colors.primary.navy.DEFAULT }}
      >
        {article.title}
      </p>
      {article.summary && (
        <p className="mt-1.5 line-clamp-2 text-sm text-gray-500">{article.summary}</p>
      )}
    </Link>
  );
}

export function AuthorPostsTabs({ slug, written, reviewed, reviewNote }: AuthorPostsTabsProps) {
  const hasReviewed = reviewed.meta.total > 0;
  const [activeTab, setActiveTab] = useState<TabType>(
    written.meta.total > 0 || !hasReviewed ? "written" : "reviewed",
  );
  const [data, setData] = useState<Record<TabType, PaginatedResponse<AuthorPublicArticle>>>({
    written,
    reviewed,
  });
  const [loading, setLoading] = useState(false);

  const loadPage = async (type: TabType, page: number) => {
    setLoading(true);
    try {
      const res = await authorsApi.getPublicArticles(slug, {
        type,
        page,
        limit: PAGE_LIMIT,
      });
      setData((prev) => ({ ...prev, [type]: res }));
    } catch {
      // Giữ nguyên dữ liệu cũ nếu request lỗi
    } finally {
      setLoading(false);
    }
  };

  const current = data[activeTab];

  return (
    <div>
      {hasReviewed && (
        <div className="mb-5 flex gap-1 border-b-2 border-gray-200" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "written"}
            onClick={() => setActiveTab("written")}
            className={`-mb-0.5 border-b-[3px] px-4 py-2.5 text-[15px] font-semibold transition-colors ${
              activeTab === "written"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Bài đã viết ({data.written.meta.total})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "reviewed"}
            onClick={() => setActiveTab("reviewed")}
            className={`-mb-0.5 border-b-[3px] px-4 py-2.5 text-[15px] font-semibold transition-colors ${
              activeTab === "reviewed"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Bài đã kiểm duyệt ({data.reviewed.meta.total})
          </button>
        </div>
      )}

      {activeTab === "reviewed" && reviewNote && (
        <div
          className="mb-4 rounded border-l-[3px] px-3.5 py-2.5 text-sm"
          style={{
            backgroundColor: "#FFF3E0",
            borderLeftColor: colors.tertiary.orange.DEFAULT,
          }}
        >
          {reviewNote}
        </div>
      )}

      {current.items.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">
          {activeTab === "written" ? "Chưa có bài viết nào." : "Chưa có bài kiểm duyệt nào."}
        </p>
      ) : (
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 transition-opacity ${
            loading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {current.items.map((article) => (
            <ArticleCard key={`${activeTab}-${article.id}`} article={article} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={current.meta.page}
        totalPages={current.meta.totalPages}
        onPageChange={(page) => loadPage(activeTab, page)}
      />
    </div>
  );
}
