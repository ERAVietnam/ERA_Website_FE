"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IMG, HOTLINE, HOTLINE_TEL, theme } from "../theme";
import { submitLeadBeacon } from "../../lib/submit-lead";
import { rnLightboxOpen } from "./Lightbox";

interface PopupState {
  title: string;
  note: string;
}

const PopupContext = createContext<(title?: string, note?: string) => void>(() => {});

export const usePopup = () => useContext(PopupContext);

const DEFAULT_TITLE = "Nhận thông tin Park Village";
const DEFAULT_NOTE =
  "Em gửi mặt bằng, mẫu nhà và bảng giá chính thức qua Zalo ngay khi chủ đầu tư công bố.";

/* Nội dung popup tự động — theo mẫu rivera (loại 'auto') */
const AUTO_TITLE = "Park Village — Họa phẩm châu Âu của riêng bạn";
const AUTO_NOTE = "Để lại số, em gửi mặt bằng, mẫu nhà và lịch tham quan cuối tuần qua Zalo.";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderRadius: 10,
  padding: 14,
  fontSize: 15,
  outline: "none",
  background: "#FFFFFF",
  color: theme.ink,
  boxSizing: "border-box",
};

/* Popup form dùng chung — gửi lead về sheet WATERPOINT theo cách của các landing
   (sendBeacon + chuyển trang thank-you ngay). Cột "Sản phẩm" gắn hậu tố "-Park Village". */
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
      formId: "PV_POPUP",
      hoten: (f.hoten as HTMLInputElement).value,
      sdt: (f.sdt as HTMLInputElement).value,
      sanpham: "-Park Village",
      sheet: "WATERPOINT",
      // endpoint mặc định /api/submit-lead (dùng chung sheet WATERPOINT như waterpoint & nagomi)
    });
    window.location.href = "/thank-you-waterpoint";
  };

  /* Tự mở 1 lần/phiên khi cuộn qua 45% trang (giống The Aqua / rivera) */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("pv-pop") === "1") daMoTuDong.current = true;
    } catch {}

    let hoanDen = 0;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (a) hoanDen = Date.now() + 4000;
    };
    const thuMoTuDong = () => {
      if (daMoTuDong.current || pop || rnLightboxOpen.current || Date.now() < hoanDen) return;
      const d = document.documentElement;
      const max = Math.max(1, d.scrollHeight - window.innerHeight);
      if (window.scrollY / max < 0.45) return;
      daMoTuDong.current = true;
      try {
        sessionStorage.setItem("pv-pop", "1");
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
            className="modal open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pv-pop-t"
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
                  src={`${IMG}/park-village-clubhouse-nam-au-vuon-hinh-hoc-800.webp`}
                  alt="Clubhouse Nam Âu và vườn hình học trong compound Park Village"
                  width={800}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="pt" id="pv-pop-t">
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
                  style={fieldStyle}
                />
                <input
                  className="field"
                  name="sdt"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                  pattern="[0-9 .+()-]{9,16}"
                  title="Số di động 10 chữ số, bắt đầu bằng 03/05/07/08/09"
                  placeholder="Số điện thoại (*)"
                  aria-label="Số điện thoại"
                  style={fieldStyle}
                />
                <button
                  className="btn-sq cursor-pointer disabled:opacity-70"
                  type="submit"
                  style={{ padding: 16 }}
                >
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
