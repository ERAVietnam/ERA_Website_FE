"use client";

import { useEffect, useState } from "react";

export default function ThankYouTheMarqPage() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    const redirect = setTimeout(() => { window.location.href = "/du-an-the-marq/"; }, 10000);
    return () => { clearInterval(interval); clearTimeout(redirect); };
  }, []);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden text-white" style={{ backgroundImage: "url('/landing/the-marq/assets/img/thank-you.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#20140d]/55" />
      <div className="relative z-10 mx-auto w-full max-w-[620px] px-6 text-center animate-[fade-in-up_.7s_ease-out_both]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">✓</div>
        <h1 className="mb-4 text-[clamp(34px,5vw,58px)] font-light leading-tight">Đăng ký thành công</h1>
        <p className="mb-2 text-[17px] text-white/95 md:text-[20px]">Chuyên viên tư vấn The Marq sẽ liên hệ lại với anh/chị.</p>
        <p className="text-[15px] text-white/80">Xin cảm ơn anh/chị đã quan tâm.</p>
        <p className="mt-8 text-[13px] text-white/70">Trở về trang The Marq sau {seconds} giây</p>
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
