"use client";

import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import {
  Pencil,
  Trash2,
  Plus,
  Eye,
  Send,
  CheckCircle,
  RotateCcw,
  XCircle,
  History,
  Search,
  X,
  Loader2,
} from "lucide-react";
import type { JobFormData } from "./ApplyManageForm";
import type { JobStatus, JobFilters, PaginationMeta } from "@/types/api";

interface Props {
  jobs: JobFormData[];
  loading?: boolean;
  searchInput: string;
  filters: JobFilters;
  meta: PaginationMeta;
  locationOptions: { value: string; label: string }[];
  statusOptions: { value: string; label: string }[];
  onSearchChange: (value: string) => void;
  onFilterChange: (key: keyof JobFilters, value: JobFilters[typeof key]) => void;
  onPageChange: (page: number) => void;
  onEdit: (job: JobFormData) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onPreview?: (job: JobFormData) => void;
  onStatusChange?: (id: string, status: JobStatus) => void;
  onViewLogs?: (id: string) => void;
  canChangeStatus?: boolean;
}

function formatSalary(job: JobFormData): string {
  return job.salary?.trim() || "";
}

function formatDeadline(dateStr?: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const statusConfig: Record<JobStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "Bản nháp", color: "#6B7280", bg: "#F3F4F6" },
  open: { label: "Đang tuyển", color: "#059669", bg: "#D1FAE5" },
  closed: { label: "Đã đóng", color: "#DC2626", bg: "#FEE2E2" },
};

export function ApplyManageList({
  jobs,
  loading,
  searchInput,
  filters,
  meta,
  locationOptions,
  statusOptions,
  onSearchChange,
  onFilterChange,
  onEdit,
  onDelete,
  onAdd,
  onPreview,
  onStatusChange,
  onViewLogs,
  canChangeStatus = true,
}: Props) {
  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2
            className="text-xl font-black"
            style={{ color: colors.primary.navy.DEFAULT }}
          >
            Quản lý tin tuyển dụng
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {meta.total > 0
              ? `Hiển thị ${jobs.length} / ${meta.total} tin tuyển dụng`
              : "Không có tin tuyển dụng nào"}
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd} className="gap-2">
          <Plus size={16} />
          Tạo tin tuyển dụng
        </Button>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tiêu đề..."
              className={`${inputClass} pl-9`}
            />
          </div>

          {/* Location */}
          <div className="relative">
            <select
              value={filters.location || ""}
              onChange={(e) => onFilterChange("location", e.target.value || undefined)}
              className={`${inputClass} appearance-none cursor-pointer pr-9`}
            >
              {locationOptions.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={filters.status || ""}
              onChange={(e) => onFilterChange("status", e.target.value || undefined)}
              className={`${inputClass} appearance-none cursor-pointer pr-9`}
            >
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500">
            Trang {meta.page} / {meta.totalPages || 1}
          </p>
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onFilterChange("location", undefined);
              onFilterChange("status", undefined);
              onFilterChange("page", 1);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-[#C8102E]"
          >
            <X size={16} />
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-gray-400" />
        </div>
      )}

      {!loading && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 w-16">
                    STT
                  </th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[180px]">
                    Tên công việc
                  </th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">
                    Địa điểm
                  </th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">
                    Mức lương
                  </th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">
                    Hạn nộp
                  </th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">
                    Trạng thái
                  </th>
                  <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-48">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job, i) => {
                  const status = statusConfig[job.status];
                  return (
                    <tr
                      key={job.id ?? i}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      <td className="px-5 py-4 text-gray-500 font-medium">
                        {(meta.page - 1) * meta.limit + i + 1}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">{job.title}</p>
                      </td>
                      <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                        {job.location || "—"}
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {formatSalary(job)}
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {formatDeadline(job.deadline)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md"
                          style={{ color: status.color, backgroundColor: status.bg }}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {job.status === "draft" && onStatusChange && canChangeStatus && (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() => job.id && onStatusChange(job.id, "open")}
                              title="Đăng tuyển"
                              className="hover:!bg-green-50"
                            >
                              <CheckCircle size={15} className="text-green-600" />
                            </Button>
                          )}
                          {job.status === "open" && onStatusChange && canChangeStatus && (
                            <>
                              <Button
                                variant="ghost"
                                isIconOnly
                                size="md"
                                onClick={() => job.id && onStatusChange(job.id, "draft")}
                                title="Gỡ bài"
                                className="hover:!bg-amber-50"
                              >
                                <RotateCcw size={15} className="text-amber-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                isIconOnly
                                size="md"
                                onClick={() => job.id && onStatusChange(job.id, "closed")}
                                title="Đóng tuyển"
                                className="hover:!bg-red-50"
                              >
                                <XCircle size={15} className="text-red-500" />
                              </Button>
                            </>
                          )}
                          {job.status === "closed" && onStatusChange && canChangeStatus && (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() => job.id && onStatusChange(job.id, "open")}
                              title="Mở lại"
                              className="hover:!bg-green-50"
                            >
                              <Send size={15} className="text-green-600" />
                            </Button>
                          )}
                          {onPreview && (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() => onPreview(job)}
                              title="Xem trước"
                              className="hover:!bg-blue-50"
                            >
                              <Eye size={15} className="text-blue-600" />
                            </Button>
                          )}
                          {onViewLogs && (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() => job.id && onViewLogs(job.id)}
                              title="Lịch sử"
                              className="hover:!bg-purple-50"
                            >
                              <History size={15} className="text-purple-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => onEdit(job)}
                            title="Chỉnh sửa"
                          >
                            <Pencil size={15} className="text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() => job.id && onDelete(job.id)}
                            title="Xoá"
                            className="hover:!bg-red-50"
                          >
                            <Trash2 size={15} className="text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {jobs.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-gray-400"
                    >
                      Chưa có tin tuyển dụng nào. Hãy bấm &quot;Tạo tin tuyển dụng&quot; để thêm.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
