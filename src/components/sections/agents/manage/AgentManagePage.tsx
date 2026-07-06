"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Pencil, Plus, Trash2, Upload, UserRound, X } from "lucide-react";
import { agentsApi } from "@/api/domains/agents";
import { mediaApi } from "@/api/domains/media";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Pagination } from "@/components/ui/Pagination";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { Section } from "@/components/ui/Section";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { SearchInput } from "@/components/ui/admin/SearchInput";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { extractApiError, showFieldError } from "@/lib/api-errors";
import { formatDate } from "@/lib/date";
import { compressImage } from "@/lib/imageCompression";
import { colors } from "@/lib/theme";
import type { Agent, AgentFilters, PaginationMeta } from "@/types/api";

const DEFAULT_LIMIT = 10;

interface AgentFormState {
  name: string;
  avatar: string;
  code: string;
}

function agentToFormState(agent?: Agent | null): AgentFormState {
  return {
    name: agent?.name ?? "",
    avatar: agent?.avatar ?? "",
    code: agent?.code ?? "",
  };
}

export default function AgentManagePage() {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const [items, setItems] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Agent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<AgentFilters>({ page: 1, limit: DEFAULT_LIMIT });
  const [meta, setMeta] = useState<PaginationMeta>({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });
  const [form, setForm] = useState<AgentFormState>(() => agentToFormState());
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isDraggingAvatar, setIsDraggingAvatar] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string }>({
    show: false,
    id: "",
  });
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showNetworkError, setShowNetworkError] = useState(false);

  const canCreate = hasPermission("agents.all.create");
  const canUpdate = hasPermission("agents.all.update");
  const canDelete = hasPermission("agents.all.delete");
  const canManage = canUpdate || canDelete;

  const initialForm = useMemo(() => agentToFormState(editing), [editing]);
  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);

  const loadAgents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await agentsApi.getAgents(filters);
      setItems(response.items);
      setMeta(response.meta);
    } catch (err) {
      setItems([]);
      setMeta({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 0 });
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    queueMicrotask(() => loadAgents());
  }, [loadAgents]);

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

  const openCreate = () => {
    setEditing(null);
    setForm(agentToFormState());
    setAvatarFile(null);
    setFieldErrors({});
    setShowForm(true);
  };

  const openEdit = (agent: Agent) => {
    setEditing(agent);
    setForm(agentToFormState(agent));
    setAvatarFile(null);
    setFieldErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(agentToFormState());
    setAvatarFile(null);
    setIsDraggingAvatar(false);
    setFieldErrors({});
  };

  const updateForm = <K extends keyof AgentFormState>(key: K, value: AgentFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) {
      errors.name = "Vui lòng nhập tên agent.";
    } else if (form.name.trim().length > 100) {
      errors.name = "Tên agent tối đa 100 ký tự.";
    }
    if (form.avatar.trim().length > 500) {
      errors.avatar = "URL ảnh tối đa 500 ký tự.";
    }
    if (form.code.trim().length > 100) {
      errors.code = "Mã agent tối đa 100 ký tự.";
    }
    return errors;
  };

  const setAvatarFromFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setPopup({
        show: true,
        type: "error",
        message: "File avatar phải là hình ảnh.",
      });
      return;
    }
    setAvatarFile(file);
    setForm((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
    setFieldErrors((prev) => ({ ...prev, avatar: "" }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFromFile(file);
    }
  };

  const handleDragOverAvatar = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDraggingAvatar(true);
  };

  const handleDragLeaveAvatar = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDraggingAvatar(false);
  };

  const handleDropAvatar = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDraggingAvatar(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setAvatarFromFile(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setForm((prev) => ({ ...prev, avatar: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPopup((prev) => ({ ...prev, show: false }));

    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSaving(true);
    try {
      let avatarUrl = form.avatar.trim() || null;
      if (avatarFile) {
        const compressedFile = await compressImage(avatarFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
        });
        const upload = await mediaApi.uploadImage(compressedFile, "agents", {
          filenameBase: form.name.trim(),
        });
        avatarUrl = upload.url;
      }

      const payload = {
        name: form.name.trim(),
        avatar: avatarUrl,
        code: form.code.trim() || null,
      };
      const saved = editing
        ? await agentsApi.updateAgent(editing.id, payload)
        : await agentsApi.createAgent(payload);

      setPopup({
        show: true,
        type: "success",
        message: editing ? "Cập nhật agent thành công!" : "Tạo agent thành công!",
      });
      setShowForm(false);
      setEditing(null);
      setForm(agentToFormState());
      setAvatarFile(null);
      setItems((prev) => {
        if (editing) return prev.map((item) => (item.id === saved.id ? saved : item));
        return [saved, ...prev].slice(0, meta.limit);
      });
      loadAgents().catch(() => {});
    } catch (err) {
      const { field, message, isNetworkError } = extractApiError(err);
      if (field) {
        showFieldError(field, message, setFieldErrors);
      } else if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    const id = deleteConfirm.id;
    if (!id) return;
    setDeleteConfirm({ show: false, id: "" });
    try {
      await agentsApi.deleteAgent(id);
      setPopup({ show: true, type: "success", message: "Xóa agent thành công!" });
      setItems((prev) => prev.filter((item) => item.id !== id));
      loadAgents().catch(() => {});
    } catch (err) {
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    }
  };

  const inputBaseClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 transition-colors outline-none focus:border-gray-400";
  const errorInputClass = "border-red-300 focus:border-red-400 bg-red-50/30";

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
        {showNetworkError && <NetworkErrorPopup onRetry={() => window.location.reload()} />}

        {popup.show && (
          <PopupNotification
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
            autoClose={popup.type === "success"}
            autoCloseMs={1000}
          />
        )}

        {warning.show && (
          <PopupNotification
            type="error"
            message={warning.message}
            onClose={closeWarning}
            autoClose={false}
          />
        )}

        <ConfirmDialog
          isOpen={deleteConfirm.show}
          title="Xác nhận xóa"
          message="Bạn có chắc muốn xóa agent này? Hành động này không thể hoàn tác."
          confirmLabel="Xóa"
          cancelLabel="Hủy"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm({ show: false, id: "" })}
        />

        {showForm ? (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_11rem] gap-6 items-start">
            <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-black" style={{ color: colors.primary.navy.DEFAULT }}>
                  {editing ? "Chỉnh sửa agent" : "Tạo agent mới"}
                </h2>
                <Button variant="ghost" isIconOnly size="sm" onClick={closeForm}>
                  <X size={20} className="text-gray-500" />
                </Button>
              </div>

              <form id="agent-form" onSubmit={handleSubmit} className="space-y-5">
                <div id="field-name">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tên agent <span style={{ color: colors.primary.DEFAULT }}>*</span>
                  </label>
                  <input
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    placeholder="Nhập tên agent"
                    className={`${inputBaseClass} ${fieldErrors.name ? errorInputClass : ""}`}
                  />
                  {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
                </div>

                <div id="field-code">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mã agent
                  </label>
                  <input
                    value={form.code}
                    onChange={(event) => updateForm("code", event.target.value)}
                    placeholder="Ví dụ: ERA-001"
                    className={`${inputBaseClass} ${fieldErrors.code ? errorInputClass : ""}`}
                  />
                  {fieldErrors.code && <p className="mt-1 text-xs text-red-500">{fieldErrors.code}</p>}
                </div>

                <div id="field-avatar">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Ảnh đại diện
                  </label>
                  {fieldErrors.avatar && <p className="mt-1 text-xs text-red-500">{fieldErrors.avatar}</p>}

                  {form.avatar.trim() ? (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                      <div className="min-w-0 flex items-center gap-3">
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-200">
                          <img src={form.avatar} alt="Avatar preview" className="h-full w-full object-cover object-top" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900">
                            {avatarFile?.name || "Avatar hiện tại"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {avatarFile ? "Ảnh sẽ được upload vào thư mục agents" : "Đã có ảnh đại diện"}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-red-300 hover:text-red-600"
                      >
                        Xoá ảnh
                      </button>
                    </div>
                  ) : null}

                  <label
                    onDragOver={handleDragOverAvatar}
                    onDragLeave={handleDragLeaveAvatar}
                    onDrop={handleDropAvatar}
                    className={`mt-3 flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors ${
                      isDraggingAvatar
                        ? "border-red-400 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <Upload size={28} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Kéo thả ảnh vào đây hoặc{" "}
                      <span className="font-semibold" style={{ color: colors.primary.DEFAULT }}>chọn file</span>
                    </span>
                    <span className="text-xs text-gray-400">Hỗ trợ: JPG, PNG, WEBP, GIF</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </form>
            </div>

            <div className="hidden md:block sticky top-20 self-start">
              <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <button
                  type="submit"
                  form="agent-form"
                  disabled={isSaving || !isDirty}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 bg-white px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ borderColor: colors.primary.navy.DEFAULT, color: colors.primary.navy.DEFAULT }}
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
                  {isSaving ? "Đang lưu..." : "Lưu"}
                </button>

                <div className="min-h-[120px]" />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full justify-center bg-white"
                  onClick={closeForm}
                  disabled={isSaving}
                >
                  Hủy
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 md:hidden">
              <Button type="button" variant="outline" size="sm" className="bg-white" onClick={closeForm}>
                Hủy
              </Button>
              <Button type="submit" form="agent-form" variant="primary" size="sm" disabled={isSaving || !isDirty}>
                {isSaving ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              <AdminListHeader title="Danh sách agent" subtitle={`Tổng cộng ${meta.total} agent`}>
                {canCreate && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="gap-2"
                    onClick={() =>
                      guard("agents.all.create", openCreate, "Bạn không có quyền tạo agent.")
                    }
                  >
                    <Plus size={16} /> Tạo agent
                  </Button>
                )}
              </AdminListHeader>

              <SearchInput
                value={searchInput}
                onChange={setSearchInput}
                placeholder="Tìm theo tên hoặc mã agent..."
                className="max-w-md"
              />

              {loading && <AdminLoading />}

              {!loading && (
                <AdminTable>
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Agent</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Mã agent</th>
                      <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Ngày tạo</th>
                      {canManage && (
                        <th className="w-36 px-5 py-3.5 text-right font-semibold text-gray-600">
                          Thao tác
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {items.map((item) => (
                      <tr key={item.id} className="transition-colors hover:bg-gray-50/40">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                              {item.avatar ? (
                                <img src={item.avatar} alt={item.name} className="h-full w-full object-cover object-top" />
                              ) : (
                                <UserRound size={20} className="text-gray-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900">{item.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{item.code || "—"}</td>
                        <td className="px-5 py-4 text-gray-600">{formatDate(item.createdAt)}</td>
                        {canManage && (
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {canUpdate && (
                                <Button
                                  variant="ghost"
                                  isIconOnly
                                  size="md"
                                  onClick={() =>
                                    guard("agents.all.update", () => openEdit(item), "Bạn không có quyền chỉnh sửa agent.")
                                  }
                                  title="Chỉnh sửa"
                                >
                                  <Pencil size={15} className="text-gray-500" />
                                </Button>
                              )}
                              {canDelete && (
                                <Button
                                  variant="ghost"
                                  isIconOnly
                                  size="md"
                                  onClick={() =>
                                    guard("agents.all.delete", () => setDeleteConfirm({ show: true, id: item.id }), "Bạn không có quyền xóa agent.")
                                  }
                                  title="Xoá"
                                  className="hover:!bg-red-50"
                                >
                                  <Trash2 size={15} className="text-red-500" />
                                </Button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={canManage ? 4 : 3}>
                          <AdminEmptyState message="Chưa có agent nào. Hãy bấm &quot;Tạo agent&quot; để thêm." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </AdminTable>
              )}
            </div>

            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          </>
        )}
      </div>
    </Section>
  );
}
