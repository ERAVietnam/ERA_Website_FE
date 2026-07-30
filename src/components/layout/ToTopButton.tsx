"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { cn } from "@/lib/utils";
import { ArrowUp, Pencil, Headset, X } from "lucide-react";
import { colors, withOpacity } from "@/lib/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { ConsultationCard } from "@/components/shared/ConsultationCard";

export function ToTopButton() {
  const { isVisible, scrollToTop } = useScrollToTop(400);
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isProjectsPage = pathname === "/du-an" || pathname.startsWith("/du-an/");
  const excludedNewsPaths = [
    "/tin-tuc/quan-ly",
    "/tin-tuc/tim-kiem",
    "/tin-tuc/tap-chi",
    "/tin-tuc/era-news",
    "/tin-tuc/tin-thi-truong",
    "/tin-tuc/tin-du-an",
    "/tin-tuc/thong-cao-bao-chi",
  ];
  const normalizedPathname = pathname.replace(/\/$/, "");
  const isNewsDetail =
    /^\/tin-tuc\/[^/]+$/.test(normalizedPathname) &&
    !excludedNewsPaths.includes(normalizedPathname);
  const showConsultation = isProjectsPage || isNewsDetail;

  const consultationSourceUrl = pathname;
  const consultationSourceLabel = isProjectsPage
    ? pathname === "/du-an"
      ? "Trang dự án"
      : "Chi tiết dự án"
    : isNewsDetail
      ? "Chi tiết tin tức"
      : "Trang ERA Vietnam";

  const buttonBaseClass =
    "fixed right-6 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const iconClass = "w-4 h-4 md:w-5 md:h-5";

  const buttonStyle = {
    backgroundColor: colors.primary.DEFAULT,
    color: colors.neutral.white,
    boxShadow: `0 10px 15px -3px ${withOpacity(colors.neutral.black, 0.1)}, 0 4px 6px -4px ${withOpacity(colors.neutral.black, 0.1)}`,
  };

  const hoverStyle = {
    backgroundColor: colors.primary.dark.DEFAULT,
    transform: "translateY(-4px)",
    boxShadow: `0 20px 25px -5px ${withOpacity(colors.neutral.black, 0.1)}, 0 8px 10px -6px ${withOpacity(colors.neutral.black, 0.1)}`,
  };

  const editBottomClass = showConsultation
    ? "bottom-[136px] md:bottom-20"
    : "bottom-20";
  const consultationBottomClass = "bottom-20 md:hidden";

  return (
    <>
      {isAuthenticated && (
        <Link
          href="/ho-so-ca-nhan"
          className={cn(buttonBaseClass, editBottomClass)}
          style={buttonStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, hoverStyle);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary.DEFAULT;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
          }}
          aria-label="Quản lý"
        >
          <Pencil className={iconClass} />
        </Link>
      )}

      {showConsultation && (
        <button
          type="button"
          className={cn(
            buttonBaseClass,
            consultationBottomClass,
            "md:hidden"
          )}
          style={{
            backgroundColor: colors.secondary.DEFAULT,
            color: colors.neutral.white,
            boxShadow: buttonStyle.boxShadow,
          }}
          onClick={() => setIsOpen(true)}
          aria-label="Tư vấn mua nhà"
        >
          <Headset className={iconClass} />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-xl border border-gray-100 p-5 shadow-sm max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 z-10"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
            <ConsultationCard
              sourceUrl={consultationSourceUrl}
              sourceLabel={consultationSourceLabel}
            />
          </div>
        </div>
      )}

      <button
        onClick={scrollToTop}
        className={cn(
          buttonBaseClass,
          "bottom-6",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={buttonStyle}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, hoverStyle);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.primary.DEFAULT;
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = buttonStyle.boxShadow;
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp className={iconClass} />
      </button>
    </>
  );
}
