"use client";

import { useEffect, useState } from "react";

export default function ThankYouTheGioRiversidePage() {
  const [seconds, setSeconds] = useState(10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((value) => (value <= 1 ? 0 : value - 1));
    }, 1000);
    const redirect = window.setTimeout(() => {
      window.location.href = "/";
    }, 10000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(redirect);
    };
  }, []);

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"}`;

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('/landing/the-gio-riverside/assets/img/the-gio-riverside-hai-thap-ben-song-luc-hoang-hon.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#17303b]/75" />
      <div className="relative z-10 mx-auto max-w-[520px] px-6 text-center">
        <div className={`mb-6 ${fadeUp("delay-100")}`}>
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <p className={`mb-3 text-sm uppercase tracking-[0.2em] text-[#EBCFB0] ${fadeUp("delay-150")}`}>
          ERA Vietnam
        </p>
        <h1 className={`mb-4 text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] ${fadeUp("delay-200")}`}>
          Đăng ký thành công
        </h1>
        <p className={`mb-2 text-[17px] text-white/95 md:text-[19px] ${fadeUp("delay-300")}`}>
          Chuyên viên ERA Vietnam sẽ liên hệ tư vấn trong thời gian sớm nhất.
        </p>
        <p className={`text-[15px] text-white/80 ${fadeUp("delay-400")}`}>
          Cảm ơn anh/chị đã quan tâm The Gió Riverside.
        </p>
        <p className={`mt-8 text-[13px] text-white/70 ${fadeUp("delay-500")}`}>
          Trở về trang chủ sau {seconds} giây
        </p>
      </div>
    </main>
  );
}
