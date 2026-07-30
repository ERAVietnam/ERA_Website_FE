import { FaqAccordion } from "@/components/shared/FaqAccordion";
import type { NewsFaqInput } from "@/types/api";

interface NewsFaqSectionProps {
  items: NewsFaqInput[];
}

export function NewsFaqSection({ items }: NewsFaqSectionProps) {
  return (
    <FaqAccordion
      items={items}
      headingStyle={{ fontWeight: 700, fontSize: "22px", lineHeight: 1.35 }}
      questionStyle={{ fontSize: "16px", lineHeight: 1.5 }}
      answerClassName="ck-content faq-richtext-content faq-answer-content px-5 pb-3"
      trimAnswer
    />
  );
}
