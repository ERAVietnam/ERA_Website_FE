"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { SelectField } from "@/components/ui/admin/SelectField";
import { X, Loader2, Eye, CheckCircle, History } from "lucide-react";
import { ApplyJobPreviewDialog } from "./ApplyJobPreviewDialog";
import { createJobSchema } from "@/schemas/recruitment.schema";

const RichEditor = dynamic(
  () => import("@/components/shared/RichEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-3 border-gray-300 border-t-primary" />
        <p className="mt-3 text-sm text-gray-400">Đang tải trình soạn thảo...</p>
      </div>
    ),
  }
);

const locations = [
  { value: "", label: "Chọn địa điểm" },
  { value: "TP. HCM", label: "TP. Hồ Chí Minh" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
  { value: "Nha Trang", label: "Nha Trang" },
];

const types = [
  { value: "", label: "Chọn loại hình" },
  { value: "Toàn thờі gian", label: "Toàn thờі gian" },
  { value: "Bán thờі gian", label: "Bán thờі gian" },
  { value: "Thực tập", label: "Thực tập" },
];

const workModes = [
  { value: "", label: "Chọn hình thức" },
  { value: "Tại văn phòng", label: "Tại văn phòng" },
  { value: "Làm việc từ xa", label: "Làm việc từ xa" },
  { value: "Hybrid", label: "Hybrid (Linh hoạt)" },
];

export interface JobFormData {
  id?: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  workMode: string;
  experience: string;
  salary?: string;
  workingTime: string;
  quantity: number;
  deadline: string;
  status: "draft" | "open" | "closed";
  description: string;
  requirements: string;
  benefits: string;
}

interface Props {
  initialData?: JobFormData;
  onSave: (data: JobFormData) => void;
  onCancel: () => void;
  onPublish?: () => void;
  onViewLogs?: () => void;
  canPublish?: boolean;
}

function isDeadlineInPast(deadline: string): boolean {
  if (!deadline) return false;
  const [year, month, day] = deadline.split("-").map(Number);
  const today = new Date();
  const deadlineDate = new Date(year, month - 1, day);
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return deadlineDate < todayDate;
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

function buildInitialForm(initialData?: JobFormData): JobFormData {
  return {
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    location: initialData?.location ?? "",
    type: initialData?.type ?? "",
    workMode: initialData?.workMode ?? "",
    experience: initialData?.experience ?? "",
    salary: initialData?.salary ?? "",
    workingTime: initialData?.workingTime ?? "",
    quantity: initialData?.quantity ?? 1,
    deadline: initialData?.deadline ?? "",
    status: initialData?.status ?? "draft",
    description: initialData?.description ?? "",
    requirements: initialData?.requirements ?? "",
    benefits: initialData?.benefits ?? "",
  };
}

export function ApplyManageForm({ initialData, onSave, onCancel, onPublish, onViewLogs, canPublish = true }: Props) {
  const [form, setForm] = useState<JobFormData>(() => buildInitialForm(initialData));
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [quantityInput, setQuantityInput] = useState(String(form.quantity));

  const initialForm = useMemo(() => buildInitialForm(initialData), [initialData]);

  useEffect(() => {
    queueMicrotask(() => setForm(buildInitialForm(initialData)));
  }, [initialData]);

  useEffect(() => {
    queueMicrotask(() => setQuantityInput(String(form.quantity)));
  }, [form.quantity]);

  const isDirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(initialForm), [form, initialForm]);

  const update = <K extends keyof JobFormData>(key: K, value: JobFormData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && (!prev.slug || prev.slug === toSlug(prev.title))) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const validation = createJobSchema.safeParse(form);

    // Tin đang mở không được có hạn nộp trong quá khứ
    if (form.status === "open" && form.deadline && isDeadlineInPast(form.deadline)) {
      setFieldErrors((prev) => ({
        ...prev,
        deadline: "Hạn nộp không được trong quá khứ đối với tin đang mở",
      }));
      const element = document.getElementById("field-deadline");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        const focusable = element.querySelector("input") as HTMLElement | null;
        if (focusable) focusable.focus();
      }
      return;
    }

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
          const focusable = element.querySelector(
            'input, textarea, select, [contenteditable="true"]',
          ) as HTMLElement | null;
          if (focusable) focusable.focus();
        }
      }
      return;
    }

    setIsLoading(true);
    try {
      await onSave({ ...form, id: initialData?.id });
    } finally {
      setIsLoading(false);
    }
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

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors outline-none focus:border-gray-400";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const errorInputClass = "border-red-300 focus:border-red-400 bg-red-50/30";

  const handleSalaryChange = (value: string) => {
    update("salary", value);
  };

  const handleQuantityChange = (value: string) => {
    setQuantityInput(value);
    const num = parseInt(value, 10);
    if (!Number.isNaN(num) && value !== "") {
      update("quantity", num);
    }
  };

  const handleQuantityBlur = () => {
    const num = parseInt(quantityInput || "1", 10);
    const valid = Math.max(1, num);
    update("quantity", valid);
    setQuantityInput(String(valid));
  };

  const submitButton = (
    <button
      type="submit"
      form="job-form"
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
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_11rem] gap-6 items-start">
      {/* Main form content */}
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
            {initialData ? "Chỉnh sửa tin tuyển dụng" : "Thêm tin tuyển dụng"}
          </h2>
          <Button variant="ghost" isIconOnly size="sm" onClick={handleCancelRequest}>
            <X size={20} className="text-gray-500" />
          </Button>
        </div>

        <form id="job-form" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Title */}
            <div id="field-title">
              <label className={labelClass}>
                Tên công việc <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <input
                type="text"
                className={`${inputClass} ${fieldErrors.title ? errorInputClass : ""}`}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Ví dụ: Chuyên Viên Marketing Dự Án"
              />
              {fieldErrors.title && <p className="mt-1 text-xs text-red-500">{fieldErrors.title}</p>}
            </div>

            {/* Slug */}
            <div id="field-slug">
              <label className={labelClass}>
                Slug <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <input
                type="text"
                className={`${inputClass} ${fieldErrors.slug ? errorInputClass : ""}`}
                value={form.slug}
                onChange={(e) => update("slug", toSlug(e.target.value))}
                placeholder="chuyen-vien-marketing-du-an"
              />
              {fieldErrors.slug && <p className="mt-1 text-xs text-red-500">{fieldErrors.slug}</p>}
            </div>

            {/* Location + Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div id="field-location">
                <label className={labelClass}>
                  Địa điểm <span style={{ color: colors.primary.DEFAULT }}>*</span>
                </label>
                <SelectField
                  value={form.location}
                  onChange={(value) => update("location", value)}
                  placeholder="Chọn địa điểm"
                  error={!!fieldErrors.location}
                  options={locations.slice(1)}
                />
                {fieldErrors.location && <p className="mt-1 text-xs text-red-500">{fieldErrors.location}</p>}
              </div>
              <div id="field-quantity">
                <label className={labelClass}>Số lượng</label>
                <input
                  type="number"
                  min={1}
                  className={`${inputClass} ${fieldErrors.quantity ? errorInputClass : ""}`}
                  value={quantityInput}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  onBlur={handleQuantityBlur}
                />
                {fieldErrors.quantity && <p className="mt-1 text-xs text-red-500">{fieldErrors.quantity}</p>}
              </div>
            </div>

            {/* Deadline + Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div id="field-deadline">
                <label className={labelClass}>Hạn nộp hồ sơ</label>
                <input
                  type="date"
                  className={`${inputClass} ${fieldErrors.deadline ? errorInputClass : ""}`}
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />
                {fieldErrors.deadline && <p className="mt-1 text-xs text-red-500">{fieldErrors.deadline}</p>}
              </div>
              <div id="field-type">
                <label className={labelClass}>
                  Loại hình <span style={{ color: colors.primary.DEFAULT }}>*</span>
                </label>
                <SelectField
                  value={form.type}
                  onChange={(value) => update("type", value)}
                  placeholder="Chọn loại hình"
                  error={!!fieldErrors.type}
                  options={types.slice(1)}
                />
                {fieldErrors.type && <p className="mt-1 text-xs text-red-500">{fieldErrors.type}</p>}
              </div>
            </div>

            {/* Work mode + Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div id="field-workMode">
                <label className={labelClass}>Hình thức làm việc</label>
                <SelectField
                  value={form.workMode}
                  onChange={(value) => update("workMode", value)}
                  placeholder="Chọn hình thức"
                  error={!!fieldErrors.workMode}
                  options={workModes.slice(1)}
                />
                {fieldErrors.workMode && <p className="mt-1 text-xs text-red-500">{fieldErrors.workMode}</p>}
              </div>
              <div id="field-experience">
                <label className={labelClass}>Kinh nghiệm</label>
                <input
                  type="text"
                  className={`${inputClass} ${fieldErrors.experience ? errorInputClass : ""}`}
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  placeholder="Ví dụ: 1 - 3 năm"
                />
                {fieldErrors.experience && <p className="mt-1 text-xs text-red-500">{fieldErrors.experience}</p>}
              </div>
            </div>

            {/* Salary */}
            <div id="field-salary">
              <label className={labelClass}>Mức lương</label>
              <input
                type="text"
                className={`${inputClass} ${fieldErrors.salary ? errorInputClass : ""}`}
                value={form.salary}
                onChange={(e) => handleSalaryChange(e.target.value)}
                placeholder="Ví dụ: 12 - 15 triệu, Thỏa thuận, Cạnh tranh..."
              />
              {fieldErrors.salary && <p className="mt-1 text-xs text-red-500">{fieldErrors.salary}</p>}
            </div>

            {/* Rich text fields */}
            <div id="field-description">
              <label className={labelClass}>
                Mô tả công việc <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <div className={`rounded-lg border overflow-hidden transition-colors ${fieldErrors.description ? "border-red-300 focus-within:border-red-400" : "border-gray-200 focus-within:border-gray-400"}`}>
                <RichEditor value={form.description} onChange={(val) => update("description", val)} disableImage />
              </div>
              {fieldErrors.description && <p className="mt-1 text-xs text-red-500">{fieldErrors.description}</p>}
            </div>

            <div id="field-requirements">
              <label className={labelClass}>
                Yêu cầu ứng viên <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <div className={`rounded-lg border overflow-hidden transition-colors ${fieldErrors.requirements ? "border-red-300 focus-within:border-red-400" : "border-gray-200 focus-within:border-gray-400"}`}>
                <RichEditor value={form.requirements} onChange={(val) => update("requirements", val)} disableImage />
              </div>
              {fieldErrors.requirements && <p className="mt-1 text-xs text-red-500">{fieldErrors.requirements}</p>}
            </div>

            <div id="field-benefits">
              <label className={labelClass}>
                Quyền lợi <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <div className={`rounded-lg border overflow-hidden transition-colors ${fieldErrors.benefits ? "border-red-300 focus-within:border-red-400" : "border-gray-200 focus-within:border-gray-400"}`}>
                <RichEditor value={form.benefits} onChange={(val) => update("benefits", val)} disableImage disableFontColor />
              </div>
              {fieldErrors.benefits && <p className="mt-1 text-xs text-red-500">{fieldErrors.benefits}</p>}
            </div>

            <div id="field-workingTime">
              <label className={labelClass}>Thờі gian làm việc</label>
              <div className="rounded-lg border border-gray-200 focus-within:border-gray-400 overflow-hidden transition-colors">
                <RichEditor value={form.workingTime} onChange={(val) => update("workingTime", val)} disableImage disableFontColor />
              </div>
            </div>

            {/* Mobile actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-gray-100 md:hidden">
              {submitButton}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Eye size={15} />
                Xem trước
              </button>
              {initialData?.id && onViewLogs && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={onViewLogs}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-purple-600 bg-white px-4 py-2 text-sm font-medium text-purple-600 transition-all duration-200 hover:bg-purple-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <History size={15} />
                  Lịch sử
                </button>
              )}
              <Button type="button" variant="outline" className="bg-white" onClick={handleCancelRequest}>
                Huỷ
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Sticky action sidebar — right */}
      <div className="hidden md:block sticky top-20 self-start">
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm gap-3">
          {submitButton}
          {initialData?.id && initialData?.status === "draft" && onPublish && canPublish && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="w-full justify-center gap-2"
              onClick={onPublish}
              disabled={isLoading}
            >
              <CheckCircle size={15} />
              Đăng tuyển
            </Button>
          )}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setShowPreview(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Eye size={15} />
            Xem trước
          </button>
          {initialData?.id && onViewLogs && (
            <button
              type="button"
              disabled={isLoading}
              onClick={onViewLogs}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-purple-600 bg-white px-4 py-2 text-sm font-medium text-purple-600 transition-all duration-200 hover:bg-purple-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              <History size={15} />
              Lịch sử
            </button>
          )}
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

      <ApplyJobPreviewDialog
        job={{ ...form, id: initialData?.id }}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />

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
    </div>
  );
}
