"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { ProjectsManageList } from "./ProjectsManageList";
import { ProjectsManageForm, type ProjectFormData } from "./ProjectsManageForm";
import { ProjectPreviewDialog } from "./ProjectPreviewDialog";
import { ProjectHistoryDialog } from "./ProjectHistoryDialog";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ReviewerNotifySelect } from "@/components/ui/admin/ReviewerNotifySelect";
import { projectsApi } from "@/api/domains/projects";
import { accountsApi } from "@/api/domains/accounts";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useAdminList } from "@/hooks/useAdminList";
import type { AccountReviewer, Project, ProjectPublicationStatus } from "@/types/api";
import { PROJECT_FAQ_MAX_ITEMS, PROJECT_FAQ_MIN_ITEMS, PROJECT_TAGS } from "@/lib/projects";

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

interface ProjectsListFilters {
  search?: string;
  publicationStatus?: ProjectPublicationStatus;
  province?: string;
  tags: string[];
  page: number;
}

export function ProjectsManagePage() {
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<ProjectFormData | null>(null);
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const [showForm, setShowForm] = useState(false);
  const {
    items: projects,
    loading,
    meta,
    filters,
    setFilters,
    fetchItems: fetchProjects,
    handlePageChange,
  } = useAdminList<Project, ProjectsListFilters>(
    (currentFilters) =>
      projectsApi.getProjects({
        search: currentFilters.search,
        publicationStatus: currentFilters.publicationStatus,
        province: currentFilters.province,
        tags: currentFilters.tags.length > 0 ? currentFilters.tags.join(",") : undefined,
        page: currentFilters.page,
        limit: 10,
      }),
    {
      initialFilters: { tags: [], page: 1 },
      defaultLimit: 10,
      enabled: !showForm,
      resetOnError: false,
      initialLoading: false,
      onError: handleApiError,
    },
  );
  const { searchInput, setSearchInput } = useDebouncedSearch((value) => {
    const search = value || undefined;
    setFilters((prev) => {
      if (prev.search === search) return prev;
      return { ...prev, search, page: 1 };
    });
  });
  const [confirm, setConfirm] = useState<{
    show: boolean;
    title: string;
    message: string;
    variant: "warning" | "danger";
    confirmLabel: string;
    isSubmit: boolean;
    onConfirm: (notifyAccountId?: string | null) => void;
  }>({ show: false, title: "", message: "", variant: "warning", confirmLabel: "X?c nh?n", isSubmit: false, onConfirm: () => {} });
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [historyProjectId, setHistoryProjectId] = useState<string | null>(null);
  const [projectReviewers, setProjectReviewers] = useState<AccountReviewer[]>([]);
  const [notifyAccountId, setNotifyAccountId] = useState("");
  const handledEditIdRef = useRef<string | null>(null);

  const showPopup = (type: "success" | "error", message: string) => {
    if (type === "success") showSuccess(message);
    else showError(message);
  };

  useEffect(() => {
    accountsApi
      .getProjectReviewers()
      .then(setProjectReviewers)
      .catch(() => setProjectReviewers([]));
  }, []);

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
      handleApiError(err);
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
      handleApiError(err);
    }
  };

  const handleEditById = async (id: string) => {
    try {
      const detail = await projectsApi.getProjectById(id);
      setEditing(apiProjectToFormData(detail));
      setShowForm(true);
    } catch (err) {
      handleApiError(err);
    }
  };

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (!editId || handledEditIdRef.current === editId) return;

    handledEditIdRef.current = editId;
    void handleEditById(editId);
  }, [searchParams]);

  const handleDelete = (id: string) => {
    setConfirm({
      show: true,
      title: "Xác nhận xóa",
      message: "Bạn có chắc muốn xóa dự án này?",
      variant: "danger",
      confirmLabel: "Xóa",
      isSubmit: false,
      onConfirm: async () => {
        setConfirm((prev) => ({ ...prev, show: false }));
        try {
          await projectsApi.deleteProject(id);
          showPopup("success", "Xóa dự án thành công!");
          fetchProjects();
        } catch (err) {
          handleApiError(err);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- action có signature khác nhau (submit nhận notifyAccountId, các action khác nhận note)
    action: (id: string, data?: any) => Promise<unknown>,
    id: string,
    title: string,
    message: string,
    successMessage: string,
    errorMessage: string,
    variant: "warning" | "danger" = "warning",
    confirmLabel: string = "X?c nh?n",
    isSubmit: boolean = false,
  ) => {
    if (isSubmit) {
      setNotifyAccountId("");
    }
    setConfirm({
      show: true,
      title,
      message,
      variant,
      confirmLabel,
      isSubmit,
      onConfirm: async (selectedNotifyAccountId?: string | null) => {
        setConfirm((prev) => ({ ...prev, show: false }));
        try {
          await action(
            id,
            isSubmit ? { notifyAccountId: selectedNotifyAccountId || null } : undefined,
          );
          showPopup("success", successMessage);
          fetchProjects();
        } catch (err) {
          handleApiError(err);
        }
      },
    });
  };

  const handleListSubmitForReview = (id: string) =>
    openListActionConfirm(
      projectsApi.submitProjectForReview,
      id,
      "X?c nh?n g?i duy?t",
      "B?n c? ch?c mu?n g?i d? ?n ?i duy?t?",
      "?? g?i d? ?n ?i duy?t!",
      "G?i duy?t th?t b?i.",
      "warning",
      "G?i duy?t",
      true,
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
      handleApiError(err);
    }
  };

  const handleListViewHistory = (id: string) => {
    setHistoryProjectId(id);
  };

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={closePopup}
            autoClose
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
          onConfirm={() => confirm.onConfirm(notifyAccountId || null)}
          onCancel={() => setConfirm((prev) => ({ ...prev, show: false }))}
        >
          {confirm.isSubmit && (
            <ReviewerNotifySelect
              value={notifyAccountId}
              reviewers={projectReviewers}
              onChange={setNotifyAccountId}
            />
          )}
        </ConfirmDialog>

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
                setFilters((prev) => (prev.page === 1 ? prev : { ...prev, page: 1 }));
              }}
              publicationFilter={filters.publicationStatus ?? ""}
              onPublicationFilterChange={(value) => {
                const publicationStatus = value || undefined;
                setFilters((prev) =>
                  prev.publicationStatus === publicationStatus && prev.page === 1
                    ? prev
                    : { ...prev, publicationStatus, page: 1 },
                );
              }}
              provinceFilter={filters.province ?? ""}
              onProvinceFilterChange={(value) => {
                const province = value || undefined;
                setFilters((prev) =>
                  prev.province === province && prev.page === 1
                    ? prev
                    : { ...prev, province, page: 1 },
                );
              }}
              selectedTags={filters.tags}
              availableTags={PROJECT_TAGS}
              onTagsChange={(tags) => {
                setFilters((prev) => ({ ...prev, tags, page: 1 }));
              }}
              page={filters.page}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
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
