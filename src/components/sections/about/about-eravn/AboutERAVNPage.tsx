"use client";

import { useState } from "react";
import AboutERAVNHeroSection from "./AboutERAVNHeroSection";
import AboutERAVNTabs from "./AboutERAVNTabs";
import AboutERAVNContentSection from "./AboutERAVNContentSection";
import AboutERAVNPhilosophySection from "./AboutERAVNPhilosophySection";
import AboutERAVNServicesSection from "./AboutERAVNServicesSection";
import AboutERAVNDivisionsSection from "./AboutERAVNDivisionsSection";
import AboutERAVNAppSection from "./AboutERAVNAppSection";
import AboutERAVNAwardsSection from "./AboutERAVNAwardsSection";
import AboutERAVNESGSection from "./AboutERAVNESGSection";
import AboutERAVNFAQSection from "./AboutERAVNFAQSection";

export default function AboutERAVNPage() {
  const [activeTab, setActiveTab] = useState("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <main>
      <AboutERAVNHeroSection />
      <AboutERAVNTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <AboutERAVNContentSection />
      <AboutERAVNPhilosophySection />
      <AboutERAVNServicesSection />
      <AboutERAVNDivisionsSection />
      <AboutERAVNAppSection />
      <AboutERAVNAwardsSection />
      <AboutERAVNESGSection />
      <AboutERAVNFAQSection />
    </main>
  );
}
