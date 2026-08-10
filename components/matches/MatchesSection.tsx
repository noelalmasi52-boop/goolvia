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

  const filtered = active === "ALL"
    ? MATCHES
    : MATCHES.filter((m) => m.league === active);

  return (
    <section style={{ background: "#0a0c12", position: "relative", zIndex: 2 }}>

      {/* Separator */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #d4a84333, transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px 0" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px", maxWidth: "640px" }}>
          <p style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
            letterSpacing: "0.3em", color: "#d4a843", textTransform: "uppercase", marginBottom: "16px",
          }}>
            Najlepšie ponuky tejto sezóny
          </p>
          <h2 style={{
            fontFamily: "var(--font-antonio)", fontSize: "clamp(2.6rem, 6vw, 5rem)",
            fontWeight: 700, color: "#eef0f6", lineHeight: 0.94,
            letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: "20px",
          }}>
            Najlacnejšie<br />
            <span style={{ color: "#d4a843" }}>miesta</span> v Európe.
          </h2>
          <p style={{
            fontFamily: "var(--font-geist)", fontSize: "0.95rem",
            color: "#5a6278", lineHeight: 1.7,
          }}>
            Vyber zápas, klikni a okamžite uvidíš najlepšie ceny hotelov, letov aj vstupeniek — všetko na jednom mieste.
          </p>
        </div>

        {/* League filter */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "40px", flexWrap: "wrap" }}>
          {LEAGUES.map((league) => (
            <button
              key={league}
              onClick={() => setActive(league)}
              style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
                letterSpacing: "0.18em", padding: "8px 16px",
                background: active === league ? "#d4a843" : "transparent",
                color: active === league ? "#0a0c12" : "#3a4560",
                border: `1px solid ${active === league ? "#d4a843" : "#1a2030"}`,
                borderRadius: "6px", cursor: "pointer", transition: "all 0.18s ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                if (active !== league) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#d4a84355";
                  (e.currentTarget as HTMLElement).style.color = "#eef0f6";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== league) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#1a2030";
                  (e.currentTarget as HTMLElement).style.color = "#3a4560";
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
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "12px",
        }}>
          {filtered.map((match, i) => (
            <MatchCard key={`${match.home}-${match.away}-${i}`} match={match} />
          ))}
        </div>
      </div>

      {/* Premium service section */}
      <div style={{
        marginTop: "120px",
        borderTop: "1px solid #1a2030",
        background: "#0d1018",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px 100px" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

            {/* Left — copy */}
            <div>
              <p style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
                letterSpacing: "0.3em", color: "#d4a843", textTransform: "uppercase", marginBottom: "16px",
              }}>
                Prémiová služba
              </p>
              <h2 style={{
                fontFamily: "var(--font-antonio)", fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 700, color: "#eef0f6", lineHeight: 1,
                textTransform: "uppercase", marginBottom: "24px",
              }}>
                Ty len prídeš.<br />
                <span style={{ color: "#d4a843" }}>Zvyšok</span><br />
                zariadime my.
              </h2>
              <p style={{
                fontFamily: "var(--font-geist)", fontSize: "0.92rem",
                color: "#5a6278", lineHeight: 1.75, marginBottom: "36px",
              }}>
                Pre tých, ktorí chcú zažiť zápas bez starostí — postaráme sa o každý detail tvojho výletu. Od vstupeniek a hotela až po transfer a check-in. Dostupní kedykoľvek, po celý čas.
              </p>
              <a
                href="mailto:info@goolvia.com"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  fontFamily: "var(--font-antonio)", fontSize: "0.72rem",
                  fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                  textDecoration: "none", color: "#0a0c12",
                  background: "#d4a843", padding: "14px 28px", borderRadius: "8px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Mám záujem →
              </a>
            </div>

            {/* Right — feature list */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {PREMIUM_FEATURES.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: "#10141e", border: "1px solid #1a2030",
                    borderRadius: "10px", padding: "20px 18px",
                  }}
                >
                  <div style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{icon}</div>
                  <div style={{
                    fontFamily: "var(--font-antonio)", fontSize: "0.82rem",
                    fontWeight: 700, color: "#eef0f6", textTransform: "uppercase",
                    letterSpacing: "0.05em", marginBottom: "8px",
                  }}>
                    {title}
                  </div>
                  <p style={{
                    fontFamily: "var(--font-geist)", fontSize: "0.72rem",
                    color: "#3a4560", lineHeight: 1.65,
                  }}>
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
