"use client";

import { useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";

const NAV = [
  { href: "#tong-quan", label: "Tổng quan" },
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#mat-bang", label: "Mặt bằng", opt: true },
  { href: "#can-ho", label: "Căn hộ" },
  { href: "#hoi-dap", label: "Hỏi đáp", opt: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  /* Cuộn mượt tới section — dùng scrollIntoView thay anchor mặc định để URL không bị gắn # */
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
        <a className="brand" href="#top" aria-label="Nam Mekong Grand Plaza – về đầu trang" onClick={(e) => scrollTo(e, "#top")}>
          <Image
            src={`${IMG}/nam-mekong-grand-plaza-logo.webp`}
            alt="Logo Nam Mekong Grand Plaza Bình Dương"
            width={240}
            height={160}
            style={{ height: 40, width: "auto" }}
            priority
          />
        </a>
        <nav className="nav" id="nav" aria-label="Điều hướng trang">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={n.opt ? "opt" : ""} onClick={(e) => scrollTo(e, n.href)}>
              {n.label}
            </a>
          ))}
          <a className="nav-cta" href="#chinh-sach" onClick={(e) => scrollTo(e, "#chinh-sach")}>
            Chính sách &amp; thanh toán
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
