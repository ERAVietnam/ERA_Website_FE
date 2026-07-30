"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { AdminDialog } from "@/components/ui/admin/AdminDialog";
import { newsApi } from "@/api/domains/news";
import { colors } from "@/lib/theme";
import { newsStatusConfig } from "@/lib/news/status";
import { formatDateTime } from "@/lib/date";
import { extractApiError } from "@/lib/api-errors";
import type { NewsArticleLog, JobStatus } from "@/types/api";

interface ArticleHistoryDialogProps {
  articleId: string;
  isOpen: boolean;
  onClose: () => void;
}

const eventLabels: Record<NewsArticleLog["eventType"], string> = {
  created: "Tạo bài viết",
  submitted: "Gửi duyệt",
  updated: "Cập nhật",
  published: "Đăng bài viết",
  revoked: "Gỡ đăng",
  rejected: "Từ chối duyệt",
};


export function ArticleHistoryDialog({ articleId, isOpen, onClose }: ArticleHistoryDialogProps) {
  const [logs, setLogs] = useState<NewsArticleLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    queueMicrotask(() => {
      setLoading(true);
      setError("");
    });
    newsApi
      .getArticleLogs(articleId)
      .then((data) => setLogs(data))
      .catch((err) => {
        const { message, isNetworkError } = extractApiError(err);
        setError(isNetworkError ? "Không thể kết nối đến máy chủ, vui lòng kiểm tra mạng." : message);
      })
      .finally(() => setLoading(false));
  }, [isOpen, articleId]);

  if (!isOpen) return null;

  return (
    <AdminDialog isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
        <div
          className="flex-shrink-0 z-10 flex items-center justify-between rounded-t-2xl px-5 py-3"
          style={{ backgroundColor: colors.primary.navy.DEFAULT }}
        >
          <h3 className="text-base font-bold text-white">Lịch sử bài viết</h3>
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
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-gray-400" />
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
          )}

          {!loading && !error && logs.length === 0 && (
            <p className="text-center text-gray-400 py-8">Chưa có lịch sử thay đổi.</p>
          )}

          {!loading && !error && logs.length > 0 && (
            <div className="relative border-l-2 border-gray-200 ml-2 space-y-6">
              {logs.map((log) => (
                <div key={log.id} className="pl-6 relative">
                  <span
                    className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: colors.primary.DEFAULT }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: colors.primary.navy.DEFAULT }}
                    >
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
                      <span className="font-medium">
                        {(log.fromStatus && newsStatusConfig[log.fromStatus]?.label) || log.fromStatus || "—"}
                      </span>
                      {" → "}
                      <span className="font-medium">
                        {(log.toStatus && newsStatusConfig[log.toStatus]?.label) || log.toStatus || "—"}
                      </span>
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
