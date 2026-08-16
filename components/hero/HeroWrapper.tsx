"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import HeroScene from "./HeroScene";
import HeroUI from "./HeroUI";
import MatchesSection from "@/components/matches/MatchesSection";

gsap.registerPlugin(ScrollTrigger);

export default function HeroWrapper() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const rafFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const heroEl = document.getElementById("hero-section");
      if (!heroEl) return;
      const heroHeight = heroEl.offsetHeight;
      const maxScroll = heroHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scroll / maxScroll));
      setScrollProgress(progress);
    });

    return () => {
      gsap.ticker.remove(rafFn);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Fades in over last 30% of hero scroll, reaching 0.97 at scrollProgress=1.
  // No snap-to-zero: MatchesSection (zIndex 4) slides over the canvas naturally.
  const overlayOpacity = Math.max(0, Math.min(0.97, (scrollProgress - 0.68) / 0.32));

  return (
    <>
      <HeroScene scrollProgress={scrollProgress} />

      {/* Cinematic fade-to-black at end of hero scroll */}
      {overlayOpacity > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#070708",
            opacity: overlayOpacity,
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        id="hero-section"
        style={{
          height: "220vh",
          position: "relative",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <HeroUI />
      </div>

      <MatchesSection />
    </>
  );
}
