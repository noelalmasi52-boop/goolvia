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
      {/* ── STADIUM BACKGROUND ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>

        {/* Base stadium atmosphere */}
        <div style={{
          position: "absolute", inset: 0,
          background: [
            /* Pitch/grass at the bottom */
            "linear-gradient(to top, #071508 0%, #0c1f0a 10%, transparent 28%)",
            /* Upper dark stands */
            "linear-gradient(to bottom, #05080d 0%, #0a1018 30%, #0e1822 55%, transparent 80%)",
            /* Stadium depth gradient */
            "radial-gradient(ellipse 140% 60% at 50% 100%, #091606 0%, transparent 55%)",
          ].join(", "),
        }} />

        {/* Stand row texture — subtle horizontal lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 5px, rgba(255,255,255,0.012) 5px, rgba(255,255,255,0.012) 6px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, transparent 65%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, transparent 65%)",
        }} />

        {/* Pitch center circle + lines */}
        <svg style={{ position: "absolute", bottom: 0, left: "30%", width: "40%", opacity: 0.12 }}
          viewBox="0 0 400 120" preserveAspectRatio="none">
          <ellipse cx="200" cy="120" rx="190" ry="60" fill="none" stroke="#4aaa20" strokeWidth="1.5"/>
          <ellipse cx="200" cy="120" rx="80" ry="32" fill="none" stroke="#4aaa20" strokeWidth="1"/>
          <line x1="0" y1="60" x2="400" y2="60" stroke="#4aaa20" strokeWidth="1"/>
          <line x1="200" y1="0" x2="200" y2="120" stroke="#4aaa20" strokeWidth="1"/>
        </svg>

        {/* Stadium floodlight bokeh — left bank */}
        <div style={{
          position: "absolute", top: "6%", left: "8%",
          width: "180px", height: "120px",
          background: "radial-gradient(ellipse at center, rgba(255,248,210,0.22) 0%, rgba(255,240,170,0.08) 40%, transparent 70%)",
          filter: "blur(12px)",
        }} />
        <div style={{
          position: "absolute", top: "2%", left: "18%",
          width: "120px", height: "80px",
          background: "radial-gradient(ellipse at center, rgba(255,252,220,0.16) 0%, transparent 65%)",
          filter: "blur(8px)",
        }} />
        <div style={{
          position: "absolute", top: "10%", left: "4%",
          width: "80px", height: "60px",
          background: "radial-gradient(ellipse at center, rgba(255,245,200,0.12) 0%, transparent 65%)",
          filter: "blur(6px)",
        }} />

        {/* Stadium floodlight bokeh — right bank */}
        <div style={{
          position: "absolute", top: "5%", right: "7%",
          width: "200px", height: "130px",
          background: "radial-gradient(ellipse at center, rgba(255,248,210,0.20) 0%, rgba(255,240,170,0.07) 40%, transparent 70%)",
          filter: "blur(14px)",
        }} />
        <div style={{
          position: "absolute", top: "1%", right: "20%",
          width: "110px", height: "75px",
          background: "radial-gradient(ellipse at center, rgba(255,252,220,0.14) 0%, transparent 65%)",
          filter: "blur(8px)",
        }} />
        <div style={{
          position: "absolute", top: "12%", right: "4%",
          width: "70px", height: "50px",
          background: "radial-gradient(ellipse at center, rgba(255,245,200,0.10) 0%, transparent 65%)",
          filter: "blur(5px)",
        }} />

        {/* Small bright floodlight dots */}
        {[
          { top: "8%",  left: "12%",  size: "6px" },
          { top: "4%",  left: "22%",  size: "5px" },
          { top: "14%", left: "6%",   size: "4px" },
          { top: "7%",  right: "11%", size: "6px" },
          { top: "3%",  right: "24%", size: "5px" },
          { top: "15%", right: "6%",  size: "4px" },
        ].map((dot, i) => (
          <div key={i} style={{
            position: "absolute",
            top: dot.top, left: (dot as { left?: string }).left, right: (dot as { right?: string }).right,
            width: dot.size, height: dot.size,
            borderRadius: "50%",
            background: "rgba(255,252,230,0.85)",
            boxShadow: "0 0 8px 3px rgba(255,248,200,0.5)",
          }} />
        ))}

        {/* Light rays from stadium lights */}
        {[
          { left: "12%", rotate: "8deg",   opacity: 0.04, width: "60px",  top: "8%" },
          { left: "19%", rotate: "3deg",   opacity: 0.06, width: "40px",  top: "4%" },
          { right: "11%", rotate: "-8deg", opacity: 0.04, width: "65px",  top: "7%" },
          { right: "22%", rotate: "-3deg", opacity: 0.055, width: "42px", top: "3%" },
          { left: "50%",  rotate: "0deg",  opacity: 0.025, width: "80px", top: "-2%" },
        ].map((ray, i) => (
          <div key={i} style={{
            position: "absolute",
            top: ray.top,
            left: (ray as { left?: string }).left,
            right: (ray as { right?: string }).right,
            width: ray.width,
            height: "75%",
            background: "linear-gradient(to bottom, rgba(255,248,210,0.9) 0%, rgba(255,248,210,0.15) 30%, transparent 70%)",
            transform: `rotate(${ray.rotate})`,
            opacity: ray.opacity,
            transformOrigin: "top center",
            filter: "blur(2px)",
          }} />
        ))}

        {/* Vignette — darken edges, keep ball area clear */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 85% 80% at 55% 50%, transparent 15%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.80) 100%)",
        }} />

        {/* Left side darker (text area) */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 30%, transparent 55%)",
        }} />

        {/* Bottom fade into matches section */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
          background: "linear-gradient(to bottom, transparent, rgba(5,6,8,0.85) 70%, #050608 100%)",
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
