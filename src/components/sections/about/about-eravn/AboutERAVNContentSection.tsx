"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

export default function AboutERAVNContentSection() {
  return (
    <Section id="about" padding="md" bg="gray" noContainer>
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Image + Badge */}
          <div className="relative pb-10">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-full bg-gray-100">
              <Image
                src="/home/home_banner_hero_2_mb.webp"
                alt="ERA Vietnam VNBC 2025"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-2 -right-8 md:-right-6 rounded-xl px-5 py-3 shadow-lg"
              style={{ backgroundColor: colors.primary.DEFAULT }}
            >
              <div className="text-2xl font-bold text-white">
                2,700+
              </div>
              <div className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                Agents
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: colors.primary.DEFAULT }}
            >
              VỀ ERA Vietnam
            </h2>

            <div className="border-l-4 pl-6" style={{ borderColor: colors.primary.DEFAULT }}>
              <p className="text-gray-600 text-base leading-relaxed">
                Chính thức hiện diện tại Việt Nam từ năm 2017, ERA Vietnam tự hào là công ty môi
                giới bất động sản quốc tế hàng đầu, mang đến sự kết hợp hoàn hảo giữa tiêu chuẩn
                dịch vụ môi giới toàn cầu và sự thấu hiểu sâu sắc thị trường bản địa.
              </p>
            </div>

            <div className="border-l-4 pl-6" style={{ borderColor: colors.primary.navy.DEFAULT }}>
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-base">
                Tăng trưởng
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed text-base">
                Năm 2023, với những thành công nhất định, APAC Realty, công ty sở hữu quyền thương
                hiệu ERA Real Estate toàn bộ khu vực Châu Á Thái Bình Dương đã quyết định đầu tư trực tiếp
                vào ERA Vietnam, giúp công ty trở thành một trong số ít công ty môi giới tại Việt Nam có vốn
                đầu tư trực tiếp nước ngoài.
              </p>
            </div>

            <div className="border-l-4 pl-6" style={{ borderColor: colors.secondary.DEFAULT }}>
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-base">
                Năng lực đội ngũ
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed text-base">
                Agent ERA Vietnam được định hướng đào tạo và trang bị đầy đủ kiến thức, kỹ năng cần
                thiết để trở thành một chuyên viên tư vấn bất động sản toàn diện, được hỗ trợ sở hữu
                Chứng chỉ hành nghề môi giới bất động sản theo quy định của Pháp luật.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
