"use client";

import { c } from "../theme";
import { projectInfo } from "../data";

export function FooterSection() {
  return (
    <footer
      className="py-10 px-5 md:px-6 text-center"
      style={{ background: c.mist, paddingBottom: "110px" }}
    >
      <div className="max-w-[900px] mx-auto">
        <div
          className="font-black text-[20px] mb-1.5"
          style={{ color: c.red }}
        >
          RỪNG PHƯỢNG{" "}
          <span
            className="font-semibold text-xs tracking-[0.14em]"
            style={{ color: c.green }}
          >
            ECO RETREAT
          </span>
        </div>
        <div
          className="font-semibold text-[15px] mb-1"
          style={{ color: c.green }}
        >
          Đơn vị phân phối: {projectInfo.distributor}
        </div>
        <div className="text-[15px] mb-4" style={{ color: c.text }}>
          Hotline:{" "}
          <a
            href={`tel:${projectInfo.phoneLink}`}
            className="font-bold transition-opacity hover:opacity-75"
            style={{ color: c.green }}
          >
            {projectInfo.phone}
          </a>
        </div>
        <p
          className="text-[12.5px] leading-relaxed m-0 max-w-[680px] mx-auto"
          style={{ color: "#999" }}
        >
          Hình ảnh phối cảnh mang tính minh họa. Thông tin có thể thay đổi theo công bố của chủ đầu tư.
        </p>
      </div>
    </footer>
  );
}
