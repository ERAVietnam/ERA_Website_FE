"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { X, Loader2, Download, Trash2, FileText, Upload, ChevronDown } from "lucide-react";
import { formatDateTime } from "@/lib/date";
import { mediaApi } from "@/api/domains/media";
import { ApplicationStatusLogDialog } from "./ApplicationStatusLogDialog";
import { recruitmentApi } from "@/api/domains/recruitment";
import type { JobApplication, JobPosting, ApplicationStatus, UpdateApplicationInput, JobApplicationLog } from "@/types/api";

const STATUS_STEPS: { value: ApplicationStatus; label: string }[] = [
  { value: "new", label: "Mới nhận" },
  { value: "reviewing", label: "Đang xem xét" },
  { value: "contacting", label: "Đang liên hệ" },
  { value: "interview", label: "Phỏng vấn" },
  { value: "on_hold", label: "Chờ xem xét" },
  { value: "hired", label: "Đã tuyển" },
  { value: "rejected", label: "Từ chối" },
];

const STATUS_COLORS: Record<ApplicationStatus, { bg: string; text: string; border: string }> = {
  new: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  reviewing: { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE" },
  contacting: { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
  interview: { bg: "#ECFEFF", text: "#0891B2", border: "#A5F3FC" },
  on_hold: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  hired: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
  rejected: { bg: "#FEF2F2", text: "#B91C1C", border: "#FECACA" },
};

function formatLatestLog(log: JobApplicationLog | null): string {
  if (!log) return "";
  if (log.note) return log.note;
  if (log.fromStatus && log.toStatus) {
    const fromLabel = STATUS_STEPS.find((s) => s.value === log.fromStatus)?.label || log.fromStatus;
    const toLabel = STATUS_STEPS.find((s) => s.value === log.toStatus)?.label || log.toStatus;
    return `${fromLabel} - ${toLabel}`;
  }
  return "";
}

interface Props {
  application: JobApplication;
  jobs: JobPosting[];
  onSave: (data: UpdateApplicationInput) => void | Promise<void>;
  onStatusChange: (status: ApplicationStatus) => void | Promise<void>;
  onLogCreate: (data: { status?: ApplicationStatus; fromStatus?: ApplicationStatus; toStatus?: ApplicationStatus; note: string }) => void | Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
  canUpdate?: boolean;
  canDelete?: boolean;
}

export function ApplicationsManageForm({
  application,
  jobs,
  onSave,
  onStatusChange,
  onLogCreate,
  onCancel,
  onDelete,
  canUpdate = true,
  canDelete = false,
}: Props) {
  const [form, setForm] = useState<UpdateApplicationInput & { cvFile: File | null }>({
    jobPostingId: application.jobPostingId,
    fullName: application.fullName,
    phone: application.phone,
    email: application.email || "",
    portfolioUrl: application.portfolioUrl || "",
    cvMediaId: application.cvMediaId || undefined,
    cvFile: null,
  });
  const [status, setStatus] = useState<ApplicationStatus>(application.status);
  const [isSaving, setIsSaving] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [statusDialog, setStatusDialog] = useState<{ status: ApplicationStatus; label: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [logs, setLogs] = useState<JobApplicationLog[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadLogs = useCallback(async () => {
    try {
      const data = await recruitmentApi.getApplicationLogs(application.id);
      setLogs(data);
    } catch {
      setLogs([]);
    }
  }, [application.id]);

  useEffect(() => {
    setForm({
      jobPostingId: application.jobPostingId,
      fullName: application.fullName,
      phone: application.phone,
      email: application.email || "",
      portfolioUrl: application.portfolioUrl || "",
      cvMediaId: application.cvMediaId || undefined,
      cvFile: null,
    });
    setStatus(application.status);
    loadLogs();
  }, [application, loadLogs]);

  const initialForm = useMemo(
    () => ({
      jobPostingId: application.jobPostingId,
      fullName: application.fullName,
      phone: application.phone,
      email: application.email || "",
      portfolioUrl: application.portfolioUrl || "",
      cvMediaId: application.cvMediaId || undefined,
    }),
    [application],
  );

  const isDirty = useMemo(() => {
    return (
      form.fullName !== initialForm.fullName ||
      form.phone !== initialForm.phone ||
      form.email !== initialForm.email ||
      form.portfolioUrl !== initialForm.portfolioUrl ||
      form.jobPostingId !== initialForm.jobPostingId ||
      form.cvMediaId !== initialForm.cvMediaId ||
      form.cvFile !== null
    );
  }, [form, initialForm]);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => (prev[key] ? { ...prev, [key]: "" } : prev));
  };

  const handleStatusClick = (nextStatus: ApplicationStatus, label: string) => {
    if (!canUpdate) return;
    setStatusDialog({ status: nextStatus, label });
  };

  const handleStatusDialogConfirm = async (note: string) => {
    if (!statusDialog) return;
    setIsStatusLoading(true);
    try {
      if (statusDialog.status !== status) {
        await onStatusChange(statusDialog.status);
        await onLogCreate({ fromStatus: status, toStatus: statusDialog.status, note });
        setStatus(statusDialog.status);
      } else {
        await onLogCreate({ status, note });
      }
      await loadLogs();
      setStatusDialog(null);
    } finally {
      setIsStatusLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!form.fullName?.trim()) errors.fullName = "Vui lòng nhập họ và tên";
    if (!form.phone?.trim()) errors.phone = "Vui lòng nhập số điện thoại";
    if (!form.jobPostingId) errors.jobPostingId = "Vui lòng chọn vị trí ứng tuyển";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      let cvMediaId = form.cvMediaId;
      if (form.cvFile) {
        const uploaded = await mediaApi.uploadFile(form.cvFile, "recruitment");
        cvMediaId = uploaded.id;
      }

      await onSave({
        jobPostingId: form.jobPostingId,
        fullName: form.fullName,
        phone: form.phone,
        email: form.email || undefined,
        portfolioUrl: form.portfolioUrl || undefined,
        cvMediaId,
      });

      setForm((prev) => ({ ...prev, cvFile: null }));
    } finally {
      setIsSaving(false);
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
  const errorInputClass = "border-red-300 focus:border-red-400 bg-red-50/30";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  const currentStatusIndex = STATUS_STEPS.findIndex((s) => s.value === status);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_11rem] gap-6 items-start">
      {/* Main form */}
      <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
            Chi tiết ứng viên
          </h2>
          <Button variant="ghost" isIconOnly size="sm" onClick={handleCancelRequest}>
            <X size={20} className="text-gray-500" />
          </Button>
        </div>

        {/* Timeline status */}
        <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Trạng thái đơn ứng tuyển</h3>
            {logs.length > 0 && (
              <span className="inline-flex items-center text-xs text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1">
                {formatLatestLog(logs[0])}
              </span>
            )}
          </div>
          <div className="relative">
            <div className="overflow-x-auto pb-2">
              <div className="flex items-start min-w-[600px]">
                {STATUS_STEPS.map((step, index) => {
                  const isActive = index <= currentStatusIndex;
                  const isCurrent = step.value === status;
                  const color = STATUS_COLORS[step.value];
                  return (
                    <div key={step.value} className="flex-1 flex flex-col items-center relative group">
                      {index > 0 && (
                        <div
                          className="absolute top-4 -left-1/2 w-full h-0.5 -translate-y-1/2"
                          style={{ backgroundColor: isActive ? color.border : "#E5E7EB" }}
                        />
                      )}
                      <button
                        type="button"
                        disabled={!canUpdate || isStatusLoading}
                        onClick={() => handleStatusClick(step.value, step.label)}
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                          isCurrent
                            ? "ring-2 ring-offset-2"
                            : ""
                        } ${!canUpdate || isStatusLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:scale-105"}`}
                        style={{
                          backgroundColor: isActive ? color.bg : "#F3F4F6",
                          borderColor: isActive ? color.border : "#E5E7EB",
                          color: isActive ? color.text : "#9CA3AF",
                          ["--tw-ring-color" as string]: isCurrent ? color.border : undefined,
                        }}
                      >
                        {index + 1}
                      </button>
                      <span
                        className={`mt-2 text-xs font-medium text-center px-1 ${
                          isCurrent ? "font-bold" : ""
                        }`}
                        style={{ color: isCurrent ? color.text : "#6B7280" }}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {isStatusLoading && (
            <p className="mt-3 text-xs text-gray-500 flex items-center gap-1.5">
              <Loader2 size={12} className="animate-spin" /> Đang cập nhật trạng thái...
            </p>
          )}
        </div>

        {/* Info form */}
        <form id="application-form" onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-700">Thông tin ứng viên</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div id="field-fullName">
              <label className={labelClass}>
                Họ và tên <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                disabled={!canUpdate}
                className={`${inputClass} ${fieldErrors.fullName ? errorInputClass : ""} ${!canUpdate ? "bg-gray-50" : ""}`}
                placeholder="Nhập họ và tên"
              />
              {fieldErrors.fullName && <p className="mt-1 text-xs text-red-500">{fieldErrors.fullName}</p>}
            </div>

            <div id="field-phone">
              <label className={labelClass}>
                Số điện thoại <span style={{ color: colors.primary.DEFAULT }}>*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                disabled={!canUpdate}
                className={`${inputClass} ${fieldErrors.phone ? errorInputClass : ""} ${!canUpdate ? "bg-gray-50" : ""}`}
                placeholder="090x xxx xxx"
              />
              {fieldErrors.phone && <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>}
            </div>
          </div>

          <div id="field-email">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={!canUpdate}
              className={`${inputClass} ${!canUpdate ? "bg-gray-50" : ""}`}
              placeholder="Nhập email"
            />
          </div>

          <div id="field-portfolioUrl">
            <label className={labelClass}>Link portfolio</label>
            <input
              type="url"
              value={form.portfolioUrl}
              onChange={(e) => update("portfolioUrl", e.target.value)}
              disabled={!canUpdate}
              className={`${inputClass} ${!canUpdate ? "bg-gray-50" : ""}`}
              placeholder="https://portfolio.com"
            />
          </div>

          <div id="field-jobPostingId">
            <label className={labelClass}>
              Vị trí ứng tuyển <span style={{ color: colors.primary.DEFAULT }}>*</span>
            </label>
            <div className="relative">
              <select
                value={form.jobPostingId}
                onChange={(e) => update("jobPostingId", e.target.value)}
                disabled={!canUpdate}
                className={`${inputClass} appearance-none cursor-pointer ${fieldErrors.jobPostingId ? errorInputClass : ""} ${!canUpdate ? "bg-gray-50" : ""}`}
              >
                <option value="" disabled>Chọn vị trí ứng tuyển</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
            {fieldErrors.jobPostingId && <p className="mt-1 text-xs text-red-500">{fieldErrors.jobPostingId}</p>}
          </div>

          <div>
            <label className={labelClass}>Ngày nộp</label>
            <input
              type="text"
              value={formatDateTime(application.appliedAt)}
              disabled
              className={`${inputClass} bg-gray-50`}
            />
          </div>

          <div>
            <label className={labelClass}>CV đính kèm</label>
            <div className="flex flex-wrap items-center gap-3">
              {application.cvMedia && !form.cvFile && (
                <a
                  href={application.cvMedia.url}
                  download={application.cvMedia.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FileText size={16} className="text-blue-500" />
                  <span className="truncate max-w-[280px]">{application.cvMedia.filename}</span>
                </a>
              )}
              {form.cvFile && (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-sm font-medium text-blue-700">
                  <FileText size={16} />
                  {form.cvFile.name}
                </span>
              )}
              {canUpdate && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                >
                  <Upload size={16} />
                  {application.cvMedia ? "Thay đổi CV" : "Tải lên CV"}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    update("cvFile", e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Sidebar actions */}
      <div className="hidden md:block sticky top-20 self-start">
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm gap-3">
          <button
            type="submit"
            form="application-form"
            disabled={isSaving || !isDirty || !canUpdate}
            className="inline-flex items-center justify-center gap-2 w-full font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md px-4 py-2 text-sm bg-white border-2"
            style={{ borderColor: colors.primary.navy.DEFAULT, color: colors.primary.navy.DEFAULT }}
            onMouseEnter={(e) => {
              if (isDirty && canUpdate) {
                e.currentTarget.style.backgroundColor = colors.primary.navy.DEFAULT;
                e.currentTarget.style.color = colors.neutral.white;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.neutral.white;
              e.currentTarget.style.color = colors.primary.navy.DEFAULT;
            }}
          >
            {isSaving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            )}
            {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>

          {application.cvMedia && !form.cvFile && (
            <a
              href={application.cvMedia.url}
              download={application.cvMedia.filename}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-md"
            >
              <Download size={15} />
              Tải CV
            </a>
          )}

          {canDelete && onDelete && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-600 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white hover:shadow-md"
            >
              <Trash2 size={15} />
              Xóa
            </button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full justify-center bg-white"
            onClick={handleCancelRequest}
            disabled={isSaving || isStatusLoading}
          >
            Huỷ
          </Button>
        </div>
      </div>

      {statusDialog && (
        <ApplicationStatusLogDialog
          applicationId={application.id}
          status={statusDialog.status}
          statusLabel={statusDialog.label}
          isCurrent={statusDialog.status === status}
          isOpen={!!statusDialog}
          onClose={() => setStatusDialog(null)}
          onConfirm={handleStatusDialogConfirm}
          isLoading={isStatusLoading}
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
        isOpen={showDeleteConfirm}
        title="Xác nhận xóa"
        message="Bạn có chắc muốn xóa đơn ứng tuyển này? Hành động này không thể hoàn tác."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete?.();
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
