"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { Plus, ExternalLink, Pencil, Trash2, MapPin, ChevronLeft } from "lucide-react";
import type { Landing } from "@/types/api";

interface Props {
  landings: Landing[];
  loading?: boolean;
  onAdd: () => void;
  onEdit: (landing: Landing) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export function LandingsManageList({ landings, loading, onAdd, onEdit, onDelete, onBack }: Props) {
  const { hasPermission } = useAuth();
  const canManage = hasPermission("projects.all.landing");

  return (
    <div className="space-y-4">
      <AdminListHeader
        title="Quản lý landing"
        subtitle="Landing hiển thị card đầu trang /du-an, bấm vào dẫn đến landing page"
      >
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-gray-500">
            <ChevronLeft size={16} />
            Quay lại dự án
          </Button>
          {canManage && (
            <Button variant="primary" size="sm" onClick={onAdd} className="gap-2">
              <Plus size={16} />
              Tạo landing
            </Button>
          )}
        </div>
      </AdminListHeader>

      {loading ? (
        <AdminLoading />
      ) : landings.length === 0 ? (
        <AdminEmptyState message="Chưa có landing nào — bấm Tạo landing để thêm card đầu tiên." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {landings.map((landing) => (
            <div
              key={landing.id}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                {landing.imageMedia?.url ? (
                  <Image
                    src={landing.imageMedia.url}
                    alt={landing.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                    Chưa có ảnh bìa
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 line-clamp-2 text-base font-bold text-gray-900">
                  {landing.title}
                </h3>
                <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{landing.location}</span>
                </div>
                <div className="mb-3 flex flex-wrap gap-1">
                  {landing.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mb-3 truncate text-xs text-gray-400" title={landing.url}>
                  → {landing.url}
                </p>
                {canManage && (
                  <div className="mt-auto flex items-center gap-2">
                    <a
                      href={landing.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      <ExternalLink size={12} /> Mở link
                    </a>
                    <button
                      type="button"
                      onClick={() => onEdit(landing)}
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      <Pencil size={12} /> Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(landing.id)}
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={12} /> Xóa
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
