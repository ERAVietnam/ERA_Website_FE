"use client";

import { useEffect, useState, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { MagazineManageList } from "./MagazineManageList";
import { MagazineManageForm } from "./MagazineManageForm";
import { magazinesApi } from "@/api/domains/magazines";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getErrorMessage } from "@/lib/error-messages";
import type { EMagazine, MagazineFilters, PaginationMeta } from "@/types/api";

const DEFAULT_LIMIT = 9;

type ActionType = "publish" | "unpublish";

interface ActionConfirm {
  type: ActionType | null;
  id: string;
}

export default function MagazineManagePage() {
  const [items, setItems] = useState<EMagazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EMagazine | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({ show: false, id: "" });
  const [actionConfirm, setActionConfirm] = useState<ActionConfirm>({ type: null, id: "" });
  const [searchInput, setSearchInput] = useState("");
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState<MagazineFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await magazinesApi.getAllMagazines(filters);
      setItems(response.items);
      setMeta(response.meta);
    } catch (err: any) {
      setItems([]);
      setMeta({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Không thể tải danh sách e-magazine."),
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchInput.trim() || undefined;
      setFilters((prev) => {
        if (prev.search === search) return prev;
        return { ...prev, search, page: 1 };
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleFilterChange = (key: keyof MagazineFilters, value: MagazineFilters[typeof key]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

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
      setPopup({ show: true, type: "success", message: "Xóa e-magazine thành công!" });
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Xóa e-magazine thất bại. Vui lòng thử lại."),
      });
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
        setPopup({ show: true, type: "success", message: "Đăng e-magazine thành công!" });
      } else if (type === "unpublish") {
        const updated = await magazinesApi.unpublishMagazine(id);
        setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
        setPopup({ show: true, type: "success", message: "Đã gỡ e-magazine về bản nháp!" });
      }
    } catch (err: any) {
      const defaultMessage = type === "publish" ? "Đăng e-magazine thất bại." : "Gỡ e-magazine thất bại.";
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, defaultMessage),
      });
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
