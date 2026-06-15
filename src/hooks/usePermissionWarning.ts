"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

export interface PermissionWarningState {
  show: boolean;
  message: string;
}

export function usePermissionWarning() {
  const { hasPermission } = useAuth();
  const [warning, setWarning] = useState<PermissionWarningState>({
    show: false,
    message: "",
  });

  const guard = useCallback(
    (
      permission: string,
      action: () => void,
      message = "Bạn không có quyền thực hiện thao tác này.",
    ) => {
      if (hasPermission(permission)) {
        action();
      } else {
        setWarning({ show: true, message });
      }
    },
    [hasPermission],
  );

  const closeWarning = useCallback(() => {
    setWarning({ show: false, message: "" });
  }, []);

  return { warning, guard, closeWarning };
}
