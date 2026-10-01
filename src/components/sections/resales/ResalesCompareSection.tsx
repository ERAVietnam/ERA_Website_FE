"use client";

import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { rc } from "./palette";
import { Reveal } from "./Reveal";

const ROWS: { tinhHuong: string; motMinh: string; cungEra: string }[] = [
  {
    tinhHuong: "Có khách nhưng thiếu hàng",
    motMinh: "Đi hỏi hàng từng nhóm Zalo, chờ phản hồi, dễ mất khách",
    cungEra: "Rỗ hàng lớn, đa dạng, tra cứu nhanh trên nền tảng số của ERA",
  },
  {
    tinhHuong: "Dự án quen đã bão hoà",
    motMinh: "Tự đi khai phá dự án mới, bắt đầu lại từ đầu",
    cungEra: "Nhiều dự án thứ cấp để chuyển hướng, tận dụng tối ưu hiệu quả bán hàng từ sơ cấp",
  },
  {
    tinhHuong: "Khách hỏi dự án sơ cấp",
    motMinh: "Phải bán qua một môi giới khác, chia bớt phần của mình",
    cungEra: "Bán trực tiếp sơ cấp ngay trong hệ thống, có đào tạo kỹ năng bán sơ cấp",
  },
  {
    tinhHuong: "Khách lớn cần hợp đồng chuẩn, cần công ty uy tín",
    motMinh: "Không có công ty đứng sau, không có mộc, khó tạo niềm tin",
    cungEra: "Có pháp nhân ERA Vietnam và hỗ trợ giao dịch phía sau",
  },
  {
    tinhHuong: "Cần ngườI cùng ra hàng",
    motMinh: "Chỉ liên kết trong vòng ngườI quen",
    cungEra: "Mạng lưới hơn 2.700+ agent ERA cùng bạn tối ưu hiệu quả liên kết sale",
  },
  {
    tinhHuong: "Nâng cấp kỹ năng, bắt kịp xu hướng thị trường trong nghề",
    motMinh: "Tự xem video, tự mày mò, dễ nản",
    cungEra: "Lớp chuyên sâu hằng tuần, E-Learning, kỹ thuật sale từ môi giới quốc tế",
  },
];

const borderGray = `1px solid ${colors.gray[300]}`;

const thStyle: React.CSSProperties = {
  padding: "16px 18px",
  textAlign: "center",
  fontSize: 17,
  fontWeight: 800,
  letterSpacing: "0.04em",
  color: colors.neutral.white,
  borderBottom: borderGray,
  borderRight: borderGray,
};

const tdStyle: React.CSSProperties = {
  padding: "16px 18px",
  fontSize: 14.5,
  lineHeight: 1.55,
  verticalAlign: "middle",
  textAlign: "left",
  borderBottom: borderGray,
  borderRight: borderGray,
};

/* Section: bảng so sánh làm một mình vs làm cùng ERA */
export function ResalesCompareSection() {
  return (
    <Section bg="white" padding="none" className="py-10 md:py-14">
      <Reveal>
      <div className="text-xs font-extrabold tracking-[0.16em]" style={{ color: colors.primary.DEFAULT }}>
        ĐÂY CÓ PHẢI MONG MUỐN CỦA BẠN?
      </div>
      <h2
        className="mt-3 max-w-5xl font-black"
        style={{
          color: rc.navy,
          fontSize: "clamp(22px, 3vw, 38px)",
          lineHeight: 1.25,
        }}
      >
        LÀM MỘT MÌNH VÀ LÀM CÙNG ERA KHÁC NHAU THẾ NÀO?
      </h2>

      {/* Wrapper vừa scroll ngang vừa bo góc — table là con trực tiếp nên tràn ra đây được (overflow-x:auto clip theo padding box) */}
      <div className="mt-10 overflow-x-auto rounded-xl" style={{ border: borderGray }}>
        <table className="rc-cmp w-full min-w-[720px] border-separate border-spacing-0">
            <thead>
              <tr style={{ backgroundColor: rc.navy }}>
                <th style={{ ...thStyle, borderRight: "none" }}>TÌNH HUỐNG</th>
                <th style={thStyle}>LÀM MỘT MÌNH</th>
                <th style={{ ...thStyle, backgroundColor: colors.primary.DEFAULT, borderRight: "none" }}>
                  LÀM CÙNG ERA
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.tinhHuong} style={{ backgroundColor: colors.neutral.white }}>
                  {/* Cột 1: bỏ viền phải (không tách với cột LÀM MỘT MÌNH) */}
                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: 700,
                      color: rc.navy,
                      borderRight: "none",
                      borderBottom: i === ROWS.length - 1 ? "none" : tdStyle.borderBottom,
                    }}
                  >
                    {r.tinhHuong}
                  </td>
                  <td style={{ ...tdStyle, borderBottom: i === ROWS.length - 1 ? "none" : tdStyle.borderBottom }}>
                    {r.motMinh}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      backgroundColor: colors.primary.s20,
                      fontWeight: 600,
                      borderRight: "none",
                      borderBottom: i === ROWS.length - 1 ? "none" : tdStyle.borderBottom,
                    }}
                  >
                    {r.cungEra}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      {/* Mobile (≤640px): bỏ scroll — co padding + font để hiển thị trọn bảng */}
      <style>{`
        @media (max-width: 640px) {
          .rc-cmp { min-width: 0 !important; }
          .rc-cmp th, .rc-cmp td {
            padding: 9px 6px !important;
            font-size: 11.5px !important;
            line-height: 1.45 !important;
          }
          .rc-cmp th { letter-spacing: 0.02em !important; }
        }
      `}</style>
      </Reveal>

    </Section>
  );
}
