"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { X, Loader2, History, Eye } from "lucide-react";
import { newsApi } from "@/api/domains/news";
import { accountsApi } from "@/api/domains/accounts";
import { mediaApi } from "@/api/domains/media";
import { createArticleSchema } from "@/schemas/news.schema";
import { NEWS_FAQ_MIN_ITEMS, NEWS_FAQ_MAX_ITEMS, validateNewsFaqs } from "@/lib/news";
import { extractApiError, showFieldError } from "@/lib/api-errors";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { SelectField } from "@/components/ui/admin/SelectField";
import { ReviewerNotifySelect } from "@/components/ui/admin/ReviewerNotifySelect";
import { ImageUploadField } from "@/components/ui/admin/ImageUploadField";
import { ArticleHistoryDialog } from "./ArticleHistoryDialog";
import { NewsPreviewDialog } from "./NewsPreviewDialog";
import { ImageGridModal } from "@/components/shared/ImageGridModal";
import type { ImageGridItem, ImageGridVariant } from "@/components/shared/image-grid-layout";
import { ImageCarouselModal } from "@/components/shared/ImageCarouselModal";
import type { ImageCarouselItem } from "@/components/shared/image-carousel-layout";
import { buildImageCarouselHtml } from "@/components/shared/image-carousel-layout";
import { useAuth } from "@/contexts/AuthContext";
import { getNewsScopeBySlug } from "@/lib/permissions";
import { compressAndUploadImage } from "@/lib/uploadImage";
import { processContentImages } from "@/lib/contentImages";
import { COUNTRY_OPTIONS } from "@/lib/country";
import { newsStatusConfig } from "@/lib/news/status";
import type { NewsCategory, NewsArticle, NewsFaqInput, AccountReviewer } from "@/types/api";



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
  onSave: (article?: NewsArticle) => void;
  onCancel: () => void;
}

type ImageGridModalState = {
  isOpen: boolean;
  mode: "insert" | "edit";
  layoutId?: string;
  count?: number;
  variant?: ImageGridVariant;
  images: ImageGridItem[];
  insertHtml?: (html: string) => void;
  replaceHtml?: (layoutId: string, html: string) => void;
};

type ImageCarouselModalState = {
  isOpen: boolean;
  mode: "insert" | "edit";
  carouselId?: string;
  items: ImageCarouselItem[];
  insertHtml?: (html: string) => void;
  replaceHtml?: (carouselId: string, html: string) => void;
};

function toSlug(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
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
  displayPublishedAt: string;
  isFeatured: boolean;
  countryCode: string;
  faqs: NewsFaqInput[];
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
      displayPublishedAt: "",
      isFeatured: false,
      countryCode: "",
      faqs: Array.from({ length: NEWS_FAQ_MIN_ITEMS }, () => ({ question: "", answer: "" })),
    };
  }
  const faqs = (article.faqs ?? [])
    .slice(0, NEWS_FAQ_MAX_ITEMS)
    .map(({ question, answer }) => ({ question, answer }));
  while (faqs.length < NEWS_FAQ_MIN_ITEMS) {
    faqs.push({ question: "", answer: "" });
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
    isIndexed: article.isIndexed ?? false,
    canonicalUrl: article.canonicalUrl ?? "",
    displayPublishedAt: article.displayPublishedAt
      ? new Date(article.displayPublishedAt).toISOString().split("T")[0]
      : "",
    isFeatured: article.isFeatured,
    countryCode: article.countryCode ?? "",
    faqs,
  };
}

export function NewsManageForm({ initialData, readOnly = false, onSave, onCancel }: Props) {
  const { hasPermission, account } = useAuth();
  const authorName = initialData?.author?.name ?? account?.name ?? "—";
  const [form, setForm] = useState<FormState>(() => articleToFormState(initialData));

  const isSuperAdmin = hasPermission("system.super_admin");
  const isAuthor = initialData
    ? account?.id === initialData.authorId || isSuperAdmin
    : false;
  const status = initialData?.status ?? "draft";

  const statusConfig = newsStatusConfig;

  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.featuredImage?.url || "");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string>(initialData?.pdfMedia?.url || "");
  const [categories, setCategories] = useState<NewsCategory[]>([]);

  const articleCategory = initialData
    ? initialData.category ?? categories.find((c) => c.id === initialData.categoryId)
    : null;
  const articleScope = articleCategory ? getNewsScopeBySlug(articleCategory.slug) : null;
  const canPublishScope =
    isSuperAdmin ||
    hasPermission("news.articles.all.publish") ||
    (articleScope && hasPermission(`news.articles.${articleScope}.publish`));
  const isReadOnly =
    readOnly ||
    status === "published" ||
    (status === "pending" && !canPublishScope && !!initialData?.id) ||
    (status === "draft" && !!initialData?.id && !isAuthor);

  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    { type: "save" } | { type: "submit" } | { type: "publish" } | { type: "unsaved_changes" } | { type: "reject" } | { type: "revoke" } | null
  >(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [imageGridModal, setImageGridModal] = useState<ImageGridModalState>({
    isOpen: false,
    mode: "insert",
    images: [],
  });
  const [imageCarouselModal, setImageCarouselModal] = useState<ImageCarouselModalState>({
    isOpen: false,
    mode: "insert",
    items: [],
  });
  const [showNetworkError, setShowNetworkError] = useState(false);
  const [newsReviewers, setNewsReviewers] = useState<AccountReviewer[]>([]);
  const [notifyAccountId, setNotifyAccountId] = useState("");

  const initialForm = useMemo(() => articleToFormState(initialData), [initialData]);
  const initialImagePreview = initialData?.featuredImage?.url || "";
  const initialPdfPreview = initialData?.pdfMedia?.url || "";

  const [isEditingFaqs, setIsEditingFaqs] = useState(!initialData);
  const [isSavingFaqs, setIsSavingFaqs] = useState(false);
  const [isFaqDirty, setIsFaqDirty] = useState(false);

  const canEditFaqs =
    !isReadOnly &&
    (isSuperAdmin ||
      hasPermission("news.articles.all.update") ||
      (articleScope && hasPermission(`news.articles.${articleScope}.update`)));

  const isArticleDirty = useMemo(() => {
    const { faqs: _formFaqs, ...restForm } = form;
    const { faqs: _initialFaqs, ...restInitial } = initialForm;
    return (
      JSON.stringify(restForm) !== JSON.stringify(restInitial) ||
      imagePreview !== initialImagePreview ||
      featuredImageFile !== null ||
      pdfPreviewUrl !== initialPdfPreview ||
      pdfFile !== null
    );
  }, [form, initialForm, imagePreview, initialImagePreview, featuredImageFile, pdfPreviewUrl, initialPdfPreview, pdfFile]);

  const isDirty = useMemo(() => {
    if (!initialData) {
      return (
        JSON.stringify(form) !== JSON.stringify(initialForm) ||
        imagePreview !== initialImagePreview ||
        featuredImageFile !== null ||
        pdfPreviewUrl !== initialPdfPreview ||
        pdfFile !== null
      );
    }
    return isArticleDirty || isFaqDirty;
  }, [initialData, form, initialForm, imagePreview, initialImagePreview, featuredImageFile, pdfPreviewUrl, initialPdfPreview, pdfFile, isArticleDirty, isFaqDirty]);

  useEffect(() => {
    queueMicrotask(() => {
      setForm(articleToFormState(initialData));
      setImagePreview(initialData?.featuredImage?.url || "");
      setFeaturedImageFile(null);
      setPdfFile(null);
      setPdfPreviewUrl(initialData?.pdfMedia?.url || "");
      setIsEditingFaqs(!initialData);
      setIsFaqDirty(false);
    });
  }, [initialData]);

  useEffect(() => {
    newsApi
      .getCategories()
      .then(setCategories)
      .catch((err) => {
        const { message, isNetworkError } = extractApiError(err);
        if (isNetworkError) {
          setShowNetworkError(true);
        } else {
          setPopup({ show: true, type: "error", message: `Không thể tải danh mục: ${message}` });
        }
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    accountsApi
      .getNewsReviewers()
      .then(setNewsReviewers)
      .catch(() => setNewsReviewers([]));
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && (!prev.slug || prev.slug === toSlug(prev.title))) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
  };

  const openImageGridModal = (
    options: Omit<ImageGridModalState, "isOpen" | "images"> & { images?: ImageGridItem[] }
  ) => {
    setImageGridModal({ ...options, images: options.images ?? [], isOpen: true });
  };

  const closeImageGridModal = () => {
    setImageGridModal({
      isOpen: false,
      mode: "insert",
      images: [],
    });
  };

  const saveImageGrid = (html: string, layoutId: string) => {
    if (imageGridModal.mode === "edit" && imageGridModal.layoutId && imageGridModal.replaceHtml) {
      imageGridModal.replaceHtml(imageGridModal.layoutId, html);
      return;
    }

    if (imageGridModal.insertHtml) {
      imageGridModal.insertHtml(html);
      return;
    }

    update("content", `${form.content || ""}\n${html}`);
  };

  const openImageCarouselModal = (
    options: Omit<ImageCarouselModalState, "isOpen" | "items"> & { items?: ImageCarouselItem[] }
  ) => {
    setImageCarouselModal({ ...options, items: options.items ?? [], isOpen: true });
  };

  const closeImageCarouselModal = () => {
    setImageCarouselModal({
      isOpen: false,
      mode: "insert",
      items: [],
    });
  };

  const saveImageCarousel = (items: ImageCarouselItem[]) => {
    const html = buildImageCarouselHtml(items, imageCarouselModal.carouselId);

    if (imageCarouselModal.mode === "edit" && imageCarouselModal.carouselId && imageCarouselModal.replaceHtml) {
      imageCarouselModal.replaceHtml(imageCarouselModal.carouselId, html);
      closeImageCarouselModal();
      return;
    }

    if (imageCarouselModal.insertHtml) {
      imageCarouselModal.insertHtml(html);
      closeImageCarouselModal();
      return;
    }

    update("content", `${form.content || ""}\n${html}`);
    closeImageCarouselModal();
  };

  const updateFaqs = (faqs: NewsFaqInput[]) => {
    setForm((prev) => ({ ...prev, faqs }));
    if (initialData) {
      setIsFaqDirty(JSON.stringify(faqs) !== JSON.stringify(initialForm.faqs));
    }
    if (fieldErrors.faqs) {
      setFieldErrors((prev) => ({ ...prev, faqs: "" }));
    }
  };

  const handleApiError = (err: unknown) => {
    const { field, message, isNetworkError } = extractApiError(err);
    if (field) {
      showFieldError(field, message, setFieldErrors);
      return;
    }
    if (isNetworkError) {
      setShowNetworkError(true);
      return;
    }
    setPopup({ show: true, type: "error", message });
  };

  const buildPreviewArticle = (): NewsArticle | null => {
    const category = categories.find((c) => c.id === form.categoryId);
    if (!category) return null;

    const base = initialData;
    const featuredImage = imagePreview
      ? ({ id: "preview", url: imagePreview, storageKey: "preview", filename: "preview", folder: "news" } as const)
      : base?.featuredImage ?? null;
    const pdfMedia = isPressReleaseCategory && pdfPreviewUrl
      ? ({
          id: "preview-pdf",
          url: pdfPreviewUrl,
          storageKey: "preview-pdf",
          filename: pdfFile?.name || base?.pdfMedia?.filename || "attachment.pdf",
          mimeType: "application/pdf",
          folder: "news",
        } as const)
      : null;

    return {
      ...(base ?? ({} as NewsArticle)),
      id: base?.id ?? "preview",
      title: form.title,
      slug: form.slug,
      summary: null,
      content: form.content,
      source: form.source || null,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
      isIndexed: form.isIndexed,
      canonicalUrl: form.canonicalUrl || null,
      displayPublishedAt: form.displayPublishedAt
        ? new Date(form.displayPublishedAt).toISOString()
        : undefined,
      isFeatured: form.isFeatured,
      faqs: form.faqs as NewsArticle["faqs"],
      countryCode: form.countryCode || null,
      categoryId: form.categoryId,
      category,
      featuredImage,
      pdfMedia,
      pdfMediaId: isPressReleaseCategory && pdfPreviewUrl ? base?.pdfMediaId ?? "preview-pdf" : null,
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

  const selectedCategory = categories.find((c) => c.id === form.categoryId);
  const isEraNewsCategory = selectedCategory?.slug === "era-news";
  const isPressReleaseCategory = selectedCategory?.slug === "thong-cao-bao-chi";

  useEffect(() => {
    if (!isEraNewsCategory && form.countryCode) {
      queueMicrotask(() => update("countryCode", ""));
    }
  }, [isEraNewsCategory, form.countryCode]);

  useEffect(() => {
    if (!selectedCategory) return;
    if (!isPressReleaseCategory && (pdfFile || pdfPreviewUrl)) {
      queueMicrotask(() => {
        setPdfFile(null);
        setPdfPreviewUrl("");
      });
    }
  }, [isPressReleaseCategory, pdfFile, pdfPreviewUrl, selectedCategory]);

  const handleImageSelect = (file: File) => {
    setFeaturedImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setFeaturedImageFile(null);
    setImagePreview("");
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setPopup({
        show: true,
        type: "error",
        message: "File tải lên phải là PDF.",
      });
      e.target.value = "";
      return;
    }
    setPdfFile(file);
    setPdfPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfPreviewUrl("");
  };

  const handleCancelRequest = () => {
    if (isDirty || isFaqDirty) {
      setShowCancelConfirm(true);
    } else {
      onCancel();
    }
  };

  const handleSaveFaqs = async () => {
    if (!initialData?.id || !canEditFaqs) return;

    const faqError = validateNewsFaqs(form.faqs);
    if (faqError) {
      setFieldErrors((prev) => ({ ...prev, faqs: faqError }));
      return;
    }

    setIsSavingFaqs(true);
    try {
      const article = await newsApi.updateArticleFaqs(
        initialData.id,
        form.faqs.map((faq) => ({
          question: faq.question.trim(),
          answer: faq.answer.trim(),
        }))
      );
      setForm((prev) => ({
        ...prev,
        faqs: (article.faqs ?? prev.faqs).map(({ question, answer }) => ({ question, answer })),
      }));
      setFieldErrors((prev) => ({ ...prev, faqs: "" }));
      setIsEditingFaqs(false);
      setIsFaqDirty(false);
      setPopup({ show: true, type: "success", message: "Cập nhật câu hỏi thường gặp thành công!" });
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSavingFaqs(false);
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelConfirm(false);
    onCancel();
  };

  const handleSubmitForReview = async () => {
    if (!initialData?.id) return;
    if (isFaqDirty) {
      setPopup({ show: true, type: "error", message: "Vui lòng lưu câu hỏi thường gặp trước khi gửi duyệt." });
      return;
    }
    if (isDirty) {
      setPendingAction({ type: "unsaved_changes" });
      return;
    }
    if (!pendingAction || pendingAction.type !== "submit") {
      setNotifyAccountId("");
      setPendingAction({ type: "submit" });
      return;
    }
    setPendingAction(null);
    setPopup((prev) => ({ ...prev, show: false }));
    setIsLoading(true);
    try {
      const saved = await newsApi.updateArticle(initialData.id, {
        status: "pending",
        notifyAccountId: notifyAccountId || null,
      });
      setPopup({ show: true, type: "success", message: "Đã gửi bài viết đi duyệt!" });
      onSave(saved);
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!initialData?.id) return;
    if (isFaqDirty) {
      setPopup({ show: true, type: "error", message: "Vui lòng lưu câu hỏi thường gặp trước khi duyệt." });
      return;
    }
    if (isDirty) {
      setPendingAction({ type: "unsaved_changes" });
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
      const saved = await newsApi.publishArticle(initialData.id);
      setPopup({ show: true, type: "success", message: "Duyệt bài viết thành công!" });
      onSave(saved);
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevoke = async () => {
    if (!initialData?.id) return;
    if (isFaqDirty) {
      setPopup({ show: true, type: "error", message: "Vui lòng lưu câu hỏi thường gặp trước khi hủy duyệt." });
      return;
    }
    if (isDirty) {
      setPendingAction({ type: "unsaved_changes" });
      return;
    }
    if (!pendingAction || pendingAction.type !== "revoke") {
      setPendingAction({ type: "revoke" });
      return;
    }
    setPendingAction(null);
    setPopup((prev) => ({ ...prev, show: false }));
    setIsLoading(true);
    try {
      const saved = await newsApi.revokeArticle(initialData.id);
      setPopup({ show: true, type: "success", message: "Đã hủy duyệt bài viết!" });
      onSave(saved);
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!initialData?.id) return;
    if (isFaqDirty) {
      setPopup({ show: true, type: "error", message: "Vui lòng lưu câu hỏi thường gặp trước khi từ chối duyệt." });
      return;
    }
    if (isDirty) {
      setPendingAction({ type: "unsaved_changes" });
      return;
    }
    if (!pendingAction || pendingAction.type !== "reject") {
      setPendingAction({ type: "reject" });
      return;
    }
    setPendingAction(null);
    setPopup((prev) => ({ ...prev, show: false }));
    setIsLoading(true);
    try {
      const saved = await newsApi.updateArticle(initialData.id, { status: "draft" });
      setPopup({ show: true, type: "success", message: "Đã từ chối duyệt bài viết!" });
      onSave(saved);
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPopup((prev) => ({ ...prev, show: false }));
    setFieldErrors({});

    if (initialData?.id && isFaqDirty) {
      setPopup({ show: true, type: "error", message: "Vui lòng lưu câu hỏi thường gặp trước khi lưu thay đổi bài viết." });
      return;
    }

    const validationSchema = initialData?.id
      ? createArticleSchema.omit({ faqs: true })
      : createArticleSchema;
    const validation = validationSchema.safeParse({
      ...form,
      author: undefined,
      countryCode: form.countryCode || undefined,
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
      let pdfMediaId: string | undefined | null;

      if (featuredImageFile) {
        const upload = await compressAndUploadImage(featuredImageFile, "news", {
          maxSizeMB: 1.5,
          maxWidthOrHeight: 1920,
        });
        featuredImageMediaId = upload.id;
      } else if (!imagePreview && initialData?.featuredImageMediaId) {
        featuredImageMediaId = null;
      } else if (initialData?.featuredImageMediaId) {
        featuredImageMediaId = initialData.featuredImageMediaId;
      }

      if (isPressReleaseCategory) {
        if (pdfFile) {
          const upload = await mediaApi.uploadFile(pdfFile, "news");
          pdfMediaId = upload.id;
        } else if (!pdfPreviewUrl && initialData?.pdfMediaId) {
          pdfMediaId = null;
        } else if (initialData?.pdfMediaId) {
          pdfMediaId = initialData.pdfMediaId;
        }
      } else if (initialData?.pdfMediaId || pdfPreviewUrl || pdfFile) {
        pdfMediaId = null;
      }

      const processedContent = await processContentImages(form.content, "news");

      const payload = {
        title: form.title,
        slug: form.slug,
        summary: null,
        content: processedContent,
        categoryId: form.categoryId,
        featuredImageMediaId,
        pdfMediaId,
        source: form.source || undefined,
        metaTitle: form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        isIndexed: form.isIndexed,
        canonicalUrl: form.canonicalUrl || null,
        displayPublishedAt: form.displayPublishedAt
          ? new Date(form.displayPublishedAt).toISOString()
          : undefined,
        isFeatured: form.isFeatured,
        countryCode: form.countryCode || undefined,
      };

      const saved = initialData?.id
        ? await newsApi.updateArticle(initialData.id, payload)
        : await newsApi.createArticle({
            ...payload,
            faqs: form.faqs.map((faq) => ({
              question: faq.question.trim(),
              answer: faq.answer.trim(),
            })),
          });

      setPopup({
        show: true,
        type: "success",
        message: initialData?.id ? "Cập nhật bài viết thành công!" : "Tạo bài viết thành công!",
      });

      onSave(saved);
    } catch (err) {
      handleApiError(err);
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

        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose
            autoCloseMs={1000}
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
              : pendingAction?.type === "unsaved_changes"
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
              : pendingAction?.type === "unsaved_changes"
              ? "Bạn có thay đổi chưa lưu. Vui lòng lưu trước khi thực hiện thao tác này."
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
              : pendingAction?.type === "unsaved_changes"
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
            } else if (pendingAction?.type === "unsaved_changes") {
              setPendingAction(null);
            } else if (pendingAction?.type === "reject") {
              handleReject();
            } else if (pendingAction?.type === "revoke") {
              handleRevoke();
            }
          }}
          onCancel={() => setPendingAction(null)}
        >
          {pendingAction?.type === "submit" && (
            <ReviewerNotifySelect
              value={notifyAccountId}
              reviewers={newsReviewers}
              onChange={setNotifyAccountId}
            />
          )}
        </ConfirmDialog>

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
                <SelectField
                  value={form.categoryId}
                  onChange={(value) => update("categoryId", value)}
                  placeholder="Chọn danh mục"
                  disabled={isReadOnly}
                  options={allowedCategories.map((cat) => ({ value: cat.id, label: cat.name }))}
                />
                {fieldErrors.categoryId && <p className="mt-1 text-xs text-red-500">{fieldErrors.categoryId}</p>}
              </div>
            </div>

            {/* Country (ERA News only) */}
            {isEraNewsCategory && (
              <div id="field-countryCode" className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quốc gia
                </label>
                <SelectField
                  value={form.countryCode}
                  onChange={(value) => update("countryCode", value)}
                  placeholder="Chọn quốc gia"
                  disabled={isReadOnly}
                  options={COUNTRY_OPTIONS.map((c) => ({ value: c.value, label: `${c.flag} ${c.label}` }))}
                />
              </div>
            )}

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

            {/* Display published date */}
            <div id="field-displayPublishedAt">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ngày đăng hiển thị
              </label>
              <input
                type="date"
                value={form.displayPublishedAt}
                onChange={(e) => update("displayPublishedAt", e.target.value)}
                disabled={isReadOnly}
                className={inputBaseClass}
              />
              <p className="mt-1 text-xs text-gray-500">
                Ngày hiển thị trên trang công khai. Để trống sẽ dùng ngày xuất bản hoặc ngày tạo.
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
            <ImageUploadField
              id="field-featuredImageMediaId"
              error={fieldErrors.featuredImageMediaId}
              preview={imagePreview}
              onFileSelect={handleImageSelect}
              onClear={isReadOnly ? undefined : handleRemoveImage}
              isReadOnly={isReadOnly}
              previewMaxWidth={200}
              dropzoneSize="sm"
              emptyReadOnlyText="Không có ảnh đại diện"
            />

            {/* Content */}
            <div id="field-content">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nội dung chi tiết <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <div className={`rounded-lg border overflow-hidden transition-colors ${fieldErrors.content ? "border-red-300 focus-within:border-red-400" : "border-gray-200 focus-within:border-gray-400"}`}>
                <RichEditor
                  value={form.content}
                  onChange={(val) => update("content", val)}
                  disabled={isReadOnly}
                  onOpenImageGrid={openImageGridModal}
                  onOpenImageCarousel={openImageCarouselModal}
                />
              </div>
              {fieldErrors.content && <p className="mt-1 text-xs text-red-500">{fieldErrors.content}</p>}
            </div>

            {/* FAQs */}
            <div id="field-faqs">
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Câu hỏi thường gặp
                </label>
                <div className="flex items-center gap-3">
                  {initialData?.id && canEditFaqs && !isEditingFaqs && (
                    <button
                      type="button"
                      onClick={() => setIsEditingFaqs(true)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Chỉnh sửa
                    </button>
                  )}
                  {initialData?.id && canEditFaqs && isEditingFaqs && (
                    <button
                      type="button"
                      onClick={handleSaveFaqs}
                      disabled={!isFaqDirty || isSavingFaqs}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isSavingFaqs && <Loader2 size={14} className="animate-spin" />}
                      Lưu
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                {form.faqs.map((item, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/40 p-4">
                    <div className="mb-3 flex items-start gap-2">
                      <div className="flex-1">
                        <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                          Câu hỏi {i + 1}
                        </label>
                        <input
                          type="text"
                          className={`${inputBaseClass} ${fieldErrors.faqs ? errorInputClass : ""}`}
                          value={item.question}
                          onChange={(e) => {
                            const next = [...form.faqs];
                            next[i] = { ...next[i], question: e.target.value };
                            updateFaqs(next);
                          }}
                          disabled={isReadOnly || isSavingFaqs || (!!initialData?.id && !isEditingFaqs)}
                          placeholder="Nhập câu hỏi"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const next = form.faqs.filter((_, idx) => idx !== i);
                          updateFaqs(next);
                        }}
                        disabled={isReadOnly || isSavingFaqs || (!!initialData?.id && !isEditingFaqs) || form.faqs.length <= NEWS_FAQ_MIN_ITEMS}
                        className="mt-6 shrink-0 rounded-lg border border-gray-200 bg-white p-2 text-gray-400 transition-colors hover:border-red-200 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Xóa câu hỏi ${i + 1}`}
                      >
                        <span className="text-lg leading-none">−</span>
                      </button>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-gray-500">
                        Câu trả lờ {i + 1}
                      </label>
                      <div className={`overflow-hidden rounded-lg border bg-white ${fieldErrors.faqs ? "border-red-300" : "border-gray-200"}`}>
                        <RichEditor
                          value={item.answer}
                          onChange={(value) => {
                            const next = [...form.faqs];
                            next[i] = { ...next[i], answer: value };
                            updateFaqs(next);
                          }}
                          disabled={isReadOnly || isSavingFaqs || (!!initialData?.id && !isEditingFaqs)}
                          disableImage
                          compact
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateFaqs([...form.faqs, { question: "", answer: "" }])}
                  disabled={isReadOnly || isSavingFaqs || (!!initialData?.id && !isEditingFaqs) || form.faqs.length >= NEWS_FAQ_MAX_ITEMS}
                  className="flex items-center gap-1.5 text-sm font-medium rounded-lg border border-dashed border-gray-300 px-4 py-2 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
                >
                  <span className="text-lg leading-none">+</span> Thêm câu hỏi
                </button>
                <p className="text-xs text-gray-400">
                  Tối thiểu {NEWS_FAQ_MIN_ITEMS} và tối đa {NEWS_FAQ_MAX_ITEMS} câu hỏi.
                </p>
                {fieldErrors.faqs && <p className="mt-1 text-xs text-red-500">{fieldErrors.faqs}</p>}
              </div>
            </div>

            {isPressReleaseCategory && (
              <div id="field-pdfMediaId">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  File PDF đính kèm
                </label>
                {fieldErrors.pdfMediaId && (
                  <p className="mb-2 text-xs text-red-500">{fieldErrors.pdfMediaId}</p>
                )}
                {pdfPreviewUrl && (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <div className="min-w-0 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#C8102E] shadow-sm">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M9 11h6" />
                          <path d="M9 15h6" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {pdfFile?.name || "attachment.pdf"}
                        </p>
                        <p className="text-xs text-gray-500">File PDF sẽ hiển thị ở cuối bài viết</p>
                      </div>
                    </div>
                    {!isReadOnly && (
                      <button
                        type="button"
                        onClick={handleRemovePdf}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-red-300 hover:text-red-600"
                      >
                        Xoá file
                      </button>
                    )}
                  </div>
                )}

                {!isReadOnly && (
                  <label className="mt-3 flex flex-col items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="text-sm text-gray-500">
                      Kéo thả file PDF vào đây hoặc{" "}
                      <span className="font-semibold" style={{ color: colors.primary.DEFAULT }}>chọn file</span>
                    </span>
                    <span className="text-xs text-gray-400">Chỉ hỗ trợ PDF, tối đa 1 file</span>
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="sr-only"
                      onChange={handlePdfChange}
                      disabled={isReadOnly}
                    />
                  </label>
                )}
              </div>
            )}
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
                  disabled={isLoading || !isDirty}
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
              disabled={isLoading || !isDirty}
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
      <ImageGridModal
        isOpen={imageGridModal.isOpen}
        initialImages={imageGridModal.images}
        initialLayoutId={imageGridModal.layoutId}
        initialCount={imageGridModal.count}
        initialVariant={imageGridModal.variant}
        onClose={closeImageGridModal}
        onSave={saveImageGrid}
      />
      <ImageCarouselModal
        isOpen={imageCarouselModal.isOpen}
        initialItems={imageCarouselModal.items}
        onClose={closeImageCarouselModal}
        onSave={saveImageCarousel}
      />

    </div>
  );
}
