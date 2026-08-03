"use client";

import { useState } from "react";
import { projectInfo } from "../data";
import { c } from "../theme";
import { submitLead } from "../../lib/submit-lead";
import { SelectField } from "@/components/ui/admin/SelectField";

const PRODUCT_OPTIONS = [
  { value: "3PN trực diện Hồ Thiên Nga", label: "3PN trực diện Hồ Thiên Nga" },
  { value: "Garden Villa", label: "Garden Villa" },
  { value: "Duplex / Mezza", label: "Duplex / Mezza" },
  { value: "Penthouse", label: "Penthouse" },
  { value: "Căn hộ 1PN - 2PN", label: "Căn hộ 1PN - 2PN" },
  { value: "Chưa xác định", label: "Chưa xác định" },
];

export function FinalCtaSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [sanpham, setSanpham] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      await submitLead({
        hoten: (form.hoten as HTMLInputElement).value,
        sdt: (form.sdt as HTMLInputElement).value,
        sanpham,
        formId: "FORM4",
        sheet: "ECO RETREAT - FOREST ONSEN",
      });
      window.location.href = "/thank-you-eco-retreat";
    } catch {
      alert("Gửi thất bại, vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  return (
    <section id="dang-ky" className="relative text-white overflow-hidden py-16 md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/landing/forest-onsen/02_img/canh/forest-onsen-vuon-onsen-kieu-nhat.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg,rgba(28,40,32,.86),rgba(28,40,32,.45))",
        }}
      />
      <div className="relative z-10 max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1fr_440px] gap-8 md:gap-14 items-center">
        <div className="reveal">
          <div className="text-xs font-medium tracking-[2.5px] uppercase text-white/85">
            Đặc quyền sở hữu
          </div>
          <h2
            className="font-medium mt-4 leading-[1.08] tracking-wide"
            style={{
              fontSize: "clamp(28px,3.6vw,46px)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            Bắt đầu hành trình
            <br />
            sống chuẩn Onsen.
          </h2>
          <p className="text-[15.5px] mt-4 text-white/86 max-w-[430px]">
            Bộ tài liệu đặc quyền gồm phối cảnh, mặt bằng dòng sản phẩm giới hạn,
            bảng giá và chính sách.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {[
              "Phối cảnh & mặt bằng chi tiết từng dòng căn",
              "Bảng giá và chính sách thanh toán cập nhật",
              "Đặt lịch trải nghiệm Onsen & tham quan riêng tư",
            ].map((p) => (
              <div key={p} className="flex items-center gap-3 text-[14.5px] text-white/92">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.gold }} />
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="reveal bg-white rounded-2xl p-8 md:p-9" style={{ color: c.ink, boxShadow: "0 40px 90px -40px rgba(0,0,0,.55)" }}>
          <form onSubmit={handleSubmit}>
            <h3
              className="text-[26px] font-semibold mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Gửi yêu cầu nhận tài liệu
            </h3>
            <p className="text-[13.5px] mb-5" style={{ color: c.inkSoft }}>
              Chuyên viên cấp cao ERA Vietnam liên hệ trong 24h.
            </p>
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1 tracking-wide" style={{ color: c.inkSoft }}>
                Họ và tên
              </label>
              <input
                type="text"
                name="hoten"
                required
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-3 rounded-lg border text-[15px] transition-all focus:outline-none focus:ring-2"
                style={{ borderColor: c.line }}
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1 tracking-wide" style={{ color: c.inkSoft }}>
                Số điện thoại
              </label>
              <input
                type="tel"
                name="sdt"
                required
                placeholder="09xx xxx xxx"
                pattern="[0-9 ]{9,13}"
                className="w-full px-4 py-3 rounded-lg border text-[15px] transition-all focus:outline-none focus:ring-2"
                style={{ borderColor: c.line }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1 tracking-wide" style={{ color: c.inkSoft }}>
                Dòng sản phẩm quan tâm
              </label>
              <SelectField
                value={sanpham}
                onChange={setSanpham}
                placeholder="Chọn dòng sản phẩm"
                options={PRODUCT_OPTIONS}
                emptyClassName="text-gray-400"
                buttonClassName="w-full px-4 py-3 rounded-lg border bg-white text-[15px] transition-all focus:outline-none focus:ring-2"
                buttonStyle={{ borderColor: c.line }}
              />
              <input type="hidden" name="sanpham" value={sanpham} />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white transition-all duration-500 bg-[#365b46] hover:bg-[#274434] active:scale-[0.98] group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  Gửi yêu cầu nhận tài liệu{" "}
                  <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px] transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </>
              )}
            </button>
            <p className="reveal text-center text-[13px] mt-4" style={{ color: c.inkSoft }}>
              Hoặc{" "}
              <a href={`tel:${projectInfo.phone.replace(/\./g, "")}`} className="font-medium" style={{ color: c.green }}>
                đặt lịch tham quan riêng tư
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
