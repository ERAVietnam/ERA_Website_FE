"use client";

import { useEffect, useRef, useState } from "react";

const LANDING_SRC = "/landing/phu-gia-bao-loc-new/index.html?v=20261109-10";

export function PhuGiaBaoLocFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState("100vh");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type !== "era-landing-height") return;

      const nextHeight = Number(event.data.height);
      if (Number.isFinite(nextHeight) && nextHeight > 0) setHeight(`${Math.ceil(nextHeight)}px`);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={frameRef}
      src={LANDING_SRC}
      title="Phú Gia Bảo Lộc"
      className="block w-full border-0"
      style={{ height, overflow: "hidden" }}
      scrolling="no"
    />
  );
}
