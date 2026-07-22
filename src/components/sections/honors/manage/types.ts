import type { AnnualHonorList, MonthlyHonorList } from "@/types/api";

export type HonorsViewMode = "system" | "annual" | "monthly";

export const DEFAULT_LIMIT = 10;

export interface MonthlyHonorFormAgent {
  agentId: string;
  image: string;
  file: File | null;
}

export interface MonthlyHonorFormState {
  month: string;
  year: string;
  title: string;
  agentSearch: string;
  agents: MonthlyHonorFormAgent[];
}

export function createEmptyMonthlyHonorForm(): MonthlyHonorFormState {
  const now = new Date();
  return {
    month: String(now.getMonth() + 1),
    year: String(now.getFullYear()),
    title: "",
    agentSearch: "",
    agents: [],
  };
}

export function monthlyHonorToFormState(
  item: MonthlyHonorList,
): MonthlyHonorFormState {
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

export interface AnnualHonorFormState {
  year: string;
  title: string;
}

export function createEmptyAnnualHonorForm(): AnnualHonorFormState {
  return {
    year: String(new Date().getFullYear()),
    title: "",
  };
}

export function annualHonorToFormState(
  item: AnnualHonorList,
): AnnualHonorFormState {
  return {
    year: String(item.year),
    title: item.title ?? "",
  };
}
