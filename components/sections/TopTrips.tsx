"use client";

import { MATCHES } from "@/components/matches/data";

export default function TopTrips() {
  const featured = MATCHES.filter(m => m.featured).slice(0, 3);

  return (
    <section style={{ background: "#F4F1EA" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(60px,8vw,96px) clamp(20px,4vw,60px)" }}>

        {/* Header */}
        <div style={{ marginBottom: "52px" }}>
          <p style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.32em",
            color: "#8C7A56", textTransform: "uppercase", marginBottom: "14px",
          }}>
            Top zájazdy
          </p>
          <h2 style={{
            fontFamily: "var(--font-antonio)", fontWeight: 700,
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
            textTransform: "uppercase", color: "#1A1208",
            lineHeight: 0.94, letterSpacing: "-0.01em",
          }}>
            Najobľúbenejšie<br />
            <span style={{ color: "#D8B35A" }}>destinácie</span> sezóny.
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}>
          {featured.map((match) => {
            const cheapestHotel = Math.min(...match.hotels.filter(h => !h.isHostel).map(h => h.pricePerNight));
            const total = match.ticketFrom + cheapestHotel * 3 + match.flightFrom;

            return (
              <a
                key={`${match.home}-${match.away}`}
                href="#zapasy"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("zapasy")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    transition: "transform 0.22s ease, box-shadow 0.22s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.13)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
                  }}
                >
                  {/* Image */}
                  <div style={{
                    height: "180px",
                    backgroundImage: "url(/stadium.avif)",
                    backgroundSize: "cover",
                    backgroundPosition: "center 40%",
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 55%)",
                    }} />
                    <div style={{
                      position: "absolute", top: "14px", left: "14px",
                      fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "#D8B35A",
                      background: "rgba(8,11,13,0.72)", backdropFilter: "blur(4px)",
                      borderRadius: "5px", padding: "3px 9px",
                    }}>{match.league}</div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px 22px 22px" }}>
                    <div style={{
                      fontFamily: "var(--font-antonio)", fontSize: "1.05rem", fontWeight: 700,
                      color: "#1A1208", textTransform: "uppercase", lineHeight: 1.1,
                      marginBottom: "10px",
                    }}>
                      {match.home}{" "}
                      <span style={{ color: "#9E8B68", fontWeight: 400, fontSize: "0.9rem" }}>vs</span>{" "}
                      {match.away}
                    </div>

                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
                      <span style={{ fontFamily: "var(--font-geist)", fontSize: "0.72rem", color: "#8C7A56" }}>
                        {match.date}
                      </span>
                      <span style={{ fontFamily: "var(--font-geist)", fontSize: "0.72rem", color: "#8C7A56" }}>
                        {match.city}, {match.country}
                      </span>
                    </div>

                    <div style={{
                      borderTop: "1px solid #EBE6DA",
                      paddingTop: "14px",
                      display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                    }}>
                      <div>
                        <div style={{
                          fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.2em",
                          color: "#8C7A56", textTransform: "uppercase", marginBottom: "4px",
                        }}>
                          od osoby
                        </div>
                        <div style={{
                          fontFamily: "var(--font-antonio)", fontSize: "1.6rem", fontWeight: 700,
                          color: "#D8B35A", lineHeight: 1,
                        }}>
                          €{total}
                        </div>
                        <div style={{
                          fontFamily: "var(--font-geist)", fontSize: "0.58rem",
                          color: "#9E8B68", marginTop: "3px",
                        }}>
                          let + 3 noci + vstupenka
                        </div>
                      </div>

                      <div style={{
                        fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.12em",
                        textTransform: "uppercase", color: "#D8B35A",
                        border: "1px solid #D8B35A", padding: "7px 14px", borderRadius: "7px",
                      }}>
                        Pozrieť →
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Show all */}
        <div style={{ marginTop: "44px", textAlign: "center" }}>
          <a
            href="#zapasy"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("zapasy")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.72rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#8C7A56", textDecoration: "none",
              borderBottom: "1px solid #C0B090", paddingBottom: "2px",
            }}
          >
            Zobraziť všetky zápasy →
          </a>
        </div>
      </div>
    </section>
  );
}
