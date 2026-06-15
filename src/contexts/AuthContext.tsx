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
import { setCookie, deleteCookie } from "@/lib/cookies";
import { setTokens, clearTokens, getAccessToken } from "@/api/interceptors";

interface AuthContextValue {
  account: Account | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (...permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
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
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    const handlePageshow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        const token = getAccessToken();
        const pathname = window.location.pathname;
        const isProtected = pathname.includes("/quan-ly") || pathname === "/ho-so-ca-nhan" || pathname.startsWith("/ho-so-ca-nhan/");

        if (!token && isProtected) {
          window.location.href = "/dang-nhap";
        } else {
          window.location.reload();
        }
      }
    };

    window.addEventListener("pageshow", handlePageshow);
    return () => window.removeEventListener("pageshow", handlePageshow);
  }, []);

  const login = async (email: string, password: string) => {
    const { account, accessToken, refreshToken } = await authApi.login({ email, password });
    setTokens(accessToken, refreshToken);
    setCookie("access_token", accessToken, 1);
    setAccount(account);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout API errors
    }
    clearTokens();
    deleteCookie("access_token");
    setAccount(null);
    window.location.href = "/";
  };

  const hasPermission = useCallback(
    (...permissions: string[]) => {
      if (!account) return false;
      // Super admin bypass mọi quyền
      if (account.permissions.includes("system.super_admin")) return true;
      return permissions.some((p) => account.permissions.includes(p));
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
