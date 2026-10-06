"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ProjectsHeroSection } from "./ProjectsHeroSection";
import { ProjectsListSection } from "./ProjectsListSection";
import { projectsApi } from "@/api/domains/projects";
import type { Landing, Project, PaginationMeta } from "@/types/api";

interface ProjectsPageClientProps {
  initialProjects: Project[];
  initialMeta: PaginationMeta;
  initialSearch?: string;
  initialLandings?: Landing[];
}

export function ProjectsPageClient({
  initialProjects,
  initialMeta,
  initialSearch = "",
  initialLandings = [],
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

  /* Gợi ý landing khớp từ khóa — search cả title, vị trí và tags của landing */
  const landingSuggestions = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return [];
    return initialLandings
      .filter((l) =>
        [l.title, l.location, ...l.tags].some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 4);
  }, [inputValue, initialLandings]);

  const handleSelectLandingSuggestion = (landing: Landing) => {
    setInputValue(landing.title);
    setShowSuggestions(false);
    router.push(landing.url);
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
        landingSuggestions={landingSuggestions}
        onSelectLandingSuggestion={handleSelectLandingSuggestion}
      />
      <ProjectsListSection
        initialProjects={initialProjects}
        initialMeta={initialMeta}
        searchQuery={searchQuery}
        landings={initialLandings}
      />
    </main>
  );
}
