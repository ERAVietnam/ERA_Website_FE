"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { ProjectsSidebar } from "./ProjectsSidebar";
import { getProjectImage } from "@/lib/projects";
import type { Project } from "@/types/api";
import { ProjectsFaqSection } from "./ProjectsFaqSection";

interface ProjectsDetailContentSectionProps {
  project: Project;
}

export function ProjectsDetailContentSection({ project }: ProjectsDetailContentSectionProps) {
  const infoRows = [
    { label: "Tên dự án", value: project.projectName || project.name },
    { label: "Chủ đầu tư", value: project.investor },
    { label: "Hình thức sở hữu", value: project.ownership },
    { label: "Tổng diện tích", value: project.area },
    { label: "Mật độ xây dựng", value: project.density },
    { label: "Quy mô phát triển", value: project.scale },
    { label: "Thởi điểm khởi công", value: project.startYear },
    { label: "Tiến độ", value: project.progress, highlight: true },
  ].filter((row) => row.value);

  const imageUrl = getProjectImage(project);

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
              className="mb-3"
              style={{
                color: colors.primary.DEFAULT,
                fontWeight: 800,
                fontSize: "clamp(22px, 3.5vw, 32px)",
                lineHeight: 1.2,
              }}
            >
              Dự án {project.name}
            </h1>
            <p
              className="mb-6"
              style={{
                color: colors.primary.navy.DEFAULT,
                fontWeight: 700,
                fontSize: "15px",
              }}
            >
              Tổng quan dự án {project.projectName}
            </p>

            {/* Info Table */}
            {infoRows.length > 0 && (
              <div className="rounded-xl border border-gray-100 overflow-hidden mb-8">
                <div
                  className="px-5 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: colors.gray[50],
                    color: colors.neutral.foreground,
                  }}
                >
                  Thông tin chi tiết
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {infoRows.map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-5 py-3 text-sm border-b border-gray-50 last:border-b-0"
                      style={{
                        borderRight: i % 2 === 0 ? `1px solid ${colors.gray[50]}` : undefined,
                      }}
                    >
                      <span style={{ color: colors.gray[500] }}>{row.label}</span>
                      <span
                        className="font-medium text-right ml-4"
                        style={{
                          color: row.highlight
                            ? colors.primary.DEFAULT
                            : colors.neutral.foreground,
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Image */}
            {imageUrl && (
              <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9]">
                <Image
                  src={imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            )}

            {/* Highlight Section */}
            {project.content && (
              <div className="mb-8">
                <div
                  className="ck-content"
                  style={{
                    color: colors.neutral.foreground,
                    fontSize: "15px",
                    lineHeight: 1.8,
                  }}
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </div>
            )}

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
            <ProjectsSidebar />
          </div>
        </div>
      </Container>
    </section>
  );
}
