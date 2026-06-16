"use client";

import { useState } from "react";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { Pencil, Trash2, Plus, LayoutGrid, Table as TableIcon, Loader2, Send, CheckCircle, RotateCcw, XCircle, Eye, Search, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { PopupNotification } from "@/components/ui/PopupNotification";
import {
  getNewsScopeBySlug,
  hasNewsArticlePermission,
  hasAnyNewsArticleCreatePermission,
} from "@/lib/permissions";
import type { NewsArticle, NewsCategory, PaginationMeta, ArticleFilters } from "@/types/api";

interface Props {
  items: NewsArticle[];
  categories: NewsCategory[];
  loading?: boolean;
  searchInput: string;
  filters: ArticleFilters;
  meta: PaginationMeta;
  currentAccountId?: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (key: keyof ArticleFilters, value: ArticleFilters[typeof key]) => void;
  onPageChange: (page: number) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onPreview?: (id: string) => void;
  onPublish?: (id: string) => void;
  onRevoke?: (id: string) => void;
  onSubmitForReview?: (id: string) => void;
  onReject?: (id: string) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getFirstImageFromContent(content: string): string | null {
  const match = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? null;
}

function getArticleImage(item: NewsArticle): string | null {
  return item.featuredImage?.url || getFirstImageFromContent(item.content);
}

export function NewsManageList({
  items,
  categories,
  loading,
  searchInput,
  filters,
  meta,
  currentAccountId,
  onSearchChange,
  onFilterChange,
  onPageChange,
  onEdit,
  onView,
  onDelete,
  onAdd,
  onPreview,
  onPublish,
  onRevoke,
  onSubmitForReview,
  onReject,
}: Props) {
  const { hasPermission } = useAuth();

  const isSuperAdmin = () => hasPermission("system.super_admin");
  const isAuthor = (item: NewsArticle) => currentAccountId === item.authorId || isSuperAdmin();
  const canManage = (item: NewsArticle) => isSuperAdmin() || isAuthor(item);
  const canPublish = (item: NewsArticle) => {
    if (isSuperAdmin()) return true;
    const scope = getNewsScopeBySlug(item.category.slug);
    if (hasPermission("news.articles.all.publish")) return true;
    if (scope && hasPermission(`news.articles.${scope}.publish`)) return true;
    return false;
  };
  const canEditOrDelete = (item: NewsArticle) => {
    if (isSuperAdmin()) return true;
    if (item.status === "draft") return isAuthor(item);
    if (item.status === "pending") return canPublish(item);
    return false;
  };
  const canSubmit = (item: NewsArticle) => item.status === "draft" && isAuthor(item);
  const canReject = (item: NewsArticle) => item.status === "pending" && canPublish(item);
  const { warning, guard, closeWarning } = usePermissionWarning();
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    draft: { label: "Bản nháp", color: "#6B7280", bg: "#F3F4F6" },
    pending: { label: "Chờ duyệt", color: "#D97706", bg: "#FEF3C7" },
    published: { label: "Đã đăng", color: "#059669", bg: "#D1FAE5" },
  };

  const placeholderImg = "/news/news_placeholder.webp";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
            Danh sách tin tức
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {meta.total > 0
              ? `Hiển thị ${items.length} / ${meta.total} bài viết`
              : "Không có bài viết nào"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              title="Dạng bảng"
            >
              <TableIcon size={16} />
              <span className="hidden sm:inline">Bảng</span>
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "card"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              title="Dạng thẻ"
            >
              <LayoutGrid size={16} />
              <span className="hidden sm:inline">Thẻ</span>
            </button>
          </div>
          {hasAnyNewsArticleCreatePermission(hasPermission) && (
            <Button
              variant="primary"
              size="sm"
              className="gap-2"
              onClick={() => {
                if (!hasAnyNewsArticleCreatePermission(hasPermission)) {
                  guard(
                    "news.articles.all.create",
                    onAdd,
                    "Bạn không có quyền tạo bài viết.",
                  );
                  return;
                }
                onAdd();
              }}
            >
              <Plus size={16} /> Tạo bài viết mới
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tiêu đề..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400"
            />
          </div>

          {/* Author */}
          <div className="relative">
            <select
              value={filters.authorId || ""}
              onChange={(e) => onFilterChange("authorId", e.target.value || undefined)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400"
            >
              <option value="">Tất cả tác giả</option>
              <option value={currentAccountId}>Bài viết của tôi</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Category */}
          <div className="relative">
            <select
              value={filters.categoryId || ""}
              onChange={(e) => onFilterChange("categoryId", e.target.value || undefined)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={filters.status || ""}
              onChange={(e) => onFilterChange("status", e.target.value || undefined)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="draft">Bản nháp</option>
              <option value="pending">Chờ duyệt</option>
              <option value="published">Đã đăng</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500">
            Trang {meta.page} / {meta.totalPages || 1}
          </p>
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onFilterChange("authorId", undefined);
              onFilterChange("categoryId", undefined);
              onFilterChange("status", undefined);
              onPageChange(1);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-[#C8102E]"
          >
            <X size={16} />
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-gray-400" />
        </div>
      )}

      {!loading && viewMode === "table" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 w-16">STT</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Bài viết</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Danh mục</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Tác giả</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Trạng thái</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Ngày đăng</th>
                  <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-36">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => onView(item.id)}
                    className="hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-4 text-gray-500 font-medium">
                      {(meta.page - 1) * meta.limit + index + 1}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 text-left w-full">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getArticleImage(item) || placeholderImg}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-semibold text-gray-900 whitespace-normal">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md text-white"
                        style={{ backgroundColor: colors.primary.DEFAULT }}
                      >
                        {item.category.name}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      {item.author?.name || "—"}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md"
                        style={{
                          color: statusConfig[item.status]?.color,
                          backgroundColor: statusConfig[item.status]?.bg,
                        }}
                      >
                        {statusConfig[item.status]?.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {formatDate(item.publishedAt || item.createdAt)}
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        {canSubmit(item) && onSubmitForReview && (
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => onSubmitForReview(item.id)}
                            title="Gửi duyệt"
                            className="hover:!bg-amber-50"
                          >
                            <Send size={15} className="text-amber-600" />
                          </Button>
                        )}
                        {item.status === "pending" && canPublish(item) && onPublish && (
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => onPublish(item.id)}
                            title="Duyệt bài"
                            className="hover:!bg-green-50"
                          >
                            <CheckCircle size={15} className="text-green-600" />
                          </Button>
                        )}
                        {item.status === "published" && canPublish(item) && onRevoke && (
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => onRevoke(item.id)}
                            title="Hủy duyệt"
                            className="hover:!bg-red-50"
                          >
                            <RotateCcw size={15} className="text-red-500" />
                          </Button>
                        )}
                        {canReject(item) && onReject && (
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => onReject(item.id)}
                            title="Từ chối duyệt"
                            className="hover:!bg-red-50"
                          >
                            <XCircle size={15} className="text-red-500" />
                          </Button>
                        )}
                        {onPreview && (
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => onPreview(item.id)}
                            title="Xem trước"
                            className="hover:!bg-blue-50"
                          >
                            <Eye size={15} className="text-blue-600" />
                          </Button>
                        )}
                        {canEditOrDelete(item) &&
                          hasNewsArticlePermission(
                            hasPermission,
                            "update",
                            getNewsScopeBySlug(item.category.slug),
                          ) && (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() => onEdit(item.id)}
                              title="Chỉnh sửa"
                            >
                              <Pencil size={15} className="text-gray-500" />
                            </Button>
                          )}
                        {canEditOrDelete(item) &&
                          hasNewsArticlePermission(
                            hasPermission,
                            "delete",
                            getNewsScopeBySlug(item.category.slug),
                          ) && (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() =>
                                guard(
                                  `news.articles.${getNewsScopeBySlug(item.category.slug) ?? "all"}.delete`,
                                  () => onDelete(item.id),
                                  "Bạn không có quyền xóa bài viết.",
                                )
                              }
                              title="Xoá"
                              className="hover:!bg-red-50"
                            >
                              <Trash2 size={15} className="text-red-500" />
                            </Button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                      Chưa có bài viết nào. Hãy bấm &quot;Tạo bài viết mới&quot; để thêm.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && viewMode === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getArticleImage(item) || placeholderImg}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md text-white"
                  style={{ backgroundColor: colors.primary.DEFAULT }}
                >
                  {item.category.name}
                </span>
                <span
                  className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md"
                  style={{
                    color: statusConfig[item.status]?.color,
                    backgroundColor: statusConfig[item.status]?.bg,
                  }}
                >
                  {statusConfig[item.status]?.label}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <button
                  onClick={() => onView(item.id)}
                  className="text-left w-full group"
                >
                  <h3 className="font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
                    {item.title}
                  </h3>
                </button>
                <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.75rem] mt-2">{item.summary}</p>
                <div className="flex items-center justify-between pt-4 mt-auto">
                  <div className="text-xs text-gray-400 space-y-0.5">
                    <p>{item.author?.name || "—"}</p>
                    <p>{formatDate(item.publishedAt || item.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {canSubmit(item) && onSubmitForReview && (
                      <button
                        onClick={() => onSubmitForReview(item.id)}
                        className="p-2 rounded-lg hover:bg-amber-50 transition-colors"
                        title="Gửi duyệt"
                      >
                        <Send size={15} className="text-amber-600" />
                      </button>
                    )}
                    {item.status === "pending" && canPublish(item) && onPublish && (
                      <button
                        onClick={() => onPublish(item.id)}
                        className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                        title="Duyệt bài"
                      >
                        <CheckCircle size={15} className="text-green-600" />
                      </button>
                    )}
                    {item.status === "published" && canPublish(item) && onRevoke && (
                      <button
                        onClick={() => onRevoke(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Hủy duyệt"
                      >
                        <RotateCcw size={15} className="text-red-500" />
                      </button>
                    )}
                    {canReject(item) && onReject && (
                      <button
                        onClick={() => onReject(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Từ chối duyệt"
                      >
                        <XCircle size={15} className="text-red-500" />
                      </button>
                    )}
                    {onPreview && (
                      <button
                        onClick={() => onPreview(item.id)}
                        className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Xem trước"
                      >
                        <Eye size={15} className="text-blue-600" />
                      </button>
                    )}
                    {canEditOrDelete(item) &&
                      hasNewsArticlePermission(
                        hasPermission,
                        "update",
                        getNewsScopeBySlug(item.category.slug),
                      ) && (
                        <button
                          onClick={() => onEdit(item.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={15} className="text-gray-500" />
                        </button>
                      )}
                    {canEditOrDelete(item) &&
                      hasNewsArticlePermission(
                        hasPermission,
                        "delete",
                        getNewsScopeBySlug(item.category.slug),
                      ) && (
                        <button
                          onClick={() =>
                            guard(
                              `news.articles.${getNewsScopeBySlug(item.category.slug) ?? "all"}.delete`,
                              () => onDelete(item.id),
                              "Bạn không có quyền xóa bài viết.",
                            )
                          }
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Xoá"
                        >
                          <Trash2 size={15} className="text-red-500" />
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-xl border border-gray-200">
              Chưa có bài viết nào. Hãy bấm &quot;Tạo bài viết mới&quot; để thêm.
            </div>
          )}
        </div>
      )}

      {warning.show && (
        <PopupNotification
          type="error"
          message={warning.message}
          onClose={closeWarning}
          autoClose={false}
        />
      )}
    </div>
  );
}
