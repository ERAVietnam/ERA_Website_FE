"use client";

import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { ProjectsSidebar } from "./ProjectsSidebar";
import type { Project } from "@/types/api";
import { ProjectsFaqSection } from "./ProjectsFaqSection";
import { ProjectOverviewTable } from "./ProjectOverviewTable";
import { ExpandableProjectContent } from "./ExpandableProjectContent";

interface ProjectsDetailContentSectionProps {
  project: Project;
}

export function ProjectsDetailContentSection({ project }: ProjectsDetailContentSectionProps) {
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
              <span className="font-medium" style={{ color: colors.neutral.foreground }}>
                {project.name}
              </span>
            </nav>

            {/* Title */}
            <h1
              className="mb-5"
              style={{
                color: colors.primary.DEFAULT,
                fontWeight: 800,
                fontSize: "26px",
                lineHeight: 1.3,
              }}
            >
              Dự án {project.name}
            </h1>

            {/* Info Table */}
            <ProjectOverviewTable project={project} />

            {/* Highlight Section */}
            <ExpandableProjectContent content={project.content} />

            <ProjectsFaqSection items={project.faqs ?? []} />

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full border"
                    style={{
                      color: colors.primary.navy.DEFAULT,
                      borderColor: colors.gray[200],
                      backgroundColor: colors.gray[50],
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="sticky top-24 self-start">
            <ProjectsSidebar
              sourceUrl={`/du-an/${project.slug}/`}
              sourceLabel={`Dự án ${project.name}`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
