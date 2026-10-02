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

const DEFAULT_TITLE = "Nhận bảng giá chính thức";
const DEFAULT_NOTE = "Em gửi bảng giá, giỏ hàng theo zone và dòng tiền 3 lịch thanh toán qua Zalo.";

/* Nội dung popup tự động — theo mẫu rivera.js (loại 'auto') */
const AUTO_TITLE = "Rivera Nagomi — mảnh ghép mới tại Waterpoint";
const AUTO_NOTE = "Để lại số, em gửi bảng giá tham khảo và lịch tham quan cuối tuần.";

const fieldStyle: React.CSSProperties = {
  border: "1.5px solid #DCE9EB",
  borderRadius: 10,
  padding: 14,
  fontSize: 15,
  outline: "none",
  color: theme.ink,
  background: "#FFFFFF",
  width: "100%",
  boxSizing: "border-box",
};

/* Popup form dùng chung — nối lead theo cách của landing waterpoint (dùng chung sheet WATERPOINT).
   Popup không có ô "Sản phẩm quan tâm" -> cột Sản phẩm ghi "-Rivera Nagomi". */
export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [pop, setPop] = useState<PopupState | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const daMoTuDong = useRef(false); // đã mở popup (tự động hay tay) trong phiên xem này

  const open = useCallback(
    (title = DEFAULT_TITLE, note = DEFAULT_NOTE) => {
      daMoTuDong.current = true;
      setStatus("idle");
      setPop({ title, note });
    },
    []
  );
  const close = useCallback(() => setPop(null), []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi ngầm không chờ kết quả — thành công/lỗi đều báo thành công và chuyển trang ngay
    submitLeadBeacon({
      formId: "RN_POPUP",
      hoten: name,
      sdt: phone,
      sanpham: "-Rivera Nagomi",
      sheet: "WATERPOINT",
    });
    setStatus("success");
    window.location.href = "/thank-you-waterpoint";
  };

  /* Tự mở 1 lần/phiên khi khách cuộn qua 45% trang (giống The Aqua) — theo mẫu rivera.js:
     hoãn 4s nếu vừa bấm anchor link trong trang, không mở khi popup/lightbox đang mở */
  useEffect(() => {
    try {
      if (sessionStorage.getItem("rn-pop") === "1") daMoTuDong.current = true;
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
        sessionStorage.setItem("rn-pop", "1");
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
            aria-labelledby="rn-pop-t"
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
                  src={`${IMG}/rivera-nagomi-ho-boi-noi-khu.webp`}
                  alt="Hồ bơi nội khu Rivera Nagomi giữa các dãy biệt thự"
                  width={1400}
                  height={788}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="pt" id="rn-pop-t">
                {pop.title}
              </p>
              <p className="pn">{pop.note}</p>

              {status === "success" ? (
                <p className="m-0 text-center font-extrabold" style={{ color: theme.primary, fontSize: 15, lineHeight: 1.6, marginTop: 16 }}>
                  Đã gửi thông tin thành công — tư vấn viên sẽ liên hệ trong ngày.
                </p>
              ) : (
                <form onSubmit={onSubmit}>
                  <input
                    className="field"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Họ tên (*)"
                    aria-label="Họ tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={fieldStyle}
                  />
                  <input
                    className="field"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    pattern="[0-9 .+()-]{9,16}"
                    title="Số di động 10 chữ số, bắt đầu bằng 03/05/07/08/09"
                    placeholder="Số điện thoại (*)"
                    aria-label="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
              )}
              {status === "error" && (
                <p className="m-0 text-center" style={{ color: "#C8102E", fontSize: 13, marginTop: 8 }}>
                  Gửi không thành công, vui lòng thử lại.
                </p>
              )}

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
