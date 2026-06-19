"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { colors } from "@/lib/theme";
import {
  Pencil,
  Trash2,
  Plus,
  CheckCircle,
  RotateCcw,
  FileText,
  ImageIcon,
  Search,
  X,
  LayoutList,
  LayoutGrid,
  Loader2,
} from "lucide-react";
import type { EMagazine, MagazineFilters, PaginationMeta } from "@/types/api";

interface Props {
  items: EMagazine[];
  loading: boolean;
  meta: PaginationMeta;
  filters: MagazineFilters;
  searchInput: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (key: keyof MagazineFilters, value: MagazineFilters[typeof key]) => void;
  onPageChange: (page: number) => void;
  onEdit: (item: EMagazine) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onUnpublish: (id: string) => void;
  onAdd: () => void;
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  draft: { label: "Bản nháp", color: "#6B7280", bg: "#F3F4F6" },
  published: { label: "Đã đăng", color: "#059669", bg: "#D1FAE5" },
};

function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function MagazineManageList({
  items,
  loading,
  meta,
  filters,
  searchInput,
  onSearchChange,
  onFilterChange,
  onPageChange,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onAdd,
}: Props) {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400";

  const statusOptions = [
    { value: "", label: "Tất cả trạng thái" },
    { value: "draft", label: "Bản nháp" },
    { value: "published", label: "Đã đăng" },
  ];

  const handleClearFilters = () => {
    onSearchChange("");
    onFilterChange("status", undefined);
    onFilterChange("page", 1);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
            Quản lý e-magazine
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {meta.total > 0
              ? `Hiển thị ${items.length} / ${meta.total} e-magazine`
              : "Không có e-magazine nào"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              title="Xem dạng bảng"
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === "table" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutList size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              title="Xem dạng thẻ"
              className={`rounded-md p-1.5 transition-colors ${
                viewMode === "card" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
          <Button variant="primary" size="sm" onClick={onAdd} className="gap-2">
            <Plus size={16} />
            Tạo e-magazine
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tiêu đề..."
              className={`${inputClass} pl-9`}
            />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={filters.status || ""}
              onChange={(e) => onFilterChange("status", e.target.value || undefined)}
              className={`${inputClass} appearance-none cursor-pointer pr-9`}
            >
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
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
            onClick={handleClearFilters}
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

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Chưa có e-magazine nào. Hãy bấm "Tạo e-magazine" để thêm.</p>
        </div>
      )}

      {!loading && items.length > 0 && viewMode === "table" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 w-16">STT</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[220px]">Tiêu đề</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[200px]">Mô tả</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Ngày xuất bản</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Trạng thái</th>
                  <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-40">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, i) => {
                  const status = statusConfig[item.status];
                  return (
                    <tr key={item.id ?? i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-500 font-medium">
                        {(meta.page - 1) * meta.limit + i + 1}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-9 flex-shrink-0 rounded-md border border-gray-200 bg-gray-100 overflow-hidden">
                            {item.coverImageMedia?.url ? (
                              <img
                                src={item.coverImageMedia.url}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-gray-400">
                                <ImageIcon size={16} />
                              </div>
                            )}
                          </div>
                          <p className="font-semibold text-gray-900 line-clamp-2" title={item.title}>
                            {item.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        <p className="line-clamp-2" title={item.description || undefined}>
                          {item.description || "—"}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {formatDate(item.publishedDate)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md"
                          style={{ color: status.color, backgroundColor: status.bg }}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {item.status === "draft" ? (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() => onPublish(item.id)}
                              title="Đăng"
                              className="hover:!bg-green-50"
                            >
                              <CheckCircle size={15} className="text-green-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() => onUnpublish(item.id)}
                              title="Gỡ về nháp"
                              className="hover:!bg-amber-50"
                            >
                              <RotateCcw size={15} className="text-amber-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => onEdit(item)}
                            title="Chỉnh sửa"
                          >
                            <Pencil size={15} className="text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => onDelete(item.id)}
                            title="Xoá"
                            className="hover:!bg-red-50"
                          >
                            <Trash2 size={15} className="text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && items.length > 0 && viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const status = statusConfig[item.status];
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {item.coverImageMedia?.url ? (
                    <img
                      src={item.coverImageMedia.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ImageIcon size={40} />
                    </div>
                  )}
                  <span
                    className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md"
                    style={{ color: status.color, backgroundColor: status.bg }}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-800 line-clamp-2 mb-2" title={item.title}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
                    {item.description || "Không có mô tả"}
                  </p>
                  <p className="text-xs text-gray-400 mb-4">Ngày xuất bản: {formatDate(item.publishedDate)}</p>

                  <div className="flex items-center gap-1 pt-3 border-t border-gray-100">
                    {item.status === "draft" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        isIconOnly
                        size="md"
                        onClick={() => onPublish(item.id)}
                        title="Đăng"
                        className="hover:!bg-green-50"
                      >
                        <CheckCircle size={16} className="text-green-600" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        isIconOnly
                        size="md"
                        onClick={() => onUnpublish(item.id)}
                        title="Gỡ về nháp"
                        className="hover:!bg-amber-50"
                      >
                        <RotateCcw size={16} className="text-amber-600" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      isIconOnly
                      size="md"
                      onClick={() => onEdit(item)}
                      title="Chỉnh sửa"
                    >
                      <Pencil size={16} className="text-gray-500" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      isIconOnly
                      size="md"
                      onClick={() => onDelete(item.id)}
                      title="Xóa"
                      className="hover:!bg-red-50"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Pagination currentPage={meta.page} totalPages={meta.totalPages} onPageChange={onPageChange} />
    </div>
  );
}
