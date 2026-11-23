"use client";

import { useEffect, useRef } from "react";

type AutoHeightIframeProps = {
  src: string;
  title: string;
  frameId?: string;
  observeContentSize?: boolean;
  contentBottomSelector?: string;
};

export default function AutoHeightIframe({
  src,
  title,
  frameId,
  observeContentSize = false,
  contentBottomSelector,
}: AutoHeightIframeProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const resize = () => {
      const document = frame.contentDocument;
      if (!document) return;

      const content = contentBottomSelector
        ? document.querySelector<HTMLElement>(contentBottomSelector)
        : null;
      const bounds = content?.getBoundingClientRect();
      // A focused field or an earlier resize can scroll the iframe viewport.
      // Include overflowing children, such as a lazy image with negative margins.
      const contentBottom = content && bounds
        ? Math.max(bounds.bottom, bounds.top + content.scrollHeight) + (frame.contentWindow?.scrollY ?? 0)
        : 0;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body?.scrollHeight ?? 0,
      );

      const height = `${Math.ceil(contentBottom || documentHeight)}px`;
      if (frame.style.height !== height) frame.style.height = height;
    };

    let observer: ResizeObserver | undefined;
    let mutationObserver: MutationObserver | undefined;
    let removeContentListeners: (() => void) | undefined;
    const refreshTimers: number[] = [];
    let settlingInterval: number | undefined;
    let settlingStopTimer: number | undefined;
    const stopObserving = () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
      removeContentListeners?.();
      refreshTimers.splice(0).forEach((timer) => window.clearTimeout(timer));
      if (settlingInterval !== undefined) window.clearInterval(settlingInterval);
      if (settlingStopTimer !== undefined) window.clearTimeout(settlingStopTimer);
    };
    const observeFrameContent = () => {
      stopObserving();
      if (!observeContentSize || !frame.contentDocument || typeof ResizeObserver === "undefined") return;
      const document = frame.contentDocument;
      const contentWindow = frame.contentWindow;
      document.addEventListener("load", resize, true);
      contentWindow?.addEventListener("resize", resize);
      removeContentListeners = () => {
        document.removeEventListener("load", resize, true);
        contentWindow?.removeEventListener("resize", resize);
      };
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
      settlingInterval = window.setInterval(resize, 100);
      settlingStopTimer = window.setTimeout(() => {
        if (settlingInterval !== undefined) window.clearInterval(settlingInterval);
        settlingInterval = undefined;
      }, 5000);
    };

    frame.addEventListener("load", resize);
    frame.addEventListener("load", observeFrameContent);
    const interval = window.setInterval(resize, observeContentSize ? 1000 : 500);
    resize();
    if (frame.contentDocument?.readyState === "complete") observeFrameContent();

    return () => {
      frame.removeEventListener("load", resize);
      frame.removeEventListener("load", observeFrameContent);
      window.clearInterval(interval);
      stopObserving();
    };
  }, [contentBottomSelector, observeContentSize, src]);

  return (
    <iframe
      ref={frameRef}
      id={frameId}
      title={title}
      src={src}
      className="block w-full border-0"
      scrolling="no"
      style={{ height: "100vh" }}
    />
  );
}
