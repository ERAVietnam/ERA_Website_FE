"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import { SelectField } from "@/components/ui/admin/SelectField";
import Image from "next/image";
import { annualHonorsApi } from "@/api/domains/annual-honors";
import { monthlyHonorsApi } from "@/api/domains/monthly-honors";
import type { AnnualHonorList, HonorAgent, MonthlyHonorList } from "@/types/api";

function YearlyHeroSection({
  selectedYear,
  onChange,
  years,
}: {
  selectedYear: string;
  onChange: (year: string) => void;
  years: string[];
}) {
  return (
    <section className="relative w-full">
      {/* Background */}
      <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden bg-gray-300">
        <Image
          src="/home/home_banner_hero_2.webp"
          alt="Vietnam National Business Conference 2025"
          fill
          className="object-cover"
          priority
        />
        {/* Content */}
        <Container size="lg" className="relative h-full flex flex-col items-center justify-end text-center px-6 pb-15 md:pb-15">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 uppercase tracking-wide">
            Vietnam National
          </h1>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide">
            Business Conference 2025
          </h1>
        </Container>
      </div>

      {/* Bottom bar */}
      <Container size="lg" className="relative -mt-10 z-10">
        <div className="bg-white rounded-xl shadow-lg py-4 md:py-5 px-24 md:px-28 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4">
          <p className="text-sm md:text-xl font-bold uppercase flex items-center" style={{ color: colors.primary.DEFAULT }}>
            Sự kiện lớn nhất trong năm của ERA Vietnam
          </p>
          <div className="relative shrink-0">
            <SelectField
              value={selectedYear}
              onChange={onChange}
              options={(years.length > 0 ? years : [selectedYear]).map((y) => ({ value: y, label: y }))}
              buttonClassName="text-sm text-white pr-8 pl-3 py-2.5 border-0 rounded-lg w-full md:w-40 outline-none"
              buttonStyle={{ backgroundColor: colors.secondary.DEFAULT }}
              iconClassName="text-white"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

type Achiever = {
  name: string;
  division: string;
  image: string;
  bgGradient: string;
};

const achievers: Achiever[] = [
  { name: "Phạm Xuân Ngọc", division: "Elite Group", image: "/about/about_awards_best01.webp", bgGradient: "from-purple-600 to-purple-900" },
  { name: "Nguyễn Thị Yến Như", division: "Aether Division", image: "/about/about_awards_best02.webp", bgGradient: "from-blue-500 to-blue-800" },
  { name: "Nguyễn Anh Dũng", division: "AEM Division", image: "/about/about_awards_best03.webp", bgGradient: "from-orange-500 to-orange-700" },
  { name: "Nguyễn Hoài Nam", division: "Legend Group", image: "/about/about_awards_best04.webp", bgGradient: "from-red-600 to-red-900" },
];

const promotedAgents = [
  { name: "Lê Thanh Tâm", group: "Galaxy Group", newCode: "SDD", oldCode: "DD (cũ)", image: "/about/agent_1.png" },
  { name: "Lê Thanh Tâm", group: "Galaxy Group", newCode: "SDD", oldCode: "DD (cũ)", image: "/about/agent_1.png" },
  { name: "Lê Thanh Tâm", group: "Galaxy Group", newCode: "SDD", oldCode: "DD (cũ)", image: "/about/agent_1.png" },
  { name: "Lê Thanh Tâm", group: "Galaxy Group", newCode: "SDD", oldCode: "DD (cũ)", image: "/about/agent_1.png" },
  { name: "Lê Thanh Tâm", group: "Galaxy Group", newCode: "SDD", oldCode: "DD (cũ)", image: "/about/agent_1.png" },
];

const officialAgents = [
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
  { name: "Vũ Hoàng Tùng", date: "04.2026" },
];

// --- Yearly tab data (sample) ---
const bestAchiever = {
  name: "Ngô Trung Hiếu",
  division: "Heli Division",
  image: "/about/about_division_05.webp",
};

const topTwo = [
  { rank: 2, name: "Nguyễn Phước Sửu", division: "Happy Plus Division", image: "/about/about_division_11.webp" },
  { rank: 3, name: "Võ Minh Hoàng", division: "Mercury Division" },
];

const topTen = [
  { rank: 4, name: "Nguyễn T. T. Trúc", division: "Elite Group" },
  { rank: 5, name: "Trần T. Hoàng Nhi", division: "Elite Group", image: "/about/about_division_04.webp" },
  { rank: 6, name: "Hứa T. Thanh Lan", division: "Galaxy Group" },
  { rank: 7, name: "Trần Đức Phú", division: "Venus Division" },
  { rank: 8, name: "Bùi Mỹ Duyên", division: "Heli Division" },
  { rank: 9, name: "Lê Cao Cường", division: "Galaxy Group" },
  { rank: 10, name: "Phan T. Thu Hương", division: "Heli Division", image: "/about/about_division_07.webp" },
];

const topFifty = [
  { rank: 11, name: "Vũ Thị Thu Trang", division: "Universe Group", image: "/about/about_division_02.webp" },
  { rank: 12, name: "Nguyễn T. Bích Hà", division: "Happy Plus", image: "" },
  { rank: 13, name: "Phạm Toàn Thắng", division: "Aem Division", image: "" },
  { rank: 14, name: "Nguyễn Thị Hương", division: "Legend Group", image: "" },
  { rank: 15, name: "Trương Văn Huy", division: "Tara Division", image: "" },
  { rank: 16, name: "Trần Vĩnh Phi Long", division: "Galaxy Group", image: "/about/about_division_01.webp" },
  { rank: 17, name: "Lại Trúc Quân", division: "Sun Division", image: "/about/about_division_08.webp" },
  { rank: 18, name: "Nguyễn T. K. Trình", division: "Legend Group", image: "" },
  { rank: 19, name: "Lê Thành Tấn", division: "Tara Division", image: "" },
  { rank: 20, name: "Võ Ngọc Kim Ngân", division: "Ability Division", image: "" },
  { rank: 21, name: "Phạm Văn Út", division: "Tara Division", image: "" },
  { rank: 22, name: "Trương T. T. Dung", division: "Heli Division", image: "" },
  { rank: 23, name: "Nguyễn N. Khương", division: "E.I Division", image: "" },
  { rank: 24, name: "Huỳnh Thanh Huy", division: "Cosmos Division", image: "" },
  { rank: 25, name: "Châu Thanh My", division: "Galaxy Group", image: "" },
  { rank: 26, name: "Tăng Lê Thuận", division: "Sun Division", image: "" },
  { rank: 27, name: "Lý Thu Thảo", division: "Galaxy Group", image: "" },
  { rank: 28, name: "Võ Văn Hùng", division: "Galaxy Group", image: "" },
  { rank: 29, name: "Phan K. Mạnh Vũ", division: "Galaxy Group", image: "" },
  { rank: 30, name: "Lê Thị Thu Giang", division: "Happy Plus Division", image: "" },
  { rank: 31, name: "Lê Thị Vân Anh", division: "Legend Division", image: "" },
  { rank: 32, name: "Nguyễn K. T. Linh", division: "Tara Division", image: "" },
  { rank: 33, name: "Nguyễn Thu Trang", division: "Ability Division", image: "/about/about_division_09.webp" },
  { rank: 34, name: "Trần Quang Chiến", division: "Elite Group", image: "" },
  { rank: 35, name: "Nguyễn N. Chang", division: "Galaxy Group", image: "" },
  { rank: 36, name: "Lê Hoàng Hiệp", division: "", image: "" },
  { rank: 37, name: "Nguyễn T. T. Tâm", division: "Tara Division", image: "/about/about_division_12.webp" },
  { rank: 38, name: "Đỗ Thị Kim Yến", division: "Heli Division", image: "" },
  { rank: 39, name: "Lê Thùy Linh", division: "Kona Division", image: "" },
  { rank: 40, name: "Đỗ Duy Anh", division: "Happy Plus Division", image: "" },
  { rank: 41, name: "Trương Phước Tài", division: "Tara Division", image: "" },
  { rank: 42, name: "Trương T. H. Trang", division: "Tina Division", image: "" },
  { rank: 43, name: "Nguyễn Ngọc Huy", division: "Ability Division", image: "" },
  { rank: 44, name: "Nguyễn Ngọc Long", division: "Sun Division", image: "" },
  { rank: 45, name: "Đỗ T. Quỳnh Như", division: "Aloha Division", image: "" },
  { rank: 46, name: "Nguyễn T. Kim Thư", division: "Universe Group", image: "" },
  { rank: 47, name: "Nguyễn T. Yến Như", division: "Aether Division", image: "" },
  { rank: 48, name: "Lê T. Thanh Quyền", division: "Galaxy Group", image: "" },
  { rank: 49, name: "Nguyễn T. C. Vân", division: "Mercury Division", image: "" },
  { rank: 50, name: "Nguyễn Đ. Tuyền", division: "Happy Plus Division", image: "" },
];

const topCategories = [
  {
    title: "Top 3 Project Director",
    items: [
      { rank: 1, name: "Trần Quang Chiến", division: "Elite Group" },
      { rank: 2, name: "Nguyễn Thị Yến Như", division: "Aether Division" },
      { rank: 3, name: "Phan Khắc Mạnh Vũ", division: "Galaxy Group" },
    ],
  },
  {
    title: "Top 3 Resales",
    items: [
      { rank: 1, name: "Nguyễn T. Thu Hiệp", division: "Tara Division" },
      { rank: 2, name: "Tô Thị Ngọc Trang", division: "Legend Group" },
      { rank: 3, name: "Hoàng T. Xuân Thảo", division: "Universe Group" },
    ],
  },
  {
    title: "Top 3 Rookies",
    items: [
      { rank: 1, name: "Hứa T. Thanh Lan", division: "Galaxy Group" },
      { rank: 2, name: "Bùi Mỹ Duyên", division: "Heli Division" },
      { rank: 3, name: "Nguyễn T. Bích Hà", division: "Happy Plus Division" },
    ],
  },
  {
    sections: [
      {
        title: "Top Broker Doanh số",
        items: [
          { rank: 1, name: "Galaxy Group", division: "Trần Vĩnh Phi Long", image: "/about/about_division_01.webp" },
        ],
      },
      {
        title: "Top 3 Divisions",
        items: [
          { rank: 1, name: "Tara Division", division: "Nguyễn T. Thanh Tâm", image: "/about/about_division_12.webp" },
          { rank: 2, name: "Heli Division", division: "Ngô Trung Hiếu", image: "/about/about_division_05.webp" },
          { rank: 3, name: "Legend Group", division: "Nguyễn Long Sơn", image: "/about/about_division_03.webp" },
        ],
      },
    ],
  },
  {
    title: "Top 3 Recruiters",
    items: [
      { rank: 1, name: "Trần Vĩnh Phi Long", division: "Galaxy Group", image: "/about/about_division_01.webp" },
      { rank: 2, name: "Nguyễn Phước Sửu", division: "Happy Plus Division", image: "/about/about_division_11.webp" },
      { rank: 3, name: "Phan T. Thu Hương", division: "AEM Division", image: "/about/about_division_07.webp" },
    ],
  },
  {
    title: "Top 3 ERA Ant Plus",
    items: [
      { rank: 1, name: "Đỗ Phước Đại", division: "" },
      { rank: 2, name: "Tri Mỹ Phương", division: "" },
      { rank: 3, name: "Nguyễn Hữu Tài", division: "" },
    ],
  },
];

const diamondClub = [
  { name: "Vũ Thị Thu Trang", division: "Universe Division", image: "/about/about_division_02.webp" },
  { name: "Nguyễn Thị Hương", division: "Legend Division", image: "" },
  { name: "Trần Vĩnh Phi Long", division: "Galaxy Division", image: "/about/about_division_01.webp" },
  { name: "Trần T. Hoàng Nhi", division: "Elite Division", image: "/about/about_division_04.webp" },
  { name: "Võ N. Kim Ngân", division: "Ability Division", image: "/about/about_division_09.webp" },
  { name: "Ngô Trung Hiếu", division: "Heli Division", image: "/about/about_division_05.webp" },
  { name: "Võ Minh Hoàng", division: "Mercury Division", image: "" },
  { name: "Lại Trúc Quân", division: "Sun Division", image: "/about/about_division_08.webp" },
  { name: "Huỳnh Thanh Huy", division: "Cosmos Division", image: "" },
  { name: "Nguyễn T. T. Tâm", division: "Tara Division", image: "/about/about_division_12.webp" },
  { name: "Nguyễn T. T. Trúc", division: "Elite Division", image: "" },
  { name: "Lê Thành Tấn", division: "Tara Division", image: "" },
  { name: "Trần Đức Phú", division: "Venus Division", image: "" },
  { name: "Phan T. Thu Hương", division: "Aem Division", image: "/about/about_division_07.webp" },
  { name: "Nguyễn Phước Sửu", division: "Happy Plus Division", image: "/about/about_division_11.webp" },
  { name: "Phạm H. Thắng", division: "Aem Division", image: "" },
  { name: "Trương Văn Huy", division: "Tara Division", image: "" },
  { name: "Lê Cao Cường", division: "Galaxy Division", image: "" },
  { name: "Trương T. T. Dung", division: "Heli Division", image: "" },
  { name: "Bùi Mỹ Duyên", division: "Heli Division", image: "" },
  { name: "Phạm Văn Út", division: "Tara Division", image: "" },
  { name: "Lê Thị Thu Giang", division: "Happy Plus Division", image: "" },
  { name: "Nguyễn T. Bích Hà", division: "Happy Plus Division", image: "" },
  { name: "Hứa T. Thanh Lan", division: "Galaxy Division", image: "" },
  { name: "Nguyễn T. K. Trình", division: "Legend Division", image: "" },
];

const divisionDirectors = [
  { name: "Trần Vĩnh Phi Long", division: "Galaxy Division", image: "/about/about_division_01.webp" },
  { name: "Phan T. Thu Hương", division: "Aem Division", image: "/about/about_division_07.webp" },
  { name: "Nguyễn Thu Trang", division: "Ability Division", image: "/about/about_division_09.webp" },
  { name: "Vũ Thị Thu Trang", division: "Universe Division", image: "/about/about_division_02.webp" },
  { name: "Nguyễn Long Sơn", division: "Legend Division", image: "/about/about_division_03.webp" },
  { name: "Nguyễn T. T. Tâm", division: "Tara Division", image: "/about/about_division_12.webp" },
  { name: "Ngô Trung Hiếu", division: "Heli Division", image: "/about/about_division_05.webp" },
  { name: "Phạm T. Thúy Hồng", division: "Mercury Division", image: "/about/about_division_06.webp" },
  { name: "Lại Trúc Quân", division: "Sun Division", image: "/about/about_division_08.webp" },
  { name: "Nguyễn Phước Sửu", division: "Happy Plus Division", image: "/about/about_division_11.webp" },
  { name: "Phạm Diệu Ngọc", division: "Elite Division", image: "" },
  { name: "Lê T. Thanh Quyền", division: "Heli Division", image: "" },
  { name: "Lê Cao Cường", division: "Galaxy Division", image: "" },
  { name: "Nguyễn Ngọc Huy", division: "Ability Division", image: "" },
];

function RankBadge({ rank, size = "sm" }: { rank: number; size?: "sm" | "lg" }) {
  const isTop3 = rank <= 3;
  const label = rank === 1 ? "1st" : rank === 2 ? "2nd" : rank === 3 ? "3rd" : `${rank}th`;
  const badgeSize = size === "lg" ? "w-20 h-20" : isTop3 ? "w-8 h-8" : "w-7 h-7";
  const innerSize =
    size === "lg"
      ? "w-14 h-14 text-lg"
      : isTop3
        ? "w-[22px] h-[22px] text-[9px]"
        : "w-5 h-5 text-[8px]";
  return (
    <div className={`relative flex items-center justify-center ${badgeSize}`}>
      <Image src="/about/badge.svg" alt="" fill className="object-contain" />
      <div
        className={`absolute flex items-center justify-center rounded-full bg-white text-black font-bold leading-none ${innerSize}`}
      >
        {label}
      </div>
    </div>
  );
}

function PlaceholderAvatar({ src, alt, size = "md" }: { src?: string; alt: string; size?: "sm" | "md" | "lg" | "xl" | "xxl" }) {
  const [error, setError] = useState(false);
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48 md:w-60 md:h-60",
    xxl: "w-72 h-72 md:w-96 md:h-96",
  };
  const showImage = src && !error;
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden ${showImage ? "bg-white" : "bg-gray-300"} border-4 border-white shadow-lg relative shrink-0`}>
      {showImage ? (
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" onError={() => setError(true)} />
      ) : null}
    </div>
  );
}

type RankedPerson = {
  rank: number;
  name: string;
  division: string;
  image?: string;
};

function toRankedPeople(agents: HonorAgent[] | undefined, rankOffset = 1): RankedPerson[] {
  return (agents ?? []).map((agent, index) => ({
    rank: rankOffset + index,
    name: agent.name,
    division: agent.code ?? "",
    image: agent.avatar ?? "",
  }));
}

function toPeople(agents: HonorAgent[] | undefined): Array<{ name: string; division: string; image?: string }> {
  return (agents ?? []).map((agent) => ({
    name: agent.name,
    division: agent.code ?? "",
    image: agent.avatar ?? "",
  }));
}

function PersonCard({
  name,
  division,
  image,
  rank,
}: {
  name: string;
  division: string;
  image?: string;
  rank?: number;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <PlaceholderAvatar src={image} alt={name} size="md" />
        {rank !== undefined && (
          <div className="absolute -top-1 -right-1">
            <RankBadge rank={rank} />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm font-bold" style={{ color: colors.primary.navy.DEFAULT }}>
        {name}
      </p>
      {division && <p className="text-xs text-gray-500">{division}</p>}
    </div>
  );
}

function TopThreeCard({
  title,
  items,
  sections,
}: {
  title?: string;
  items?: { rank: number; name: string; division: string; image?: string }[];
  sections?: { title: string; items: { rank: number; name: string; division: string; image?: string }[] }[];
}) {
  const renderItems = (list: { rank: number; name: string; division: string; image?: string }[]) => (
    <div className="space-y-4">
      {list.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <div className="relative">
            <PlaceholderAvatar src={item.image} alt={item.name} size="md" />
            <div className="absolute -top-1 -right-1">
              <RankBadge rank={item.rank} />
            </div>
          </div>
          <div>
            <p
              className="text-sm font-bold"
              style={{ color: item.rank === 1 ? colors.primary.DEFAULT : colors.primary.navy.DEFAULT }}
            >
              {item.name}
            </p>
            <p className="text-xs text-gray-500">{item.division}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      {title && items && (
        <>
          <h4 className="text-lg font-bold mb-4" style={{ color: colors.primary.DEFAULT }}>
            {title}
          </h4>
          {renderItems(items)}
        </>
      )}
      {sections && (
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-bold mb-4" style={{ color: colors.primary.DEFAULT }}>
                {section.title}
              </h4>
              {renderItems(section.items)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AboutERAVNAwardsSection() {
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedYearlyYear, setSelectedYearlyYear] = useState("2026");
  const [annualHonorLists, setAnnualHonorLists] = useState<AnnualHonorList[]>([]);
  const [monthlyHonorLists, setMonthlyHonorLists] = useState<MonthlyHonorList[]>([]);

  useEffect(() => {
    annualHonorsApi
      .getPublicLists({ page: 1, limit: 100 })
      .then((response) => {
        setAnnualHonorLists(response.items);
        const latest = response.items[0];
        if (latest) {
          setSelectedYearlyYear(String(latest.year));
        }
      })
      .catch(() => setAnnualHonorLists([]));
  }, []);

  useEffect(() => {
    monthlyHonorsApi
      .getPublicLists({ page: 1, limit: 100 })
      .then((response) => {
        setMonthlyHonorLists(response.items);
        const latest = response.items[0];
        if (latest) {
          setSelectedMonth(String(latest.month).padStart(2, "0"));
          setSelectedYear(String(latest.year));
        }
      })
      .catch(() => setMonthlyHonorLists([]));
  }, []);

  const availableMonthlyPeriods = monthlyHonorLists.map((list) => ({
    month: String(list.month).padStart(2, "0"),
    year: String(list.year),
    label: `${String(list.month).padStart(2, "0")}/${list.year}`,
  }));
  const selectedMonthlyHonor =
    monthlyHonorLists.find(
      (list) =>
        String(list.month).padStart(2, "0") === selectedMonth &&
        String(list.year) === selectedYear,
    ) ?? monthlyHonorLists[0];
  const availableYearlyYears = annualHonorLists.map((list) => String(list.year));
  const selectedAnnualHonor =
    annualHonorLists.find((list) => String(list.year) === selectedYearlyYear) ??
    annualHonorLists[0];

  const getHonorAgents = (slug: string) =>
    selectedAnnualHonor?.categories.find((category) => category.slug === slug)
      ?.agents ?? [];

  const bestAchiever = toRankedPeople(getHonorAgents("best-achievers"), 1)[0] ?? {
    rank: 1,
    name: "",
    division: "",
    image: "",
  };
  const topTwo = toRankedPeople(getHonorAgents("best-achievers-top-2"), 2);
  const topTen = toRankedPeople(getHonorAgents("best-achievers-top-10"), 4);
  const topFifty = toRankedPeople(getHonorAgents("best-achievers-top-50"), 11);
  const topCategories = [
    {
      title: "Top 3 Project Director",
      items: toRankedPeople(getHonorAgents("top-3-project-director"), 1),
    },
    {
      title: "Top 3 Resales",
      items: toRankedPeople(getHonorAgents("top-3-resales"), 1),
    },
    {
      title: "Top 3 Rookies",
      items: toRankedPeople(getHonorAgents("top-3-rookies"), 1),
    },
    {
      sections: [
        {
          title: "Top Broker Doanh số",
          items: toRankedPeople(getHonorAgents("top-broker-doanh-so"), 1),
        },
        {
          title: "Top 3 Divisions",
          items: toRankedPeople(getHonorAgents("top-3-divisions"), 1),
        },
      ],
    },
    {
      title: "Top 3 Recruiters",
      items: toRankedPeople(getHonorAgents("top-3-recruiters"), 1),
    },
    {
      title: "Top 3 ERA Ant Plus",
      items: toRankedPeople(getHonorAgents("top-3-era-ant-plus"), 1),
    },
  ];
  const diamondClub = toPeople(getHonorAgents("diamond-club"));
  const divisionDirectors = toPeople(getHonorAgents("division-directors"));

  return (
    <Section id="awards" padding="md" bg="white" noContainer>
      <Container size="lg">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span style={{ color: colors.primary.DEFAULT }}>ERA AWARDS</span>
            <span style={{ color: colors.primary.navy.DEFAULT }}> - VĂN HÓA VINH DANH</span>
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            Tại ERA, mọi sự nỗ lực đều được ghi nhận xứng đáng.
          </p>
          <p className="text-gray-500 text-sm">
            Tự hào tôn vinh những cá nhân và tập thể xuất sắc đã không ngừng phá vỡ mọi giới hạn.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="inline-flex items-center rounded-lg overflow-hidden border border-gray-200">
            <Button
              variant={activeTab === "monthly" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("monthly")}
              className="w-52 h-10 rounded-none text-gray-600 hover:bg-gray-50 whitespace-nowrap"
            >
              Vinh Danh Tháng
            </Button>
            <Button
              variant={activeTab === "yearly" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("yearly")}
              className="w-52 h-10 rounded-none text-gray-600 hover:bg-gray-50 whitespace-nowrap"
            >
              Vinh Danh Thường Niên
            </Button>
          </div>
        </div>
      </Container>

      {activeTab === "yearly" && (
        <YearlyHeroSection
          selectedYear={selectedYearlyYear}
          onChange={setSelectedYearlyYear}
          years={availableYearlyYears}
        />
      )}

      <Container size="lg">
        {activeTab === "monthly" && (
          <>
            {/* Month Selector */}
            <div className="flex items-center justify-between mt-8 mb-6">
              <h3 className="text-xl md:text-2xl font-bold" style={{ color: colors.primary.DEFAULT }}>
                VINH DANH MỖI THÁNG
              </h3>
              <div className="relative">
                <Button
                  variant="navy"
                  size="sm"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="gap-2"
                >
                  <span>{selectedMonth}</span>
                  <span className="text-white/50">|</span>
                  <span>{selectedYear}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 p-2 z-10 min-w-[140px]">
                    <div className="grid grid-cols-1 gap-1">
                      {availableMonthlyPeriods.map((period) => (
                        <button
                          key={`${period.month}-${period.year}`}
                          onClick={() => {
                            setSelectedMonth(period.month);
                            setSelectedYear(period.year);
                            setDropdownOpen(false);
                          }}
                          className={`px-2 py-1 rounded text-xs text-left ${
                            selectedMonth === period.month && selectedYear === period.year
                              ? "text-white"
                              : "hover:bg-gray-50"
                          }`}
                          style={
                            selectedMonth === period.month && selectedYear === period.year
                              ? { backgroundColor: colors.primary.navy.DEFAULT }
                              : undefined
                          }
                        >
                          {period.label}
                        </button>
                      ))}
                      {availableMonthlyPeriods.length === 0 && (
                        <div className="px-2 py-1 text-xs text-gray-400">
                          Chưa có dữ liệu
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Best Achievers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              {(selectedMonthlyHonor?.agents ?? []).map((membership, index) => (
                <div
                  key={membership.id}
                  className="rounded-xl overflow-hidden shadow-md relative group border-2 border-white"
                >
                  <div className="aspect-square relative">
                    <img
                      src={membership.image}
                      alt={membership.agent.name}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
              {!selectedMonthlyHonor?.agents?.length && (
                <div className="col-span-2 md:col-span-4 rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
                  Chưa có dữ liệu vinh danh tháng.
                </div>
              )}
            </div>

            {/* Agent Tables */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-6"> */}
              {/* Promoted Agents */}
              {/* <div
                className="lg:col-span-2 rounded-2xl p-5 text-white"
                style={{ backgroundColor: colors.primary.navy.DEFAULT }}
              >
                <h4 className="font-semibold text-2xl mb-6 text-center" style={{ color: colors.secondary.DEFAULT }}>Agent thăng cấp</h4>
                <div className="space-y-0">
                  {promotedAgents.map((agent, index) => (
                    <div key={index} className="flex items-center gap-4 py-3 border-b border-white/10">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white/30">
                        <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: colors.secondary.DEFAULT }}>{agent.name}</p>
                        <p className="text-xs text-white/60">{agent.group}</p>
                      </div>
                      <div className="w-px h-8 bg-white/20 shrink-0" />
                      <div className="text-right shrink-0 min-w-[50px]">
                        <p className="text-sm font-semibold" style={{ color: colors.secondary.DEFAULT }}>{agent.newCode}</p>
                        <p className="text-xs text-white/60">{agent.oldCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 text-sm flex items-center gap-1 mx-auto hover:underline text-white">
                  Xem thêm <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div> */}

              {/* Official Agents */}
              {/* <div
                className="lg:col-span-3 rounded-2xl border border-gray-100 p-5 bg-white shadow-sm"
              >
                <h4 className="font-semibold text-2xl mb-6 text-center" style={{ color: colors.primary.navy.DEFAULT }}>
                  Agent chính thức
                </h4>
                <div className="grid grid-cols-2 gap-x-0 divide-x divide-gray-200">
                  <div className="space-y-0 pr-6">
                    {officialAgents.slice(0, 8).map((agent, index) => (
                      <div key={index} className="flex items-center justify-between py-2.5 border-b border-gray-100">
                        <span className="text-sm font-medium" style={{ color: colors.primary.DEFAULT }}>{agent.name}</span>
                        <span className="text-xs text-gray-400">{agent.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-0 pl-6">
                    {officialAgents.slice(8, 16).map((agent, index) => (
                      <div key={index} className="flex items-center justify-between py-2.5 border-b border-gray-100">
                        <span className="text-sm font-medium" style={{ color: colors.primary.DEFAULT }}>{agent.name}</span>
                        <span className="text-xs text-gray-400">{agent.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="mt-6 text-sm flex items-center gap-1 mx-auto hover:underline" style={{ color: colors.primary.navy.DEFAULT }}>
                  Xem thêm <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div> */}
          </>
        )}

        {activeTab === "yearly" && (
          <div className="space-y-10">
            {/* Best Achievers + Top 2 + Top 10 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start pt-10 md:pt-14">
              {/* Best Achiever */}
              <div className="flex flex-col items-center text-center md:border-r md:border-gray-200 md:pr-8 lg:pr-12">
                <h4 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: colors.primary.DEFAULT }}>
                  Best Achievers
                </h4>
                <div className="relative">
                  <PlaceholderAvatar src={bestAchiever.image} alt={bestAchiever.name} size="xxl" />
                  <div className="absolute top-4 right-4">
                    <RankBadge rank={1} size="lg" />
                  </div>
                </div>
                <h5 className="mt-5 text-3xl md:text-4xl font-bold" style={{ color: colors.primary.navy.DEFAULT }}>
                  {bestAchiever.name}
                </h5>
                <p className="text-base text-gray-500">{bestAchiever.division}</p>
              </div>

              {/* Top 2 + Top 10 */}
              <div className="flex flex-col">
                {/* Top 2 */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <h4 className="text-2xl md:text-3xl font-bold" style={{ color: colors.primary.DEFAULT }}>
                      Top 2
                    </h4>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {topTwo.map((person) => (
                      <div key={person.name} className="flex flex-col items-center text-center">
                        <div className="relative">
                          <PlaceholderAvatar src={person.image} alt={person.name} size="lg" />
                          <div className="absolute top-2 right-2">
                            <RankBadge rank={person.rank} />
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-bold" style={{ color: colors.primary.navy.DEFAULT }}>
                          {person.name}
                        </p>
                        <p className="text-xs text-gray-500">{person.division}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top 10 */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <h4 className="text-2xl font-bold" style={{ color: colors.primary.DEFAULT }}>
                      Top 10
                    </h4>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {topTen.map((person) => (
                      <div key={person.name} className="flex flex-col items-center text-center">
                        <div className="relative">
                          <PlaceholderAvatar src={person.image} alt={person.name} size="md" />
                          <div className="absolute -top-1 -right-1">
                            <RankBadge rank={person.rank} />
                          </div>
                        </div>
                        <p className="mt-2 text-xs font-bold" style={{ color: colors.primary.navy.DEFAULT }}>
                          {person.name}
                        </p>
                        <p className="text-[10px] text-gray-500">{person.division}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top 50 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h4 className="text-2xl font-bold" style={{ color: colors.primary.DEFAULT }}>
                  Top 50
                </h4>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {topFifty.map((person) => (
                  <PersonCard
                    key={person.rank}
                    name={person.name}
                    division={person.division}
                    image={person.image}
                    rank={person.rank}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Category grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCategories.map((category, index) =>
                "sections" in category ? (
                  <TopThreeCard key={`combined-${index}`} sections={category.sections} />
                ) : (
                  <TopThreeCard key={category.title} title={category.title} items={category.items} />
                ),
              )}
            </div>

            <div className="h-px bg-gray-200" />

            {/* Diamond Club & Division Directors */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold text-center mb-6" style={{ color: colors.primary.navy.DEFAULT }}>
                  Diamond Club
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  {diamondClub.map((person, index) => (
                    <PersonCard
                      key={`diamond-${index}`}
                      name={person.name}
                      division={person.division}
                      image={person.image}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-xl font-bold text-center mb-6" style={{ color: colors.primary.navy.DEFAULT }}>
                  Division Directors
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {divisionDirectors.map((person, index) => (
                    <PersonCard
                      key={`director-${index}`}
                      name={person.name}
                      division={person.division}
                      image={person.image}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
