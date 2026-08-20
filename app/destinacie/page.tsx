"use client";

import { useState, useEffect } from "react";
import SubPageNav from "@/components/layout/SubPageNav";
import MatchCard from "@/components/matches/MatchCard";
import { MATCHES } from "@/components/matches/data";
import type { Match } from "@/components/matches/data";

type Club = {
  id: number;
  name: string;
  abbr: string;
  league: string;
  color: string;
  slug: string;
  crestUrl?: string;
};

const CLUBS: Club[] = [
  { id: 86,  name: "Real Madrid",   abbr: "RM",  league: "La Liga",        color: "#FEBE10", slug: "REAL MADRID" },
  { id: 81,  name: "FC Barcelona",  abbr: "FCB", league: "La Liga",        color: "#A50044", slug: "BARCELONA" },
  { id: 78,  name: "Atlético",      abbr: "ATM", league: "La Liga",        color: "#CE3524", slug: "ATLETICO" },
  { id: 64,  name: "Liverpool",     abbr: "LIV", league: "Premier League", color: "#C8102E", slug: "LIVERPOOL" },
  { id: 65,  name: "Man City",      abbr: "MCI", league: "Premier League", color: "#6CABDD", slug: "MAN CITY" },
  { id: 57,  name: "Arsenal",       abbr: "ARS", league: "Premier League", color: "#EF0107", slug: "ARSENAL" },
  { id: 61,  name: "Chelsea",       abbr: "CHE", league: "Premier League", color: "#034694", slug: "CHELSEA" },
  { id: 66,  name: "Man United",    abbr: "MNU", league: "Premier League", color: "#DA291C", slug: "MAN UNITED" },
  { id: 73,  name: "Tottenham",     abbr: "TOT", league: "Premier League", color: "#132257", slug: "TOTTENHAM" },
  { id: 5,   name: "Bayern Munich", abbr: "BAY", league: "Bundesliga",     color: "#DC052D", slug: "BAYERN" },
  { id: 4,   name: "Dortmund",      abbr: "BVB", league: "Bundesliga",     color: "#FDE100", slug: "DORTMUND" },
  { id: 108, name: "Inter Milan",   abbr: "INT", league: "Serie A",        color: "#0068A8", slug: "INTER" },
  { id: 98,  name: "AC Milan",      abbr: "MIL", league: "Serie A",        color: "#FB090B", slug: "AC MILAN" },
  { id: 109, name: "Juventus",      abbr: "JUV", league: "Serie A",        color: "#ffffff", slug: "JUVENTUS" },
  { id: 113, name: "Napoli",        abbr: "NAP", league: "Serie A",        color: "#12A0D7", slug: "NAPOLI",
    crestUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg" },
  { id: 529, name: "PSG",           abbr: "PSG", league: "Ligue 1",        color: "#003D7C", slug: "PSG" },
];

function getClubMatches(club: Club): Match[] {
  return MATCHES.filter(
    (m) => m.home === club.slug || m.away === club.slug
  );
}

function ClubCrest({ club, size = 56 }: { club: Club; size?: number }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{
      width: size, height: size,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {!err ? (
        <img
          src={club.crestUrl ?? `https://crests.football-data.org/${club.id}.svg`}
          alt={club.name}
          width={size} height={size}
          style={{ objectFit: "contain", display: "block" }}
          onError={() => setErr(true)}
        />
      ) : (
        <span style={{
          fontFamily: "var(--font-antonio)", fontWeight: 700,
          fontSize: size * 0.28 + "px", color: club.color,
          letterSpacing: "0.05em",
        }}>
          {club.abbr}
        </span>
      )}
    </div>
  );
}

export default function DestinacieePage() {
  const [selected, setSelected] = useState<Club | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const clubMatches = selected ? getClubMatches(selected) : [];

  return (
    <div style={{ minHeight: "100vh", background: "#080b12" }}>
      <SubPageNav />

      {/* Header */}
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: isMobile ? "52px 20px 40px" : "80px 40px 60px",
      }}>
        <p style={{
          fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
          letterSpacing: "0.3em", color: "#e8b84b",
          textTransform: "uppercase", marginBottom: "14px",
        }}>
          Vyber klub
        </p>
        <h1 style={{
          fontFamily: "var(--font-antonio)", fontWeight: 700,
          fontSize: isMobile ? "clamp(2.8rem, 11vw, 4rem)" : "clamp(3.5rem, 7vw, 6rem)",
          lineHeight: 0.92, letterSpacing: "-0.02em",
          textTransform: "uppercase", color: "#eef0f6",
          marginBottom: "20px",
        }}>
          Destinácie
        </h1>
        <p style={{
          fontFamily: "var(--font-geist)", fontSize: "0.95rem",
          color: "#6080a8", lineHeight: 1.65, maxWidth: "520px",
        }}>
          Vyber klub a pozri si dostupné zápasy, lety, hotely a vstupenky — všetko na jednom mieste.
        </p>
      </div>

      {/* Club grid */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "0 20px" : "0 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: "10px",
        }}>
          {CLUBS.map((club) => {
            const matches = getClubMatches(club);
            const hasMatches = matches.length > 0;
            const isSelected = selected?.id === club.id;

            return (
              <button
                key={club.id}
                onClick={() => setSelected(isSelected ? null : club)}
                style={{
                  background: isSelected ? "#1a2740" : "#0f1828",
                  border: isSelected
                    ? `1px solid ${club.color}88`
                    : hasMatches
                    ? "1px solid #243452"
                    : "1px solid #182030",
                  borderRadius: "12px",
                  padding: isMobile ? "20px 12px" : "28px 16px",
                  cursor: "pointer",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "14px",
                  position: "relative", overflow: "hidden",
                  transition: "border-color 0.2s, background 0.2s, transform 0.18s",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor = club.color + "55";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor = hasMatches ? "#243452" : "#182030";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }
                }}
              >
                {/* Top color line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: hasMatches ? club.color : "#1e2c40",
                  opacity: hasMatches ? 0.7 : 0.3,
                }} />

                <ClubCrest club={club} size={isMobile ? 64 : 84} />

                <div>
                  <div style={{
                    fontFamily: "var(--font-antonio)", fontWeight: 700,
                    fontSize: isMobile ? "0.82rem" : "0.95rem",
                    color: "#eef0f6", textTransform: "uppercase",
                    letterSpacing: "0.04em", lineHeight: 1.2,
                    marginBottom: "4px",
                  }}>
                    {club.name}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-geist)", fontSize: "0.58rem",
                    color: "#4a6080", letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}>
                    {club.league}
                  </div>
                </div>

                <div style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "4px 10px", borderRadius: "4px",
                  background: hasMatches ? club.color + "18" : "#182030",
                  color: hasMatches ? club.color : "#2e4060",
                  border: `1px solid ${hasMatches ? club.color + "44" : "#1e2c40"}`,
                }}>
                  {hasMatches ? `${matches.length} zápas${matches.length > 1 ? "y" : ""}` : "Hamarosan"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected club matches */}
        {selected && (
          <div style={{ marginTop: "60px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "16px",
              marginBottom: "32px",
            }}>
              <ClubCrest club={selected} size={56} />
              <div>
                <p style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.6rem",
                  letterSpacing: "0.25em", color: "#4a6080",
                  textTransform: "uppercase", marginBottom: "2px",
                }}>
                  Dostupné zápasy
                </p>
                <h2 style={{
                  fontFamily: "var(--font-antonio)", fontWeight: 700,
                  fontSize: "1.6rem", color: "#eef0f6",
                  textTransform: "uppercase", lineHeight: 1,
                }}>
                  {selected.name}
                </h2>
              </div>
            </div>

            {clubMatches.length > 0 ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "12px",
              }}>
                {clubMatches.map((match, i) => (
                  <MatchCard key={i} match={match} />
                ))}
              </div>
            ) : (
              <div style={{
                padding: "48px 32px", textAlign: "center",
                background: "#0f1828", border: "1px solid #182030",
                borderRadius: "12px",
              }}>
                <p style={{
                  fontFamily: "var(--font-antonio)", fontSize: "1rem",
                  color: "#2e4060", textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  Pre tento klub momentálne nemáme zápasy
                </p>
                <p style={{
                  fontFamily: "var(--font-geist)", fontSize: "0.8rem",
                  color: "#243452", marginTop: "8px",
                }}>
                  Sleduj nás — pridávame nové zápasy každý týždeň.
                </p>
              </div>
            )}

            <div style={{ marginTop: "40px", paddingBottom: "80px" }}>
              <button
                onClick={() => setSelected(null)}
                style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.65rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  background: "transparent", border: "1px solid #243452",
                  color: "#4a6080", padding: "0.55rem 1.4rem",
                  cursor: "pointer", borderRadius: "6px",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e8b84b55";
                  (e.currentTarget as HTMLElement).style.color = "#eef0f6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                  (e.currentTarget as HTMLElement).style.color = "#4a6080";
                }}
              >
                ← Späť na všetky kluby
              </button>
            </div>
          </div>
        )}

        {!selected && <div style={{ paddingBottom: "100px" }} />}
      </div>
    </div>
  );
}
