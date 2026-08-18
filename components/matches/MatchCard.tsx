"use client";

import { useState, useEffect } from "react";
import type { Match } from "./data";
import { buildKiwiUrl, buildTicketUrl } from "./data";

function Stars({ n }: { n: number }) {
  return (
    <span style={{ color: "#e8b84b", fontSize: "0.6rem", letterSpacing: "1px" }}>
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </span>
  );
}

function Badge({ src, abbr, color }: { src: string; abbr: string; color: string }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{
      width: "44px", height: "44px", borderRadius: "50%",
      background: color + "18", border: `1.5px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, overflow: "hidden",
    }}>
      {!err ? (
        <img
          src={src} alt={abbr}
          width={28} height={28}
          style={{ objectFit: "contain", display: "block" }}
          onError={() => setErr(true)}
        />
      ) : (
        <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.55rem", fontWeight: 700, color }}>
          {abbr}
        </span>
      )}
    </div>
  );
}

type Tab = "hotel" | "let" | "listok";

export default function MatchCard({ match }: { match: Match }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("hotel");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const flightUrl = buildKiwiUrl(match.kiwiCity, match.dateISO);
  const ticketUrl = buildTicketUrl(match.home, match.away);
  const cheapestHotel = match.hotels[0].pricePerNight;
  const total = match.ticketFrom + cheapestHotel + match.flightFrom;

  return (
    <>
      {/* Card */}
      <div
        onClick={() => { setOpen(true); setTab("hotel"); }}
        style={{
          background: "#131d2e", border: "1px solid #243452", borderRadius: "12px",
          padding: "24px", cursor: "pointer",
          transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
          position: "relative", overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "#e8b84b55";
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 8px 32px #00000060";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "#243452";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, ${match.homeCl}99, ${match.awayCl}99)`,
          borderRadius: "12px 12px 0 0",
        }} />

        {/* League + date */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", letterSpacing: "0.22em", color: "#4a6080", textTransform: "uppercase" }}>
            {match.league}
          </span>
          <span style={{ fontFamily: "var(--font-geist)", fontSize: "0.66rem", color: "#4a6080" }}>
            {match.date} · {match.time}
          </span>
        </div>

        {/* Teams with badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
          <Badge src={match.homeBadge} abbr={match.homeAbbr} color={match.homeCl} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.05rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", lineHeight: 1.2 }}>
              {match.home}
            </div>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.55rem", color: "#2e4060", letterSpacing: "0.18em", margin: "4px 0" }}>VS</div>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.05rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", lineHeight: 1.2 }}>
              {match.away}
            </div>
          </div>
          <Badge src={match.awayBadge} abbr={match.awayAbbr} color={match.awayCl} />
        </div>

        {/* Venue */}
        <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: "20px" }}>
          {match.stadium} · {match.city}
        </div>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid #1c2c40" }}>
          <div>
            <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.6rem", color: "#4a6080", marginBottom: "3px" }}>celkovo od</div>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.5rem", fontWeight: 700, color: "#e8b84b", lineHeight: 1 }}>
              €{total}
            </div>
          </div>
          <div style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.6rem", letterSpacing: "0.14em",
            color: "#e8b84b", padding: "8px 14px", border: "1px solid #e8b84b44", borderRadius: "6px",
          }}>
            Mám záujem →
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(4,6,10,0.82)", backdropFilter: "blur(14px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0f1828", border: "1px solid #243452", borderRadius: "16px",
              width: "100%", maxWidth: "560px",
              maxHeight: "90vh", display: "flex", flexDirection: "column",
              boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
              overflow: "hidden",
            }}
          >
            {/* Modal header */}
            <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #1a2840", flexShrink: 0, position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, ${match.homeCl}, ${match.awayCl})`,
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                  <Badge src={match.homeBadge} abbr={match.homeAbbr} color={match.homeCl} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.56rem", letterSpacing: "0.2em", color: "#4a6080", textTransform: "uppercase", marginBottom: "4px" }}>
                      {match.league} · {match.date}
                    </div>
                    <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.15rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", lineHeight: 1.1 }}>
                      {match.home} <span style={{ color: "#2e4060" }}>vs</span> {match.away}
                    </div>
                    <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.66rem", color: "#4a6080", marginTop: "4px" }}>
                      {match.stadium} · {match.city}
                    </div>
                  </div>
                  <Badge src={match.awayBadge} abbr={match.awayAbbr} color={match.awayCl} />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "#1a2840", border: "1px solid #243452", color: "#3a4a62",
                    borderRadius: "8px", width: "30px", height: "30px", cursor: "pointer",
                    fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >✕</button>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "4px", marginTop: "16px" }}>
                {([
                  { key: "hotel", label: `🏨 Ubytovanie` },
                  { key: "let", label: `✈️ Let` },
                  { key: "listok", label: `🎟️ Vstupenka` },
                ] as { key: Tab; label: string }[]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    style={{
                      fontFamily: "var(--font-antonio)", fontSize: "0.64rem", letterSpacing: "0.1em",
                      padding: "7px 14px", borderRadius: "6px", cursor: "pointer",
                      border: tab === key ? "1px solid #e8b84b66" : "1px solid #243452",
                      background: tab === key ? "#e8b84b14" : "transparent",
                      color: tab === key ? "#e8b84b" : "#3a4a62",
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ overflowY: "auto", flex: 1 }}>

              {/* HOTEL TAB */}
              {tab === "hotel" && (
                <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: "4px", paddingLeft: "4px" }}>
                    Hotely v blízkosti štadióna · 2 noci
                  </div>
                  {match.hotels.map((hotel, i) => (
                    <a key={i} href={hotel.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 16px", background: "#121c2e",
                          border: "1px solid #243452", borderRadius: "10px",
                          transition: "border-color 0.15s, background 0.15s", cursor: "pointer", gap: "12px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#e8b84b60";
                          (e.currentTarget as HTMLElement).style.background = "#1a2a42";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                          (e.currentTarget as HTMLElement).style.background = "#121c2e";
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            {i === 0 && (
                              <span style={{
                                fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.15em",
                                color: "#0a0c12", background: "#e8b84b", padding: "2px 6px", borderRadius: "3px",
                              }}>
                                NAJLACNEJŠÍ
                              </span>
                            )}
                            <Stars n={hotel.stars} />
                          </div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, color: "#eef0f6", lineHeight: 1.2 }}>
                            {hotel.name}
                          </div>
                          <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#4a6080", marginTop: "4px" }}>
                            {hotel.distanceKm} km od štadióna
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700, color: i === 0 ? "#e8b84b" : "#eef0f6" }}>
                            €{hotel.pricePerNight}
                          </div>
                          <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.58rem", color: "#4a6080" }}>/ noc</div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#e8b84b", marginTop: "6px", letterSpacing: "0.1em" }}>
                            Rezervovať →
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* LET TAB */}
              {tab === "let" && (
                <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: "4px", paddingLeft: "4px" }}>
                    Lety z Bratislavy · spiatočné · deň pred zápasom
                  </div>
                  {[
                    { airline: "Ryanair", dep: "06:45", arr: "08:30", price: match.flightFrom },
                    { airline: "Wizz Air", dep: "11:20", arr: "13:10", price: match.flightFrom + 12 },
                    { airline: "easyJet", dep: "14:55", arr: "16:45", price: match.flightFrom + 24 },
                  ].map((flight, i) => (
                    <a key={i} href={flightUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 16px", background: "#121c2e",
                          border: "1px solid #243452", borderRadius: "10px",
                          transition: "border-color 0.15s, background 0.15s", cursor: "pointer", gap: "12px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#e8b84b60";
                          (e.currentTarget as HTMLElement).style.background = "#1a2a42";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                          (e.currentTarget as HTMLElement).style.background = "#121c2e";
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          {i === 0 && (
                            <span style={{
                              fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.15em",
                              color: "#0a0c12", background: "#e8b84b", padding: "2px 6px", borderRadius: "3px",
                              display: "inline-block", marginBottom: "6px",
                            }}>
                              NAJLACNEJŠÍ
                            </span>
                          )}
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, color: "#eef0f6" }}>
                            {flight.airline}
                          </div>
                          <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#4a6080", marginTop: "4px" }}>
                            BTS → {match.city} · {flight.dep} – {flight.arr} · spiatočný
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700, color: i === 0 ? "#e8b84b" : "#eef0f6" }}>
                            od €{flight.price}
                          </div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#e8b84b", marginTop: "6px", letterSpacing: "0.1em" }}>
                            Hľadať →
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* LISTOK TAB */}
              {tab === "listok" && (
                <div style={{ padding: "14px 18px" }}>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: "12px", paddingLeft: "4px" }}>
                    Vstupenky na zápas
                  </div>
                  <a href={ticketUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "20px 18px", background: "#121c2e",
                        border: "1px solid #243452", borderRadius: "10px",
                        transition: "border-color 0.15s, background 0.15s", cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#e8b84b60";
                        (e.currentTarget as HTMLElement).style.background = "#1a2a42";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                        (e.currentTarget as HTMLElement).style.background = "#121c2e";
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, color: "#eef0f6", marginBottom: "6px" }}>
                          Viagogo — {match.home} vs {match.away}
                        </div>
                        <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#4a6080" }}>
                          {match.stadium} · {match.date} · {match.time}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700, color: "#e8b84b" }}>
                          od €{match.ticketFrom}
                        </div>
                        <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#e8b84b", marginTop: "6px", letterSpacing: "0.1em" }}>
                          Kúpiť →
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: "14px 18px 18px", borderTop: "1px solid #1a2840", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.58rem", color: "#4a6080", marginBottom: "2px" }}>Celkovo od</div>
                <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.5rem", fontWeight: 700, color: "#e8b84b" }}>€{total}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.64rem", letterSpacing: "0.12em",
                  padding: "10px 20px", background: "#1a2840", border: "1px solid #243452",
                  color: "#3a4a62", borderRadius: "8px", cursor: "pointer", textTransform: "uppercase",
                }}
              >
                Zavrieť
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
