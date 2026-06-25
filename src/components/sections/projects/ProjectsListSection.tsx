"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Building } from "lucide-react";
import { ProjectsSidebar } from "./ProjectsSidebar";
import { projectsApi } from "@/api/domains/projects";
import { getProjectCardImage } from "@/lib/projects";
import type { Project, ProjectType, ProjectStatus, PaginationMeta } from "@/types/api";

export type ProjectTag = ProjectStatus | "";

const tabs: { id: ProjectTag; label: string }[] = [
  { id: "", label: "Tất cả" },
  { id: "new", label: "Dự án mới" },
  { id: "booking", label: "Nhận booking" },
  { id: "selling", label: "Đang mở bán" },
  { id: "upcoming", label: "Sắp mở bán" },
  { id: "handed_over", label: "Đã bàn giao" },
];

const STATUS_LABELS: Record<ProjectStatus, string> = {
  new: "Dự án mới",
  booking: "Nhận booking",
  selling: "Đang mở bán",
  upcoming: "Sắp mở bán",
  handed_over: "Đã bàn giao",
};

const STATUS_STYLES: Record<ProjectStatus, { bg: string; text: string }> = {
  new: { bg: colors.secondary.DEFAULT, text: colors.neutral.white },
  booking: { bg: colors.primary.DEFAULT, text: colors.neutral.white },
  selling: { bg: colors.tertiary.purple.DEFAULT, text: colors.neutral.white },
  upcoming: { bg: colors.primary.navy.DEFAULT, text: colors.neutral.white },
  handed_over: { bg: colors.gray[400], text: colors.neutral.white },
};

function ProjectCard({ project }: { project: Project }) {
  const tag = STATUS_STYLES[project.status];
  const imageUrl = getProjectCardImage(project);

  return (
    <Link
      href={`/du-an/${project.slug}/`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Building size={32} />
          </div>
        )}
        <span
          className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-md"
          style={{ backgroundColor: tag.bg, color: tag.text }}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: colors.primary.DEFAULT }}>
          DỰ ÁN
        </p>
        <h3
          className="text-xl font-extrabold mb-1 line-clamp-2 min-h-[3.5rem]"
          style={{ color: colors.primary.navy.DEFAULT }}
        >
          {project.name}
        </h3>
        <div
          className="flex items-start gap-1 text-sm mb-4 line-clamp-2 min-h-[2.5rem]"
          style={{ color: colors.gray[500] }}
        >
          <MapPin size={14} className="shrink-0 mt-0.5" />
          <span className="line-clamp-2">{project.location}</span>
        </div>
        <span
          className="mt-auto inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
          style={{ color: colors.primary.navy.DEFAULT }}
        >
          Xem Chi Tiết <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

interface ProjectsListSectionProps {
  initialProjects: Project[];
  initialMeta: PaginationMeta;
  searchQuery?: string;
  typeFilter?: ProjectType | "";
  statusFilter?: ProjectStatus | "";
}

const LIMIT = 12;

export function ProjectsListSection({
  initialProjects,
  initialMeta,
  searchQuery = "",
  typeFilter = "",
  statusFilter = "",
}: ProjectsListSectionProps) {
  const [activeTab, setActiveTab] = useState<ProjectTag>(statusFilter || "");
  const [currentPage, setCurrentPage] = useState(initialMeta.page || 1);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTab(statusFilter || "");
    setCurrentPage(1);
  }, [statusFilter, searchQuery, typeFilter]);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await projectsApi.getPublishedProjects({
          ...(searchQuery ? { search: searchQuery } : {}),
          ...(typeFilter ? { type: typeFilter } : {}),
          ...(activeTab ? { status: activeTab } : {}),
          page: currentPage,
          limit: LIMIT,
        });
        if (!cancelled) {
          setProjects(data.items);
          setMeta(data.meta);
        }
      } catch {
        if (!cancelled) {
          setProjects([]);
          setMeta((prev) => ({ ...prev, total: 0, totalPages: 1 }));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [activeTab, currentPage, searchQuery, typeFilter]);

  const handleTabChange = (tab: ProjectTag) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const totalPages = meta.totalPages || 1;

  const visiblePages = (() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  })();

  return (
    <Section padding="md" bg="white">
      <Container size="lg">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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
            {loading ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-base font-medium">Đang tải dự án...</p>
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <p className="text-base font-medium">Chưa có dự án nào phù hợp.</p>
              </div>
            )}

            {/* Pagination */}
            {!loading && projects.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      onClick={() => typeof page === "number" && setCurrentPage(page)}
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
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
          <div className="sticky top-24 self-start">
            <ProjectsSidebar />
          </div>
        </div>
      </Container>
    </Section>
  );
}
