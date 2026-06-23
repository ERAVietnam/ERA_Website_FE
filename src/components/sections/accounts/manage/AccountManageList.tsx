"use client";

import { useState } from "react";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { formatDate } from "@/lib/date";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import type { ManagementAccount, PaginationMeta } from "@/types/api";

interface Props {
  items: ManagementAccount[];
  currentAccountId?: string;
  loading?: boolean;
  searchInput: string;
  onSearchChange: (value: string) => void;
  meta: PaginationMeta;
  onEdit: (account: ManagementAccount) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export function AccountManageList({
  items,
  currentAccountId,
  loading,
  searchInput,
  onSearchChange,
  meta,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const canManageAccounts =
    hasPermission("auth.accounts.all.update") &&
    hasPermission("auth.accounts.all.delete");

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <AdminListHeader
        title="Danh sách tài khoản"
        subtitle={`Tổng cộng ${meta.total} tài khoản`}
      >
        {hasPermission("auth.accounts.all.create") && (
          <Button
            variant="primary"
            size="sm"
            className="gap-2"
            onClick={() =>
              guard(
                "auth.accounts.all.create",
                onAdd,
                "Bạn không có quyền tạo tài khoản.",
              )
            }
          >
            <Plus size={16} /> Tạo tài khoản
          </Button>
        )}
      </AdminListHeader>

      <SearchInput
        value={searchInput}
        onChange={onSearchChange}
        placeholder="Tìm theo tên hoặc email..."
        className="max-w-md"
      />

      {loading && <AdminLoading />}

      {!loading && (
        <AdminTable>
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">
                    Họ tên
                  </th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">
                    Email
                  </th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">
                    Trạng thái
                  </th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">
                    Quyền
                  </th>
                  {canManageAccounts && (
                    <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-36">
                      Thao tác
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => {
                  const isCurrent = item.id === currentAccountId;
                  const isExpanded = expandedIds.has(item.id);
                  const visiblePermissions = isExpanded
                    ? item.permissions
                    : item.permissions.slice(0, 2);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50/40 transition-colors ${
                        isCurrent ? "bg-blue-50/40" : ""
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {item.name}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-medium text-blue-600">
                            (Bạn)
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{item.email}</td>
                      <td className="px-5 py-4">
                        {item.isActive ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-green-50 text-green-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Đang hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                            Đã khóa
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {visiblePermissions.map((p) => (
                            <span
                              key={p.id}
                              className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600 truncate"
                              title={p.name}
                            >
                              {p.name}
                            </span>
                          ))}
                          {item.permissions.length > 2 && (
                            <button
                              type="button"
                              onClick={() => toggleExpand(item.id)}
                              className="text-xs font-medium text-blue-600 hover:text-blue-700"
                            >
                              {isExpanded
                                ? "Thu gọn"
                                : `+${item.permissions.length - 2}`}
                            </button>
                          )}
                          {item.permissions.length === 0 && (
                            <span className="text-xs text-gray-400">
                              Chưa có quyền
                            </span>
                          )}
                        </div>
                      </td>
                      {canManageAccounts && (
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {hasPermission("auth.accounts.all.update") && (
                              <Button
                                variant="ghost"
                                isIconOnly
                                size="md"
                                onClick={() =>
                                  guard(
                                    "auth.accounts.all.update",
                                    () => onEdit(item),
                                    "Bạn không có quyền chỉnh sửa tài khoản.",
                                  )
                                }
                                title="Chỉnh sửa"
                              >
                                <Pencil size={15} className="text-gray-500" />
                              </Button>
                            )}
                            {hasPermission("auth.accounts.all.delete") && (
                              <Button
                                variant="ghost"
                                isIconOnly
                                size="md"
                                onClick={() =>
                                  guard(
                                    "auth.accounts.all.delete",
                                    () => onDelete(item.id),
                                    "Bạn không có quyền xóa tài khoản.",
                                  )
                                }
                                title="Xoá"
                                className="hover:!bg-red-50"
                                disabled={isCurrent}
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
                {items.length === 0 && (
                  <tr>
                    <td colSpan={canManageAccounts ? 5 : 4}>
                      <AdminEmptyState message="Chưa có tài khoản nào. Hãy bấm &quot;Tạo tài khoản&quot; để thêm." />
                    </td>
                  </tr>
                )}
              </tbody>
          </AdminTable>
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
