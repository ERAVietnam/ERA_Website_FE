"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { colors } from "@/lib/theme";
import type { ProjectFormData } from "./ProjectsManageForm";
import { ProjectsFaqSection } from "../ProjectsFaqSection";
import { ProjectOverviewTable } from "../ProjectOverviewTable";
import { ExpandableProjectContent } from "../ExpandableProjectContent";

interface ProjectPreviewDialogProps {
  project: ProjectFormData | null;
  imagePreviewUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

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
  const completedFaqItems = project.faqs.filter(
    (item) => item.question.trim() && item.answer.trim()
  );

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
              className="mb-5"
              style={{
                color: colors.primary.DEFAULT,
                fontWeight: 800,
                fontSize: "clamp(22px, 3.5vw, 32px)",
                lineHeight: 1.2,
              }}
            >
              Dự án {project.name}
            </h1>

            {/* Info Table */}
            <ProjectOverviewTable project={project} />

            {/* Highlight Section */}
            <ExpandableProjectContent content={project.content} />

            <ProjectsFaqSection items={completedFaqItems} />

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full border"
                    style={{
                      color: colors.primary.navy.DEFAULT,
                      borderColor: colors.gray[200],
                      backgroundColor: colors.gray[50],
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
