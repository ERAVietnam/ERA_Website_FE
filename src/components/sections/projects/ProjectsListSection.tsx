"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectsSidebar } from "./ProjectsSidebar";
import { ProjectCard } from "./ProjectCard";
import { projectsApi } from "@/api/domains/projects";
import type { Project, PaginationMeta } from "@/types/api";

interface ProjectsListSectionProps {
  initialProjects: Project[];
  initialMeta: PaginationMeta;
  searchQuery?: string;
}

const LIMIT = 12;

export function ProjectsListSection({
  initialProjects,
  initialMeta,
  searchQuery = "",
}: ProjectsListSectionProps) {
  const [activeTab, setActiveTab] = useState("");
  const [currentPage, setCurrentPage] = useState(initialMeta.page || 1);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setCurrentPage(1));
  }, [searchQuery]);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await projectsApi.getPublishedProjects({
          ...(searchQuery ? { search: searchQuery } : {}),
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
  }, [currentPage, searchQuery]);

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
      <Container size="lg" className="px-0 sm:px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
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
          <div className="sticky top-24 self-start hidden lg:block">
            <ProjectsSidebar sourceUrl="/du-an/" sourceLabel="Trang Dự Án" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
