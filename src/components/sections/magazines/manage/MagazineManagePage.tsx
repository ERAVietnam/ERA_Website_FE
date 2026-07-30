"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { MagazineManageList } from "./MagazineManageList";
import { MagazineManageForm } from "./MagazineManageForm";
import { magazinesApi } from "@/api/domains/magazines";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useAdminList } from "@/hooks/useAdminList";
import type { EMagazine, MagazineFilters } from "@/types/api";

const DEFAULT_LIMIT = 9;

type ActionType = "publish" | "unpublish";

interface ActionConfirm {
  type: ActionType | null;
  id: string;
}

export default function MagazineManagePage() {
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const {
    items,
    setItems,
    loading,
    meta,
    filters,
    setFilters,
    handlePageChange,
    handleFilterChange,
  } = useAdminList<EMagazine, MagazineFilters>(
    (currentFilters) => magazinesApi.getAllMagazines(currentFilters),
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
  const [editing, setEditing] = useState<EMagazine | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({ show: false, id: "" });
  const [actionConfirm, setActionConfirm] = useState<ActionConfirm>({ type: null, id: "" });

  const handleSave = (magazine?: EMagazine) => {
    if (!magazine) return;
    setItems((prev) =>
      prev.some((item) => item.id === magazine.id)
        ? prev.map((item) => (item.id === magazine.id ? magazine : item))
        : [magazine, ...prev]
    );
    setEditing(magazine);
  };

  const handleEdit = (item: EMagazine) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleConfirmDelete = async () => {
    const { id } = deleteConfirm;
    if (!id) return;
    setDeleteConfirm({ show: false, id: "" });
    try {
      await magazinesApi.deleteMagazine(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      showSuccess("Xóa e-magazine thành công!");
    } catch (err) {
      handleApiError(err);
    }
  };

  const openActionConfirm = (id: string, type: ActionType) => {
    setActionConfirm({ type, id });
  };

  const closeActionConfirm = () => {
    setActionConfirm({ type: null, id: "" });
  };

  const handleConfirmAction = async () => {
    const { type, id } = actionConfirm;
    if (!type || !id) return;
    closeActionConfirm();

    try {
      if (type === "publish") {
        const updated = await magazinesApi.publishMagazine(id);
        setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        showSuccess("Đăng e-magazine thành công!");
      } else if (type === "unpublish") {
        const updated = await magazinesApi.unpublishMagazine(id);
        setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        showSuccess("Đã gỡ e-magazine về bản nháp!");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const activeAction = actionConfirm.type
    ? {
        publish: {
          title: "Đăng e-magazine",
          message: "E-magazine sẽ được đăng công khai.",
          confirmLabel: "Đăng",
        },
        unpublish: {
          title: "Gỡ e-magazine",
          message: "E-magazine sẽ được chuyển về trạng thái bản nháp.",
          confirmLabel: "Gỡ",
        },
      }[actionConfirm.type]
    : null;

  return (
    <Section padding="md" bg="gray">
      <div className="max-w-6xl mx-auto">
        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={closePopup}
            autoClose
            autoCloseMs={1000}
          />
        )}

        <ConfirmDialog
          isOpen={deleteConfirm.show}
          title="Xác nhận xóa"
          message="Bạn có chắc muốn xóa e-magazine này? Hành động này không thể hoàn tác."
          confirmLabel="Xóa"
          cancelLabel="Hủy"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm({ show: false, id: "" })}
        />

        <ConfirmDialog
          isOpen={!!activeAction}
          variant="warning"
          title={activeAction?.title}
          message={activeAction?.message ?? ""}
          confirmLabel={activeAction?.confirmLabel}
          cancelLabel="Hủy"
          onConfirm={handleConfirmAction}
          onCancel={closeActionConfirm}
        />

        {showForm ? (
          <MagazineManageForm initialData={editing ?? undefined} onSave={handleSave} onCancel={handleCancel} />
        ) : (
          <MagazineManageList
            items={items}
            loading={loading}
            meta={meta}
            filters={filters}
            searchInput={searchInput}
            onSearchChange={setSearchInput}
            onFilterChange={handleFilterChange}
            onPageChange={handlePageChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={(id) => openActionConfirm(id, "publish")}
            onUnpublish={(id) => openActionConfirm(id, "unpublish")}
            onAdd={handleAdd}
          />
        )}
      </div>
    </Section>
  );
}
