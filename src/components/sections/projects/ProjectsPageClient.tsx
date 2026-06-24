"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { ProjectsHeroSection } from "./ProjectsHeroSection";
import { ProjectsListSection } from "./ProjectsListSection";
import { projectsApi } from "@/api/domains/projects";
import type { Project, ProjectType, ProjectStatus, PaginationMeta } from "@/types/api";

interface ProjectsPageClientProps {
  initialProjects: Project[];
  initialMeta: PaginationMeta;
}

export function ProjectsPageClient({ initialProjects, initialMeta }: ProjectsPageClientProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProjectType | "">("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "">("");
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
    setSearchQuery(project.name);
    setShowSuggestions(false);
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
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        onSelectSuggestion={handleSelectSuggestion}
      />
      <ProjectsListSection
        initialProjects={initialProjects}
        initialMeta={initialMeta}
        searchQuery={searchQuery}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
      />
    </main>
  );
}
