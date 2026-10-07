"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HOTLINE, HOTLINE_TEL, IMG } from "../theme";
import { submitLeadBeacon } from "../../lib/submit-lead";
import { gsLightboxOpen } from "./Lightbox";

interface PopupState {
  title: string;
  note: string;
}

const PopupContext = createContext<(title?: string, note?: string) => void>(() => {});

export const usePopup = () => useContext(PopupContext);

const DEFAULT_TITLE = "Nhận bảng giá & tham quan căn hộ mẫu Green Skyline";
const DEFAULT_NOTE =
  "Chuyên viên ERA gửi bảng giá, bảng tính dòng tiền và lịch tham quan căn hộ mẫu qua Zalo trong ngày.";

/* Nội dung popup tự động */
const AUTO_TITLE = "Green Skyline – Căn hộ “may đo” từ những giá trị thật";
const AUTO_NOTE =
  "Để lại số, em gửi bảng giá, bảng tính dòng tiền và lịch tham quan căn hộ mẫu cuối tuần qua Zalo.";

/* Popup form dùng chung — gửi về tab "GREEN SKYLINE" của sheet WATERPOINT
   (sendBeacon fire-and-forget + chuyển trang thank-you ngay, không loading nút). */
export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [pop, setPop] = useState<PopupState | null>(null);
  const daMoTuDong = useRef(false);

  const open = useCallback((title = DEFAULT_TITLE, note = DEFAULT_NOTE) => {
    daMoTuDong.current = true;
    setPop({ title, note });
  }, []);
  const close = useCallback(() => setPop(null), []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    submitLeadBeacon({
      formId: "GS_POPUP",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      sanpham: "-Green Skyline",
      sheet: "GREEN SKYLINE",
    });
    window.location.href = "/thank-you-green-skyline";
  };

  /* Tự mở 1 lần/phiên khi cuộn qua 45% trang */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("gs-pop") === "1") daMoTuDong.current = true;
    } catch {}

    let hoanDen = 0;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (a) hoanDen = Date.now() + 4000;
    };
    const thuMoTuDong = () => {
      if (daMoTuDong.current || pop || gsLightboxOpen.current || Date.now() < hoanDen) return;
      const d = document.documentElement;
      const max = Math.max(1, d.scrollHeight - window.innerHeight);
      if (window.scrollY / max < 0.45) return;
      daMoTuDong.current = true;
      try {
        sessionStorage.setItem("gs-pop", "1");
      } catch {}
      open(AUTO_TITLE, AUTO_NOTE);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", thuMoTuDong, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", thuMoTuDong);
    };
  }, [pop, open]);

  useEffect(() => {
    if (!pop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [pop, close]);

  return (
    <PopupContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {pop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gs-pop-t"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="pop"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="x" aria-label="Đóng" onClick={close}>
                ✕
              </button>
              <div className="ph">
                <Image
                  src={`${IMG}/green-skyline-ho-boi-tang-3-anh-thuc-te.webp`}
                  alt="Hồ bơi tầng 3 Green Skyline đã hoàn thiện"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="pt" id="gs-pop-t">
                {pop.title}
              </p>
              <p className="pn">{pop.note}</p>

              <form onSubmit={onSubmit}>
                <input
                  className="field"
                  name="hoten"
                  autoComplete="name"
                  required
                  placeholder="Họ tên (*)"
                  aria-label="Họ tên"
                />
                <input
                  className="field"
                  name="sdt"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                  pattern="[0-9 .+\-()]{9,16}"
                  title="Số di động 10 chữ số, bắt đầu bằng 03/05/07/08/09"
                  placeholder="Số điện thoại (*)"
                  aria-label="Số điện thoại"
                />
                <button className="nut cursor-pointer" type="submit" style={{ width: "100%" }}>
                  GỬI THÔNG TIN
                </button>
              </form>

              <div className="hot">
                <a href={`tel:${HOTLINE_TEL}`}>HOTLINE: {HOTLINE}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PopupContext.Provider>
  );
}
