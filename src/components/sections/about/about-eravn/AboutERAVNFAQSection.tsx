"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const faqs = [
  {
    question: "ERA Vietnam là công ty gì và trực thuộc tập đoàn nào?",
    answer:
      "ERA Vietnam là công ty môi giới bất động sản quốc tế hàng đầu, trực thuộc tập đoàn ERA Real Estate - một trong những mạng lưới môi giới bất động sản lớn nhất thế giới. Từ năm 2023, APAC Realty đã đầu tư trực tiếp vào ERA Vietnam, giúp công ty trở thành một trong số ít công ty môi giới tại Việt Nam có vốn đầu tư trực tiếp nước ngoài.",
  },
  {
    question: "Mạng lưới và quy mô của ERA Vietnam hiện nay ra sao?",
    answer:
      "ERA Vietnam hiện có 3 văn phòng, hơn 2,700 agents và đã tham gia môi giới hơn 150 dự án sơ cấp và thứ cấp trên khắp cả nước. Công ty tự hào sở hữu 12 division với các leader giàu kinh nghiệm.",
  },
  {
    question: "Ứng dụng My ERA có những tính năng gì hỗ trợ Agent?",
    answer:
      "My ERA App cung cấp các tính năng: Quản lý giỏ hàng thông minh, Tracking giao dịch, Cập nhật tin tức & sự kiện real-time, Hệ thống E-Learning & Thư viện thông tin tiện lợi giúp agents nâng cao kỹ năng và hiệu quả công việc.",
  },
  {
    question: "Đặc quyền khi gia nhập đội ngũ chuyên viên tư vấn tại ERA Vietnam là gì?",
    answer:
      "Agents ERA Vietnam được đào tạo bài bản, trang bị đầy đủ kiến thức và kỹ năng cần thiết, được hỗ trợ sở hữu Chứng chỉ hành nghề môi giới bất động sản, tiếp cận công nghệ hiện đại qua My ERA App và làm việc trong môi trường chuyên nghiệp với tiêu chuẩn dịch vụ toàn cầu.",
  },
];

export default function AboutERAVNFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section padding="md" bg="white" noContainer>
      <Container size="md">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: colors.primary.DEFAULT }}>
            CÂU HỎI THƯỜNG GẶP - FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className="font-semibold text-sm text-gray-800">{faq.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400 shrink-0 ml-4"
                  style={{ transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="overflow-hidden">
                  <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
