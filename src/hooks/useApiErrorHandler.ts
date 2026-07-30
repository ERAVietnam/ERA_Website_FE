"use client";

import { useCallback, useState } from "react";
import { extractApiError } from "@/lib/api-errors";

export interface HandleApiErrorOptions {
  /** Tiền tố thêm vào message lỗi hiển thị trên popup (vd: "Không thể tải danh mục: "). */
  messagePrefix?: string;
  /** Xử lý lỗi theo field (vd: showFieldError). Nếu không truyền, lỗi field được xử lý như lỗi thường. */
  onFieldError?: (field: string, message: string) => void;
  /** Mặc định true: lỗi mạng mở NetworkErrorPopup. Truyền false để luôn hiện popup lỗi thường. */
  useNetworkPopup?: boolean;
}

export function useApiErrorHandler(showError: (message: string) => void) {
  const [showNetworkError, setShowNetworkError] = useState(false);

  const handleApiError = useCallback(
    (err: unknown, options?: HandleApiErrorOptions) => {
      const { field, message, isNetworkError } = extractApiError(err);
      if (field && options?.onFieldError) {
        options.onFieldError(field, message);
        return;
      }
      if (isNetworkError && options?.useNetworkPopup !== false) {
        setShowNetworkError(true);
        return;
      }
      showError(options?.messagePrefix ? `${options.messagePrefix}${message}` : message);
    },
    [showError],
  );

  return { showNetworkError, setShowNetworkError, handleApiError };
}
