"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { ProjectsSidebar } from "./ProjectsSidebar";

const projectInfo = {
  name: "Vinhomes Pearl Bay",
  investor: "Vinhomes",
  ownership: "Sổ hồng lâu dài",
  area: "33.800 m²",
  density: "Đang cập nhật",
  scale: "3 Khu",
  startYear: "2025",
  progress: "Đang xây dựng",
  tag: "Đang mở bán",
};

const infoRows = [
  { label: "Tên dự án", value: projectInfo.name },
  { label: "Chủ đầu tư", value: projectInfo.investor },
  { label: "Hình thức sở hữu", value: projectInfo.ownership },
  { label: "Tổng diện tích", value: projectInfo.area },
  { label: "Mật độ xây dựng", value: projectInfo.density },
  { label: "Quy mô phát triển", value: projectInfo.scale },
  { label: "Thởi điểm khởi công", value: projectInfo.startYear },
  { label: "Tiến độ", value: projectInfo.progress, highlight: true },
];

export function ProjectsDetailContentSection() {
  return (
    <section className="pt-16 md:pt-20 pb-6 bg-white">
      <Container size="lg">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-4">
              <Link
                href={ROUTES.projects}
                className="hover:text-primary transition-colors"
                style={{ color: colors.gray[500] }}
              >
                Dự án
              </Link>
              <span style={{ color: colors.gray[400] }}>/</span>
              <span style={{ color: colors.gray[500] }}>{projectInfo.tag}</span>
              <span style={{ color: colors.gray[400] }}>/</span>
              <span className="font-medium" style={{ color: colors.neutral.foreground }}>
                {projectInfo.name}
              </span>
            </nav>

            {/* Title */}
            <h1
              className="uppercase mb-1"
              style={{
                color: colors.primary.DEFAULT,
                fontWeight: 900,
                fontSize: "clamp(22px, 3.5vw, 32px)",
                lineHeight: 1.2,
              }}
            >
              DỰ ÁN {projectInfo.name.toUpperCase()}
            </h1>
            <p
              className="mb-6"
              style={{
                color: colors.primary.navy.DEFAULT,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Tổng quan dự án {projectInfo.name}
            </p>

            {/* Info Table */}
            <div className="rounded-xl border border-gray-100 overflow-hidden mb-8">
              <div
                className="px-5 py-3 text-sm font-semibold"
                style={{
                  backgroundColor: colors.gray[50],
                  color: colors.neutral.foreground,
                }}
              >
                Thông tin chi tiết
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {infoRows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-3 text-sm border-b border-gray-50 last:border-b-0"
                    style={{
                      borderRight: i % 2 === 0 ? `1px solid ${colors.gray[50]}` : undefined,
                    }}
                  >
                    <span style={{ color: colors.gray[500] }}>{row.label}</span>
                    <span
                      className="font-medium"
                      style={{
                        color: row.highlight
                          ? colors.primary.DEFAULT
                          : colors.neutral.foreground,
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9]">
              <Image
                src="/project/project_project_item.webp"
                alt={projectInfo.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>

            {/* Highlight Section */}
            <div className="mb-8">
              <h2
                className="mb-4"
                style={{
                  color: colors.neutral.foreground,
                  fontWeight: 800,
                  fontSize: "18px",
                }}
              >
                Điểm nổi bật {projectInfo.name}
              </h2>
              <div
                className="space-y-4"
                style={{
                  color: colors.neutral.foreground,
                  fontSize: "14px",
                  lineHeight: 1.8,
                }}
              >
                <p>
                  Nằm tại vị trí kim cương của Vịnh Nha Trang, {projectInfo.name} thừa hưởng trọn vẹn những lợi thế tự nhiên hiếm có: khí hậu dễ chịu quanh năm, nắng vàng mỗi năm, mặt nước êm ả, tầm nhìn rộng mở và khả năng kết nối trực tiếp giữa đất liền và hệ sinh thái "đảo thiên đường" Hòn Tre. Những yếu tố này tạo ra một môi trường cư trú ổn định, phù hợp cho an cư lâu dài của giới tinh hoa.
                </p>
                <p>
                  {projectInfo.name} được bao bọc bởi hệ tiện ích hiện hữu khổng lồ. Mỗi căn biệt thự tại đây có thể kết nối trực tiếp với Vinpearl Hòn Tre, Hòn Tằm, Hòn Một... để đến với công viên giải trí VinWonders 58 ha, hai sân golf 18 hố, nhà hát 1.500 chỗ, trung tâm hội nghị 2.500 khách, khu phố đêm Vinpearl Harbour... Tất cả chỉ cách vài phút di chuyển bằng cáp treo hoặc du thuyền riêng.
                </p>
                <p>
                  Cũng trong cùng khoảng thởi gian 5-10 phút di chuyển, cư dân {projectInfo.name} có thể đến Quảng trường 2 Tháng 4, Tháp Trầm Hương, UBND tỉnh, Cảng Nha Trang... Tất cả đều nằm trên trục Trần Phú - tuyến đường danh giá bậc nhất Nha Trang.
                </p>
              </div>
            </div>

            {/* Second Image */}
            <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9]">
              <Image
                src="/project/project_project_item.webp"
                alt={`${projectInfo.name} - Vị trí`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* Location Section */}
            <div className="mb-8">
              <h2
                className="mb-1"
                style={{
                  color: colors.neutral.foreground,
                  fontWeight: 800,
                  fontSize: "18px",
                }}
              >
                Vị trí {projectInfo.name}
              </h2>
              <p
                className="mb-4 uppercase tracking-wide"
                style={{
                  color: colors.primary.navy.DEFAULT,
                  fontWeight: 700,
                  fontSize: "12px",
                }}
              >
                {projectInfo.name.toUpperCase()} - "VIÊN NGỌC XANH" BÊN VỊNH KỲ QUAN
              </p>
              <div
                className="space-y-4"
                style={{
                  color: colors.neutral.foreground,
                  fontSize: "14px",
                  lineHeight: 1.8,
                }}
              >
                <p>
                  {projectInfo.name} tọa lạc tại địa chỉ số 9 Trần Phú - tuyến đường danh giá bậc nhất Nha Trang. Điểm đón đầu Siêu quần thể du lịch - giải trí - nghỉ dưỡng thế giới Đảo Hòn Tre - Nơi hội tụ mật độ cao nhất của du lịch, thương mại và nhịp sống tinh hoa thành phố biển.
                </p>
                <p>
                  Kề cận Cảng tàu du lịch quốc tế 5.9ha điểm đón các siêu tàu du lịch quốc tế trọng tài không từ thế giới.
                </p>
                <p>
                  Chỉ 5 phút tiếp cận Hòn Tre - Hòn Tằm - Hòn Một - Bộ 3 đảo tỷ phú nơi giới tinh hoa quốc tế lựa chọn an cư, nghỉ dưỡng và kiến tạo cộng đồng thương lưu hiếm có.
                </p>
                <p>
                  {projectInfo.name} không đơn thuần là "vị trí đẹp", mà là điểm neo chiến lược của mọi dòng giá trị - nơi tài sản được giữ vững, khai thác hiệu quả và truyền lại theo thởi gian.
                </p>
              </div>
            </div>

            {/* Xem Thêm Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-gray-200" />
              <button
                className="text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: colors.gray[500] }}
              >
                Xem Thêm
              </button>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="sticky top-24 self-start">
            <ProjectsSidebar />
          </div>
        </div>
      </Container>
    </section>
  );
}
