"use client";

import { useState } from "react";
import { BookOpen, Briefcase, Lightbulb, Plus, Target, Users, X, ChevronDown } from "lucide-react";
import { SelectField } from "@/components/ui/admin/SelectField";
import type { RequiredSkillCategory, RequiredSkillGroup } from "@/types/api";

const categoryOptions: { value: RequiredSkillCategory; label: string }[] = [
  { value: "Kiến thức ngành", label: "Kiến thức ngành" },
  { value: "Kỹ năng mềm", label: "Kỹ năng mềm" },
  { value: "Yêu cầu khác", label: "Yêu cầu khác" },
];

const iconOptions = [
  { value: "book-open", label: "Sách / Kiến thức" },
  { value: "users", label: "Con người / Kỹ năng" },
  { value: "briefcase", label: "Công việc" },
  { value: "target", label: "Mục tiêu" },
  { value: "lightbulb", label: "Ý tưởng" },
];

const iconComponents = { "book-open": BookOpen, users: Users, briefcase: Briefcase, target: Target, lightbulb: Lightbulb };

function IconSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = iconOptions.find((option) => option.value === value) ?? iconOptions[0];
  const SelectedIcon = iconComponents[selected.value as keyof typeof iconComponents];

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((current) => !current)} className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-left text-sm text-gray-800">
        <span className="flex items-center gap-2 truncate"><SelectedIcon size={16} className="shrink-0 text-gray-500" />{selected.label}</span>
        <ChevronDown size={16} className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
          {iconOptions.map((option) => {
            const OptionIcon = iconComponents[option.value as keyof typeof iconComponents];
            return <button key={option.value} type="button" onClick={() => { onChange(option.value); setOpen(false); }} className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-50 ${value === option.value ? "bg-gray-50 font-medium text-gray-900" : "text-gray-700"}`}><OptionIcon size={16} className="shrink-0 text-gray-500" />{option.label}</button>;
          })}
        </div>
      )}
    </div>
  );
}

function splitTags(value: string) {
  return value.split(",").map((tag) => tag.trim()).filter(Boolean);
}

export function RequiredSkillsEditor({ value, onChange }: {
  value: RequiredSkillGroup[];
  onChange: (value: RequiredSkillGroup[]) => void;
}) {
  const [draftTags, setDraftTags] = useState<string[]>([]);
  const updateGroup = (index: number, patch: Partial<RequiredSkillGroup>) => {
    onChange(value.map((group, current) => current === index ? { ...group, ...patch } : group));
  };
  const addGroup = () => {
    if (value.length >= 3) return;
    onChange([...value, { category: "Kiến thức ngành", icon: "book-open", tags: [] }]);
    setDraftTags([...draftTags, ""]);
  };
  const removeGroup = (index: number) => {
    onChange(value.filter((_, current) => current !== index));
    setDraftTags((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };
  const commitTags = (index: number) => {
    const tags = splitTags(draftTags[index] ?? "");
    if (!tags.length) return;
    updateGroup(index, { tags: [...value[index].tags, ...tags].slice(0, 20) });
    setDraftTags((current) => current.map((draft, currentIndex) => currentIndex === index ? "" : draft));
  };

  return (
    <div id="field-requiredSkills" className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
      <label className="block text-sm font-semibold text-gray-700">Kỹ năng cần thiết</label>
      <p className="mt-1 text-xs text-gray-500">Không bắt buộc. Thêm tối đa 3 nhóm.</p>
      <div className="mt-3 space-y-3">
        {value.map((group, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Nhóm kỹ năng</label>
                <SelectField value={group.category} onChange={(category) => updateGroup(index, { category: category as RequiredSkillCategory })} options={categoryOptions} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Icon</label>
                <IconSelect value={group.icon} onChange={(icon) => updateGroup(index, { icon })} />
              </div>
              <button type="button" onClick={() => removeGroup(index)} className="inline-flex h-10 items-center justify-center rounded-lg border border-red-200 px-3 text-red-500 hover:bg-red-50" aria-label="Xóa nhóm kỹ năng"><X size={16} /></button>
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-gray-600">Các tag</label>
              <div className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-white p-2">
                {group.tags.map((tag, tagIndex) => <span key={`${tag}-${tagIndex}`} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">{tag}<button type="button" onClick={() => updateGroup(index, { tags: group.tags.filter((_, currentIndex) => currentIndex !== tagIndex) })} className="text-gray-400 hover:text-red-500" aria-label={`Xóa ${tag}`}><X size={12} /></button></span>)}
                <input className="min-w-[180px] flex-1 border-0 bg-transparent px-1 py-1 text-sm outline-none" value={draftTags[index] ?? ""} onChange={(event) => setDraftTags((current) => { const next = [...current]; next[index] = event.target.value; return next; })} onKeyDown={(event) => { if (event.key === "Enter" || event.key === ",") { event.preventDefault(); commitTags(index); } }} onBlur={() => commitTags(index)} placeholder="Nhập tag rồi Enter" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {value.length < 3 && <button type="button" onClick={addGroup} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-600 hover:border-gray-500 hover:text-gray-800"><Plus size={16} /> Thêm nhóm kỹ năng</button>}
    </div>
  );
}
