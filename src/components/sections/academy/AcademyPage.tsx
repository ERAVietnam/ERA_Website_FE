import { AcademyHeroSection } from "./AcademyHeroSection";
import { AcademyCoursesSection } from "./AcademyCoursesSection";
import { AcademyRoadmapSection } from "./AcademyRoadmapSection";
import { AcademyOnlineSection } from "./AcademyOnlineSection";
import { AcademyActivitiesSection } from "./AcademyActivitiesSection";
import { AcademyMyEraSection } from "./AcademyMyEraSection";
import { AcademyTestimonialsSection } from "./AcademyTestimonialsSection";
import { AcademyFaqSection } from "./AcademyFaqSection";

export function AcademyPage() {
  return (
    <main>
      <AcademyHeroSection />
      <AcademyCoursesSection />
      <AcademyRoadmapSection />
      <AcademyOnlineSection />
      <AcademyActivitiesSection />
      <AcademyMyEraSection />
      <AcademyTestimonialsSection />
      <AcademyFaqSection />
    </main>
  );
}
