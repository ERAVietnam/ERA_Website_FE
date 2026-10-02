"use client";

import Image from "next/image";
import { IMG } from "../theme";
import { APP_FEATURES } from "../data";
import { Reveal } from "../Reveal";

const ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M9 11h.01M12 11h.01M15 11h.01"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 18c1-2.5 3-3.5 5-3.5s4 1 5 3.5"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M9 16l2 2 4-4"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18M15 7.5h2M15 16.5h2M7 7.5h2M7 16.5h2"/></svg>,
];

export function AppSection() {
  return (
    <section className="sec" id="ung-dung">
      <div className="wrap">
        <Reveal>
          <div className="app">
            <figure>
              <Image
                src={`${IMG}/skysolis-ung-dung-cu-dan-skyworld-connect.webp`}
                alt="Ứng dụng cư dân SkyWorld Connect trên điện thoạI: đặt tiện ích, đăng ký khách, nhận hàng Parcel Locker"
                width={900}
                height={741}
                sizes="(max-width: 900px) 100vw, 480px"
                loading="lazy"
              />
            </figure>
            <div className="app-in">
              <h2>Một điểm chạm – Vạn kết nối tiện ích</h2>
              <p className="lead">Ứng dụng SkyWorld Connect cho cư dân:</p>
              <ul className="tinh-nang">
                {APP_FEATURES.map((f, i) => (
                  <li key={f.b}>
                    {ICONS[i]}
                    <b>{f.b}</b>
                    <span>{f.span}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
