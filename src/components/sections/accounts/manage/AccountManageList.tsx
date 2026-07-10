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
import { SelectField } from "@/components/ui/admin/SelectField";
import type { ManagementAccount, PaginationMeta } from "@/types/api";

interface Props {
  items: ManagementAccount[];
  currentAccountId?: string;
  loading?: boolean;
  searchInput: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
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
  statusFilter,
  onStatusFilterChange,
  meta,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const canUpdate = hasPermission("auth.accounts.all.update");
  const canDelete = hasPermission("auth.accounts.all.delete");
  const canManageAccounts = canUpdate || canDelete;

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

      <div className="grid gap-3 md:grid-cols-[minmax(0,24rem)_220px]">
        <SearchInput
          value={searchInput}
          onChange={onSearchChange}
          placeholder="Tìm theo tên hoặc email..."
        />
        <SelectField
          value={statusFilter}
          onChange={onStatusFilterChange}
          placeholder="Tất cả trạng thái"
          options={[
            { value: "active", label: "Đang hoạt động" },
            { value: "locked", label: "Đã khóa" },
          ]}
        />
      </div>

      {loading && <AdminLoading />}

      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white">
          <AdminEmptyState message="Chưa có tài khoản nào. Hãy bấm &quot;Tạo tài khoản&quot; để thêm." />
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="hidden md:block">
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
                            {canUpdate && (
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
                            {canDelete && (
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
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-3 md:hidden">
          {items.map((item) => {
            const isCurrent = item.id === currentAccountId;
            const isExpanded = expandedIds.has(item.id);
            const visiblePermissions = isExpanded
              ? item.permissions
              : item.permissions.slice(0, 2);

            return (
              <div
                key={item.id}
                className={`rounded-xl border border-gray-200 bg-white p-3 shadow-sm ${
                  isCurrent ? "bg-blue-50/40" : ""
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-semibold text-gray-900">
                        {item.name}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-medium text-blue-600">
                            (Bạn)
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 break-words text-sm text-gray-600">{item.email}</p>
                    </div>
                    {item.isActive ? (
                      <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Đang hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                        Đã khóa
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {visiblePermissions.map((p) => (
                      <span
                        key={p.id}
                        className="inline-block max-w-full truncate rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
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
                        {isExpanded ? "Thu gọn" : `+${item.permissions.length - 2}`}
                      </button>
                    )}
                    {item.permissions.length === 0 && (
                      <span className="text-xs text-gray-400">Chưa có quyền</span>
                    )}
                  </div>
                </div>

                {canManageAccounts && (
                  <div className="mt-3 flex items-center justify-end gap-1 border-t border-gray-100 pt-2">
                    {canUpdate && (
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
                    {canDelete && (
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
                )}
              </div>
            );
          })}
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
