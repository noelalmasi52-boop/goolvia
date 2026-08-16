"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NAV_LINKS = ["Zážitky", "Destinácie", "O nás", "Kontakt"];

export default function HeroUI() {
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const logoRef       = useRef<HTMLDivElement>(null);
  const navRef        = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const subtextRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const ratingRef     = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(
      [logoRef.current, navRef.current, headlineRef.current,
       subtextRef.current, ctaRef.current, ratingRef.current, scrollHintRef.current],
      { autoAlpha: 0 }
    );
    gsap.set(headlineRef.current, { y: 60, skewY: 2 });
    gsap.set(subtextRef.current,  { y: 24 });
    gsap.set(ctaRef.current,      { y: 16 });
    gsap.set(ratingRef.current,   { y: 16 });
    gsap.set(lineRef.current,     { scaleY: 0, transformOrigin: "top center" });

    const tl = gsap.timeline({ delay: 3.6 });
    tl
      .to(logoRef.current,      { autoAlpha: 1, duration: 0.6, ease: "power2.out" })
      .to(navRef.current,       { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .to(headlineRef.current,  { autoAlpha: 1, y: 0, skewY: 0, duration: 1.1, ease: "power4.out" }, "-=0.2")
      .to(subtextRef.current,   { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5")
      .to(ctaRef.current,       { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(ratingRef.current,    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
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
      {/* Stadium light rays — CSS atmosphere overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 80% at 60% 45%, transparent 20%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.88) 100%)",
        }} />
        {/* Light rays from above */}
        {[
          { left: "54%", rotate: "-2deg",  opacity: 0.045, width: "90px",  top: "-5%" },
          { left: "58%", rotate: "1.5deg", opacity: 0.065, width: "60px",  top: "-8%" },
          { left: "62%", rotate: "4deg",   opacity: 0.040, width: "110px", top: "-4%" },
          { left: "50%", rotate: "-5deg",  opacity: 0.030, width: "70px",  top: "-6%" },
          { left: "68%", rotate: "7deg",   opacity: 0.025, width: "50px",  top: "-3%" },
        ].map((ray, i) => (
          <div key={i} style={{
            position: "absolute",
            top: ray.top,
            left: ray.left,
            width: ray.width,
            height: "110%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 40%, transparent 80%)",
            transform: `rotate(${ray.rotate})`,
            opacity: ray.opacity,
            transformOrigin: "top center",
          }} />
        ))}
        {/* Bottom gradient fade into matches section */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "180px",
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))",
        }} />
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: "relative", zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2rem 3rem",
        pointerEvents: "auto",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div ref={logoRef}>
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

        <div ref={navRef} style={{ display: "flex", alignItems: "center", gap: "2.4rem" }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
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
              {link}
            </a>
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
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "var(--goolvia-gold)",
              border: "1px solid var(--goolvia-gold)",
              padding: "0.55rem 1.2rem",
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
            Zážitky zo zápasov
          </a>
        </div>
      </nav>

      {/* ── HERO BODY ── */}
      <div style={{
        position: "relative", zIndex: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 3rem 2.8rem",
      }}>
        {/* Headline */}
        <div style={{ overflow: "hidden" }}>
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-antonio)",
              fontWeight: 700,
              fontSize: "clamp(5rem, 12vw, 11.5rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1.6rem",
            }}
          >
            <span style={{ color: "var(--goolvia-white)" }}>Zaži To</span><br />
            <span style={{ color: "var(--goolvia-gold)" }}>Naživo</span>
          </h1>
        </div>

        {/* Subtext */}
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
          Futbalové zápasy, atmosféra a spomienky,<br />
          ktoré ostanú s tebou navždy.
        </p>

        {/* CTA */}
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

        {/* Rating */}
        <div ref={ratingRef} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Avatar bubbles */}
          <div style={{ display: "flex" }}>
            {["#c8543a", "#4a7cc8", "#5aaa5a", "#c8a040"].map((bg, i) => (
              <div key={i} style={{
                width: "30px", height: "30px",
                borderRadius: "50%",
                background: bg,
                border: "2px solid #050608",
                marginLeft: i > 0 ? "-8px" : "0",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", color: "#fff", fontWeight: 700,
              }}>
                {["J", "M", "T", "A"][i]}
              </div>
            ))}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontFamily: "var(--font-antonio)", fontSize: "1rem", color: "#fff", fontWeight: 700 }}>4.9</span>
              <span style={{ color: "var(--goolvia-gold)", fontSize: "0.7rem", letterSpacing: "2px" }}>★★★★★</span>
            </div>
            <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "rgba(255,255,255,0.38)", marginTop: "1px" }}>
              Na základe 1 200+ hodnotení
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLL HINT (right side vertical) ── */}
      <div style={{
        position: "absolute", right: "2.8rem", bottom: "3rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
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
