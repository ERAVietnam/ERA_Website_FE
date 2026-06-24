"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { X, Loader2 } from "lucide-react";
import { formatDateTime } from "@/lib/date";
import { recruitmentApi } from "@/api/domains/recruitment";
import type { JobApplicationLog, ApplicationStatus } from "@/types/api";

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "new", label: "Mới nhận" },
  { value: "reviewing", label: "Đang xem xét" },
  { value: "contacting", label: "Đang liên hệ" },
  { value: "interview", label: "Phỏng vấn" },
  { value: "on_hold", label: "Chờ xem xét" },
  { value: "hired", label: "Đã tuyển" },
  { value: "rejected", label: "Từ chối" },
];

interface Props {
  applicationId: string;
  status: ApplicationStatus;
  statusLabel: string;
  isCurrent: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (note: string) => void | Promise<void>;
  isLoading?: boolean;
}

export function ApplicationStatusLogDialog({
  applicationId,
  status,
  statusLabel,
  isCurrent,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: Props) {
  const [note, setNote] = useState("");
  const [logs, setLogs] = useState<JobApplicationLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setNote("");
    setLogsLoading(true);
    recruitmentApi
      .getApplicationLogs(applicationId)
      .then((allLogs) => {
        setLogs(
          allLogs.filter(
            (log) =>
              log.status === status ||
              log.fromStatus === status ||
              log.toStatus === status,
          ),
        );
      })
      .catch(() => setLogs([]))
      .finally(() => setLogsLoading(false));
  }, [isOpen, applicationId, status]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: colors.primary.navy.DEFAULT }}>
            {isCurrent ? `Ghi chú - ${statusLabel}` : `Chuyển sang "${statusLabel}"`}
          </h3>
          <Button variant="ghost" isIconOnly size="sm" onClick={onClose}>
            <X size={18} className="text-gray-500" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ghi chú (không bắt buộc)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú về thao tác này..."
              rows={4}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Lịch sử ghi chú của trạng thái này</h4>
            {logsLoading ? (
              <div className="flex items-center gap-2 text-sm text-gray-500 py-4">
                <Loader2 size={14} className="animate-spin" /> Đang tải...
              </div>
            ) : logs.length === 0 ? (
              <p className="text-sm text-gray-400 py-3">Chưa có ghi chú nào.</p>
            ) : (
              <div className="relative max-h-72 overflow-y-auto pr-1">
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gray-200" />
                <div className="space-y-0">
                  {logs.map((log) => {
                    const isTransitionOut = log.fromStatus === status && log.toStatus;
                    const isTransitionIn = log.toStatus === status && log.fromStatus;
                    const isNote = log.status === status && !log.fromStatus && !log.toStatus;
                    const isTransition = isTransitionOut || isTransitionIn;

                    const fromLabel = STATUS_OPTIONS.find((s) => s.value === log.fromStatus)?.label || log.fromStatus;
                    const toLabel = STATUS_OPTIONS.find((s) => s.value === log.toStatus)?.label || log.toStatus;

                    return (
                      <div key={log.id} className="relative flex gap-4 py-3">
                        <div className="relative z-10 flex-shrink-0">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{
                              backgroundColor: isTransition ? "#F59E0B" : "#3B82F6",
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="text-xs text-gray-500 mb-1">{formatDateTime(log.createdAt)}</p>
                          {isTransition && (
                            <p className="text-sm font-semibold text-gray-800">
                              {fromLabel} - {toLabel}
                            </p>
                          )}
                          {isNote && log.note && (
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">{log.note}</p>
                          )}
                          {isTransition && log.note && (
                            <p className="text-sm text-gray-600 whitespace-pre-wrap mt-1">{log.note}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">{log.actor.name || log.actor.email}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onConfirm(note)}
            isLoading={isLoading}
          >
            {isCurrent ? "Lưu ghi chú" : "Xác nhận chuyển trạng thái"}
          </Button>
        </div>
      </div>
    </div>
  );
}
