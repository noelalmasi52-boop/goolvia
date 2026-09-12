"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MobileNavMenu from "@/components/layout/MobileNavMenu";
import { MATCHES } from "@/components/matches/data";

const NAV_LINKS = [
  { label: "O nás",           href: "/o-nas" },
  { label: "Ponuky",          href: "/#zapasy" },
  { label: "Vstupenky",       href: "/vstupenky" },
  { label: "Prémiová služba", href: "/#ako-to-funguje" },
  { label: "Kontakt",         href: "/kontakt" },
];

const CITIES = Array.from(new Set(MATCHES.map(m => m.city))).sort();

const MATCH_OPTIONS = MATCHES.map(m => `${m.home} vs ${m.away}`);

const DATE_OPTIONS = Array.from(new Set(MATCHES.map(m => m.date))).sort((a, b) => {
  const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const [dayA, monA] = a.split(" ");
  const [dayB, monB] = b.split(" ");
  const mi = MONTHS.indexOf(monA) - MONTHS.indexOf(monB);
  return mi !== 0 ? mi : parseInt(dayA) - parseInt(dayB);
});

export type SearchFilter = { city: string; match: string; date: string };

type Props = { onSearch?: (filter: SearchFilter) => void };

function SearchDropdown({ label, options, value, onChange, placeholder }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flex: 1, minWidth: 0 }}>
      <div style={{
        fontFamily: "var(--font-antonio)", fontSize: "0.52rem", letterSpacing: "0.26em",
        color: "rgba(255,255,255,0.42)", textTransform: "uppercase", marginBottom: "7px",
      }}>{label}</div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "transparent", border: "none",
          padding: 0, cursor: "pointer", textAlign: "left",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
        }}
      >
        <span style={{
          fontFamily: "var(--font-antonio)", fontSize: "0.88rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.03em",
          color: value ? "#eef0f6" : "rgba(255,255,255,0.32)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "90%",
        }}>
          {value || placeholder}
        </span>
        <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.5rem", flexShrink: 0 }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 14px)", left: "-8px", right: "-8px",
          background: "#0d1219", border: "1px solid rgba(216,179,90,0.22)",
          borderRadius: "10px", zIndex: 100,
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
          maxHeight: "220px", overflowY: "auto",
        }}>
          {["", ...options].map((opt) => (
            <button
              key={opt || "__all__"}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                width: "100%", textAlign: "left",
                background: opt === value ? "rgba(216,179,90,0.1)" : "transparent",
                border: "none", cursor: "pointer", padding: "9px 14px",
                fontFamily: "var(--font-antonio)", fontSize: "0.76rem",
                letterSpacing: "0.03em", textTransform: "uppercase",
                color: opt === "" ? "rgba(255,255,255,0.28)" : opt === value ? "#D8B35A" : "rgba(255,255,255,0.75)",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => {
                if (opt !== value) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (opt !== value) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {opt || `Všetky`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function scrollToId(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

export default function HeroUI({ onSearch }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [city, setCity] = useState("");
  const [match, setMatch] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  function handleSearch() {
    onSearch?.({ city, match, date });
    document.getElementById("zapasy")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{
      position: "relative",
      height: "88vh",
      minHeight: "560px",
      display: "flex",
      flexDirection: "column",
      backgroundImage: "url(/stadium.avif)",
      backgroundSize: "cover",
      backgroundPosition: "center 32%",
      overflow: "hidden",
    }}>
      {/* Left readability scrim */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(to right, rgba(8,11,13,0.96) 0%, rgba(8,11,13,0.76) 36%, rgba(8,11,13,0.36) 62%, rgba(8,11,13,0.06) 84%)",
      }} />
      {/* Bottom fade for search bar legibility */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(to top, rgba(8,11,13,0.88) 0%, rgba(8,11,13,0) 38%)",
      }} />

      <style>{`
        @keyframes heroFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .hero-nav { animation: heroFadeIn 0.6s ease 0.1s both; }
        .hero-tag { animation: heroFadeIn 0.5s ease 0.3s both; }
        .hero-h1  { animation: heroFadeIn 0.8s cubic-bezier(.16,1,.3,1) 0.45s both; }
        .hero-sub { animation: heroFadeIn 0.6s ease 0.7s both; }
        .hero-bar { animation: heroFadeIn 0.5s ease 0.9s both; }
      `}</style>

      {/* NAV */}
      <nav className="hero-nav" style={{
        position: "relative", zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "1.2rem 1.4rem" : "1.8rem 3rem",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          {isMobile && <MobileNavMenu links={NAV_LINKS} activeHref="/" />}
          <span style={{
            fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700,
            letterSpacing: "0.45em", color: "var(--goolvia-gold)", textTransform: "uppercase",
          }}>GOOLVIA</span>
        </div>

        {/* Center nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "2.4rem" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.18em",
                textTransform: "uppercase", textDecoration: "none",
                color: "rgba(255,255,255,0.68)", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.68)"; }}
              >{label}</Link>
            ))}
          </div>
        )}

        {/* Right: gold separator + CTA */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "1px", height: "22px", background: "rgba(216,179,90,0.38)", marginRight: "22px" }} />
            <a
              href="#zapasy"
              onClick={scrollToId("zapasy")}
              style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.18em",
                textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap",
                color: "var(--goolvia-gold)", border: "1px solid var(--goolvia-gold)",
                padding: "0.58rem 1.4rem", transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--goolvia-gold)";
                el.style.color = "#080B0D";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.color = "var(--goolvia-gold)";
              }}
            >
              Vyžiadať ponuku
            </a>
          </div>
        )}
      </nav>

      {/* HERO BODY */}
      <div style={{
        position: "relative", zIndex: 1,
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "0 1.4rem" : "0 3rem",
        maxWidth: "680px",
      }}>
        <p className="hero-tag" style={{
          fontFamily: "var(--font-antonio)", fontSize: "0.72rem", letterSpacing: "0.32em",
          color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: "1.2rem",
        }}>
          Futbalové výlety
        </p>

        <h1 className="hero-h1" style={{
          fontFamily: "var(--font-antonio)", fontWeight: 700,
          fontSize: isMobile ? "clamp(3rem, 14vw, 4.8rem)" : "clamp(3.4rem, 8vw, 6.4rem)",
          lineHeight: 0.92, letterSpacing: "-0.02em",
          textTransform: "uppercase", marginBottom: "1.6rem",
        }}>
          <span style={{ color: "#eef0f6", display: "block" }}>ZAŽI TO</span>
          <span style={{ color: "var(--goolvia-gold)", display: "block" }}>NAŽIVO.</span>
        </h1>

        <p className="hero-sub" style={{
          fontFamily: "var(--font-geist)", fontSize: isMobile ? "0.9rem" : "1rem",
          lineHeight: 1.65, color: "rgba(255,255,255,0.68)",
          maxWidth: "400px", margin: 0,
        }}>
          Let, hotel aj vstupenka — jedno miesto, najlepšia cena, žiadny stres.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="hero-bar" style={{
        position: "relative", zIndex: 2,
        padding: isMobile ? "0 1.4rem 2rem" : "0 3rem 3rem",
      }}>
        <div style={{
          background: "rgba(8,11,13,0.72)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(216,179,90,0.16)",
          borderRadius: "14px",
          padding: isMobile ? "18px 16px 16px" : "20px 24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "flex-end",
          gap: isMobile ? "18px" : "0",
        }}>
          {isMobile ? (
            <>
              <SearchDropdown label="Mesto" placeholder="Všetky mestá" options={CITIES} value={city} onChange={setCity} />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
              <SearchDropdown label="Zápas" placeholder="Všetky zápasy" options={MATCH_OPTIONS} value={match} onChange={setMatch} />
              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
              <SearchDropdown label="Termín" placeholder="Všetky termíny" options={DATE_OPTIONS} value={date} onChange={setDate} />
              <button
                onClick={handleSearch}
                style={{
                  marginTop: "4px",
                  fontFamily: "var(--font-antonio)", fontSize: "0.72rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", fontWeight: 700,
                  background: "var(--goolvia-gold)", color: "#080B0D",
                  border: "none", borderRadius: "10px", padding: "14px 20px",
                  cursor: "pointer", transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Hľadať zájazdy →
              </button>
            </>
          ) : (
            <>
              <div style={{ flex: 1, paddingRight: "20px" }}>
                <SearchDropdown label="Mesto" placeholder="Všetky mestá" options={CITIES} value={city} onChange={setCity} />
              </div>
              <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)", alignSelf: "flex-end", marginBottom: "4px" }} />
              <div style={{ flex: 1.5, padding: "0 20px" }}>
                <SearchDropdown label="Zápas" placeholder="Všetky zápasy" options={MATCH_OPTIONS} value={match} onChange={setMatch} />
              </div>
              <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)", alignSelf: "flex-end", marginBottom: "4px" }} />
              <div style={{ flex: 1, paddingLeft: "20px" }}>
                <SearchDropdown label="Termín" placeholder="Všetky termíny" options={DATE_OPTIONS} value={date} onChange={setDate} />
              </div>
              <button
                onClick={handleSearch}
                style={{
                  flexShrink: 0, marginLeft: "20px",
                  fontFamily: "var(--font-antonio)", fontSize: "0.72rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", fontWeight: 700,
                  background: "var(--goolvia-gold)", color: "#080B0D",
                  border: "none", borderRadius: "10px",
                  padding: "13px 22px", cursor: "pointer",
                  whiteSpace: "nowrap", transition: "opacity 0.2s",
                  alignSelf: "flex-end",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Hľadať zájazdy →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
