"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import MobileNavMenu from "@/components/layout/MobileNavMenu";

const NAV_LINKS = [
  { label: "O nás",           href: "/o-nas" },
  { label: "Ponuky",          href: "/#zapasy" },
  { label: "Ako to funguje",  href: "/#ako-to-funguje" },
  { label: "Kontakt",         href: "/kontakt" },
];

function scrollToId(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

export default function HeroUI() {
  const logoRef     = useRef<HTMLDivElement>(null);
  const navRef      = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

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
      [logoRef.current, navRef.current, tagRef.current, headlineRef.current, subtextRef.current, ctaRef.current],
      { autoAlpha: 0 }
    );
    gsap.set(headlineRef.current, { y: 40 });
    gsap.set(subtextRef.current,  { y: 20 });
    gsap.set(ctaRef.current,      { y: 16 });

    const tl = gsap.timeline({ delay: 0.25 });
    tl
      .to(logoRef.current,     { autoAlpha: 1, duration: 0.6, ease: "power2.out" })
      .to(navRef.current,      { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(tagRef.current,      { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(headlineRef.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.25")
      .to(subtextRef.current,  { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5")
      .to(ctaRef.current,      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.35");

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "560px",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "url(/stadium.png)",
        backgroundSize: "cover",
        backgroundPosition: "center 32%",
        overflow: "hidden",
      }}
    >
      {/* Readability scrim — strongest over the left text column, fading right */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(to right, rgba(4,5,8,0.92) 0%, rgba(4,5,8,0.7) 30%, rgba(4,5,8,0.32) 56%, rgba(4,5,8,0.08) 78%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(to top, rgba(4,5,8,0.6) 0%, transparent 26%)",
      }} />

      {/* NAV */}
      <nav style={{
        position: "relative", zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "1rem 1.2rem" : "2rem 3rem",
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
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                fontFamily: "var(--font-antonio)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "rgba(255,255,255,0.78)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.78)"; }}
            >
              {label}
            </Link>
          ))}
        </div>

        <a
          href="#zapasy"
          onClick={scrollToId("zapasy")}
          style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.68rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "var(--goolvia-gold)",
            border: "1px solid var(--goolvia-gold)",
            padding: "0.6rem 1.4rem",
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
          Zápasy
        </a>
      </nav>

      {/* HERO BODY */}
      <div style={{
        position: "relative", zIndex: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "0 1.2rem" : "0 3rem",
        maxWidth: "640px",
      }}>
        <p ref={tagRef} style={{
          fontFamily: "var(--font-antonio)",
          fontSize: "0.72rem",
          letterSpacing: "0.32em",
          color: "rgba(255,255,255,0.72)",
          textTransform: "uppercase",
          marginBottom: "1.1rem",
        }}>
          Futbal. Cestovanie. Zážitky.
        </p>

        <h1
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-antonio)",
            fontWeight: 700,
            fontSize: "clamp(2.8rem, 7.5vw, 5.6rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          <span style={{ color: "var(--goolvia-white)" }}>ZAŽI TO</span><br />
          <span style={{ color: "var(--goolvia-gold)" }}>NAŽIVO</span>
        </h1>

        <p
          ref={subtextRef}
          style={{
            fontFamily: "var(--font-geist)",
            fontSize: isMobile ? "0.92rem" : "1.02rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.82)",
            maxWidth: "440px",
            marginBottom: "2.2rem",
          }}
        >
          Nájdeme najlacnejšie lety, hotely a vstupenky na futbalové zápasy v Európe{" "}
          <span style={{ color: "var(--goolvia-gold)", fontWeight: 600 }}>na jednom mieste</span>.
        </p>

        <div ref={ctaRef}>
          <a
            href="#zapasy"
            onClick={scrollToId("zapasy")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "0.95rem 2.2rem",
              border: "1px solid var(--goolvia-gold)",
              color: "var(--goolvia-gold)",
              fontFamily: "var(--font-antonio)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textDecoration: "none",
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
            Pozrieť ponuky <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
