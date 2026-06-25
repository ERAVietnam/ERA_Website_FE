"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { colors } from "@/lib/theme";
import type { ProjectFormData } from "./ProjectsManageForm";

interface ProjectPreviewDialogProps {
  project: ProjectFormData | null;
  imagePreviewUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  new: "Dự án mới",
  booking: "Nhận booking",
  selling: "Đang mở bán",
  upcoming: "Sắp mở bán",
  handed_over: "Đã bàn giao",
};

export function ProjectPreviewDialog({ project, imagePreviewUrl, isOpen, onClose }: ProjectPreviewDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const isPubliclyViewable = !!project.id && project.publicationStatus === "published";
  const coverImageUrl = imagePreviewUrl || project.imageMedia?.url;

  const infoRows = [
    { label: "Tên dự án", value: project.projectName || project.name },
    { label: "Chủ đầu tư", value: project.investor },
    { label: "Hình thức sở hữu", value: project.ownership },
    { label: "Tổng diện tích", value: project.area },
    { label: "Mật độ xây dựng", value: project.density },
    { label: "Quy mô phát triển", value: project.scale },
    { label: "Thởi điểm khởi công", value: project.startYear },
    { label: "Tiến độ", value: project.progress, highlight: true },
  ].filter((row) => row.value);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-8 overflow-hidden">
      <div
        ref={dialogRef}
        className="relative flex flex-col w-full max-w-5xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        <div className="flex-shrink-0 z-10 flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#C8102E] to-[#9A0B22] px-5 py-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-white">Xem trước dự án</h3>
            <p className="text-xs text-white/80 truncate">{project.name}</p>
          </div>
          <div className="flex items-center gap-2 ml-3">
            {isPubliclyViewable && (
              <a
                href={`/du-an/${project.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/30"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Mở trang công khai</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10">
            {/* Title */}
            <h1
              className="mb-3"
              style={{
                color: colors.primary.DEFAULT,
                fontWeight: 800,
                fontSize: "clamp(22px, 3.5vw, 32px)",
                lineHeight: 1.2,
              }}
            >
              Dự án {project.name}
            </h1>
            <p
              className="mb-6"
              style={{
                color: colors.primary.navy.DEFAULT,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Tổng quan dự án {project.projectName}
            </p>

            {/* Info Table */}
            {infoRows.length > 0 && (
              <div className="rounded-xl border border-gray-100 overflow-hidden mb-8">
                <div
                  className="px-5 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: colors.gray[50],
                    color: colors.neutral.foreground,
                  }}
                >
                  Thông tin chi tiết
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {infoRows.map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-5 py-3 text-sm border-b border-gray-50 last:border-b-0"
                      style={{
                        borderRight: i % 2 === 0 ? `1px solid ${colors.gray[50]}` : undefined,
                      }}
                    >
                      <span style={{ color: colors.gray[500] }}>{row.label}</span>
                      <span
                        className="font-medium text-right ml-4"
                        style={{
                          color: row.highlight
                            ? colors.primary.DEFAULT
                            : colors.neutral.foreground,
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Image */}
            {coverImageUrl && (
              <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Highlight Section */}
            {project.content && (
              <div className="mb-8">
                <h2
                  className="mb-4"
                  style={{
                    color: colors.neutral.foreground,
                    fontWeight: 800,
                    fontSize: "18px",
                  }}
                >
                  Điểm nổi bật của {project.projectName}
                </h2>
                <div
                  className="ck-content"
                  style={{
                    color: colors.neutral.foreground,
                    fontSize: "15px",
                    lineHeight: 1.8,
                  }}
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </div>
            )}

            {/* Location Section */}
            {project.location && (
              <div className="mb-8">
                <h2
                  className="mb-1"
                  style={{
                    color: colors.neutral.foreground,
                    fontWeight: 800,
                    fontSize: "18px",
                  }}
                >
                  Vị trí {project.projectName}
                </h2>                
                <p className="text-[14px] leading-[1.8]" style={{ color: colors.neutral.foreground }}>
                  {project.location}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
