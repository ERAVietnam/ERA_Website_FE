"use client";

import { WifiOff } from "lucide-react";

interface NetworkErrorPopupProps {
  isOpen?: boolean;
  onRetry?: () => void;
}

export function NetworkErrorPopup({ isOpen = true, onRetry }: NetworkErrorPopupProps) {
  if (!isOpen) return null;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-sm mx-4 rounded-xl border-2 border-red-500 bg-red-50 p-6 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <WifiOff size={28} strokeWidth={2} />
          </div>
          <p className="text-base font-medium text-red-800">
            Không có kết nối mạng, vui lòng thử lại
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
          >
            Kết nối lại
          </button>
        </div>
      </div>
    </div>
  );
}
