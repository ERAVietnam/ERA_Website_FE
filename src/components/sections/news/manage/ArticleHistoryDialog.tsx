"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2, History } from "lucide-react";
import { newsApi } from "@/api/domains/news";
import { colors } from "@/lib/theme";
import type { NewsArticleLog } from "@/types/api";

interface ArticleHistoryDialogProps {
  articleId: string;
  isOpen: boolean;
  onClose: () => void;
}

const eventLabels: Record<NewsArticleLog["eventType"], string> = {
  created: "tạo bài viết",
  submitted: "gửi duyệt bài viết",
  updated: "sửa bài viết",
  published: "đăng bài viết",
  revoked: "gỡ đăng bài viết",
  rejected: "từ chối duyệt bài viết",
};

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ArticleHistoryDialog({ articleId, isOpen, onClose }: ArticleHistoryDialogProps) {
  const [logs, setLogs] = useState<NewsArticleLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError("");
    newsApi
      .getArticleLogs(articleId)
      .then((data) => setLogs(data))
      .catch(() => setError("Không thể tải lịch sử bài viết."))
      .finally(() => setLoading(false));
  }, [isOpen, articleId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        ref={dialogRef}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={20} style={{ color: colors.primary.navy.DEFAULT }} />
            <h2
              className="text-lg font-bold"
              style={{ color: colors.primary.navy.DEFAULT }}
            >
              Lịch sử bài viết
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={24} className="animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
        )}

        {!loading && !error && logs.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500">
            Chưa có lịch sử nào.
          </p>
        )}

        {!loading && !error && logs.length > 0 && (
          <ul className="max-h-[60vh] space-y-4 overflow-y-auto pr-1">
            {logs.map((log) => (
              <li key={log.id} className="flex gap-3 text-sm">
                <div
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: colors.primary.DEFAULT }}
                />
                <div>
                  <p className="text-gray-800">
                    <span className="font-semibold">
                      {formatDateTime(log.createdAt)}
                    </span>
                    {" - "}
                    <span className="font-medium">{log.actor.name}</span>{" "}
                    {eventLabels[log.eventType]}
                  </p>
                  {log.note && (
                    <p className="mt-0.5 text-gray-500">{log.note}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
