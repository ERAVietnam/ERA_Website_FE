"use client";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { ProblemSection } from "./sections/ProblemSection";
import { LeadBandSection } from "./sections/LeadBandSection";
import { OverviewSection } from "./sections/OverviewSection";
import { LocationSection } from "./sections/LocationSection";
import { EducationSection } from "./sections/EducationSection";
import { AmenitySection } from "./sections/AmenitySection";
import { BoulevardSection } from "./sections/BoulevardSection";
import { ProductSection } from "./sections/ProductSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { WhySection } from "./sections/WhySection";
import { PolicySection } from "./sections/PolicySection";
import { TrustSection } from "./sections/TrustSection";
import { FaqSection } from "./sections/FaqSection";
import { FooterSection } from "./sections/FooterSection";
import { FloatingButtons } from "./sections/FloatingButtons";
import { MobileBar } from "./sections/MobileBar";
import { useReveal } from "@/hooks/useReveal";
import { c, fonts } from "./theme";

export default function EcoRetreatLanding() {
  useReveal();

  return (
    <div
      className="antialiased"
      style={{
        color: c.ink,
        background: c.white,
        fontFamily: fonts.body,
        lineHeight: 1.65,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        body { padding-bottom: 0; }
        @keyframes rpFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes rpPulse { 0% { box-shadow: 0 0 0 0 rgba(229,57,28,0.5); } 70% { box-shadow: 0 0 0 16px rgba(229,57,28,0); } 100% { box-shadow: 0 0 0 0 rgba(229,57,28,0); } }
        .reveal { opacity: 0; transform: translateY(26px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.in { opacity: 1; transform: none; }
        details > summary::-webkit-details-marker { display: none; }
        details > summary::marker { content: ""; }
      `}</style>

      <Navbar />
      <HeroSection />
      <ProblemSection />
      <LeadBandSection />
      <OverviewSection />
      <LocationSection />
      <EducationSection />
      <AmenitySection />
      <BoulevardSection />
      <ProductSection />
      <MasterPlanSection />
      <WhySection />
      <PolicySection />
      <TrustSection />
      <FaqSection />
      <FooterSection />
      <FloatingButtons />
      <MobileBar />
    </div>
  );
}
