"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { X, Loader2, Eye, CheckCircle } from "lucide-react";
import { ApplyJobPreviewDialog } from "./ApplyJobPreviewDialog";

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

const salaryTypes = [
  { value: "", label: "—" },
  { value: "competitive", label: "Cạnh tranh" },
  { value: "negotiable", label: "Thỏa thuận" },
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
  salaryHourly?: string;
  salaryType: "" | "competitive" | "negotiable";
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
    salaryHourly: initialData?.salaryHourly ?? "",
    salaryType: initialData?.salaryType ?? "",
    workingTime: initialData?.workingTime ?? "",
    quantity: initialData?.quantity ?? 1,
    deadline: initialData?.deadline ?? "",
    status: initialData?.status ?? "draft",
    description: initialData?.description ?? "",
    requirements: initialData?.requirements ?? "",
    benefits: initialData?.benefits ?? "",
  };
}

export function ApplyManageForm({ initialData, onSave, onCancel, onPublish }: Props) {
  const [form, setForm] = useState<JobFormData>(() => buildInitialForm(initialData));
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const initialForm = useMemo(() => buildInitialForm(initialData), [initialData]);

  useEffect(() => {
    setForm(buildInitialForm(initialData));
  }, [initialData]);

  const isDirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(initialForm), [form, initialForm]);

  const update = <K extends keyof JobFormData>(key: K, value: JobFormData[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && (!prev.slug || prev.slug === toSlug(prev.title))) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const hasSalary = (form.salary ?? "").trim() !== "";
  const hasSalaryHourly = (form.salaryHourly ?? "").trim() !== "";
  const isSalaryTyped = form.salaryType !== "";

  const isSalaryDisabled = isSalaryTyped || hasSalaryHourly;
  const isSalaryHourlyDisabled = isSalaryTyped || hasSalary;
  const isSalaryTypeDisabled = hasSalary || hasSalaryHourly;

  const handleSalaryChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      salary: value,
      salaryHourly: value ? "" : prev.salaryHourly,
      salaryType: value ? "" : prev.salaryType,
    }));
  };

  const handleSalaryHourlyChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      salaryHourly: value,
      salary: value ? "" : prev.salary,
      salaryType: value ? "" : prev.salaryType,
    }));
  };

  const handleSalaryTypeChange = (value: JobFormData["salaryType"]) => {
    setForm((prev) => ({
      ...prev,
      salaryType: value,
      salary: value ? "" : prev.salary,
      salaryHourly: value ? "" : prev.salaryHourly,
    }));
  };

  const submitButton = (
    <button
      type="submit"
      form="job-form"
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
            <div>
              <label className={labelClass}>
                Tên công việc <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Ví dụ: Chuyên Viên Marketing Dự Án"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className={labelClass}>
                Slug <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.slug}
                onChange={(e) => update("slug", toSlug(e.target.value))}
                placeholder="chuyen-vien-marketing-du-an"
                required
              />
            </div>

            {/* Location + Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  Địa điểm <span style={{ color: colors.primary.DEFAULT }}>*</span>
                </label>
                <select
                  className={`${inputClass} appearance-none cursor-pointer`}
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  required
                >
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Số lượng</label>
                <input
                  type="number"
                  min={1}
                  className={inputClass}
                  value={form.quantity}
                  onChange={(e) => update("quantity", parseInt(e.target.value || "1", 10))}
                />
              </div>
            </div>

            {/* Deadline + Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Hạn nộp hồ sơ</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Loại hình <span style={{ color: colors.primary.DEFAULT }}>*</span>
                </label>
                <select
                  className={`${inputClass} appearance-none cursor-pointer`}
                  value={form.type}
                  onChange={(e) => update("type", e.target.value)}
                  required
                >
                  {types.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Work mode + Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Hình thức làm việc</label>
                <select
                  className={`${inputClass} appearance-none cursor-pointer`}
                  value={form.workMode}
                  onChange={(e) => update("workMode", e.target.value)}
                >
                  {workModes.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Kinh nghiệm</label>
                <input
                  type="text"
                  className={inputClass}
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  placeholder="Ví dụ: 1 - 3 năm"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className={labelClass}>Mức lương</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative">
                  <input
                    type="text"
                    className={`${inputClass} w-full pr-[5.5rem] ${isSalaryDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
                    value={form.salary}
                    onChange={(e) => handleSalaryChange(e.target.value)}
                    placeholder="12 hoặc 12 - 14"
                    disabled={isSalaryDisabled}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                    triệu VND
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className={`${inputClass} w-full pr-[6.5rem] ${isSalaryHourlyDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
                    value={form.salaryHourly}
                    onChange={(e) => handleSalaryHourlyChange(e.target.value)}
                    placeholder="25 hoặc 25 - 30"
                    disabled={isSalaryHourlyDisabled}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                    K VND / giờ
                  </span>
                </div>
                <div>
                  <select
                    className={`${inputClass} appearance-none cursor-pointer w-full ${isSalaryTypeDisabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
                    value={form.salaryType}
                    onChange={(e) =>
                      handleSalaryTypeChange(e.target.value as JobFormData["salaryType"])
                    }
                    disabled={isSalaryTypeDisabled}
                  >
                    {salaryTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Rich text fields */}
            <div>
              <label className={labelClass}>Mô tả công việc</label>
              <RichEditor value={form.description} onChange={(val) => update("description", val)} disableImage />
            </div>

            <div>
              <label className={labelClass}>Yêu cầu ứng viên</label>
              <RichEditor value={form.requirements} onChange={(val) => update("requirements", val)} disableImage />
            </div>

            <div>
              <label className={labelClass}>Quyền lợi</label>
              <RichEditor value={form.benefits} onChange={(val) => update("benefits", val)} disableImage disableFontColor />
            </div>

            <div>
              <label className={labelClass}>Thờі gian làm việc</label>
              <RichEditor value={form.workingTime} onChange={(val) => update("workingTime", val)} disableImage disableFontColor />
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
          {initialData?.id && initialData?.status === "draft" && onPublish && (
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
