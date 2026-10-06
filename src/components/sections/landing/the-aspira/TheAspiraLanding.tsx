"use client";

import "./the-aspira-fonts.css";
import "./the-aspira.css";

import { LightboxProvider } from "./sections/Lightbox";
import { PopupProvider } from "./sections/PopupForm";
import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { UnitsSection } from "./sections/UnitsSection";
import { GallerySection } from "./sections/GallerySection";
import { ProgressSection } from "./sections/ProgressSection";
import { ShowroomSection } from "./sections/ShowroomSection";
import { PolicySection } from "./sections/PolicySection";
import { PartnersSection } from "./sections/PartnersSection";
import { FaqSection } from "./sections/FaqSection";
import { LeadSection } from "./sections/LeadSection";
import { FooterSection } from "./sections/FooterSection";
import { StickyBar } from "./sections/StickyBar";

export function TheAspiraLanding() {
  return (
    <main id="top" className="asp relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <PopupProvider>
          <Navbar />
          <HeroSection />
          <OverviewSection />
          <LocationSection />
          <AmenitiesSection />
          <UnitsSection />
          <GallerySection />
          <ProgressSection />
          <ShowroomSection />
          <PolicySection />
          <PartnersSection />
          <FaqSection />
          <LeadSection />
          <FooterSection />
          <StickyBar />
        </PopupProvider>
      </LightboxProvider>
    </main>
  );
}
