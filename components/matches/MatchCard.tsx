"use client";

import { useState, useEffect } from "react";
import type { Match } from "./MatchesSection";
import { buildBookingUrl, buildKiwiUrl, buildTicketUrl } from "./MatchesSection";

export default function MatchCard({ match }: { match: Match }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const hotelUrl = buildBookingUrl(match.bookingCity, match.dateISO);
  const flightUrl = buildKiwiUrl(match.kiwiCity, match.dateISO);
  const ticketUrl = buildTicketUrl(match.home, match.away);
  const total = match.ticketFrom + match.hotelFrom + match.flightFrom;

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setOpen(true)}
        style={{
          background: "#10141e",
          border: "1px solid #1a2030",
          borderRadius: "12px",
          padding: "24px",
          cursor: "pointer",
          transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "#d4a84355";
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 8px 32px #00000044";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = "#1a2030";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, ${match.homeCl}99, ${match.awayCl}99)`,
          borderRadius: "12px 12px 0 0",
        }} />

        {/* League + date */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <span style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.6rem",
            letterSpacing: "0.22em", color: "#3a4560", textTransform: "uppercase",
          }}>
            {match.league}
          </span>
          <span style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#3a4560" }}>
            {match.date} · {match.time}
          </span>
        </div>

        {/* Teams */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: match.homeCl + "18", border: `1px solid ${match.homeCl}44`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.54rem", fontWeight: 700, color: match.homeCl }}>
              {match.homeAbbr}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700,
              color: "#eef0f6", textTransform: "uppercase", lineHeight: 1.15,
            }}>
              {match.home}
            </div>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#2a3450", letterSpacing: "0.18em", margin: "3px 0" }}>
              VS
            </div>
            <div style={{
              fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700,
              color: "#eef0f6", textTransform: "uppercase", lineHeight: 1.15,
            }}>
              {match.away}
            </div>
          </div>
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: match.awayCl + "18", border: `1px solid ${match.awayCl}44`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.54rem", fontWeight: 700, color: match.awayCl }}>
              {match.awayAbbr}
            </span>
          </div>
        </div>

        {/* Venue */}
        <div style={{
          fontFamily: "var(--font-geist)", fontSize: "0.7rem", color: "#3a4560",
          marginBottom: "20px",
        }}>
          {match.stadium} · {match.city}
        </div>

        {/* Price row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "16px", borderTop: "1px solid #151c2a",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#3a4560", marginBottom: "3px" }}>
              celkovo od
            </div>
            <div style={{
              fontFamily: "var(--font-antonio)", fontSize: "1.5rem", fontWeight: 700,
              color: "#d4a843", lineHeight: 1,
            }}>
              €{total}
            </div>
          </div>
          <div style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.62rem", letterSpacing: "0.14em",
            color: "#d4a843", padding: "8px 14px",
            border: "1px solid #d4a84344", borderRadius: "6px",
          }}>
            Zobraziť ponuky →
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(5,7,12,0.8)",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0f131c",
              border: "1px solid #1e2638",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "520px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Modal header */}
            <div style={{
              padding: "24px 28px 20px",
              borderBottom: "1px solid #151c2a",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, ${match.homeCl}, ${match.awayCl})`,
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{
                    fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
                    letterSpacing: "0.22em", color: "#3a4560", textTransform: "uppercase", marginBottom: "6px",
                  }}>
                    {match.league} · {match.date} · {match.time}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-antonio)", fontSize: "1.4rem", fontWeight: 700,
                    color: "#eef0f6", textTransform: "uppercase", lineHeight: 1.1,
                  }}>
                    {match.home} <span style={{ color: "#2a3450" }}>vs</span> {match.away}
                  </div>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.7rem", color: "#3a4560", marginTop: "6px" }}>
                    {match.stadium} · {match.city}, {match.country}
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "#161c2a", border: "1px solid #1e2638",
                    color: "#5a6278", borderRadius: "8px",
                    width: "32px", height: "32px", cursor: "pointer",
                    fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginLeft: "16px",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Offer rows */}
            <div style={{ padding: "16px 28px", display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* Hotel row */}
              <a href={hotelUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 18px", background: "#131825",
                  border: "1px solid #1e2638", borderRadius: "10px",
                  transition: "border-color 0.15s, background 0.15s", cursor: "pointer",
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#d4a84366";
                    (e.currentTarget as HTMLElement).style.background = "#161d2c";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e2638";
                    (e.currentTarget as HTMLElement).style.background = "#131825";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "8px",
                      background: "#d4a84314", border: "1px solid #d4a84330",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem",
                    }}>🏨</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.85rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", letterSpacing: "0.06em" }}>Hotel</div>
                      <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#3a4560", marginTop: "2px" }}>
                        Booking.com · {match.city} · 2 noci
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.15rem", fontWeight: 700, color: "#d4a843" }}>od €{match.hotelFrom}</div>
                    <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#3a4560" }}>/ noc</div>
                  </div>
                </div>
              </a>

              {/* Flight row */}
              <a href={flightUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 18px", background: "#131825",
                  border: "1px solid #1e2638", borderRadius: "10px",
                  transition: "border-color 0.15s, background 0.15s", cursor: "pointer",
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#d4a84366";
                    (e.currentTarget as HTMLElement).style.background = "#161d2c";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e2638";
                    (e.currentTarget as HTMLElement).style.background = "#131825";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "8px",
                      background: "#ffffff08", border: "1px solid #1e2638",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem",
                    }}>✈️</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.85rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", letterSpacing: "0.06em" }}>Let</div>
                      <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#3a4560", marginTop: "2px" }}>
                        Kiwi.com · Bratislava → {match.city} · spiatočný
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.15rem", fontWeight: 700, color: "#eef0f6" }}>od €{match.flightFrom}</div>
                    <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#3a4560" }}>spiatočný</div>
                  </div>
                </div>
              </a>

              {/* Ticket row */}
              <a href={ticketUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 18px", background: "#131825",
                  border: "1px solid #1e2638", borderRadius: "10px",
                  transition: "border-color 0.15s, background 0.15s", cursor: "pointer",
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#d4a84366";
                    (e.currentTarget as HTMLElement).style.background = "#161d2c";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e2638";
                    (e.currentTarget as HTMLElement).style.background = "#131825";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "8px",
                      background: "#ffffff08", border: "1px solid #1e2638",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem",
                    }}>🎟️</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.85rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", letterSpacing: "0.06em" }}>Vstupenka</div>
                      <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#3a4560", marginTop: "2px" }}>
                        Viagogo · {match.home} vs {match.away}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.15rem", fontWeight: 700, color: "#eef0f6" }}>od €{match.ticketFrom}</div>
                    <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#3a4560" }}>na osobu</div>
                  </div>
                </div>
              </a>
            </div>

            {/* Total + close */}
            <div style={{
              padding: "16px 28px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#3a4560", marginBottom: "3px" }}>
                  Celkovo od
                </div>
                <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.6rem", fontWeight: 700, color: "#d4a843" }}>
                  €{total}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.68rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "12px 22px", background: "#161c2a",
                  border: "1px solid #1e2638", color: "#5a6278",
                  borderRadius: "8px", cursor: "pointer",
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
