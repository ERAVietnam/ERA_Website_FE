"use client";

import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/api";

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
              fontWeight: 800,
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
