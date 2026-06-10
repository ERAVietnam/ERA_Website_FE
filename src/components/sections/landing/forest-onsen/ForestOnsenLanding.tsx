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
import { useReveal } from "./hooks/useReveal";

export default function ForestOnsenLanding() {
  useReveal();

  return (
    <div className="font-light antialiased" style={{ color: c.ink, lineHeight: 1.65, fontSize: 17 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        body { padding-bottom: 0; }
        /* film grain overlay */
        body::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 200;
          pointer-events: none;
          opacity: .035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        /* scroll reveal */
        .reveal { opacity: 0; transform: translateY(26px); transition: .9s cubic-bezier(.22,.61,.36,1); }
        .reveal.in { opacity: 1; transform: none; }
        /* ken burns */
        @keyframes kenburns { from { transform: scale(1.05); } to { transform: scale(1); } }
        .kenburns { animation: kenburns 20s ease-out forwards; }
        /* scroll hint drop */
        @keyframes drop {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; }
        }
        .scroll-drop { animation: drop 2s cubic-bezier(.22,.61,.36,1) infinite; }
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
