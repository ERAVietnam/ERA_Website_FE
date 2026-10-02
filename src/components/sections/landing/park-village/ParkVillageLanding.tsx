"use client";

import "./park-village-fonts.css";
import "./park-village.css";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { IntroSection } from "./sections/IntroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { VideoSection } from "./sections/VideoSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { ExternalSection } from "./sections/ExternalSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { ModelsSection } from "./sections/ModelsSection";
import { PolicySection } from "./sections/PolicySection";
import { FaqSection } from "./sections/FaqSection";
import { LeadSection } from "./sections/LeadSection";
import { FooterSection } from "./sections/FooterSection";
import { StickyBar } from "./sections/StickyBar";
import { LightboxProvider } from "./sections/Lightbox";
import { PopupProvider } from "./sections/PopupForm";

export function ParkVillageLanding() {
  return (
    <main id="top" className="pv relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <PopupProvider>
          <Navbar />
          <HeroSection />
          <IntroSection />
          <OverviewSection />
          <VideoSection />
          <LocationSection />
          <AmenitiesSection />
          <ExternalSection />
          <MasterPlanSection />
          <ModelsSection />
          <PolicySection />
          <FaqSection />
          <LeadSection />
          <FooterSection />
          <StickyBar />
        </PopupProvider>
      </LightboxProvider>
    </main>
  );
}
