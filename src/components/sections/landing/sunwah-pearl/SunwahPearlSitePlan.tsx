"use client";

import { useId, useState } from "react";
import styles from "./SunwahPearlSitePlan.module.css";

const assetRoot = "/landing/sunwah-pearl/assets/";
// Coordinates use the original 1437 × 874 export, shared by the clean plan and outlines.
const towers = [
  { name: "GOLDEN HOUSE", outline: "golden", x: 467, y: 99, width: 504, height: 212, labelX: 719, labelY: 126, index: 3, mobileIndex: 1, shape: "polygon(0 23%, 96.6% 0, 100% 76.4%, 3.4% 100%)" },
  { name: "WHITE HOUSE", outline: "white", x: 304, y: 441, width: 139, height: 271, labelX: 374, labelY: 443, index: 1, mobileIndex: 2, shape: "polygon(0 3%, 15% 3%, 18% 0, 81% 0, 83% 2%, 96% 2%, 100% 5%, 100% 95%, 97% 97%, 86% 97%, 82% 100%, 18% 100%, 15% 97%, 4% 97%, 0 95%)" },
  { name: "SILVER HOUSE", outline: "silver", x: 582, y: 551, width: 327, height: 156, labelX: 746, labelY: 553, index: 2, mobileIndex: 3, shape: "polygon(0 9%, 6% 9%, 6% 2%, 23% 2%, 23% 8%, 76% 8%, 77% 0, 93% 0, 93% 8%, 100% 8%, 100% 92%, 94% 92%, 94% 100%, 77% 100%, 77% 94%, 23% 94%, 23% 100%, 6% 100%, 6% 94%, 0 94%)" },
];

export default function SunwahPearlSitePlan({ onOpenPlan, width, imageSrc = `${assetRoot}sunwah-pearl-site-plan-clean.webp` }: { onOpenPlan?: (index: number, mobileIndex?: number) => void; width?: number; imageSrc?: string }) {
  const helpId = useId();
  const [activeTower, setActiveTower] = useState<(typeof towers)[number] | null>(null);
  // Without onOpenPlan this is embedded inside the lightbox's own zoom/pan wrapper.
  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- Keep the original export geometry aligned with its supplied outline assets.
    <img src={imageSrc} width={1437} height={874} alt="Mặt bằng tổng thể Sunwah Pearl: Golden House phía trên, White House bên trái, Silver House phía dưới" loading={onOpenPlan ? "lazy" : "eager"} decoding="async" draggable={false} />
  );
  const labelStyle = activeTower ? { left: `${activeTower.labelX / 1437 * 100}%`, top: `max(60px, ${activeTower.labelY / 874 * 100}%)` } : undefined;

  return (
    <div
      className={styles.plan}
      style={{ width }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setActiveTower(null);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActiveTower(null);
      }}
    >
      <p id={helpId} className="sr-only">Chọn một tòa nhà để xem tên.{onOpenPlan && " Chọn nhãn tên để phóng lớn mặt bằng tòa nhà, hoặc chọn nền để phóng lớn tổng thể."}</p>
      {onOpenPlan ? (
        <button type="button" onClick={() => onOpenPlan(0)} aria-label="Phóng lớn mặt bằng tổng thể Sunwah Pearl" aria-haspopup="dialog" className={styles.overview}>
          {image}
          <span className={styles.zoom} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6M7 10h6M10 7v6" /></svg>
          </span>
        </button>
      ) : image}
      {towers.map((tower) => (
        <div
          key={tower.name}
          className={styles.region}
          data-active={activeTower === tower}
          style={{ left: `${tower.x / 1437 * 100}%`, top: `${tower.y / 874 * 100}%`, width: `${tower.width / 1437 * 100}%`, height: `${tower.height / 874 * 100}%` }}
        >
          <button
            type="button"
            className={styles.hotspot}
            style={{ clipPath: tower.shape }}
            aria-label={`Xem khu ${tower.name}`}
            aria-describedby={helpId}
            aria-pressed={activeTower === tower}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch" && event.buttons === 0) setActiveTower(tower);
            }}
            onPointerDown={(event) => {
              if (event.pointerType === "touch") setActiveTower(tower);
            }}
            onFocus={() => setActiveTower(tower)}
            onClick={() => setActiveTower(tower)}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- Transparent outlines must scale with the original plan coordinates. */}
          <img className={styles.outline} src={`${assetRoot}sunwah-pearl-${tower.outline}-outline.webp`} width={tower.width} height={tower.height} alt="" aria-hidden="true" draggable={false} />
        </div>
      ))}
      {activeTower && (onOpenPlan ? (
        <button
          type="button"
          className={styles.label}
          style={labelStyle}
          onClick={() => onOpenPlan(activeTower.index, activeTower.mobileIndex)}
          aria-label={`Phóng lớn mặt bằng ${activeTower.name}`}
          aria-haspopup="dialog"
        >
          <strong>{activeTower.name}</strong>
        </button>
      ) : <div className={styles.label} style={labelStyle} role="status"><strong>{activeTower.name}</strong></div>)}
    </div>
  );
}
