"use client";

import { theme } from "./theme";

import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { LocationSection } from "./sections/LocationSection";
import { ProductSection } from "./sections/ProductSection";
import { AmenitySection } from "./sections/AmenitySection";
import { FaqSection } from "./sections/FaqSection";
import { FooterSection } from "./sections/FooterSection";
import { FloatingButtons } from "./sections/FloatingButtons";
import { LeadBandSection } from "./sections/LeadBandSection";

const sfPro =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export function PhuGiaBaoLocLanding() {
  return (
    <main
      className="relative min-h-screen"
      style={{ fontFamily: sfPro, backgroundColor: theme.cream, color: theme.text }}
    >
      <HeroSection />
      <OverviewSection />
      <LocationSection />
      <ProductSection />
      <AmenitySection />
      <FaqSection />
      <FooterSection />
      <LeadBandSection />
      <FloatingButtons />
    </main>
  );
}
