"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Newspaper,
  Users,
  LogOut,
  Menu,
  X,
  Home,
  Briefcase,
  BookOpen,
} from "lucide-react";

const menuItems = [
  { href: "/tin-tuc/quan-ly", label: "Tin tức", icon: Newspaper },
  { href: "/tap-chi/quan-ly", label: "E-magazine", icon: BookOpen },
  // { href: "/du-an/quan-ly", label: "Dự án", icon: Building2 },
  { href: "/tuyen-dung/quan-ly", label: "Tuyển dụng", icon: Briefcase },
  { href: "/tai-khoan/quan-ly", label: "Tài khoản", icon: Users },
];

export function AdminSidebar() {
  const { account, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace("/dang-nhap");
  };

  const profileContent = (
    <Link
      href="/ho-so-ca-nhan"
      className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
      onClick={() => setMobileOpen(false)}
    >
      <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
        <User size={22} className="text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {account?.name || "Admin"}
        </p>
        <p className="text-xs text-gray-500 truncate">{account?.email}</p>
      </div>
    </Link>
  );

  const menuContent = (
    <nav className="flex-1 overflow-y-auto p-3 space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon size={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const logoutContent = (
    <div className="p-3 border-t border-gray-200">
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-center gap-2 bg-white"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        Đăng xuất
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm text-gray-600"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4 border-b border-gray-200 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {profileContent}

        {menuContent}

        <div className="p-3 border-t border-gray-200">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Home size={18} />
            Trang chủ
          </Link>
        </div>

        {logoutContent}
      </aside>
    </>
  );
}
