"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { ApplyManageForm, type JobFormData } from "./ApplyManageForm";
import { ApplyManageList } from "./ApplyManageList";
import { ApplyJobPreviewDialog } from "./ApplyJobPreviewDialog";
import { ApplyJobLogsDialog } from "./ApplyJobLogsDialog";
import { Pagination } from "@/components/ui/Pagination";
import { recruitmentApi } from "@/api/domains/recruitment";
import { recruitmentStatusConfig } from "@/lib/recruitment/status";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useAdminList } from "@/hooks/useAdminList";
import type { JobPosting, CreateJobInput, UpdateJobInput, JobStatus, JobPostingLog, JobFilters } from "@/types/api";

function isDeadlineInPast(deadline?: string | null): boolean {
  if (!deadline) return false;
  const [year, month, day] = deadline.split("-").map(Number);
  const today = new Date();
  const deadlineDate = new Date(year, month - 1, day);
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return deadlineDate < todayDate;
}

function jobPostingToForm(job: JobPosting): JobFormData {
  return {
    id: job.id,
    slug: job.slug,
    title: job.title,
    location: job.location,
    type: job.type,
    workMode: job.workMode ?? "",
    experience: job.experience ?? "",
    salary: job.salary ?? "",
    workingTime: job.workingTime ?? "",
    quantity: job.quantity,
    deadline: job.deadline ? job.deadline.slice(0, 10) : "",
    status: job.status,
    description: job.description,
    requirements: job.requirements,
    benefits: job.benefits,
  };
}

function formToCreateInput(form: JobFormData): CreateJobInput {
  return {
    title: form.title,
    slug: form.slug,
    location: form.location,
    type: form.type,
    workMode: form.workMode || undefined,
    experience: form.experience || undefined,
    salary: form.salary || undefined,
    workingTime: form.workingTime || undefined,
    quantity: form.quantity,
    deadline: form.deadline || undefined,
    description: form.description,
    requirements: form.requirements,
    benefits: form.benefits,
  };
}

function formToUpdateInput(form: JobFormData): UpdateJobInput {
  return {
    title: form.title,
    slug: form.slug,
    location: form.location,
    type: form.type,
    workMode: form.workMode || undefined,
    experience: form.experience || undefined,
    salary: form.salary || undefined,
    workingTime: form.workingTime || undefined,
    quantity: form.quantity,
    deadline: form.deadline || undefined,
    description: form.description,
    requirements: form.requirements,
    benefits: form.benefits,
  };
}

const DEFAULT_LIMIT = 10;

const locationOptions = [
  { value: "", label: "Tất cả địa điểm" },
  { value: "TP. HCM", label: "TP. Hồ Chí Minh" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
  { value: "Nha Trang", label: "Nha Trang" },
];

const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  ...Object.entries(recruitmentStatusConfig).map(([value, { label }]) => ({ value, label })),
];

export default function ApplyManagePage() {
  const { hasPermission } = useAuth();
  const canChangeStatus = hasPermission("recruitment.jobs.all.publish");

  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const {
    items: jobs,
    setItems: setJobs,
    loading,
    meta,
    filters,
    setFilters,
    handlePageChange,
    handleFilterChange,
  } = useAdminList<JobFormData, JobFilters>(
    async (currentFilters) => {
      const response = await recruitmentApi.getJobs(currentFilters);
      return { ...response, items: response.items.map(jobPostingToForm) };
    },
    {
      initialFilters: { page: 1, limit: DEFAULT_LIMIT },
      defaultLimit: DEFAULT_LIMIT,
      onError: handleApiError,
    },
  );
  const { searchInput, setSearchInput } = useDebouncedSearch((value) => {
    const search = value.trim() || undefined;
    setFilters((prev) => {
      if (prev.search === search) return prev;
      return { ...prev, search, page: 1 };
    });
  });
  const [editing, setEditing] = useState<JobFormData | null>(null);
  const [previewJob, setPreviewJob] = useState<JobFormData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({ show: false, id: "" });
  const [statusConfirm, setStatusConfirm] = useState<{ show: boolean; id: string; status: JobStatus | null }>({
    show: false,
    id: "",
    status: null,
  });
  const [logsDialog, setLogsDialog] = useState<{ show: boolean; logs: JobPostingLog[] }>({ show: false, logs: [] });

  const handleSave = async (data: JobFormData) => {
    try {
      if (editing?.id) {
        const updated = await recruitmentApi.updateJob(editing.id, formToUpdateInput(data));
        const updatedForm = jobPostingToForm(updated);
        setJobs((prev) => prev.map((j) => (j.id === updated.id ? updatedForm : j)));
        setEditing(updatedForm);
        showSuccess("Cập nhật tin tuyển dụng thành công!");
      } else {
        const created = await recruitmentApi.createJob(formToCreateInput(data));
        const createdForm = jobPostingToForm(created);
        setJobs((prev) => [createdForm, ...prev]);
        setEditing(createdForm);
        showSuccess("Tạo tin tuyển dụng thành công!");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleEdit = (job: JobFormData) => {
    setEditing(job);
    setShowForm(true);
  };

  const handlePreview = (job: JobFormData) => {
    setPreviewJob(job);
  };

  const handleViewLogs = async (id: string) => {
    try {
      const logs = await recruitmentApi.getJobLogs(id);
      setLogsDialog({ show: true, logs });
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleConfirmDelete = async () => {
    const { id } = deleteConfirm;
    if (!id) return;
    setDeleteConfirm({ show: false, id: "" });
    try {
      await recruitmentApi.deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      showSuccess("Xóa tin tuyển dụng thành công!");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleStatusChange = (id: string, status: JobStatus) => {
    const job = jobs.find((j) => j.id === id);
    if (status === "open" && job && isDeadlineInPast(job.deadline)) {
      showError("Vui lòng cập nhật hạn nộp trong tương lai trước khi mở tuyển dụng.");
      return;
    }
    setStatusConfirm({ show: true, id, status });
  };

  const handlePublishFromForm = () => {
    if (editing?.id) handleStatusChange(editing.id, "open");
  };

  const handleConfirmStatusChange = async () => {
    const { id, status } = statusConfirm;
    if (!id || !status) return;
    if (!canChangeStatus) {
      setStatusConfirm({ show: false, id: "", status: null });
      showError("Bạn không có quyền kiểm duyệt tin tuyển dụng.");
      return;
    }
    setStatusConfirm({ show: false, id: "", status: null });
    try {
      const updated = await recruitmentApi.updateJobStatus(id, status);
      const updatedForm = jobPostingToForm(updated);
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? updatedForm : j)));
      if (editing?.id === id) {
        setEditing(updatedForm);
      }
      const label = status === "open" ? "Đăng tuyển" : status === "closed" ? "Đóng tuyển" : "Gỡ bài";
      showSuccess(`${label} thành công!`);
    } catch (err) {
      handleApiError(err);
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
      <div className="max-w-6xl mx-auto">
        {showForm ? (
          <ApplyManageForm
            initialData={editing ?? undefined}
            onSave={handleSave}
            onCancel={handleCancel}
            onPublish={editing?.status === "draft" ? handlePublishFromForm : undefined}
            onViewLogs={editing?.id ? () => handleViewLogs(editing.id!) : undefined}
            canPublish={canChangeStatus}
          />
        ) : (
          <>
            <ApplyManageList
              jobs={jobs}
              loading={loading}
              searchInput={searchInput}
              filters={filters}
              meta={meta}
              locationOptions={locationOptions}
              statusOptions={statusOptions}
              onSearchChange={setSearchInput}
              onFilterChange={handleFilterChange}
              onPageChange={handlePageChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
              onPreview={handlePreview}
              onStatusChange={handleStatusChange}
              onViewLogs={handleViewLogs}
              canChangeStatus={canChangeStatus}
            />

            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <ApplyJobPreviewDialog job={previewJob} isOpen={!!previewJob} onClose={() => setPreviewJob(null)} />

      <ApplyJobLogsDialog
        logs={logsDialog.logs}
        isOpen={logsDialog.show}
        onClose={() => setLogsDialog({ show: false, logs: [] })}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.show}
        title="Xác nhận xóa"
        message="Bạn có chắc muốn xóa tin tuyển dụng này? Hành động này không thể hoàn tác."
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ show: false, id: "" })}
      />

      <ConfirmDialog
        isOpen={statusConfirm.show}
        variant="warning"
        title={
          statusConfirm.status === "open"
            ? "Đăng tuyển"
            : statusConfirm.status === "closed"
            ? "Đóng tuyển"
            : "Gỡ bài"
        }
        message={
          statusConfirm.status === "open"
            ? "Tin tuyển dụng sẽ được công khai và hiển thị trên trang tuyển dụng."
            : statusConfirm.status === "closed"
            ? "Tin tuyển dụng sẽ bị đóng và không còn nhận hồ sơ ứng tuyển."
            : "Tin tuyển dụng sẽ chuyển về bản nháp và không còn hiển thị công khai."
        }
        confirmLabel={
          statusConfirm.status === "open"
            ? "Đăng tuyển"
            : statusConfirm.status === "closed"
            ? "Đóng tuyển"
            : "Gỡ bài"
        }
        cancelLabel="Hủy"
        onConfirm={handleConfirmStatusChange}
        onCancel={() => setStatusConfirm({ show: false, id: "", status: null })}
      />

      {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

      {popup.show && (
        <PopupNotification
          type={popup.type}
          message={popup.message}
          onClose={closePopup}
          autoClose={popup.type === "success"}
          autoCloseMs={1000}
        />
      )}
    </Section>
  );
}
