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
  Building2,
  FileUser,
  BadgeCheck,
  Trophy,
  GraduationCap,
  ChevronsLeft,
  PanelLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { hasAnyNewsArticleViewPermission } from "@/lib/permissions";

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
  visible: (hasPermission: (p: string) => boolean) => boolean;
}

const menuItems: MenuItem[] = [
  {
    href: "/tin-tuc/quan-ly",
    label: "Tin tức",
    icon: Newspaper,
    visible: (hasPermission) => hasAnyNewsArticleViewPermission(hasPermission),
  },
  {
    href: "/tap-chi/quan-ly",
    label: "E-magazine",
    icon: BookOpen,
    visible: (hasPermission) => hasPermission("magazine.articles.all.view"),
  },
  {
    href: "/du-an/quan-ly",
    label: "Dự án",
    icon: Building2,
    visible: (hasPermission) => hasPermission("projects.all.view"),
  },
  {
    href: "/agents/quan-ly",
    label: "Agent",
    icon: BadgeCheck,
    visible: (hasPermission) => hasPermission("agents.all.view"),
  },
  {
    href: "/vinh-danh-va-he-thong/quan-ly",
    label: "Vinh danh và Hệ thống",
    icon: Trophy,
    visible: (hasPermission) => hasPermission("honors.all.view"),
  },
  {
    href: "/khoa-hoc/quan-ly",
    label: "Khóa học",
    icon: GraduationCap,
    visible: (hasPermission) => hasPermission("academy.courses.all.view"),
  },
  {
    href: "/tuyen-dung/quan-ly",
    label: "Tin tuyển dụng",
    icon: Briefcase,
    visible: (hasPermission) => hasPermission("recruitment.jobs.all.view"),
  },
  {
    href: "/tuyen-dung/ung-vien",
    label: "Ứng viên",
    icon: FileUser,
    visible: (hasPermission) => hasPermission("recruitment.applications.all.view"),
  },
  {
    href: "/tai-khoan/quan-ly",
    label: "Tài khoản",
    icon: Users,
    visible: (hasPermission) => hasPermission("auth.accounts.all.view"),
  },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AdminSidebar({ collapsed = false, onToggleCollapse }: AdminSidebarProps) {
  const { account, logout, hasPermission } = useAuth();
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
      className="flex items-center gap-3 p-4 md:pr-12 hover:bg-gray-50 transition-colors"
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
      {menuItems.filter((item) => item.visible(hasPermission)).map((item) => {
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
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-200 ${
          collapsed ? "md:-translate-x-full" : "md:translate-x-0"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
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

        {/* Nút thu gọn sidebar (desktop) */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Thu gọn menu"
            className="absolute top-5 right-3 hidden md:inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronsLeft size={18} />
          </button>
        )}

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

      {/* Thanh trắng thu gọn (desktop) */}
      {collapsed && onToggleCollapse && (
        <div className="hidden md:flex fixed left-0 top-0 h-screen w-14 bg-white border-r border-gray-200 z-50 flex-col items-center pt-4">
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Mở rộng menu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <PanelLeft size={20} />
          </button>
        </div>
      )}
    </>
  );
}
