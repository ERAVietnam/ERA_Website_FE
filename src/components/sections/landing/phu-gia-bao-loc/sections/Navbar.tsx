"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Tổng quan", targetId: "overview" },
  { label: "Vị trí", targetId: "location" },
  { label: "Tiện ích", targetId: "amenity" },
  { label: "Liên hệ", targetId: "contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current < 10) {
        setHidden(false);
      } else if (current > lastScrollY.current && current > 80) {
        setHidden(true);
      } else if (current < lastScrollY.current) {
        setHidden(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Desktop header */}
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed left-0 right-0 top-0 z-50 hidden border-b border-[#E6C98F]/30 bg-[#FBF7EF]/60 shadow-sm backdrop-blur-lg sm:block"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-10 lg:px-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center"
            aria-label="Về đầu trang"
          >
            <Image
              src="/landing/phu-gia-bao-loc/images/pgbl_green.svg"
              alt="Phú Gia Bảo Lộc"
              width={140}
              height={46}
              className="h-8 w-auto sm:h-10"
            />
          </button>

          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.targetId}>
                <button
                  onClick={() => scrollTo(item.targetId)}
                  className="text-base font-medium text-[#174C25] transition-colors hover:text-[#327400]"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Mobile floating drawer button */}
      <motion.button
        initial={false}
        animate={{ y: hidden ? "-150%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={() => setDrawerOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-[#327400]/25 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-[#327400]/45 focus:outline-none focus:ring-2 focus:ring-[#98FF98] sm:hidden"
        aria-label="Mở menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </motion.button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 sm:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-0 left-0 top-0 z-50 w-[280px] bg-[#FBF7EF] shadow-xl sm:hidden"
            >
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <Image
                    src="/landing/phu-gia-bao-loc/images/pgbl_green.svg"
                    alt="Phú Gia Bảo Lộc"
                    width={140}
                    height={46}
                    className="h-8 w-auto"
                  />
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#174C25] transition-colors hover:bg-[#F3ECE0]"
                    aria-label="Đóng menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="mt-10 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.targetId}
                      onClick={() => scrollTo(item.targetId)}
                      className="text-left text-lg font-medium text-[#174C25] transition-colors hover:text-[#327400]"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
