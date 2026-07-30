"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { NewsManageList } from "./NewsManageList";
import { NewsManageForm } from "./NewsManageForm";
import { NewsPreviewDialog } from "./NewsPreviewDialog";
import { ArticleHistoryDialog } from "./ArticleHistoryDialog";
import { Pagination } from "@/components/ui/Pagination";
import { newsApi } from "@/api/domains/news";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ReviewerNotifySelect } from "@/components/ui/admin/ReviewerNotifySelect";
import { useAuth } from "@/contexts/AuthContext";
import { accountsApi } from "@/api/domains/accounts";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useAdminList } from "@/hooks/useAdminList";
import type { NewsArticle, NewsCategory, ArticleFilters, AccountReviewer } from "@/types/api";

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
  const searchParams = useSearchParams();
  const { hasPermission, account } = useAuth();
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const {
    items,
    setItems,
    loading,
    meta,
    filters,
    setFilters,
    fetchItems,
    handlePageChange,
    handleFilterChange,
  } = useAdminList<NewsArticle, ArticleFilters>(
    (currentFilters) => newsApi.getArticles(currentFilters),
    {
      initialFilters: { page: 1, limit: DEFAULT_LIMIT, sortBy: "createdAt", sortOrder: "desc" },
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
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({ show: false, id: "" });
  const [actionConfirm, setActionConfirm] = useState<ActionConfirm>({ type: null, id: "" });
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [previewArticle, setPreviewArticle] = useState<NewsArticle | null>(null);
  const [historyArticleId, setHistoryArticleId] = useState<string | null>(null);
  const [newsReviewers, setNewsReviewers] = useState<AccountReviewer[]>([]);
  const [notifyAccountId, setNotifyAccountId] = useState("");
  const handledEditIdRef = useRef<string | null>(null);

  useEffect(() => {
    accountsApi
      .getNewsReviewers()
      .then(setNewsReviewers)
      .catch(() => setNewsReviewers([]));
  }, []);

  useEffect(() => {
    newsApi
      .getCategories()
      .then(setCategories)
      .catch((err) => {
        handleApiError(err, { messagePrefix: "Không thể tải danh mục: " });
        setCategories([]);
      });
  }, [handleApiError]);

  const handleSave = (article?: NewsArticle) => {
    if (article) {
      setEditing(article);
    }
    fetchItems();
  };

  const handleEdit = async (id: string) => {
    try {
      const article = await newsApi.getArticleById(id);
      setEditing(article);
      setIsViewing(false);
      setShowForm(true);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleView = async (id: string) => {
    try {
      const article = await newsApi.getArticleById(id);
      setEditing(article);
      setIsViewing(true);
      setShowForm(true);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handlePreview = async (id: string) => {
    try {
      const article = await newsApi.getArticleById(id);
      setPreviewArticle(article);
    } catch (err) {
      handleApiError(err);
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
        showSuccess("Xóa bài viết thành công!");
      })
      .catch(handleApiError);
  };

  const openActionConfirm = (id: string, type: ActionType) => {
    if (type === "submit") {
      setNotifyAccountId("");
    }
    setActionConfirm({ type, id });
  };

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (!editId || handledEditIdRef.current === editId) return;

    handledEditIdRef.current = editId;
    void handleEdit(editId);
  }, [searchParams]);

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
          showSuccess("Duyệt bài viết thành công!");
        } else if (type === "revoke") {
          await newsApi.revokeArticle(id);
          showSuccess("Đã hủy duyệt bài viết!");
        } else if (type === "submit") {
          await newsApi.updateArticle(id, {
            status: "pending",
            notifyAccountId: notifyAccountId || null,
          });
          showSuccess("Đã gửi bài viết đi duyệt!");
        } else if (type === "reject") {
          await newsApi.updateArticle(id, { status: "draft" });
          showSuccess("Đã từ chối duyệt bài viết!");
        }
        fetchItems();
      } catch (err) {
        handleApiError(err);
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
          >
            {actionConfirm.type === "submit" && (
              <ReviewerNotifySelect
                value={notifyAccountId}
                reviewers={newsReviewers}
                onChange={setNotifyAccountId}
              />
            )}
          </ConfirmDialog>

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
                onViewHistory={(id) => setHistoryArticleId(id)}
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

          <ArticleHistoryDialog
            articleId={historyArticleId ?? ""}
            isOpen={!!historyArticleId}
            onClose={() => setHistoryArticleId(null)}
          />
      </div>
    </Section>
  );
}
