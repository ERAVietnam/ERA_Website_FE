"use client";

import { c } from "../theme";
import { projectInfo } from "../data";

export function FloatingButtons() {
  return (
    <div
      className="fixed right-4 bottom-[90px] z-[300] flex flex-col gap-3"
      style={{ animation: "rpFloat 4s ease-in-out infinite" }}
    >
      <a
        href={`tel:${projectInfo.phoneLink}`}
        title="Gọi ngay"
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: c.red,
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          animation: "rpPulse 2s infinite",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
      <a
        href={`https://zalo.me/${projectInfo.zalo}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo"
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg text-white font-extrabold text-sm"
        style={{ background: c.blue, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}
      >
        Zalo
      </a>
    </div>
  );
}
