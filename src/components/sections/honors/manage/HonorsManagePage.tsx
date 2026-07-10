"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  Trophy,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { agentsApi } from "@/api/domains/agents";
import { honorsApi } from "@/api/domains/honors";
import { mediaApi } from "@/api/domains/media";
import { monthlyHonorsApi } from "@/api/domains/monthly-honors";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Pagination } from "@/components/ui/Pagination";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { Section } from "@/components/ui/Section";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { SelectField } from "@/components/ui/admin/SelectField";
import { AdminEmptyState } from "@/components/ui/admin/AdminEmptyState";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { AdminTable } from "@/components/ui/admin/AdminTable";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { extractApiError } from "@/lib/api-errors";
import { formatDate } from "@/lib/date";
import { compressImage } from "@/lib/imageCompression";
import { colors } from "@/lib/theme";
import type {
  Agent,
  CreateMonthlyHonorInput,
  HonorCategory,
  MonthlyHonorFilters,
  MonthlyHonorList,
  PaginationMeta,
  UpdateMonthlyHonorInput,
} from "@/types/api";

type HonorsViewMode = "annual" | "monthly";

const DEFAULT_LIMIT = 10;

interface MonthlyHonorFormAgent {
  agentId: string;
  image: string;
  file: File | null;
}

interface MonthlyHonorFormState {
  month: string;
  year: string;
  title: string;
  agentSearch: string;
  agents: MonthlyHonorFormAgent[];
}

function createEmptyMonthlyHonorForm(): MonthlyHonorFormState {
  const now = new Date();
  return {
    month: String(now.getMonth() + 1),
    year: String(now.getFullYear()),
    title: "",
    agentSearch: "",
    agents: [],
  };
}

function monthlyHonorToFormState(item: MonthlyHonorList): MonthlyHonorFormState {
  return {
    month: String(item.month),
    year: String(item.year),
    title: item.title ?? "",
    agentSearch: "",
    agents: item.agents.map((membership) => ({
      agentId: membership.agentId,
      image: membership.image,
      file: null,
    })),
  };
}

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

interface AnnualHonorsEditorProps {
  categories: HonorCategory[];
  selectedSlug: string;
  selectedCategory: HonorCategory | null;
  selectedIds: string[];
  selectedAgents: Agent[];
  filteredAgents: Agent[];
  agentSearch: string;
  canUpdate: boolean;
  onCategoryChange: (slug: string) => void;
  onAgentSearchChange: (value: string) => void;
  onAddAgent: (agentId: string) => void;
  onRemoveAgent: (agentId: string) => void;
  onMoveAgent: (agentId: string, direction: -1 | 1) => void;
}

interface MonthlyHonorCreateFormProps {
  form: MonthlyHonorFormState;
  agents: Agent[];
  agentMap: Map<string, Agent>;
  errors: Record<string, string>;
  isSaving: boolean;
  onUpdate: <K extends keyof MonthlyHonorFormState>(
    key: K,
    value: MonthlyHonorFormState[K],
  ) => void;
  onAddAgent: (agentId: string) => void;
  onRemoveAgent: (agentId: string) => void;
  onMoveAgent: (agentId: string, direction: -1 | 1) => void;
  onSetAgentFile: (agentId: string, file: File) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

function MonthlyHonorCreateForm({
  form,
  agents,
  agentMap,
  errors,
  isSaving,
  onUpdate,
  onAddAgent,
  onRemoveAgent,
  onMoveAgent,
  onSetAgentFile,
  onSubmit,
  onCancel,
  isEditing,
}: MonthlyHonorCreateFormProps) {
  const selectedIdSet = new Set(form.agents.map((item) => item.agentId));
  const term = form.agentSearch.trim().toLowerCase();
  const availableAgents = agents.filter((agent) => {
    if (selectedIdSet.has(agent.id)) return false;
    if (!term) return true;
    return (
      agent.name.toLowerCase().includes(term) ||
      (agent.code ?? "").toLowerCase().includes(term)
    );
  });

  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: String(index + 1),
    label: `Tháng ${String(index + 1).padStart(2, "0")}`,
  }));

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              className="text-xl font-black"
              style={{ color: colors.primary.navy.DEFAULT }}
            >
              {isEditing ? "Chỉnh sửa list vinh danh tháng" : "Tạo list vinh danh tháng"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Chọn tháng/năm, thêm agent và upload ảnh vinh danh riêng cho từng agent.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            isIconOnly
            size="sm"
            onClick={onCancel}
            disabled={isSaving}
          >
            <X size={20} className="text-gray-500" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[12rem_12rem_1fr]">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tháng <span style={{ color: colors.primary.DEFAULT }}>*</span>
            </label>
            <SelectField
              value={form.month}
              onChange={(value) => onUpdate("month", value)}
              options={monthOptions}
              placeholder="Chọn tháng"
            />
            {errors.month && (
              <p className="mt-1 text-xs text-red-500">{errors.month}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Năm <span style={{ color: colors.primary.DEFAULT }}>*</span>
            </label>
            <input
              value={form.year}
              onChange={(event) => onUpdate("year", event.target.value)}
              inputMode="numeric"
              placeholder="2026"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
            />
            {errors.year && (
              <p className="mt-1 text-xs text-red-500">{errors.year}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tên list
            </label>
            <input
              value={form.title}
              onChange={(event) => onUpdate("title", event.target.value)}
              placeholder="Ví dụ: Vinh danh tháng 07/2026"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900">Danh sách agent</h2>
            <p className="text-sm text-gray-500">
              Tìm và thêm agent vào list vinh danh tháng.
            </p>
          </div>

          <div className="relative mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={form.agentSearch}
              onChange={(event) => onUpdate("agentSearch", event.target.value)}
              placeholder="Tìm theo tên hoặc mã agent..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-gray-400"
            />
          </div>

          <div className="max-h-[34rem] space-y-2 overflow-auto pr-1">
            {availableAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50/40 p-3"
              >
                <AgentInline agent={agent} />
                <button
                  type="button"
                  onClick={() => onAddAgent(agent.id)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  <Plus size={14} /> Thêm
                </button>
              </div>
            ))}

            {availableAgents.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
                Không còn agent phù hợp để thêm.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="font-bold text-gray-900">Agent được vinh danh</h2>
            <p className="text-sm text-gray-500">
              Mỗi agent cần một ảnh vinh danh tháng.
            </p>
            {errors.agents && (
              <p className="mt-1 text-xs text-red-500">{errors.agents}</p>
            )}
          </div>

          <div className="grid max-h-[42rem] grid-cols-1 gap-3 overflow-auto pr-1 md:grid-cols-2">
            {form.agents.map((item, index) => {
              const agent = agentMap.get(item.agentId);
              if (!agent) return null;

              return (
                <div
                  key={item.agentId}
                  className="rounded-xl border border-gray-100 bg-gray-50/40 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-500 shadow-sm">
                        {index + 1}
                      </span>
                      <AgentInline agent={agent} />
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => onMoveAgent(item.agentId, -1)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={index === form.agents.length - 1}
                        onClick={() => onMoveAgent(item.agentId, 1)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveAgent(item.agentId)}
                        className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                        aria-label={`Xóa ${agent.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    {item.image ? (
                      <label className="group relative mx-auto mb-3 block aspect-square w-40 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-gray-100 sm:w-44">
                        <img
                          src={item.image}
                          alt={`Ảnh vinh danh ${agent.name}`}
                          className="h-full w-full object-cover object-top"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-black/55 px-2 py-1.5 text-center text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                          Đổi ảnh
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) onSetAgentFile(item.agentId, file);
                          }}
                        />
                      </label>
                    ) : null}

                    <label className={`mx-auto ${item.image ? "hidden" : "flex"} aspect-square w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white transition-colors hover:bg-gray-50 sm:w-44`}>
                      <Upload size={20} className="text-gray-400" />
                      <span className="px-2 text-center text-xs text-gray-500">
                        Chọn ảnh vinh danh tháng
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) onSetAgentFile(item.agentId, file);
                        }}
                      />
                    </label>
                    {errors[`image-${item.agentId}`] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors[`image-${item.agentId}`]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {form.agents.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
                Chưa có agent nào trong list vinh danh tháng.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-white"
          onClick={onCancel}
          disabled={isSaving}
        >
          Hủy
        </Button>
        <Button type="submit" variant="primary" size="sm" disabled={isSaving}>
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
          {isSaving
            ? isEditing
              ? "Đang lưu..."
              : "Đang tạo..."
            : isEditing
              ? "Lưu thay đổi"
              : "Tạo list vinh danh"}
        </Button>
      </div>
    </form>
  );
}

function AnnualHonorsEditor({
  categories,
  selectedSlug,
  selectedCategory,
  selectedIds,
  selectedAgents,
  filteredAgents,
  agentSearch,
  canUpdate,
  onCategoryChange,
  onAgentSearchChange,
  onAddAgent,
  onRemoveAgent,
  onMoveAgent,
}: AnnualHonorsEditorProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="hidden">
        <div className="mb-3 flex items-center gap-2">
          <Trophy size={18} style={{ color: colors.primary.DEFAULT }} />
          <h2 className="font-bold text-gray-900">Mục vinh danh</h2>
        </div>

        <SelectField
          value={selectedSlug}
          onChange={onCategoryChange}
          options={categories.map((category) => ({
            value: category.slug,
            label: category.name,
          }))}
          placeholder="Chọn mục"
        />

        {selectedCategory && (
          <p className="mt-3 text-sm text-gray-500">
            Đang có{" "}
            <span className="font-semibold text-gray-800">
              {selectedIds.length}
            </span>{" "}
            agent trong mục này.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-bold text-gray-900">Danh sách agent</h2>
          <p className="text-sm text-gray-500">
            Bấm thêm để đưa agent vào mục đang chọn.
          </p>
        </div>

        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={agentSearch}
            onChange={(event) => onAgentSearchChange(event.target.value)}
            placeholder="Tìm theo tên hoặc mã agent..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-gray-400"
          />
        </div>

        <div className="max-h-[34rem] space-y-2 overflow-auto pr-1">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50/40 p-3"
            >
              <AgentInline agent={agent} />
              <button
                type="button"
                disabled={!canUpdate}
                onClick={() => onAddAgent(agent.id)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={14} /> Thêm
              </button>
            </div>
          ))}

          {filteredAgents.length === 0 && (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
              Không còn agent phù hợp để thêm.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-bold text-gray-900">Agent đã chọn</h2>
          <p className="text-sm text-gray-500">
            Thứ tự trong danh sách này sẽ được lưu theo thứ tự hiển thị.
          </p>
        </div>

        <div className="max-h-[38rem] space-y-2 overflow-auto pr-1">
          {selectedAgents.map((agent, index) => (
            <div
              key={agent.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50/40 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-500 shadow-sm">
                  {index + 1}
                </span>
                <AgentInline agent={agent} />
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  disabled={!canUpdate || index === 0}
                  onClick={() => onMoveAgent(agent.id, -1)}
                  className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={!canUpdate || index === selectedAgents.length - 1}
                  onClick={() => onMoveAgent(agent.id, 1)}
                  className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  disabled={!canUpdate}
                  onClick={() => onRemoveAgent(agent.id)}
                  className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={`Xóa ${agent.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {selectedAgents.length === 0 && (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
              Chưa có agent nào trong mục này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AgentInline({ agent }: { agent: Agent }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
        {agent.avatar ? (
          <img
            src={agent.avatar}
            alt={agent.name}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <UserRound size={18} className="text-gray-400" />
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">
          {agent.name}
        </p>
        {agent.code && (
          <p className="truncate text-xs text-gray-500">{agent.code}</p>
        )}
      </div>
    </div>
  );
}

function MonthlyHonorsList({
  items,
  loading,
  meta,
  canManage,
  deletingId,
  onEdit,
  onDelete,
  onPageChange,
}: {
  items: MonthlyHonorList[];
  loading: boolean;
  meta: PaginationMeta;
  canManage: boolean;
  deletingId: string | null;
  onEdit: (item: MonthlyHonorList) => void;
  onDelete: (item: MonthlyHonorList) => void;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="space-y-5">
      <AdminListHeader
        title="Danh sách vinh danh tháng"
        subtitle={
          meta.total > 0
            ? `Hiển thị ${items.length} / ${meta.total} list vinh danh tháng`
            : "Không có list vinh danh tháng nào"
        }
      />

      {loading && <AdminLoading />}

      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <CalendarDays size={48} className="mx-auto mb-4 text-gray-300" />
          <AdminEmptyState
            message='Chưa có list vinh danh tháng nào. Hãy bấm "Tạo list vinh danh mới" để thêm.'
            className="!p-0"
          />
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="hidden md:block">
          <AdminTable>
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="w-16 px-5 py-3.5 text-left font-semibold text-gray-600">
                  STT
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">
                  Thời gian
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">
                  Tên list
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">
                  Số agent
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-gray-600">
                  Ngày tạo
                </th>
                {canManage && (
                  <th className="w-40 px-5 py-3.5 text-right font-semibold text-gray-600">
                    Thao tác
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-medium text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <CalendarDays size={16} className="text-gray-400" />
                      Tháng {String(item.month).padStart(2, "0")}/{item.year}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900">
                      {item.title || `Vinh danh tháng ${String(item.month).padStart(2, "0")}/${item.year}`}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {item.agents.length}
                    </span>{" "}
                    agent
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {formatDate(item.createdAt)}
                  </td>
                  {canManage && (
                    <td className="px-5 py-4">
                      <MonthlyHonorActionsEditable
                        isDeleting={deletingId === item.id}
                        onEdit={() => onEdit(item)}
                        onDelete={() => onDelete(item)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </AdminTable>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="space-y-3 md:hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                  <CalendarDays size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 font-bold text-gray-900">
                    {item.title || `Vinh danh tháng ${String(item.month).padStart(2, "0")}/${item.year}`}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gray-700">
                    Tháng {String(item.month).padStart(2, "0")}/{item.year}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.agents.length} agent · Tạo ngày{" "}
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>

              {canManage && (
                <div className="mt-3 flex items-center justify-end gap-1 border-t border-gray-100 pt-2">
                  <MonthlyHonorActionsEditable
                    isDeleting={deletingId === item.id}
                    onEdit={() => onEdit(item)}
                    onDelete={() => onDelete(item)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

function MonthlyHonorActionsEditable({
  isDeleting,
  onEdit,
  onDelete,
}: {
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        isIconOnly
        size="md"
        title="Chỉnh sửa"
        onClick={onEdit}
      >
        <Pencil size={15} className="text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        isIconOnly
        size="md"
        title="Xóa"
        className="hover:!bg-red-50"
        disabled={isDeleting}
        onClick={onDelete}
      >
        {isDeleting ? (
          <Loader2 size={15} className="animate-spin text-red-500" />
        ) : (
          <Trash2 size={15} className="text-red-500" />
        )}
      </Button>
    </div>
  );
}
