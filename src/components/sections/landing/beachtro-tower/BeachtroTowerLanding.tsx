"use client";

import "./beachtro-tower-fonts.css";
import "./beachtro-tower.css";

import { LightboxProvider } from "./sections/Lightbox";
import { PopupProvider } from "./sections/PopupForm";
import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { VideoSection } from "./sections/VideoSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { ExternalSection } from "./sections/ExternalSection";
import { UnitsSection } from "./sections/UnitsSection";
import { PolicySection } from "./sections/PolicySection";
import { DyHomeSection } from "./sections/DyHomeSection";
import { FaqSection } from "./sections/FaqSection";
import { LeadSection } from "./sections/LeadSection";
import { FooterSection } from "./sections/FooterSection";
import { StickyBar } from "./sections/StickyBar";

export function BeachtroTowerLanding() {
  return (
    <main id="top" className="bt relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <PopupProvider>
          <Navbar />
          <HeroSection />
          <OverviewSection />
          <VideoSection />
          <LocationSection />
          <AmenitiesSection />
          <ExternalSection />
          <UnitsSection />
          <PolicySection />
          <DyHomeSection />
          <FaqSection />
          <LeadSection />
          <FooterSection />
          <StickyBar />
        </PopupProvider>
      </LightboxProvider>
    </main>
  );
}
