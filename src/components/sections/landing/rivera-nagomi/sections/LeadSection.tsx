"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMG, theme } from "../theme";
import { submitLead } from "../../lib/submit-lead";

const BULLETS = [
  "Nhận bảng giá chính thức và giỏ hàng theo từng zone",
  "Tính dòng tiền theo 3 lịch: chuẩn, thanh toán nhanh, vay ngân hàng",
  "Đi một vòng Waterpoint: River Club, bến du thuyền, EMASI Plus",
];

const PRODUCTS = ["Nhà phố vườn", "Shophouse", "Biệt thự song lập", "Biệt thự đơn lập", "Chưa xác định"];
const VISITS = ["Cuối tuần này", "Tuần tới", "Chưa xác định"];

const fieldStyle: React.CSSProperties = {
  border: "1.5px solid #DCE9EB",
  borderRadius: 10,
  padding: 14,
  fontSize: 15,
  outline: "none",
  color: theme.ink,
  background: "#FFFFFF",
  width: "100%",
  boxSizing: "border-box",
};

/* Form đăng ký tham quan — nối lead theo cách của landing waterpoint (dùng chung sheet WATERPOINT).
   Cột "Sản phẩm" luôn gắn hậu tố "-Rivera Nagomi" (kể cả khi khách không chọn dòng sản phẩm). */
export function LeadSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [visit, setVisit] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      await submitLead({
        formId: "RN_LEAD",
        hoten: name,
        sdt: phone,
        // Có chọn sản phẩm: "{sản phẩm}-Rivera Nagomi"; không chọn: "-Rivera Nagomi"
        sanpham:
          (product ? `${product}-Rivera Nagomi` : "-Rivera Nagomi") +
          (visit ? ` — Tham quan: ${visit}` : ""),
        sheet: "WATERPOINT",
      });
      setStatus("success");
      window.location.href = "/thank-you-waterpoint";
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="cta" id="dang-ky" style={{ scrollMarginTop: 74 }}>
      <Image
        src={`${IMG}/rivera-nagomi-phoi-canh-phan-khu-ben-song.webp`}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="cta-shade" aria-hidden="true"></div>
      <div className="cta-in">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Đăng ký tham quan Rivera Nagomi</h2>
          <p className="serif-lead">
            Trực tiếp trải nghiệm không gian sống ven sông, hệ tiện ích và giá trị khác biệt tại
            Rivera Nagomi – Waterpoint.
          </p>
          <ul>
            {BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="form-card"
        >
          <div className="t">Đăng ký tham quan &amp; nhận bảng giá</div>
          <div className="s">Tư vấn viên gọi lại trong ngày · Bảo mật thông tin</div>

          {status === "success" ? (
            <p className="m-0 text-center font-extrabold" style={{ color: theme.primary, marginTop: 24, fontSize: 16, lineHeight: 1.6 }}>
              Đã gửi thông tin thành công — tư vấn viên sẽ liên hệ trong ngày.
            </p>
          ) : (
            <form onSubmit={onSubmit}>
              <input
                className="field"
                name="name"
                autoComplete="name"
                required
                placeholder="Họ và tên"
                aria-label="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={fieldStyle}
              />
              <input
                className="field"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                required
                pattern="[0-9 .+()-]{9,16}"
                title="Số di động 10 chữ số, bắt đầu bằng 03/05/07/08/09"
                placeholder="Số điện thoại"
                aria-label="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={fieldStyle}
              />
              <select
                className="field"
                name="product"
                aria-label="Dòng sản phẩm quan tâm"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                style={fieldStyle}
              >
                <option value="">Dòng sản phẩm quan tâm</option>
                {PRODUCTS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <select
                className="field"
                name="visit"
                aria-label="Thời điểm muốn tham quan"
                value={visit}
                onChange={(e) => setVisit(e.target.value)}
                style={fieldStyle}
              >
                <option value="">Thời điểm muốn tham quan</option>
                {VISITS.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
              <button
                className="btn-sq cursor-pointer disabled:opacity-70"
                type="submit"
                disabled={status === "loading"}
                style={{ padding: 17, fontSize: 15 }}
              >
                {status === "loading" ? "ĐANG GỬI..." : "GỬI ĐĂNG KÝ"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="m-0 text-center" style={{ color: "#C8102E", fontSize: 13, marginTop: 10 }}>
              Gửi không thành công, vui lòng thử lại.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
