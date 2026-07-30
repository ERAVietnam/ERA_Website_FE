"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { colors } from "@/lib/theme";

export type ImageUploadPreviewVariant = "image" | "avatar-row" | "banner";

export interface ImageUploadFieldProps {
  id?: string;
  /** Label hiển thị phía trên field. Mặc định "Ảnh đại diện". */
  label?: string;
  /** Class cho label. Mặc định "mb-2 block text-sm font-semibold text-gray-700". */
  labelClassName?: string;
  /** Lỗi của field, hiển thị ngay dưới label. */
  error?: string;
  /** Class cho dòng lỗi. Mặc định "mb-2 text-xs text-red-500". */
  errorClassName?: string;

  /** URL preview ảnh hiện tại (falsy => hiển thị dropzone / emptyReadOnlyText). */
  preview?: string;
  /** Alt cho ảnh preview. Mặc định "Preview". */
  previewAlt?: string;
  /**
   * Kiểu preview:
   * - "image": ảnh bo góc + nút X overlay (mặc định)
   * - "avatar-row": avatar tròn + tên file + nút chữ xoá
   * - "banner": ảnh aspect-[16/9] + footer tên file + nút chữ xoá
   */
  previewVariant?: ImageUploadPreviewVariant;
  /** max-width (px) của ảnh preview, chỉ áp dụng cho variant "image". Mặc định 320. */
  previewMaxWidth?: number;
  /** Tên file hiển thị ở variant "avatar-row" / "banner". */
  fileName?: string;
  /** Dòng mô tả phụ dưới tên file ở variant "avatar-row". */
  fileStatusText?: string;
  /** Text nút xoá dạng chữ (variant "avatar-row" / "banner"). Mặc định "Xoá ảnh". */
  clearButtonText?: string;

  /** Gọi khi người dùng chọn file (input) hoặc kéo thả file vào dropzone. */
  onFileSelect: (file: File) => void;
  /** Gọi khi bấm nút xoá ảnh. Nếu không truyền, nút xoá sẽ không render. */
  onClear?: () => void;
  /** Hiển thị trạng thái "Đang tải ảnh lên..." trong dropzone. */
  isUploading?: boolean;
  isReadOnly?: boolean;
  disabled?: boolean;

  /** accept của input file. Mặc định "image/*". */
  accept?: string;
  /** Dòng hint dưới dropzone. Mặc định "Hỗ trợ: JPG, PNG, WEBP". */
  hintText?: string;
  /** "md": h-40 + icon 32px (mặc định); "sm": h-32 + icon 28px. */
  dropzoneSize?: "md" | "sm";
  /** Override icon mặc định của dropzone. */
  dropzoneIcon?: React.ReactNode;
  /** Luôn hiển thị dropzone kể cả khi đã có preview. */
  alwaysShowDropzone?: boolean;
  /**
   * Khi true (mặc định), file kéo thả chỉ được nhận nếu là ảnh (lặng lẽ bỏ qua file khác).
   * Truyền false nếu call site tự validate và hiển thị lỗi riêng.
   */
  validateImageType?: boolean;
  /** Text hiển thị thay dropzone khi read-only và chưa có ảnh. */
  emptyReadOnlyText?: string;
}

const DEFAULT_LABEL_CLASSNAME = "mb-2 block text-sm font-semibold text-gray-700";
const DEFAULT_ERROR_CLASSNAME = "mb-2 text-xs text-red-500";

export function ImageUploadField({
  id,
  label = "Ảnh đại diện",
  labelClassName = DEFAULT_LABEL_CLASSNAME,
  error,
  errorClassName = DEFAULT_ERROR_CLASSNAME,
  preview,
  previewAlt = "Preview",
  previewVariant = "image",
  previewMaxWidth = 320,
  fileName,
  fileStatusText,
  clearButtonText = "Xoá ảnh",
  onFileSelect,
  onClear,
  isUploading = false,
  isReadOnly = false,
  disabled = false,
  accept = "image/*",
  hintText = "Hỗ trợ: JPG, PNG, WEBP",
  dropzoneSize = "md",
  dropzoneIcon,
  alwaysShowDropzone = false,
  validateImageType = true,
  emptyReadOnlyText,
}: ImageUploadFieldProps) {
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
    if (file && (!validateImageType || file.type.startsWith("image/"))) {
      onFileSelect(file);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const hasPreview = Boolean(preview);
  const dropzoneHeightClass = dropzoneSize === "md" ? "h-40" : "h-32";
  const iconSize = dropzoneSize === "md" ? 32 : 28;

  const defaultDropzoneIcon = (
    <svg
      width={iconSize}
      height={iconSize}
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
  );

  const renderPreview = () => {
    if (previewVariant === "avatar-row") {
      return (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="min-w-0 flex items-center gap-3">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={previewAlt}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">{fileName}</p>
              <p className="text-xs text-gray-500">{fileStatusText}</p>
            </div>
          </div>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-red-300 hover:text-red-600"
            >
              {clearButtonText}
            </button>
          )}
        </div>
      );
    }

    if (previewVariant === "banner") {
      return (
        <div className="mb-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt={previewAlt} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <p className="min-w-0 truncate text-sm text-gray-600">{fileName}</p>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-red-300 hover:text-red-600"
              >
                {clearButtonText}
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="relative inline-block rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview}
          alt={previewAlt}
          className="w-full h-auto object-cover"
          style={{ maxWidth: previewMaxWidth }}
        />
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            disabled={isReadOnly}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Xoá ảnh"
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  };

  const showEmptyReadOnly = !hasPreview && isReadOnly && Boolean(emptyReadOnlyText);
  const showDropzone = alwaysShowDropzone || (!hasPreview && !showEmptyReadOnly);

  return (
    <div id={id}>
      <label className={labelClassName}>{label}</label>
      {error && <p className={errorClassName}>{error}</p>}

      {hasPreview && renderPreview()}

      {showEmptyReadOnly && (
        <div
          className={`flex items-center justify-center w-full ${dropzoneHeightClass} rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400`}
        >
          {emptyReadOnlyText}
        </div>
      )}

      {showDropzone && (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`${
            previewVariant === "avatar-row" ? "mt-3 " : ""
          }flex ${dropzoneHeightClass} w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors ${
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
              {dropzoneIcon ?? defaultDropzoneIcon}
              <span className="text-sm text-gray-500">
                Kéo thả ảnh vào đây hoặc{" "}
                <span className="font-semibold" style={{ color: colors.primary.DEFAULT }}>
                  chọn file
                </span>
              </span>
              <span className="text-xs text-gray-400">{hintText}</span>
            </>
          )}
          {!isReadOnly && (
            <input
              type="file"
              accept={accept}
              className="sr-only"
              onChange={handleInputChange}
              disabled={isUploading || disabled}
            />
          )}
        </label>
      )}
    </div>
  );
}
