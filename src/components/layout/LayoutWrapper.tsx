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
};

function normalizePathname(pathname: string): string {
  return pathname === "/" ? pathname : pathname.replace(/\/$/, "");
}

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const normalized = normalizePathname(pathname);

  const config = specialLayouts[normalized] ?? {};
  const showHeader = config.header ?? defaultLayout.header;
  const showFooter = config.footer ?? defaultLayout.footer;
  const showToTop = config.toTop ?? defaultLayout.toTop;
  const showContentPadding = config.contentPadding ?? showHeader;

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
