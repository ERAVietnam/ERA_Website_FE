"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { theme } from "../theme";

const PANORAMA_4K = "/landing/waterpoint/waterpoint-360-biet-thu-4096.webp";
const PANORAMA_6K = "/landing/waterpoint/waterpoint-360-biet-thu-6144.webp";
const PANNELLUM_CSS = "https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.css";
const PANNELLUM_JS = "https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.js";

function pickPanorama(): string | null {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return null;
    return gl.getParameter(gl.MAX_TEXTURE_SIZE) >= 8192 ? PANORAMA_6K : PANORAMA_4K;
  } catch {
    return null;
  }
}

export function Tour360Section() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let tries = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    const showFallback = () => {
      if (cancelled || el.querySelector("canvas") || el.querySelector("img")) return;
      el.innerHTML =
        '<img src="' +
        PANORAMA_4K +
        '" alt="Biệt thự đã hoàn thiện trong Waterpoint, ảnh 360 độ chụp từ sân trước" style="width:100%;height:100%;object-fit:cover;">';
    };

    const tryInit = () => {
      if (cancelled) return;
      const pannellum = (window as unknown as { pannellum?: { viewer: Function } }).pannellum;
      if (!pannellum) return;
      if (el.querySelector("canvas") || el.dataset.xong === "1") return;
      const panorama = pickPanorama();
      if (!panorama) {
        showFallback();
        return;
      }
      el.dataset.xong = "1";
      try {
        pannellum.viewer(el.id, {
          type: "equirectangular",
          panorama,
          autoLoad: true,
          hfov: 108,
          minHfov: 50,
          maxHfov: 120,
          yaw: 99,
          pitch: -3,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          compass: false,
          keyboardZoom: false,
        });
      } catch {
        delete el.dataset.xong;
      }
    };

    const tick = () => {
      tries++;
      tryInit();
      const done = el.querySelector("canvas") || el.querySelector("img");
      if (done || tries >= 5) {
        if (timer) clearInterval(timer);
        timer = null;
        if (!done && tries >= 5) showFallback();
      }
    };

    const start = () => {
      if (timer || el.querySelector("canvas") || el.querySelector("img")) return;
      tick();
      if (!el.querySelector("canvas") && !el.querySelector("img") && tries < 5) {
        timer = setInterval(tick, 800);
      }
    };

    // Chỉ tải pannellum khi khách cuộn tới (đúng kỹ thuật mẫu)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          if (document.querySelector('link[href="' + PANNELLUM_CSS + '"]') === null) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = PANNELLUM_CSS;
            document.head.appendChild(link);
          }
          const existing = document.querySelector('script[src="' + PANNELLUM_JS + '"]') as HTMLScriptElement | null;
          if (existing) {
            if (existing.dataset.loaded === "1") start();
            else existing.addEventListener("load", start, { once: true });
          } else {
            const script = document.createElement("script");
            script.src = PANNELLUM_JS;
            script.async = true;
            script.onload = () => {
              script.dataset.loaded = "1";
              start();
            };
            document.body.appendChild(script);
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <section id="xem-360" className="w-full" style={{ background: theme.cream, padding: "clamp(58px,6vw,96px) 22px" }}>
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-8 max-w-[880px] text-center"
        >
          <h2
            className="font-black tracking-[0.02em]"
            style={{ color: theme.primary, fontSize: "clamp(26px,3.8vw,48px)", lineHeight: 1.1 }}
          >
            XEM BIỆT THỰ 360°
          </h2>
          <p
            className="mt-3 italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(18px,2.1vw,27px)",
              lineHeight: 1.4,
            }}
          >
            Kéo để xoay và nhìn trọn không gian một căn biệt thự đã hoàn thiện ở Waterpoint.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ minHeight: "clamp(330px,50vw,700px)" }}
        >
          <div
            id="aq-360"
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ minHeight: "inherit", background: theme.primaryDeep, height: "100%" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute right-3.5 bottom-3.5 z-5 rounded-full font-semibold tracking-[0.11em] text-white"
              style={{
                background: "rgba(9,42,48,.62)",
                fontSize: 12,
                padding: "8px 13px",
                backdropFilter: "blur(4px)",
              }}
            >
              KÉO ĐỂ XOAY 360°
            </span>
          </div>
        </motion.div>

              </div>
    </section>
  );
}
