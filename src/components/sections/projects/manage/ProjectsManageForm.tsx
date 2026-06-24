"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { X, Loader2, Eye, History } from "lucide-react";
import { mediaApi } from "@/api/domains/media";
import { projectsApi } from "@/api/domains/projects";
import { compressImage } from "@/lib/imageCompression";
import { createProjectSchema } from "@/schemas/projects.schema";
import { getErrorMessage } from "@/lib/error-messages";
import { useAuth } from "@/contexts/AuthContext";
import type { Media, Project, ProjectType, ProjectStatus, ProjectPublicationStatus } from "@/types/api";
import { ProjectPreviewDialog } from "./ProjectPreviewDialog";
import { ProjectHistoryDialog } from "./ProjectHistoryDialog";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PopupNotification } from "@/components/ui/PopupNotification";

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

export type { ProjectType, ProjectStatus };

export interface ProjectFormData {
  id?: string;
  name: string;
  projectName: string;
  slug: string;
  type: ProjectType;
  status: ProjectStatus;
  location: string;
  imageMediaId?: string | null;
  imageMedia?: Media | null;
  investor: string;
  ownership: string;
  area: string;
  density: string;
  scale: string;
  startYear: string;
  progress: string;
  content: string;
  isIndexed: boolean;
  canonicalUrl: string;
  publicationStatus: ProjectPublicationStatus;
}

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

function base64ToFile(base64: string, baseFilename: string): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const ext = mime.split("/")[1] || "png";
  const filename = `${baseFilename}.${ext}`;
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

  await Promise.all(
    images.map(async (img, i) => {
      const base64 = img.getAttribute("src")!;
      const file = base64ToFile(base64, `project-content-img-${Date.now()}-${i}`);

      // Ảnh GIF giữ nguyên để không mất animation; các ảnh khác nén về WebP
      const isGif = file.type === "image/gif";
      const compressedFile = isGif
        ? file
        : await compressImage(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1600,
            fileType: "image/webp",
          });

      const upload = await mediaApi.uploadImage(compressedFile, "projects");
      img.setAttribute("src", upload.url);
    })
  );

  return doc.body.innerHTML;
}

const TYPE_OPTIONS: { value: ProjectType; label: string }[] = [
  { value: "apartment", label: "Căn hộ" },
  { value: "townhouse", label: "Nhà phố" },
  { value: "villa", label: "Biệt thự" },
  { value: "land", label: "Đất nền" },
];

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: "new", label: "Dự án mới" },
  { value: "booking", label: "Nhận booking" },
  { value: "selling", label: "Đang mở bán" },
  { value: "upcoming", label: "Sắp mở bán" },
  { value: "handed_over", label: "Đã bàn giao" },
];

function ImageUploadField({
  preview,
  isUploading,
  isReadOnly,
  disabled,
  onChange,
  onClear,
}: {
  preview?: string;
  isUploading?: boolean;
  isReadOnly?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const syntheticEvent = {
        target: { files: e.dataTransfer.files },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5 text-gray-700">
        Ảnh đại diện
      </label>

      {preview ? (
        <div className="relative inline-block rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-[320px] h-auto object-cover"
          />
          <button
            type="button"
            onClick={onClear}
            disabled={isReadOnly}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Xoá ảnh"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-2 w-full h-40 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
            isDragging
              ? "border-red-400 bg-red-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 size={24} className="animate-spin text-gray-400" />
              <span className="text-sm text-gray-500">Đang tải ảnh lên...</span>
            </>
          ) : (
            <>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-gray-400"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="text-sm text-gray-500">
                Kéo thả ảnh vào đây hoặc{" "}
                <span className="font-semibold" style={{ color: colors.primary.DEFAULT }}>
                  chọn file
                </span>
              </span>
              <span className="text-xs text-gray-400">Hỗ trợ: JPG, PNG, WEBP</span>
            </>
          )}
          {!isReadOnly && (
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onChange}
              disabled={isUploading || disabled}
            />
          )}
        </label>
      )}
    </div>
  );
}

interface Props {
  initialData?: ProjectFormData;
  onSave: (data: ProjectFormData) => void;
  onActionDone?: (project?: Project) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ProjectsManageForm({
  initialData,
  onSave,
  onActionDone,
  onCancel,
  loading,
}: Props) {
  const [form, setForm] = useState<ProjectFormData>(
    initialData ?? {
      name: "",
      projectName: "",
      slug: "",
      type: "apartment",
      status: "new",
      location: "",
      imageMediaId: null,
      investor: "",
      ownership: "Sổ hồng lâu dài",
      area: "",
      density: "",
      scale: "",
      startYear: "",
      progress: "Đang xây dựng",
      content: "",
      isIndexed: false,
      canonicalUrl: "",
      publicationStatus: "draft",
    }
  );
  const [imagePreview, setImagePreview] = useState<string | undefined>(initialData?.imageMedia?.url ?? undefined);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isProcessingContent, setIsProcessingContent] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [isDirty, setIsDirty] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    | null
    | { type: "save" }
    | { type: "submit" }
    | { type: "publish" }
    | { type: "reject" }
    | { type: "revoke" }
    | { type: "unsaved_changes"; callback?: () => void }
  >(null);
  const [locationInput, setLocationInput] = useState(initialData?.location ?? "");

  const { hasPermission } = useAuth();
  const isReadOnly = form.publicationStatus === "published";
  const canPublish = hasPermission("system.super_admin") || hasPermission("projects.all.publish");

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setImagePreview(initialData.imageMedia?.url ?? undefined);
      setImageFile(null);
      setLocationInput(initialData.location);
    }
    setIsDirty(false);
    setPendingAction(null);
  }, [initialData]);

  const update = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && (!prev.slug || prev.slug === toSlug(prev.name))) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: "" }));
    }
    setIsDirty(true);
  };

  const clearLocationError = () => {
    if (fieldErrors.location) {
      setFieldErrors((prev) => ({ ...prev, location: "" }));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setIsDirty(true);
  };

  const handleClearImage = () => {
    setImagePreview(undefined);
    setImageFile(null);
    update("imageMediaId", null);
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullLocation = locationInput.trim();

    const validation = createProjectSchema.safeParse({
      ...form,
      location: fullLocation,
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
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          const focusable = element.querySelector("input, textarea, select, [contenteditable='true']") as HTMLElement | null;
          if (focusable) focusable.focus();
        }
      }
      return;
    }

    setFieldErrors({});

    if (initialData?.id && (!pendingAction || pendingAction.type !== "save")) {
      setPendingAction({ type: "save" });
      return;
    }
    setPendingAction(null);

    let imageMediaId: string | null | undefined = form.imageMediaId;

    if (imageFile) {
      setIsUploadingImage(true);
      try {
        const upload = await mediaApi.uploadImage(imageFile, "projects");
        imageMediaId = upload.id;
      } finally {
        setIsUploadingImage(false);
      }
    } else if (!imagePreview && initialData?.imageMediaId) {
      imageMediaId = null;
    }

    setIsProcessingContent(true);
    try {
      const processedContent = await processContentImages(form.content);
      onSave({ ...form, location: fullLocation, imageMediaId, content: processedContent });
    } finally {
      setIsProcessingContent(false);
    }
  };

  const getApiErrorMessage = (err: unknown, fallback: string) => {
    const error = err as { status?: string; data?: unknown; message?: string };
    return getErrorMessage(error?.status, error?.data, error?.message || fallback);
  };

  const showPopup = (type: "success" | "error", message: string) => {
    setPopup({ show: true, type, message });
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

  const runWorkflowAction = async (
    action: () => Promise<Project>,
    successMessage: string,
    errorMessage: string,
    actionType: "submit" | "publish" | "reject" | "revoke"
  ) => {
    if (!initialData?.id) return;
    if (isDirty) {
      setPendingAction({ type: "unsaved_changes", callback: () => runWorkflowAction(action, successMessage, errorMessage, actionType) });
      return;
    }
    if (!pendingAction || pendingAction.type !== actionType) {
      setPendingAction({ type: actionType });
      return;
    }
    setPendingAction(null);
    setIsProcessing(true);
    try {
      const project = await action();
      showPopup("success", successMessage);
      onActionDone?.(project);
    } catch (err) {
      showPopup("error", getApiErrorMessage(err, errorMessage));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitForReview = () => {
    const id = initialData?.id;
    if (!id) return;
    runWorkflowAction(
      () => projectsApi.submitProjectForReview(id),
      "Đã gửi dự án đi duyệt!",
      "Gửi duyệt thất bại.",
      "submit"
    );
  };

  const handlePublish = () => {
    const id = initialData?.id;
    if (!id) return;
    runWorkflowAction(
      () => projectsApi.publishProject(id),
      "Duyệt dự án thành công!",
      "Duyệt dự án thất bại.",
      "publish"
    );
  };

  const handleReject = () => {
    const id = initialData?.id;
    if (!id) return;
    runWorkflowAction(
      () => projectsApi.rejectProject(id),
      "Đã từ chối duyệt dự án!",
      "Từ chối duyệt thất bại.",
      "reject"
    );
  };

  const handleRevoke = () => {
    const id = initialData?.id;
    if (!id) return;
    runWorkflowAction(
      () => projectsApi.revokeProject(id),
      "Đã hủy duyệt dự án!",
      "Hủy duyệt thất bại.",
      "revoke"
    );
  };

  const baseInputClass =
    "w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors";
  const normalInputClass = `${baseInputClass} border-gray-200 focus:border-gray-400`;
  const errorInputClass = `${baseInputClass} border-red-300 focus:border-red-400 bg-red-50/30`;
  const inputClass = (fieldName?: string) =>
    fieldName && fieldErrors[fieldName] ? errorInputClass : normalInputClass;
  const labelClass = "block text-sm font-semibold mb-1.5 text-gray-700";
  const errorTextClass = "mt-1 text-xs text-red-500";

  const isSubmitting = loading || isUploadingImage || isProcessingContent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_11rem] gap-6 items-start">
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-black"
            style={{ color: colors.primary.navy.DEFAULT }}
          >
            {initialData ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
          </h2>
          <Button variant="ghost" isIconOnly size="sm" onClick={handleCancelRequest}>
            <X size={20} className="text-gray-500" />
          </Button>
        </div>

        <form id="project-form" onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Name + Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div id="field-name">
              <label className={labelClass}>Tên bài đăng dự án *</label>
              <input disabled={isReadOnly || isSubmitting}
                type="text"
                className={inputClass("name")}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ví dụ: Vinhomes Pearl Bay"
              />
              {fieldErrors.name && <p className={errorTextClass}>{fieldErrors.name}</p>}
            </div>
            <div id="field-status">
              <label className={labelClass}>Trạng thái *</label>
              <select disabled={isReadOnly || isSubmitting}
                className={inputClass("status")}
                value={form.status}
                onChange={(e) => update("status", e.target.value as ProjectStatus)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {fieldErrors.status && <p className={errorTextClass}>{fieldErrors.status}</p>}
            </div>
          </div>

          {/* Row 2: Slug */}
          <div id="field-slug">
            <label className={labelClass}>
              Slug <span style={{ color: colors.primary.DEFAULT }}>*</span>
            </label>
            <input disabled={isReadOnly || isSubmitting}
              type="text"
              className={inputClass("slug")}
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="ten-du-an"
            />
            {fieldErrors.slug && <p className={errorTextClass}>{fieldErrors.slug}</p>}
          </div>

          {/* Row 3: Type */}
          <div id="field-type">
            <label className={labelClass}>Loại hình *</label>
            <select disabled={isReadOnly || isSubmitting}
              className={inputClass("type")}
              value={form.type}
              onChange={(e) => update("type", e.target.value as ProjectType)}
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {fieldErrors.type && <p className={errorTextClass}>{fieldErrors.type}</p>}
          </div>

          {/* Row 4: Index toggle */}
          <div>
            <div className="flex items-center gap-3">
              <input
                id="isIndexed"
                type="checkbox"
                checked={form.isIndexed}
                onChange={(e) => update("isIndexed", e.target.checked)}
                disabled={isReadOnly || isSubmitting}
                className="h-4 w-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
              />
              <label htmlFor="isIndexed" className="text-sm font-medium text-gray-700 cursor-pointer">
                Cho phép Google lập chỉ mục (index)
              </label>
            </div>
          </div>

          {/* Row 5: Canonical URL */}
          <div>
            <label className={labelClass}>Canonical URL</label>
            <input disabled={isReadOnly || isSubmitting}
              type="text"
              className={inputClass()}
              value={form.canonicalUrl}
              onChange={(e) => update("canonicalUrl", e.target.value)}
              placeholder="https://era.com.vn/du-an/... (để trống nếu không dùng canonical URL)"
            />
          </div>

          {/* Row 6: Location */}
          <div id="field-location">
            <div>
              <label className={labelClass}>Địa chỉ dự án *</label>
              <input
                disabled={isReadOnly || isSubmitting}
                type="text"
                className={inputClass("location")}
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  clearLocationError();
                  setIsDirty(true);
                }}
                placeholder="Số nhà, đường, phường, quận, thành phố..."
              />
            </div>
            {fieldErrors.location && <p className={errorTextClass}>{fieldErrors.location}</p>}
          </div>

          {/* Row 7: Image Upload */}
          <ImageUploadField
            preview={imagePreview}
            isUploading={isUploadingImage}
            isReadOnly={isReadOnly}
            disabled={isSubmitting}
            onChange={handleImageChange}
            onClear={handleClearImage}
          />

          {/* Info section */}
          <div className="rounded-lg border border-gray-100 p-4 bg-gray-50/50">
            <h3
              className="text-sm font-bold uppercase tracking-wide mb-4"
              style={{ color: colors.primary.DEFAULT }}
            >
              Thông tin chi tiết
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="sm:col-span-2 lg:col-span-3">
                <label className={labelClass}>Tên dự án *</label>
                <input
                  disabled={isReadOnly || isSubmitting}
                  type="text"
                  className={inputClass("projectName")}
                  value={form.projectName}
                  onChange={(e) => update("projectName", e.target.value)}
                  placeholder="Ví dụ: Vinhomes Pearl Bay"
                />
                {fieldErrors.projectName && <p className={errorTextClass}>{fieldErrors.projectName}</p>}
              </div>
              <div>
                <label className={labelClass}>Chủ đầu tư</label>
                <input disabled={isReadOnly || isSubmitting}
                  type="text"
                  className={inputClass()}
                  value={form.investor}
                  onChange={(e) => update("investor", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Hình thức sở hữu</label>
                <input disabled={isReadOnly || isSubmitting}
                  type="text"
                  className={inputClass()}
                  value={form.ownership}
                  onChange={(e) => update("ownership", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Tổng diện tích</label>
                <input disabled={isReadOnly || isSubmitting}
                  type="text"
                  className={inputClass()}
                  value={form.area}
                  onChange={(e) => update("area", e.target.value)}
                  placeholder="33.800 m²"
                />
              </div>
              <div>
                <label className={labelClass}>Mật độ xây dựng</label>
                <input disabled={isReadOnly || isSubmitting}
                  type="text"
                  className={inputClass()}
                  value={form.density}
                  onChange={(e) => update("density", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Quy mô phát triển</label>
                <input disabled={isReadOnly || isSubmitting}
                  type="text"
                  className={inputClass()}
                  value={form.scale}
                  onChange={(e) => update("scale", e.target.value)}
                  placeholder="3 Khu"
                />
              </div>
              <div>
                <label className={labelClass}>Thởi điểm khởi công</label>
                <input disabled={isReadOnly || isSubmitting}
                  type="text"
                  className={inputClass()}
                  value={form.startYear}
                  onChange={(e) => update("startYear", e.target.value)}
                  placeholder="2025"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className={labelClass}>Tiến độ</label>
              <input disabled={isReadOnly || isSubmitting}
                type="text"
                className={inputClass()}
                value={form.progress}
                onChange={(e) => update("progress", e.target.value)}
                placeholder="Đang xây dựng"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className={labelClass}>Nội dung chi tiết</label>
            <div className="rounded-xl border-2 border-gray-200 overflow-hidden focus-within:border-gray-400 transition-all duration-200">
              <RichEditor
                value={form.content}
                onChange={(val) => update("content", val)}
                disabled={isReadOnly || isSubmitting}
              />
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 md:hidden">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="px-5 bg-white"
              onClick={handleCancelRequest}
            >
              Huỷ
            </Button>
            {!isReadOnly && (
              <button
                type="submit"
                form="project-form"
                disabled={isSubmitting || !isDirty}
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
                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                Lưu nháp
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sticky action sidebar */}
      <div className="hidden md:block sticky top-20 self-start">
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm gap-5">
          {!isReadOnly && (
            <button
              type="submit"
              form="project-form"
              disabled={isSubmitting || !isDirty}
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
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            )}
              {isSubmitting ? "Đang lưu..." : initialData ? "Lưu thay đổi" : "Lưu nháp"}
            </button>
          )}

          {initialData?.id && form.publicationStatus === "draft" && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={handleSubmitForReview}
              disabled={isSubmitting}
            >
              Gửi duyệt
            </Button>
          )}

          {initialData?.id && form.publicationStatus === "pending" && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="w-full justify-center"
              onClick={handlePublish}
              disabled={isSubmitting}
            >
              Duyệt dự án
            </Button>
          )}

          {initialData?.id && form.publicationStatus === "pending" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-center bg-white"
              onClick={handleReject}
              disabled={isSubmitting}
            >
              Từ chối duyệt
            </Button>
          )}

          {initialData?.id && form.publicationStatus === "published" && canPublish && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-center bg-white"
              onClick={handleRevoke}
              disabled={isSubmitting}
            >
              Hủy duyệt
            </Button>
          )}

          {initialData?.id && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setShowHistory(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-purple-600 bg-white px-4 py-2 text-sm font-medium text-purple-600 transition-all duration-200 hover:bg-purple-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              <History size={15} />
              Lịch sử
            </button>
          )}

          <button
            type="button"
            disabled={!form.slug || isSubmitting}
            onClick={() => setShowPreview(true)}
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
            disabled={isSubmitting}
          >
            Huỷ
          </Button>
        </div>
      </div>

      <ProjectPreviewDialog project={form} imagePreviewUrl={imagePreview} isOpen={showPreview} onClose={() => setShowPreview(false)} />
      {initialData?.id && (
        <ProjectHistoryDialog projectId={initialData.id} isOpen={showHistory} onClose={() => setShowHistory(false)} />
      )}

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
        title="Xác nhận hủy"
        message="Bạn đã nhập thông tin. Nếu huỷ, những thay đổi này sẽ không được lưu."
        confirmLabel="Vẫn hủy"
        cancelLabel="Ở lại"
        variant="warning"
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelConfirm(false)}
      />

      <ConfirmDialog
        isOpen={!!pendingAction}
        title="Xác nhận"
        message={
          pendingAction?.type === "save"
            ? "Bạn có chắc muốn lưu thay đổi cho dự án này?"
            : pendingAction?.type === "submit"
            ? "Bạn có chắc muốn gửi dự án đi duyệt?"
            : pendingAction?.type === "publish"
            ? "Bạn có chắc muốn duyệt dự án này?"
            : pendingAction?.type === "reject"
            ? "Bạn có chắc muốn từ chối duyệt dự án này?"
            : pendingAction?.type === "revoke"
            ? "Bạn có chắc muốn hủy duyệt dự án này? Dự án sẽ chuyển về trạng thái chờ duyệt."
            : "Bạn có thay đổi chưa lưu. Vui lòng lưu trước khi thực hiện thao tác này."
        }
        confirmLabel={
          pendingAction?.type === "save"
            ? "Lưu"
            : pendingAction?.type === "submit"
            ? "Gửi duyệt"
            : pendingAction?.type === "publish"
            ? "Duyệt"
            : pendingAction?.type === "reject"
            ? "Từ chối"
            : pendingAction?.type === "revoke"
            ? "Hủy duyệt"
            : "Lưu thay đổi"
        }
        variant={pendingAction?.type === "revoke" || pendingAction?.type === "reject" ? "danger" : "warning"}
        onConfirm={() => {
          if (pendingAction?.type === "unsaved_changes") {
            setPendingAction(null);
            pendingAction.callback?.();
          } else if (pendingAction?.type === "save") {
            setPendingAction(null);
            const formElement = document.getElementById("project-form") as HTMLFormElement | null;
            formElement?.requestSubmit();
          } else if (pendingAction?.type === "submit") {
            handleSubmitForReview();
          } else if (pendingAction?.type === "publish") {
            handlePublish();
          } else if (pendingAction?.type === "reject") {
            handleReject();
          } else if (pendingAction?.type === "revoke") {
            handleRevoke();
          }
        }}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  );
}
