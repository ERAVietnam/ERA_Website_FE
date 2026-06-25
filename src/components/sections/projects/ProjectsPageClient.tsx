"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectsHeroSection } from "./ProjectsHeroSection";
import { ProjectsListSection } from "./ProjectsListSection";
import { projectsApi } from "@/api/domains/projects";
import type { Project, PaginationMeta } from "@/types/api";

interface ProjectsPageClientProps {
  initialProjects: Project[];
  initialMeta: PaginationMeta;
  initialSearch?: string;
}

export function ProjectsPageClient({
  initialProjects,
  initialMeta,
  initialSearch = "",
}: ProjectsPageClientProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Project[]>([]);

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
      fetchSuggestions(inputValue);
    }, 250);
    return () => clearTimeout(timer);
  }, [inputValue, fetchSuggestions]);

  const handleSearch = () => {
    setSearchQuery(inputValue.trim());
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (project: Project) => {
    setInputValue(project.name);
    setShowSuggestions(false);
    router.push(`/du-an/${project.slug}/`);
  };

  return (
    <main>
      <ProjectsHeroSection
        value={inputValue}
        onChange={(value) => {
          setInputValue(value);
          setShowSuggestions(true);
        }}
        onSearch={handleSearch}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        onSelectSuggestion={handleSelectSuggestion}
      />
      <ProjectsListSection
        initialProjects={initialProjects}
        initialMeta={initialMeta}
        searchQuery={searchQuery}
      />
    </main>
  );
}
