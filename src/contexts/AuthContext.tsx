"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { authApi } from "@/api/domains/auth";
import type { Account } from "@/types/api";
import { ROUTES } from "@/lib/routes";
import { setCookie, getCookie, deleteCookie } from "@/lib/cookies";
import { hasPermissionAccess } from "@/lib/system-permissions";

interface AuthContextValue {
  account: Account | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (...permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Non-HttpOnly cookie used only as a UI indicator that the user *should* be logged in.
// It never contains tokens. The real tokens live in HttpOnly cookies from the backend.
const AUTH_STATE_COOKIE = "era_auth_state";

function isProtectedRoute(pathname: string): boolean {
  return pathname.includes("/quan-ly") || pathname === "/ho-so-ca-nhan" || pathname.startsWith("/ho-so-ca-nhan/");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    // If the UI state cookie is missing, the user is definitely not logged in.
    // Skip the API call to avoid an unnecessary 401 in the console.
    if (!getCookie(AUTH_STATE_COOKIE)) {
      setAccount(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await authApi.me();
      setAccount(data);
    } catch {
      setAccount(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(fetchMe);
  }, [fetchMe]);

  useEffect(() => {
    const handlePageshow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;

      // Page was restored from bfcache (e.g. user clicked back after logout).
      // If the auth state cookie is gone, redirect immediately without showing stale UI.
      if (!getCookie(AUTH_STATE_COOKIE) && isProtectedRoute(window.location.pathname)) {
        window.location.href = ROUTES.login;
        return;
      }

      // Otherwise re-validate the session in case the token expired while cached.
      fetchMe();
    };

    window.addEventListener("pageshow", handlePageshow);
    return () => window.removeEventListener("pageshow", handlePageshow);
  }, [fetchMe]);

  const login = async (email: string, password: string) => {
    const { account } = await authApi.login({ email, password });
    setCookie(AUTH_STATE_COOKIE, "1", 7);
    setAccount(account);
  };

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API errors
    }
    deleteCookie(AUTH_STATE_COOKIE);
    setAccount(null);
    window.location.href = ROUTES.home;
  }, []);

  const hasPermission = useCallback(
    (...permissions: string[]) => {
      if (!account) return false;
      // Super admin bypass mọi quyền
      return hasPermissionAccess(account.permissions, permissions);
    },
    [account]
  );

  return (
    <AuthContext.Provider
      value={{
        account,
        isLoading,
        isAuthenticated: !!account,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
