"use client";

import "./nam-mekong-fonts.css";
import "./nam-mekong.css";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { IntroSection } from "./sections/IntroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { VideoSection } from "./sections/VideoSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { ExternalSection } from "./sections/ExternalSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { UnitsSection } from "./sections/UnitsSection";
import { PolicySection } from "./sections/PolicySection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";
import { FooterSection } from "./sections/FooterSection";
import { LightboxProvider } from "./sections/Lightbox";

export function NamMekongLanding() {
  return (
    <main id="top" className="nmg relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <Navbar />
        <HeroSection />
        <IntroSection />
        <OverviewSection />
        <VideoSection />
        <LocationSection />
        <AmenitiesSection />
        <ExternalSection />
        <MasterPlanSection />
        <UnitsSection />
        <PolicySection />
        <FaqSection />
        <CtaSection />
        <FooterSection />
      </LightboxProvider>
    </main>
  );
}
