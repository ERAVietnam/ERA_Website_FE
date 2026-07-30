"use client";

import Image from "next/image";
import Link from "next/link";
import { colors } from "@/lib/theme";
import { MapPin, ArrowRight, Building } from "lucide-react";
import { getProjectCardImage } from "@/lib/projects";
import { ProjectTags } from "./ProjectTags";
import type { Project } from "@/types/api";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
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
            style={{ objectPosition: "top right" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Building size={32} />
          </div>
        )}
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
          className="flex items-center gap-1 text-sm mb-4 min-w-0"
          style={{ color: colors.gray[500] }}
        >
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{project.location}</span>
        </div>
        {(project.tags ?? []).length > 0 && <ProjectTags tags={project.tags ?? []} />}
        <span
          className="mt-auto inline-flex items-center justify-end gap-1 self-end text-sm font-semibold transition-colors hover:underline"
          style={{ color: colors.primary.navy.DEFAULT }}
        >
          Xem Chi Tiết <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
