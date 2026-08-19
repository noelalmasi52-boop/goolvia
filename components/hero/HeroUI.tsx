"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import MobileNavMenu from "@/components/layout/MobileNavMenu";

const NAV_LINKS = [
  { label: "Zážitky",    href: "/#zapasy" },
  { label: "Destinácie", href: "/destinacie" },
  { label: "O nás",      href: "/o-nas" },
  { label: "Kontakt",    href: "/kontakt" },
];

export default function HeroUI() {
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const logoRef       = useRef<HTMLDivElement>(null);
  const navRef        = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const subtextRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    gsap.set(
      [logoRef.current, navRef.current, headlineRef.current,
       subtextRef.current, ctaRef.current, scrollHintRef.current],
      { autoAlpha: 0 }
    );
    gsap.set(headlineRef.current, { y: 60, skewY: 2 });
    gsap.set(subtextRef.current,  { y: 24 });
    gsap.set(ctaRef.current,      { y: 16 });
    gsap.set(lineRef.current,     { scaleY: 0, transformOrigin: "top center" });

    const tl = gsap.timeline({ delay: 3.6 });
    tl
      .to(logoRef.current,      { autoAlpha: 1, duration: 0.6, ease: "power2.out" })
      .to(navRef.current,       { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(headlineRef.current,  { autoAlpha: 1, y: 0, skewY: 0, duration: 1.1, ease: "power4.out" }, "-=0.2")
      .to(subtextRef.current,   { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5")
      .to(ctaRef.current,       { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(lineRef.current,      { scaleY: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.6")
      .to(scrollHintRef.current,{ autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.4");

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        pointerEvents: "none",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Readability scrim behind the text column only — never over the ball */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.30) 26%, transparent 48%)",
      }} />

      {/* NAV */}
      <nav style={{
        position: "relative", zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "1rem 1.2rem" : "2rem 3rem",
        pointerEvents: "auto",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div ref={logoRef} style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
          {isMobile && <MobileNavMenu links={NAV_LINKS} activeHref="/" />}
          <span style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "1.05rem",
            fontWeight: 700,
            letterSpacing: "0.45em",
            color: "var(--goolvia-gold)",
            textTransform: "uppercase",
          }}>
            GOOLVIA
          </span>
        </div>

        <div ref={navRef} style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: "2.4rem" }}>
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              style={{
                fontFamily: "var(--font-antonio)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: i === 0 ? "var(--goolvia-gold)" : "rgba(255,255,255,0.45)",
                borderBottom: i === 0 ? "1px solid var(--goolvia-gold)" : "1px solid transparent",
                paddingBottom: "3px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (i !== 0) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
              }}
              onMouseLeave={(e) => {
                if (i !== 0) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div>
          <a
            href="#zapasy"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("zapasy")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily: "var(--font-antonio)",
              fontSize: isMobile ? "0.58rem" : "0.65rem",
              letterSpacing: isMobile ? "0.1em" : "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "var(--goolvia-gold)",
              border: "1px solid var(--goolvia-gold)",
              padding: isMobile ? "0.5rem 0.85rem" : "0.55rem 1.2rem",
              whiteSpace: "nowrap",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--goolvia-gold)";
              el.style.color = "#050608";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "var(--goolvia-gold)";
            }}
          >
            {isMobile ? "Zápasy" : "Zážitky zo zápasov"}
          </a>
        </div>
      </nav>

      {/* HERO BODY */}
      <div style={{
        position: "relative", zIndex: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: isMobile ? "0 1.2rem 1.8rem" : "0 3rem 2.8rem",
      }}>
        <div style={{ overflow: "hidden" }}>
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-antonio)",
              fontWeight: 700,
              fontSize: "clamp(3rem, 13vw, 11.5rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1.6rem",
            }}
          >
            <span style={{ color: "var(--goolvia-white)" }}>ZAŽI TO</span><br />
            <span style={{ color: "var(--goolvia-gold)" }}>NAŽIVO</span>
          </h1>
        </div>

        <p
          ref={subtextRef}
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.9rem",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "400px",
            marginBottom: "2.2rem",
          }}
        >
          Futbalové zápasy, atmosféra a spomienky, ktoré ostanú s tebou navždy.
        </p>

        <div ref={ctaRef} style={{ pointerEvents: "auto", marginBottom: "2.8rem" }}>
          <a
            href="#zapasy"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("zapasy")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.9rem 2.4rem",
              border: "1px solid var(--goolvia-gold)",
              color: "var(--goolvia-gold)",
              fontFamily: "var(--font-antonio)",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              textDecoration: "none",
              position: "relative",
              transition: "color 0.3s",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = "#050608";
              const fill = el.querySelector(".cta-fill") as HTMLElement;
              if (fill) fill.style.transform = "scaleX(1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = "var(--goolvia-gold)";
              const fill = el.querySelector(".cta-fill") as HTMLElement;
              if (fill) fill.style.transform = "scaleX(0)";
            }}
          >
            <span className="cta-fill" style={{
              position: "absolute", inset: 0,
              background: "var(--goolvia-gold)",
              transform: "scaleX(0)",
              transformOrigin: "left center",
              transition: "transform 0.35s cubic-bezier(0.76, 0, 0.24, 1)",
              zIndex: 0,
            }} />
            <span style={{ position: "relative", zIndex: 1 }}>Pozrieť zápasy</span>
            <span style={{ position: "relative", zIndex: 1, fontSize: "0.65rem", opacity: 0.7 }}>→</span>
          </a>
        </div>

      </div>

      {/* SCROLL HINT */}
      <div style={{
        position: "absolute", right: "2.8rem", bottom: "3rem",
        display: isMobile ? "none" : "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
        zIndex: 1,
      }}>
        <div ref={scrollHintRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
          <span style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.55rem",
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.28)",
            textTransform: "uppercase",
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
          }}>
            Rolovať nadol
          </span>
          <div ref={lineRef} style={{
            width: "1px", height: "52px",
            background: "linear-gradient(to bottom, var(--goolvia-gold), transparent)",
          }} />
        </div>
      </div>
    </div>
  );
}
