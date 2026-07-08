"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "ERA Academy có mất phí không?",
    answer: "Một số khóa học nội bộ dành cho Agent ERA được hỗ trợ theo chính sách từng thời điểm. Các khóa chuyên sâu sẽ có thông tin riêng khi mở đăng ký.",
  },
  {
    question: "Môi giới bên ngoài có thể tham gia học các khóa học của ERA không?",
    answer: "Có thể đăng ký tư vấn để được định hướng lộ trình phù hợp trước khi tham gia chương trình.",
  },
  {
    question: "Có chứng nhận sau các khóa học không?",
    answer: "Các khóa học đủ điều kiện hoàn thành sẽ có xác nhận/chứng nhận theo quy định của chương trình.",
  },
  {
    question: "Khóa học là online hay offline?",
    answer: "ERA Academy kết hợp cả online và offline, tùy nội dung đào tạo và lịch triển khai thực tế.",
  },
  {
    question: "Tôi có thể học nhiều chương trình cùng một lúc không?",
    answer: "Có, nhưng nên chọn theo lộ trình ưu tiên để đảm bảo hiệu quả học tập và ứng dụng thực chiến.",
  },
  {
    question: "Là người mới hoàn toàn tôi nên bắt đầu từ đâu?",
    answer: "Bạn nên bắt đầu từ nhóm khóa onboarding và tư vấn lộ trình để nắm nền tảng nghề môi giới bất động sản.",
  },
];

export function AcademyFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section padding="md" bg="white">
      <h2 className="mb-10 text-center text-3xl font-black md:text-4xl" style={{ color: colors.primary.DEFAULT }}>
        CÂU HỎI THƯỜNG GẶP - FAQ
      </h2>

      <div className="mx-auto max-w-4xl space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="overflow-hidden rounded-md border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold"
                style={{ color: colors.primary.navy.DEFAULT }}
              >
                {faq.question}
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-[#D4112D] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
