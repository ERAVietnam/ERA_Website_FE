"use client";

import { X } from "lucide-react";
import { AdminDialog } from "@/components/ui/admin/AdminDialog";
import { colors } from "@/lib/theme";
import { formatDateTime } from "@/lib/date";
import { recruitmentStatusConfig } from "@/lib/recruitment/status";
import type { JobPostingLog } from "@/types/api";

interface Props {
  logs: JobPostingLog[];
  isOpen: boolean;
  onClose: () => void;
}

const eventLabels: Record<string, string> = {
  created: "Tạo tin",
  published: "Đăng tuyển",
  unpublished: "Gỡ bài",
  closed: "Đóng tuyển",
  updated: "Cập nhật",
};


export function ApplyJobLogsDialog({ logs, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <AdminDialog isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
        <div className="flex-shrink-0 z-10 flex items-center justify-between rounded-t-2xl px-5 py-3" style={{ backgroundColor: colors.primary.navy.DEFAULT }}>
          <h3 className="text-base font-bold text-white">Lịch sử thay đổi</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {logs.length === 0 ? (
            <p className="text-center text-gray-400 py-8">Chưa có lịch sử thay đổi.</p>
          ) : (
            <div className="relative border-l-2 border-gray-200 ml-2 space-y-6">
              {logs.map((log) => (
                <div key={log.id} className="pl-6 relative">
                  <span
                    className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: colors.primary.DEFAULT }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <span className="text-sm font-semibold" style={{ color: colors.primary.navy.DEFAULT }}>
                      {eventLabels[log.eventType] || log.eventType}
                    </span>
                    <span className="text-xs text-gray-400">{formatDateTime(log.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Bởi: <span className="font-medium text-gray-800">{log.actor?.name || "—"}</span>
                    {log.actor?.email ? ` (${log.actor.email})` : ""}
                  </p>
                  {(log.fromStatus || log.toStatus) && (
                    <p className="text-xs text-gray-500 mt-1">
                      Trạng thái: {" "}
                      <span className="font-medium">{(log.fromStatus && recruitmentStatusConfig[log.fromStatus]?.label) || log.fromStatus || "—"}</span>
                      {" → "}
                      <span className="font-medium">{(log.toStatus && recruitmentStatusConfig[log.toStatus]?.label) || log.toStatus || "—"}</span>
                    </p>
                  )}
                  {log.note && <p className="text-xs text-gray-500 mt-1">Ghi chú: {log.note}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
    </AdminDialog>
  );
}
