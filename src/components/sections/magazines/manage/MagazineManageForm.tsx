"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { X, Loader2, FileText, ImageIcon, CheckCircle, RotateCcw } from "lucide-react";
import { mediaApi } from "@/api/domains/media";
import { magazinesApi } from "@/api/domains/magazines";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getErrorMessage } from "@/lib/error-messages";
import type { EMagazine } from "@/types/api";

interface MagazineFormData {
  title: string;
  description: string;
  pdfMediaId: string;
  coverImageMediaId: string;
  publishedDate: string;
}

interface Props {
  initialData?: EMagazine;
  onSave: (magazine?: EMagazine) => void;
  onCancel: () => void;
}

function buildInitialForm(initialData?: EMagazine): MagazineFormData {
  return {
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    pdfMediaId: initialData?.pdfMediaId ?? "",
    coverImageMediaId: initialData?.coverImageMediaId ?? "",
    publishedDate: initialData?.publishedDate ? initialData.publishedDate.slice(0, 10) : "",
  };
}

export function MagazineManageForm({ initialData, onSave, onCancel }: Props) {
  const [form, setForm] = useState<MagazineFormData>(() => buildInitialForm(initialData));
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string>(initialData?.pdfMedia?.filename ?? "");
  const [coverPreview, setCoverPreview] = useState<string>(initialData?.coverImageMedia?.url ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    | { type: "publish" }
    | { type: "unpublish" }
    | { type: "unsaved_changes" }
    | null
  >(null);

  const initialForm = useMemo(() => buildInitialForm(initialData), [initialData]);
  const initialPdfPreview = initialData?.pdfMedia?.filename ?? "";
  const initialCoverPreview = initialData?.coverImageMedia?.url ?? "";

  const isDirty =
    JSON.stringify(form) !== JSON.stringify(initialForm) ||
    pdfFile !== null ||
    coverFile !== null;

  useEffect(() => {
    setForm(buildInitialForm(initialData));
    setPdfPreview(initialData?.pdfMedia?.filename ?? "");
    setCoverPreview(initialData?.coverImageMedia?.url ?? "");
    setPdfFile(null);
    setCoverFile(null);
    setFieldErrors({});
    setPendingAction(null);
  }, [initialData]);

  const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    draft: { label: "Bản nháp", color: "#6B7280", bg: "#F3F4F6" },
    published: { label: "Đã đăng", color: "#059669", bg: "#D1FAE5" },
  };

  const update = <K extends keyof MagazineFormData>(key: K, value: MagazineFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setFieldErrors((prev) => ({ ...prev, pdf: "Vui lòng chọn file PDF" }));
        return;
      }
      setPdfFile(file);
      setPdfPreview(file.name);
      setFieldErrors((prev) => ({ ...prev, pdf: "" }));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFieldErrors((prev) => ({ ...prev, cover: "Vui lòng chọn file ảnh" }));
        return;
      }
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
      setFieldErrors((prev) => ({ ...prev, cover: "" }));
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfPreview(initialData?.pdfMedia?.filename ?? "");
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setCoverPreview("");
    update("coverImageMediaId", "");
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

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = "Vui lòng nhập tiêu đề";
    if (!initialData?.id && !pdfFile && !form.pdfMediaId) errors.pdf = "Vui lòng chọn file PDF";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setPopup((prev) => ({ ...prev, show: false }));

    try {
      let pdfMediaId = form.pdfMediaId;
      let coverImageMediaId = form.coverImageMediaId;

      if (pdfFile) {
        const upload = await mediaApi.uploadFile(pdfFile, "magazine");
        pdfMediaId = upload.id;
      }

      if (coverFile) {
        const upload = await mediaApi.uploadImage(coverFile, "magazine");
        coverImageMediaId = upload.id;
      }

      const payload = {
        title: form.title,
        description: form.description,
        pdfMediaId,
        coverImageMediaId: coverImageMediaId || null,
        publishedDate: form.publishedDate || undefined,
        // Tạo mới luôn là nháp; chỉnh sửa giữ nguyên trạng thái hiện tại
        status: (initialData?.status ?? "draft") as "draft" | "published",
      };

      const saved = initialData?.id
        ? await magazinesApi.updateMagazine(initialData.id, payload)
        : await magazinesApi.createMagazine(payload);

      setPopup({
        show: true,
        type: "success",
        message: initialData?.id ? "Cập nhật e-magazine thành công!" : "Tạo e-magazine thành công!",
      });

      onSave(saved);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Lưu e-magazine thất bại. Vui lòng thử lại."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishRequest = () => {
    if (!initialData?.id) return;
    if (isDirty) {
      setPendingAction({ type: "unsaved_changes" });
      return;
    }
    setPendingAction({ type: "publish" });
  };

  const handleUnpublishRequest = () => {
    if (!initialData?.id) return;
    if (isDirty) {
      setPendingAction({ type: "unsaved_changes" });
      return;
    }
    setPendingAction({ type: "unpublish" });
  };

  const handleConfirmAction = async () => {
    if (!initialData?.id || !pendingAction) return;
    const action = pendingAction.type;
    setPendingAction(null);
    setPopup((prev) => ({ ...prev, show: false }));
    setIsLoading(true);

    try {
      const saved =
        action === "publish"
          ? await magazinesApi.publishMagazine(initialData.id)
          : await magazinesApi.unpublishMagazine(initialData.id);

      setPopup({
        show: true,
        type: "success",
        message: action === "publish" ? "Đăng e-magazine thành công!" : "Đã gỡ e-magazine về bản nháp!",
      });

      onSave(saved);
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(
          err?.status,
          err?.data,
          action === "publish" ? "Đăng e-magazine thất bại." : "Gỡ e-magazine thất bại."
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputBaseClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors outline-none focus:border-gray-400";
  const errorInputClass = "border-red-300 focus:border-red-400 bg-red-50/30";

  const saveButton = (
    <button
      type="submit"
      form="magazine-form"
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
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
      {isLoading ? "Đang lưu..." : initialData ? "Lưu thay đổi" : "Lưu nháp"}
    </button>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_11rem] gap-6 items-start">
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
              {initialData ? "Chỉnh sửa e-magazine" : "Thêm e-magazine mới"}
            </h2>
            {initialData && (
              <span
                className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{
                  color: statusConfig[initialData.status]?.color,
                  backgroundColor: statusConfig[initialData.status]?.bg,
                }}
              >
                {statusConfig[initialData.status]?.label}
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
            autoCloseMs={1000}
          />
        )}

        <ConfirmDialog
          isOpen={showCancelConfirm}
          variant="warning"
          title="Huỷ thay đổi"
          message="Bạn có thay đổi chưa được lưu. Bạn có chắc muốn huỷ?"
          confirmLabel="Huỷ"
          cancelLabel="Ở lại"
          onConfirm={handleConfirmCancel}
          onCancel={() => setShowCancelConfirm(false)}
        />

        <ConfirmDialog
          isOpen={!!pendingAction}
          variant="warning"
          title={
            pendingAction?.type === "publish"
              ? "Đăng e-magazine"
              : pendingAction?.type === "unpublish"
              ? "Gỡ e-magazine"
              : "Thay đổi chưa được lưu"
          }
          message={
            pendingAction?.type === "publish"
              ? "E-magazine sẽ được đăng công khai."
              : pendingAction?.type === "unpublish"
              ? "E-magazine sẽ được chuyển về trạng thái bản nháp."
              : "Bạn có thay đổi chưa lưu. Vui lòng lưu trước khi thực hiện thao tác này."
          }
          confirmLabel={
            pendingAction?.type === "publish"
              ? "Đăng"
              : pendingAction?.type === "unpublish"
              ? "Gỡ"
              : "Đã hiểu"
          }
          cancelLabel="Hủy"
          onConfirm={() => {
            if (pendingAction?.type === "publish" || pendingAction?.type === "unpublish") {
              handleConfirmAction();
            } else {
              setPendingAction(null);
            }
          }}
          onCancel={() => setPendingAction(null)}
        />

        <form id="magazine-form" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div id="field-title">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tiêu đề <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Nhập tiêu đề e-magazine..."
                className={`${inputBaseClass} ${fieldErrors.title ? errorInputClass : ""}`}
              />
              {fieldErrors.title && <p className="mt-1 text-xs text-red-500">{fieldErrors.title}</p>}
            </div>

            <div id="field-description">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả</label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Nhập mô tả ngắn..."
                rows={4}
                className={`${inputBaseClass} resize-none`}
              />
            </div>

            <div id="field-pdf">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                File PDF <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <div className="space-y-2">
                {pdfPreview && (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <FileText size={20} className="text-red-600" />
                    <span className="text-sm text-gray-700 flex-1 truncate">{pdfPreview}</span>
                    <button
                      type="button"
                      onClick={handleRemovePdf}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className={`block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 ${
                    fieldErrors.pdf ? "text-red-500" : ""
                  }`}
                />
                {fieldErrors.pdf && <p className="mt-1 text-xs text-red-500">{fieldErrors.pdf}</p>}
              </div>
            </div>

            <div id="field-cover">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ảnh bìa</label>
              <div className="space-y-2">
                {coverPreview && (
                  <div className="relative w-40 h-56 rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleRemoveCover}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className={`block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 ${
                    fieldErrors.cover ? "text-red-500" : ""
                  }`}
                />
                {fieldErrors.cover && <p className="mt-1 text-xs text-red-500">{fieldErrors.cover}</p>}
              </div>
            </div>

            <div id="field-publishedDate">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày xuất bản</label>
              <input
                type="date"
                value={form.publishedDate}
                onChange={(e) => update("publishedDate", e.target.value)}
                className={inputBaseClass}
              />
            </div>

            {/* Mobile actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 md:hidden">
              {initialData?.id && initialData.status === "draft" && (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="gap-2"
                  onClick={handlePublishRequest}
                  disabled={isLoading}
                >
                  <CheckCircle size={15} />
                  Đăng
                </Button>
              )}
              {initialData?.id && initialData.status === "published" && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white"
                  onClick={handleUnpublishRequest}
                  disabled={isLoading}
                >
                  <RotateCcw size={15} />
                  Gỡ về nháp
                </Button>
              )}
              {saveButton}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="bg-white"
                onClick={handleCancelRequest}
                disabled={isLoading}
              >
                Huỷ
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Sticky action sidebar */}
      <div className="hidden md:block sticky top-20 self-start">
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm gap-3">
          {initialData?.id && initialData.status === "draft" && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="w-full justify-center gap-2"
              onClick={handlePublishRequest}
              disabled={isLoading}
            >
              <CheckCircle size={15} />
              Đăng
            </Button>
          )}
          {initialData?.id && initialData.status === "published" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-center gap-2 bg-white"
              onClick={handleUnpublishRequest}
              disabled={isLoading}
            >
              <RotateCcw size={15} />
              Gỡ về nháp
            </Button>
          )}

          {saveButton}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full justify-center bg-white"
            onClick={handleCancelRequest}
            disabled={isLoading}
          >
            Huỷ
          </Button>
        </div>
      </div>
    </div>
  );
}
