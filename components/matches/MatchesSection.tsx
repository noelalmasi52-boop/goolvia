"use client";

import { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { MATCHES } from "./data";
export type { Hotel, Match } from "./data";
export { buildKiwiUrl, buildTicketUrl } from "./data";

const LEAGUES = ["ALL", "PREMIER LEAGUE", "LA LIGA", "SERIE A", "BUNDESLIGA"];

const PREMIUM_FEATURES = [
  { icon: "🗺️", title: "Kompletný itinerár", desc: "Minutu po minúte plán celého výletu — od odchodu z domu až po návrat." },
  { icon: "🚗", title: "Transfer zabezpečený", desc: "Uber alebo taxi z letiska priamo k hotelu, aj späť. Žiadne čakanie, žiadny stres." },
  { icon: "✅", title: "Check-in a doklady", desc: "Online check-in na let, potvrdenia a všetky doklady prichystané vopred na telefón." },
  { icon: "📞", title: "Podpora 24/7", desc: "Počas celého výletu sme k dispozícii — stačí zavolať a postaráme sa o zvyšok." },
  { icon: "🏨", title: "Výber hotela", desc: "Vyberieme ti najlepší hotel pri štadióne v danej cenovej kategórii a zarezervujeme." },
  { icon: "🎟️", title: "Vstupenky", desc: "Pomôžeme nájsť a zaobstarať vstupenky — v tribúne, na sektore, kde chceš sedieť." },
];

export default function MatchesSection() {
  const [active, setActive] = useState("ALL");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const filtered = active === "ALL"
    ? MATCHES
    : MATCHES.filter((m) => m.league === active);

  return (
    <section id="zapasy" style={{ background: "#0c1220", position: "relative", zIndex: 4 }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e8b84b33, transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "60px 20px 0" : "100px 40px 0" }}>

        <div style={{ marginBottom: "56px", maxWidth: "640px" }}>
          <p style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
            letterSpacing: "0.3em", color: "#e8b84b", textTransform: "uppercase", marginBottom: "16px",
          }}>
            Najlepšie ponuky tejto sezóny
          </p>
          <h2 style={{
            fontFamily: "var(--font-antonio)", fontSize: "clamp(2.6rem, 6vw, 5rem)",
            fontWeight: 700, color: "#eef0f6", lineHeight: 0.94,
            letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: "20px",
          }}>
            Najlacnejšie<br />
            <span style={{ color: "#e8b84b" }}>miesta</span> v Európe.
          </h2>
          <p style={{
            fontFamily: "var(--font-geist)", fontSize: "0.95rem",
            color: "#6080a8", lineHeight: 1.7,
          }}>
            Vyber zápas — uvidíš konkrétne hotely, lety aj vstupenky s najlepšími cenami. Všetko na jednom mieste.
          </p>
        </div>

        {/* League filters */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "40px", flexWrap: "wrap" }}>
          {LEAGUES.map((league) => (
            <button
              key={league}
              onClick={() => setActive(league)}
              style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
                letterSpacing: "0.18em", padding: "8px 16px",
                background: active === league ? "#e8b84b" : "transparent",
                color: active === league ? "#0c1220" : "#4a6080",
                border: `1px solid ${active === league ? "#e8b84b" : "#243452"}`,
                borderRadius: "6px", cursor: "pointer", transition: "all 0.18s ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                if (active !== league) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e8b84b55";
                  (e.currentTarget as HTMLElement).style.color = "#eef0f6";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== league) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                  (e.currentTarget as HTMLElement).style.color = "#4a6080";
                }
              }}
            >
              {league === "ALL" ? "Všetky" : league}
            </button>
          ))}
        </div>

        {/* Match grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "12px",
        }}>
          {filtered.map((match, i) => (
            <MatchCard key={`${match.home}-${match.away}-${i}`} match={match} />
          ))}
        </div>
      </div>

      {/* Premium service section */}
      <div id="ako-to-funguje" style={{ marginTop: isMobile ? "60px" : "120px", borderTop: "1px solid #243452", background: "#0e1828" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "60px 20px" : "100px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px", alignItems: "start" }}>
            <div>
              <p style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
                letterSpacing: "0.3em", color: "#e8b84b", textTransform: "uppercase", marginBottom: "16px",
              }}>
                Prémiová služba
              </p>
              <h2 style={{
                fontFamily: "var(--font-antonio)", fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 700, color: "#eef0f6", lineHeight: 1,
                textTransform: "uppercase", marginBottom: "24px",
              }}>
                Ty len prídeš.<br />
                <span style={{ color: "#e8b84b" }}>Zvyšok</span><br />
                zariadime my.
              </h2>
              <p style={{
                fontFamily: "var(--font-geist)", fontSize: "0.92rem",
                color: "#6080a8", lineHeight: 1.75, marginBottom: "36px",
              }}>
                Pre tých, ktorí chcú zažiť zápas bez starostí — postaráme sa o každý detail tvojho výletu. Od vstupeniek a hotela až po transfer a check-in. Dostupní kedykoľvek, po celý čas.
              </p>
              <a
                href="/ponuka"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontFamily: "var(--font-antonio)", fontSize: "0.72rem",
                  fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                  textDecoration: "none", color: "#0c1220",
                  background: "#e8b84b", padding: "14px 28px", borderRadius: "8px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Mám záujem →
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
              {PREMIUM_FEATURES.map(({ icon, title, desc }) => (
                <div key={title} style={{
                  background: "#131d2e", border: "1px solid #243452",
                  borderRadius: "10px", padding: "20px 18px",
                }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{icon}</div>
                  <div style={{
                    fontFamily: "var(--font-antonio)", fontSize: "0.82rem",
                    fontWeight: 700, color: "#eef0f6", textTransform: "uppercase",
                    letterSpacing: "0.05em", marginBottom: "8px",
                  }}>
                    {title}
                  </div>
                  <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.72rem", color: "#4a6080", lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
