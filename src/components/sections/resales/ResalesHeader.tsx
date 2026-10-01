"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

/* Header riêng của trang /tuyen-dung-thu-cap (thay header chính của site — đã ẩn qua LayoutWrapper).
   Nền trắng, logo ERA + logo Resales Expert + hotline; sticky — cuộn xuống ẩn, cuộn lên hiện. */
export function ResalesHeader() {
  const [hideBar, setHideBar] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 80) setHideBar(true);
      else setHideBar(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: colors.neutral.white,
        boxShadow: "0 2px 12px rgba(12,12,68,0.12)",
        transform: hideBar ? "translateY(-100%)" : "none",
        transition: "transform 0.3s ease",
      }}
    >
      <Container className="flex items-center justify-between gap-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/resale/era_logo.svg"
            alt="ERA Vietnam"
            width={134}
            height={38}
            className="h-9 w-auto shrink-0"
            priority
          />
          <Image
            src="/resale/resale_logo.svg"
            alt="ERA Resales Expert"
            width={344}
            height={59}
            className="h-6 w-auto sm:h-8"
            priority
          />
        </div>
        <a
          href="tel:0909163139"
          aria-label="Hotline: 090 9163139"
          className="flex shrink-0 items-center justify-center rounded-full px-3 py-2.5 text-sm font-bold text-white transition-all hover:shadow-lg sm:px-5"
          style={{ backgroundColor: colors.primary.DEFAULT }}
        >
          <Phone size={18} strokeWidth={2.2} className="sm:hidden" />
          <span className="hidden whitespace-nowrap sm:inline">Hotline: 090 9163139</span>
        </a>
      </Container>
    </header>
  );
}
