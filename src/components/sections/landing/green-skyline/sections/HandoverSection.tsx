"use client";

import { useState } from "react";
import { HANDOVER_RAW, HANDOVER_SUMMARY } from "../data";
import { HANDOVER_TABLES } from "../handover-data";
import { Reveal } from "../Reveal";

/* Tiêu chuẩn bàn giao — tóm tắt 6 nhóm + danh mục vật liệu chi tiết 3 loại sản phẩm (collapse) */
export function HandoverSection() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const cur = HANDOVER_TABLES[tab];

  return (
    <section className="sec" id="ban-giao">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <p className="kick">Bàn giao tiêu chuẩn cao cấp</p>
            <h2>
              Tiêu chuẩn bàn giao{" "}
              <span className="dong2">Căn hộ hoàn thiện cơ bản với vật liệu, thiết bị thương hiệu</span>
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <ul className="bgh" aria-label="Tiêu chuẩn căn hộ hoàn thiện cơ bản">
            {HANDOVER_SUMMARY.map((s) => (
              <li key={s.b}>
                <b>{s.b}</b>
                <span>{s.span}</span>
              </li>
            ))}
          </ul>
          <p className="tho">
            <b>Bàn giao thô:</b> {HANDOVER_RAW.replace("Bàn giao thô: ", "")}
          </p>
        </Reveal>

        <Reveal>
          <div className="bg-full">
            <button
              type="button"
              className="bg-mo"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open
                ? "Thu gọn danh mục vật liệu bàn giao chi tiết"
                : "Xem danh mục vật liệu bàn giao chi tiết (3 loại sản phẩm)"}
            </button>
            {open && (
              <div className="bg-in">
                <div className="tabs" role="tablist" aria-label="Chọn loại sản phẩm bàn giao">
                  {HANDOVER_TABLES.map((t, i) => (
                    <button
                      key={t.tab}
                      type="button"
                      role="tab"
                      aria-selected={tab === i}
                      onClick={() => setTab(i)}
                    >
                      {t.tab}
                    </button>
                  ))}
                </div>
                <div className="bg-tab" role="tabpanel">
                  <table className="bg-tb">
                    <caption className="sr">{cur.caption}</caption>
                    {cur.groups.map((g) => (
                      <tbody key={g.group}>
                        <tr className="nh">
                          <th colSpan={2} scope="colgroup">
                            {g.group}
                          </th>
                        </tr>
                        {g.rows.map(([item, value]) => (
                          <tr key={item}>
                            <th scope="row">{item}</th>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    ))}
                  </table>
                </div>
                <p className="note" style={{ marginTop: 14 }}>
                  Danh mục dự kiến theo tài liệu chủ đầu tư; vật tư có thể thay bằng loại tương
                  đương, quyền lựa chọn cuối cùng thuộc chủ đầu tư. Danh mục bàn giao kèm hợp đồng
                  mua bán là cơ sở pháp lý chính thức.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
