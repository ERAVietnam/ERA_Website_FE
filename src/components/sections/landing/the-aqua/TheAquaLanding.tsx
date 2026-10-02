"use client";

import "./the-aqua-fonts.css";
import "./the-aqua.css";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { VideoSection } from "./sections/VideoSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { ExternalSection } from "./sections/ExternalSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { ModelsSection } from "./sections/ModelsSection";
import { PolicySection } from "./sections/PolicySection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";
import { FooterSection } from "./sections/FooterSection";
import { LightboxProvider } from "./sections/Lightbox";

export function TheAquaLanding() {
  return (
    <main id="top" className="aq relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <Navbar />
        <HeroSection />
        <OverviewSection />
        <VideoSection />
        <LocationSection />
        <AmenitiesSection />
        <ExternalSection />
        <MasterPlanSection />
        <ModelsSection />
        <PolicySection />
        <FaqSection />
        <CtaSection />
        <FooterSection />
      </LightboxProvider>
    </main>
  );
}
