"use client";

import { useState } from "react";
import Image from "next/image";
import { HOTLINE, HOTLINE_TEL, IMG } from "../theme";

const NAV = [
  { href: "#tong-quan", label: "Tổng quan" },
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#mat-bang", label: "Mặt bằng", opt: true },
  { href: "#nha-mau", label: "Nhà mẫu" },
  { href: "#chinh-sach", label: "Chính sách", opt: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else if (hash === "#top") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`hdr${open ? " open" : ""}`}>
      <div className="hdr-in">
        <a className="brand" href="#top" aria-label="Park Village – về đầu trang" onClick={(e) => scrollTo(e, "#top")}>
          <Image
            src={`${IMG}/waterpoint-logo.png`}
            alt="Logo khu đô thị Waterpoint của Nam Long"
            width={200}
            height={134}
            style={{ height: 38, width: "auto" }}
            priority
          />
          <b>PARK VILLAGE</b>
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
