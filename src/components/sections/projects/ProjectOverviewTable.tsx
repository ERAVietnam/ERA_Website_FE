"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { colors } from "@/lib/theme";

interface ProjectOverviewTableProps {
  project: {
    projectName?: string | null;
    name: string;
    investor?: string | null;
    ownership?: string | null;
    area?: string | null;
    density?: string | null;
    scale?: string | null;
    startYear?: string | null;
    progress?: string | null;
  };
  defaultExpanded?: boolean;
}

export function ProjectOverviewTable({
  project,
  defaultExpanded = true,
}: ProjectOverviewTableProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

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

  if (infoRows.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden mb-8">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-3 text-left"
        aria-expanded={isOpen}
      >
        <span
          style={{
            color: colors.primary.navy.DEFAULT,
            fontWeight: 700,
            fontSize: "15px",
          }}
        >
          Tổng quan dự án {project.projectName}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ color: colors.primary.DEFAULT }}
        />
      </button>

      {isOpen && (
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
      )}
    </div>
  );
}
