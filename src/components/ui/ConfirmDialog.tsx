"use client";

import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title = "Xác nhận",
  message,
  confirmLabel = "Vẫn hủy",
  cancelLabel = "Ở lại",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const isWarning = variant === "warning";
  const accentColor = isWarning ? colors.tertiary.orange.DEFAULT : colors.primary.DEFAULT;
  const accentBg = isWarning ? colors.tertiary.orange.s20 : colors.primary.DEFAULT;
  const titleColor = isWarning ? colors.tertiary.orange.dark : colors.primary.navy.DEFAULT;
  const borderStyle = isWarning
    ? { border: `2px solid ${colors.tertiary.orange.s40}`, backgroundColor: "#FFFBF5" }
    : {};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div
        className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
        style={borderStyle}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: accentBg }}
          >
            <AlertTriangle size={24} style={{ color: accentColor }} />
          </div>
          <h3 className="mb-2 text-lg font-bold" style={{ color: titleColor }}>
            {title}
          </h3>
          <p className="mb-6 text-sm text-gray-600">{message}</p>
          <div className="flex w-full flex-col-reverse gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full justify-center bg-white"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="w-full justify-center"
              style={{ backgroundColor: accentColor, borderColor: accentColor, color: colors.neutral.white }}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
