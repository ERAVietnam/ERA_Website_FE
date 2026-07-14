import { Plus, Search, Trash2, Trophy } from "lucide-react";
import { SelectField } from "@/components/ui/admin/SelectField";
import { colors } from "@/lib/theme";
import type { Agent, HonorCategory } from "@/types/api";
import { AgentInline } from "./AgentInline";

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

export function AnnualHonorsEditor({
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
