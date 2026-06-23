"use client";

import { useState } from "react";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { Plus, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { SelectField } from "@/components/ui/admin/SelectField";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { ViewModeToggle } from "@/components/ui/admin/ViewModeToggle";
import { NewsManageActions } from "./NewsManageActions";
import { hasAnyNewsArticleCreatePermission } from "@/lib/permissions";
import { formatDate } from "@/lib/date";
import { getArticleImage } from "@/lib/news";
import { newsStatusConfig } from "@/lib/news/status";
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
  onViewHistory?: (id: string) => void;
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
  onViewHistory,
}: Props) {
  const { hasPermission } = useAuth();
  const { guard } = usePermissionWarning();
  const [viewMode, setViewMode] = useState<"table" | "card">("table");


  const placeholderImg = "/news/news_placeholder.webp";

  return (
    <div className="space-y-5">
      <AdminListHeader
        title="Danh sách tin tức"
        subtitle={meta.total > 0 ? `Hiển thị ${items.length} / ${meta.total} bài viết` : "Không có bài viết nào"}
      >
        <div className="flex items-center gap-3">
          <ViewModeToggle value={viewMode} onChange={setViewMode} />
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
      </AdminListHeader>

      {/* Filters */}
      <AdminFilters
        footer={
          <>
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
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SearchInput
            value={searchInput}
            onChange={onSearchChange}
            placeholder="Tìm theo tiêu đề..."
          />

          <SelectField
            value={filters.authorId || ""}
            onChange={(value) => onFilterChange("authorId", value || undefined)}
            placeholder="Tất cả tác giả"
            options={[
              { value: currentAccountId ?? "", label: "Bài viết của tôi" },
            ]}
          />

          <SelectField
            value={filters.categoryId || ""}
            onChange={(value) => onFilterChange("categoryId", value || undefined)}
            placeholder="Tất cả danh mục"
            options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
          />

          <SelectField
            value={filters.status || ""}
            onChange={(value) => onFilterChange("status", value || undefined)}
            placeholder="Tất cả trạng thái"
            options={[
              { value: "draft", label: "Bản nháp" },
              { value: "pending", label: "Chờ duyệt" },
              { value: "published", label: "Đã đăng" },
            ]}
          />
        </div>

      </AdminFilters>

      {loading && <AdminLoading />}

      {!loading && viewMode === "table" && (
        <AdminTable>
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
                          color: newsStatusConfig[item.status]?.color,
                          backgroundColor: newsStatusConfig[item.status]?.bg,
                        }}
                      >
                        {newsStatusConfig[item.status]?.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {formatDate(item.displayPublishedAt || item.publishedAt || item.createdAt)}
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <NewsManageActions
                        item={item}
                        currentAccountId={currentAccountId}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onPreview={onPreview}
                        onPublish={onPublish}
                        onRevoke={onRevoke}
                        onSubmitForReview={onSubmitForReview}
                        onReject={onReject}
                        onViewHistory={onViewHistory}
                        layout="table"
                      />
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={7}>
                      <AdminEmptyState message="Chưa có bài viết nào. Hãy bấm &quot;Tạo bài viết mới&quot; để thêm." />
                    </td>
                  </tr>
                )}
              </tbody>
          </AdminTable>
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
                    color: newsStatusConfig[item.status]?.color,
                    backgroundColor: newsStatusConfig[item.status]?.bg,
                  }}
                >
                  {newsStatusConfig[item.status]?.label}
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
                    <p>{formatDate(item.displayPublishedAt || item.publishedAt || item.createdAt)}</p>
                  </div>
                  <NewsManageActions
                    item={item}
                    currentAccountId={currentAccountId}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onPreview={onPreview}
                    onPublish={onPublish}
                    onRevoke={onRevoke}
                    onSubmitForReview={onSubmitForReview}
                    onReject={onReject}
                    onViewHistory={onViewHistory}
                    layout="card"
                  />
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <AdminEmptyState
              message="Chưa có bài viết nào. Hãy bấm &quot;Tạo bài viết mới&quot; để thêm."
              className="col-span-full py-12 bg-white rounded-xl border border-gray-200"
            />
          )}
        </div>
      )}

    </div>
  );
}
