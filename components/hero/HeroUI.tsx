"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroUI() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Set initial hidden state
    gsap.set(
      [logoRef.current, taglineRef.current, headlineRef.current, subtextRef.current, ctaRef.current, scrollHintRef.current],
      { autoAlpha: 0 }
    );
    gsap.set(headlineRef.current, { y: 60, skewY: 2 });
    gsap.set(subtextRef.current, { y: 24 });
    gsap.set(ctaRef.current, { y: 16 });
    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });

    const tl = gsap.timeline({ delay: 3.8 });

    tl.to(logoRef.current, { autoAlpha: 1, duration: 0.7, ease: "power2.out" })
      .to(taglineRef.current, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.5")
      .to(
        headlineRef.current,
        { autoAlpha: 1, y: 0, skewY: 0, duration: 1.1, ease: "power4.out" },
        "-=0.2"
      )
      .to(
        subtextRef.current,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      )
      .to(
        ctaRef.current,
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .to(
        lineRef.current,
        { scaleY: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.5"
      )
      .to(
        scrollHintRef.current,
        { autoAlpha: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        padding: "2.5rem 3rem",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* Top bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div ref={logoRef}>
          <span
            style={{
              fontFamily: "var(--font-antonio)",
              fontSize: "1.05rem",
              fontWeight: 700,
              letterSpacing: "0.45em",
              color: "var(--goolvia-gold)",
              textTransform: "uppercase",
            }}
          >
            GOOLVIA
          </span>
        </div>

        <div ref={taglineRef}>
          <span
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              color: "var(--goolvia-muted)",
              textTransform: "uppercase",
            }}
          >
            Match Experiences
          </span>
        </div>
      </nav>

      {/* Center — headline zone */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "6vh",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-antonio)",
              fontWeight: 700,
              fontSize: "clamp(4.5rem, 11vw, 10.5rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--goolvia-white)",
              display: "block",
            }}
          >
            Live<br />
            <span style={{ color: "var(--goolvia-gold)" }}>The</span><br />
            Game.
          </h1>
        </div>

        <p
          ref={subtextRef}
          style={{
            marginTop: "1.8rem",
            fontFamily: "var(--font-geist)",
            fontSize: "0.82rem",
            letterSpacing: "0.18em",
            color: "var(--goolvia-muted)",
            textTransform: "uppercase",
          }}
        >
          Football trips you&apos;ll remember.
        </p>

        <div ref={ctaRef} style={{ marginTop: "2.4rem", pointerEvents: "auto" }}>
          <a
            href="#"
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
              el.style.color = "var(--goolvia-black)";
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
            <span
              className="cta-fill"
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--goolvia-gold)",
                transform: "scaleX(0)",
                transformOrigin: "left center",
                transition: "transform 0.35s cubic-bezier(0.76, 0, 0.24, 1)",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>
              Explore Matches
            </span>
            <span style={{ position: "relative", zIndex: 1, fontSize: "0.65rem", opacity: 0.7 }}>
              →
            </span>
          </a>
        </div>
      </div>

      {/* Bottom — scroll indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <div
          ref={scrollHintRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-geist)",
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              color: "var(--goolvia-muted)",
              textTransform: "uppercase",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
            }}
          >
            Scroll to explore
          </span>
          <div
            ref={lineRef}
            style={{
              width: "1px",
              height: "52px",
              background:
                "linear-gradient(to bottom, var(--goolvia-gold), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
