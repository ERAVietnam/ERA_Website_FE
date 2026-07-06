"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { honorsApi } from "@/api/domains/honors";
import type { HonorAgent } from "@/types/api";

const DIVISIONS_SLUG = "he-thong-divisions-tai-era-vietnam";
const DIVISION_TEAM_NAMES = [
  "Elite",
  "Galaxy",
  "Legend",
  "Universe",
  "Ability",
  "AEM",
  "Happy Plus",
  "Heli",
  "Mercury",
  "SUN",
  "Tara",
];

export default function AboutERAVNDivisionsSection() {
  const [divisions, setDivisions] = useState<HonorAgent[]>([]);

  useEffect(() => {
    honorsApi
      .getPublicCategories()
      .then((categories) => {
        const category = categories.find((item) => item.slug === DIVISIONS_SLUG);
        setDivisions(category?.agents ?? []);
      })
      .catch(() => setDivisions([]));
  }, []);

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
            ERA Vietnam tự hào sở hữu hệ thống division đóng vai trò quan trọng trong sự phát triển của công ty và
            mang đến những giá trị thiết thực cho khách hàng trong lĩnh vực môi giới bất động sản.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
          {divisions.map((person, index) => {
            const teamName = DIVISION_TEAM_NAMES[index] ?? "";

            return (
            <div key={person.id} className="text-center group cursor-pointer">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:border-gray-100">
                {person.avatar ? (
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200" />
                )}
              </div>
              <h4 className="mt-3 font-semibold text-base transition-colors duration-200 group-hover:text-red-700" style={{ color: colors.primary.DEFAULT }}>
                {person.name}
              </h4>
              {teamName && (
                <p className="text-sm font-semibold transition-colors duration-200" style={{ color: colors.primary.navy.DEFAULT }}>
                  {teamName}
                </p>
              )}
            </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
