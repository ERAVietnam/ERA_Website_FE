"use client";

import "./skysolis-fonts.css";
import "./skysolis.css";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { VrSection } from "./sections/VrSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { HealthyHomeSection } from "./sections/HealthyHomeSection";
import { LocationSection } from "./sections/LocationSection";
import { AppSection } from "./sections/AppSection";
import { InvestorSection } from "./sections/InvestorSection";
import { UnitsSection } from "./sections/UnitsSection";
import { PolicySection } from "./sections/PolicySection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";
import { FooterSection } from "./sections/FooterSection";
import { LightboxProvider } from "./sections/Lightbox";

export function SkysolisLanding() {
  return (
    <main id="top" className="ss relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <Navbar />
        <HeroSection />
        <OverviewSection />
        <VrSection />
        <AmenitiesSection />
        <HealthyHomeSection />
        <LocationSection />
        <AppSection />
        <InvestorSection />
        <UnitsSection />
        <PolicySection />
        <FaqSection />
        <CtaSection />
        <FooterSection />
      </LightboxProvider>
    </main>
  );
}
