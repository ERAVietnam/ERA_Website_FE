"use client";

import { useEffect, useRef } from "react";
import { X, Check } from "lucide-react";

interface PopupNotificationProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseMs?: number;
}

export function PopupNotification({
  type,
  message,
  onClose,
  autoClose = false,
  autoCloseMs = 3000,
}: PopupNotificationProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseMs);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseMs, onClose]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (!autoClose) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [autoClose, onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        ref={popupRef}
        className={`relative w-full max-w-sm mx-4 rounded-xl border-2 p-6 shadow-lg ${
          isSuccess
            ? "border-green-500 bg-green-50"
            : "border-red-500 bg-red-50"
        }`}
      >
        {!autoClose && (
          <button
            onClick={onClose}
            className={`absolute top-3 right-3 rounded-full p-1 transition-colors ${
              isSuccess
                ? "text-green-600 hover:bg-green-100"
                : "text-red-600 hover:bg-red-100"
            }`}
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
              isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {isSuccess ? <Check size={28} strokeWidth={3} /> : <X size={28} strokeWidth={3} />}
          </div>

          <p
            className={`text-base font-medium ${
              isSuccess ? "text-green-800" : "text-red-800"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
