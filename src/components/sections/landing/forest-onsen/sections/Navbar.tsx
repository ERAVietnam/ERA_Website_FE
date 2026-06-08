"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { c } from "../theme";
import { projectInfo } from "../data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Onsen", href: "#onsen" },
    { label: "Không gian", href: "#khong-gian" },
    { label: "Vị trí", href: "#vi-tri" },
    { label: "Sản phẩm", href: "#bo-suu-tap" },
    { label: "Chính sách", href: "#chinh-sach" },
    { label: "Liên hệ", href: "#dang-ky" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <Image
            src="/landing/forest-onsen/02_img/brand/forest-onsen-logo.webp"
            alt="Forest Onsen - An Onsen & Wellness Residences"
            width={140}
            height={42}
            className="h-[42px] w-auto transition-all duration-500"
            style={{
              width: "auto",
              height: "auto",
              filter: scrolled ? "none" : "brightness(0) invert(1)",
            }}
            priority
          />
        </a>
        <div className="flex items-center gap-7">
          <nav className="hidden md:flex gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13.5px] font-normal tracking-wide transition-colors hover:opacity-80"
                style={{
                  color: scrolled
                    ? c.ink
                    : "rgba(255,255,255,.9)",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={`tel:${projectInfo.phone.replace(/\./g, "")}`}
            className="text-sm font-medium flex items-center gap-[7px]"
            style={{ color: scrolled ? c.green : c.white }}
          >
            ☏ <span className="hidden sm:inline">{projectInfo.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
