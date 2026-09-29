"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { theme } from "../theme";
import { MAU_TABS, MAU_NHA, type MauNha } from "../data";
import { submitLead } from "../../lib/submit-lead";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
};

const MAU_IMG = "/landing/waterpoint/mau";

function MauCard({ mau, onOpen, onNhanGia }: { mau: MauNha; onOpen: (m: MauNha) => void; onNhanGia: (m: MauNha) => void }) {
  const spec = (label: string, v: { main: string; sub: string }) => (
    <div>
      <div className="text-[11px] font-bold tracking-[0.1em]" style={{ color: "#7A9AA2" }}>
        {label}
      </div>
      <div className="mt-[3px] font-bold" style={{ fontSize: 15.5, color: theme.primary, lineHeight: 1.3 }}>
        {v.main}
        {v.sub && (
          <span className="block text-[12px] font-semibold" style={{ color: "#7A9AA2" }}>
            {v.sub}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(16,51,59,.16)]"
      style={{ border: `1px solid ${mau.gold ? "#E8C98A" : "#E3EDEF"}` }}
    >
      <button
        type="button"
        onClick={() => onOpen(mau)}
        aria-label={`Xem mặt bằng mẫu ${mau.ma}`}
        className="block w-full cursor-zoom-in border-none border-b bg-white px-3.5 pt-3.5 pb-3 text-center"
        style={{ borderBottom: "1px solid #EEF3F4" }}
      >
        <Image
          src={`${MAU_IMG}/${mau.imgPrefix}-tang1-nho.webp`}
          alt={`Mặt bằng tầng 1 mẫu ${mau.ma}`}
          width={520}
          height={380}
          loading="lazy"
          className="block w-full object-contain transition-transform duration-500 group-hover:scale-105"
          style={{ height: "clamp(230px,19vw,270px)" }}
        />
        <span
          className="mt-2.5 inline-block rounded-full font-extrabold tracking-[0.08em] text-white"
          style={{ background: "rgba(16,51,59,.9)", fontSize: 10.5, padding: "6px 10px" }}
        >
          {mau.tangBadge}
        </span>
      </button>
      <div className="flex flex-1 flex-col gap-3.5 px-[18px] pt-4 pb-[18px]">
        <div className="flex items-start justify-between gap-2.5">
          <div
            className="font-extrabold tracking-[0.01em]"
            style={{ fontSize: "clamp(19px,1.8vw,23px)", color: theme.primary, lineHeight: 1.15 }}
          >
            {mau.ma}
          </div>
          <span
            className="rounded-full font-extrabold whitespace-nowrap"
            style={{
              background: mau.gold ? "#F5D5A0" : "#E4F0F2",
              color: mau.gold ? "#5E4413" : theme.primary,
              fontSize: 10,
              letterSpacing: "0.1em",
              padding: "5px 9px",
            }}
          >
            {mau.khu}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 gap-x-3.5">
          {spec("ĐẤT", mau.dat)}
          {spec("XÂY DỰNG", mau.xaydung)}
          {spec("PHÒNG NGỦ", mau.phongngu)}
          {spec("WC · TẦNG", mau.wc)}
        </div>
        <div className="mt-auto">
          <p className="m-0 text-[12px] font-semibold" style={{ color: theme.primarySoft }}>
            Đã xây xong · xem nhà thật
          </p>
          <div className="mt-2.5 flex gap-2">
            <button
              type="button"
              onClick={() => onOpen(mau)}
              className="flex-1 cursor-pointer rounded-[10px] py-2.5 text-[13px] font-extrabold tracking-[0.04em] transition-colors hover:bg-[#dcebee]"
              style={{ border: `1.5px solid ${theme.primaryLight}`, color: theme.primary, background: "transparent" }}
            >
              MẶT BẰNG
            </button>
            <button
              type="button"
              onClick={() => onNhanGia(mau)}
              className="flex-1 cursor-pointer rounded-[10px] border-none py-2.5 text-[13px] font-extrabold tracking-[0.04em] text-white transition-colors hover:bg-[#2E7C8C]"
              style={{ background: theme.primary }}
            >
              NHẬN GIÁ
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function MauModal({ mau, onClose, onNhanGia }: { mau: MauNha; onClose: () => void; onNhanGia: (m: MauNha) => void }) {
  const tabLabel = MAU_TABS.find((t) => t.key === mau.tab)?.label || "";
  const title = `${mau.ma} · ${tabLabel} · ${mau.khu}`;

  // Thu tu dung mau: TANG truoc, Phoi canh, Vi tri trong khu
  const views: { key: string; label: string; src: string }[] = [];
  mau.tangs.forEach((t) => {
    const n = t.replace("tang", "");
    views.push({ key: t, label: `Tầng ${n}`, src: `${MAU_IMG}/${mau.imgPrefix}-${t}.webp` });
  });
  if (mau.hasPhoicanh) {
    views.push({ key: "phoicanh", label: "Phối cảnh", src: `${MAU_IMG}/${mau.imgPrefix}-phoicanh.webp` });
  }
  if (mau.hasVitri) {
    views.push({ key: "vitri", label: "Vị trí trong khu", src: `${MAU_IMG}/${mau.imgPrefix}-vitri.webp` });
  }
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const current = views[Math.min(idx, views.length - 1)];
  const nhieu = views.length > 1;

  const lui = () => setIdx((i) => (i - 1 + views.length) % views.length);
  const toi = () => setIdx((i) => (i + 1) % views.length);
  const nhanGia = () => {
    onClose();
    setTimeout(() => onNhanGia(mau), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[500] flex flex-col"
      style={{ background: "#081F25" }}
      onClick={onClose}
    >
      {/* Dau: tieu de + dong */}
      <div
        className="relative z-[4] flex items-center justify-between gap-3"
        style={{ padding: "16px 16px 6px 22px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="font-extrabold text-white"
          style={{ fontSize: "clamp(14px,1.5vw,17px)", lineHeight: 1.3, textShadow: "0 1px 6px rgba(0,0,0,.5)" }}
        >
          {title}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="shrink-0 cursor-pointer border-none text-white"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,.14)",
            fontSize: 18,
            lineHeight: 1,
            padding: 0,
          }}
        >
          ×
        </button>
      </div>

      {/* Tab chon hinh */}
      {nhieu && (
        <div
          className="relative z-[4] flex gap-2 overflow-x-auto"
          style={{ padding: "0 22px 8px", scrollbarWidth: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          {views.map((v, i) => (
            <button
              key={v.key}
              type="button"
              onClick={() => {
                setIdx(i);
                setZoom(false);
              }}
              aria-pressed={i === idx}
              className="shrink-0 cursor-pointer whitespace-nowrap"
              style={{
                border: `1.5px solid ${i === idx ? "#F5D5A0" : "rgba(255,255,255,.45)"}`,
                background: i === idx ? "#F5D5A0" : "rgba(255,255,255,.08)",
                color: i === idx ? "#10333B" : "#FFFFFF",
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 12.5,
                fontWeight: 700,
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      {/* Anh + prev/next */}
      <div
        className="relative min-h-0 flex-1"
        style={
          zoom
            ? { overflow: "auto", touchAction: "pan-x pan-y", padding: 0 }
            : { padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {current && (
          <img
            src={current.src}
            alt={`${mau.ma} — ${current.label}`}
            onClick={() => setZoom((z) => !z)}
            draggable={false}
            style={
              zoom
                ? { display: "block", margin: "0 auto", maxWidth: "none", maxHeight: "none", height: "auto", cursor: "grab", userSelect: "none" }
                : {
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    cursor: "zoom-in",
                    userSelect: "none",
                  }
            }
          />
        )}
        {nhieu && !zoom && (
          <>
            <button
              type="button"
              onClick={lui}
              aria-label="Hình trước"
              className="absolute cursor-pointer border-none text-white"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                left: 8,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(29,88,102,.85)",
                fontSize: 26,
                lineHeight: 1,
                boxShadow: "0 6px 16px rgba(16,51,59,.3)",
                padding: 0,
              }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={toi}
              aria-label="Hình sau"
              className="absolute cursor-pointer border-none text-white"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                right: 8,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(29,88,102,.85)",
                fontSize: 26,
                lineHeight: 1,
                boxShadow: "0 6px 16px rgba(16,51,59,.3)",
                padding: 0,
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Chan: CTA nhan gia + huong dan */}
      <div
        className="relative z-[4] flex items-center justify-between gap-3"
        style={{ padding: "10px 22px 16px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={nhanGia}
          className="cursor-pointer border-none font-extrabold"
          style={{
            background: "#F5D5A0",
            color: "#10333B",
            fontSize: 13,
            letterSpacing: "0.04em",
            padding: "12px 20px",
            borderRadius: 10,
            boxShadow: "0 10px 24px rgba(233,169,75,.3)",
          }}
        >
          NHẬN GIÁ MẪU NÀY
        </button>
        <span className="hidden text-right sm:block" style={{ color: "rgba(255,255,255,.55)", fontSize: 12 }}>
          Bấm vào ảnh để phóng to · kéo để xem · bấm lần nữa để thu nhỏ
        </span>
      </div>
    </motion.div>
  );
}

/* ===== Popup "Nhận giá mẫu" — bấm NHẬN GIÁ trên card / trong modal mặt bằng ===== */
function MauGiaModal({ mau, onClose }: { mau: MauNha; onClose: () => void }) {
  const tabLabel = MAU_TABS.find((t) => t.key === mau.tab)?.label || "";
  const mauFull = `${mau.ma} · ${tabLabel} · ${mau.khu}`;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Đóng bằng phím Escape (theo mẫu)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      await submitLead({
        formId: "WP_SANPHAM",
        hoten: name,
        sdt: phone,
        sanpham: `Nhận giá mẫu ${mauFull}`,
        sheet: "WATERPOINT",
      });
      setStatus("success");
      window.location.href = "/thank-you-waterpoint";
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    border: "1.5px solid #DCE9EB",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    outline: "none",
    color: "#10333B",
    background: "#FFFFFF",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[600] flex"
      style={{ background: "rgba(16,51,59,0.62)", alignItems: "flex-start", justifyContent: "center", padding: 20, overflowY: "auto" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full bg-white"
        style={{ borderRadius: 18, maxWidth: 420, padding: 22, margin: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-start">
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="cursor-pointer border-none"
            style={{ background: "none", fontSize: 22, lineHeight: 1, color: "#3D5C63", padding: 0 }}
          >
            ✕
          </button>
        </div>
        <div className="mt-2.5" style={{ height: 220 }}>
          <Image
            src="/landing/waterpoint/waterpoint-gia-dinh-cam-trai-ven-song.webp"
            alt="Gia đình cắm trại bên sông tại Waterpoint"
            width={760}
            height={440}
            className="block h-full w-full object-cover"
            style={{ borderRadius: 12 }}
          />
        </div>
        <p
          className="m-0 mt-[18px] text-center italic"
          style={{
            fontFamily: "'WP Cormorant Garamond', serif",
            fontSize: 19,
            lineHeight: 1.45,
            color: "#10333B",
          }}
        >
          Nhận giá mẫu {mau.ma}
        </p>
        <p className="m-0 mt-2 text-center" style={{ fontSize: 13.5, lineHeight: 1.6, color: "#4C7078" }}>
          Giá, vị trí lô và mặt bằng của mẫu {mauFull} — gửi qua Zalo trong ngày.
        </p>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2.5">
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Họ tên (*)"
            className="focus:border-[#2E7C8C]"
            style={inputStyle}
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
            placeholder="Số điện thoại (*)"
            className="focus:border-[#2E7C8C]"
            style={inputStyle}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="aq-nut-gold cursor-pointer border-none py-4 text-[14.5px] font-extrabold tracking-[0.08em] disabled:opacity-70"
            style={{ background: "#E9A94B", color: "#10333B", borderRadius: 10 }}
          >
            {status === "loading" ? "ĐANG GỬI..." : "NHẬN GIÁ MẪU NÀY"}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-2 mb-0 text-center text-xs" style={{ color: "#C8102E" }}>
            Gửi không thành công, vui lòng thử lại.
          </p>
        )}
        <div className="mt-[18px] border-t pt-4 text-center" style={{ borderColor: "#E3EDEF" }}>
          <a href="tel:0941125000" className="font-black no-underline" style={{ fontSize: 21, color: "#1D5866" }}>
            HOTLINE: 094.1125.000
          </a>
        </div>
        <div className="mt-4 flex justify-end border-t pt-3.5" style={{ borderColor: "#E3EDEF" }}>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer border-none"
            style={{ background: "#EEF4F5", color: "#3D5C63", fontSize: 13, padding: "10px 18px", borderRadius: 8 }}
          >
            Bỏ qua
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SanPhamSection() {
  const [tab, setTab] = useState<string>("garden");
  const [openMau, setOpenMau] = useState<MauNha | null>(null);
  const [giaMau, setGiaMau] = useState<MauNha | null>(null);
  const list = MAU_NHA.filter((m) => m.tab === tab);

  const moNhanGia = (m: MauNha) => setGiaMau(m);

  return (
    <section id="san-pham" className="w-full" style={{ background: "#F4F9FA", padding: "clamp(58px,6vw,96px) 22px" }}>
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-[34px] max-w-[880px] text-center"
        >
          <span className="text-sm font-bold tracking-[0.17em]" style={{ color: theme.textSoft }}>
            MẪU NHÀ ĐANG CÓ HÀNG
          </span>
          <h2
            className="mt-3 font-extrabold"
            style={{ color: theme.primary, fontSize: "clamp(22px,3.1vw,40px)", lineHeight: 1.15 }}
          >
            CHỌN MẪU NHÀ HỢP GIA ĐÌNH
          </h2>
          <p
            className="mt-3 italic"
            style={{
              fontFamily: "'WP Cormorant Garamond', serif",
              color: theme.primary,
              fontSize: "clamp(18px,2vw,25px)",
              lineHeight: 1.4,
            }}
          >
            Xem mặt bằng từng tầng — tất cả đã xây xong, diện tích đất theo đúng các lô đang mở
            bán.
          </p>
        </motion.div>

        {/* Mặt bằng phân khu */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p
            className="mb-3 text-center text-[13px] font-extrabold tracking-[0.13em]"
            style={{ color: theme.primary }}
          >
            MẶT BẰNG PHÂN KHU THE AQUA
          </p>
          <div className="group relative overflow-hidden rounded-2xl" style={{ cursor: "zoom-in" }}>
            <Image
              src={`${MAU_IMG}/the-aqua-mat-bang-tong-the-1800.webp`}
              alt="Mặt bằng phân khu The Aqua — màu lô theo từng dòng biệt thự"
              width={1800}
              height={1200}
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span
              className="pointer-events-none absolute top-3 left-3 rounded-full font-extrabold tracking-[0.08em] text-white"
              style={{ background: "rgba(16,51,59,.9)", fontSize: 11, padding: "7px 12px" }}
            >
              BẤM ĐỂ PHÓNG TO · XEM MÃ LÔ
            </span>
          </div>
          <p className="mt-2.5 text-center" style={{ fontSize: 12, color: "#5B7B82" }}>
            Màu lô theo từng dòng biệt thự — chú thích ở góc phải dưới. Phối cảnh minh hoạ của
            chủ đầu tư.
          </p>
        </motion.div>

        {/* Tabs dòng biệt thự */}
        <div className="aq-sp-tabs mb-6 flex flex-wrap justify-center gap-2.5">
          {MAU_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className="cursor-pointer rounded-full px-[18px] py-[11px] text-[13.5px] font-extrabold tracking-[0.03em] whitespace-nowrap transition-colors"
              style={
                tab === t.key
                  ? { background: theme.primary, color: "#fff", border: `1.5px solid ${theme.primary}` }
                  : { background: "#fff", color: theme.primary, border: `1.5px solid #2E7C8C` }
              }
            >
              {t.label} <span className="font-semibold opacity-75">{t.sub}</span>
            </button>
          ))}
        </div>

        {/* Grid căn mẫu */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="aq-sp-grid grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(262px, 1fr))" }}
        >
          {list.map((m) => (
            <MauCard key={m.code} mau={m} onOpen={setOpenMau} onNhanGia={moNhanGia} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {openMau && <MauModal mau={openMau} onClose={() => setOpenMau(null)} onNhanGia={moNhanGia} />}
        {giaMau && <MauGiaModal mau={giaMau} onClose={() => setGiaMau(null)} />}
      </AnimatePresence>
    </section>
  );
}
