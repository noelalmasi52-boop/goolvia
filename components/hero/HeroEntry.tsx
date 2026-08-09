"use client";

import dynamic from "next/dynamic";

const HeroWrapper = dynamic(() => import("./HeroWrapper"), {
  ssr: false,
  loading: () => (
    <div style={{ background: "#070708", height: "100vh", width: "100%" }} />
  ),
});

export default function HeroEntry() {
  return <HeroWrapper />;
}
