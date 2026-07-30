import { CalendarDays, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { formatDate } from "@/lib/date";
import type { PaginationMeta } from "@/types/api";

type HonorsListItem = {
  id: string;
  createdAt: string;
  title?: string | null;
};

interface HonorsListProps<T extends HonorsListItem> {
  items: T[];
  loading: boolean;
  meta: PaginationMeta;
  canManage: boolean;
  deletingId: string | null;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onPageChange: (page: number) => void;
  title: string;
  subtitleNoun: string;
  emptyMessage: string;
  periodColumnLabel: string;
  getPeriodLabel: (item: T) => string;
  getMobilePeriodLabel: (item: T) => string;
  getTitleFallback: (item: T) => string;
  getAgentCount: (item: T) => number;
}

export function HonorsList<T extends HonorsListItem>({
  items,
  loading,
  meta,
  canManage,
  deletingId,
  onEdit,
  onDelete,
  onPageChange,
  title,
  subtitleNoun,
  emptyMessage,
  periodColumnLabel,
  getPeriodLabel,
  getMobilePeriodLabel,
  getTitleFallback,
  getAgentCount,
}: HonorsListProps<T>) {
  return (
    <div className="space-y-5">
      <AdminListHeader
        title={title}
        count={{ shown: items.length, total: meta.total, noun: subtitleNoun }}
      />

      {loading && <AdminLoading />}

      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <CalendarDays size={48} className="mx-auto mb-4 text-gray-300" />
          <AdminEmptyState message={emptyMessage} className="!p-0" />
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="hidden md:block">
          <AdminTable>
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="w-16 px-5 py-3.5 text-left font-semibold text-gray-600">
                  STT
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">
                  {periodColumnLabel}
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">
                  Tên list
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">
                  Số agent
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">
                  Ngày tạo
                </th>
                {canManage && (
                  <th className="w-40 px-5 py-3.5 text-right font-semibold text-gray-600">
                    Thao tác
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item, index) => (
                <tr key={item.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <CalendarDays size={16} className="text-gray-400" />
                      {getPeriodLabel(item)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">
                      {item.title || getTitleFallback(item)}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {getAgentCount(item)}
                    </span>{" "}
                    agent
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {formatDate(item.createdAt)}
                  </td>
                  {canManage && (
                    <td className="px-5 py-4">
                      <HonorActionsEditable
                        isDeleting={deletingId === item.id}
                        onEdit={() => onEdit(item)}
                        onDelete={() => onDelete(item)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </AdminTable>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-3 md:hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                  <CalendarDays size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 font-bold text-gray-900">
                    {item.title || getTitleFallback(item)}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gray-700">
                    {getMobilePeriodLabel(item)}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {getAgentCount(item)} agent · Tạo ngày{" "}
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>

              {canManage && (
                <div className="mt-3 flex items-center justify-end gap-1 border-t border-gray-100 pt-2">
                  <HonorActionsEditable
                    isDeleting={deletingId === item.id}
                    onEdit={() => onEdit(item)}
                    onDelete={() => onDelete(item)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function HonorActionsEditable({
  isDeleting,
  onEdit,
  onDelete,
}: {
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        isIconOnly
        size="md"
        title="Chỉnh sửa"
        onClick={onEdit}
      >
        <Pencil size={15} className="text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        isIconOnly
        size="md"
        title="Xóa"
        className="hover:!bg-red-50"
        disabled={isDeleting}
        onClick={onDelete}
      >
        {isDeleting ? (
          <Loader2 size={15} className="animate-spin text-red-500" />
        ) : (
          <Trash2 size={15} className="text-red-500" />
        )}
      </Button>
    </div>
  );
}
