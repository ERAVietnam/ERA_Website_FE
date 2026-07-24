"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ToTopButton } from "./ToTopButton";

type LayoutConfig = {
  header?: boolean;
  footer?: boolean;
  toTop?: boolean;
  contentPadding?: boolean;
};

const defaultLayout: Required<LayoutConfig> = {
  header: true,
  footer: true,
  toTop: true,
  contentPadding: true,
};

/**
 * Khai báo các page có layout đặc biệt ở đây.
 * Key là pathname (không có trailing slash, trừ "/").
 * Các field không khai báo sẽ lấy giá trị mặc định là true.
 *
 * Ví dụ:
 * "/login": { header: false, footer: false, toTop: false },
 * "/some-page": { header: false },
 */
const specialLayouts: Record<string, LayoutConfig> = {
  "/duan-canho-forest-onsen": { header: false, footer: true, toTop: false },
  "/thank-you-eco-retreat": { header: false, footer: false, toTop: false },
  "/phan-khu-rung-phuong-duan-eco-retreat": { header: false, footer: true, toTop: false },
};

function normalizePathname(pathname: string): string {
  return pathname === "/" ? pathname : pathname.replace(/\/$/, "");
}

const ADMIN_PATHS = [
  "/tin-tuc/quan-ly",
  "/tap-chi/quan-ly",
  "/du-an/quan-ly",
  "/agents/quan-ly",
  "/vinh-danh-va-he-thong/quan-ly",
  "/khoa-hoc/quan-ly",
  "/tuyen-dung/quan-ly",
  "/tuyen-dung/ung-vien",
  "/tai-khoan/quan-ly",
  "/ho-so-ca-nhan",
];

function isAdminPath(pathname: string): boolean {
  return ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const normalized = normalizePathname(pathname);

  const isAdmin = isAdminPath(pathname);
  const specialConfig = specialLayouts[normalized] ?? {};

  const showHeader = isAdmin ? false : (specialConfig.header ?? defaultLayout.header);
  const showFooter = isAdmin ? false : (specialConfig.footer ?? defaultLayout.footer);
  const showToTop = isAdmin ? false : (specialConfig.toTop ?? defaultLayout.toTop);
  const showContentPadding = isAdmin ? false : (specialConfig.contentPadding ?? showHeader);

  return (
    <>
      {showHeader && <Header />}
      <div className={cn("flex-1", showContentPadding && "pt-0 md:pt-16")}>
        {children}
      </div>
      {showFooter && <Footer />}
      {showToTop && <ToTopButton />}
    </>
  );
}
