"use client";

import { useState } from "react";
import type { Match } from "./MatchesSection";
import { buildBookingUrl, buildKiwiUrl, buildTicketUrl } from "./MatchesSection";

export default function MatchCard({ match }: { match: Match }) {
  const [hovered, setHovered] = useState(false);
  const hotelUrl = buildBookingUrl(match.bookingCity, match.dateISO);
  const flightUrl = buildKiwiUrl(match.kiwiCity, match.dateISO);
  const ticketUrl = buildTicketUrl(match.home, match.away);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#161c2c" : "#0e1420",
        padding: "28px 24px",
        transition: "background 0.2s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
    >
      {/* Team color top bar */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, ${match.homeCl}, ${match.awayCl})`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.25s ease",
      }} />

      {/* League + date row */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}>
        <span style={{
          fontFamily: "var(--font-antonio)",
          fontSize: "0.62rem",
          letterSpacing: "0.25em",
          color: "#444",
          textTransform: "uppercase",
        }}>
          {match.league}
        </span>
        <span style={{
          fontFamily: "var(--font-geist)",
          fontSize: "0.7rem",
          color: "#555",
          letterSpacing: "0.05em",
        }}>
          {match.date} · {match.time}
        </span>
      </div>

      {/* Teams row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "12px",
      }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: match.homeCl + "22",
          border: `1.5px solid ${match.homeCl}55`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.55rem", fontWeight: 700, color: match.homeCl }}>
            {match.homeAbbr}
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "var(--font-antonio)", fontSize: "1.05rem", fontWeight: 700,
            color: "#F5F0E8", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.1,
          }}>
            {match.home}
          </div>
          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.6rem", color: "#333", letterSpacing: "0.2em", margin: "2px 0" }}>
            VS
          </div>
          <div style={{
            fontFamily: "var(--font-antonio)", fontSize: "1.05rem", fontWeight: 700,
            color: "#F5F0E8", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.1,
          }}>
            {match.away}
          </div>
        </div>

        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: match.awayCl + "22",
          border: `1.5px solid ${match.awayCl}55`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.55rem", fontWeight: 700, color: match.awayCl }}>
            {match.awayAbbr}
          </span>
        </div>
      </div>

      {/* Venue */}
      <div style={{
        fontFamily: "var(--font-geist)", fontSize: "0.72rem", color: "#444",
        letterSpacing: "0.03em", marginBottom: "20px",
      }}>
        📍 {match.stadium} · {match.city}, {match.country}
      </div>

      {/* Deal tiles — always visible */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "6px",
        marginBottom: "0",
      }}>
        {/* Hotel tile */}
        <a
          href={hotelUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div style={{
            background: "#C8963C12",
            border: "1px solid #C8963C33",
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C8963C22";
              (e.currentTarget as HTMLElement).style.borderColor = "#C8963C88";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C8963C12";
              (e.currentTarget as HTMLElement).style.borderColor = "#C8963C33";
            }}
          >
            <span style={{ fontSize: "1rem" }}>🏨</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
              color: "#888", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>Hotel</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "1rem",
              fontWeight: 700, color: "#C8963C", lineHeight: 1,
            }}>
              od €{match.hotelFrom}
            </span>
            <span style={{
              fontFamily: "var(--font-geist)", fontSize: "0.58rem",
              color: "#555", letterSpacing: "0.05em",
            }}>/ noc</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.6rem",
              color: "#C8963C", letterSpacing: "0.12em",
              marginTop: "4px", textTransform: "uppercase",
            }}>Rezervovať →</span>
          </div>
        </a>

        {/* Flight tile */}
        <a
          href={flightUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div style={{
            background: "#ffffff08",
            border: "1px solid #2a3040",
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C8963C10";
              (e.currentTarget as HTMLElement).style.borderColor = "#C8963C55";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#ffffff08";
              (e.currentTarget as HTMLElement).style.borderColor = "#2a3040";
            }}
          >
            <span style={{ fontSize: "1rem" }}>✈️</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
              color: "#888", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>Let</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "1rem",
              fontWeight: 700, color: "#F5F0E8", lineHeight: 1,
            }}>
              od €{match.flightFrom}
            </span>
            <span style={{
              fontFamily: "var(--font-geist)", fontSize: "0.58rem",
              color: "#555", letterSpacing: "0.05em",
            }}>spiatočný</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.6rem",
              color: "#C8963C", letterSpacing: "0.12em",
              marginTop: "4px", textTransform: "uppercase",
            }}>Hľadať →</span>
          </div>
        </a>

        {/* Ticket tile */}
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div style={{
            background: "#ffffff08",
            border: "1px solid #2a3040",
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#C8963C10";
              (e.currentTarget as HTMLElement).style.borderColor = "#C8963C55";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#ffffff08";
              (e.currentTarget as HTMLElement).style.borderColor = "#2a3040";
            }}
          >
            <span style={{ fontSize: "1rem" }}>🎟️</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
              color: "#888", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>Lístok</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "1rem",
              fontWeight: 700, color: "#F5F0E8", lineHeight: 1,
            }}>
              od €{match.ticketFrom}
            </span>
            <span style={{
              fontFamily: "var(--font-geist)", fontSize: "0.58rem",
              color: "#555", letterSpacing: "0.05em",
            }}>na osobu</span>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.6rem",
              color: "#C8963C", letterSpacing: "0.12em",
              marginTop: "4px", textTransform: "uppercase",
            }}>Kúpiť →</span>
          </div>
        </a>
      </div>
    </div>
  );
}
