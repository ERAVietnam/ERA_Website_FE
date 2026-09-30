import { ResalesHeader } from "./ResalesHeader";
import { ResalesHeroSection } from "./ResalesHeroSection";
import { ResalesChoiceSection } from "./ResalesChoiceSection";
import { ResalesPainSection } from "./ResalesPainSection";
import { ResalesCompareSection } from "./ResalesCompareSection";
import { ResalesGallerySection } from "./ResalesGallerySection";
import { ResalesStatsSection } from "./ResalesStatsSection";
import { ResalesFaqSection } from "./ResalesFaqSection";
import { ResalesCtaSection } from "./ResalesCtaSection";
import { ResalesQuoteSection } from "./ResalesQuoteSection";

export function ResalesPage() {
  return (
    <main>
      <ResalesHeader />
      <ResalesHeroSection />
      <ResalesChoiceSection />
      <ResalesPainSection />
      <ResalesCompareSection />
      <ResalesGallerySection />
      <ResalesStatsSection />
      <ResalesFaqSection />
      <ResalesCtaSection />
      <ResalesQuoteSection />
    </main>
  );
}
