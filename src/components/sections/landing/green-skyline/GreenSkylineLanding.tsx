"use client";

import "./green-skyline-fonts.css";
import "./green-skyline.css";

import { LightboxProvider } from "./sections/Lightbox";
import { PopupProvider } from "./sections/PopupForm";
import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { IntroSection } from "./sections/IntroSection";
import { ValuesSection } from "./sections/ValuesSection";
import { LocationSection } from "./sections/LocationSection";
import { OverviewSection } from "./sections/OverviewSection";
import { ArchitectureSection } from "./sections/ArchitectureSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { UnitsSection } from "./sections/UnitsSection";
import { HandoverSection } from "./sections/HandoverSection";
import { InvestorSection } from "./sections/InvestorSection";
import { PolicySection } from "./sections/PolicySection";
import { FaqSection } from "./sections/FaqSection";
import { LeadSection } from "./sections/LeadSection";
import { FooterSection } from "./sections/FooterSection";
import { StickyBar } from "./sections/StickyBar";

export function GreenSkylineLanding() {
  return (
    <main id="top" className="gs relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <PopupProvider>
          <Navbar />
          <HeroSection />
          <IntroSection />
          <ValuesSection />
          <LocationSection />
          <OverviewSection />
          <ArchitectureSection />
          <AmenitiesSection />
          <MasterPlanSection />
          <UnitsSection />
          <HandoverSection />
          <InvestorSection />
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
