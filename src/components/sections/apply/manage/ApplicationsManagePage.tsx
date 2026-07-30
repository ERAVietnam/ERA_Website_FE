"use client";

import { useEffect, useState, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { ApplicationsManageList } from "./ApplicationsManageList";
import { ApplicationsManageForm } from "./ApplicationsManageForm";
import { Pagination } from "@/components/ui/Pagination";
import { recruitmentApi } from "@/api/domains/recruitment";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import { usePopupNotification } from "@/hooks/usePopupNotification";
import { useApiErrorHandler } from "@/hooks/useApiErrorHandler";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useAdminList } from "@/hooks/useAdminList";
import type { JobApplication, JobPosting, JobApplicationFilters, ApplicationStatus, UpdateApplicationInput } from "@/types/api";

const DEFAULT_LIMIT = 10;

export default function ApplicationsManagePage() {
  const { hasPermission } = useAuth();
  const canUpdate = hasPermission("recruitment.applications.all.update");
  const canDelete = hasPermission("recruitment.applications.all.delete");

  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [jobFilter, setJobFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState<JobApplication | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { popup, showSuccess, showError, closePopup } = usePopupNotification();
  const { showNetworkError, handleApiError } = useApiErrorHandler(showError);
  const {
    items,
    setItems,
    loading,
    meta,
    setMeta,
    setFilters,
    handlePageChange,
  } = useAdminList<JobApplication, JobApplicationFilters>(
    (currentFilters) => recruitmentApi.getApplications(currentFilters),
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
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({ show: false, id: "" });

  const loadJobs = useCallback(async () => {
    try {
      const response = await recruitmentApi.getJobs({ limit: 1000 });
      setJobs(response.items);
    } catch (err) {
      setJobs([]);
      handleApiError(err, { messagePrefix: "Không thể tải danh sách vị trí: " });
    }
  }, [handleApiError]);

  useEffect(() => {
    queueMicrotask(loadJobs);
  }, [loadJobs]);

  useEffect(() => {
    const jobPostingId = jobFilter || undefined;
    queueMicrotask(() => {
      setFilters((prev) => {
        if (prev.jobPostingId === jobPostingId) return prev;
        return { ...prev, jobPostingId, page: 1 };
      });
    });
  }, [jobFilter, setFilters]);

  useEffect(() => {
    const status = (statusFilter as ApplicationStatus) || undefined;
    queueMicrotask(() => {
      setFilters((prev) => {
        if (prev.status === status) return prev;
        return { ...prev, status, page: 1 };
      });
    });
  }, [statusFilter, setFilters]);

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
      showSuccess("Cập nhật thông tin thành công!");
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
      showSuccess("Lưu ghi chú thành công!");
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
      showSuccess("Xóa đơn ứng tuyển thành công!");
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
            onClose={closePopup}
            autoClose
            autoCloseMs={1000}
          />
        )}
      </div>
    </Section>
  );
}
