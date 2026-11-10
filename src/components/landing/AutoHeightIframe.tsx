"use client";

import { useEffect, useRef } from "react";

type AutoHeightIframeProps = {
  src: string;
  title: string;
  frameId?: string;
  observeContentSize?: boolean;
};

export default function AutoHeightIframe({ src, title, frameId, observeContentSize = false }: AutoHeightIframeProps) {
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

    let observer: ResizeObserver | undefined;
    let mutationObserver: MutationObserver | undefined;
    const refreshTimers: number[] = [];
    const observeFrameContent = () => {
      if (!observeContentSize || !frame.contentDocument || typeof ResizeObserver === "undefined") return;
      const document = frame.contentDocument;
      observer = new ResizeObserver(resize);
      observer.observe(document.documentElement);
      if (document.body) observer.observe(document.body);
      if (typeof MutationObserver !== "undefined" && document.body) {
        mutationObserver = new MutationObserver(resize);
        mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
      }
      window.requestAnimationFrame(resize);
      document.fonts?.ready.then(resize).catch(() => {});
      [50, 150, 300, 600, 1000, 2000].forEach((delay) => {
        refreshTimers.push(window.setTimeout(resize, delay));
      });
    };

    frame.addEventListener("load", resize);
    frame.addEventListener("load", observeFrameContent);
    const interval = window.setInterval(resize, observeContentSize ? 1000 : 500);
    resize();

    return () => {
      frame.removeEventListener("load", resize);
      frame.removeEventListener("load", observeFrameContent);
      window.clearInterval(interval);
      observer?.disconnect();
      mutationObserver?.disconnect();
      refreshTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [observeContentSize, src]);

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
