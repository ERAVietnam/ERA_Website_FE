"use client";

import { useEffect, useState, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { AccountManageList } from "./AccountManageList";
import { AccountManageForm } from "./AccountManageForm";
import { Pagination } from "@/components/ui/Pagination";
import { accountsApi } from "@/api/domains/accounts";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getErrorMessage } from "@/lib/error-messages";
import { useAuth } from "@/contexts/AuthContext";
import type { ManagementAccount, PaginationMeta, AccountFilters } from "@/types/api";

const DEFAULT_LIMIT = 10;

export default function AccountManagePage() {
  const { account } = useAuth();
  const [items, setItems] = useState<ManagementAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ManagementAccount | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({
    show: false,
    id: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState<AccountFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await accountsApi.getAccounts(filters);
      setItems(response.items);
      setMeta(response.meta);
    } catch {
      setItems([]);
      setMeta({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadAccounts().finally(() => setLoading(false));
  }, [loadAccounts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchInput.trim() || undefined;
      setFilters((prev) => {
        if (prev.search === search) return prev;
        return { ...prev, search, page: 1 };
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
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
        setPopup({
          show: true,
          type: "success",
          message: "Xóa tài khoản thành công!",
        });
      })
      .catch((err) => {
        setPopup({
          show: true,
          type: "error",
          message: getErrorMessage(
            err?.status,
            err?.data,
            "Xóa tài khoản thất bại. Vui lòng thử lại.",
          ),
        });
      });
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
          {popup.show && (
            <PopupNotification
              type={popup.type}
              message={popup.message}
              onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
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
