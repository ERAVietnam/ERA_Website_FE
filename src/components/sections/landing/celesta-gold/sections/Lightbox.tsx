"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface LightboxState {
  src: string;
  caption: string;
}

const LightboxContext = createContext<(src: string, caption?: string) => void>(() => {});

export const useLightbox = () => useContext(LightboxContext);

/* Phóng to ảnh chung cho cả landing — thay thế lightbox JS của mẫu */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [box, setBox] = useState<LightboxState | null>(null);

  const open = useCallback((src: string, caption = "") => setBox({ src, caption }), []);
  const close = useCallback(() => setBox(null), []);

  useEffect(() => {
    if (!box) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [box, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {box && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lb open"
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh lớn"
            onClick={close}
          >
            <p>{box.caption}</p>
            <button type="button" aria-label="Đóng ảnh" onClick={close}>
              ✕
            </button>
            <div className="relative h-full w-full">
              <Image
                src={box.src}
                alt={box.caption}
                fill
                sizes="100vw"
                className="object-contain"
                style={{ borderRadius: 4 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
