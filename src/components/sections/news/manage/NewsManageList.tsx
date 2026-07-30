"use client";
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
import { NewsManageActions } from "./NewsManageActions";
import {
  hasAnyNewsArticleCreatePermission,
  hasAnyNewsArticleViewPermission,
  hasAnyNewsArticleActionPermission,
} from "@/lib/permissions";
import { formatDate } from "@/lib/date";
import { getArticleImage, NEWS_PLACEHOLDER } from "@/lib/news";
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

  const showActionsColumn =
    hasAnyNewsArticleViewPermission(hasPermission) ||
    hasAnyNewsArticleActionPermission(hasPermission, "update") ||
    hasAnyNewsArticleActionPermission(hasPermission, "delete") ||
    hasAnyNewsArticleActionPermission(hasPermission, "publish");


  return (
    <div className="space-y-5">
      <AdminListHeader
        title="Danh sách tin tức"
        count={{ shown: items.length, total: meta.total, noun: "bài viết" }}
      >
        <div className="flex items-center gap-3">
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
            options={Object.entries(newsStatusConfig).map(([value, { label }]) => ({ value, label }))}
          />
        </div>

      </AdminFilters>

      {loading && <AdminLoading />}

      {!loading && (
        <div className="hidden md:block">
          <AdminTable>
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 w-16">STT</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Bài viết</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Danh mục</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Tác giả</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Trạng thái</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Ngày tạo</th>
                  {showActionsColumn && (
                    <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-36">Thao tác</th>
                  )}
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
                            src={getArticleImage(item) || NEWS_PLACEHOLDER}
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
                      {formatDate(item.createdAt)}
                    </td>
                    {showActionsColumn && (
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
                    )}
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={showActionsColumn ? 7 : 6}>
                      <AdminEmptyState message="Chưa có bài viết nào. Hãy bấm &quot;Tạo bài viết mới&quot; để thêm." />
                    </td>
                  </tr>
                )}
              </tbody>
          </AdminTable>
        </div>
      )}

      {!loading && (
        <div className="space-y-3 md:hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onView(item.id)}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getArticleImage(item) || NEWS_PLACEHOLDER}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
              <div className="flex min-w-0 flex-1 flex-col">
                <button
                  onClick={() => onView(item.id)}
                  className="text-left w-full group"
                >
                  <h3 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#C8102E]">
                    {item.title}
                  </h3>
                </button>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span
                    className="inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold text-white"
                    style={{ backgroundColor: colors.primary.DEFAULT }}
                  >
                    {item.category.name}
                  </span>
                  <span
                    className="inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      color: newsStatusConfig[item.status]?.color,
                      backgroundColor: newsStatusConfig[item.status]?.bg,
                    }}
                  >
                    {newsStatusConfig[item.status]?.label}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-gray-400">
                  <div className="space-y-0.5">
                    <p>{item.author?.name || "—"}</p>
                    <p>{formatDate(item.createdAt)}</p>
                  </div>
                </div>
              </div>
              </div>
                <div className="mt-3 border-t border-gray-100 pt-2">
                  <div className="flex justify-end">
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
