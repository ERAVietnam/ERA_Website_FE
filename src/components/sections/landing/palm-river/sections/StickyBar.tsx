"use client";

import { useEffect, useState } from "react";
import { HOTLINE_TEL, ZALO_LINK } from "../theme";

/* Thanh liên hệ nhanh mobile — hiện sau khi cuộn qua hero */
export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setShow(window.scrollY / max > 0.08);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toForm = () => document.querySelector("#dang-ky")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className={`bar${show ? " show" : ""}`} aria-label="Liên hệ nhanh">
      <a href={`tel:${HOTLINE_TEL}`}>Gọi ngay</a>
      <a href={ZALO_LINK} target="_blank" rel="noopener">
        Zalo
      </a>
      <a
        className="chinh"
        href="#dang-ky"
        onClick={(e) => {
          e.preventDefault();
          toForm();
        }}
      >
        Nhận rổ hàng
      </a>
    </div>
  );
}
