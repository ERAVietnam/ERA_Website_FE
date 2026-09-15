"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { theme, HOTLINE, HOTLINE_TEL } from "../theme";

const MENU = [
  { label: "Vị trí", id: "vi-tri" },
  { label: "Tiện ích sống", id: "hien-huu" },
  { label: "Xem nhà 360°", id: "xem-360" },
  { label: "Biệt thự", id: "biet-thu" },
  { label: "Giá", id: "gia" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 10) setHidden(false);
      else if (y > lastY && y > 80) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="aq-wp-header sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: theme.iceLight,
        }}
      >
        <div className="aq-wp-headbar mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-[22px] py-[13px]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Waterpoint — về đầu trang"
            className="block leading-[0]"
          >
            <Image
              src="/landing/waterpoint/waterpoint-logo.png"
              alt="Waterpoint"
              width={200}
              height={134}
              priority
              className="aq-wp-logo block h-11 w-auto"
            />
          </button>

          <nav className="aq-wp-nav flex flex-wrap items-center gap-[15px] sm:gap-5">
            {MENU.map((m) => (
              <button
                key={m.id}
                onClick={() => scrollTo(m.id)}
                className="aq-wp-navlink text-[13px] font-medium transition-colors hover:text-[#2E7C8C] sm:text-[14.5px]"
                style={{ color: theme.primaryDark }}
              >
                {m.label}
              </button>
            ))}
            <a
              href={`tel:${HOTLINE_TEL}`}
              className="aq-wp-hotline text-[13px] font-bold transition-colors hover:text-[#2E7C8C] sm:text-[14.5px]"
              style={{ color: theme.primary }}
            >
              Hotline
            </a>
            <button
              onClick={() => scrollTo("dang-ky")}
              className="aq-wp-cta rounded-full bg-[#1D5866] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2E7C8C]"
            >
              Nhận giỏ hàng
            </button>
            <button
              id="aq-nut-menu"
              onClick={() => setMenuOpen(true)}
              aria-label="Mở menu"
              className="hidden cursor-pointer items-center justify-center rounded-[11px] border-none bg-[#1D5866]"
              style={{ width: 40, height: 40, flex: "0 0 auto", padding: 0 }}
            >
              <i className="relative block rounded-[2px] bg-white" style={{ width: 17, height: 2 }}>
                <span
                  className="absolute left-0 rounded-[2px] bg-white"
                  style={{ top: -6, width: 17, height: 2 }}
                />
                <span
                  className="absolute left-0 rounded-[2px] bg-white"
                  style={{ top: 6, width: 17, height: 2 }}
                />
              </i>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Menu mobile — panel trượt từ trên (đúng mẫu) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            id="aq-menu-mobi"
            className="fixed inset-0 z-[400] block"
            style={{ background: "rgba(16,51,59,.55)", backdropFilter: "blur(2px)" }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-0 right-0 left-0 overflow-y-auto bg-white"
              style={{
                borderRadius: "0 0 20px 20px",
                padding: "13px 16px 18px",
                maxHeight: "92vh",
                boxShadow: "0 18px 44px rgba(16,51,59,.28)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex items-center justify-between gap-3 border-b pb-[11px]"
                style={{ borderColor: "#EEF4F5" }}
              >
                <b className="text-[11.5px] font-extrabold tracking-[0.15em]" style={{ color: theme.textSoft }}>
                  WATERPOINT — THE AQUA
                </b>
                <button
                  type="button"
                  aria-label="Đóng menu"
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer border-none text-lg leading-none"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#EEF4F5",
                    color: theme.primary,
                  }}
                >
                  ×
                </button>
              </div>
              {MENU.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => scrollTo(m.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-2.5 border-b bg-transparent py-[15px] pr-0.5 pl-0.5 text-left text-[16.5px] font-bold"
                  style={{ borderColor: "#F1F6F7", color: theme.primaryDark }}
                >
                  {m.label}
                  <em className="text-[12.5px] font-extrabold not-italic" style={{ color: "#C2D6DA" }}>
                    0{i + 1}
                  </em>
                </button>
              ))}
              <div className="mt-4 flex gap-2">
                <a
                  href={`tel:${HOTLINE_TEL}`}
                  className="flex-1 rounded-[11px] py-[13px] text-center text-sm font-extrabold no-underline text-white"
                  style={{ background: theme.primary }}
                >
                  Gọi {HOTLINE}
                </a>
                <button
                  onClick={() => scrollTo("dang-ky")}
                  className="flex-1 cursor-pointer rounded-[11px] border-none py-[13px] text-sm font-extrabold"
                  style={{ background: theme.cream, color: theme.primary }}
                >
                  Nhận giỏ hàng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
