"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { agentsApi } from "@/api/domains/agents";
import { honorsApi } from "@/api/domains/honors";
import { mediaApi } from "@/api/domains/media";
import { monthlyHonorsApi } from "@/api/domains/monthly-honors";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { Section } from "@/components/ui/Section";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { SelectField } from "@/components/ui/admin/SelectField";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { extractApiError } from "@/lib/api-errors";
import { compressImage } from "@/lib/imageCompression";
import type {
  Agent,
  CreateMonthlyHonorInput,
  HonorCategory,
  MonthlyHonorFilters,
  MonthlyHonorList,
  PaginationMeta,
  UpdateMonthlyHonorInput,
} from "@/types/api";
import { AnnualHonorsEditor } from "./AnnualHonorsEditor";
import { MonthlyHonorCreateForm } from "./MonthlyHonorCreateForm";
import { MonthlyHonorsList } from "./MonthlyHonorsList";
import {
  DEFAULT_LIMIT,
  createEmptyMonthlyHonorForm,
  monthlyHonorToFormState,
  type HonorsViewMode,
  type MonthlyHonorFormState,
} from "./types";

export default function HonorsManagePage() {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const [viewMode, setViewMode] = useState<HonorsViewMode>("annual");
  const [categories, setCategories] = useState<HonorCategory[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [agentSearch, setAgentSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [monthlyItems, setMonthlyItems] = useState<MonthlyHonorList[]>([]);
  const [showMonthlyForm, setShowMonthlyForm] = useState(false);
  const [monthlyEditing, setMonthlyEditing] = useState<MonthlyHonorList | null>(null);
  const [monthlyForm, setMonthlyForm] = useState<MonthlyHonorFormState>(() =>
    createEmptyMonthlyHonorForm(),
  );
  const [monthlySaving, setMonthlySaving] = useState(false);
  const [monthlyDeletingId, setMonthlyDeletingId] = useState<string | null>(null);
  const [monthlyFieldErrors, setMonthlyFieldErrors] = useState<
    Record<string, string>
  >({});
  const [monthlyFilters, setMonthlyFilters] = useState<MonthlyHonorFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [monthlyMeta, setMonthlyMeta] = useState<PaginationMeta>({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });
  const [saving, setSaving] = useState(false);
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showNetworkError, setShowNetworkError] = useState(false);
  const [confirm, setConfirm] = useState<{
    show: boolean;
    title: string;
    message: string;
    variant: "warning" | "danger";
    confirmLabel: string;
    onConfirm: () => void;
  }>({
    show: false,
    title: "",
    message: "",
    variant: "danger",
    confirmLabel: "Xác nhận",
    onConfirm: () => {},
  });

  const canUpdate = hasPermission("honors.all.update");
  const canCreate = hasPermission("honors.all.create");
  const canDelete = hasPermission("honors.all.delete");
  const canManageMonthly = canUpdate || canDelete;
  const selectedCategory =
    categories.find((category) => category.slug === selectedSlug) ?? null;
  const initialSelectedIds = useMemo(
    () => selectedCategory?.agents.map((agent) => agent.id) ?? [],
    [selectedCategory],
  );
  const isDirty =
    JSON.stringify(selectedIds) !== JSON.stringify(initialSelectedIds);

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const agentMap = useMemo(
    () => new Map(agents.map((agent) => [agent.id, agent])),
    [agents],
  );
  const monthlyFormAgentMap = useMemo(() => {
    const map = new Map(agentMap);
    monthlyEditing?.agents.forEach((membership) => {
      map.set(membership.agentId, membership.agent);
    });
    return map;
  }, [agentMap, monthlyEditing]);
  const selectedAgents = selectedIds
    .map((id) => agentMap.get(id))
    .filter((agent): agent is Agent => !!agent);

  const filteredAgents = agents.filter((agent) => {
    if (selectedIdSet.has(agent.id)) return false;
    const term = agentSearch.trim().toLowerCase();
    if (!term) return true;
    return (
      agent.name.toLowerCase().includes(term) ||
      (agent.code ?? "").toLowerCase().includes(term)
    );
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [categoryData, agentData] = await Promise.all([
        honorsApi.getCategories(),
        agentsApi.getAgents({ page: 1, limit: 100 }),
      ]);
      setCategories(categoryData);
      setAgents(agentData.items);

      const firstSlug = categoryData[0]?.slug ?? "";
      const nextSlug = selectedSlug || firstSlug;
      setSelectedSlug((prev) => prev || firstSlug);

      const activeCategory = categoryData.find(
        (category) => category.slug === nextSlug,
      );
      setSelectedIds(activeCategory?.agents.map((agent) => agent.id) ?? []);
    } catch (err) {
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setLoading(false);
    }
  }, [selectedSlug]);

  const loadMonthlyHonors = useCallback(async () => {
    setMonthlyLoading(true);
    try {
      const response = await monthlyHonorsApi.getLists(monthlyFilters);
      setMonthlyItems(response.items);
      setMonthlyMeta(response.meta);
    } catch (err) {
      setMonthlyItems([]);
      setMonthlyMeta({
        page: 1,
        limit: DEFAULT_LIMIT,
        total: 0,
        totalPages: 0,
      });
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setMonthlyLoading(false);
    }
  }, [monthlyFilters]);

  useEffect(() => {
    queueMicrotask(() => loadData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (viewMode === "monthly") {
      queueMicrotask(() => loadMonthlyHonors());
    }
  }, [viewMode, loadMonthlyHonors]);

  const handleCategoryChange = (slug: string) => {
    const category = categories.find((item) => item.slug === slug);
    setSelectedSlug(slug);
    setSelectedIds(category?.agents.map((agent) => agent.id) ?? []);
    setAgentSearch("");
  };

  const handleHonorScopeChange = (value: string) => {
    setShowMonthlyForm(false);
    if (value === "__monthly__") {
      setViewMode("monthly");
      return;
    }

    setViewMode("annual");
    handleCategoryChange(value);
  };

  const addAgent = (agentId: string) => {
    if (selectedIdSet.has(agentId)) return;
    setSelectedIds((prev) => [...prev, agentId]);
  };

  const removeAgent = (agentId: string) => {
    setSelectedIds((prev) => prev.filter((id) => id !== agentId));
  };

  const moveAgent = (agentId: string, direction: -1 | 1) => {
    setSelectedIds((prev) => {
      const index = prev.indexOf(agentId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    if (!selectedSlug) return;
    setSaving(true);
    try {
      const updated = await honorsApi.updateCategoryAgents(
        selectedSlug,
        selectedIds,
      );
      setCategories((prev) =>
        prev.map((category) =>
          category.slug === updated.slug ? updated : category,
        ),
      );
      setSelectedIds(updated.agents.map((agent) => agent.id));
      setPopup({
        show: true,
        type: "success",
        message: "Cập nhật danh sách thành công!",
      });
    } catch (err) {
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setSaving(false);
    }
  };

  const openMonthlyCreate = () => {
    setMonthlyEditing(null);
    setMonthlyForm(createEmptyMonthlyHonorForm());
    setMonthlyFieldErrors({});
    setShowMonthlyForm(true);
  };

  const openMonthlyEdit = (item: MonthlyHonorList) => {
    setMonthlyEditing(item);
    setMonthlyForm(monthlyHonorToFormState(item));
    setMonthlyFieldErrors({});
    setShowMonthlyForm(true);
  };

  const closeMonthlyForm = () => {
    setShowMonthlyForm(false);
    setMonthlyEditing(null);
    setMonthlyForm(createEmptyMonthlyHonorForm());
    setMonthlyFieldErrors({});
  };

  const updateMonthlyForm = <K extends keyof MonthlyHonorFormState>(
    key: K,
    value: MonthlyHonorFormState[K],
  ) => {
    setMonthlyForm((prev) => ({ ...prev, [key]: value }));
    setMonthlyFieldErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const addMonthlyAgent = (agentId: string) => {
    setMonthlyForm((prev) => {
      if (prev.agents.some((item) => item.agentId === agentId)) return prev;
      return {
        ...prev,
        agents: [...prev.agents, { agentId, image: "", file: null }],
      };
    });
    setMonthlyFieldErrors((prev) => ({ ...prev, agents: "" }));
  };

  const removeMonthlyAgent = (agentId: string) => {
    setMonthlyForm((prev) => ({
      ...prev,
      agents: prev.agents.filter((item) => item.agentId !== agentId),
    }));
  };

  const moveMonthlyAgent = (agentId: string, direction: -1 | 1) => {
    setMonthlyForm((prev) => {
      const index = prev.agents.findIndex((item) => item.agentId === agentId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= prev.agents.length) {
        return prev;
      }
      const nextAgents = [...prev.agents];
      [nextAgents[index], nextAgents[nextIndex]] = [
        nextAgents[nextIndex],
        nextAgents[index],
      ];
      return { ...prev, agents: nextAgents };
    });
  };

  const setMonthlyAgentFile = (agentId: string, file: File) => {
    if (!file.type.startsWith("image/")) {
      setPopup({
        show: true,
        type: "error",
        message: "File vinh danh tháng phải là hình ảnh.",
      });
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setMonthlyForm((prev) => ({
      ...prev,
      agents: prev.agents.map((item) =>
        item.agentId === agentId ? { ...item, file, image: previewUrl } : item,
      ),
    }));
    setMonthlyFieldErrors((prev) => ({ ...prev, [`image-${agentId}`]: "" }));
  };

  const validateMonthlyForm = () => {
    const errors: Record<string, string> = {};
    const month = Number(monthlyForm.month);
    const year = Number(monthlyForm.year);

    if (!Number.isInteger(month) || month < 1 || month > 12) {
      errors.month = "Vui lòng chọn tháng hợp lệ.";
    }

    if (!Number.isInteger(year) || year < 1900 || year > 9999) {
      errors.year = "Vui lòng nhập năm hợp lệ.";
    }

    if (monthlyForm.title.trim().length > 255) {
      errors.title = "Tên list tối đa 255 ký tự.";
    }

    if (monthlyForm.agents.length === 0) {
      errors.agents = "Vui lòng thêm ít nhất 1 agent.";
    }

    monthlyForm.agents.forEach((item) => {
      if (!item.file && !item.image.trim()) {
        errors[`image-${item.agentId}`] = "Vui lòng chọn ảnh vinh danh.";
      }
    });

    return errors;
  };

  const handleSaveMonthlyHonor = async (event: React.FormEvent) => {
    event.preventDefault();
    setPopup((prev) => ({ ...prev, show: false }));

    const errors = validateMonthlyForm();
    setMonthlyFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setMonthlySaving(true);
    try {
      const uploadedAgents = await Promise.all(
        monthlyForm.agents.map(async (item) => {
          const agent = agentMap.get(item.agentId);
          let imageUrl = item.image.trim();

          if (item.file) {
            const compressed = await compressImage(item.file, {
              maxSizeMB: 1.5,
              maxWidthOrHeight: 1600,
            });
            const upload = await mediaApi.uploadImage(
              compressed,
              "monthly-honors",
              {
                filenameBase: `${agent?.name || "agent"}-${monthlyForm.year}-${monthlyForm.month}`,
              },
            );
            imageUrl = upload.url;
          }

          return {
            agentId: item.agentId,
            image: imageUrl,
          };
        }),
      );

      const payload: CreateMonthlyHonorInput | UpdateMonthlyHonorInput = {
        month: Number(monthlyForm.month),
        year: Number(monthlyForm.year),
        title: monthlyForm.title.trim() || null,
        agents: uploadedAgents,
      };

      if (monthlyEditing) {
        await monthlyHonorsApi.updateList(monthlyEditing.id, payload);
      } else {
        await monthlyHonorsApi.createList(payload as CreateMonthlyHonorInput);
      }
      setPopup({
        show: true,
        type: "success",
        message: monthlyEditing
          ? "Cập nhật list vinh danh tháng thành công!"
          : "Tạo list vinh danh tháng thành công!",
      });
      closeMonthlyForm();
      setMonthlyFilters((prev) => ({ ...prev, page: 1 }));
      loadMonthlyHonors().catch(() => {});
    } catch (err) {
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setMonthlySaving(false);
    }
  };

  const handleDeleteMonthlyHonor = (item: MonthlyHonorList) => {
    guard(
      "honors.all.delete",
      () => {
        const label =
          item.title ||
          `Vinh danh tháng ${String(item.month).padStart(2, "0")}/${item.year}`;
        setConfirm({
          show: true,
          title: "Xác nhận xóa",
          message: `Bạn có chắc muốn xóa "${label}"? Hành động này sẽ xóa cả hình ảnh vinh danh tháng liên quan.`,
          variant: "danger",
          confirmLabel: "Xóa",
          onConfirm: async () => {
            setConfirm((prev) => ({ ...prev, show: false }));
            setMonthlyDeletingId(item.id);
            try {
              await monthlyHonorsApi.deleteList(item.id);
              setPopup({
                show: true,
                type: "success",
                message: "Đã xóa list vinh danh tháng.",
              });
              loadMonthlyHonors().catch(() => {});
            } catch (error) {
              const apiError = extractApiError(error);
              setPopup({
                show: true,
                type: "error",
                message: apiError.message || "Không thể xóa list vinh danh tháng.",
              });
            } finally {
              setMonthlyDeletingId(null);
            }
          },
        });
      },
      "Bạn không có quyền xóa list vinh danh tháng.",
    );
  };

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-8">
        {showNetworkError && (
          <NetworkErrorPopup onRetry={() => window.location.reload()} />
        )}

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
          isOpen={confirm.show}
          title={confirm.title}
          message={confirm.message}
          variant={confirm.variant}
          confirmLabel={confirm.confirmLabel}
          cancelLabel="Hủy"
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm((prev) => ({ ...prev, show: false }))}
        />

        <AdminListHeader
          title="Vinh danh và Hệ thống"
          subtitle={
            viewMode === "monthly"
              ? "Quản lý danh sách agent được vinh danh theo từng tháng."
              : "Chọn một mục, sau đó thêm danh sách agent vào mục đó."
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            {viewMode === "monthly" && canCreate && (
              <Button
                variant="primary"
                size="sm"
                className="gap-2"
                onClick={() =>
                  guard(
                    "honors.all.create",
                    openMonthlyCreate,
                    "Bạn không có quyền tạo list vinh danh tháng.",
                  )
                }
              >
                <Plus size={16} /> Tạo list vinh danh mới
              </Button>
            )}

            {viewMode === "annual" && canUpdate && (
              <Button
                variant="primary"
                size="sm"
                className="gap-2"
                disabled={!isDirty || saving || !selectedSlug}
                onClick={() =>
                  guard(
                    "honors.all.update",
                    handleSave,
                    "Bạn không có quyền cập nhật Vinh danh và Hệ thống.",
                  )
                }
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                {saving ? "Đang lưu..." : "Lưu danh sách"}
              </Button>
            )}
          </div>
        </AdminListHeader>

        <div className="max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Chọn mục quản lý
          </label>
          <SelectField
            value={viewMode === "monthly" ? "__monthly__" : selectedSlug}
            onChange={handleHonorScopeChange}
            placeholder="Chọn mục"
            options={[
              ...categories.map((category) => ({
                value: category.slug,
                label: category.name,
              })),
              { value: "__monthly__", label: "Vinh danh tháng" },
            ]}
          />
        </div>

        {viewMode === "monthly" && showMonthlyForm ? (
          <MonthlyHonorCreateForm
            form={monthlyForm}
            agents={agents}
            agentMap={monthlyFormAgentMap}
            errors={monthlyFieldErrors}
            isSaving={monthlySaving}
            onUpdate={updateMonthlyForm}
            onAddAgent={addMonthlyAgent}
            onRemoveAgent={removeMonthlyAgent}
            onMoveAgent={moveMonthlyAgent}
            onSetAgentFile={setMonthlyAgentFile}
            onSubmit={handleSaveMonthlyHonor}
            onCancel={closeMonthlyForm}
            isEditing={!!monthlyEditing}
          />
        ) : viewMode === "monthly" ? (
          <MonthlyHonorsList
            items={monthlyItems}
            loading={monthlyLoading}
            meta={monthlyMeta}
            canManage={canManageMonthly}
            deletingId={monthlyDeletingId}
            onEdit={openMonthlyEdit}
            onDelete={handleDeleteMonthlyHonor}
            onPageChange={(page) =>
              setMonthlyFilters((prev) => ({ ...prev, page }))
            }
          />
        ) : loading ? (
          <AdminLoading />
        ) : (
          <AnnualHonorsEditor
            categories={categories}
            selectedSlug={selectedSlug}
            selectedCategory={selectedCategory}
            selectedIds={selectedIds}
            selectedAgents={selectedAgents}
            filteredAgents={filteredAgents}
            agentSearch={agentSearch}
            canUpdate={canUpdate}
            onCategoryChange={handleCategoryChange}
            onAgentSearchChange={setAgentSearch}
            onAddAgent={addAgent}
            onRemoveAgent={removeAgent}
            onMoveAgent={moveAgent}
          />
        )}
      </div>
    </Section>
  );
}

