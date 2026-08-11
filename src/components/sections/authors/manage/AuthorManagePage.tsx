"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2, UserRound } from "lucide-react";
import { authorsApi } from "@/api/domains/authors";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Pagination } from "@/components/ui/Pagination";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { Section } from "@/components/ui/Section";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { SelectField } from "@/components/ui/admin/SelectField";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useAdminList } from "@/hooks/useAdminList";
import { formatDate } from "@/lib/date";
import type { Author, AuthorFilters } from "@/types/api";
import AuthorManageForm from "./AuthorManageForm";

const DEFAULT_LIMIT = 10;

const STATUS_OPTIONS = [
  { value: "true", label: "Đang hiển thị" },
  { value: "false", label: "Đang ẩn" },
];

export default function AuthorManagePage() {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const {
    items,
    setItems,
    loading,
    meta,
    setFilters,
    fetchItems: loadAuthors,
    handlePageChange,
  } = useAdminList<Author, AuthorFilters>(
    (currentFilters) => authorsApi.getAuthors(currentFilters),
    {
      initialFilters: { page: 1, limit: DEFAULT_LIMIT },
      defaultLimit: DEFAULT_LIMIT,
      onError: handleApiError,
    },
  );
  const { searchInput, setSearchInput } = useDebouncedSearch((value) => {
    const search = value.trim() || undefined;
    setFilters((prev) => {
      if (prev.search === search) return prev;
      return { ...prev, search, page: 1 };
    });
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState<Author | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    author: Author | null;
  }>({ show: false, author: null });

  const canCreate = hasPermission("authors.all.create");
  const canUpdate = hasPermission("authors.all.update");
  const canDelete = hasPermission("authors.all.delete");
  const canManage = canUpdate || canDelete;

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    const isActive = value === "" ? undefined : value === "true";
    setFilters((prev) => {
      if (prev.isActive === isActive) return prev;
      return { ...prev, isActive, page: 1 };
    });
  };

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (author: Author) => {
    setEditing(author);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleSaved = (saved: Author) => {
    showSuccess(editing ? "Cập nhật tác giả thành công!" : "Tạo tác giả thành công!");
    setShowForm(false);
    setEditing(null);
    setItems((prev) => {
      if (editing) return prev.map((item) => (item.id === saved.id ? { ...saved, _count: item._count } : item));
      return [{ ...saved, _count: { writtenArticles: 0, reviewedArticles: 0 } }, ...prev].slice(0, meta.limit);
    });
    loadAuthors().catch(() => {});
  };

  const handleConfirmDelete = async () => {
    const author = deleteConfirm.author;
    if (!author) return;
    setDeleteConfirm({ show: false, author: null });
    try {
      await authorsApi.deleteAuthor(author.id);
      showSuccess("Xóa tác giả thành công!");
      setItems((prev) => prev.filter((item) => item.id !== author.id));
      loadAuthors().catch(() => {});
    } catch (err) {
      handleApiError(err);
    }
  };

  const deleteAuthor = deleteConfirm.author;
  const deleteWritten = deleteAuthor?._count?.writtenArticles ?? 0;
  const deleteReviewed = deleteAuthor?._count?.reviewedArticles ?? 0;
  const deleteMessage =
    deleteWritten + deleteReviewed > 0
      ? `Tác giả "${deleteAuthor?.fullName}" đang được gắn làm tác giả của ${deleteWritten} bài viết và người kiểm duyệt của ${deleteReviewed} bài viết. Các bài viết sẽ tự động gỡ tên tác giả này. Hành động này không thể hoàn tác.`
      : `Bạn có chắc muốn xóa tác giả "${deleteAuthor?.fullName}"? Hành động này không thể hoàn tác.`;

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={closePopup}
            autoClose={popup.type === "success"}
            autoCloseMs={1000}
          />
        )}

        {warning.show && (
          <PopupNotification
            type="error"
            message={warning.message}
            onClose={closeWarning}
            autoClose={false}
          />
        )}

        <ConfirmDialog
          isOpen={deleteConfirm.show}
          title="Xác nhận xóa tác giả"
          message={deleteMessage}
          confirmLabel="Xóa"
          cancelLabel="Hủy"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm({ show: false, author: null })}
        />

        {showForm ? (
          <AuthorManageForm
            initialData={editing}
            onSaved={handleSaved}
            onCancel={closeForm}
          />
        ) : (
          <>
            <div className="space-y-5">
              <AdminListHeader
                title="Danh sách tác giả"
                count={{ format: "total", total: meta.total, noun: "tác giả" }}
              >
                {canCreate && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="gap-2"
                    onClick={() =>
                      guard("authors.all.create", openCreate, "Bạn không có quyền tạo tác giả.")
                    }
                  >
                    <Plus size={16} /> Tạo tác giả
                  </Button>
                )}
              </AdminListHeader>

              <AdminFilters>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <SearchInput
                    value={searchInput}
                    onChange={setSearchInput}
                    placeholder="Tìm theo tên, slug hoặc email..."
                    className="max-w-md flex-1"
                  />
                  <SelectField
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    options={STATUS_OPTIONS}
                    placeholder="Tất cả trạng thái"
                    className="w-full sm:w-52"
                  />
                </div>
              </AdminFilters>

              {loading && <AdminLoading />}

              {!loading && (
                <AdminTable>
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Tác giả</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Chức danh</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Liên hệ</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Bài viết</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Trạng thái</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Cập nhật</th>
                      {canManage && (
                        <th className="w-36 px-5 py-3.5 text-right font-semibold text-gray-600">
                          Thao tác
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          guard("authors.all.update", () => openEdit(item), "Bạn không có quyền chỉnh sửa tác giả.")
                        }
                        className="transition-colors hover:bg-gray-50/40 cursor-pointer"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                              {item.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={item.avatar}
                                  alt={item.avatarAlt || item.fullName}
                                  className="h-full w-full object-cover object-top"
                                />
                              ) : (
                                <UserRound size={20} className="text-gray-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900">{item.fullName}</p>
                              <p className="text-xs text-gray-400">/tac-gia/{item.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{item.jobTitle || "—"}</td>
                        <td className="px-5 py-4 text-gray-600">
                          <div className="min-w-0 text-xs leading-5">
                            {item.workEmail && <p className="truncate">{item.workEmail}</p>}
                            {item.zaloPhone && <p>{item.zaloPhone}</p>}
                            {!item.workEmail && !item.zaloPhone && "—"}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          <div className="text-xs leading-5">
                            <p>{item._count?.writtenArticles ?? 0} bài viết</p>
                            <p>{item._count?.reviewedArticles ?? 0} kiểm duyệt</p>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col items-start gap-1">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.isActive
                                  ? "bg-green-50 text-green-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {item.isActive ? "Hiển thị" : "Ẩn"}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                item.isIndexed
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {item.isIndexed ? "Index" : "Noindex"}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{formatDate(item.updatedAt)}</td>
                        {canManage && (
                          <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              {canUpdate && (
                                <Button
                                  variant="ghost"
                                  isIconOnly
                                  size="md"
                                  onClick={() =>
                                    guard("authors.all.update", () => openEdit(item), "Bạn không có quyền chỉnh sửa tác giả.")
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
                                      "authors.all.delete",
                                      () => setDeleteConfirm({ show: true, author: item }),
                                      "Bạn không có quyền xóa tác giả.",
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
                        )}
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={canManage ? 7 : 6}>
                          <AdminEmptyState message="Chưa có tác giả nào. Hãy bấm &quot;Tạo tác giả&quot; để thêm." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </AdminTable>
              )}
            </div>

            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </Section>
  );
}
