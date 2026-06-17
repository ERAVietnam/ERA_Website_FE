"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { X, Loader2, History, Eye } from "lucide-react";
import { newsApi } from "@/api/domains/news";
import { mediaApi } from "@/api/domains/media";
import { createArticleSchema } from "@/schemas/news.schema";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ArticleHistoryDialog } from "./ArticleHistoryDialog";
import { NewsPreviewDialog } from "./NewsPreviewDialog";
import { getErrorMessage } from "@/lib/error-messages";
import { useAuth } from "@/contexts/AuthContext";
import { getNewsScopeBySlug } from "@/lib/permissions";
import type { NewsCategory, NewsArticle } from "@/types/api";



const RichEditor = dynamic(
  () => import("@/components/shared/RichEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-3 border-gray-300 border-t-[#C8102E]" />
        <p className="mt-3 text-sm text-gray-400">Đang tải trình soạn thảo...</p>
      </div>
    ),
  }
);

export interface NewsFormData {
  id?: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  image?: string;
}

interface Props {
  initialData?: NewsArticle;
  readOnly?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

function toSlug(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

interface FormState {
  title: string;
  categoryId: string;
  slug: string;
  summary: string;
  content: string;
  source: string;
  metaTitle: string;
  metaDescription: string;
  isIndexed: boolean;
  canonicalUrl: string;
  isFeatured: boolean;
}

function articleToFormState(article?: NewsArticle): FormState {
  if (!article) {
    return {
      title: "",
      categoryId: "",
      slug: "",
      summary: "",
      content: "",
      source: "",
      metaTitle: "",
      metaDescription: "",
      isIndexed: true,
      canonicalUrl: "",
      isFeatured: false,
    };
  }
  return {
    title: article.title,
    categoryId: article.categoryId,
    slug: article.slug,
    summary: article.summary ?? "",
    content: article.content,
    source: article.source ?? "",
    metaTitle: article.metaTitle ?? "",
    metaDescription: article.metaDescription ?? "",
    isIndexed: article.isIndexed ?? true,
    canonicalUrl: article.canonicalUrl ?? "",
    isFeatured: article.isFeatured,
  };
}

export function NewsManageForm({ initialData, readOnly = false, onSave, onCancel }: Props) {
  const { hasPermission, account } = useAuth();
  const authorName = initialData?.author?.name ?? account?.name ?? "—";
  const [form, setForm] = useState<FormState>(() => articleToFormState(initialData));

  const isSuperAdmin = hasPermission("system.super_admin");
  const articleScope = initialData ? getNewsScopeBySlug(initialData.category.slug) : null;
  const canPublishScope =
    isSuperAdmin ||
    hasPermission("news.articles.all.publish") ||
    (articleScope && hasPermission(`news.articles.${articleScope}.publish`));
  const isAuthor = initialData
    ? account?.id === initialData.authorId || isSuperAdmin
    : false;
  const status = initialData?.status ?? "draft";
  const isReadOnly =
    readOnly ||
    status === "published" ||
    (status === "pending" && !canPublishScope && !!initialData?.id) ||
    (status === "draft" && !!initialData?.id && !isAuthor);

  const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    draft: { label: "Bản nháp", color: "#6B7280", bg: "#F3F4F6" },
    pending: { label: "Chờ duyệt", color: "#D97706", bg: "#FEF3C7" },
    published: { label: "Đã đăng", color: "#059669", bg: "#D1FAE5" },
  };

  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.featuredImage?.url || "");
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    { type: "save" } | { type: "submit" } | { type: "publish" } | { type: "publish_dirty" } | { type: "reject" } | { type: "revoke" } | null
  >(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const initialForm = useMemo(() => articleToFormState(initialData), [initialData]);
  const initialImagePreview = initialData?.featuredImage?.url || "";

  const isDirty =
    JSON.stringify(form) !== JSON.stringify(initialForm) ||
    imagePreview !== initialImagePreview ||
    featuredImageFile !== null;

  useEffect(() => {
    setForm(articleToFormState(initialData));
    setImagePreview(initialData?.featuredImage?.url || "");
    setFeaturedImageFile(null);
  }, [initialData]);

  useEffect(() => {
    newsApi.getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const buildPreviewArticle = (): NewsArticle | null => {
    const category = categories.find((c) => c.id === form.categoryId);
    if (!category) return null;

    const base = initialData;
    const featuredImage = imagePreview
      ? ({ id: "preview", url: imagePreview, storageKey: "preview", filename: "preview", folder: "news" } as const)
      : base?.featuredImage ?? null;

    return {
      ...(base ?? ({} as NewsArticle)),
      id: base?.id ?? "preview",
      title: form.title,
      slug: form.slug,
      summary: form.summary || null,
      content: form.content,
      source: form.source || null,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
      isIndexed: form.isIndexed,
      canonicalUrl: form.canonicalUrl || null,
      isFeatured: form.isFeatured,
      categoryId: form.categoryId,
      category,
      featuredImage,
      author: base?.author ?? (account ? { id: account.id, name: account.name, email: account.email } : null),
      authorId: base?.authorId ?? account?.id ?? "preview",
      status: base?.status ?? "draft",
      viewCount: base?.viewCount ?? 0,
      createdAt: base?.createdAt ?? new Date().toISOString(),
      updatedAt: base?.updatedAt ?? new Date().toISOString(),
    } as NewsArticle;
  };

  const allowedCategories = useMemo(() => {
    if (hasPermission("news.articles.all.create")) return categories;
    return categories.filter((cat) => {
      const scope = getNewsScopeBySlug(cat.slug);
      if (scope && hasPermission(`news.articles.${scope}.create`)) return true;
      return cat.id === form.categoryId;
    });
  }, [categories, hasPermission, form.categoryId]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && (!prev.slug || prev.slug === toSlug(prev.title))) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImageFile(null);
    setImagePreview("");
  };

  const handleCancelRequest = () => {
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      onCancel();
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    onCancel();
  };

  const handleSubmitForReview = async () => {
    if (!initialData?.id) return;
    if (!pendingAction || pendingAction.type !== "submit") {
      setPendingAction({ type: "submit" });
      return;
    }
    setPendingAction(null);
    setPopup((prev) => ({ ...prev, show: false }));
    setIsLoading(true);
    try {
      await newsApi.updateArticle(initialData.id, { status: "pending" });
      setPopup({ show: true, type: "success", message: "Đã gửi bài viết đi duyệt!" });
      setTimeout(() => onSave(), 1500);
    } catch (err: any) {
      const errorData = err?.data;
      if (errorData && typeof errorData === "object" && errorData.field) {
        setFieldErrors((prev) => ({ ...prev, [errorData.field]: errorData.message || "Dữ liệu không hợp lệ" }));
        const element = document.getElementById(`field-${errorData.field}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          const focusable = element.querySelector('input, textarea, select, [contenteditable="true"]') as HTMLElement | null;
          if (focusable) focusable.focus();
        }
        return;
      }
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, err?.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!initialData?.id) return;
    if (isDirty) {
      setPendingAction({ type: "publish_dirty" });
      return;
    }
    if (!pendingAction || pendingAction.type !== "publish") {
      setPendingAction({ type: "publish" });
      return;
    }
    setPendingAction(null);
    setPopup((prev) => ({ ...prev, show: false }));
    setIsLoading(true);
    try {
      await newsApi.publishArticle(initialData.id);
      setPopup({ show: true, type: "success", message: "Duyệt bài viết thành công!" });
      setTimeout(() => onSave(), 1500);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, err?.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevoke = async () => {
    if (!initialData?.id) return;
    if (!pendingAction || pendingAction.type !== "revoke") {
      setPendingAction({ type: "revoke" });
      return;
    }
    setPendingAction(null);
    setPopup((prev) => ({ ...prev, show: false }));
    setIsLoading(true);
    try {
      await newsApi.revokeArticle(initialData.id);
      setPopup({ show: true, type: "success", message: "Đã hủy duyệt bài viết!" });
      setTimeout(() => onSave(), 1500);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, err?.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!initialData?.id) return;
    if (!pendingAction || pendingAction.type !== "reject") {
      setPendingAction({ type: "reject" });
      return;
    }
    setPendingAction(null);
    setPopup((prev) => ({ ...prev, show: false }));
    setIsLoading(true);
    try {
      await newsApi.updateArticle(initialData.id, { status: "draft" });
      setPopup({ show: true, type: "success", message: "Đã từ chối duyệt bài viết!" });
      setTimeout(() => onSave(), 1500);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, err?.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  function base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async function processContentImages(content: string): Promise<string> {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = Array.from(doc.querySelectorAll('img[src^="data:image"]'));

    if (images.length === 0) return content;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const base64 = img.getAttribute("src")!;
      const file = base64ToFile(base64, `content-img-${Date.now()}-${i}.png`);
      const upload = await mediaApi.uploadImage(file, "news");
      img.setAttribute("src", upload.url);
    }

    return doc.body.innerHTML;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPopup((prev) => ({ ...prev, show: false }));
    setFieldErrors({});

    const validation = createArticleSchema.safeParse({
      ...form,
      author: undefined,
      countryCode: undefined,
    });

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        errors[path] = issue.message;
      });
      setFieldErrors(errors);

      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(`field-${firstErrorField}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const focusable = element.querySelector('input, textarea, select, [contenteditable="true"]') as HTMLElement | null;
          if (focusable) focusable.focus();
        }
      }

      return;
    }

    if (initialData?.id && (!pendingAction || pendingAction.type !== "save")) {
      setPendingAction({ type: "save" });
      return;
    }
    setPendingAction(null);

    setIsLoading(true);

    try {
      let featuredImageMediaId: string | undefined | null;

      if (featuredImageFile) {
        const upload = await mediaApi.uploadImage(featuredImageFile, "news");
        featuredImageMediaId = upload.id;
      } else if (!imagePreview && initialData?.featuredImageMediaId) {
        featuredImageMediaId = null;
      } else if (initialData?.featuredImageMediaId) {
        featuredImageMediaId = initialData.featuredImageMediaId;
      }

      const processedContent = await processContentImages(form.content);

      const payload = {
        title: form.title,
        slug: form.slug,
        summary: form.summary || undefined,
        content: processedContent,
        categoryId: form.categoryId,
        featuredImageMediaId,
        source: form.source || undefined,
        metaTitle: form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        isIndexed: form.isIndexed,
        canonicalUrl: form.canonicalUrl || null,
        isFeatured: form.isFeatured,
      };

      if (initialData?.id) {
        await newsApi.updateArticle(initialData.id, payload);
      } else {
        await newsApi.createArticle(payload);
      }

      setPopup({
        show: true,
        type: "success",
        message: initialData?.id ? "Cập nhật bài viết thành công!" : "Tạo bài viết thành công!",
      });

      setTimeout(() => {
        onSave();
      }, 3000);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, err?.message),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputBaseClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors outline-none focus:border-gray-400";

  const errorInputClass = "border-red-300 focus:border-red-400 bg-red-50/30";

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_11rem] gap-6 items-start">
      {/* Main form content */}
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2
              className="text-xl font-black"
              style={{ color: colors.primary.navy.DEFAULT }}
            >
              {isReadOnly
                ? "Chi tiết bài viết"
                : initialData
                ? "Chỉnh sửa tin tức"
                : "Tạo tin tức mới"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Tác giả: <span className="font-medium text-gray-700">{authorName}</span>
            </p>
            {initialData && (
              <span
                className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{
                  color: statusConfig[status]?.color,
                  backgroundColor: statusConfig[status]?.bg,
                }}
              >
                {statusConfig[status]?.label}
              </span>
            )}
          </div>
          <Button variant="ghost" isIconOnly size="sm" onClick={handleCancelRequest}>
            <X size={20} className="text-gray-500" />
          </Button>
        </div>

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose={popup.type === "success"}
          />
        )}

        <ConfirmDialog
          isOpen={showCancelConfirm}
          title="Bỏ thay đổi?"
          message="Bạn đã nhập thông tin. Nếu huỷ, những thay đổi này sẽ không được lưu."
          confirmLabel="Vẫn hủy"
          cancelLabel="Ở lại"
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelConfirm(false)}
        />

        <ConfirmDialog
          isOpen={!!pendingAction}
          variant="warning"
          title={
            pendingAction?.type === "save"
              ? "Lưu thay đổi"
              : pendingAction?.type === "submit"
              ? "Gửi duyệt bài viết"
              : pendingAction?.type === "publish"
              ? "Duyệt bài viết"
              : pendingAction?.type === "publish_dirty"
              ? "Thay đổi chưa được lưu"
              : pendingAction?.type === "reject"
              ? "Từ chối duyệt"
              : pendingAction?.type === "revoke"
              ? "Hủy duyệt bài viết"
              : "Xác nhận"
          }
          message={
            pendingAction?.type === "save"
              ? "Bạn có chắc muốn lưu các thay đổi cho bài viết này?"
              : pendingAction?.type === "submit"
              ? "Sau khi gửi duyệt, bài viết sẽ chuyển sang trạng thái chờ duyệt và không thể sửa/xóa nữa."
              : pendingAction?.type === "publish"
              ? "Sau khi duyệt, bài viết sẽ được đăng công khai và không thể sửa/xóa trực tiếp."
              : pendingAction?.type === "publish_dirty"
              ? "Bạn có thay đổi chưa lưu. Vui lòng lưu trước khi duyệt bài viết."
              : pendingAction?.type === "reject"
              ? "Bài viết sẽ bị từ chối và chuyển về trạng thái bản nháp."
              : pendingAction?.type === "revoke"
              ? "Hủy duyệt sẽ đưa bài viết từ trạng thái đã đăng trở về chờ duyệt."
              : ""
          }
          confirmLabel={
            pendingAction?.type === "save"
              ? "Lưu"
              : pendingAction?.type === "submit"
              ? "Gửi duyệt"
              : pendingAction?.type === "publish"
              ? "Duyệt"
              : pendingAction?.type === "publish_dirty"
              ? "Đã hiểu"
              : pendingAction?.type === "reject"
              ? "Từ chối"
              : pendingAction?.type === "revoke"
              ? "Hủy duyệt"
              : "Xác nhận"
          }
          cancelLabel="Hủy"
          onConfirm={() => {
            if (pendingAction?.type === "save") {
              handleSubmit({ preventDefault: () => {} } as React.FormEvent);
            } else if (pendingAction?.type === "submit") {
              handleSubmitForReview();
            } else if (pendingAction?.type === "publish") {
              handlePublish();
            } else if (pendingAction?.type === "publish_dirty") {
              setPendingAction(null);
            } else if (pendingAction?.type === "reject") {
              handleReject();
            } else if (pendingAction?.type === "revoke") {
              handleRevoke();
            }
          }}
          onCancel={() => setPendingAction(null)}
        />

        {initialData?.id && (
          <ArticleHistoryDialog
            articleId={initialData.id}
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
          />
        )}

        <form id="article-form" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Title + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div id="field-title">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tiêu đề bài viết <span style={{ color: colors.primary.DEFAULT }}>*</span>
                </label>
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Nhập tiêu đề bài báo..."
                  disabled={isReadOnly}
                  className={`${inputBaseClass} ${fieldErrors.title ? errorInputClass : ""}`}
                />
                {fieldErrors.title && <p className="mt-1 text-xs text-red-500">{fieldErrors.title}</p>}
              </div>
              <div id="field-categoryId">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Danh mục <span style={{ color: colors.primary.DEFAULT }}>*</span>
                </label>
                <div className="relative">
                  <select
                    value={form.categoryId}
                    onChange={(e) => update("categoryId", e.target.value)}
                    disabled={isReadOnly}
                    className={`${inputBaseClass} appearance-none cursor-pointer ${fieldErrors.categoryId ? errorInputClass : ""}`}
                  >
                    <option value="">Chọn danh mục</option>
                    {allowedCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                {fieldErrors.categoryId && <p className="mt-1 text-xs text-red-500">{fieldErrors.categoryId}</p>}
              </div>
            </div>

            {/* Slug + Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div id="field-slug">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug <span style={{ color: colors.primary.DEFAULT }}>*</span>
                </label>
                <input
                  value={form.slug}
                  onChange={(e) => update("slug", e.target.value)}
                  placeholder="tiêu-đề-bài-viết"
                  disabled={isReadOnly}
                  className={`${inputBaseClass} ${fieldErrors.slug ? errorInputClass : ""}`}
                />
                {fieldErrors.slug && <p className="mt-1 text-xs text-red-500">{fieldErrors.slug}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nguồn bài viết
                </label>
                <input
                  value={form.source}
                  onChange={(e) => update("source", e.target.value)}
                  placeholder="VnExpress, Tuổi Trẻ..."
                  disabled={isReadOnly}
                  className={inputBaseClass}
                />
              </div>
            </div>

            {/* Meta Title */}
            <div id="field-metaTitle">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Title (SEO)
              </label>
              <input
                value={form.metaTitle}
                onChange={(e) => update("metaTitle", e.target.value)}
                placeholder="Tiêu đề hiển thị trên Google..."
                disabled={isReadOnly}
                className={inputBaseClass}
              />
            </div>

            {/* Meta Description */}
            <div id="field-metaDescription">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Description (SEO)
              </label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
                placeholder="Mô tả ngắn cho SEO..."
                rows={3}
                disabled={isReadOnly}
                className={`${inputBaseClass} resize-none`}
              />
            </div>

            {/* Index toggle */}
            <div id="field-isIndexed">
              <div className="flex items-center gap-3">
                <input
                  id="isIndexed"
                  type="checkbox"
                  checked={form.isIndexed}
                  onChange={(e) => update("isIndexed", e.target.checked)}
                  disabled={isReadOnly}
                  className="h-4 w-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                <label htmlFor="isIndexed" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Cho phép Google lập chỉ mục (index)
                </label>
              </div>
            </div>

            {/* Canonical URL */}
            <div id="field-canonicalUrl">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Canonical URL
              </label>
              <input
                value={form.canonicalUrl}
                onChange={(e) => update("canonicalUrl", e.target.value)}
                placeholder="https://era.com.vn/tin-tuc/... (để trống nếu không dùng canonical URL)"
                disabled={isReadOnly}
                className={inputBaseClass}
              />
              <p className="mt-1 text-xs text-gray-500">
                Nếu để trống, bài viết sẽ không có canonical URL.
              </p>
            </div>

            {/* Featured toggle */}
            <div id="field-isFeatured">
              <div className="flex items-center gap-3">
                <input
                  id="isFeatured"
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => {
                    update("isFeatured", e.target.checked);
                    if (fieldErrors.isFeatured) {
                      setFieldErrors((prev) => ({ ...prev, isFeatured: "" }));
                    }
                  }}
                  disabled={isReadOnly}
                  className="h-4 w-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Đánh dấu là bài viết nổi bật
                </label>
              </div>
              {fieldErrors.isFeatured && (
                <p className="mt-1.5 text-xs text-red-500">{fieldErrors.isFeatured}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ảnh đại diện
              </label>
              {imagePreview ? (
                <div className="relative inline-block rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-[200px] h-auto object-cover"
                  />
                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                      title="Xoá ảnh"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ) : isReadOnly ? (
                <div className="flex items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400">
                  Không có ảnh đại diện
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 w-full h-32 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-sm text-gray-500">
                    Kéo thả ảnh vào đây hoặc{" "}
                    <span className="font-semibold" style={{ color: colors.primary.DEFAULT }}>chọn file</span>
                  </span>
                  <span className="text-xs text-gray-400">Hỗ trợ: JPG, PNG, WEBP</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                    disabled={isReadOnly}
                  />
                </label>
              )}
            </div>

            {/* Summary */}
            <div id="field-summary">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tóm tắt bài viết
              </label>
              <textarea
                value={form.summary}
                onChange={(e) => update("summary", e.target.value)}
                placeholder="Nhập tóm tắt ngắn gọn nội dung bài viết..."
                rows={3}
                disabled={isReadOnly}
                className={`${inputBaseClass} resize-none`}
              />
            </div>

            {/* Content */}
            <div id="field-content">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nội dung chi tiết <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <div className={`rounded-lg border overflow-hidden transition-colors ${fieldErrors.content ? "border-red-300 focus-within:border-red-400" : "border-gray-200 focus-within:border-gray-400"}`}>
                <RichEditor value={form.content} onChange={(val) => update("content", val)} disabled={isReadOnly} />
              </div>
              {fieldErrors.content && <p className="mt-1 text-xs text-red-500">{fieldErrors.content}</p>}
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex flex-wrap items-center justify-end gap-5 pt-4 md:hidden">
            {!isReadOnly && status === "draft" && initialData?.id && isAuthor && (
              <Button type="button" variant="primary" size="sm" className="px-5" onClick={handleSubmitForReview} disabled={isLoading}>
                Gửi duyệt
              </Button>
            )}
            {!isReadOnly && status === "pending" && canPublishScope && (
              <Button type="button" variant="primary" size="sm" className="px-5" onClick={handlePublish} disabled={isLoading}>
                Duyệt
              </Button>
            )}
            {!isReadOnly && status === "pending" && canPublishScope && (
              <Button type="button" variant="outline" size="sm" className="px-5" onClick={handleReject} disabled={isLoading}>
                Từ chối
              </Button>
            )}
            {isReadOnly && status === "published" && canPublishScope && (
              <Button type="button" variant="outline" size="sm" className="px-5" onClick={handleRevoke} disabled={isLoading}>
                Hủy duyệt
              </Button>
            )}
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" size="sm" className="px-5 bg-white" onClick={handleCancelRequest} disabled={isLoading}>
                {isReadOnly ? "Đóng" : "Huỷ"}
              </Button>
              {!isReadOnly && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md px-5 py-2 text-sm bg-white border-2"
                  style={{ borderColor: colors.primary.navy.DEFAULT, color: colors.primary.navy.DEFAULT }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary.navy.DEFAULT;
                    e.currentTarget.style.color = colors.neutral.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.neutral.white;
                    e.currentTarget.style.color = colors.primary.navy.DEFAULT;
                  }}
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                  )}
                  {isLoading ? "Đang lưu..." : initialData ? "Lưu thay đổi" : "Lưu nháp"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Sticky action sidebar — right */}
      <div className="hidden md:block sticky top-20 self-start">
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm gap-5">
          {!isReadOnly && (
            <button
              type="submit"
              form="article-form"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 w-full font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md px-4 py-2 text-sm bg-white border-2"
              style={{ borderColor: colors.primary.navy.DEFAULT, color: colors.primary.navy.DEFAULT }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.navy.DEFAULT;
                e.currentTarget.style.color = colors.neutral.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.neutral.white;
                e.currentTarget.style.color = colors.primary.navy.DEFAULT;
              }}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              )}
              {isLoading ? "Đang lưu..." : initialData ? "Lưu thay đổi" : "Lưu nháp"}
            </button>
          )}

          {!isReadOnly && status === "draft" && initialData?.id && isAuthor && (
            <Button type="button" variant="primary" size="sm" className="w-full justify-center" onClick={handleSubmitForReview} disabled={isLoading}>
              Gửi duyệt
            </Button>
          )}

          {!isReadOnly && status === "pending" && canPublishScope && (
            <Button type="button" variant="primary" size="sm" className="w-full justify-center" onClick={handlePublish} disabled={isLoading}>
              Duyệt bài
            </Button>
          )}

          {!isReadOnly && status === "pending" && canPublishScope && (
            <Button type="button" variant="outline" size="sm" className="w-full justify-center bg-white" onClick={handleReject} disabled={isLoading}>
              Từ chối duyệt
            </Button>
          )}

          {isReadOnly && status === "published" && canPublishScope && (
            <Button type="button" variant="outline" size="sm" className="w-full justify-center bg-white" onClick={handleRevoke} disabled={isLoading}>
              Hủy duyệt
            </Button>
          )}

          {initialData?.id && (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowHistory(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-purple-600 bg-white px-4 py-2 text-sm font-medium text-purple-600 transition-all duration-200 hover:bg-purple-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              <History size={15} />
              Lịch sử
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              const article = buildPreviewArticle();
              if (!article) {
                setPopup({
                  show: true,
                  type: "error",
                  message: "Vui lòng chọn danh mục trước khi xem trước.",
                });
                return;
              }
              setShowPreview(true);
            }}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Eye size={16} />
            Xem trước
          </button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full justify-center bg-white"
            onClick={handleCancelRequest}
            disabled={isLoading}
          >
            {isReadOnly ? "Đóng" : "Huỷ"}
          </Button>
        </div>
      </div>

      <NewsPreviewDialog
        article={buildPreviewArticle()}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}
