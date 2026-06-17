"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ApplyJobDetailPage } from "@/components/sections/apply/ApplyJobDetailPage";
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

  const statusLabel: Record<string, string> = {
    draft: "Bản nháp",
    open: "Đang tuyển",
    closed: "Đã đóng",
  };

  const statusColor: Record<string, { bg: string; text: string }> = {
    draft: { bg: "#F3F4F6", text: "#6B7280" },
    open: { bg: "#D1FAE5", text: "#059669" },
    closed: { bg: "#FEE2E2", text: "#DC2626" },
  };

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
                  backgroundColor: statusColor[job.status]?.bg,
                  color: statusColor[job.status]?.text,
                }}
              >
                {statusLabel[job.status] ?? job.status}
              </span>
            </div>
            <p className="text-xs text-white/80 truncate">{job.title || "Chưa có tiêu đề"}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30 ml-3"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ApplyJobDetailPage job={job} isPreview />
        </div>
      </div>
    </div>
  );
}
