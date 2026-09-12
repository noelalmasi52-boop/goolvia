"use client";

import { useState } from "react";
import HeroUI, { SearchFilter } from "./HeroUI";
import MatchesSection from "@/components/matches/MatchesSection";

export default function HeroWrapper() {
  const [heroFilter, setHeroFilter] = useState<SearchFilter | null>(null);

  return (
    <>
      <HeroUI onSearch={setHeroFilter} />
      <MatchesSection heroFilter={heroFilter} />
    </>
  );
}
