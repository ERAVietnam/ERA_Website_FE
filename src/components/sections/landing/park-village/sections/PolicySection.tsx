"use client";

import { Reveal } from "../Reveal";
import { usePopup } from "./PopupForm";

const CS_ITEMS = [
  { b: "Bảng giá chính thức", span: "Theo từng dòng Garden, Park và Canal Grand Villa." },
  { b: "Ưu đãi đợt hiện hành", span: "Chiết khấu, quà tặng theo thông báo của chủ đầu tư." },
  { b: "Lịch thanh toán & hỗ trợ vay", span: "Tiến độ thanh toán và ngân hàng liên kết." },
];

/* Theo mẫu: chưa có CSBH chính thức — nút mở popup nhận thông báo */
export function PolicySection() {
  const openPopup = usePopup();

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
                Chính sách bán hàng, ưu đãi và lịch thanh toán Park Village đang chờ chủ đầu tư
                công bố chính thức. Để lại số điện thoại, ERA gửi ngay khi có thông báo — trước khi
                đăng lên các kênh công khai.
              </p>
              <button
                className="btn"
                type="button"
                onClick={() =>
                  openPopup(
                    "Nhận chính sách khi công bố",
                    "Em gửi bảng giá, ưu đãi và lịch thanh toán Park Village qua Zalo ngay khi chủ đầu tư công bố."
                  )
                }
              >
                NHẬN CHÍNH SÁCH KHI CÔNG BỐ
              </button>
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
