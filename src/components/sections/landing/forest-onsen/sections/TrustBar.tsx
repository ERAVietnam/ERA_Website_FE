"use client";

import { c } from "../theme";
import { projectInfo } from "../data";

export function TrustBar() {
  return (
    <div className="bg-white border-b" style={{ borderColor: c.line }}>
      <div className="reveal max-w-[1180px] mx-auto px-7 py-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm tracking-wide text-center" style={{ color: c.inkSoft }}>
        <span>Phát triển bởi <b className="font-semibold" style={{ color: c.greenDeep }}>{projectInfo.developer}</b></span>
        <span>Cố vấn Onsen <b className="font-semibold" style={{ color: c.greenDeep }}>{projectInfo.advisor}</b></span>
        <span>Phân phối <b className="font-semibold" style={{ color: c.greenDeep }}>{projectInfo.distributor}</b></span>
      </div>
    </div>
  );
}

