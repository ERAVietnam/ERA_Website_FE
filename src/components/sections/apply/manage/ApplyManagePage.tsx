"use client";

import { useState, useEffect, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { ApplyManageForm, type JobFormData } from "./ApplyManageForm";
import { ApplyManageList } from "./ApplyManageList";
import { ApplyJobPreviewDialog } from "./ApplyJobPreviewDialog";
import { ApplyJobLogsDialog } from "./ApplyJobLogsDialog";
import { Pagination } from "@/components/ui/Pagination";
import { recruitmentApi } from "@/api/domains/recruitment";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getErrorMessage } from "@/lib/error-messages";
import { useAuth } from "@/contexts/AuthContext";
import type { JobPosting, CreateJobInput, UpdateJobInput, JobStatus, JobPostingLog, JobFilters, PaginationMeta } from "@/types/api";

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
  { value: "draft", label: "Bản nháp" },
  { value: "open", label: "Đang tuyển" },
  { value: "closed", label: "Đã đóng" },
];

export default function ApplyManagePage() {
  const { hasPermission } = useAuth();
  const canChangeStatus = hasPermission("recruitment.jobs.all.publish");

  const [jobs, setJobs] = useState<JobFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState<JobFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [editing, setEditing] = useState<JobFormData | null>(null);
  const [previewJob, setPreviewJob] = useState<JobFormData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({ show: false, id: "" });
  const [statusConfirm, setStatusConfirm] = useState<{ show: boolean; id: string; status: JobStatus | null }>({
    show: false,
    id: "",
    status: null,
  });
  const [logsDialog, setLogsDialog] = useState<{ show: boolean; logs: JobPostingLog[] }>({ show: false, logs: [] });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await recruitmentApi.getJobs(filters);
      setJobs(response.items.map(jobPostingToForm));
      setMeta(response.meta);
    } catch (err: any) {
      setJobs([]);
      setMeta({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Không thể tải danh sách tin tuyển dụng."),
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchInput.trim() || undefined;
      setFilters((prev) => {
        if (prev.search === search) return prev;
        return { ...prev, search, page: 1 };
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleFilterChange = (key: keyof JobFilters, value: JobFilters[typeof key]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSave = async (data: JobFormData) => {
    try {
      if (editing?.id) {
        const updated = await recruitmentApi.updateJob(editing.id, formToUpdateInput(data));
        const updatedForm = jobPostingToForm(updated);
        setJobs((prev) => prev.map((j) => (j.id === updated.id ? updatedForm : j)));
        setEditing(updatedForm);
        setPopup({ show: true, type: "success", message: "Cập nhật tin tuyển dụng thành công!" });
      } else {
        const created = await recruitmentApi.createJob(formToCreateInput(data));
        const createdForm = jobPostingToForm(created);
        setJobs((prev) => [createdForm, ...prev]);
        setEditing(createdForm);
        setPopup({ show: true, type: "success", message: "Tạo tin tuyển dụng thành công!" });
      }
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Lưu tin tuyển dụng thất bại. Vui lòng thử lại."),
      });
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
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Không thể tải lịch sử thay đổi."),
      });
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
      setPopup({ show: true, type: "success", message: "Xóa tin tuyển dụng thành công!" });
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Xóa tin tuyển dụng thất bại. Vui lòng thử lại."),
      });
    }
  };

  const handleStatusChange = (id: string, status: JobStatus) => {
    const job = jobs.find((j) => j.id === id);
    if (status === "open" && job && isDeadlineInPast(job.deadline)) {
      setPopup({
        show: true,
        type: "error",
        message: "Vui lòng cập nhật hạn nộp trong tương lai trước khi mở tuyển dụng.",
      });
      return;
    }
    setStatusConfirm({ show: true, id, status });
  };

  const handlePublishFromForm = useCallback(() => {
    if (editing?.id) handleStatusChange(editing.id, "open");
  }, [editing?.id]);

  const handleConfirmStatusChange = async () => {
    const { id, status } = statusConfirm;
    if (!id || !status) return;
    if (!canChangeStatus) {
      setStatusConfirm({ show: false, id: "", status: null });
      setPopup({
        show: true,
        type: "error",
        message: "Bạn không có quyền kiểm duyệt tin tuyển dụng.",
      });
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
      setPopup({ show: true, type: "success", message: `${label} thành công!` });
    } catch (err: any) {
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Cập nhật trạng thái thất bại. Vui lòng thử lại."),
      });
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

      {popup.show && (
        <PopupNotification
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
          autoClose={popup.type === "success"}
          autoCloseMs={1000}
        />
      )}
    </Section>
  );
}
