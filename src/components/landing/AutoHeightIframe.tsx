"use client";

import { useEffect, useRef } from "react";

type AutoHeightIframeProps = {
  src: string;
  title: string;
  frameId?: string;
};

export default function AutoHeightIframe({ src, title, frameId }: AutoHeightIframeProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const resize = () => {
      const document = frame.contentDocument;
      if (!document) return;

      frame.style.height = `${Math.max(
        document.documentElement.scrollHeight,
        document.body?.scrollHeight ?? 0,
      )}px`;
    };

    frame.addEventListener("load", resize);
    const interval = window.setInterval(resize, 500);
    resize();

    return () => {
      frame.removeEventListener("load", resize);
      window.clearInterval(interval);
    };
  }, [src]);

  return (
    <iframe
      ref={frameRef}
      id={frameId}
      title={title}
      src={src}
      className="block w-full border-0"
      style={{ height: "100vh" }}
    />
  );
}
