"use client";

import { useMemo, useState } from "react";
import { academyCoursesApi } from "@/api/domains/academy-courses";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { Section } from "@/components/ui/Section";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useAdminList } from "@/hooks/useAdminList";
import { showFieldError } from "@/lib/api-errors";
import { compressAndUploadImage } from "@/lib/uploadImage";
import type {
  AcademyCourse,
  AcademyCourseFilters,
  AcademyCourseTag,
} from "@/types/api";
import { AcademyCourseForm } from "./AcademyCourseForm";
import { AcademyCourseList } from "./AcademyCourseList";
import { DEFAULT_LIMIT, courseToFormState, stripHtml, type CourseFormState } from "./types";

export default function AcademyCourseManagePage() {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const [tags, setTags] = useState<AcademyCourseTag[]>([]);
  const {
    items,
    setItems,
    loading,
    meta,
    filters,
    setFilters,
    fetchItems: loadData,
  } = useAdminList<AcademyCourse, AcademyCourseFilters>(
    async (currentFilters) => {
      const [coursesResponse, tagsResponse] = await Promise.all([
        academyCoursesApi.getCourses(currentFilters),
        academyCoursesApi.getTags(),
      ]);
      setTags(tagsResponse);
      return coursesResponse;
    },
    {
      initialFilters: { page: 1, limit: DEFAULT_LIMIT },
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
  const [editing, setEditing] = useState<AcademyCourse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<CourseFormState>(() => courseToFormState());
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({
    show: false,
    id: "",
  });

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
      showError("File ảnh phải là hình ảnh.");
      return;
    }
    setImageFile(file);
    updateForm("imageUrl", URL.createObjectURL(file));
    updateForm("imageMediaId", null);
  };

  const handleImageClear = () => {
    setImageFile(null);
    updateForm("imageUrl", "");
    updateForm("imageMediaId", null);
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
    closePopup();

    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSaving(true);
    try {
      let imageMediaId = form.imageMediaId;
      if (imageFile) {
        const upload = await compressAndUploadImage(imageFile, "academy", {
          maxSizeMB: 1,
          maxWidthOrHeight: 1400,
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

      showSuccess(editing ? "Cập nhật khóa học thành công." : "Tạo khóa học thành công.");
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
      handleApiError(err, {
        onFieldError: (field, message) => showFieldError(field, message, setFieldErrors),
      });
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
      showSuccess("Xóa khóa học thành công.");
      setItems((prev) => prev.filter((item) => item.id !== id));
      loadData().catch(() => {});
    } catch (err) {
      handleApiError(err);
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
            onClose={closePopup}
            autoClose={popup.type === "success"}
            autoCloseMs={1000}
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
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ show: false, id: "" })}
      />

        {showForm ? (
          <AcademyCourseForm
            editing={editing}
            form={form}
            tags={tags}
            fieldErrors={fieldErrors}
            imageFile={imageFile}
            isSaving={isSaving}
            isDirty={isDirty}
            inputBaseClass={inputBaseClass}
            errorInputClass={errorInputClass}
            onSubmit={handleSubmit}
            onClose={closeForm}
            onUpdateForm={updateForm}
            onToggleTag={toggleTag}
            onImageSelect={setImageFromFile}
            onImageClear={handleImageClear}
          />
        ) : (
          <AcademyCourseList
            items={items}
            tags={tags}
            loading={loading}
            meta={meta}
            searchInput={searchInput}
            filters={filters}
            canCreate={canCreate}
            canUpdate={canUpdate}
            canDelete={canDelete}
            canManage={canManage}
            onSearchChange={setSearchInput}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
            onCreate={openCreate}
            onEdit={openEdit}
            onDelete={(id) => setDeleteConfirm({ show: true, id })}
            guard={guard}
          />
        )}
      </div>
    </Section>
  );
}
