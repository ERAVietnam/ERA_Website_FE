"use client";

import dynamic from "next/dynamic";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/ui/admin/ImageUploadField";
import { colors } from "@/lib/theme";
import type { AcademyCourse, AcademyCourseTag } from "@/types/api";
import type { CourseFormState } from "./types";

const RichEditor = dynamic(() => import("@/components/shared/RichEditor"), {
  ssr: false,
});

interface Props {
  editing: AcademyCourse | null;
  form: CourseFormState;
  tags: AcademyCourseTag[];
  fieldErrors: Record<string, string>;
  imageFile: File | null;
  isSaving: boolean;
  isDirty: boolean;
  inputBaseClass: string;
  errorInputClass: string;
  onSubmit: (event: React.FormEvent) => void;
  onClose: () => void;
  onUpdateForm: <K extends keyof CourseFormState>(key: K, value: CourseFormState[K]) => void;
  onToggleTag: (tagId: string) => void;
  onImageSelect: (file: File) => void;
  onImageClear: () => void;
}

export function AcademyCourseForm({
  editing,
  form,
  tags,
  fieldErrors,
  imageFile,
  isSaving,
  isDirty,
  inputBaseClass,
  errorInputClass,
  onSubmit,
  onClose,
  onUpdateForm,
  onToggleTag,
  onImageSelect,
  onImageClear,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_11rem] md:items-start">
      <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
            {editing ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
          </h2>
          <Button variant="ghost" isIconOnly size="sm" onClick={onClose}>
            <X size={20} className="text-gray-500" />
          </Button>
        </div>

        <form id="academy-course-form" onSubmit={onSubmit} className="space-y-5">
          <div id="field-title">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tên khóa học <span style={{ color: colors.primary.DEFAULT }}>*</span>
            </label>
            <input
              value={form.title}
              onChange={(event) => onUpdateForm("title", event.target.value)}
              placeholder="Nhập tên khóa học"
              className={`${inputBaseClass} ${fieldErrors.title ? errorInputClass : ""}`}
            />
            {fieldErrors.title && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.title}</p>
            )}
          </div>

          <ImageUploadField
            id="field-imageMediaId"
            label="Ảnh khóa học"
            preview={form.imageUrl || undefined}
            previewAlt="Course preview"
            previewVariant="banner"
            fileName={imageFile?.name || "Ảnh hiện tại"}
            clearButtonText="Xóa ảnh"
            onFileSelect={onImageSelect}
            onClear={onImageClear}
            hintText="Hỗ trợ JPG, PNG, WEBP, GIF"
            dropzoneSize="sm"
            dropzoneIcon={<ImagePlus size={28} className="text-gray-400" />}
            alwaysShowDropzone
            validateImageType={false}
          />

          <div id="field-tagIds">
            <label className="mb-2 block text-sm font-semibold text-gray-700">Tag khóa học</label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {tags.map((tag) => (
                <label
                  key={tag.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={form.tagIds.includes(tag.id)}
                    onChange={() => onToggleTag(tag.id)}
                    className="h-4 w-4 accent-primary"
                  />
                  <span>{tag.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div id="field-description">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Mô tả khóa học <span style={{ color: colors.primary.DEFAULT }}>*</span>
            </label>
            <div
              className={`overflow-hidden rounded-lg border bg-white ${
                fieldErrors.description ? "border-red-300" : "border-gray-200"
              }`}
            >
              <RichEditor
                value={form.description}
                onChange={(value) => onUpdateForm("description", value)}
                disableImage
                compact
              />
            </div>
            {fieldErrors.description && (
              <p className="mt-1 text-xs text-red-500">{fieldErrors.description}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div id="field-openingDate">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Ngày mở khóa</label>
              <input
                type="date"
                value={form.openingDate}
                onChange={(event) => onUpdateForm("openingDate", event.target.value)}
                className={inputBaseClass}
              />
              <p className="mt-1 text-xs text-gray-400">Để trống nếu khóa học là COMING SOON.</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Trạng thái</label>
              <label className="flex h-[42px] items-center justify-between rounded-lg border border-gray-200 bg-white px-4">
                <span className="text-sm text-gray-700">{form.isActive ? "Đang hiển thị" : "Đang ẩn"}</span>
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) => onUpdateForm("isActive", event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden self-start md:sticky md:top-20 md:block">
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <button
            type="submit"
            form="academy-course-form"
            disabled={isSaving || !isDirty}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            style={{ borderColor: colors.primary.navy.DEFAULT, color: colors.primary.navy.DEFAULT }}
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
            {isSaving ? "Đang lưu..." : "Lưu"}
          </button>

          <div className="min-h-[120px]" />

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full justify-center bg-white"
            onClick={onClose}
            disabled={isSaving}
          >
            Hủy
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 md:hidden">
        <Button type="button" variant="outline" size="sm" className="bg-white" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit" form="academy-course-form" variant="primary" size="sm" disabled={isSaving || !isDirty}>
          {isSaving ? "Đang lưu..." : "Lưu"}
        </Button>
      </div>
    </div>
  );
}
