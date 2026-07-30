"use client";

import { ConsultationCard } from "@/components/shared/ConsultationCard";

interface ProjectsSidebarProps {
  hideConsultationForm?: boolean;
  sourceUrl?: string;
  sourceLabel?: string;
}

export function ProjectsSidebar({
  hideConsultationForm = false,
  sourceUrl,
  sourceLabel,
}: ProjectsSidebarProps) {
  return (
    <div className="w-full lg:w-80 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        {!hideConsultationForm && (
          <ConsultationCard sourceUrl={sourceUrl} sourceLabel={sourceLabel} />
        )}
      </div>
    </div>
  );
}
