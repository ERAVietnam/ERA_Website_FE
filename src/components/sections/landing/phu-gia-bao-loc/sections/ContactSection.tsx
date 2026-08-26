"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { submitLead } from "../../lib/submit-lead";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitLead({
        hoten: form.name,
        sdt: form.phone,
        email: form.email,
        message: form.message,
        formId: "PGBL_CONTACT",
        sheet: "PHÚ GIA BẢO LỘC",
      });
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      alert("Gửi thất bại, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full bg-[#FBF7EF] pb-8 pt-0 sm:pb-12">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <motion.div
          className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo */}
          <div className="flex shrink-0 justify-center sm:justify-start">
            <Image
              src="/landing/phu-gia-bao-loc/images/pgbl_green.svg"
              alt="Phú Gia Bảo Lộc"
              width={247}
              height={80}
              className="h-20 w-auto sm:h-24"
            />
          </div>

          {/* Intro text */}
          <p className="flex-1 text-center text-sm leading-relaxed text-[#555555] sm:text-left sm:text-base">
            Phú Gia Bảo Lộc – Khu biệt thự compound duy nhất tại trung tâm Bảo Lộc, nơi mở ra một chốn trở về riêng
            tư, an yên và thuần khiết giữa thiên nhiên cao nguyên. Sự hòa quyện hoàn hảo giữa hạ tầng chuẩn mực, hệ
            tiện ích nghỉ dưỡng toàn diện cùng cộng đồng cư dân tinh hoa không chỉ nuôi dưỡng trọn vẹn sức khỏe tinh
            thần, mà còn là “ngôi nhà thứ hai” bảo chứng cho giá trị truyền đờ i dài hạn.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 rounded-3xl bg-[#F3ECE0] p-6 sm:mt-12 sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#327400]/15 text-[#327400]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#174C25]">Gửi thành công!</h3>
              <p className="mt-2 text-[#555555]">Chuyên viên tư vấn sẽ liên hệ lại ngay.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-2xl bg-[#327400] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#174C25] sm:text-base"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-[#B25B3E]">
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    required
                    className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#555555] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#327400]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-[#B25B3E]">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="090 123 4567"
                    required
                    className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#555555] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#327400]"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-[#B25B3E]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    className="rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#555555] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#327400]"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-[#B25B3E]">
                    Lờ i nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Bạn cần ERA hỗ trợ vấn đề gì?"
                    rows={4}
                    className="resize-none rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#555555] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#327400]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full rounded-2xl bg-[#327400] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#174C25] disabled:opacity-60 sm:text-base"
              >
                {isLoading ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
