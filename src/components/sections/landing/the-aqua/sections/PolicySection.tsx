"use client";

import { CS_ITEMS } from "../data";
import { Reveal } from "../Reveal";

/* Theo mẫu: chưa có CSBH chính thức — chỉ hiển thị nội dung chờ công bố */
export function PolicySection() {
  return (
    <section className="sec bg-cream" id="chinh-sach">
      <div className="wrap">
        <Reveal>
          <div className="head">
            <h2>Chính sách bán hàng, ưu đãi và lịch thanh toán</h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="cs">
            <div>
              <p className="body">
                Chính sách bán hàng, ưu đãi và lịch thanh toán The Aqua đang chờ chủ đầu tư công
                bố chính thức. Chuyên viên ERA sẽ cập nhật cho anh/chị ngay khi có thông báo, gồm
                ba nội dung bên cạnh.
              </p>
            </div>
            <ol>
              {CS_ITEMS.map((it) => (
                <li key={it.b}>
                  <span>
                    <b>{it.b}</b>
                    {it.span}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
