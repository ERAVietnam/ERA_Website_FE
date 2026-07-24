"use client";

import { c } from "../theme";
import { projectInfo } from "../data";

export function MobileBar() {
  return (
    <div
      id="mobileBar"
      className="fixed left-0 right-0 bottom-0 z-[300] bg-white border-t md:hidden flex items-center gap-2.5 px-3.5 py-2.5"
      style={{
        borderColor: c.line,
        boxShadow: "0 -4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <a
        href={`tel:${projectInfo.phoneLink}`}
        className="flex-none flex items-center gap-1.5 font-bold text-sm px-4 py-3 rounded-[10px] border-[1.5px]"
        style={{ borderColor: c.red, color: c.red }}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c.red}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Gọi
      </a>
      <a
        href="#dang-ky"
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector("#dang-ky");
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex-1 text-center text-white font-bold text-[15px] py-3.5 rounded-[10px]"
        style={{ background: c.red }}
      >
        Nhận bảng giá
      </a>
    </div>
  );
}
