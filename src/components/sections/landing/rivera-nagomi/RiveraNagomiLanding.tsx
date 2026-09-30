"use client";

import "./rivera-nagomi-fonts.css";
import "./rivera-nagomi.css";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { IntroSection } from "./sections/IntroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { VideoSection } from "./sections/VideoSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitySection } from "./sections/AmenitySection";
import { ExternalAmenitySection } from "./sections/ExternalAmenitySection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { ModelHouseSection } from "./sections/ModelHouseSection";
import { PriceSection } from "./sections/PriceSection";
import { FaqSection } from "./sections/FaqSection";
import { LeadSection } from "./sections/LeadSection";
import { FooterSection } from "./sections/FooterSection";
import { StickyBar } from "./sections/StickyBar";
import { FloatingPopupButton } from "./sections/FloatingPopupButton";
import { LightboxProvider } from "./sections/Lightbox";
import { PopupProvider } from "./sections/PopupForm";

export function RiveraNagomiLanding() {
  return (
    <main id="top" className="rn relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <PopupProvider>
          <Navbar />
          <HeroSection />
          <IntroSection />
          <OverviewSection />
          <VideoSection />
          <LocationSection />
          <AmenitySection />
          <ExternalAmenitySection />
          <MasterPlanSection />
          <ModelHouseSection />
          <PriceSection />
          <FaqSection />
          <LeadSection />
          <FooterSection />
          <StickyBar />
          <FloatingPopupButton />
        </PopupProvider>
      </LightboxProvider>
    </main>
  );
}
