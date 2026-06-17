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
} from "lucide-react";
import type { JobFormData } from "./ApplyManageForm";
import type { JobStatus } from "@/types/api";

interface Props {
  jobs: JobFormData[];
  onEdit: (job: JobFormData) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onPreview?: (job: JobFormData) => void;
  onStatusChange?: (id: string, status: JobStatus) => void;
}

function formatSalary(job: JobFormData): string {
  const { salary, salaryHourly, salaryType } = job;

  if (salaryType === "competitive") return "Cạnh tranh";
  if (salaryType === "negotiable") return "Thỏa thuận";

  if (salary?.trim()) return `${salary.trim()} triệu VND`;
  if (salaryHourly?.trim()) return `${salaryHourly.trim()} K VND / giờ`;

  return "—";
}

const statusConfig: Record<JobStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "Bản nháp", color: "#6B7280", bg: "#F3F4F6" },
  open: { label: "Đang tuyển", color: "#059669", bg: "#D1FAE5" },
  closed: { label: "Đã đóng", color: "#DC2626", bg: "#FEE2E2" },
};

export function ApplyManageList({
  jobs,
  onEdit,
  onDelete,
  onAdd,
  onPreview,
  onStatusChange,
}: Props) {
  const badgeColor = (type: string) => {
    if (type.includes("Toàn")) return { bg: "#fee2e2", text: "#b91c1c" };
    if (type.includes("Bán")) return { bg: "#dbeafe", text: "#1d4ed8" };
    return { bg: "#fef3c7", text: "#b45309" };
  };

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
            {jobs.length > 0
              ? `Hiển thị ${jobs.length} tin tuyển dụng`
              : "Không có tin tuyển dụng nào"}
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={onAdd} className="gap-2">
          <Plus size={16} />
          Tạo tin tuyển dụng
        </Button>
      </div>

      {/* Table */}
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
                  Loại hình
                </th>
                <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">
                  Hình thức
                </th>
                <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">
                  Mức lương
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
                const style = badgeColor(job.type);
                const status = statusConfig[job.status];
                return (
                  <tr
                    key={job.id ?? i}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-5 py-4 text-gray-500 font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900">{job.title}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      {job.location || "—"}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className="inline-block rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        {job.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {job.workMode || "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {formatSalary(job)}
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
                        {job.status === "draft" && onStatusChange && (
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
                        {job.status === "open" && onStatusChange && (
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
                        {job.status === "closed" && onStatusChange && (
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
                    colSpan={8}
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
    </div>
  );
}
