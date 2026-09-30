"use client";

import { useEffect, useState } from "react";
import { HOTLINE_TEL, ZALO_LINK } from "../theme";
import { usePopup } from "./PopupForm";

/* Thanh gọi nhanh mobile — hiện sau khi cuộn qua hero (theo mẫu: .bar.show) */
export function StickyBar() {
  const [show, setShow] = useState(false);
  const openPopup = usePopup();

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setShow(window.scrollY / max > 0.08);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`bar${show ? " show" : ""}`} aria-label="Liên hệ nhanh">
      <a href={`tel:${HOTLINE_TEL}`}>Gọi ngay</a>
      <a className="z" href={ZALO_LINK} target="_blank" rel="noopener">
        Zalo
      </a>
      <button type="button" onClick={() => openPopup()}>
        NHẬN BẢNG GIÁ
      </button>
    </div>
  );
}
