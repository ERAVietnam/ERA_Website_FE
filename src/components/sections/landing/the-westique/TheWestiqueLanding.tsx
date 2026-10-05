"use client";

import "./the-westique-fonts.css";
import "./the-westique.css";

import { LightboxProvider } from "./sections/Lightbox";
import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { OverviewSection } from "./sections/OverviewSection";
import { LocationSection } from "./sections/LocationSection";
import { AmenitiesSection } from "./sections/AmenitiesSection";
import { ProductsSection } from "./sections/ProductsSection";
import { InvestorSection } from "./sections/InvestorSection";
import { LegalSection } from "./sections/LegalSection";
import { FaqSection } from "./sections/FaqSection";
import { CtaSection } from "./sections/CtaSection";
import { FooterSection } from "./sections/FooterSection";

export function TheWestiqueLanding() {
  return (
    <main id="top" className="wq relative min-h-screen" style={{ background: "#fff" }}>
      <LightboxProvider>
        <Navbar />
        <HeroSection />
        <OverviewSection />
        <LocationSection />
        <AmenitiesSection />
        <ProductsSection />
        <InvestorSection />
        <LegalSection />
        <FaqSection />
        <CtaSection />
        <FooterSection />
      </LightboxProvider>
    </main>
  );
}
