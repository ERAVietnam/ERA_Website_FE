"use client";

import { useEffect, useState, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { NewsManageList } from "./NewsManageList";
import { NewsManageForm } from "./NewsManageForm";
import { NewsPreviewDialog } from "./NewsPreviewDialog";
import { Pagination } from "@/components/ui/Pagination";
import { newsApi } from "@/api/domains/news";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getErrorMessage } from "@/lib/error-messages";
import { useAuth } from "@/contexts/AuthContext";
import type { NewsArticle, NewsCategory, PaginationMeta, ArticleFilters } from "@/types/api";

const DEFAULT_LIMIT = 10;

type ActionType = "submit" | "publish" | "reject" | "revoke";

interface ActionConfirm {
  type: ActionType | null;
  id: string;
}

const actionMessages: Record<ActionType, { title: string; message: string; confirmLabel: string }> = {
  submit: {
    title: "Gửi duyệt bài viết",
    message: "Sau khi gửi duyệt, bài viết sẽ chuyển sang trạng thái chờ duyệt và bạn không thể sửa/xóa nữa.",
    confirmLabel: "Gửi duyệt",
  },
  publish: {
    title: "Duyệt bài viết",
    message: "Sau khi duyệt, bài viết sẽ được đăng công khai và không thể sửa/xóa trực tiếp.",
    confirmLabel: "Duyệt",
  },
  reject: {
    title: "Từ chối duyệt",
    message: "Bài viết sẽ bị từ chối và chuyển về trạng thái bản nháp.",
    confirmLabel: "Từ chối",
  },
  revoke: {
    title: "Hủy duyệt bài viết",
    message: "Hủy duyệt sẽ đưa bài viết từ trạng thái đã đăng trở về chờ duyệt.",
    confirmLabel: "Hủy duyệt",
  },
};

export default function NewsManagePage() {
  const { hasPermission, account } = useAuth();
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({ show: false, id: "" });
  const [actionConfirm, setActionConfirm] = useState<ActionConfirm>({ type: null, id: "" });
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [previewArticle, setPreviewArticle] = useState<NewsArticle | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState<ArticleFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await newsApi.getArticles(filters);
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
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    newsApi.getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput.trim() || undefined,
        page: 1,
      }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSave = () => {
    setShowForm(false);
    setEditing(null);
    fetchItems();
  };

  const handleFilterChange = (key: keyof ArticleFilters, value: ArticleFilters[typeof key]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleEdit = async (id: string) => {
    try {
      const article = await newsApi.getArticleById(id);
      setEditing(article);
      setIsViewing(false);
      setShowForm(true);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Không thể tải bài viết. Vui lòng thử lại."),
      });
    }
  };

  const handleView = async (id: string) => {
    try {
      const article = await newsApi.getArticleById(id);
      setEditing(article);
      setIsViewing(true);
      setShowForm(true);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Không thể tải bài viết. Vui lòng thử lại."),
      });
    }
  };

  const handlePreview = async (id: string) => {
    try {
      const article = await newsApi.getArticleById(id);
      setPreviewArticle(article);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Không thể tải bài viết để xem trước. Vui lòng thử lại."),
      });
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleConfirmDelete = () => {
    const { id } = deleteConfirm;
    if (!id) return;
    setDeleteConfirm({ show: false, id: "" });
    newsApi
      .deleteArticle(id)
      .then(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setPopup({
          show: true,
          type: "success",
          message: "Xóa bài viết thành công!",
        });
      })
      .catch((err) => {
        setPopup({
          show: true,
          type: "error",
          message: getErrorMessage(err?.status, err?.data, "Xóa bài viết thất bại. Vui lòng thử lại."),
        });
      });
  };

  const refreshItems = () => {
    fetchItems();
  };

  const openActionConfirm = (id: string, type: ActionType) => {
    setActionConfirm({ type, id });
  };

  const closeActionConfirm = () => {
    setActionConfirm({ type: null, id: "" });
  };

  const handleConfirmAction = () => {
    const { type, id } = actionConfirm;
    if (!type || !id) return;
    closeActionConfirm();

    setActionLoading(id);
    const run = async () => {
      try {
        if (type === "publish") {
          await newsApi.publishArticle(id);
          setPopup({ show: true, type: "success", message: "Duyệt bài viết thành công!" });
        } else if (type === "revoke") {
          await newsApi.revokeArticle(id);
          setPopup({ show: true, type: "success", message: "Đã hủy duyệt bài viết!" });
        } else if (type === "submit") {
          await newsApi.updateArticle(id, { status: "pending" });
          setPopup({ show: true, type: "success", message: "Đã gửi bài viết đi duyệt!" });
        } else if (type === "reject") {
          await newsApi.updateArticle(id, { status: "draft" });
          setPopup({ show: true, type: "success", message: "Đã từ chối duyệt bài viết!" });
        }
        refreshItems();
      } catch (err: any) {
        const defaultMessage =
          type === "publish"
            ? "Duyệt bài viết thất bại."
            : type === "revoke"
            ? "Hủy duyệt bài viết thất bại."
            : type === "submit"
            ? "Gửi duyệt thất bại."
            : "Từ chối duyệt thất bại.";
        setPopup({ show: true, type: "error", message: getErrorMessage(err?.status, err?.data, defaultMessage) });
      } finally {
        setActionLoading(null);
      }
    };
    run();
  };

  const handleAdd = () => {
    setEditing(null);
    setIsViewing(false);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setIsViewing(false);
  };

  const activeAction = actionConfirm.type ? actionMessages[actionConfirm.type] : null;

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
          {popup.show && (
            <PopupNotification
              type={popup.type}
              message={popup.message}
              onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
              autoClose={popup.type === "success"}
            />
          )}

          <ConfirmDialog
            isOpen={deleteConfirm.show}
            title="Xác nhận xóa"
            message="Bạn có chắc muốn xóa bài viết này? Hành động này không thể hoàn tác."
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
            <NewsManageForm
              initialData={editing ?? undefined}
              readOnly={isViewing}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <>
              <NewsManageList
                items={items}
                categories={categories}
                loading={loading || actionLoading !== null}
                searchInput={searchInput}
                filters={filters}
                meta={meta}
                currentAccountId={account?.id}
                onSearchChange={setSearchInput}
                onFilterChange={handleFilterChange}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
                onAdd={handleAdd}
                onPreview={handlePreview}
                onPublish={(id) => openActionConfirm(id, "publish")}
                onRevoke={(id) => openActionConfirm(id, "revoke")}
                onSubmitForReview={(id) => openActionConfirm(id, "submit")}
                onReject={(id) => openActionConfirm(id, "reject")}
              />

              <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}

          <NewsPreviewDialog
            article={previewArticle}
            isOpen={!!previewArticle}
            onClose={() => setPreviewArticle(null)}
          />
      </div>
    </Section>
  );
}
