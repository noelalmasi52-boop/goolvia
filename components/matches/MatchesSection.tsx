"use client";

import { useState } from "react";
import MatchCard from "./MatchCard";

export type Hotel = {
  name: string;
  stars: number;
  distanceKm: number;
  pricePerNight: number;
  url: string;
};

export type Match = {
  home: string;
  away: string;
  homeAbbr: string;
  awayAbbr: string;
  homeCl: string;
  awayCl: string;
  homeBadge: string;
  awayBadge: string;
  stadium: string;
  city: string;
  country: string;
  date: string;
  time: string;
  league: string;
  ticketFrom: number;
  flightFrom: number;
  hotels: Hotel[];
  kiwiCity: string;
  dateISO: string;
  featured?: boolean;
};

const KIWI_AID = "YOUR_KIWI_AID";
const VIAGOGO_AID = "YOUR_VIAGOGO_AID";

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

function bookingHotelUrl(hotelName: string, city: string, checkIn: string, nights = 2) {
  const d = new Date(checkIn);
  d.setDate(d.getDate() + nights);
  const checkOut = d.toISOString().split("T")[0];
  const q = encodeURIComponent(`${hotelName} ${city}`);
  return `https://www.booking.com/searchresults.html?ss=${q}&checkin=${checkIn}&checkout=${checkOut}`;
}

const B = (id: number) => `https://crests.football-data.org/${id}.svg`;

const MATCHES: Match[] = [
  // ─── LA LIGA ───
  {
    home: "ESPANYOL", away: "REAL MADRID",
    homeAbbr: "ESP", awayAbbr: "RM",
    homeCl: "#0070B8", awayCl: "#FEBE10",
    homeBadge: B(558), awayBadge: B(86),
    stadium: "RCDE Stadium", city: "Barcelona", country: "ESP",
    date: "29 AUG", time: "20:00", league: "LA LIGA",
    ticketFrom: 35, flightFrom: 39,
    kiwiCity: "barcelona-spain", dateISO: "2026-08-29",
    featured: true,
    hotels: [
      { name: "Hotel Miramar Barcelona", stars: 3, distanceKm: 6.2, pricePerNight: 52, url: bookingHotelUrl("Hotel Miramar Barcelona", "Barcelona", "2026-08-29") },
      { name: "AC Hotel Barcelona Forum", stars: 4, distanceKm: 5.8, pricePerNight: 78, url: bookingHotelUrl("AC Hotel Barcelona Forum", "Barcelona", "2026-08-29") },
      { name: "NH Collection Barcelona Gran Hotel Calderón", stars: 4, distanceKm: 7.1, pricePerNight: 99, url: bookingHotelUrl("NH Collection Barcelona Gran Hotel Calderon", "Barcelona", "2026-08-29") },
      { name: "Melia Barcelona Sarrià", stars: 4, distanceKm: 7.5, pricePerNight: 118, url: bookingHotelUrl("Melia Barcelona Sarria", "Barcelona", "2026-08-29") },
      { name: "Hotel Arts Barcelona", stars: 5, distanceKm: 8.0, pricePerNight: 195, url: bookingHotelUrl("Hotel Arts Barcelona", "Barcelona", "2026-08-29") },
    ],
  },

  // ─── SERIE A ───
  {
    home: "TORINO", away: "AC MILAN",
    homeAbbr: "TOR", awayAbbr: "MIL",
    homeCl: "#8B1A1A", awayCl: "#FB090B",
    homeBadge: B(586), awayBadge: B(98),
    stadium: "Stadio Olimpico Grande Torino", city: "Turin", country: "ITA",
    date: "12 SEP", time: "20:45", league: "SERIE A",
    ticketFrom: 22, flightFrom: 35,
    kiwiCity: "turin-italy", dateISO: "2026-09-12",
    featured: true,
    hotels: [
      { name: "iB Hotel Torino", stars: 3, distanceKm: 3.8, pricePerNight: 45, url: bookingHotelUrl("iB Hotel Torino", "Turin", "2026-09-12") },
      { name: "NH Torino", stars: 4, distanceKm: 4.2, pricePerNight: 68, url: bookingHotelUrl("NH Torino", "Turin", "2026-09-12") },
      { name: "Golden Palace Hotel Turin", stars: 4, distanceKm: 4.5, pricePerNight: 88, url: bookingHotelUrl("Golden Palace Hotel Turin", "Turin", "2026-09-12") },
      { name: "NH Collection Torino Piazza Carlina", stars: 5, distanceKm: 5.0, pricePerNight: 115, url: bookingHotelUrl("NH Collection Torino Piazza Carlina", "Turin", "2026-09-12") },
      { name: "Starhotels Majestic Turin", stars: 5, distanceKm: 4.8, pricePerNight: 145, url: bookingHotelUrl("Starhotels Majestic Turin", "Turin", "2026-09-12") },
    ],
  },
  {
    home: "INTER", away: "MONZA",
    homeAbbr: "INT", awayAbbr: "MON",
    homeCl: "#0068A8", awayCl: "#E4002B",
    homeBadge: B(108), awayBadge: B(5481),
    stadium: "San Siro", city: "Milan", country: "ITA",
    date: "19 SEP", time: "18:00", league: "SERIE A",
    ticketFrom: 18, flightFrom: 31,
    kiwiCity: "milan-italy", dateISO: "2026-09-19",
    hotels: [
      { name: "Hotel Enterprise Milan", stars: 3, distanceKm: 3.1, pricePerNight: 55, url: bookingHotelUrl("Hotel Enterprise Milan", "Milan", "2026-09-19") },
      { name: "Sheraton Milan San Siro", stars: 4, distanceKm: 1.5, pricePerNight: 79, url: bookingHotelUrl("Sheraton Milan San Siro", "Milan", "2026-09-19") },
      { name: "NH Milano Fiera", stars: 4, distanceKm: 3.2, pricePerNight: 92, url: bookingHotelUrl("NH Milano Fiera", "Milan", "2026-09-19") },
      { name: "DoubleTree by Hilton Milan", stars: 4, distanceKm: 5.0, pricePerNight: 115, url: bookingHotelUrl("DoubleTree by Hilton Milan", "Milan", "2026-09-19") },
      { name: "Park Hyatt Milan", stars: 5, distanceKm: 6.5, pricePerNight: 195, url: bookingHotelUrl("Park Hyatt Milan", "Milan", "2026-09-19") },
    ],
  },

  // ─── BUNDESLIGA ───
  {
    home: "BAYERN", away: "STUTTGART",
    homeAbbr: "BAY", awayAbbr: "STU",
    homeCl: "#DC052D", awayCl: "#E32219",
    homeBadge: B(5), awayBadge: B(762),
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "05 SEP", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 20, flightFrom: 27,
    kiwiCity: "munich-germany", dateISO: "2026-09-05",
    hotels: [
      { name: "Motel One München-Olympia", stars: 3, distanceKm: 2.8, pricePerNight: 48, url: bookingHotelUrl("Motel One München-Olympia", "Munich", "2026-09-05") },
      { name: "H4 Hotel München Messe", stars: 4, distanceKm: 3.5, pricePerNight: 72, url: bookingHotelUrl("H4 Hotel München Messe", "Munich", "2026-09-05") },
      { name: "Holiday Inn Munich City Centre", stars: 4, distanceKm: 7.2, pricePerNight: 88, url: bookingHotelUrl("Holiday Inn Munich City Centre", "Munich", "2026-09-05") },
      { name: "Novotel München Messe", stars: 4, distanceKm: 4.5, pricePerNight: 108, url: bookingHotelUrl("Novotel München Messe", "Munich", "2026-09-05") },
      { name: "Marriott Munich", stars: 5, distanceKm: 6.8, pricePerNight: 148, url: bookingHotelUrl("Marriott Munich", "Munich", "2026-09-05") },
    ],
  },

  // ─── PREMIER LEAGUE WEEK 1 ───
  {
    home: "ARSENAL", away: "COVENTRY",
    homeAbbr: "ARS", awayAbbr: "COV",
    homeCl: "#EF0107", awayCl: "#1D90CD",
    homeBadge: B(57), awayBadge: B(1076),
    stadium: "Emirates Stadium", city: "London", country: "ENG",
    date: "21 AUG", time: "21:00", league: "PREMIER LEAGUE",
    ticketFrom: 20, flightFrom: 38,
    kiwiCity: "london-united-kingdom", dateISO: "2026-08-21",
    hotels: [
      { name: "Travelodge London Kings Cross", stars: 3, distanceKm: 3.5, pricePerNight: 55, url: bookingHotelUrl("Travelodge London Kings Cross", "London", "2026-08-21") },
      { name: "Premier Inn London Kings Cross", stars: 3, distanceKm: 3.5, pricePerNight: 68, url: bookingHotelUrl("Premier Inn London Kings Cross", "London", "2026-08-21") },
      { name: "Holiday Inn London Islington", stars: 4, distanceKm: 2.8, pricePerNight: 88, url: bookingHotelUrl("Holiday Inn London Islington", "London", "2026-08-21") },
      { name: "The Megaro Hotel", stars: 4, distanceKm: 3.6, pricePerNight: 99, url: bookingHotelUrl("The Megaro Hotel", "London", "2026-08-21") },
      { name: "Great Northern Hotel London", stars: 5, distanceKm: 3.8, pricePerNight: 145, url: bookingHotelUrl("Great Northern Hotel London", "London", "2026-08-21") },
    ],
  },
  {
    home: "HULL CITY", away: "MAN UNITED",
    homeAbbr: "HUL", awayAbbr: "UTD",
    homeCl: "#F5A12D", awayCl: "#DA291C",
    homeBadge: B(322), awayBadge: B(66),
    stadium: "MKM Stadium", city: "Hull", country: "ENG",
    date: "22 AUG", time: "13:30", league: "PREMIER LEAGUE",
    ticketFrom: 15, flightFrom: 44,
    kiwiCity: "manchester-united-kingdom", dateISO: "2026-08-22",
    hotels: [
      { name: "ibis Styles Hull City Centre", stars: 3, distanceKm: 2.5, pricePerNight: 50, url: bookingHotelUrl("ibis Styles Hull City Centre", "Hull", "2026-08-22") },
      { name: "Leonardo Hotel Hull", stars: 3, distanceKm: 2.8, pricePerNight: 60, url: bookingHotelUrl("Leonardo Hotel Hull", "Hull", "2026-08-22") },
      { name: "Mercure Hull Royal Hotel", stars: 4, distanceKm: 2.6, pricePerNight: 72, url: bookingHotelUrl("Mercure Hull Royal Hotel", "Hull", "2026-08-22") },
      { name: "DoubleTree by Hilton Hull", stars: 4, distanceKm: 3.0, pricePerNight: 85, url: bookingHotelUrl("DoubleTree by Hilton Hull", "Hull", "2026-08-22") },
      { name: "Village Hotel Hull", stars: 4, distanceKm: 3.5, pricePerNight: 95, url: bookingHotelUrl("Village Hotel Hull", "Hull", "2026-08-22") },
    ],
  },
  {
    home: "NOTTINGHAM", away: "LEEDS UTD",
    homeAbbr: "NFO", awayAbbr: "LEE",
    homeCl: "#DD0000", awayCl: "#FFCD00",
    homeBadge: B(351), awayBadge: B(341),
    stadium: "City Ground", city: "Nottingham", country: "ENG",
    date: "22 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 14, flightFrom: 40,
    kiwiCity: "east-midlands-united-kingdom", dateISO: "2026-08-22",
    hotels: [
      { name: "ibis Nottingham Centre", stars: 3, distanceKm: 2.2, pricePerNight: 52, url: bookingHotelUrl("ibis Nottingham Centre", "Nottingham", "2026-08-22") },
      { name: "Premier Inn Nottingham City Centre", stars: 3, distanceKm: 2.5, pricePerNight: 64, url: bookingHotelUrl("Premier Inn Nottingham City Centre", "Nottingham", "2026-08-22") },
      { name: "Park Plaza Nottingham", stars: 4, distanceKm: 2.8, pricePerNight: 82, url: bookingHotelUrl("Park Plaza Nottingham", "Nottingham", "2026-08-22") },
      { name: "DoubleTree by Hilton Nottingham", stars: 4, distanceKm: 3.0, pricePerNight: 95, url: bookingHotelUrl("DoubleTree by Hilton Nottingham", "Nottingham", "2026-08-22") },
      { name: "Hart's Hotel Nottingham", stars: 5, distanceKm: 2.0, pricePerNight: 120, url: bookingHotelUrl("Harts Hotel Nottingham", "Nottingham", "2026-08-22") },
    ],
  },
  {
    home: "EVERTON", away: "CRYSTAL PALACE",
    homeAbbr: "EVE", awayAbbr: "CPA",
    homeCl: "#003399", awayCl: "#1B458F",
    homeBadge: B(62), awayBadge: B(354),
    stadium: "Everton Stadium", city: "Liverpool", country: "ENG",
    date: "22 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 16, flightFrom: 38,
    kiwiCity: "liverpool-united-kingdom", dateISO: "2026-08-22",
    hotels: [
      { name: "ibis Liverpool Centre", stars: 3, distanceKm: 3.5, pricePerNight: 55, url: bookingHotelUrl("ibis Liverpool Centre", "Liverpool", "2026-08-22") },
      { name: "Premier Inn Liverpool City Centre", stars: 3, distanceKm: 3.8, pricePerNight: 68, url: bookingHotelUrl("Premier Inn Liverpool City Centre", "Liverpool", "2026-08-22") },
      { name: "Holiday Inn Liverpool City Centre", stars: 4, distanceKm: 4.0, pricePerNight: 80, url: bookingHotelUrl("Holiday Inn Liverpool City Centre", "Liverpool", "2026-08-22") },
      { name: "Malmaison Liverpool", stars: 4, distanceKm: 4.2, pricePerNight: 95, url: bookingHotelUrl("Malmaison Liverpool", "Liverpool", "2026-08-22") },
      { name: "Hope Street Hotel", stars: 5, distanceKm: 4.5, pricePerNight: 118, url: bookingHotelUrl("Hope Street Hotel", "Liverpool", "2026-08-22") },
    ],
  },
  {
    home: "IPSWICH", away: "SUNDERLAND",
    homeAbbr: "IPS", awayAbbr: "SUN",
    homeCl: "#0033A0", awayCl: "#EB172B",
    homeBadge: B(349), awayBadge: B(388),
    stadium: "Portman Road", city: "Ipswich", country: "ENG",
    date: "22 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 12, flightFrom: 40,
    kiwiCity: "london-stansted-united-kingdom", dateISO: "2026-08-22",
    hotels: [
      { name: "ibis Ipswich", stars: 3, distanceKm: 1.8, pricePerNight: 45, url: bookingHotelUrl("ibis Ipswich", "Ipswich", "2026-08-22") },
      { name: "Premier Inn Ipswich Town Centre", stars: 3, distanceKm: 1.5, pricePerNight: 55, url: bookingHotelUrl("Premier Inn Ipswich Town Centre", "Ipswich", "2026-08-22") },
      { name: "Holiday Inn Ipswich", stars: 4, distanceKm: 2.0, pricePerNight: 72, url: bookingHotelUrl("Holiday Inn Ipswich", "Ipswich", "2026-08-22") },
      { name: "Novotel Ipswich Centre", stars: 4, distanceKm: 1.6, pricePerNight: 82, url: bookingHotelUrl("Novotel Ipswich Centre", "Ipswich", "2026-08-22") },
      { name: "Salthouse Harbour Hotel", stars: 5, distanceKm: 2.5, pricePerNight: 115, url: bookingHotelUrl("Salthouse Harbour Hotel", "Ipswich", "2026-08-22") },
    ],
  },
  {
    home: "BRENTFORD", away: "TOTTENHAM",
    homeAbbr: "BRE", awayAbbr: "TOT",
    homeCl: "#E30613", awayCl: "#132257",
    homeBadge: B(402), awayBadge: B(73),
    stadium: "Gtech Community Stadium", city: "London", country: "ENG",
    date: "22 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 18, flightFrom: 38,
    kiwiCity: "london-united-kingdom", dateISO: "2026-08-22",
    hotels: [
      { name: "Travelodge London Kew Bridge", stars: 3, distanceKm: 2.2, pricePerNight: 58, url: bookingHotelUrl("Travelodge London Kew Bridge", "London", "2026-08-22") },
      { name: "Holiday Inn London Brentford Lock", stars: 4, distanceKm: 1.5, pricePerNight: 80, url: bookingHotelUrl("Holiday Inn London Brentford Lock", "London", "2026-08-22") },
      { name: "ibis London Earls Court", stars: 3, distanceKm: 3.8, pricePerNight: 70, url: bookingHotelUrl("ibis London Earls Court", "London", "2026-08-22") },
      { name: "Kew Green Hotel", stars: 4, distanceKm: 2.8, pricePerNight: 95, url: bookingHotelUrl("Kew Green Hotel", "London", "2026-08-22") },
      { name: "Novotel London Heathrow", stars: 4, distanceKm: 5.5, pricePerNight: 88, url: bookingHotelUrl("Novotel London Heathrow", "London", "2026-08-22") },
    ],
  },
];

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

  const filtered = active === "ALL"
    ? MATCHES
    : MATCHES.filter((m) => m.league === active);

  return (
    <section id="zapasy" style={{ background: "#0c1220", position: "relative", zIndex: 2 }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e8b84b33, transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px 0" }}>

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
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "12px",
        }}>
          {filtered.map((match, i) => (
            <MatchCard key={`${match.home}-${match.away}-${i}`} match={match} />
          ))}
        </div>
      </div>

      {/* Premium service section */}
      <div style={{ marginTop: "120px", borderTop: "1px solid #243452", background: "#0e1828" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
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
                href="mailto:info@goolvia.com"
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
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
