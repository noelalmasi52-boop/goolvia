"use client";

import HeroUI from "./HeroUI";
import HowItWorks from "./HowItWorks";
import MatchesSection from "@/components/matches/MatchesSection";

export default function HeroWrapper() {
  return (
    <>
      <HeroUI />
      <HowItWorks />
      <MatchesSection />
    </>
  );
}
