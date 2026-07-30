import { FaqAccordion } from "@/components/shared/FaqAccordion";
import type { ProjectFaqInput } from "@/types/api";

interface ProjectsFaqSectionProps {
  items: ProjectFaqInput[];
}

export function ProjectsFaqSection({ items }: ProjectsFaqSectionProps) {
  return (
    <FaqAccordion
      items={items}
      headingStyle={{ fontWeight: 800, fontSize: "18px" }}
      questionClassName="text-sm font-semibold"
      answerClassName="ck-content faq-answer-content px-5 pb-4 text-sm leading-7"
    />
  );
}
