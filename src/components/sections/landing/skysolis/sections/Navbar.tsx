"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IMG } from "../theme";

const NAV = [
  { href: "#tong-quan", label: "Tổng quan" },
  { href: "#vr360", label: "VR360", opt: true },
  { href: "#tien-ich", label: "Tiện ích" },
  { href: "#healthy-home", label: "Healthy Home", opt: true },
  { href: "#vi-tri", label: "Vị trí" },
  { href: "#can-ho", label: "Căn hộ" },
  { href: "#chinh-sach", label: "Chính sách" },
  { href: "#chu-dau-tu", label: "SkyWorld", opt: true },
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
        <a className="brand" href="#top" aria-label="SkySOLIS – về đầu trang" onClick={(e) => scrollTo(e, "#top")}>
          <Image
            src={`${IMG}/skysolis-logo.webp`}
            alt="Logo SkySOLIS"
            width={360}
            height={83}
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
