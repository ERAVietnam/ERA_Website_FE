"use client";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { TrustBar } from "./sections/TrustBar";
import { InsightSection } from "./sections/InsightSection";
import { ScaleSection } from "./sections/ScaleSection";
import { UspSection } from "./sections/UspSection";
import { OnsenFeatureSection } from "./sections/OnsenFeatureSection";
import { BenefitsSection } from "./sections/BenefitsSection";
import { PoolsSection } from "./sections/PoolsSection";
import { LookbookSection } from "./sections/LookbookSection";
import { LocationSection } from "./sections/LocationSection";
import { InfrastructureSection } from "./sections/InfrastructureSection";
import { LeadBandA } from "./sections/LeadBandA";
import { CollectionSection } from "./sections/CollectionSection";
import { RitualSection } from "./sections/RitualSection";
import { ProofSection } from "./sections/ProofSection";
import { LeadBandB } from "./sections/LeadBandB";
import { PolicySection } from "./sections/PolicySection";
import { TrustBlockSection } from "./sections/TrustBlockSection";
import { FaqSection } from "./sections/FaqSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import { StickyWidget } from "./sections/StickyWidget";
import { c } from "./theme";

export default function ForestOnsenLanding() {
  return (
    <div className="font-light antialiased" style={{ color: c.ink, lineHeight: 1.65, fontSize: 17 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        body { padding-bottom: 0; }
      `}</style>

      <Navbar />
      <HeroSection />
      <TrustBar />
      <InsightSection />
      <ScaleSection />
      <UspSection />
      <OnsenFeatureSection />
      <BenefitsSection />
      <PoolsSection />
      <LookbookSection />
      <LocationSection />
      <InfrastructureSection />
      <LeadBandA />
      <CollectionSection />
      <RitualSection />
      <ProofSection />
      <LeadBandB />
      <PolicySection />
      <TrustBlockSection />
      <FaqSection />
      <FinalCtaSection />
      <StickyWidget />
    </div>
  );
}
