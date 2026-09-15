"use client";

import { theme } from "./theme";
import "./waterpoint-fonts.css";
import "./waterpoint.css";

import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { IntroSection } from "./sections/IntroSection";
import { StorySection } from "./sections/StorySection";
import { VideoSection } from "./sections/VideoSection";
import { ConnectionSection } from "./sections/ConnectionSection";
import { LocationSection } from "./sections/LocationSection";
import { MasterPlanSection } from "./sections/MasterPlanSection";
import { ExistingSection } from "./sections/ExistingSection";
import { AmenitySection } from "./sections/AmenitySection";
import { Tour360Section } from "./sections/Tour360Section";
import { FormGiuaSection } from "./sections/FormGiuaSection";
import { VillaSection } from "./sections/VillaSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { PriceSection } from "./sections/PriceSection";
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
      <StorySection />
      <VideoSection />
      <ConnectionSection />
      <LocationSection />
      <MasterPlanSection />
      <ExistingSection />
      <AmenitySection />
      <Tour360Section />
      <FormGiuaSection />
      <VillaSection />
      <ExperienceSection />
      <PriceSection />
      <LeadSection />
      <FooterSection />
      <FloatingButtons />
    </main>
  );
}
