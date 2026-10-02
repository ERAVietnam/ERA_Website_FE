"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";

const NAV = [
  { href: "#tong-quan", label: "Tổng quan" },
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#mat-bang", label: "Mặt bằng", opt: true },
  { href: "#chinh-sach", label: "Chính sách", opt: true },
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
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else if (hash === "#top") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`hdr${open ? " open" : ""}${hide && !open ? " hdr-hide" : ""}`}>
      <div className="hdr-in">
        <a className="brand" href="#top" aria-label="The Aqua – về đầu trang" onClick={(e) => scrollTo(e, "#top")}>
          <Image
            src={`${IMG}/waterpoint-logo.png`}
            alt="Logo khu đô thị Waterpoint của Nam Long"
            width={200}
            height={134}
            style={{ height: 38, width: "auto" }}
            priority
          />
          <b>THE AQUA</b>
        </a>
        <nav className="nav" id="nav" aria-label="Điều hướng trang">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={n.opt ? "opt" : ""} onClick={(e) => scrollTo(e, n.href)}>
              {n.label}
            </a>
          ))}
          <a className="nav-cta" href="#nha-mau" onClick={(e) => scrollTo(e, "#nha-mau")}>
            Nhà mẫu
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
