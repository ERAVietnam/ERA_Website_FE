"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { AccountManageList } from "./AccountManageList";
import { AccountManageForm } from "./AccountManageForm";
import { Pagination } from "@/components/ui/Pagination";
import { accountsApi } from "@/api/domains/accounts";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useAdminList } from "@/hooks/useAdminList";
import type { ManagementAccount, AccountFilters } from "@/types/api";

const DEFAULT_LIMIT = 10;

export default function AccountManagePage() {
  const { account } = useAuth();
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const {
    items,
    setItems,
    loading,
    meta,
    setFilters,
    fetchItems: loadAccounts,
    handlePageChange,
  } = useAdminList<ManagementAccount, AccountFilters>(
    (currentFilters) => accountsApi.getAccounts(currentFilters),
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
  const [editing, setEditing] = useState<ManagementAccount | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({
    show: false,
    id: "",
  });
  const [statusFilter, setStatusFilter] = useState("");

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setFilters((prev) => ({
      ...prev,
      isActive: value === "" ? undefined : value === "active",
      page: 1,
    }));
  };

  const handleSave = (account?: ManagementAccount) => {
    if (account) {
      setEditing(account);
    }
    loadAccounts().catch(() => {});
  };

  const handleEdit = async (item: ManagementAccount) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleConfirmDelete = () => {
    const { id } = deleteConfirm;
    if (!id) return;
    setDeleteConfirm({ show: false, id: "" });
    accountsApi
      .deleteAccount(id)
      .then(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
        showSuccess("Xóa tài khoản thành công!");
      })
      .catch(handleApiError);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

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

          <ConfirmDialog
            isOpen={deleteConfirm.show}
            title="Xác nhận xóa"
            message="Bạn có chắc muốn xóa tài khoản này? Hành động này không thể hoàn tác."
            confirmLabel="Xóa"
            cancelLabel="Hủy"
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteConfirm({ show: false, id: "" })}
          />

          {showForm ? (
            <AccountManageForm
              initialData={editing ?? undefined}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <>
              <AccountManageList
                items={items}
                currentAccountId={account?.id}
                loading={loading}
                searchInput={searchInput}
                onSearchChange={setSearchInput}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
                meta={meta}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
              />

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
