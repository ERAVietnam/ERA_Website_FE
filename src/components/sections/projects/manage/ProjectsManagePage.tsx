"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { ProjectsManageList } from "./ProjectsManageList";
import { ProjectsManageForm, type ProjectFormData } from "./ProjectsManageForm";
import { ProjectPreviewDialog } from "./ProjectPreviewDialog";
import { ProjectHistoryDialog } from "./ProjectHistoryDialog";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getErrorMessage } from "@/lib/error-messages";
import { projectsApi } from "@/api/domains/projects";
import type { Project, ProjectPublicationStatus } from "@/types/api";
import { PROJECT_FAQ_MAX_ITEMS, PROJECT_FAQ_MIN_ITEMS } from "@/lib/projects";

function apiProjectToFormData(project: Project): ProjectFormData {
  const faqs = (project.faqs ?? [])
    .slice(0, PROJECT_FAQ_MAX_ITEMS)
    .map(({ question, answer }) => ({ question, answer }));
  while (faqs.length < PROJECT_FAQ_MIN_ITEMS) {
    faqs.push({ question: "", answer: "" });
  }

  return {
    id: project.id,
    name: project.name,
    projectName: project.projectName ?? "",
    slug: project.slug,
    tags: project.tags ?? [],
    location: project.location,
    imageMediaId: project.imageMediaId ?? null,
    imageMedia: project.imageMedia ?? null,
    investor: project.investor ?? "",
    ownership: project.ownership ?? "",
    area: project.area ?? "",
    density: project.density ?? "",
    scale: project.scale ?? "",
    startYear: project.startYear ?? "",
    progress: project.progress ?? "",
    content: project.content ?? "",
    isIndexed: project.isIndexed ?? false,
    canonicalUrl: project.canonicalUrl ?? "",
    publicationStatus: project.publicationStatus ?? "draft",
    faqs,
  };
}

export function ProjectsManagePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<ProjectFormData | null>(null);
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showForm, setShowForm] = useState(false);
  const [confirm, setConfirm] = useState<{
    show: boolean;
    title: string;
    message: string;
    variant: "warning" | "danger";
    confirmLabel: string;
    onConfirm: () => void;
  }>({ show: false, title: "", message: "", variant: "warning", confirmLabel: "Xác nhận", onConfirm: () => {} });
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [historyProjectId, setHistoryProjectId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [publicationFilter, setPublicationFilter] = useState<ProjectPublicationStatus | "">("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const showPopup = (type: "success" | "error", message: string) => {
    setPopup({ show: true, type, message });
  };

  const getApiErrorMessage = (err: unknown, fallback: string) => {
    const error = err as { status?: string; data?: unknown; message?: string };
    return getErrorMessage(error?.status, error?.data, error?.message || fallback);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsApi.getProjects({
        search: debouncedSearch || undefined,
        publicationStatus: publicationFilter || undefined,
        page,
        limit: 10,
      });
      setProjects(data.items);
      setTotalPages(data.meta.totalPages);
    } catch (err) {
      showPopup("error", getApiErrorMessage(err, "Không thể tải danh sách dự án."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showForm) {
      fetchProjects();
    }
  }, [debouncedSearch, publicationFilter, page, showForm]);

  const handleSave = async (data: ProjectFormData) => {
    setSaving(true);
    try {
      const payload = {
        name: data.name,
        projectName: data.projectName,
        slug: data.slug,
        tags: data.tags,
        location: data.location,
        imageMediaId: data.imageMediaId,
        investor: data.investor || undefined,
        ownership: data.ownership || undefined,
        area: data.area || undefined,
        density: data.density || undefined,
        scale: data.scale || undefined,
        startYear: data.startYear || undefined,
        progress: data.progress || undefined,
        content: data.content || undefined,
        isIndexed: data.isIndexed,
        canonicalUrl: data.canonicalUrl || null,
      };

      let saved: Project;
      if (data.id) {
        saved = await projectsApi.updateProject(data.id, payload);
        showPopup("success", "Cập nhật dự án thành công!");
      } else {
        saved = await projectsApi.createProject({
          ...payload,
          faqs: data.faqs.map((faq) => ({
            question: faq.question.trim(),
            answer: faq.answer.trim(),
          })),
        });
        showPopup("success", "Tạo dự án thành công!");
      }

      setEditing(apiProjectToFormData(saved));
      fetchProjects();
    } catch (err) {
      showPopup("error", getApiErrorMessage(err, "Lưu dự án thất bại."));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (project: Project) => {
    try {
      const detail = await projectsApi.getProjectById(project.id);
      setEditing(apiProjectToFormData(detail));
      setShowForm(true);
    } catch (err) {
      showPopup("error", getApiErrorMessage(err, "Không thể tải chi tiết dự án."));
    }
  };

  const handleDelete = (id: string) => {
    setConfirm({
      show: true,
      title: "Xác nhận xóa",
      message: "Bạn có chắc muốn xóa dự án này?",
      variant: "danger",
      confirmLabel: "Xóa",
      onConfirm: async () => {
        setConfirm((prev) => ({ ...prev, show: false }));
        try {
          await projectsApi.deleteProject(id);
          showPopup("success", "Xóa dự án thành công!");
          fetchProjects();
        } catch (err) {
          showPopup("error", getApiErrorMessage(err, "Xóa dự án thất bại."));
        }
      },
    });
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleActionDone = (project?: Project) => {
    if (project) {
      setEditing(apiProjectToFormData(project));
    }
    fetchProjects();
  };

  const openListActionConfirm = (
    action: (id: string) => Promise<unknown>,
    id: string,
    title: string,
    message: string,
    successMessage: string,
    errorMessage: string,
    variant: "warning" | "danger" = "warning",
    confirmLabel: string = "Xác nhận"
  ) => {
    setConfirm({
      show: true,
      title,
      message,
      variant,
      confirmLabel,
      onConfirm: async () => {
        setConfirm((prev) => ({ ...prev, show: false }));
        try {
          await action(id);
          showPopup("success", successMessage);
          fetchProjects();
        } catch (err) {
          showPopup("error", getApiErrorMessage(err, errorMessage));
        }
      },
    });
  };

  const handleListSubmitForReview = (id: string) =>
    openListActionConfirm(
      projectsApi.submitProjectForReview,
      id,
      "Xác nhận gửi duyệt",
      "Bạn có chắc muốn gửi dự án đi duyệt?",
      "Đã gửi dự án đi duyệt!",
      "Gửi duyệt thất bại.",
      "warning",
      "Gửi duyệt"
    );

  const handleListPublish = (id: string) =>
    openListActionConfirm(
      projectsApi.publishProject,
      id,
      "Xác nhận duyệt",
      "Bạn có chắc muốn duyệt dự án này?",
      "Duyệt dự án thành công!",
      "Duyệt dự án thất bại.",
      "warning",
      "Duyệt"
    );

  const handleListReject = (id: string) =>
    openListActionConfirm(
      projectsApi.rejectProject,
      id,
      "Xác nhận từ chối",
      "Bạn có chắc muốn từ chối duyệt dự án này?",
      "Đã từ chối duyệt dự án!",
      "Từ chối duyệt thất bại.",
      "danger",
      "Từ chối"
    );

  const handleListRevoke = (id: string) =>
    openListActionConfirm(
      projectsApi.revokeProject,
      id,
      "Xác nhận hủy duyệt",
      "Bạn có chắc muốn hủy duyệt dự án này? Dự án sẽ chuyển về trạng thái chờ duyệt.",
      "Đã hủy duyệt dự án!",
      "Hủy duyệt thất bại.",
      "danger",
      "Hủy duyệt"
    );

  const handleListPreview = async (project: Project) => {
    try {
      setPreviewProject(await projectsApi.getProjectById(project.id));
    } catch (err) {
      showPopup("error", getApiErrorMessage(err, "Không thể tải dữ liệu xem trước."));
    }
  };

  const handleListViewHistory = (id: string) => {
    setHistoryProjectId(id);
  };

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose={popup.type === "success"}
            autoCloseMs={1000}
          />
        )}

        <ConfirmDialog
          isOpen={confirm.show}
          title={confirm.title}
          message={confirm.message}
          variant={confirm.variant}
          confirmLabel={confirm.confirmLabel}
          cancelLabel="Hủy"
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm((prev) => ({ ...prev, show: false }))}
        />

        {showForm ? (
          <ProjectsManageForm
            initialData={editing ?? undefined}
            onSave={handleSave}
            onActionDone={handleActionDone}
            onCancel={handleCancel}
            loading={saving}
          />
        ) : (
          <>
            <ProjectsManageList
              projects={projects}
              loading={loading}
              searchInput={searchInput}
              onSearchChange={(value) => {
                setSearchInput(value);
                setPage(1);
              }}
              publicationFilter={publicationFilter}
              onPublicationFilterChange={(value) => {
                setPublicationFilter(value);
                setPage(1);
              }}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
              onPreview={handleListPreview}
              onPublish={handleListPublish}
              onRevoke={handleListRevoke}
              onSubmitForReview={handleListSubmitForReview}
              onReject={handleListReject}
              onViewHistory={handleListViewHistory}
            />

            <ProjectPreviewDialog
              project={previewProject ? apiProjectToFormData(previewProject) : null}
              isOpen={!!previewProject}
              onClose={() => setPreviewProject(null)}
            />

            {historyProjectId && (
              <ProjectHistoryDialog
                projectId={historyProjectId}
                isOpen={!!historyProjectId}
                onClose={() => setHistoryProjectId(null)}
              />
            )}
          </>
        )}
      </div>
    </Section>
  );
}
