"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  /** Tailwind max-w-* class for the dialog container. */
  maxWidth?: string;
  children: ReactNode;
}

export function AdminDialog({ isOpen, onClose, maxWidth = "max-w-2xl", children }: AdminDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-8 overflow-hidden">
      <div
        ref={dialogRef}
        className={`relative flex flex-col w-full ${maxWidth} max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] rounded-2xl bg-white shadow-2xl overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}
