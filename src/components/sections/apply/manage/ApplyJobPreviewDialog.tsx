"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { ApplyJobDetailPage } from "@/components/sections/apply/ApplyJobDetailPage";
import { ROUTES } from "@/lib/routes";
import { recruitmentStatusConfig } from "@/lib/recruitment/status";
import type { JobFormData } from "./ApplyManageForm";

interface ApplyJobPreviewDialogProps {
  job: JobFormData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyJobPreviewDialog({ job, isOpen, onClose }: ApplyJobPreviewDialogProps) {
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

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-8 overflow-hidden">
      <div
        ref={dialogRef}
        className="relative flex flex-col w-full max-w-5xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        <div className="flex-shrink-0 z-10 flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#C8102E] to-[#9A0B22] px-5 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white">Xem trước tin tuyển dụng</h3>
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: recruitmentStatusConfig[job.status]?.bg,
                  color: recruitmentStatusConfig[job.status]?.color,
                }}
              >
                {recruitmentStatusConfig[job.status]?.label ?? job.status}
              </span>
            </div>
            <p className="text-xs text-white/80 truncate">{job.title || "Chưa có tiêu đề"}</p>
          </div>
          <div className="flex items-center gap-2 ml-3">
            {job.status === "open" && job.slug && (
              <a
                href={`${ROUTES.applyDetail}/${encodeURIComponent(job.slug)}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/30"
                title="Mở tin tuyển dụng công khai"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Xem bài đăng</span>
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
        <div className="flex-1 overflow-y-auto">
          <ApplyJobDetailPage job={job} isPreview />
        </div>
      </div>
    </div>
  );
}
