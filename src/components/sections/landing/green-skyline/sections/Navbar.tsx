"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HOTLINE, HOTLINE_TEL, IMG } from "../theme";

const NAV = [
  { href: "#gia-tri", label: "Giá trị thật", opt: true },
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#tong-quan", label: "Tổng quan", opt: true },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#mat-bang", label: "Mặt bằng" },
  { href: "#can-ho", label: "Căn hộ" },
  { href: "#chinh-sach", label: "Chính sách" },
  { href: "#hoi-dap", label: "Hỏi đáp", opt: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const lastY = useRef(0);

  /* Ẩn header khi cuộn xuống, hiện lại khi cuộn lên (menu mobile đang mở thì luôn hiện) */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 80) setHide(true);
      else setHide(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setOpen(false);
    if (hash === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`hdr${open ? " open" : ""}${hide && !open ? " hdr-hide" : ""}`}>
      <div className="hdr-in">
        <a className="brand" href="#top" aria-label="Green Skyline – về đầu trang" onClick={(e) => scrollTo(e, "#top")}>
          <Image
            src={`${IMG}/green-skyline-logo-ngang.svg`}
            alt="Logo Green Skyline"
            width={796}
            height={171}
            style={{ height: 40, width: "auto" }}
            priority
          />
          <Image
            className="tbs-logo"
            src={`${IMG}/tbs-land-logo-xanh.webp`}
            alt="Logo TBS Land"
            width={480}
            height={114}
            style={{ height: 24, width: "auto" }}
            priority
          />
        </a>
        <nav className="nav" id="nav" aria-label="Điều hướng trang">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={n.opt ? "opt" : ""} onClick={(e) => scrollTo(e, n.href)}>
              {n.label}
            </a>
          ))}
          <a className="nav-tel" href={`tel:${HOTLINE_TEL}`}>
            {HOTLINE}
          </a>
          <a className="nav-cta" href="#dang-ky" onClick={(e) => scrollTo(e, "#dang-ky")}>
            Đăng ký tham quan
          </a>
        </nav>
        <button
          className="burger"
          type="button"
          aria-label="Mở menu"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
