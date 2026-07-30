"use client";

import { BookOpen, CalendarDays, ImagePlus, Pencil, Plus, Tags, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminFilters } from "@/components/ui/admin/AdminFilters";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { SelectField } from "@/components/ui/admin/SelectField";
import { formatDate } from "@/lib/date";
import type {
  AcademyCourse,
  AcademyCourseFilters,
  AcademyCourseTag,
  PaginationMeta,
} from "@/types/api";

interface Props {
  items: AcademyCourse[];
  tags: AcademyCourseTag[];
  loading: boolean;
  meta: PaginationMeta;
  searchInput: string;
  filters: AcademyCourseFilters;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canManage: boolean;
  onSearchChange: (value: string) => void;
  onFiltersChange: React.Dispatch<React.SetStateAction<AcademyCourseFilters>>;
  onClearFilters: () => void;
  onCreate: () => void;
  onEdit: (course: AcademyCourse) => void;
  onDelete: (id: string) => void;
  guard: (permission: string, action: () => void, message?: string) => void;
}

export function AcademyCourseList({
  items,
  tags,
  loading,
  meta,
  searchInput,
  filters,
  canCreate,
  canUpdate,
  canDelete,
  canManage,
  onSearchChange,
  onFiltersChange,
  onClearFilters,
  onCreate,
  onEdit,
  onDelete,
  guard,
}: Props) {
  return (
    <>
      <div className="space-y-5">
        <AdminListHeader
          title="Quản lý khóa học"
          count={{ shown: items.length, total: meta.total, noun: "khóa học" }}
        >
          {canCreate && (
            <Button
              variant="primary"
              size="sm"
              className="gap-2"
              onClick={() =>
                guard(
                  "academy.courses.all.create",
                  onCreate,
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
                onClick={onClearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-primary"
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
              onChange={onSearchChange}
              placeholder="Tìm theo tên hoặc mô tả khóa học..."
            />
            <SelectField
              value={filters.tagId ?? ""}
              onChange={(value) =>
                onFiltersChange((prev) => ({
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
                onFiltersChange((prev) => ({
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
                          <CourseImage course={item} className="h-12 w-16" />
                          <div className="min-w-0">
                            <p className="line-clamp-2 font-semibold text-gray-900">{item.title}</p>
                            <p className="mt-1 text-xs text-gray-500">{formatDate(item.createdAt)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <CourseTags course={item} />
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {item.openingDate ? formatDate(item.openingDate) : "COMING SOON"}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge isActive={item.isActive} />
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
                                    () => onEdit(item),
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
                                    () => onDelete(item.id),
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
                    <CourseImage course={item} className="h-20 w-28" />
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
                          <Button variant="outline" size="sm" className="bg-white" onClick={() => onEdit(item)}>
                            Sửa
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onDelete(item.id)}
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
        onPageChange={(page) => onFiltersChange((prev) => ({ ...prev, page }))}
      />
    </>
  );
}

function CourseImage({ course, className }: { course: AcademyCourse; className: string }) {
  return (
    <div className={`${className} shrink-0 overflow-hidden rounded-lg bg-gray-100`}>
      {course.imageMedia?.url ? (
        <img src={course.imageMedia.url} alt={course.title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          <ImagePlus size={20} />
        </div>
      )}
    </div>
  );
}

function CourseTags({ course }: { course: AcademyCourse }) {
  return (
    <div className="flex max-w-[260px] flex-wrap gap-1.5">
      {course.tags.length > 0 ? (
        course.tags.map((tag) => (
          <span key={tag.id} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            {tag.name}
          </span>
        ))
      ) : (
        <span className="text-gray-400">—</span>
      )}
    </div>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {isActive ? "Hiển thị" : "Ẩn"}
    </span>
  );
}
