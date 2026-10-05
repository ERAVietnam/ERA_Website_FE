"use client";

import "./thanh-phu-fonts.css";
import "./thanh-phu.css";

import { LightboxProvider } from "./sections/Lightbox";
import { PopupProvider } from "./sections/PopupForm";
import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { VideoSection } from "./sections/VideoSection";
import { OverviewSection } from "./sections/OverviewSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { ProductsSection } from "./sections/ProductsSection";
import { PriceSection } from "./sections/PriceSection";
import { InvestorSection } from "./sections/InvestorSection";
import { FaqSection } from "./sections/FaqSection";
import { LeadSection } from "./sections/LeadSection";
import { FooterSection } from "./sections/FooterSection";
import { StickyBar } from "./sections/StickyBar";

export function ThanhPhuLanding() {
  return (
    <main id="top" className="tp relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <PopupProvider>
          <Navbar />
          <HeroSection />
          <VideoSection />
          <OverviewSection />
          <LocationSection />
          <AmenitiesSection />
          <MasterPlanSection />
          <ProductsSection />
          <PriceSection />
          <InvestorSection />
          <FaqSection />
          <LeadSection />
          <FooterSection />
          <StickyBar />
        </PopupProvider>
      </LightboxProvider>
    </main>
  );
}
