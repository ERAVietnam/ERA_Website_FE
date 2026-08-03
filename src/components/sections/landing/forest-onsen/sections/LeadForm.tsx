"use client";

import { useState } from "react";
import { c } from "../theme";
import { submitLead } from "../../lib/submit-lead";

interface LeadFormProps {
  formId: string;
  title: string;
  subtitle: string;
  submitText: string;
  footnote: string;
}

export function LeadForm({ formId, title, subtitle, submitText, footnote }: LeadFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      await submitLead({
        hoten: (form.hoten as HTMLInputElement).value,
        sdt: (form.sdt as HTMLInputElement).value,
        formId,
        sheet: "ECO RETREAT - FOREST ONSEN",
      });
      window.location.href = "/thank-you-eco-retreat";
    } catch {
      alert("Gửi thất bại, vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-[17px] font-semibold">{title}</h3>
      <p className="text-[13px] mt-1 mb-5" style={{ color: c.inkSoft }}>
        {subtitle}
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
      <div className="mb-4">
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
            {submitText}{" "}
            <span className="inline-flex w-6 h-6 rounded-full bg-white/20 items-center justify-center text-[13px] transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </>
        )}
      </button>
      <p className="text-[11px] mt-3 leading-relaxed" style={{ color: c.inkSoft }}>
        {footnote}
      </p>
    </form>
  );
}
