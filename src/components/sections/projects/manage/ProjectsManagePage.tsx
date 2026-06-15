"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { colors } from "@/lib/theme";
import { ProjectsManageList } from "./ProjectsManageList";
import { ProjectsManageForm, ProjectFormData } from "./ProjectsManageForm";

const initialProjects: ProjectFormData[] = [
  {
    id: 1,
    name: "Sunwah Pearl",
    tag: "new",
    location: "TP. Thủ Đức, TP. Hồ Chí Minh",
    image: "/project/project_project_item.webp",
    investor: "Sunwah Group",
    ownership: "Sổ hồng lâu dài",
    area: "33.800 m²",
    density: "Đang cập nhật",
    scale: "3 Khu",
    startYear: "2025",
    progress: "Đang xây dựng",
    content: "<p>Nội dung chi tiết dự án...</p>",
  },
];

export function ProjectsManagePage() {
  const [projects, setProjects] = useState<ProjectFormData[]>(initialProjects);
  const [editing, setEditing] = useState<ProjectFormData | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (data: ProjectFormData) => {
    if (data.id) {
      setProjects((prev) =>
        prev.map((p) => (p.id === data.id ? data : p))
      );
    } else {
      const newId = Math.max(0, ...projects.map((p) => p.id ?? 0)) + 1;
      setProjects((prev) => [...prev, { ...data, id: newId }]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (project: ProjectFormData) => {
    setEditing(project);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xoá dự án này?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
          {showForm ? (
            <ProjectsManageForm
              initialData={editing ?? undefined}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <ProjectsManageList
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
          )}
      </div>
    </Section>
  );
}
