"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouSunwahPearlPage() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    const redirect = setTimeout(() => { window.location.href = "/du-an-sunwah-pearl-dau-tu/"; }, 10000);
    return () => { clearInterval(interval); clearTimeout(redirect); };
  }, []);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden text-white" style={{ backgroundImage: "url('/landing/sunwah-pearl/assets/sunwah-pearl-registration.webp')", backgroundSize: "cover", backgroundPosition: "center bottom" }}>
      <div className="absolute inset-0 bg-[#500347]/75" />
      <div className="sunwah-thank-you-content relative z-10 mx-auto w-full max-w-[620px] px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl" aria-hidden="true">✓</div>
        <h1 className="mb-4 text-[clamp(34px,5vw,58px)] font-semibold leading-tight">Đăng ký thành công</h1>
        <p className="mb-2 text-[17px] text-white/95 md:text-[20px]">Chuyên viên tư vấn Sunwah Pearl sẽ liên hệ lại với anh/chị.</p>
        <p className="text-[15px] text-white/80">Xin cảm ơn anh/chị đã quan tâm.</p>
        <p className="mt-8 text-[13px] text-white/70">Trở về trang Sunwah Pearl sau {seconds} giây</p>
        <Link href="/du-an-sunwah-pearl-dau-tu/" className="mt-5 inline-block rounded-full border border-white/60 px-6 py-3 text-sm font-semibold hover:bg-white/15">Trở về Sunwah Pearl</Link>
      </div>
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          .sunwah-thank-you-content { animation: sunwah-thank-you-enter .7s ease-out both; }
        }
        @keyframes sunwah-thank-you-enter {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
