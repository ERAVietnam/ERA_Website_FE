"use client";

import { theme } from "./theme";
import "./waterpoint-fonts.css";
import "./waterpoint.css";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { IntroSection } from "./sections/IntroSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { Tour360Section } from "./sections/Tour360Section";
import { FormGiuaSection } from "./sections/FormGiuaSection";
import { VideoSection } from "./sections/VideoSection";
import { LocationSection } from "./sections/LocationSection";
import { ExistingSection } from "./sections/ExistingSection";
import { AmenitySection } from "./sections/AmenitySection";
import { VillaSection } from "./sections/VillaSection";
import { SanPhamSection } from "./sections/SanPhamSection";
import { PriceSection } from "./sections/PriceSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { LeadSection } from "./sections/LeadSection";
import { FooterSection } from "./sections/FooterSection";
import { FloatingButtons } from "./sections/FloatingButtons";

export function WaterpointLanding() {
  return (
    <main
      className="relative min-h-screen"
      style={{
        backgroundColor: theme.ice,
        color: theme.text,
        fontFamily: "'WP Montserrat', 'Montserrat', sans-serif",
      }}
    >
      <Navbar />
      <HeroSection />
      <IntroSection />
      <MasterPlanSection />
      <Tour360Section />
      <FormGiuaSection />
      <VideoSection />
      <LocationSection />
      <ExistingSection />
      <AmenitySection />
      <VillaSection />
      <SanPhamSection />
      <PriceSection />
      <ExperienceSection />
      <LeadSection />
      <FooterSection />
      <FloatingButtons />
    </main>
  );
}
