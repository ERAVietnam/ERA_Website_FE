"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { colors } from "@/lib/theme";
import { ProjectsHeroSection } from "./ProjectsHeroSection";
import { ProjectsDetailContentSection } from "./ProjectsDetailContentSection";
import { ProjectsRelatedSection } from "./ProjectsRelatedSection";
import { projectsApi } from "@/api/domains/projects";
import type { Project } from "@/types/api";

interface ProjectsDetailPageProps {
  project: Project;
  relatedProjects: Project[];
}

export function ProjectsDetailPage({ project, relatedProjects }: ProjectsDetailPageProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<Project[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const data = await projectsApi.getPublishedProjects({
        search: query.trim(),
        limit: 8,
      });
      setSuggestions(data.items);
    } catch {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(searchValue);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue, fetchSuggestions]);

  const handleSearch = () => {
    const search = searchValue.trim();
    router.push(search ? `/du-an/?search=${encodeURIComponent(search)}` : "/du-an/");
  };

  const handleSelectSuggestion = (selectedProject: Project) => {
    setSearchValue(selectedProject.name);
    setShowSuggestions(false);
    router.push(`/du-an/${selectedProject.slug}/`);
  };

  return (
    <main style={{ backgroundColor: colors.neutral.white }}>
      <ProjectsHeroSection
        value={searchValue}
        onChange={(value) => {
          setSearchValue(value);
          setShowSuggestions(true);
        }}
        onSearch={handleSearch}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        onSelectSuggestion={handleSelectSuggestion}
      />
      <ProjectsDetailContentSection project={project} />
      <ProjectsRelatedSection projects={relatedProjects} />
    </main>
  );
}
