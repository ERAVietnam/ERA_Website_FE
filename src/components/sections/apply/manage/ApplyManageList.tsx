"use client";

import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
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
  X,
} from "lucide-react";
import type { JobFormData } from "./ApplyManageForm";
import type { JobStatus, JobFilters, PaginationMeta } from "@/types/api";
import { recruitmentStatusConfig } from "@/lib/recruitment/status";
import { formatDateShort } from "@/lib/date";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { SelectField } from "@/components/ui/admin/SelectField";

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
  const { hasPermission } = useAuth();
  const canView = hasPermission("recruitment.jobs.all.view");
  const canCreate = hasPermission("recruitment.jobs.all.create");
  const canUpdate = hasPermission("recruitment.jobs.all.update");
  const canDelete = hasPermission("recruitment.jobs.all.delete");
  const canPublish = hasPermission("recruitment.jobs.all.publish");
  const showActionsColumn = canView || canUpdate || canDelete || canPublish;

  return (
    <div className="space-y-5">
      <AdminListHeader
        title="Quản lý tin tuyển dụng"
        subtitle={meta.total > 0 ? `Hiển thị ${jobs.length} / ${meta.total} tin tuyển dụng` : "Không có tin tuyển dụng nào"}
      >
        {canCreate && (
          <Button variant="primary" size="sm" onClick={onAdd} className="gap-2">
            <Plus size={16} />
            Tạo tin tuyển dụng
          </Button>
        )}
      </AdminListHeader>

      <AdminFilters
        footer={
          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onFilterChange("location", undefined);
              onFilterChange("status", undefined);
              onFilterChange("page", 1);
            }}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-[#C8102E]"
          >
            <X size={16} />
            Xóa bộ lọc
          </button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SearchInput
            value={searchInput}
            onChange={onSearchChange}
            placeholder="Tìm theo tiêu đề..."
          />

          <SelectField
            value={filters.location || ""}
            onChange={(value) => onFilterChange("location", value || undefined)}
            placeholder="Tất cả địa điểm"
            options={locationOptions.filter((loc) => loc.value !== "").map((loc) => ({ value: loc.value, label: loc.label }))}
          />

          <SelectField
            value={filters.status || ""}
            onChange={(value) => onFilterChange("status", value || undefined)}
            placeholder="Tất cả trạng thái"
            options={statusOptions.filter((s) => s.value !== "").map((s) => ({ value: s.value, label: s.label }))}
          />
        </div>

      </AdminFilters>

      {loading && <AdminLoading />}

      {!loading && (
        <AdminTable>
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
                  {showActionsColumn && (
                    <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-48">
                      Thao tác
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job, i) => {
                  const status = recruitmentStatusConfig[job.status];
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
                        {formatDateShort(job.deadline) || "—"}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md"
                          style={{ color: status.color, backgroundColor: status.bg }}
                        >
                          {status.label}
                        </span>
                      </td>
                      {showActionsColumn && (
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {canPublish && onStatusChange && (
                              <>
                                {job.status === "draft" && (
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
                                {job.status === "open" && (
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
                                {job.status === "closed" && (
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
                              </>
                            )}
                            {canView && onPreview && (
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
                            {canView && onViewLogs && (
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
                            {canUpdate && (
                              <Button
                                variant="ghost"
                                isIconOnly
                                size="md"
                                onClick={() => onEdit(job)}
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
                                onClick={() => job.id && onDelete(job.id)}
                                title="Xoá"
                                className="hover:!bg-red-50"
                              >
                                <Trash2 size={15} className="text-red-500" />
                              </Button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={showActionsColumn ? 7 : 6}>
                      <AdminEmptyState message="Chưa có tin tuyển dụng nào. Hãy bấm &quot;Tạo tin tuyển dụng&quot; để thêm." />
                    </td>
                  </tr>
                )}
              </tbody>
          </AdminTable>
        )}
    </div>
  );
}
