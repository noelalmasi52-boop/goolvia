"use client";

import { useState } from "react";
import MatchCard from "./MatchCard";

export type Match = {
  home: string;
  away: string;
  homeAbbr: string;
  awayAbbr: string;
  homeCl: string;
  awayCl: string;
  stadium: string;
  city: string;
  country: string;
  date: string;
  time: string;
  league: string;
  ticketFrom: number;
  hotelFrom: number;
  flightFrom: number;
  bookingCity: string;
  kiwiCity: string;
  dateISO: string;
};

// Placeholder affiliate IDs — replace with real ones when approved
const BOOKING_AID = "YOUR_BOOKING_AID";
const KIWI_AID = "YOUR_KIWI_AID";
const VIAGOGO_AID = "YOUR_VIAGOGO_AID";

export function buildBookingUrl(city: string, dateISO: string) {
  const checkIn = dateISO;
  const d = new Date(dateISO);
  d.setDate(d.getDate() + 2);
  const checkOut = d.toISOString().split("T")[0];
  return `https://www.booking.com/searchresults.html?aid=${BOOKING_AID}&ss=${encodeURIComponent(city)}&checkin=${checkIn}&checkout=${checkOut}&nflt=price%3D0-200`;
}

export function buildKiwiUrl(toCity: string, dateISO: string) {
  const d = new Date(dateISO);
  d.setDate(d.getDate() - 1);
  const depDate = d.toISOString().split("T")[0];
  return `https://www.kiwi.com/en/search/results/bratislava-slovakia/${encodeURIComponent(toCity)}/${depDate}/${dateISO}?affilid=${KIWI_AID}`;
}

export function buildTicketUrl(home: string, away: string) {
  const query = encodeURIComponent(`${home} ${away}`);
  return `https://www.viagogo.com/ww/Sports/Football/Matches?aid=${VIAGOGO_AID}&q=${query}`;
}

const MATCHES: Match[] = [
  {
    home: "MAN CITY", away: "ARSENAL",
    homeAbbr: "MC", awayAbbr: "ARS",
    homeCl: "#6CABDD", awayCl: "#EF0107",
    stadium: "Etihad Stadium", city: "Manchester", country: "ENG",
    date: "15 AUG", time: "17:30", league: "PREMIER LEAGUE",
    ticketFrom: 18, hotelFrom: 52, flightFrom: 34,
    bookingCity: "Manchester", kiwiCity: "manchester-united-kingdom", dateISO: "2026-08-15",
  },
  {
    home: "REAL MADRID", away: "BARCELONA",
    homeAbbr: "RM", awayAbbr: "FCB",
    homeCl: "#FEBE10", awayCl: "#A50044",
    stadium: "Santiago Bernabéu", city: "Madrid", country: "ESP",
    date: "22 AUG", time: "20:00", league: "LA LIGA",
    ticketFrom: 24, hotelFrom: 48, flightFrom: 29,
    bookingCity: "Madrid", kiwiCity: "madrid-spain", dateISO: "2026-08-22",
  },
  {
    home: "PSG", away: "MARSEILLE",
    homeAbbr: "PSG", awayAbbr: "OM",
    homeCl: "#004170", awayCl: "#2CBFEF",
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "29 AUG", time: "21:00", league: "LIGUE 1",
    ticketFrom: 15, hotelFrom: 61, flightFrom: 39,
    bookingCity: "Paris", kiwiCity: "paris-france", dateISO: "2026-08-29",
  },
  {
    home: "BAYERN", away: "DORTMUND",
    homeAbbr: "BAY", awayAbbr: "BVB",
    homeCl: "#DC052D", awayCl: "#FDE100",
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "05 SEP", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 16, hotelFrom: 44, flightFrom: 27,
    bookingCity: "Munich", kiwiCity: "munich-germany", dateISO: "2026-09-05",
  },
  {
    home: "INTER", away: "AC MILAN",
    homeAbbr: "INT", awayAbbr: "MIL",
    homeCl: "#0068A8", awayCl: "#FB090B",
    stadium: "San Siro", city: "Milan", country: "ITA",
    date: "12 SEP", time: "20:45", league: "SERIE A",
    ticketFrom: 20, hotelFrom: 55, flightFrom: 31,
    bookingCity: "Milan", kiwiCity: "milan-italy", dateISO: "2026-09-12",
  },
  {
    home: "CHELSEA", away: "TOTTENHAM",
    homeAbbr: "CHE", awayAbbr: "TOT",
    homeCl: "#034694", awayCl: "#132257",
    stadium: "Stamford Bridge", city: "London", country: "ENG",
    date: "19 SEP", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 22, hotelFrom: 68, flightFrom: 38,
    bookingCity: "London", kiwiCity: "london-united-kingdom", dateISO: "2026-09-19",
  },
  {
    home: "ATLETICO", away: "SEVILLA",
    homeAbbr: "ATM", awayAbbr: "SEV",
    homeCl: "#CB3524", awayCl: "#D4AF37",
    stadium: "Metropolitano", city: "Madrid", country: "ESP",
    date: "26 SEP", time: "19:00", league: "LA LIGA",
    ticketFrom: 19, hotelFrom: 46, flightFrom: 29,
    bookingCity: "Madrid", kiwiCity: "madrid-spain", dateISO: "2026-09-26",
  },
  {
    home: "JUVENTUS", away: "NAPOLI",
    homeAbbr: "JUV", awayAbbr: "NAP",
    homeCl: "#000000", awayCl: "#12A0C8",
    stadium: "Allianz Stadium", city: "Turin", country: "ITA",
    date: "03 OCT", time: "20:45", league: "SERIE A",
    ticketFrom: 21, hotelFrom: 42, flightFrom: 33,
    bookingCity: "Turin", kiwiCity: "turin-italy", dateISO: "2026-10-03",
  },
  {
    home: "LIVERPOOL", away: "MAN UTD",
    homeAbbr: "LIV", awayAbbr: "UTD",
    homeCl: "#C8102E", awayCl: "#DA291C",
    stadium: "Anfield", city: "Liverpool", country: "ENG",
    date: "10 OCT", time: "17:30", league: "PREMIER LEAGUE",
    ticketFrom: 25, hotelFrom: 58, flightFrom: 36,
    bookingCity: "Liverpool", kiwiCity: "liverpool-united-kingdom", dateISO: "2026-10-10",
  },
];

const LEAGUES = ["ALL", "PREMIER LEAGUE", "LA LIGA", "BUNDESLIGA", "SERIE A", "LIGUE 1"];

export default function MatchesSection() {
  const [active, setActive] = useState("ALL");

  const filtered = active === "ALL"
    ? MATCHES
    : MATCHES.filter((m) => m.league === active);

  return (
    <section
      style={{
        background: "#0c1018",
        position: "relative",
        zIndex: 2,
        paddingTop: "120px",
        paddingBottom: "120px",
      }}
    >
      {/* Top rule */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #C8963C55, transparent)",
        marginBottom: "80px",
      }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>

        {/* Section header */}
        <div style={{ marginBottom: "64px" }}>
          <p style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            color: "#C8963C",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            Najlepšie ponuky tejto sezóny
          </p>
          <h2 style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 700,
            color: "#F5F0E8",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}>
            Najlacnejšie<br />
            <span style={{ color: "#C8963C" }}>Miesta</span> v Európe.
          </h2>
          <p style={{
            fontFamily: "var(--font-geist)",
            fontSize: "1rem",
            color: "#888",
            maxWidth: "480px",
            lineHeight: 1.65,
            letterSpacing: "0.01em",
          }}>
            Nájdeme ti najlepšiu kombináciu hotela a letu, aby si mohol zažiť futbal naživo vo všetkých veľkých európskych ligách — za zlomok bežnej ceny.
          </p>
        </div>

        {/* League filter */}
        <div style={{
          display: "flex",
          gap: "4px",
          marginBottom: "52px",
          flexWrap: "wrap",
        }}>
          {LEAGUES.map((league) => (
            <button
              key={league}
              onClick={() => setActive(league)}
              style={{
                fontFamily: "var(--font-antonio)",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                padding: "9px 18px",
                background: active === league ? "#C8963C" : "transparent",
                color: active === league ? "#070708" : "#666",
                border: `1px solid ${active === league ? "#C8963C" : "#2a2a2a"}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                if (active !== league) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#C8963C55";
                  (e.currentTarget as HTMLElement).style.color = "#F5F0E8";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== league) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a";
                  (e.currentTarget as HTMLElement).style.color = "#666";
                }
              }}
            >
              {league}
            </button>
          ))}
        </div>

        {/* Match grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "1px",
          background: "#1c2030",
          border: "1px solid #1c2030",
        }}>
          {filtered.map((match, i) => (
            <MatchCard key={`${match.home}-${match.away}-${i}`} match={match} />
          ))}
        </div>

        {/* How it works */}
        <div style={{
          marginTop: "100px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1px",
          background: "#1c2030",
          border: "1px solid #1c2030",
        }}>
          {[
            { num: "01", title: "Vyber zápas", desc: "Prehľadaj nadchádzajúce zápasy vo všetkých veľkých európskych ligách a nájdi ten, ktorý chceš zažiť." },
            { num: "02", title: "Nájdi hotel", desc: "Priamo ťa prepojíme s Booking.com — najlepšie hotely blízko štadióna na noc zápasu." },
            { num: "03", title: "Zarezervuj let", desc: "Kiwi.com nájde najlacnejšie lety z tvojho mesta na miesto zápasu — často za menej ako 50 €." },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ background: "#0e1420", padding: "48px 36px" }}>
              <div style={{
                fontFamily: "var(--font-antonio)",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "#C8963C",
                marginBottom: "20px",
              }}>
                {num}
              </div>
              <div style={{
                fontFamily: "var(--font-antonio)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#F5F0E8",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                marginBottom: "14px",
              }}>
                {title}
              </div>
              <p style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.85rem",
                color: "#666",
                lineHeight: 1.7,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
