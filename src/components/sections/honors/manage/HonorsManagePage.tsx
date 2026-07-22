"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { agentsApi } from "@/api/domains/agents";
import { annualHonorsApi } from "@/api/domains/annual-honors";
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
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { extractApiError } from "@/lib/api-errors";
import { compressImage } from "@/lib/imageCompression";
import { colors } from "@/lib/theme";
import type {
  Agent,
  AnnualHonorFilters,
  AnnualHonorList,
  CreateAnnualHonorInput,
  CreateMonthlyHonorInput,
  HonorCategory,
  MonthlyHonorFilters,
  MonthlyHonorList,
  PaginationMeta,
  UpdateAnnualHonorInput,
  UpdateMonthlyHonorInput,
} from "@/types/api";
import { AnnualHonorsEditor } from "./AnnualHonorsEditor";
import { AnnualHonorsList } from "./AnnualHonorsList";
import { MonthlyHonorCreateForm } from "./MonthlyHonorCreateForm";
import { MonthlyHonorsList } from "./MonthlyHonorsList";
import {
  DEFAULT_LIMIT,
  annualHonorToFormState,
  createEmptyMonthlyHonorForm,
  createEmptyAnnualHonorForm,
  monthlyHonorToFormState,
  type AnnualHonorFormState,
  type HonorsViewMode,
  type MonthlyHonorFormState,
} from "./types";

const SYSTEM_DIVISION_SLUG = "he-thong-divisions-tai-era-vietnam";

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
  const [annualLoading, setAnnualLoading] = useState(false);
  const [annualItems, setAnnualItems] = useState<AnnualHonorList[]>([]);
  const [annualEditing, setAnnualEditing] = useState<AnnualHonorList | null>(null);
  const [showAnnualForm, setShowAnnualForm] = useState(false);
  const [annualForm, setAnnualForm] = useState<AnnualHonorFormState>(() =>
    createEmptyAnnualHonorForm(),
  );
  const [annualDraftCategoryAgentIds, setAnnualDraftCategoryAgentIds] =
    useState<Record<string, string[]>>({});
  const [annualSaving, setAnnualSaving] = useState(false);
  const [annualDeletingId, setAnnualDeletingId] = useState<string | null>(null);
  const [annualFieldErrors, setAnnualFieldErrors] = useState<Record<string, string>>({});
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
  const [annualFilters, setAnnualFilters] = useState<AnnualHonorFilters>({
    page: 1,
    limit: DEFAULT_LIMIT,
  });
  const [annualMeta, setAnnualMeta] = useState<PaginationMeta>({
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
  const annualCategories = useMemo(
    () => categories.filter((category) => category.slug !== SYSTEM_DIVISION_SLUG),
    [categories],
  );
  const systemCategory =
    categories.find((category) => category.slug === SYSTEM_DIVISION_SLUG) ?? null;
  const selectedCategory =
    viewMode === "annual" && annualEditing
      ? annualEditing.categories.find((category) => category.slug === selectedSlug) ??
        annualCategories.find((category) => category.slug === selectedSlug) ??
        null
      : viewMode === "annual" && showAnnualForm
        ? annualCategories.find((category) => category.slug === selectedSlug) ?? null
      : viewMode === "system"
        ? systemCategory
        : null;
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

      const firstSlug =
        categoryData.find((category) => category.slug !== SYSTEM_DIVISION_SLUG)
          ?.slug ?? "";
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

  const loadAnnualHonors = useCallback(async () => {
    setAnnualLoading(true);
    try {
      const response = await annualHonorsApi.getLists(annualFilters);
      setAnnualItems(response.items);
      setAnnualMeta(response.meta);
    } catch (err) {
      setAnnualItems([]);
      setAnnualMeta({
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
      setAnnualLoading(false);
    }
  }, [annualFilters]);

  useEffect(() => {
    queueMicrotask(() => loadData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (viewMode === "monthly") {
      queueMicrotask(() => loadMonthlyHonors());
    }
    if (viewMode === "annual" && !annualEditing && !showAnnualForm) {
      queueMicrotask(() => loadAnnualHonors());
    }
  }, [viewMode, loadMonthlyHonors, loadAnnualHonors, annualEditing, showAnnualForm]);

  const handleCategoryChange = (slug: string) => {
    const category =
      viewMode === "annual" && annualEditing
        ? annualEditing.categories.find((item) => item.slug === slug)
        : viewMode === "annual" && showAnnualForm
          ? null
          : categories.find((item) => item.slug === slug);
    setSelectedSlug(slug);
    setSelectedIds(
      viewMode === "annual" && showAnnualForm
        ? annualDraftCategoryAgentIds[slug] ?? []
        : category?.agents.map((agent) => agent.id) ?? [],
    );
    setAgentSearch("");
  };

  const handleHonorScopeChange = (value: string) => {
    setShowMonthlyForm(false);
    setShowAnnualForm(false);
    setAnnualEditing(null);
    setAgentSearch("");
    if (value === "__monthly__") {
      setViewMode("monthly");
      return;
    }
    if (value === "__annual__") {
      setViewMode("annual");
      const firstSlug = annualCategories[0]?.slug ?? "";
      setSelectedSlug(firstSlug);
      setSelectedIds([]);
      return;
    }
    if (value === "__system__") {
      setViewMode("system");
      setSelectedSlug(SYSTEM_DIVISION_SLUG);
      setSelectedIds(systemCategory?.agents.map((agent) => agent.id) ?? []);
      return;
    }

    setViewMode("system");
    handleCategoryChange(value);
  };

  const addAgent = (agentId: string) => {
    if (selectedIdSet.has(agentId)) return;
    setSelectedIds((prev) => {
      const next = [...prev, agentId];
      if (viewMode === "annual" && showAnnualForm && selectedSlug) {
        setAnnualDraftCategoryAgentIds((draft) => ({
          ...draft,
          [selectedSlug]: next,
        }));
      }
      return next;
    });
  };

  const removeAgent = (agentId: string) => {
    setSelectedIds((prev) => {
      const next = prev.filter((id) => id !== agentId);
      if (viewMode === "annual" && showAnnualForm && selectedSlug) {
        setAnnualDraftCategoryAgentIds((draft) => ({
          ...draft,
          [selectedSlug]: next,
        }));
      }
      return next;
    });
  };

  const moveAgent = (agentId: string, direction: -1 | 1) => {
    setSelectedIds((prev) => {
      const index = prev.indexOf(agentId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      if (viewMode === "annual" && showAnnualForm && selectedSlug) {
        setAnnualDraftCategoryAgentIds((draft) => ({
          ...draft,
          [selectedSlug]: next,
        }));
      }
      return next;
    });
  };

  const handleSave = async () => {
    if (!selectedSlug) return;
    setSaving(true);
    try {
      if (viewMode === "annual" && annualEditing) {
        const updated = await annualHonorsApi.updateCategoryAgents(
          annualEditing.id,
          selectedSlug,
          selectedIds,
        );
        setAnnualEditing(updated);
        const updatedCategory = updated.categories.find(
          (category) => category.slug === selectedSlug,
        );
        setSelectedIds(updatedCategory?.agents.map((agent) => agent.id) ?? []);
      } else {
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
      }
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

  const openAnnualCreate = () => {
    const firstSlug = annualCategories[0]?.slug ?? "";
    setAnnualEditing(null);
    setAnnualForm(createEmptyAnnualHonorForm());
    setAnnualDraftCategoryAgentIds({});
    setSelectedSlug(firstSlug);
    setSelectedIds([]);
    setAgentSearch("");
    setAnnualFieldErrors({});
    setShowAnnualForm(true);
  };

  const openAnnualEdit = (item: AnnualHonorList) => {
    setAnnualEditing(item);
    setAnnualForm(annualHonorToFormState(item));
    setShowAnnualForm(false);
    const firstSlug = annualCategories[0]?.slug ?? "";
    setSelectedSlug(firstSlug);
    const category = item.categories.find((entry) => entry.slug === firstSlug);
    setSelectedIds(category?.agents.map((agent) => agent.id) ?? []);
    setAgentSearch("");
  };

  const closeAnnualForm = () => {
    setShowAnnualForm(false);
    setAnnualEditing(null);
    setAnnualForm(createEmptyAnnualHonorForm());
    setAnnualDraftCategoryAgentIds({});
    setSelectedIds([]);
    setAgentSearch("");
    setAnnualFieldErrors({});
  };

  const closeAnnualEditor = () => {
    setAnnualEditing(null);
    setSelectedIds([]);
    setAgentSearch("");
    loadAnnualHonors().catch(() => {});
  };

  const updateAnnualForm = <K extends keyof AnnualHonorFormState>(
    key: K,
    value: AnnualHonorFormState[K],
  ) => {
    setAnnualForm((prev) => ({ ...prev, [key]: value }));
    setAnnualFieldErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateAnnualForm = () => {
    const errors: Record<string, string> = {};
    const year = Number(annualForm.year);

    if (!Number.isInteger(year) || year < 1900 || year > 9999) {
      errors.year = "Vui lòng nhập năm hợp lệ.";
    }

    if (
      Number.isInteger(year) &&
      annualItems.some(
        (item) => item.year === year && item.id !== annualEditing?.id,
      )
    ) {
      errors.year = "Năm vinh danh thường niên này đã tồn tại.";
    }

    if (annualForm.title.trim().length > 255) {
      errors.title = "Tên list tối đa 255 ký tự.";
    }

    return errors;
  };

  const handleSaveAnnualHonor = async (event: React.FormEvent) => {
    event.preventDefault();
    setPopup((prev) => ({ ...prev, show: false }));

    const errors = validateAnnualForm();
    setAnnualFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setAnnualSaving(true);
    try {
      const payload: CreateAnnualHonorInput | UpdateAnnualHonorInput = {
        year: Number(annualForm.year),
        title: annualForm.title.trim() || null,
      };

      if (annualEditing) {
        const updated = await annualHonorsApi.updateList(annualEditing.id, payload);
        setAnnualEditing(updated);
      } else {
        const created = await annualHonorsApi.createList(
          payload as CreateAnnualHonorInput,
        );
        const draftEntries = Object.entries(annualDraftCategoryAgentIds).filter(
          ([, agentIds]) => agentIds.length > 0,
        );
        if (draftEntries.length > 0) {
          await Promise.all(
            draftEntries.map(([slug, agentIds]) =>
              annualHonorsApi.updateCategoryAgents(created.id, slug, agentIds),
            ),
          );
        }
      }

      setPopup({
        show: true,
        type: "success",
        message: annualEditing
          ? "Cập nhật list vinh danh thường niên thành công!"
          : "Tạo list vinh danh thường niên thành công!",
      });
      closeAnnualForm();
      setAnnualFilters((prev) => ({ ...prev, page: 1 }));
      loadAnnualHonors().catch(() => {});
    } catch (err) {
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setAnnualSaving(false);
    }
  };

  const handleSaveAnnualMetadata = async () => {
    if (!annualEditing) return;

    const errors = validateAnnualForm();
    setAnnualFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setAnnualSaving(true);
    try {
      const updated = await annualHonorsApi.updateList(annualEditing.id, {
        year: Number(annualForm.year),
        title: annualForm.title.trim() || null,
      });
      setAnnualEditing(updated);
      setPopup({
        show: true,
        type: "success",
        message: "Cập nhật thông tin list vinh danh thường niên thành công!",
      });
    } catch (err) {
      const { message, isNetworkError } = extractApiError(err);
      if (isNetworkError) {
        setShowNetworkError(true);
      } else {
        setPopup({ show: true, type: "error", message });
      }
    } finally {
      setAnnualSaving(false);
    }
  };

  const handleDeleteAnnualHonor = (item: AnnualHonorList) => {
    guard(
      "honors.all.delete",
      () => {
        const label = item.title || `ERA Awards ${item.year}`;
        setConfirm({
          show: true,
          title: "Xác nhận xóa",
          message: `Bạn có chắc muốn xóa "${label}"? Hành động này sẽ xóa toàn bộ danh sách agent trong năm này.`,
          variant: "danger",
          confirmLabel: "Xóa",
          onConfirm: async () => {
            setConfirm((prev) => ({ ...prev, show: false }));
            setAnnualDeletingId(item.id);
            try {
              await annualHonorsApi.deleteList(item.id);
              setPopup({
                show: true,
                type: "success",
                message: "Đã xóa list vinh danh thường niên.",
              });
              loadAnnualHonors().catch(() => {});
            } catch (error) {
              const apiError = extractApiError(error);
              setPopup({
                show: true,
                type: "error",
                message:
                  apiError.message || "Không thể xóa list vinh danh thường niên.",
              });
            } finally {
              setAnnualDeletingId(null);
            }
          },
        });
      },
      "Bạn không có quyền xóa list vinh danh thường niên.",
    );
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
              : viewMode === "annual"
                ? "Quản lý danh sách agent được vinh danh thường niên theo từng năm."
                : "Quản lý danh sách agent trong Hệ thống Division."
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            {viewMode === "annual" && !annualEditing && !showAnnualForm && canCreate && (
              <Button
                variant="primary"
                size="sm"
                className="gap-2"
                onClick={() =>
                  guard(
                    "honors.all.create",
                    openAnnualCreate,
                    "Bạn không có quyền tạo list vinh danh thường niên.",
                  )
                }
              >
                <Plus size={16} /> Tạo list năm mới
              </Button>
            )}

            {viewMode === "annual" && annualEditing && (
              <Button variant="outline" size="sm" onClick={closeAnnualEditor}>
                Quay lại danh sách năm
              </Button>
            )}

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

            {(viewMode === "system" || (viewMode === "annual" && annualEditing)) && canUpdate && (
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
            value={
              viewMode === "monthly"
                ? "__monthly__"
                : viewMode === "annual"
                  ? "__annual__"
                  : "__system__"
            }
            onChange={handleHonorScopeChange}
            placeholder="Chọn mục"
            options={[
              { value: "__system__", label: "Hệ thống Division" },
              { value: "__annual__", label: "Vinh danh thường niên" },
              { value: "__monthly__", label: "Vinh danh tháng" },
            ]}
          />
        </div>

        {viewMode === "annual" && showAnnualForm ? (
          <form
            onSubmit={handleSaveAnnualHonor}
            className="space-y-6"
          >
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2
                    className="text-xl font-black"
                    style={{ color: colors.primary.navy.DEFAULT }}
                  >
                    {annualEditing
                      ? "Chỉnh sửa list vinh danh thường niên"
                      : "Tạo list vinh danh thường niên"}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Chọn năm, đặt tên list, chọn hạng mục và thêm agent vào từng hạng mục.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  isIconOnly
                  size="sm"
                  onClick={closeAnnualForm}
                  disabled={annualSaving}
                >
                  <X size={20} className="text-gray-500" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[12rem_1fr_20rem]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Năm <span style={{ color: colors.primary.DEFAULT }}>*</span>
                  </label>
                  <input
                    value={annualForm.year}
                    onChange={(event) => updateAnnualForm("year", event.target.value)}
                    inputMode="numeric"
                    placeholder="2026"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
                  />
                  {annualFieldErrors.year && (
                    <p className="mt-1 text-xs text-red-500">{annualFieldErrors.year}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tên list
                  </label>
                  <input
                    value={annualForm.title}
                    onChange={(event) => updateAnnualForm("title", event.target.value)}
                    placeholder="Ví dụ: ERA Awards 2026"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
                  />
                  {annualFieldErrors.title && (
                    <p className="mt-1 text-xs text-red-500">{annualFieldErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mục vinh danh trong năm
                  </label>
                  <SelectField
                    value={selectedSlug}
                    onChange={handleCategoryChange}
                    options={annualCategories.map((category) => ({
                      value: category.slug,
                      label: category.name,
                    }))}
                    placeholder="Chọn mục"
                  />
                </div>
              </div>
            </div>

            <AnnualHonorsEditor
              categories={annualCategories}
              selectedSlug={selectedSlug}
              selectedCategory={selectedCategory}
              selectedIds={selectedIds}
              selectedAgents={selectedAgents}
              filteredAgents={filteredAgents}
              agentSearch={agentSearch}
              canUpdate={canCreate}
              onCategoryChange={handleCategoryChange}
              onAgentSearchChange={setAgentSearch}
              onAddAgent={addAgent}
              onRemoveAgent={removeAgent}
              onMoveAgent={moveAgent}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={closeAnnualForm} disabled={annualSaving}>
                Hủy
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={annualSaving}>
                {annualSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Đang lưu...
                  </>
                ) : annualEditing ? (
                  "Lưu thay đổi"
                ) : (
                  "Tạo list"
                )}
              </Button>
            </div>
          </form>
        ) : viewMode === "annual" && annualEditing ? (
          <div className="space-y-5">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">List đang chỉnh sửa</p>
                  <h2
                    className="text-xl font-black"
                    style={{ color: colors.primary.navy.DEFAULT }}
                  >
                    {annualEditing.title || `ERA Awards ${annualEditing.year}`}
                  </h2>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  isIconOnly
                  size="sm"
                  onClick={closeAnnualEditor}
                  disabled={annualSaving}
                >
                  <X size={20} className="text-gray-500" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Năm <span style={{ color: colors.primary.DEFAULT }}>*</span>
                  </label>
                  <input
                    value={annualForm.year}
                    onChange={(event) => updateAnnualForm("year", event.target.value)}
                    inputMode="numeric"
                    placeholder="2026"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
                  />
                  {annualFieldErrors.year && (
                    <p className="mt-1 text-xs text-red-500">{annualFieldErrors.year}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tên list
                  </label>
                  <input
                    value={annualForm.title}
                    onChange={(event) => updateAnnualForm("title", event.target.value)}
                    placeholder="Ví dụ: ERA Awards 2026"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
                  />
                  {annualFieldErrors.title && (
                    <p className="mt-1 text-xs text-red-500">{annualFieldErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mục vinh danh trong năm
                  </label>
                  <SelectField
                    value={selectedSlug}
                    onChange={handleCategoryChange}
                    options={annualCategories.map((category) => ({
                      value: category.slug,
                      label: category.name,
                    }))}
                    placeholder="Chọn mục"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="gap-2"
                  disabled={annualSaving}
                  onClick={handleSaveAnnualMetadata}
                >
                  {annualSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Đang lưu...
                    </>
                  ) : (
                    "Lưu thông tin list"
                  )}
                </Button>
              </div>
            </div>

            <AnnualHonorsEditor
              categories={annualCategories}
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
          </div>
        ) : (viewMode as HonorsViewMode) === "annual" ? (
          <AnnualHonorsList
            items={annualItems}
            loading={annualLoading}
            meta={annualMeta}
            canManage={canUpdate || canDelete}
            deletingId={annualDeletingId}
            onEdit={openAnnualEdit}
            onDelete={handleDeleteAnnualHonor}
            onPageChange={(page) =>
              setAnnualFilters((prev) => ({ ...prev, page }))
            }
          />
        ) : viewMode === "annual" ? (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="font-bold text-gray-900">Danh sách vinh danh thường niên</h2>
                <p className="text-sm text-gray-500">
                  {annualMeta.total > 0
                    ? `Hiển thị ${annualItems.length} / ${annualMeta.total} list năm`
                    : "Không có list vinh danh thường niên nào"}
                </p>
              </div>
            </div>

            {annualLoading ? (
              <AdminLoading />
            ) : annualItems.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">
                Chưa có list vinh danh thường niên nào.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {annualItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.title || `ERA Awards ${item.year}`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Năm {item.year} •{" "}
                        {item.categories.reduce(
                          (total, category) => total + category.agents.length,
                          0,
                        )}{" "}
                        agent
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAnnualEdit(item)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!canDelete || annualDeletingId === item.id}
                        onClick={() => handleDeleteAnnualHonor(item)}
                        className="text-red-600 hover:border-red-200 hover:bg-red-50"
                      >
                        {annualDeletingId === item.id ? "Đang xóa..." : "Xóa"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {annualMeta.totalPages > 1 && (
              <div className="border-t border-gray-100 px-5 py-4">
                <Pagination
                  currentPage={annualMeta.page}
                  totalPages={annualMeta.totalPages}
                  onPageChange={(page) =>
                    setAnnualFilters((prev) => ({ ...prev, page }))
                  }
                />
              </div>
            )}
          </div>
        ) : viewMode === "monthly" && showMonthlyForm ? (
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
            categories={systemCategory ? [systemCategory] : []}
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

