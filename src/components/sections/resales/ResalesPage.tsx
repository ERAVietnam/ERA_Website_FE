import { ResalesHeader } from "./ResalesHeader";
// import { ResalesHeroSection } from "./ResalesHeroSection";
import { ResalesWorkshopIntroSection } from "./ResalesWorkshopIntroSection";
import { ResalesChoiceSection } from "./ResalesChoiceSection";
import { ResalesPainSection } from "./ResalesPainSection";
import { ResalesCompareSection } from "./ResalesCompareSection";
import { ResalesInterludeSection } from "./ResalesInterludeSection";
import { ResalesGallerySection } from "./ResalesGallerySection";
import { ResalesStatsSection } from "./ResalesStatsSection";
import { ResalesFaqSection } from "./ResalesFaqSection";
import { ResalesCtaSection } from "./ResalesCtaSection";
import { ResalesQuoteSection } from "./ResalesQuoteSection";

export function ResalesPage() {
  return (
    <main>
      <ResalesHeader />
      {/* Tạm ẩn section có form "ĐẶT LỊCH THAM DỰ" để có thể bật lại khi cần. */}
      {/* <ResalesHeroSection /> */}
      <ResalesWorkshopIntroSection />
      <ResalesChoiceSection />
      <ResalesPainSection />
      <ResalesCompareSection />
      <ResalesInterludeSection />
      <ResalesGallerySection />
      <ResalesStatsSection />
      <ResalesFaqSection />
      <ResalesCtaSection />
      <ResalesQuoteSection />
    </main>
  );
}
