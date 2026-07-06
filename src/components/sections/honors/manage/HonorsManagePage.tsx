"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Search, Trash2, Trophy, UserRound } from "lucide-react";
import { agentsApi } from "@/api/domains/agents";
import { honorsApi } from "@/api/domains/honors";
import { Button } from "@/components/ui/Button";
import { PopupNotification } from "@/components/ui/PopupNotification";
import { Section } from "@/components/ui/Section";
import { NetworkErrorPopup } from "@/components/ui/NetworkErrorPopup";
import { SelectField } from "@/components/ui/admin/SelectField";
import { AdminListHeader } from "@/components/ui/admin/AdminListHeader";
import { AdminLoading } from "@/components/ui/admin/AdminLoading";
import { useAuth } from "@/contexts/AuthContext";
import { usePermissionWarning } from "@/hooks/usePermissionWarning";
import { extractApiError } from "@/lib/api-errors";
import { colors } from "@/lib/theme";
import type { Agent, HonorCategory } from "@/types/api";

export default function HonorsManagePage() {
  const { hasPermission } = useAuth();
  const { warning, guard, closeWarning } = usePermissionWarning();
  const [categories, setCategories] = useState<HonorCategory[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [agentSearch, setAgentSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [popup, setPopup] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });
  const [showNetworkError, setShowNetworkError] = useState(false);

  const canUpdate = hasPermission("honors.all.update");
  const selectedCategory = categories.find((category) => category.slug === selectedSlug) ?? null;
  const initialSelectedIds = useMemo(
    () => selectedCategory?.agents.map((agent) => agent.id) ?? [],
    [selectedCategory],
  );
  const isDirty = JSON.stringify(selectedIds) !== JSON.stringify(initialSelectedIds);

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const agentMap = useMemo(() => new Map(agents.map((agent) => [agent.id, agent])), [agents]);
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
      setSelectedSlug((prev) => prev || firstSlug);
      const activeCategory = categoryData.find((category) => category.slug === (selectedSlug || firstSlug));
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

  useEffect(() => {
    queueMicrotask(() => loadData());
  }, []);

  const handleCategoryChange = (slug: string) => {
    const category = categories.find((item) => item.slug === slug);
    setSelectedSlug(slug);
    setSelectedIds(category?.agents.map((agent) => agent.id) ?? []);
    setAgentSearch("");
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
      const updated = await honorsApi.updateCategoryAgents(selectedSlug, selectedIds);
      setCategories((prev) =>
        prev.map((category) => (category.slug === updated.slug ? updated : category)),
      );
      setSelectedIds(updated.agents.map((agent) => agent.id));
      setPopup({ show: true, type: "success", message: "Cập nhật danh sách thành công!" });
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

  return (
    <Section padding="md" bg="gray">
      <div className="space-y-6">
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

        <AdminListHeader
          title="Vinh danh và Hệ thống"
          subtitle="Chọn một mục, sau đó thêm danh sách agent vào mục đó."
        >
          {canUpdate && (
            <Button
              variant="primary"
              size="sm"
              className="gap-2"
              disabled={!isDirty || saving || !selectedSlug}
              onClick={() =>
                guard("honors.all.update", handleSave, "Bạn không có quyền cập nhật Vinh danh và Hệ thống.")
              }
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              {saving ? "Đang lưu..." : "Lưu danh sách"}
            </Button>
          )}
        </AdminListHeader>

        {loading ? (
          <AdminLoading />
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[22rem_1fr_1fr]">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Trophy size={18} style={{ color: colors.primary.DEFAULT }} />
                <h2 className="font-bold text-gray-900">Mục vinh danh</h2>
              </div>
              <SelectField
                value={selectedSlug}
                onChange={handleCategoryChange}
                options={categories.map((category) => ({
                  value: category.slug,
                  label: category.name,
                }))}
                placeholder="Chọn mục"
              />
              {selectedCategory && (
                <p className="mt-3 text-sm text-gray-500">
                  Đang có <span className="font-semibold text-gray-800">{selectedIds.length}</span> agent trong mục này.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <h2 className="font-bold text-gray-900">Danh sách agent</h2>
                <p className="text-sm text-gray-500">Bấm thêm để đưa agent vào mục đang chọn.</p>
              </div>

              <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={agentSearch}
                  onChange={(event) => setAgentSearch(event.target.value)}
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
                      onClick={() => addAgent(agent.id)}
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
                <p className="text-sm text-gray-500">Thứ tự trong danh sách này sẽ được lưu theo thứ tự hiển thị.</p>
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
                        onClick={() => moveAgent(agent.id, -1)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={!canUpdate || index === selectedAgents.length - 1}
                        onClick={() => moveAgent(agent.id, 1)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        disabled={!canUpdate}
                        onClick={() => removeAgent(agent.id)}
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
        )}
      </div>
    </Section>
  );
}

function AgentInline({ agent }: { agent: Agent }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
        {agent.avatar ? (
          <img src={agent.avatar} alt={agent.name} className="h-full w-full object-cover object-top" />
        ) : (
          <UserRound size={18} className="text-gray-400" />
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">{agent.name}</p>
        {agent.code && <p className="truncate text-xs text-gray-500">{agent.code}</p>}
      </div>
    </div>
  );
}
