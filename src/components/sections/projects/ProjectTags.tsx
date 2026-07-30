"use client";

import { useEffect, useRef, useState } from "react";
import { colors } from "@/lib/theme";

const TAG_MARQUEE_SPEED_PX_PER_SECOND = 40;

export function ProjectTags({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const checkOverflow = () => {
      const overflow = track.scrollWidth - container.clientWidth;
      if (overflow > 0) {
        const duration = track.scrollWidth / TAG_MARQUEE_SPEED_PX_PER_SECOND;
        track.style.setProperty("--marquee-translate", `-${overflow}px`);
        track.style.setProperty("--marquee-duration", `${duration}s`);
        setShouldAnimate(true);
      } else {
        track.style.removeProperty("--marquee-translate");
        track.style.removeProperty("--marquee-duration");
        setShouldAnimate(false);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [tags]);

  return (
    <div ref={containerRef} className="mb-3 overflow-hidden">
      <div
        ref={trackRef}
        className={`flex w-max ${shouldAnimate ? "animate-project-tag-marquee hover:[animation-play-state:paused]" : ""}`}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 mr-1"
            style={{ color: colors.primary.navy.DEFAULT, borderColor: colors.gray[200] }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
