"use client";

import { memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Pagination } from "@/components/ui/Pagination";
import { colors } from "@/lib/theme";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { SelectField } from "@/components/ui/admin/SelectField";
import { ViewModeToggle } from "@/components/ui/admin/ViewModeToggle";
import { ProjectsManageActions } from "./ProjectsManageActions";
import { Plus, FileText, X, MapPin, Building } from "lucide-react";
import { getProjectCardImage } from "@/lib/projects";
import type { Project, ProjectPublicationStatus } from "@/types/api";

const publicationOptions: { value: ProjectPublicationStatus; label: string }[] = [
  { value: "draft", label: "Bản nháp" },
  { value: "pending", label: "Chờ duyệt" },
  { value: "published", label: "Đã đăng" },
];

const publicationLabels: Record<ProjectPublicationStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "Bản nháp", color: colors.gray[600], bg: colors.gray[100] },
  pending: { label: "Chờ duyệt", color: colors.tertiary.orange.dark || "#B45309", bg: "#FEF3C7" },
  published: { label: "Đã đăng", color: "#16A34A", bg: "#F0FDF4" },
};

interface Props {
  projects: Project[];
  loading?: boolean;
  searchInput: string;
  onSearchChange: (value: string) => void;
  publicationFilter: ProjectPublicationStatus | "";
  onPublicationFilterChange: (value: ProjectPublicationStatus | "") => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onPreview?: (project: Project) => void;
  onPublish?: (id: string) => void;
  onRevoke?: (id: string) => void;
  onSubmitForReview?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewHistory?: (id: string) => void;
}

export const ProjectsManageList = memo(function ProjectsManageList({
  projects,
  loading,
  searchInput,
  onSearchChange,
  publicationFilter,
  onPublicationFilterChange,
  page,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onAdd,
  onPreview,
  onPublish,
  onRevoke,
  onSubmitForReview,
  onReject,
  onViewHistory,
}: Props) {
  const { hasPermission } = useAuth();

  const handleClearFilters = () => {
    onSearchChange("");
    onPublicationFilterChange("");
    onPageChange(1);
  };

  const total = projects.length;

  const canCreate = hasPermission("projects.all.create");
  const showActionsColumn =
    hasPermission("projects.all.view") ||
    hasPermission("projects.all.update") ||
    hasPermission("projects.all.delete") ||
    hasPermission("projects.all.publish");

  return (
    <div className="space-y-5">
      <AdminListHeader
        title="Quản lý dự án"
        subtitle={total > 0 ? `Trang ${page} / ${totalPages}` : "Không có dự án nào"}
      >
        <div className="flex items-center gap-2">
          {canCreate && (
            <Button variant="primary" size="sm" onClick={onAdd} className="gap-2">
              <Plus size={16} />
              Tạo dự án
            </Button>
          )}
        </div>
      </AdminListHeader>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SearchInput
            value={searchInput}
            onChange={onSearchChange}
            placeholder="Tìm theo tên dự án..."
          />
          <SelectField
            value={publicationFilter}
            onChange={(value) => {
              onPublicationFilterChange(value as ProjectPublicationStatus | "");
              onPageChange(1);
            }}
            placeholder="Tất cả trạng thái bài viết"
            options={publicationOptions}
          />
        </div>
      </AdminFilters>

      {loading && <AdminLoading />}

      {!loading && total === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <AdminEmptyState message='Chưa có dự án nào. Hãy bấm "Tạo dự án" để thêm.' className="!p-0" />
        </div>
      )}

      {!loading && total > 0 && (
        <AdminTable>
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 w-16">STT</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[280px] max-w-[420px]">Dự án</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Tags</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Trạng thái bài viết</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 min-w-[180px]">Địa điểm</th>
              <th className="text-left font-semibold text-gray-600 px-5 py-3.5 whitespace-nowrap">Chủ đầu tư</th>
              {showActionsColumn && (
                <th className="text-right font-semibold text-gray-600 px-5 py-3.5 w-48 min-w-[200px]">Thao tác</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {projects.map((project, i) => {
              const publication = publicationLabels[project.publicationStatus];
              return (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-gray-500 font-medium">
                    {(page - 1) * 10 + i + 1}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        {(() => {
                          const thumbnailUrl = getProjectCardImage(project);
                          return thumbnailUrl ? (
                            <Image
                              src={thumbnailUrl}
                              alt={project.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Building size={20} />
                            </div>
                          );
                        })()}
                      </div>
                      <p className="font-semibold text-gray-900 whitespace-normal break-words" title={project.name}>
                        {project.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {(project.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block text-xs font-medium px-2 py-0.5 rounded-full border"
                          style={{ color: colors.primary.navy.DEFAULT, borderColor: colors.gray[200], backgroundColor: colors.gray[50] }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md"
                      style={{ color: publication.color, backgroundColor: publication.bg }}
                    >
                      {publication.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate" title={project.location}>{project.location || "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {project.investor || "—"}
                  </td>
                  {showActionsColumn && (
                    <td className="px-5 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <ProjectsManageActions
                        project={project}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onPreview={onPreview}
                        onPublish={onPublish}
                        onRevoke={onRevoke}
                        onSubmitForReview={onSubmitForReview}
                        onReject={onReject}
                        onViewHistory={onViewHistory}
                        layout="table"
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </AdminTable>
      )}

      {!loading && total > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  );
});
