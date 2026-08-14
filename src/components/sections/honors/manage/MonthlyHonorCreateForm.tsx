import type { FormEvent } from "react";
import { Loader2, Plus, Search, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField } from "@/components/ui/admin/SelectField";
import { colors } from "@/lib/theme";
import type { Agent } from "@/types/api";
import { AgentInline } from "./AgentInline";
import type { MonthlyHonorFormState } from "./types";

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
  onRemoveAgent: (index: number) => void;
  onMoveAgent: (index: number, direction: -1 | 1) => void;
  onSetAgentFile: (index: number, file: File) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export function MonthlyHonorCreateForm({
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
  // Agent đã chọn vẫn hiển thị lại để có thể thêm lần nữa
  // (1 agent có thể được vinh danh nhiều hạng mục trong cùng 1 tháng)
  const term = form.agentSearch.trim().toLowerCase();
  const availableAgents = agents.filter((agent) => {
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
              Tìm và thêm agent vào list vinh danh tháng. Có thể thêm cùng 1 agent nhiều lần nếu agent đó đứng đầu nhiều hạng mục.
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
                  key={index}
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
                        onClick={() => onMoveAgent(index, -1)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={index === form.agents.length - 1}
                        onClick={() => onMoveAgent(index, 1)}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-500 disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveAgent(index)}
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
                            if (file) onSetAgentFile(index, file);
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
                          if (file) onSetAgentFile(index, file);
                        }}
                      />
                    </label>
                    {errors[`image-${index}`] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors[`image-${index}`]}
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
