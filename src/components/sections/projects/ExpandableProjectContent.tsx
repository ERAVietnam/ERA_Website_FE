"use client";

import { useEffect, useRef, useState } from "react";
import { colors } from "@/lib/theme";

interface ExpandableProjectContentProps {
  content: string | null | undefined;
}

const COLLAPSED_HEIGHT = "36rem";
const FADE_HEIGHT = 48; // px

export function ExpandableProjectContent({ content }: ExpandableProjectContentProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const target = el;

    function updateOverflow() {
      if (!target) return;
      setIsOverflow(target.scrollHeight > target.clientHeight);
    }

    updateOverflow();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateOverflow);
      resizeObserver.observe(target);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [content]);

  if (!content) return null;

  return (
    <div
      className="mb-8 relative"
      style={{ paddingBottom: expanded ? 0 : FADE_HEIGHT }}
    >
      <div
        ref={contentRef}
        className="ck-content transition-all duration-300"
        style={{
          color: colors.neutral.foreground,
          fontSize: "15px",
          lineHeight: 1.8,
          maxHeight: expanded ? undefined : `calc(${COLLAPSED_HEIGHT} - ${FADE_HEIGHT}px)`,
          overflow: expanded ? "visible" : "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {!expanded && isOverflow && (
        <>
          <div
            className="pointer-events-none absolute left-0 right-0 h-20"
            style={{
              bottom: FADE_HEIGHT,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95))",
            }}
          />
          <div
            className="absolute left-0 right-0 flex items-center justify-center gap-3 px-4"
            style={{ bottom: 0, height: FADE_HEIGHT }}
          >
            <div className="h-px flex-1 bg-gray-300" />
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-sm font-medium whitespace-nowrap text-gray-500 transition-colors hover:text-gray-700"
            >
              Xem thêm
            </button>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
        </>
      )}
    </div>
  );
}
