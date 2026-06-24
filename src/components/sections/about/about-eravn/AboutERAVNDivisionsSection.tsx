"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const divisions = [
  { name: "Trần Thị Hoàng Nhi", group: "Elite Group", image: "/about/about_division_04.webp" },
  { name: "Trần Vĩnh Phi Long", group: "Galaxy Group", image: "/about/about_division_01.webp" },
  { name: "Nguyễn Long Sơn", group: "Legend Group", image: "/about/about_division_03.webp" },
  { name: "Vũ Thị Thu Trang", group: "Universe Group", image: "/about/about_division_02.webp" },
  { name: "Nguyễn Thu Trang", group: "Ability Division", image: "/about/about_division_09.webp" },
  { name: "Phan Thị Thu Hương", group: "AEM Division", image: "/about/about_division_07.webp" },
  { name: "Nguyễn Phước Sửu", group: "Happy Plus Division", image: "/about/about_division_11.webp" },
  { name: "Ngô Trung Hiếu", group: "Heli Division", image: "/about/about_division_05.webp" },
  { name: "Phạm Thị Thuý Hồng", group: "Mercury Division", image: "/about/about_division_06.webp" },
  { name: "Lai Trúc Quân", group: "SUN Division", image: "/about/about_division_08.webp" },
  { name: "Nguyễn Thị Thanh Tâm", group: "Tara Division", image: "/about/about_division_12.webp" },

];

export default function AboutERAVNDivisionsSection() {
  return (
    <Section id="divisions" padding="md" bg="white" noContainer>
      <Container size="lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: colors.primary.DEFAULT }}>
            HỆ THỐNG DIVISIONS
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-1" style={{ color: colors.primary.navy.DEFAULT }}>
            TẠI ERA VIETNAM
          </h3>
          <p className="mt-4 text-gray-500 max-w-3xl mx-auto text-sm md:text-base">
            ERA Vietnam tự hào sở hữu 11 division, mỗi division đóng vai trò quan trọng trong sự phát triển của công ty và
            mang đến những giá trị triết thực cho khách hàng trong lĩnh vực môi giới bất động sản
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
          {divisions.map((person) => (
            <div
              key={person.name}
              className="text-center group cursor-pointer"
            >
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-gray-100">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 112px, 128px"
                />
              </div>
              <h4 className="mt-3 font-semibold text-base transition-colors duration-200 group-hover:text-red-700" style={{ color: colors.primary.DEFAULT }}>
                {person.name}
              </h4>
              <p className="text-sm font-semibold transition-colors duration-200" style={{ color: colors.primary.navy.DEFAULT }}>{person.group}</p>
            </div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
