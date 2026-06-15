"use client";

import Link from "next/link";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { cn } from "@/lib/utils";
import { ArrowUp, Pencil } from "lucide-react";
import { colors, withOpacity } from "@/lib/theme";
import { useAuth } from "@/contexts/AuthContext";

export function ToTopButton() {
  const { isVisible, scrollToTop } = useScrollToTop(400);
  const { isAuthenticated } = useAuth();

  const buttonBaseClass =
    "fixed right-6 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

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

  return (
    <>
      {isAuthenticated && (
        <Link
          href="/ho-so-ca-nhan"
          className={cn(
            buttonBaseClass,
            "bottom-20"
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
          aria-label="Quản lý"
        >
          <Pencil size={20} />
        </Link>
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
        <ArrowUp size={20} />
      </button>
    </>
  );
}
