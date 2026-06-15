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
      if (event.persisted && !isLoading && !account) {
        const pathname = window.location.pathname;
        if (pathname.includes("/quan-ly")) {
          window.location.href = "/dang-nhap";
        }
      }
    };

    window.addEventListener("pageshow", handlePageshow);
    return () => window.removeEventListener("pageshow", handlePageshow);
  }, [isLoading, account]);

  const login = async (email: string, password: string) => {
    const { account } = await authApi.login({ email, password });
    setAccount(account);
  };

  const logout = async () => {
    await authApi.logout();
    setAccount(null);
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
