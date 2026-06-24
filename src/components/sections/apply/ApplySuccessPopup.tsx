"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

interface Props {
  message?: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseMs?: number;
}

export function ApplySuccessPopup({
  message = "Chúng tôi sẽ liên hệ với bạn sớm nhất.",
  onClose,
  autoClose = true,
  autoCloseMs = 3000,
}: Props) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoCloseMs);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseMs, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.primary.navy.DEFAULT }}
          >
            <Check size={32} strokeWidth={3} style={{ color: colors.neutral.white }} />
          </div>

          <h3
            className="mb-2 text-xl font-bold"
            style={{ color: colors.primary.navy.DEFAULT }}
          >
            Ứng tuyển thành công!
          </h3>

          <p className="mb-6 text-sm text-gray-600 leading-relaxed">{message}</p>

          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
            className="w-full justify-center"
          >
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}
