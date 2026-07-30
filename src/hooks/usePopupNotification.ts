"use client";

import { useCallback, useState } from "react";

export interface PopupNotificationState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

export function usePopupNotification() {
  const [popup, setPopup] = useState<PopupNotificationState>({
    show: false,
    type: "success",
    message: "",
  });

  const showSuccess = useCallback((message: string) => {
    setPopup({ show: true, type: "success", message });
  }, []);

  const showError = useCallback((message: string) => {
    setPopup({ show: true, type: "error", message });
  }, []);

  const closePopup = useCallback(() => {
    setPopup((prev) => ({ ...prev, show: false }));
  }, []);

  return { popup, showSuccess, showError, closePopup };
}
