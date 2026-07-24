"use client";

import { useState, useEffect } from "react";
import { c } from "../theme";
import { projectInfo, navLinks } from "../data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.94)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #EEEEEE",
      }}
    >
      <div className="max-w-[1180px] mx-auto px-5 md:px-6 py-3 flex items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-baseline gap-2"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="font-black text-lg md:text-[21px] tracking-wide" style={{ color: c.red }}>
            RỪNG PHƯỢNG
          </span>
          <span
            className="font-semibold text-[10px] md:text-[11px] tracking-[0.16em] uppercase"
            style={{ color: c.green }}
          >
            Eco Retreat
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.href);
              }}
              className="text-[14.5px] font-medium transition-opacity hover:opacity-75"
              style={{ color: c.green }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${projectInfo.phoneLink}`}
            className="text-[14.5px] font-bold"
            style={{ color: c.green }}
          >
            {projectInfo.phone}
          </a>
          <a
            href="#dang-ky"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#dang-ky");
            }}
            className="text-sm font-bold text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
            style={{ background: c.red }}
          >
            Nhận bảng giá
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c.green} strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-5 py-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l.href);
                }}
                className="text-[15px] font-medium py-2"
                style={{ color: c.green }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${projectInfo.phoneLink}`}
              className="text-[15px] font-bold py-2"
              style={{ color: c.green }}
            >
              {projectInfo.phone}
            </a>
            <a
              href="#dang-ky"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#dang-ky");
              }}
              className="text-sm font-bold text-white text-center px-5 py-3 rounded-full"
              style={{ background: c.red }}
            >
              Nhận bảng giá
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
