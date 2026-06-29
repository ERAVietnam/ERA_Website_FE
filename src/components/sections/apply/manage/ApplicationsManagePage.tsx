"use client";

import { useEffect, useState, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { ApplicationsManageList } from "./ApplicationsManageList";
import { ApplicationsManageForm } from "./ApplicationsManageForm";
import { Pagination } from "@/components/ui/Pagination";
import { recruitmentApi } from "@/api/domains/recruitment";
import { extractApiError } from "@/lib/api-errors";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import type { JobApplication, JobPosting, PaginationMeta, JobApplicationFilters, ApplicationStatus, UpdateApplicationInput } from "@/types/api";

const DEFAULT_LIMIT = 10;

export default function ApplicationsManagePage() {
  const { hasPermission } = useAuth();
  const canUpdate = hasPermission("recruitment.applications.all.update");
  const canDelete = hasPermission("recruitment.applications.all.delete");

  const [items, setItems] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState<JobApplication | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "error",
    message: "",
  });
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<JobApplicationFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({ show: false, id: "" });
  const [showNetworkError, setShowNetworkError] = useState(false);

  const handleApiError = (err: unknown) => {
    const { message, isNetworkError } = extractApiError(err);
    if (isNetworkError) {
      setShowNetworkError(true);
    } else {
      setPopup({ show: true, type: "error", message });
    }
  };

  const loadApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await recruitmentApi.getApplications(filters);
      setItems(response.items);
      setMeta(response.meta);
    } catch (err) {
      setItems([]);
      setMeta({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadJobs = useCallback(async () => {
    try {
      const response = await recruitmentApi.getJobs({ limit: 1000 });
      setJobs(response.items);
    } catch (err) {
      setJobs([]);
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message: `Không thể tải danh sách vị trí: ${message}` });
      }
    }
  }, []);

  useEffect(() => {
    queueMicrotask(loadApplications);
  }, [loadApplications]);

  useEffect(() => {
    queueMicrotask(loadJobs);
  }, [loadJobs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchInput.trim() || undefined;
      setFilters((prev) => {
        if (prev.search === search) return prev;
        return { ...prev, search, page: 1 };
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const jobPostingId = jobFilter || undefined;
    queueMicrotask(() => {
      setFilters((prev) => {
        if (prev.jobPostingId === jobPostingId) return prev;
        return { ...prev, jobPostingId, page: 1 };
      });
    });
  }, [jobFilter]);

  useEffect(() => {
    const status = (statusFilter as ApplicationStatus) || undefined;
    queueMicrotask(() => {
      setFilters((prev) => {
        if (prev.status === status) return prev;
        return { ...prev, status, page: 1 };
      });
    });
  }, [statusFilter]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleEdit = (item: JobApplication) => {
    setEditing(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleSave = async (data: UpdateApplicationInput) => {
    if (!editing) return;
    try {
      const updated = await recruitmentApi.updateApplication(editing.id, data);
      setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setEditing(updated);
      setPopup({ show: true, type: "success", message: "Cập nhật thông tin thành công!" });
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!editing) return;
    try {
      const updated = await recruitmentApi.updateApplicationStatus(editing.id, { status });
      setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setEditing(updated);
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleLogCreate = async (data: { status?: ApplicationStatus; fromStatus?: ApplicationStatus; toStatus?: ApplicationStatus; note: string }) => {
    if (!editing) return;
    try {
      await recruitmentApi.createApplicationLog(editing.id, data);
      setPopup({ show: true, type: "success", message: "Lưu ghi chú thành công!" });
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
      await recruitmentApi.deleteApplication(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
      if (editing?.id === id) {
        setShowForm(false);
        setEditing(null);
      }
      setPopup({ show: true, type: "success", message: "Xóa đơn ứng tuyển thành công!" });
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <Section padding="md" bg="gray">
      <div className="max-w-6xl mx-auto space-y-8">
        {showForm && editing ? (
          <ApplicationsManageForm
            application={editing}
            jobs={jobs}
            onSave={handleSave}
            onStatusChange={handleStatusChange}
            onLogCreate={handleLogCreate}
            onCancel={handleCancel}
            onDelete={() => handleDelete(editing.id)}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
        ) : (
          <>
            <ApplicationsManageList
              items={items}
              jobs={jobs}
              loading={loading}
              searchInput={searchInput}
              onSearchChange={setSearchInput}
              jobFilter={jobFilter}
              onJobFilterChange={setJobFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              meta={meta}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <Pagination currentPage={meta.page} totalPages={meta.totalPages} onPageChange={handlePageChange} />
          </>
        )}

        <ConfirmDialog
          isOpen={deleteConfirm.show}
          title="Xác nhận xóa"
          message="Bạn có chắc muốn xóa đơn ứng tuyển này? Hành động này không thể hoàn tác."
          confirmLabel="Xóa"
          cancelLabel="Hủy"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm({ show: false, id: "" })}
        />

        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose
            autoCloseMs={1000}
          />
        )}
      </div>
    </Section>
  );
}
