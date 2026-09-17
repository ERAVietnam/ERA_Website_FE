"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { submitLead } from "../../lib/submit-lead";

const VILLA_LABELS: Record<string, string> = {
  detached: "Detached Villa · 225 - 292 m²",
  garden: "Garden Grand Villa · 300 - 780 m²",
  canal: "Canal Grand Villa · 304 - 541 m²",
  riverfront: "Riverfront Grand Villa · 600 - 1.302 m²",
};

const VISIT_LABELS: Record<string, string> = {
  weekend: "Cuối tuần này",
  nextweek: "Tuần tới",
  later: "Chưa xác định",
};

export function LeadSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [villa, setVilla] = useState("");
  const [visit, setVisit] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      await submitLead({
        formId: "WP_LEAD",
        hoten: name,
        sdt: phone,
        // Script chỉ ghi cột Q/R (Email/Lờ i nhắn) cho tab PGBL — với tab WATERPOINT
        // gộp loại biệt thự + thờ i điểm tham quan vào cột P "Sản phẩm" để không bị mất dữ liệu
        sanpham:
          (VILLA_LABELS[villa] || "") +
          (visit ? ` — Tham quan: ${VISIT_LABELS[visit]}` : ""),
        sheet: "WATERPOINT",
      });
      setStatus("success");
      window.location.href = "/thank-you-waterpoint";
    } catch {
      setStatus("error");
    }
  };

  const selectStyle: React.CSSProperties = {
    border: "1.5px solid #DCE9EB",
    borderRadius: 11,
    padding: 15,
    fontSize: 15,
    outline: "none",
    cursor: "pointer",
    color: theme.primarySoft,
    background: "#FFFFFF",
    width: "100%",
  };

  return (
    <section
      id="dang-ky"
      className="relative w-full overflow-hidden"
      style={{ padding: "clamp(58px,6vw,100px) 22px" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/landing/waterpoint/waterpoint-hoang-hon-ben-song.webp"
          alt="Hoàng hôn bên sông tại Waterpoint"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(16,51,59,0.86), rgba(16,51,59,0.5))" }}
      />

      <div
        className="relative mx-auto grid max-w-[1180px] items-center gap-[clamp(26px,3.4vw,48px)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}
      >
        {/* Trái */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="pointer-events-none"
          style={{ maxWidth: "23rem" }}
        >
          <h2
            className="m-0 font-extrabold"
            style={{ color: theme.white, fontSize: "clamp(22px,3.1vw,40px)", lineHeight: 1.15 }}
          >
            ĐƯA CẢ GIA ĐÌNH ĐẾN WATERPOINT MỘT NGÀY
          </h2>
          <p
            className="mt-3 italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: "#BFDCDF",
              fontSize: "clamp(18px,2vw,25px)",
              lineHeight: 1.4,
            }}
          >
            Cảm nhận nơi dành riêng cho cả gia đình.
          </p>
          <div className="mt-[clamp(20px,2.4vw,30px)] flex flex-col gap-2.5">
            {[
              "Một nơi ba mẹ có thể an tâm ở lại lâu hơn.",
              "Các con có thêm khoảng trờI để trưởng thành.",
              "Và những lần cả nhà sum họp không còn phải nghĩ “liệu có đủ chỗ?”",
            ].map((t) => (
              <div
                key={t}
                className="text-white"
                style={{ fontSize: "clamp(14px,1.5vw,16.5px)", lineHeight: 1.6 }}
              >
                {t}
              </div>
            ))}
          </div>
          <p
            className="mt-[clamp(20px,2.4vw,28px)] font-bold tracking-[0.04em]"
            style={{ color: theme.cream, fontSize: "clamp(15px,1.7vw,20px)" }}
          >
            Waterpoint - Đủ gần để trở về • Đủ rộng để sum vầy
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[18px] bg-white"
          style={{ padding: "clamp(24px,2.8vw,36px)", boxShadow: "0 24px 60px rgba(16,51,59,0.3)" }}
        >
          <div className="text-[19px] font-extrabold" style={{ color: theme.primary }}>
            Nhận bảng giá &amp; đặt lịch tham quan
          </div>
          <div className="mt-[5px] text-[14.5px]" style={{ color: theme.textSoft }}>
            Tư vấn viên gọi lại trong ngày · Bảo mật thông tin
          </div>

          {status === "success" ? (
            <p
              className="mt-6 mb-2 text-center text-base font-bold"
              style={{ color: theme.primary }}
            >
              Đã gửi thông tin thành công — tư vấn viên sẽ liên hệ trong ngày.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3">
              <input
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ và tên"
                style={selectStyle}
              />
              <input
                type="tel"
                required
                inputMode="numeric"
                autoComplete="tel"
                pattern="[0-9 .+()-]{9,16}"
                title="Số di động 10 chữ số, bắt đầu bằng 03/05/07/08/09"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại"
                style={selectStyle}
              />
              {/* TẠM ẨN Harborfront đúng theo mẫu (chờ CĐT xác nhận) */}
              <select name="villa" value={villa} onChange={(e) => setVilla(e.target.value)} style={selectStyle}>
                <option value="">Loại biệt thự quan tâm</option>
                <option value="detached">Detached Villa · 225 - 292 m²</option>
                <option value="garden">Garden Grand Villa · 300 - 780 m²</option>
                <option value="canal">Canal Grand Villa · 304 - 541 m²</option>
                <option value="riverfront">Riverfront Grand Villa · 600 - 1.302 m²</option>
              </select>
              <select name="visit" value={visit} onChange={(e) => setVisit(e.target.value)} style={selectStyle}>
                <option value="">Thời điểm muốn tham quan</option>
                <option value="weekend">Cuối tuần này</option>
                <option value="nextweek">Tuần tới</option>
                <option value="later">Chưa xác định</option>
              </select>
              <button
                type="submit"
                disabled={status === "loading"}
                className="cursor-pointer border-none bg-[#1D5866] py-[17px] font-extrabold tracking-[0.06em] text-white transition-colors hover:bg-[#2E7C8C] disabled:opacity-70"
                style={{
                  borderRadius: 11,
                  fontSize: 15,
                }}
              >
                {status === "loading" ? "ĐANG GỬI..." : "GỬI THÔNG TIN"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 mb-0 text-center text-xs" style={{ color: "#C8102E" }}>
              Gửi không thành công, vui lòng thử lại.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
