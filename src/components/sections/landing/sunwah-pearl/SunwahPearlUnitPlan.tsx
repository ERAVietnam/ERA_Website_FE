"use client";

import { useState } from "react";
import styles from "./SunwahPearlUnitPlan.module.css";

const assetRoot = "/landing/sunwah-pearl/assets/";
// Positions follow the existing 1439 × 874 Silver House plan; 1/01 refers to the same unit.
const silverUnits = [
  { number: "01", beds: 3, baths: 2, x: 278, y: 240, w: 186, h: 177, shape: [[0, 15], [25, 15], [25, 0], [100, 0], [100, 100], [48, 100], [48, 89], [0, 89]] },
  { number: "02", beds: 2, baths: 2, x: 463, y: 268, w: 179, h: 150, shape: [[0, 0], [35, 0], [35, 11], [100, 11], [100, 100], [0, 100]] },
  { number: "03", beds: 1, baths: 1, x: 641, y: 287, w: 108, h: 131, shape: [[0, 0], [100, 0], [100, 100], [0, 100]] },
  { number: "04", beds: 2, baths: 2, x: 748, y: 270, w: 177, h: 148, shape: [[0, 11], [67, 11], [67, 0], [100, 0], [100, 100], [0, 100]] },
  { number: "05", beds: 3, baths: 2, x: 924, y: 242, w: 184, h: 175, shape: [[0, 0], [76, 0], [76, 14], [100, 14], [100, 84], [50, 84], [50, 100], [0, 100]] },
  { number: "06", beds: 3, baths: 2, x: 927, y: 441, w: 181, h: 175, shape: [[0, 0], [43, 0], [43, 14], [100, 14], [100, 85], [75, 85], [75, 100], [0, 100]] },
  { number: "07", beds: 2, baths: 2, x: 694, y: 441, w: 234, h: 151, shape: [[0, 0], [48, 0], [48, 34], [80, 34], [80, 44], [100, 44], [100, 100], [70, 100], [70, 88], [0, 88]] },
  { number: "08", beds: 2, baths: 2, x: 463, y: 442, w: 231, h: 149, shape: [[0, 35], [50, 35], [50, 0], [100, 0], [100, 88], [28, 88], [28, 100], [0, 100]] },
  { number: "09", beds: 3, baths: 2, x: 279, y: 442, w: 185, h: 175, shape: [[0, 12], [55, 12], [55, 0], [100, 0], [100, 100], [25, 100], [25, 86], [0, 86]] },
];

// White's desktop export prints "1" at the bottom left; the mobile export and supplied label identify it as 10.
// Desktop boxes include each supplied PNG's transparent margins; polygons follow the actual stroke centerline.
// Unit 04's desktop artwork restores the upper stroke covered by the label in the supplied image.
const whiteUnits = [
  { number: "01", beds: 2, baths: 2, x: 300.5, y: 223.5, w: 220, h: 195.5, shape: [[10.86, 2.03], [96.38, 2.03], [97.74, 97.46], [52.49, 97.46], [52.49, 84.77], [51.13, 83.25], [1.81, 83.25], [1.81, 34.52], [9.5, 34.52], [10.86, 32.99]] },
  { number: "02", beds: 1, baths: 1, x: 510, y: 224.5, w: 177, h: 194.5, shape: [[2.23, 2.04], [15.08, 2.04], [15.08, 8.16], [16.76, 9.69], [75.98, 9.69], [75.98, 47.45], [58.66, 47.45], [56.42, 49.49], [56.42, 89.29], [22.35, 89.29], [20.67, 90.82], [20.67, 97.45], [2.23, 97.45]] },
  { number: "03", beds: 1, baths: 1, x: 603, y: 240.5, w: 192, h: 179.5, shape: [[20.63, 2.25], [89.42, 2.25], [89.42, 64.04], [39.15, 64.61], [38.62, 97.75], [17.99, 97.75], [17.99, 94.38], [16.4, 92.7], [2.12, 92.7], [2.12, 42.13], [18.52, 42.13], [20.63, 39.89]] },
  { number: "04", beds: 1, baths: 1, x: 765, y: 227, w: 173, h: 192.5, shape: [[67.65, 2.07], [80.59, 2.07], [80.59, 97.93], [35.29, 97.93], [34.71, 66.84], [2.94, 66.32], [2.94, 10.36], [65.29, 10.36], [67.65, 8.29]] },
  { number: "05", beds: 2, baths: 2, x: 899, y: 225, w: 215.5, h: 193, shape: [[1.83, 2.07], [88.53, 2.07], [88.53, 33.68], [89.91, 35.23], [97.71, 35.23], [97.71, 86.01], [51.38, 86.01], [50, 87.56], [50, 97.93], [1.83, 97.93]] },
  { number: "06", beds: 2, baths: 2, x: 899, y: 444, w: 217, h: 190.5, shape: [[1.82, 2.07], [38.64, 2.07], [38.64, 12.95], [40, 14.51], [98.18, 14.51], [98.18, 65.28], [90, 65.28], [88.64, 66.84], [88.64, 97.41], [1.82, 97.41]] },
  { number: "07", beds: 1, baths: 1, x: 770, y: 442, w: 179, h: 193, shape: [[32.24, 2.07], [74.32, 2.07], [74.32, 97.93], [62.3, 97.93], [62.3, 91.71], [60.11, 89.64], [2.19, 89.64], [2.19, 33.68], [31.69, 33.16]] },
  { number: "08", beds: 1, baths: 1, x: 606.5, y: 443.5, w: 185, h: 177, shape: [[20.74, 2.25], [38.83, 2.25], [38.83, 34.27], [40.43, 35.96], [89.89, 35.96], [89.89, 97.75], [20.74, 97.75], [20.74, 60.11], [18.62, 57.87], [2.13, 57.87], [2.13, 20.79], [20.21, 20.22]] },
  { number: "09", beds: 1, baths: 1, x: 499.5, y: 443.5, w: 173, h: 194.5, shape: [[8, 2.04], [26.86, 2.04], [26.86, 5.61], [28.57, 7.14], [54.29, 7.14], [54.86, 16.84], [63.43, 17.35], [64, 51.53], [83.43, 52.04], [83.43, 89.8], [23.43, 89.8], [21.14, 91.84], [21.14, 97.45], [8, 97.45]] },
  { number: "10", beds: 2, baths: 2, x: 301, y: 443.5, w: 219, h: 194.5, shape: [[52.49, 2.54], [97.74, 2.54], [96.38, 97.97], [10.86, 97.97], [10.86, 67.01], [9.5, 65.48], [1.81, 65.48], [1.81, 16.75], [51.13, 16.75], [52.49, 15.23]] },
];

// Golden's supplied labels identify 01–09, 11, 12, 12A and 14. No unit 10 artwork was supplied.
// Coordinates include the transparent canvas margins and follow the native 1440 × 874 panel.
const goldenUnits = [
  { number: "01", beds: 3, baths: 2, x: 192.35, y: 270.94, w: 175.87, h: 158.62, shape: [[14.66, 3.82], [87.93, 3.82], [87.93, 96.5], [46.84, 96.5], [46.84, 87.58], [7.76, 87.58], [7.76, 47.45], [14.66, 47.45]] },
  { number: "02", beds: 2, baths: 2, x: 331.44, y: 289.43, w: 175.62, h: 138.78, shape: [[8.86, 3.26], [89.14, 3.26], [89.14, 66.67], [44, 66.67], [44, 96.01], [8.86, 96.01]] },
  { number: "03", beds: 2, baths: 2, x: 470.44, y: 299.03, w: 175.64, h: 130.45, shape: [[9.43, 4.58], [44.29, 4.58], [44.29, 14.5], [88, 14.5], [88, 95.8], [19.14, 95.8], [19.14, 64.5], [9.43, 64.5]] },
  { number: "04", beds: 2, baths: 2, x: 606.31, y: 311.58, w: 176.79, h: 118.17, shape: [[10.57, 4.24], [94.29, 4.24], [94.29, 95.34], [10.57, 95.34]] },
  { number: "05", beds: 2, baths: 2, x: 757.61, y: 303.97, w: 173.76, h: 126.08, shape: [[54, 2.4], [89.43, 2.4], [89.43, 66], [85.43, 66], [85.43, 95.2], [8.86, 95.2], [8.86, 10], [54, 10]] },
  { number: "06", beds: 2, baths: 2, x: 894.38, y: 289.47, w: 176.26, h: 140.08, shape: [[9.43, 3.24], [88.86, 3.24], [88.86, 96.04], [62, 96.04], [62, 69.78], [9.43, 69.78]] },
  { number: "07", beds: 3, baths: 2, x: 1040.39, y: 270.5, w: 176.97, h: 159, shape: [[5.43, 4.09], [74.86, 4.09], [74.86, 19.5], [81.71, 19.5], [81.71, 87.74], [42.57, 87.74], [42.57, 96.54], [5.43, 96.54]] },
  { number: "08", beds: 3, baths: 2, x: 1033.19, y: 438.41, w: 168.81, h: 159.7, shape: [[9.76, 3.5], [38.17, 3.5], [38.17, 15.29], [88.17, 16.24], [88.17, 82.47], [81.66, 83.25], [81.66, 96.18], [9.76, 96.18]] },
  { number: "09", beds: 2, baths: 2, x: 893.67, y: 439.56, w: 173.14, h: 140.37, shape: [[62.86, 3.87], [90.29, 3.87], [90.29, 95.77], [9.43, 95.77], [9.43, 32.04], [62.86, 32.04]] },
  { number: "11", beds: 2, baths: 2, x: 607.27, y: 440.47, w: 175.65, h: 119.55, shape: [[9.43, 4.62], [44.86, 4.62], [44.86, 38.66], [92.86, 38.66], [92.86, 94.96], [9.43, 94.96]] },
  { number: "12", beds: 2, baths: 2, x: 470.5, y: 440.45, w: 175, h: 130.78, shape: [[18.86, 4.2], [88.29, 4.2], [88.29, 85.11], [44.29, 85.11], [44.29, 95.8], [9.43, 95.8], [9.43, 33.97], [18.86, 33.97]] },
  { number: "12A", beds: 2, baths: 2, x: 333.35, y: 440.52, w: 174.87, h: 140.46, shape: [[7.8, 3.9], [41.04, 3.9], [41.04, 31.91], [87.57, 31.91], [87.86, 95.74], [7.8, 95.74]] },
  { number: "14", beds: 3, baths: 2, x: 192.45, y: 439.46, w: 175.62, h: 159.07, shape: [[53.71, 3.48], [88, 3.48], [88, 96.52], [14, 96.52], [14, 51.58], [7.71, 51.58], [7.71, 14.56], [53.71, 14.56]] },
];

export default function SunwahPearlUnitPlan({ house, mobile = false, width, onOpenPlan }: { house: "silver" | "white" | "golden"; mobile?: boolean; width?: number; onOpenPlan?: () => void }) {
  const units = house === "white" ? whiteUnits : house === "golden" ? goldenUnits : silverUnits;
  const [activeUnit, setActiveUnit] = useState<(typeof units)[number] | null>(null);
  const imageWidth = house === "white" ? 1432 : (mobile ? 319 : house === "golden" ? 1440 : 1439);
  const imageHeight = mobile ? (house === "golden" ? 526 : 528) : 874;
  const mobileScale = house === "golden" ? .365 : .366;
  const mobileOffsetY = house === "golden" ? 525.648 : 526.748;
  const title = `${house.toUpperCase()} HOUSE`;
  const labelX = activeUnit ? (mobile ? -.84 + (activeUnit.y + activeUnit.h / 2) * mobileScale : activeUnit.x + activeUnit.w / 2) : 0;
  const mobileLabelY = activeUnit ? mobileOffsetY - (activeUnit.x + activeUnit.w) * mobileScale : 0;
  // Golden's first mobile row starts at y=94, just below the baked-in heading.
  const labelY = activeUnit ? (mobile ? (house === "golden" ? Math.max(94, mobileLabelY) : mobileLabelY) : activeUnit.y) : 0;
  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- Preserve the existing panel exactly, including its responsive export.
    <img src={`${assetRoot}sunwah-pearl-${house}-house${mobile ? "-mobile" : ""}.webp`} width={imageWidth} height={imageHeight} alt={`${title} – mặt bằng tầng điển hình và bố trí các căn hộ`} loading={onOpenPlan ? "lazy" : "eager"} decoding="async" draggable={false} />
  );

  return (
    <div
      className={styles.plan}
      style={{ width }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setActiveUnit(null);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActiveUnit(null);
      }}
    >
      {onOpenPlan ? (
        <button type="button" className={styles.overview} onClick={onOpenPlan} aria-label={`Phóng lớn mặt bằng ${title}`} aria-haspopup="dialog">
          {image}
        </button>
      ) : image}
      <svg className={styles.regions} viewBox={`0 0 ${imageWidth} ${imageHeight}`} aria-label={`Các căn hộ ${title}`}>
        {/* Silver and Golden mobile exports rotate the plan 90° counterclockwise, at their own raster scale. */}
        <g transform={mobile ? `matrix(0 -${mobileScale} ${mobileScale} 0 -.84 ${mobileOffsetY})` : undefined}>
          {units.map((unit) => (
            <g key={unit.number}>
              <polygon
                className={styles.hotspot}
                points={unit.shape.map(([x, y]) => `${unit.x + x * unit.w / 100},${unit.y + y * unit.h / 100}`).join(" ")}
                role="button"
                tabIndex={0}
                aria-label={`Xem căn ${unit.number}`}
                aria-pressed={activeUnit === unit}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch" && event.buttons === 0) setActiveUnit(unit);
                }}
                onPointerDown={(event) => {
                  if (event.pointerType === "touch") setActiveUnit(unit);
                }}
                onFocus={() => setActiveUnit(unit)}
                onClick={() => setActiveUnit(unit)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveUnit(unit);
                  }
                }}
              />
              {activeUnit === unit && (
                <svg x={unit.x} y={unit.y} width={unit.w} height={unit.h} viewBox="0 0 1 1" preserveAspectRatio="none" className={styles.outline} aria-hidden="true">
                  <image href={`${assetRoot}${house}-unit-${unit.number}${house === "white" && unit.number === "04" ? "-desktop" : ""}-outline.webp`} width="1" height="1" preserveAspectRatio="none" />
                </svg>
              )}
            </g>
          ))}
        </g>
      </svg>
      {activeUnit && (
        <div className={styles.label} style={{ left: `${labelX / imageWidth * 100}%`, top: `${labelY / imageHeight * 100}%`, width: house === "golden" && mobile ? "45%" : undefined }} role="status">
          {/* eslint-disable-next-line @next/next/no-img-element -- Use the exact supplied label artwork, kept upright on mobile. */}
          <img src={`${assetRoot}${house}-unit-${activeUnit.number}-label.webp`} width={house === "white" && !["08", "09"].includes(activeUnit.number) ? 170 : 175} height={42} alt={`CĂN SỐ ${activeUnit.number} – ${activeUnit.beds} PN, ${activeUnit.baths} WC`} draggable={false} />
        </div>
      )}
    </div>
  );
}
