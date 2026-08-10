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

// Badge URLs from football-data.org (free public SVG crests)
const B = (id: number) => `https://crests.football-data.org/${id}.svg`;

const MATCHES: Match[] = [
  {
    home: "MAN CITY", away: "ARSENAL",
    homeAbbr: "MC", awayAbbr: "ARS",
    homeCl: "#6CABDD", awayCl: "#EF0107",
    homeBadge: B(65), awayBadge: B(57),
    stadium: "Etihad Stadium", city: "Manchester", country: "ENG",
    date: "15 AUG", time: "17:30", league: "PREMIER LEAGUE",
    ticketFrom: 18, flightFrom: 34,
    kiwiCity: "manchester-united-kingdom", dateISO: "2026-08-15",
    hotels: [
      { name: "Roomzzz Manchester Corn Exchange", stars: 3, distanceKm: 3.5, pricePerNight: 44, url: bookingHotelUrl("Roomzzz Manchester Corn Exchange", "Manchester", "2026-08-15") },
      { name: "Premier Inn Manchester Arena", stars: 3, distanceKm: 3.8, pricePerNight: 62, url: bookingHotelUrl("Premier Inn Manchester Arena", "Manchester", "2026-08-15") },
      { name: "Hilton Manchester Deansgate", stars: 4, distanceKm: 4.0, pricePerNight: 89, url: bookingHotelUrl("Hilton Manchester Deansgate", "Manchester", "2026-08-15") },
      { name: "Kimpton Clocktower Hotel", stars: 5, distanceKm: 3.9, pricePerNight: 128, url: bookingHotelUrl("Kimpton Clocktower Hotel", "Manchester", "2026-08-15") },
      { name: "Stock Exchange Hotel", stars: 5, distanceKm: 3.8, pricePerNight: 165, url: bookingHotelUrl("Stock Exchange Hotel", "Manchester", "2026-08-15") },
    ],
  },
  {
    home: "REAL MADRID", away: "BARCELONA",
    homeAbbr: "RM", awayAbbr: "FCB",
    homeCl: "#FEBE10", awayCl: "#A50044",
    homeBadge: B(86), awayBadge: B(81),
    stadium: "Santiago Bernabéu", city: "Madrid", country: "ESP",
    date: "22 AUG", time: "20:00", league: "LA LIGA",
    ticketFrom: 24, flightFrom: 29,
    kiwiCity: "madrid-spain", dateISO: "2026-08-22",
    hotels: [
      { name: "Hotel Los Condes", stars: 3, distanceKm: 0.8, pricePerNight: 48, url: bookingHotelUrl("Hotel Los Condes", "Madrid", "2026-08-22") },
      { name: "NH Madrid Zurbano", stars: 4, distanceKm: 1.1, pricePerNight: 79, url: bookingHotelUrl("NH Madrid Zurbano", "Madrid", "2026-08-22") },
      { name: "Meliá Castilla", stars: 4, distanceKm: 0.4, pricePerNight: 98, url: bookingHotelUrl("Meliá Castilla", "Madrid", "2026-08-22") },
      { name: "Eurostars Hotel Real", stars: 5, distanceKm: 0.3, pricePerNight: 124, url: bookingHotelUrl("Eurostars Hotel Real", "Madrid", "2026-08-22") },
      { name: "The Westin Palace Madrid", stars: 5, distanceKm: 2.5, pricePerNight: 178, url: bookingHotelUrl("The Westin Palace Madrid", "Madrid", "2026-08-22") },
    ],
  },
  {
    home: "PSG", away: "MARSEILLE",
    homeAbbr: "PSG", awayAbbr: "OM",
    homeCl: "#004170", awayCl: "#2CBFEF",
    homeBadge: B(524), awayBadge: B(516),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "29 AUG", time: "21:00", league: "LIGUE 1",
    ticketFrom: 15, flightFrom: 39,
    kiwiCity: "paris-france", dateISO: "2026-08-29",
    hotels: [
      { name: "ibis Paris Tour Eiffel", stars: 2, distanceKm: 1.8, pricePerNight: 61, url: bookingHotelUrl("ibis Paris Tour Eiffel", "Paris", "2026-08-29") },
      { name: "Hotel Le Walt", stars: 3, distanceKm: 1.2, pricePerNight: 85, url: bookingHotelUrl("Hotel Le Walt", "Paris", "2026-08-29") },
      { name: "Novotel Paris Vaugirard", stars: 4, distanceKm: 1.5, pricePerNight: 99, url: bookingHotelUrl("Novotel Paris Vaugirard", "Paris", "2026-08-29") },
      { name: "Pullman Paris Tour Eiffel", stars: 4, distanceKm: 1.0, pricePerNight: 138, url: bookingHotelUrl("Pullman Paris Tour Eiffel", "Paris", "2026-08-29") },
      { name: "Le Méridien Etoile", stars: 5, distanceKm: 3.2, pricePerNight: 175, url: bookingHotelUrl("Le Méridien Etoile", "Paris", "2026-08-29") },
    ],
  },
  {
    home: "BAYERN", away: "DORTMUND",
    homeAbbr: "BAY", awayAbbr: "BVB",
    homeCl: "#DC052D", awayCl: "#FDE100",
    homeBadge: B(5), awayBadge: B(4),
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "05 SEP", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 16, flightFrom: 27,
    kiwiCity: "munich-germany", dateISO: "2026-09-05",
    hotels: [
      { name: "Hotel ibis München City Nord", stars: 2, distanceKm: 2.1, pricePerNight: 44, url: bookingHotelUrl("ibis München City Nord", "Munich", "2026-09-05") },
      { name: "Best Western Plus Atrium Hotel", stars: 3, distanceKm: 1.8, pricePerNight: 72, url: bookingHotelUrl("Best Western Plus Atrium Hotel", "Munich", "2026-09-05") },
      { name: "Holiday Inn Munich City Centre", stars: 4, distanceKm: 7.2, pricePerNight: 88, url: bookingHotelUrl("Holiday Inn Munich City Centre", "Munich", "2026-09-05") },
      { name: "Novotel München Messe", stars: 4, distanceKm: 4.5, pricePerNight: 108, url: bookingHotelUrl("Novotel München Messe", "Munich", "2026-09-05") },
      { name: "Marriott Munich", stars: 5, distanceKm: 6.8, pricePerNight: 145, url: bookingHotelUrl("Marriott Munich", "Munich", "2026-09-05") },
    ],
  },
  {
    home: "INTER", away: "AC MILAN",
    homeAbbr: "INT", awayAbbr: "MIL",
    homeCl: "#0068A8", awayCl: "#FB090B",
    homeBadge: B(108), awayBadge: B(98),
    stadium: "San Siro", city: "Milan", country: "ITA",
    date: "12 SEP", time: "20:45", league: "SERIE A",
    ticketFrom: 20, flightFrom: 31,
    kiwiCity: "milan-italy", dateISO: "2026-09-12",
    hotels: [
      { name: "NH Milano Fiera", stars: 3, distanceKm: 3.2, pricePerNight: 55, url: bookingHotelUrl("NH Milano Fiera", "Milan", "2026-09-12") },
      { name: "Best Western Hotel Madison", stars: 3, distanceKm: 4.1, pricePerNight: 78, url: bookingHotelUrl("Best Western Hotel Madison", "Milan", "2026-09-12") },
      { name: "Sheraton Milan San Siro", stars: 4, distanceKm: 1.5, pricePerNight: 95, url: bookingHotelUrl("Sheraton Milan San Siro", "Milan", "2026-09-12") },
      { name: "DoubleTree by Hilton Milan", stars: 4, distanceKm: 5.0, pricePerNight: 118, url: bookingHotelUrl("DoubleTree by Hilton Milan", "Milan", "2026-09-12") },
      { name: "The Westin Palace Milan", stars: 5, distanceKm: 5.8, pricePerNight: 158, url: bookingHotelUrl("The Westin Palace Milan", "Milan", "2026-09-12") },
    ],
  },
  {
    home: "CHELSEA", away: "TOTTENHAM",
    homeAbbr: "CHE", awayAbbr: "TOT",
    homeCl: "#034694", awayCl: "#132257",
    homeBadge: B(61), awayBadge: B(73),
    stadium: "Stamford Bridge", city: "London", country: "ENG",
    date: "19 SEP", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 22, flightFrom: 38,
    kiwiCity: "london-united-kingdom", dateISO: "2026-09-19",
    hotels: [
      { name: "Premier Inn London Putney Bridge", stars: 3, distanceKm: 1.2, pricePerNight: 68, url: bookingHotelUrl("Premier Inn London Putney Bridge", "London", "2026-09-19") },
      { name: "Holiday Inn London Kensington", stars: 4, distanceKm: 2.0, pricePerNight: 92, url: bookingHotelUrl("Holiday Inn London Kensington", "London", "2026-09-19") },
      { name: "Millennium & Copthorne Chelsea FC", stars: 4, distanceKm: 0.1, pricePerNight: 115, url: bookingHotelUrl("Millennium Copthorne Chelsea", "London", "2026-09-19") },
      { name: "The Pelham London", stars: 5, distanceKm: 2.5, pricePerNight: 148, url: bookingHotelUrl("The Pelham London", "London", "2026-09-19") },
      { name: "Blakes Hotel London", stars: 5, distanceKm: 2.8, pricePerNight: 195, url: bookingHotelUrl("Blakes Hotel London", "London", "2026-09-19") },
    ],
  },
  {
    home: "ATLETICO", away: "SEVILLA",
    homeAbbr: "ATM", awayAbbr: "SEV",
    homeCl: "#CB3524", awayCl: "#D4AF37",
    homeBadge: B(78), awayBadge: B(559),
    stadium: "Metropolitano", city: "Madrid", country: "ESP",
    date: "26 SEP", time: "19:00", league: "LA LIGA",
    ticketFrom: 19, flightFrom: 29,
    kiwiCity: "madrid-spain", dateISO: "2026-09-26",
    hotels: [
      { name: "Hotel Puerta de Alcalá", stars: 3, distanceKm: 3.5, pricePerNight: 46, url: bookingHotelUrl("Hotel Puerta de Alcalá", "Madrid", "2026-09-26") },
      { name: "NH Madrid Ventas", stars: 4, distanceKm: 2.5, pricePerNight: 72, url: bookingHotelUrl("NH Madrid Ventas", "Madrid", "2026-09-26") },
      { name: "Holiday Inn Madrid Bernabea", stars: 4, distanceKm: 2.8, pricePerNight: 88, url: bookingHotelUrl("Holiday Inn Madrid Bernabea", "Madrid", "2026-09-26") },
      { name: "Iberostar Las Letras Gran Vía", stars: 4, distanceKm: 4.0, pricePerNight: 112, url: bookingHotelUrl("Iberostar Las Letras", "Madrid", "2026-09-26") },
      { name: "Hotel Villa Real", stars: 5, distanceKm: 4.5, pricePerNight: 145, url: bookingHotelUrl("Hotel Villa Real", "Madrid", "2026-09-26") },
    ],
  },
  {
    home: "JUVENTUS", away: "NAPOLI",
    homeAbbr: "JUV", awayAbbr: "NAP",
    homeCl: "#1a1a1a", awayCl: "#12A0C8",
    homeBadge: B(109), awayBadge: B(113),
    stadium: "Allianz Stadium", city: "Turin", country: "ITA",
    date: "03 OCT", time: "20:45", league: "SERIE A",
    ticketFrom: 21, flightFrom: 33,
    kiwiCity: "turin-italy", dateISO: "2026-10-03",
    hotels: [
      { name: "Hotel Concord Turin", stars: 3, distanceKm: 5.2, pricePerNight: 42, url: bookingHotelUrl("Hotel Concord Turin", "Turin", "2026-10-03") },
      { name: "NH Torino", stars: 4, distanceKm: 5.5, pricePerNight: 68, url: bookingHotelUrl("NH Torino", "Turin", "2026-10-03") },
      { name: "Golden Palace Hotel Turin", stars: 4, distanceKm: 5.0, pricePerNight: 92, url: bookingHotelUrl("Golden Palace Hotel Turin", "Turin", "2026-10-03") },
      { name: "NH Collection Torino Piazza Carlina", stars: 5, distanceKm: 5.8, pricePerNight: 118, url: bookingHotelUrl("NH Collection Torino Piazza Carlina", "Turin", "2026-10-03") },
      { name: "Starhotels Majestic Turin", stars: 5, distanceKm: 5.3, pricePerNight: 148, url: bookingHotelUrl("Starhotels Majestic Turin", "Turin", "2026-10-03") },
    ],
  },
  {
    home: "LIVERPOOL", away: "MAN UTD",
    homeAbbr: "LIV", awayAbbr: "UTD",
    homeCl: "#C8102E", awayCl: "#DA291C",
    homeBadge: B(64), awayBadge: B(66),
    stadium: "Anfield", city: "Liverpool", country: "ENG",
    date: "10 OCT", time: "17:30", league: "PREMIER LEAGUE",
    ticketFrom: 25, flightFrom: 36,
    kiwiCity: "liverpool-united-kingdom", dateISO: "2026-10-10",
    hotels: [
      { name: "Staybridge Suites Liverpool", stars: 3, distanceKm: 2.1, pricePerNight: 58, url: bookingHotelUrl("Staybridge Suites Liverpool", "Liverpool", "2026-10-10") },
      { name: "Premier Inn Liverpool City Centre", stars: 3, distanceKm: 3.0, pricePerNight: 72, url: bookingHotelUrl("Premier Inn Liverpool City Centre", "Liverpool", "2026-10-10") },
      { name: "Malmaison Liverpool", stars: 4, distanceKm: 3.2, pricePerNight: 95, url: bookingHotelUrl("Malmaison Liverpool", "Liverpool", "2026-10-10") },
      { name: "Hope Street Hotel", stars: 4, distanceKm: 3.5, pricePerNight: 115, url: bookingHotelUrl("Hope Street Hotel", "Liverpool", "2026-10-10") },
      { name: "Titanic Hotel Liverpool", stars: 4, distanceKm: 4.0, pricePerNight: 148, url: bookingHotelUrl("Titanic Hotel Liverpool", "Liverpool", "2026-10-10") },
    ],
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
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #d4a84333, transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px 0" }}>

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
            Vyber zápas — uvidíš konkrétne hotely, lety aj vstupenky s najlepšími cenami. Všetko na jednom mieste.
          </p>
        </div>

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
      <div style={{ marginTop: "120px", borderTop: "1px solid #1a2030", background: "#0d1018" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {PREMIUM_FEATURES.map(({ icon, title, desc }) => (
                <div key={title} style={{
                  background: "#10141e", border: "1px solid #1a2030",
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
                  <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.72rem", color: "#3a4560", lineHeight: 1.65 }}>
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
