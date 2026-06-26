"use client";

import { useState } from "react";
import { colors } from "@/lib/theme";
import { Button } from "@/components/ui/Button";
import { Phone, MessageCircle } from "lucide-react";

interface ProjectsSidebarProps {
  hideConsultationForm?: boolean;
}

export function ProjectsSidebar({ hideConsultationForm = false }: ProjectsSidebarProps) {
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAgree, setFormAgree] = useState(false);

  return (
    <div className="w-full lg:w-80 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        {!hideConsultationForm && (
          <>
            <h3 className="text-base font-black mb-3" style={{ color: colors.primary.navy.DEFAULT }}>
              Tư vấn mua nhà chuyên sâu
            </h3>
            <ul className="space-y-2.5 mb-5">
              {[
                "Phân tích quỹ căn, chính sách, tiện ích giúp khách hàng lựa chọn căn tốt nhất.",
                "Giải đáp mọi thắc mắc của khách hàng.",
                "Tuyệt đối bảo mật thông tin cá nhân.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                  <span
                    className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] shrink-0"
                    style={{ backgroundColor: colors.primary.DEFAULT }}
                  >
                    ✓
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Họ tên *"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-300 transition-colors"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Số điện thoại *"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-300 transition-colors"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
              />
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={formAgree}
                  onChange={(e) => setFormAgree(e.target.checked)}
                />
                <span className="text-[11px] text-gray-500 leading-tight">
                  Tôi đồng ý với ERA/Vietnam về Điều khoản dịch vụ và Chính sách bảo mật.
                </span>
              </label>
              <Button
                variant="secondary"
                size="sm"
                className="w-full py-3"
                onClick={() => window.open("https://zalo.me/0325381107", "_blank", "noopener,noreferrer")}
              >
                Nhận tư vấn ngay
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">Hoặc</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
          </>
        )}

        {/* Hotline + Zalo */}
        <div className="flex gap-3">
          <a
            href="tel:19006701"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold border transition-colors hover:bg-gray-50"
            style={{ borderColor: colors.gray[200], color: colors.primary.navy.DEFAULT }}
          >
            <Phone size={16} style={{ color: colors.primary.DEFAULT }} />
            <div className="text-left leading-tight">
              <span className="block text-[10px] text-gray-400">Gọi trực tiếp</span>
              <span className="font-bold" style={{ color: colors.primary.DEFAULT }}>1900 6701</span>
            </div>
          </a>
          <a
            href="https://zalo.me/0325381107"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold border transition-colors hover:bg-gray-50"
            style={{ borderColor: colors.gray[200], color: colors.primary.navy.DEFAULT }}
          >
            <MessageCircle size={16} style={{ color: colors.secondary.DEFAULT }} />
            <span style={{ color: colors.secondary.DEFAULT }}>Chat qua Zalo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
