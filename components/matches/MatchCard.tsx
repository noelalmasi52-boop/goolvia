"use client";

import { useState } from "react";
import type { Match } from "./MatchesSection";
import { buildBookingUrl, buildKiwiUrl, buildTicketUrl } from "./MatchesSection";

export default function MatchCard({ match }: { match: Match }) {
  const [hovered, setHovered] = useState(false);
  const saving = Math.round(((match.regular - match.price) / match.regular) * 100);
  const hotelUrl = buildBookingUrl(match.bookingCity, match.dateISO);
  const flightUrl = buildKiwiUrl(match.kiwiCity, match.dateISO);
  const ticketUrl = buildTicketUrl(match.home, match.away);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#161c2c" : "#0e1420",
        padding: "32px 28px",
        cursor: "pointer",
        transition: "background 0.2s ease",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Team color top bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
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

      {/* Teams */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}>
        {/* Home badge */}
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: match.homeCl + "22",
          border: `1.5px solid ${match.homeCl}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.6rem",
            fontWeight: 700,
            color: match.homeCl,
            letterSpacing: "0.05em",
          }}>
            {match.homeAbbr}
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#F5F0E8",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}>
            {match.home}
          </div>
          <div style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.65rem",
            color: "#444",
            letterSpacing: "0.2em",
            marginTop: "3px",
          }}>
            VS
          </div>
          <div style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#F5F0E8",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}>
            {match.away}
          </div>
        </div>

        {/* Away badge */}
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: match.awayCl + "22",
          border: `1.5px solid ${match.awayCl}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.6rem",
            fontWeight: 700,
            color: match.awayCl,
            letterSpacing: "0.05em",
          }}>
            {match.awayAbbr}
          </span>
        </div>
      </div>

      {/* Venue */}
      <div style={{
        fontFamily: "var(--font-geist)",
        fontSize: "0.75rem",
        color: "#555",
        letterSpacing: "0.04em",
      }}>
        {match.stadium} · {match.city}, {match.country}
      </div>

      {/* Pricing row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "16px",
        borderTop: "1px solid #141414",
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#C8963C",
            lineHeight: 1,
          }}>
            from €{match.price}
          </div>
          <div style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.68rem",
            color: "#444",
            marginTop: "4px",
            textDecoration: "line-through",
          }}>
            Regular ~€{match.regular}
          </div>
        </div>

        <div style={{
          fontFamily: "var(--font-antonio)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          padding: "5px 10px",
          background: "#C8963C18",
          border: "1px solid #C8963C33",
          color: "#C8963C",
        }}>
          −{saving}%
        </div>
      </div>

      {/* CTA Buttons */}
      <div style={{ display: "flex", gap: "6px" }}>
        <a
          href={hotelUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 8px",
            background: "#C8963C",
            color: "#0c1018",
            fontFamily: "var(--font-antonio)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          Hotel
        </a>
        <a
          href={flightUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 8px",
            background: "transparent",
            color: "#F5F0E8",
            fontFamily: "var(--font-antonio)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid #2a3040",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#C8963C55";
            (e.currentTarget as HTMLElement).style.color = "#C8963C";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#2a3040";
            (e.currentTarget as HTMLElement).style.color = "#F5F0E8";
          }}
        >
          Let
        </a>
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 8px",
            background: "transparent",
            color: "#F5F0E8",
            fontFamily: "var(--font-antonio)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid #2a3040",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#C8963C55";
            (e.currentTarget as HTMLElement).style.color = "#C8963C";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#2a3040";
            (e.currentTarget as HTMLElement).style.color = "#F5F0E8";
          }}
        >
          Lístok
        </a>
      </div>
    </div>
  );
}
