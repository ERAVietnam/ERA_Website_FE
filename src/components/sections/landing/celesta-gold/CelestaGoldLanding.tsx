"use client";

import "./celesta-gold-fonts.css";
import "./celesta-gold.css";

import { LightboxProvider } from "./sections/Lightbox";
import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { InvestorsSection } from "./sections/InvestorsSection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";
import { FooterSection } from "./sections/FooterSection";

export function CelestaGoldLanding() {
  return (
    <main id="top" className="cg relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <Navbar />
        <HeroSection />
        <OverviewSection />
        <LocationSection />
        <AmenitiesSection />
        <InvestorsSection />
        <FaqSection />
        <CtaSection />
        <FooterSection />
      </LightboxProvider>
    </main>
  );
}
