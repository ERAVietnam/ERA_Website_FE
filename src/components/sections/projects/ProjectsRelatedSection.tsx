"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Building } from "lucide-react";
import { useState } from "react";
import { getProjectCardImage } from "@/lib/projects";
import type { Project, ProjectStatus } from "@/types/api";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  new: "Dự án mới",
  booking: "Nhận booking",
  selling: "Đang mở bán",
  upcoming: "Sắp mở bán",
  handed_over: "Đã bàn giao",
};

const STATUS_BG: Record<ProjectStatus, string> = {
  new: colors.secondary.DEFAULT,
  booking: colors.primary.DEFAULT,
  selling: colors.tertiary.purple.DEFAULT,
  upcoming: colors.primary.navy.DEFAULT,
  handed_over: colors.gray[400],
};

interface ProjectsRelatedSectionProps {
  projects: Project[];
}

export function ProjectsRelatedSection({ projects }: ProjectsRelatedSectionProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const maxIndex = Math.max(0, projects.length - 3);

  const handlePrev = () => setScrollIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setScrollIndex((i) => Math.min(maxIndex, i + 1));

  if (projects.length === 0) return null;

  return (
    <section className="pb-16 pt-15 bg-white">
      <Container size="lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            style={{
              color: colors.primary.DEFAULT,
              fontWeight: 900,
              fontSize: "clamp(20px, 3vw, 28px)",
            }}
          >
            Những dự án khác
          </h2>
          {projects.length > 3 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={scrollIndex === 0}
                className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ borderColor: colors.gray[300] }}
              >
                <ChevronLeft size={18} style={{ color: colors.gray[600] }} />
              </button>
              <button
                onClick={handleNext}
                disabled={scrollIndex >= maxIndex}
                className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ borderColor: colors.gray[300] }}
              >
                <ChevronRight size={18} style={{ color: colors.gray[600] }} />
              </button>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(scrollIndex, scrollIndex + 3).map((project) => (
            <Link
              key={project.id}
              href={`/du-an/${project.slug}/`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {(() => {
                  const imageUrl = getProjectCardImage(project);
                  return imageUrl ? (
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
                  );
                })()}
                <span
                  className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-md"
                  style={{
                    backgroundColor: STATUS_BG[project.status],
                    color: colors.neutral.white,
                  }}
                >
                  {STATUS_LABELS[project.status]}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p
                  className="text-[11px] font-bold uppercase tracking-wider mb-1"
                  style={{ color: colors.primary.DEFAULT }}
                >
                  DỰ ÁN
                </p>
                <h3
                  className="text-xl font-black mb-1 line-clamp-2 min-h-[3.5rem]"
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
          ))}
        </div>
      </Container>
    </section>
  );
}
