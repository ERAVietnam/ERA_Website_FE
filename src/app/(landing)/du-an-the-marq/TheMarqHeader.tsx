"use client";

import { useEffect, useState } from "react";

const links = [
  ["Tổng quan", "#tong-quan"],
  ["Gia chủ & đầu tư", "#so-sanh"],
  ["Giỏ hàng", "#can-ho"],
  ["Tối ưu hóa", "#toi-uu"],
] as const;

export default function TheMarqHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const frame = document.getElementById("the-marq-frame") as HTMLIFrameElement | null;
      const hero = frame?.contentDocument?.querySelector(".hero");
      if (frame && hero) {
        const heroBottom = hero.getBoundingClientRect().bottom + frame.getBoundingClientRect().top;
        setVisible(heroBottom <= 0);
        return;
      }
      setVisible(window.scrollY > 720);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const goToSection = (selector: string) => {
    const frame = document.getElementById("the-marq-frame") as HTMLIFrameElement | null;
    const target = frame?.contentDocument?.querySelector(selector);
    if (!frame || !target) return;
    const targetTop = target.getBoundingClientRect().top + frame.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: "TheMarqMedino";
          src: url("/landing/the-marq/assets/fonts/medino.ttf") format("truetype");
          font-display: swap;
        }
        @font-face {
          font-family: "TheMarqMontserrat";
          src: url("/landing/the-marq/assets/fonts/montserrat-vi.woff2") format("woff2");
          font-display: swap;
        }
        .the-marq-header-brand {
          font-family: "TheMarqMedino", Georgia, serif;
          background: linear-gradient(110deg, #b98432 0%, #ffe479 24%, #fffae2 45%, #e7b94e 65%, #fffcd7 82%, #c98b2d 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        .the-marq-header-nav, .the-marq-header-cta { font-family: "TheMarqMontserrat", Montserrat, Arial, sans-serif; }
      `}</style>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[78px] border border-t-0 border-[rgba(255,233,174,.24)] bg-[linear-gradient(180deg,rgba(66,42,25,.76),rgba(35,19,9,.54))] text-[#f8e7b9] shadow-[0_14px_38px_rgba(20,8,2,.28),inset_0_1px_0_rgba(255,255,255,.16)] backdrop-blur-[18px] transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"}`}
      >
      <div className="mx-auto flex h-full w-[min(1180px,calc(100%_-_96px))] items-center justify-between gap-9">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="the-marq-header-brand whitespace-nowrap text-[30px] leading-none tracking-[.02em] drop-shadow-[0_1px_12px_rgba(0,0,0,.3)]"
        >
          THE MARQ
        </button>
        <nav className="the-marq-header-nav flex items-center gap-7" aria-label="Điều hướng chính">
          {links.map(([label, selector]) => (
            <button
              key={selector}
              type="button"
              onClick={() => goToSection(selector)}
              className="text-[13px] uppercase tracking-[.08em] text-[#fff7e6] transition-colors hover:text-[#e9cd86]"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToSection("#dang-ky")}
            className="the-marq-header-cta rounded-full border border-[rgba(255,239,190,.68)] bg-[rgba(239,207,126,.92)] px-[19px] py-[11px] text-[13px] font-bold uppercase tracking-[.04em] text-[#3f2515] shadow-[0_5px_16px_rgba(12,4,0,.16)] transition-colors hover:bg-[#f5dfa5]"
          >
            NHẬN TƯ VẤN
          </button>
        </nav>
      </div>
      </header>
    </>
  );
}
