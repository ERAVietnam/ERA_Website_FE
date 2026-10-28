"use client";

import { useEffect, useState } from "react";

export default function ThankYouElyseIslandClient() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B2421] px-6 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url('/landing/elyse-island/assets/img/elyse-island-hoang-hon.webp')" }}
      />
      <div className="relative z-10 w-full max-w-xl text-center animate-[fade-in-up_.7s_ease-out_both]">
        <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#E2BCAC]">Elyse Island</p>
        <h1 className="mb-5 text-4xl font-semibold md:text-6xl">Đăng ký thành công</h1>
        <p className="mx-auto max-w-lg text-base leading-8 text-white/80 md:text-lg">
          Cảm ơn anh/chị đã quan tâm. Chuyên viên ERA Vietnam sẽ liên hệ và gửi thông tin dự án trong thời gian sớm nhất.
        </p>
        <p className="mt-8 text-sm text-white/65">Tự động trở về trang chủ sau {seconds} giây</p>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
