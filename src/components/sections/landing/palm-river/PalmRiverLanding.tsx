"use client";

import "./palm-river-fonts.css";
import "./palm-river.css";

import { SongSymbol } from "./sections/SongSymbol";
import { LightboxProvider } from "./sections/Lightbox";
import { PopupProvider } from "./sections/PopupForm";
import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { IntroSection } from "./sections/IntroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { ValuesSection } from "./sections/ValuesSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { GallerySection } from "./sections/GallerySection";
import { UnitsSection } from "./sections/UnitsSection";
import { FaqSection } from "./sections/FaqSection";
import { LeadSection } from "./sections/LeadSection";
import { FooterSection } from "./sections/FooterSection";
import { StickyBar } from "./sections/StickyBar";

export function PalmRiverLanding() {
  return (
    <main id="top" className="pr relative min-h-screen" style={{ background: "#fff" }}>
      <SongSymbol />
      <LightboxProvider>
        <PopupProvider>
          <Navbar />
          <HeroSection />
          <IntroSection />
          <OverviewSection />
          <ValuesSection />
          <LocationSection />
          <AmenitiesSection />
          <MasterPlanSection />
          <GallerySection />
          <UnitsSection />
          <FaqSection />
          <LeadSection />
          <FooterSection />
          <StickyBar />
        </PopupProvider>
      </LightboxProvider>
    </main>
  );
}
