"use client";

import { useState, useEffect, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { ApplyManageForm, type JobFormData } from "./ApplyManageForm";
import { ApplyManageList } from "./ApplyManageList";
import { ApplyJobPreviewDialog } from "./ApplyJobPreviewDialog";
import { recruitmentApi } from "@/api/domains/recruitment";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { getErrorMessage } from "@/lib/error-messages";
import type { JobPosting, CreateJobInput, UpdateJobInput, JobStatus } from "@/types/api";

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
    salaryHourly: job.salaryHourly ?? "",
    salaryType: (job.salaryType as JobFormData["salaryType"]) ?? "",
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
    salaryHourly: form.salaryHourly || undefined,
    salaryType: form.salaryType || undefined,
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
    salaryHourly: form.salaryHourly || undefined,
    salaryType: form.salaryType || undefined,
    workingTime: form.workingTime || undefined,
    quantity: form.quantity,
    deadline: form.deadline || undefined,
    description: form.description,
    requirements: form.requirements,
    benefits: form.benefits,
  };
}

export default function ApplyManagePage() {
  const [jobs, setJobs] = useState<JobFormData[]>([]);
  const [loading, setLoading] = useState(true);
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

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await recruitmentApi.getJobs({ limit: 100 });
      setJobs(response.items.map(jobPostingToForm));
    } catch (err: any) {
      setJobs([]);
      setPopup({
        show: true,
        type: "error",
        message: getErrorMessage(err?.status, err?.data, "Không thể tải danh sách tin tuyển dụng."),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSave = async (data: JobFormData) => {
    try {
      if (editing?.id) {
        const updated = await recruitmentApi.updateJob(editing.id, formToUpdateInput(data));
        setJobs((prev) => prev.map((j) => (j.id === updated.id ? jobPostingToForm(updated) : j)));
        setPopup({ show: true, type: "success", message: "Cập nhật tin tuyển dụng thành công!" });
      } else {
        const created = await recruitmentApi.createJob(formToCreateInput(data));
        setJobs((prev) => [jobPostingToForm(created), ...prev]);
        setPopup({ show: true, type: "success", message: "Tạo tin tuyển dụng thành công!" });
      }
      setShowForm(false);
      setEditing(null);
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
    setStatusConfirm({ show: true, id, status });
  };

  const handlePublishFromForm = useCallback(() => {
    if (editing?.id) handleStatusChange(editing.id, "open");
  }, [editing?.id]);

  const handleConfirmStatusChange = async () => {
    const { id, status } = statusConfirm;
    if (!id || !status) return;
    setStatusConfirm({ show: false, id: "", status: null });
    try {
      const updated = await recruitmentApi.updateJobStatus(id, status);
      setJobs((prev) => prev.map((j) => (j.id === updated.id ? jobPostingToForm(updated) : j)));
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
          />
        ) : (
          <ApplyManageList
            jobs={jobs}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onPreview={handlePreview}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <ApplyJobPreviewDialog job={previewJob} isOpen={!!previewJob} onClose={() => setPreviewJob(null)} />

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
        />
      )}
    </Section>
  );
}
