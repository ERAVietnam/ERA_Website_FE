"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  BookOpen,
  CalendarDays,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Tags,
  Trash2,
  X,
} from "lucide-react";
import { academyCoursesApi } from "@/api/domains/academy-courses";
import { mediaApi } from "@/api/domains/media";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { Pagination } from "@/components/ui/Pagination";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { Section } from "@/components/ui/Section";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { SelectField } from "@/components/ui/admin/SelectField";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { extractApiError, showFieldError } from "@/lib/api-errors";
import { formatDate } from "@/lib/date";
import { compressImage } from "@/lib/imageCompression";
import { colors } from "@/lib/theme";
import type {
  AcademyCourse,
  AcademyCourseFilters,
  AcademyCourseTag,
  PaginationMeta,
} from "@/types/api";

const DEFAULT_LIMIT = 10;

const RichEditor = dynamic(() => import("@/components/shared/RichEditor"), {
  ssr: false,
});

interface CourseFormState {
  title: string;
  description: string;
  openingDate: string;
  isActive: boolean;
  imageMediaId: string | null;
  imageUrl: string;
  tagIds: string[];
}

function toDateInputValue(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function courseToFormState(course?: AcademyCourse | null): CourseFormState {
  return {
    title: course?.title ?? "",
    description: course?.description ?? "",
    openingDate: toDateInputValue(course?.openingDate),
    isActive: course?.isActive ?? true,
    imageMediaId: course?.imageMediaId ?? null,
    imageUrl: course?.imageMedia?.url ?? "",
    tagIds: course?.tags?.map((tag) => tag.id) ?? [],
  };
}

function stripHtml(html: string) {
  if (typeof window === "undefined") return html;
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export default function AcademyCourseManagePage() {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const [items, setItems] = useState<AcademyCourse[]>([]);
  const [tags, setTags] = useState<AcademyCourseTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AcademyCourse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<AcademyCourseFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });
  const [form, setForm] = useState<CourseFormState>(() => courseToFormState());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({
    show: false,
    id: "",
  });
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showNetworkError, setShowNetworkError] = useState(false);

  const canCreate = hasPermission("academy.courses.all.create");
  const canUpdate = hasPermission("academy.courses.all.update");
  const canDelete = hasPermission("academy.courses.all.delete");
  const canManage = canUpdate || canDelete;

  const initialForm = useMemo(() => courseToFormState(editing), [editing]);
  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm) || Boolean(imageFile);

  const handleClearFilters = () => {
    setSearchInput("");
    setFilters({ page: 1, limit: DEFAULT_LIMIT });
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [coursesResponse, tagsResponse] = await Promise.all([
        academyCoursesApi.getCourses(filters),
        academyCoursesApi.getTags(),
      ]);
      setItems(coursesResponse.items);
      setMeta(coursesResponse.meta);
      setTags(tagsResponse);
    } catch (err) {
      setItems([]);
      setMeta({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) setShowNetworkError(true);
      else setPopup({ show: true, type: "error", message });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    queueMicrotask(() => loadData());
  }, [loadData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchInput.trim() || undefined;
      setFilters((prev) => {
        if (prev.search === search) return prev;
        return { ...prev, search, page: 1 };
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const openCreate = () => {
    setEditing(null);
    setForm(courseToFormState());
    setImageFile(null);
    setFieldErrors({});
    setShowForm(true);
  };

  const openEdit = (course: AcademyCourse) => {
    setEditing(course);
    setForm(courseToFormState(course));
    setImageFile(null);
    setFieldErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(courseToFormState());
    setImageFile(null);
    setIsDraggingImage(false);
    setFieldErrors({});
  };

  const updateForm = <K extends keyof CourseFormState>(key: K, value: CourseFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = "Vui lòng nhập tên khóa học.";
    if (!stripHtml(form.description).trim()) errors.description = "Vui lòng nhập mô tả khóa học.";
    return errors;
  };

  const setImageFromFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setPopup({ show: true, type: "error", message: "File ảnh phải là hình ảnh." });
      return;
    }
    setImageFile(file);
    updateForm("imageUrl", URL.createObjectURL(file));
    updateForm("imageMediaId", null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImageFromFile(file);
  };

  const toggleTag = (tagId: string) => {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(tagId)
        ? prev.tagIds.filter((id) => id !== tagId)
        : [...prev.tagIds, tagId],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPopup((prev) => ({ ...prev, show: false }));

    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSaving(true);
    try {
      let imageMediaId = form.imageMediaId;
      if (imageFile) {
        const compressedFile = await compressImage(imageFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1400,
        });
        const upload = await mediaApi.uploadImage(compressedFile, "academy", {
          filenameBase: form.title.trim(),
        });
        imageMediaId = upload.id;
      }

      const payload = {
        title: form.title.trim(),
        description: form.description,
        openingDate: form.openingDate || null,
        isActive: form.isActive,
        imageMediaId,
        tagIds: form.tagIds,
      };

      const saved = editing
        ? await academyCoursesApi.updateCourse(editing.id, payload)
        : await academyCoursesApi.createCourse(payload);

      setPopup({
        show: true,
        type: "success",
        message: editing ? "Cập nhật khóa học thành công." : "Tạo khóa học thành công.",
      });
      setShowForm(false);
      setEditing(null);
      setForm(courseToFormState());
      setImageFile(null);
      setItems((prev) => {
        if (editing) return prev.map((item) => (item.id === saved.id ? saved : item));
        return [saved, ...prev].slice(0, meta.limit);
      });
      loadData().catch(() => {});
    } catch (err) {
      const { field, message, isNetworkError } = extractApiError(err);
      if (field) showFieldError(field, message, setFieldErrors);
      else if (isNetworkError) setShowNetworkError(true);
      else setPopup({ show: true, type: "error", message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    const id = deleteConfirm.id;
    if (!id) return;
    setDeleteConfirm({ show: false, id: "" });
    try {
      await academyCoursesApi.deleteCourse(id);
      setPopup({ show: true, type: "success", message: "Xóa khóa học thành công." });
      setItems((prev) => prev.filter((item) => item.id !== id));
      loadData().catch(() => {});
    } catch (err) {
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) setShowNetworkError(true);
      else setPopup({ show: true, type: "error", message });
    }
  };

  const inputBaseClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors outline-none focus:border-gray-400";
  const errorInputClass = "border-red-300 focus:border-red-400 bg-red-50/30";

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose={popup.type === "success"}
            autoCloseMs={1200}
          />
        )}

        {warning.show && (
          <PopupNotification
            type="error"
            message={warning.message}
            onClose={closeWarning}
            autoClose={false}
          />
        )}

        <ConfirmDialog
          isOpen={deleteConfirm.show}
          title="Xác nhận xóa"
          message="Bạn có chắc muốn xóa khóa học này? Hành động này không thể hoàn tác."
          confirmLabel="Xóa"
          cancelLabel="Hủy"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm({ show: false, id: "" })}
        />

        {showForm ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_11rem] md:items-start">
            <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
                  {editing ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
                </h2>
                <Button variant="ghost" isIconOnly size="sm" onClick={closeForm}>
                  <X size={20} className="text-gray-500" />
                </Button>
              </div>

              <form id="academy-course-form" onSubmit={handleSubmit} className="space-y-5">
                <div id="field-title">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tên khóa học <span style={{ color: colors.primary.DEFAULT }}>*</span>
                  </label>
                  <input
                    value={form.title}
                    onChange={(event) => updateForm("title", event.target.value)}
                    placeholder="Nhập tên khóa học"
                    className={`${inputBaseClass} ${fieldErrors.title ? errorInputClass : ""}`}
                  />
                  {fieldErrors.title && (
                    <p className="mt-1 text-xs text-red-500">{fieldErrors.title}</p>
                  )}
                </div>

                <div id="field-imageMediaId">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Ảnh khóa học</label>
                  {form.imageUrl ? (
                    <div className="mb-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                        <img src={form.imageUrl} alt="Course preview" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <p className="min-w-0 truncate text-sm text-gray-600">
                          {imageFile?.name || "Ảnh hiện tại"}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            updateForm("imageUrl", "");
                            updateForm("imageMediaId", null);
                          }}
                          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-red-300 hover:text-red-600"
                        >
                          Xóa ảnh
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <label
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDraggingImage(true);
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault();
                      setIsDraggingImage(false);
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      setIsDraggingImage(false);
                      const file = event.dataTransfer.files?.[0];
                      if (file) setImageFromFile(file);
                    }}
                    className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors ${
                      isDraggingImage
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <ImagePlus size={28} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Kéo thả ảnh vào đây hoặc{" "}
                      <span className="font-semibold" style={{ color: colors.primary.DEFAULT }}>
                        chọn file
                      </span>
                    </span>
                    <span className="text-xs text-gray-400">Hỗ trợ JPG, PNG, WEBP, GIF</span>
                    <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                  </label>
                </div>

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
                          onChange={() => toggleTag(tag.id)}
                          className="h-4 w-4 accent-[#C8102E]"
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
                      onChange={(value) => updateForm("description", value)}
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
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Ngày mở khóa
                    </label>
                    <input
                      type="date"
                      value={form.openingDate}
                      onChange={(event) => updateForm("openingDate", event.target.value)}
                      className={inputBaseClass}
                    />
                    <p className="mt-1 text-xs text-gray-400">Để trống nếu khóa học là COMING SOON.</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Trạng thái
                    </label>
                    <label className="flex h-[42px] items-center justify-between rounded-lg border border-gray-200 bg-white px-4">
                      <span className="text-sm text-gray-700">{form.isActive ? "Đang hiển thị" : "Đang ẩn"}</span>
                      <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(event) => updateForm("isActive", event.target.checked)}
                        className="h-4 w-4 accent-[#C8102E]"
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
                  onClick={closeForm}
                  disabled={isSaving}
                >
                  Hủy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 md:hidden">
              <Button type="button" variant="outline" size="sm" className="bg-white" onClick={closeForm}>
                Hủy
              </Button>
              <Button type="submit" form="academy-course-form" variant="primary" size="sm" disabled={isSaving || !isDirty}>
                {isSaving ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              <AdminListHeader
                title="Quản lý khóa học"
                subtitle={
                  meta.total > 0
                    ? `Hiển thị ${items.length} / ${meta.total} khóa học`
                    : "Không có khóa học nào"
                }
              >
                {canCreate && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="gap-2"
                    onClick={() =>
                      guard(
                        "academy.courses.all.create",
                        openCreate,
                        "Bạn không có quyền tạo khóa học.",
                      )
                    }
                  >
                    <Plus size={16} /> Tạo khóa học
                  </Button>
                )}
              </AdminListHeader>

              <AdminFilters
                footer={
                  <>
                    <p className="text-xs text-gray-500">
                      Trang {meta.page} / {meta.totalPages || 1}
                    </p>
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-[#C8102E]"
                    >
                      <X size={16} />
                      Xóa bộ lọc
                    </button>
                  </>
                }
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <SearchInput
                    value={searchInput}
                    onChange={setSearchInput}
                    placeholder="Tìm theo tên hoặc mô tả khóa học..."
                  />
                  <SelectField
                    value={filters.tagId ?? ""}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        tagId: value || undefined,
                        page: 1,
                      }))
                    }
                    placeholder="Tất cả tag"
                    options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                  />
                  <SelectField
                    value={filters.isActive ?? ""}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        isActive: value || undefined,
                        page: 1,
                      }))
                    }
                    placeholder="Tất cả trạng thái"
                    options={[
                      { value: "true", label: "Đang hiển thị" },
                      { value: "false", label: "Đang ẩn" },
                    ]}
                  />
                </div>
              </AdminFilters>

              {loading && <AdminLoading />}

              {!loading && items.length === 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                  <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                  <AdminEmptyState
                    message='Chưa có khóa học nào. Hãy bấm "Tạo khóa học" để thêm.'
                    className="!p-0"
                  />
                </div>
              )}

              {!loading && items.length > 0 && (
                <>
                  <div className="hidden md:block">
                    <AdminTable>
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <th className="w-16 px-5 py-3.5 text-left font-semibold text-gray-600">STT</th>
                          <th className="min-w-[280px] px-5 py-3.5 text-left font-semibold text-gray-600">Khóa học</th>
                          <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Tag</th>
                          <th className="whitespace-nowrap px-5 py-3.5 text-left font-semibold text-gray-600">Ngày mở</th>
                          <th className="whitespace-nowrap px-5 py-3.5 text-left font-semibold text-gray-600">Trạng thái</th>
                          {canManage && (
                            <th className="w-40 px-5 py-3.5 text-right font-semibold text-gray-600">
                              Thao tác
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {items.map((item, index) => (
                          <tr key={item.id} className="transition-colors hover:bg-gray-50/40">
                            <td className="px-5 py-4 font-medium text-gray-500">
                              {(meta.page - 1) * meta.limit + index + 1}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                  {item.imageMedia?.url ? (
                                    <img
                                      src={item.imageMedia.url}
                                      alt={item.title}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                                      <ImagePlus size={20} />
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="line-clamp-2 font-semibold text-gray-900">{item.title}</p>
                                  <p className="mt-1 text-xs text-gray-500">{formatDate(item.createdAt)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex max-w-[260px] flex-wrap gap-1.5">
                                {item.tags.length > 0 ? (
                                  item.tags.map((tag) => (
                                    <span
                                      key={tag.id}
                                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                    >
                                      {tag.name}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-gray-400">?</span>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-gray-600">
                              {item.openingDate ? formatDate(item.openingDate) : "COMING SOON"}
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                  item.isActive
                                    ? "bg-green-50 text-green-700"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {item.isActive ? "Hiển thị" : "Ẩn"}
                              </span>
                            </td>
                            {canManage && (
                              <td className="px-5 py-4">
                                <div className="flex items-center justify-end gap-2">
                                  {canUpdate && (
                                    <Button
                                      variant="ghost"
                                      isIconOnly
                                      size="md"
                                      onClick={() =>
                                        guard(
                                          "academy.courses.all.update",
                                          () => openEdit(item),
                                          "Bạn không có quyền chỉnh sửa khóa học.",
                                        )
                                      }
                                      title="Chỉnh sửa"
                                    >
                                      <Pencil size={15} className="text-gray-500" />
                                    </Button>
                                  )}
                                  {canDelete && (
                                    <Button
                                      variant="ghost"
                                      isIconOnly
                                      size="md"
                                      onClick={() =>
                                        guard(
                                          "academy.courses.all.delete",
                                          () => setDeleteConfirm({ show: true, id: item.id }),
                                          "Bạn không có quyền xóa khóa học.",
                                        )
                                      }
                                      title="Xóa"
                                      className="hover:!bg-red-50"
                                    >
                                      <Trash2 size={15} className="text-red-500" />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </AdminTable>
                  </div>

                  <div className="space-y-3 md:hidden">
                    {items.map((item) => (
                      <article key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex gap-3">
                          <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                            {item.imageMedia?.url ? (
                              <img src={item.imageMedia.url} alt={item.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-gray-400">
                                <ImagePlus size={20} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-2 text-sm font-bold text-gray-900">{item.title}</h3>
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                              <CalendarDays size={13} />
                              {item.openingDate ? formatDate(item.openingDate) : "COMING SOON"}
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                              <Tags size={13} />
                              {item.tags.length} tag
                            </div>
                          </div>
                        </div>
                        {canManage && (
                          <>
                            <div className="my-3 h-px bg-gray-100" />
                            <div className="flex justify-end gap-2">
                              {canUpdate && (
                                <Button variant="outline" size="sm" className="bg-white" onClick={() => openEdit(item)}>
                                  Sửa
                                </Button>
                              )}
                              {canDelete && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => setDeleteConfirm({ show: true, id: item.id })}
                                >
                                  Xóa
                                </Button>
                              )}
                            </div>
                          </>
                        )}
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          </>
        )}
      </div>
    </Section>
  );
}
