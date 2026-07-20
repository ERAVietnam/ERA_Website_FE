"use client";

import type { AccountReviewer } from "@/types/api";

interface ReviewerNotifySelectProps {
  label?: string;
  value: string;
  reviewers: AccountReviewer[];
  onChange: (value: string) => void;
}

export function ReviewerNotifySelect({
  label = "Người nhận email thông báo",
  value,
  reviewers,
  onChange,
}: ReviewerNotifySelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-gray-400"
      >
        <option value="">Không gửi email thông báo</option>
        {reviewers.map((reviewer) => (
          <option key={reviewer.id} value={reviewer.id}>
            {reviewer.name} ({reviewer.email})
          </option>
        ))}
      </select>
      {reviewers.length === 0 && (
        <p className="text-xs leading-relaxed text-gray-500">
          Chưa có reviewer phù hợp trong danh sách tài khoản.
        </p>
      )}
    </div>
  );
}
