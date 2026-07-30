"use client";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
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
  X,
} from "lucide-react";
import { formatDateShort } from "@/lib/date";
import { magazineStatusConfig } from "@/lib/magazine/status";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { SelectField } from "@/components/ui/admin/SelectField";
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
  const { hasPermission } = useAuth();

  const canView = hasPermission("magazine.articles.all.view");
  const canCreate = hasPermission("magazine.articles.all.create");
  const canUpdate = hasPermission("magazine.articles.all.update");
  const canDelete = hasPermission("magazine.articles.all.delete");
  const canPublish = hasPermission("magazine.articles.all.publish");
  const showActionsColumn = canView || canUpdate || canDelete || canPublish;

  const statusOptions = [
    { value: "", label: "Tất cả trạng thái" },
    ...Object.entries(magazineStatusConfig).map(([value, { label }]) => ({ value, label })),
  ];

  const handleClearFilters = () => {
    onSearchChange("");
    onFilterChange("status", undefined);
    onFilterChange("page", 1);
  };

  return (
    <div className="space-y-5">
      <AdminListHeader
        title="Quản lý e-magazine"
        count={{ shown: items.length, total: meta.total, noun: "e-magazine" }}
      >
        <div className="flex items-center gap-2">
          {canCreate && (
            <Button variant="primary" size="sm" onClick={onAdd} className="gap-2">
              <Plus size={16} />
              Tạo e-magazine
            </Button>
          )}
        </div>
      </AdminListHeader>

      <AdminFilters
        footer={
          <button
            type="button"
            onClick={handleClearFilters}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
          >
            <X size={16} />
            Xóa bộ lọc
          </button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SearchInput
            value={searchInput}
            onChange={onSearchChange}
            placeholder="Tìm theo tiêu đề..."
          />

          <SelectField
            value={filters.status || ""}
            onChange={(value) => onFilterChange("status", value || undefined)}
            placeholder="Tất cả trạng thái"
            options={statusOptions.filter((s) => s.value !== "").map((s) => ({ value: s.value, label: s.label }))}
          />
        </div>

      </AdminFilters>

      {loading && <AdminLoading />}

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <AdminEmptyState message='Chưa có e-magazine nào. Hãy bấm "Tạo e-magazine" để thêm.' className="!p-0" />
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="hidden md:block">
          <AdminTable>
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 w-16">STT</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[220px]">Tiêu đề</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[200px]">Mô tả</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Ngày xuất bản</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Trạng thái</th>
                  {showActionsColumn && (
                    <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-40">Thao tác</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item, i) => {
                  const status = magazineStatusConfig[item.status];
                  return (
                    <tr key={item.id ?? i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-500 font-medium">
                        {(meta.page - 1) * meta.limit + i + 1}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 aspect-[210/297] flex-shrink-0 rounded-md border border-gray-200 bg-gray-100 overflow-hidden">
                            {item.coverImageMedia?.url ? (
                              <img
                                src={item.coverImageMedia.url}
                                alt={item.title}
                                className="h-full w-full object-contain"
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
                        {formatDateShort(item.publishedDate) || "—"}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md"
                          style={{ color: status.color, backgroundColor: status.bg }}
                        >
                          {status.label}
                        </span>
                      </td>
                      {showActionsColumn && (
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {canPublish && (
                              item.status === "draft" ? (
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
                              )
                            )}
                            {canUpdate && (
                              <Button
                                variant="ghost"
                                isIconOnly
                                size="md"
                                onClick={() => onEdit(item)}
                                title="Chỉnh sửa"
                              >
                                <Pencil size={15} className="text-gray-500" />
                              </Button>
                            )}
                            {canDelete && (
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
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
          </AdminTable>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-3 md:hidden">
          {items.map((item) => {
            const status = magazineStatusConfig[item.status];
            return (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
              >
                <div className="flex gap-3">
                <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                  {item.coverImageMedia?.url ? (
                    <img
                      src={item.coverImageMedia.url}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ImageIcon size={40} />
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="mb-2 line-clamp-2 font-bold text-gray-800" title={item.title}>
                    {item.title}
                  </h3>
                  <div className="mb-2">
                    <span
                      className="inline-block rounded-md px-2.5 py-1 text-xs font-semibold"
                      style={{ color: status.color, backgroundColor: status.bg }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="mb-2 line-clamp-2 text-sm text-gray-500">
                    {item.description || "Không có mô tả"}
                  </p>
                  <p className="text-xs text-gray-400 mb-4">Ngày xuất bản: {formatDateShort(item.publishedDate) || "—"}</p>

                </div>
                </div>

                  {showActionsColumn && (
                  <div className="mt-3 flex flex-wrap items-center justify-end gap-1 border-t border-gray-100 pt-2">
                    {canPublish && (
                      item.status === "draft" ? (
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
                      )
                    )}
                    {canUpdate && (
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
                    )}
                    {canDelete && (
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
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Pagination currentPage={meta.page} totalPages={meta.totalPages} onPageChange={onPageChange} />
    </div>
  );
}
