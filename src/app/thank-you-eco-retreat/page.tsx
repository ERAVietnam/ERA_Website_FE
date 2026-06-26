"use client";

import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [seconds, setSeconds] = useState(10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const redirect = setTimeout(() => {
      window.location.href = "/";
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirect);
    };
  }, []);

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
    }`;

  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('/landing/forest-onsen/02_img/canh/forest-onsen-4-thap-view-ho-thien-nga.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(28,40,32,.72),rgba(28,40,32,.55))",
        }}
      />
      <div className="relative z-10 max-w-[520px] mx-auto px-6 text-center">
        <div className={`mb-6 ${fadeUp("delay-100")}`}>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <h1
          className={`text-[clamp(32px,5vw,48px)] font-semibold leading-[1.1] mb-4 whitespace-nowrap ${fadeUp("delay-200")}`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Đăng ký thành công
        </h1>
        <p className={`text-[17px] md:text-[19px] text-white/95 mb-2 ${fadeUp("delay-300")}`}>
          Chuyên viên tư vấn sẽ liên hệ lại ngay !
        </p>
        <p className={`text-[15px] text-white/80 ${fadeUp("delay-400")}`}>Xin cảm ơn</p>
        <p className={`text-[13px] text-white/60 mt-8 ${fadeUp("delay-500")}`}>
          Trở về trang chủ sau {seconds} giây
        </p>
      </div>
    </main>
  );
}
