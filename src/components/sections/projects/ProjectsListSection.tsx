"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectsSidebar } from "./ProjectsSidebar";

export type ProjectTag = "new" | "booking" | "selling";

export interface Project {
  id: number;
  title: string;
  location: string;
  tag: ProjectTag;
  image: string;
}

const projects: Project[] = [
  { id: 1, title: "Sunwah Pearl", location: "TP. Thủ Đức, TP. Hồ Chí Minh", tag: "new", image: "/project/project_project_item.webp" },
  { id: 2, title: "Sunwah Pearl", location: "TP. Thủ Đức, TP. Hồ Chí Minh", tag: "booking", image: "/project/project_project_item.webp" },
  { id: 3, title: "Sunwah Pearl", location: "TP. Thủ Đức, TP. Hồ Chí Minh", tag: "new", image: "/project/project_project_item.webp" },
  { id: 4, title: "Sunwah Pearl", location: "TP. Thủ Đức, TP. Hồ Chí Minh", tag: "booking", image: "/project/project_project_item.webp" },
];

const tabs = [
  { id: "new" as ProjectTag, label: "Dự án mới" },
  { id: "booking" as ProjectTag, label: "Nhận booking" },
  { id: "selling" as ProjectTag, label: "Đang mở bán" },
];

const TAG_STYLES: Record<ProjectTag, { bg: string; text: string; label: string }> = {
  new: { bg: colors.secondary.DEFAULT, text: colors.neutral.white, label: "Dự án mới" },
  booking: { bg: colors.primary.DEFAULT, text: colors.neutral.white, label: "Nhận Booking" },
  selling: { bg: colors.tertiary.purple.DEFAULT, text: colors.neutral.white, label: "Đang mở bán" },
};

function ProjectCard({ project, href }: { project: Project; href?: string }) {
  const tag = TAG_STYLES[project.tag];
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span
          className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-md"
          style={{ backgroundColor: tag.bg, color: tag.text }}
        >
          {tag.label}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: colors.primary.DEFAULT }}>
          DỰ ÁN
        </p>
        <h3 className="text-xl font-black mb-1" style={{ color: colors.primary.navy.DEFAULT }}>
          {project.title}
        </h3>
        <div className="flex items-center gap-1 text-sm mb-4" style={{ color: colors.gray[500] }}>
          <MapPin size={14} />
          <span>{project.location}</span>
        </div>
        <span
          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
          style={{ color: colors.primary.navy.DEFAULT }}
        >
          Xem Chi Tiết <ArrowRight size={14} />
        </span>
      </div>
    </>
  );

  const cardClass = "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group block";

  if (href) {
    return (
      <Link href={href} className={cardClass}>
        {content}
      </Link>
    );
  }

  return <div className={cardClass}>{content}</div>;
}

export function ProjectsListSection() {
  const [activeTab, setActiveTab] = useState<ProjectTag>("new");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  const filteredProjects = projects.filter((p) =>
    activeTab === "new" ? true : p.tag === activeTab
  );

  const visiblePages = [1, 2, 3, "...", totalPages] as const;

  return (
    <Section padding="md" bg="white">
      <Container size="lg">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex items-center gap-6 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="group relative pb-3 text-sm font-semibold transition-colors duration-200"
                  style={{
                    color: activeTab === tab.id ? colors.primary.DEFAULT : colors.gray[500],
                  }}
                >
                  {tab.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 origin-left transition-transform duration-200 ${
                      activeTab === tab.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ backgroundColor: colors.primary.DEFAULT }}
                  />
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  href={project.id === 1 ? ROUTES.projectDetail : undefined}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              {visiblePages.map((page, i) =>
                page === "..." ? (
                  <span key={`dot-${i}`} className="w-11 h-11 flex items-center justify-center text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="w-11 h-11 flex items-center justify-center rounded-xl text-base font-bold transition-colors"
                    style={{
                      backgroundColor: currentPage === page ? colors.primary.DEFAULT : colors.gray[50],
                      color: currentPage === page ? colors.neutral.white : colors.gray[600],
                    }}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="sticky top-24 self-start">
            <ProjectsSidebar />
          </div>
        </div>
      </Container>
    </Section>
  );
}
