"use client";

import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { SelectField } from "@/components/ui/admin/SelectField";
import { Eye, FileText, Download, X, Trash2, Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { formatDateTime } from "@/lib/date";
import type { JobApplication, JobPosting, PaginationMeta, ApplicationStatus } from "@/types/api";

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "new", label: "Mới nhận" },
  { value: "reviewing", label: "Đang xem xét" },
  { value: "contacting", label: "Đang liên hệ" },
  { value: "interview", label: "Phỏng vấn" },
  { value: "on_hold", label: "Chờ xem xét" },
  { value: "hired", label: "Đã tuyển" },
  { value: "rejected", label: "Từ chối" },
];

const STATUS_COLORS: Record<ApplicationStatus, { bg: string; text: string; dot: string }> = {
  new: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
  reviewing: { bg: "#F5F3FF", text: "#6D28D9", dot: "#8B5CF6" },
  contacting: { bg: "#FFFBEB", text: "#B45309", dot: "#F59E0B" },
  interview: { bg: "#ECFEFF", text: "#0891B2", dot: "#06B6D4" },
  on_hold: { bg: "#FFF7ED", text: "#C2410C", dot: "#F97316" },
  hired: { bg: "#F0FDF4", text: "#15803D", dot: "#22C55E" },
  rejected: { bg: "#FEF2F2", text: "#B91C1C", dot: "#EF4444" },
};

interface Props {
  items: JobApplication[];
  jobs: JobPosting[];
  loading?: boolean;
  searchInput: string;
  onSearchChange: (value: string) => void;
  jobFilter: string;
  onJobFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  meta: PaginationMeta;
  onEdit: (item: JobApplication) => void;
  onDelete: (id: string) => void;
}

export function ApplicationsManageList({
  items,
  jobs,
  loading,
  searchInput,
  onSearchChange,
  jobFilter,
  onJobFilterChange,
  statusFilter,
  onStatusFilterChange,
  meta,
  onEdit,
  onDelete,
}: Props) {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const canView = hasPermission("recruitment.applications.all.view");
  const canUpdate = hasPermission("recruitment.applications.all.update");
  const canDelete = hasPermission("recruitment.applications.all.delete");
  const showActionsColumn = canView || canUpdate || canDelete;

  const jobOptions = jobs.map((job) => ({ value: job.id, label: job.title }));
  const statusOptions = STATUS_OPTIONS.map((s) => ({ value: s.value, label: s.label }));

  const handleClearFilters = () => {
    onSearchChange("");
    onJobFilterChange("");
    onStatusFilterChange("");
  };

  return (
    <div className="space-y-5">
      <AdminListHeader
        title="Danh sách ứng viên"
        subtitle={`Tổng cộng ${meta.total} đơn ứng tuyển`}
      />

      <AdminFilters
        footer={
          <button
            type="button"
            onClick={handleClearFilters}
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
            placeholder="Tìm theo tên, SĐT hoặc email..."
          />
          <SelectField
            value={jobFilter}
            onChange={onJobFilterChange}
            placeholder="Tất cả vị trí tuyển dụng"
            options={jobOptions}
          />
          <SelectField
            value={statusFilter}
            onChange={onStatusFilterChange}
            placeholder="Tất cả trạng thái"
            options={statusOptions}
          />
        </div>
      </AdminFilters>

      {loading && <AdminLoading />}

      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white">
          <AdminEmptyState message="Chưa có đơn ứng tuyển nào." />
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="hidden md:block">
          <AdminTable>
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 w-16">STT</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[160px]">Họ tên</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Số điện thoại</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[180px]">Email</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[200px]">Vị trí ứng tuyển</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Trạng thái</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Ngày nộp</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">CV</th>
              {showActionsColumn && (
                <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-28">Thao tác</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item, index) => {
              const statusColor = STATUS_COLORS[item.status];
              return (
                  <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-5 py-4 text-gray-500 font-medium">{(meta.page - 1) * meta.limit + index + 1}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900">{item.fullName}</td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{item.phone}</td>
                    <td className="px-5 py-4 text-gray-600">{item.email || "—"}</td>
                    <td className="px-5 py-4 text-gray-900">{item.jobPosting?.title || "—"}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md"
                        style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColor.dot }} />
                        {STATUS_OPTIONS.find((s) => s.value === item.status)?.label || item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{formatDateTime(item.appliedAt)}</td>
                    <td className="px-5 py-4">
                      {item.cvMedia ? (
                        <a
                          href={item.cvMedia.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                          title={item.cvMedia.filename}
                        >
                          <FileText size={14} />
                          <span className="truncate max-w-[120px]">{item.cvMedia.filename}</span>
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">Chưa đính kèm</span>
                      )}
                    </td>
                    {showActionsColumn && (
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {(canView || canUpdate) && (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              onClick={() => onEdit(item)}
                              title="Xem chi tiết"
                            >
                              <Pencil size={15} className="text-gray-500" />
                            </Button>
                          )}
                          {canView && item.cvMedia && (
                            <Button
                              variant="ghost"
                              isIconOnly
                              size="md"
                              asChild
                              title="Tải CV"
                              className="hover:!bg-blue-50"
                            >
                              <a href={item.cvMedia.url} download={item.cvMedia.filename} target="_blank" rel="noopener noreferrer">
                                <Download size={15} className="text-blue-500" />
                              </a>
                            </Button>
                          )}
                          {canDelete && (
                          <Button
                            variant="ghost"
                            isIconOnly
                            size="md"
                            onClick={() =>
                              guard(
                                "recruitment.applications.all.delete",
                                () => onDelete(item.id),
                                "Bạn không có quyền xóa đơn ứng tuyển.",
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
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={showActionsColumn ? 9 : 8}>
                  <AdminEmptyState message="Chưa có đơn ứng tuyển nào." />
                </td>
              </tr>
            )}
          </tbody>
        </AdminTable>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-3 md:hidden">
          {items.map((item) => {
            const statusColor = STATUS_COLORS[item.status];
            return (
              <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 font-semibold text-gray-900">{item.fullName}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.jobPosting?.title || "—"}</p>
                  </div>
                  <span
                    className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold"
                    style={{ backgroundColor: statusColor.bg, color: statusColor.text }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusColor.dot }} />
                    {STATUS_OPTIONS.find((s) => s.value === item.status)?.label || item.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-700">SĐT:</span> {item.phone}</p>
                  <p className="break-words"><span className="font-medium text-gray-700">Email:</span> {item.email || "—"}</p>
                  <p><span className="font-medium text-gray-700">Ngày nộp:</span> {formatDateTime(item.appliedAt)}</p>
                  <div>
                    <span className="font-medium text-gray-700">CV:</span>{" "}
                    {item.cvMedia ? (
                      <a
                        href={item.cvMedia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1.5 align-middle text-sm font-medium text-blue-600 hover:text-blue-700"
                        title={item.cvMedia.filename}
                      >
                        <FileText size={14} className="flex-shrink-0" />
                        <span className="truncate">{item.cvMedia.filename}</span>
                      </a>
                    ) : (
                      <span className="text-gray-400">Chưa đính kèm</span>
                    )}
                  </div>
                </div>

                {showActionsColumn && (
                  <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-gray-100 pt-2">
                    {(canView || canUpdate) && (
                      <Button
                        variant="ghost"
                        isIconOnly
                        size="md"
                        onClick={() => onEdit(item)}
                        title="Xem chi tiết"
                      >
                        <Pencil size={15} className="text-gray-500" />
                      </Button>
                    )}
                    {canView && item.cvMedia && (
                      <Button
                        variant="ghost"
                        isIconOnly
                        size="md"
                        asChild
                        title="Tải CV"
                        className="hover:!bg-blue-50"
                      >
                        <a href={item.cvMedia.url} download={item.cvMedia.filename} target="_blank" rel="noopener noreferrer">
                          <Download size={15} className="text-blue-500" />
                        </a>
                      </Button>
                    )}
                    {canDelete && (
                      <Button
                        variant="ghost"
                        isIconOnly
                        size="md"
                        onClick={() =>
                          guard(
                            "recruitment.applications.all.delete",
                            () => onDelete(item.id),
                            "Bạn không có quyền xóa đơn ứng tuyển.",
                          )
                        }
                        title="Xóa"
                        className="hover:!bg-red-50"
                      >
                        <Trash2 size={15} className="text-red-500" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {warning.show && (
        <PopupNotification
          type="error"
          message={warning.message}
          onClose={closeWarning}
          autoClose={false}
        />
      )}
    </div>
  );
}
