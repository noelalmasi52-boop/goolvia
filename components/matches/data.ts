export type Hotel = {
  name: string;
  stars: number;
  distanceKm: number;
  pricePerNight: number;
  url: string;
  isHostel?: boolean;
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
  isCL?: boolean;
  ticketFrom: number;
  flightFrom: number;
  hotels: Hotel[];
  kiwiCity: string;
  dateISO: string;
  featured?: boolean;
};

export const CJ_CLICK_URL = "https://www.dpbolvw.net/click-101856071-12624156";
export const VIAGOGO_AID = "YOUR_VIAGOGO_AID";

export function buildKiwiUrl(toCity: string, dateISO: string) {
  const match = new Date(dateISO);
  const dep = new Date(match);
  dep.setDate(dep.getDate() - 1);
  const ret = new Date(match);
  ret.setDate(ret.getDate() + 2);
  const depDate = dep.toISOString().split("T")[0];
  const retDate = ret.toISOString().split("T")[0];
  const kiwiUrl = `https://www.kiwi.com/en/search/results/bratislava-slovakia/${encodeURIComponent(toCity)}/${depDate}/${retDate}`;
  return `${CJ_CLICK_URL}?url=${encodeURIComponent(kiwiUrl)}`;
}

export function buildTicketUrl(home: string, away: string) {
  const query = encodeURIComponent(`${home} ${away}`);
  return `https://www.viagogo.com/ww/Sports/Football/Matches?aid=${VIAGOGO_AID}&q=${query}`;
}

function hotelUrl(hotelName: string, city: string, matchDateISO: string) {
  const match = new Date(matchDateISO);
  const checkIn = new Date(match);
  checkIn.setDate(checkIn.getDate() - 1);
  const checkOut = new Date(match);
  checkOut.setDate(checkOut.getDate() + 2);
  const checkInStr = checkIn.toISOString().split("T")[0];
  const checkOutStr = checkOut.toISOString().split("T")[0];
  const q = encodeURIComponent(`${hotelName} ${city}`);
  return `https://www.booking.com/searchresults.html?ss=${q}&checkin=${checkInStr}&checkout=${checkOutStr}`;
}

const B = (id: number) => `/crests/${id}.svg`;

export const MATCHES: Match[] = [

  // ─── SERIE A ───
  {
    home: "NAPOLI", away: "INTER",
    homeAbbr: "NAP", awayAbbr: "INT",
    homeCl: "#12A0D7", awayCl: "#0068A8",
    homeBadge: "https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg", awayBadge: B(108),
    stadium: "Stadio Diego Armando Maradona", city: "Naples", country: "ITA",
    date: "13 SEP", time: "18:00", league: "SERIE A",
    ticketFrom: 55, flightFrom: 116,
    kiwiCity: "naples-italy", dateISO: "2026-09-13",
    featured: true,
    hotels: [
      { name: "CX Naples Centrale", stars: 3, distanceKm: 4.2, pricePerNight: 43, url: hotelUrl("CX Naples Centrale", "Naples", "2026-09-13") },
      { name: "Albergo Oasi", stars: 3, distanceKm: 3.5, pricePerNight: 85, url: hotelUrl("Albergo Oasi", "Naples", "2026-09-13") },
      { name: "La Controra Hostel Naples", stars: 0, distanceKm: 3.0, pricePerNight: 37, isHostel: true, url: hotelUrl("La Controra Hostel Naples", "Naples", "2026-09-13") },
    ],
  },

  // ─── PREMIER LEAGUE ───
  {
    home: "ARSENAL", away: "CHELSEA",
    homeAbbr: "ARS", awayAbbr: "CHE",
    homeCl: "#EF0107", awayCl: "#034694",
    homeBadge: B(57), awayBadge: B(61),
    stadium: "Emirates Stadium", city: "London", country: "ENG",
    date: "27 SEP", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 75, flightFrom: 116,
    kiwiCity: "london-united-kingdom", dateISO: "2026-09-27",
    featured: true,
    hotels: [
      { name: "Westbury Hotel", stars: 4, distanceKm: 8.0, pricePerNight: 102, url: hotelUrl("Westbury Hotel London", "London", "2026-09-27") },
      { name: "St Athans Hotel", stars: 3, distanceKm: 6.5, pricePerNight: 116, url: hotelUrl("St Athans Hotel London", "London", "2026-09-27") },
      { name: "Smart Hyde Park Inn", stars: 0, distanceKm: 8.5, pricePerNight: 22, isHostel: true, url: hotelUrl("Smart Hyde Park Inn London", "London", "2026-09-27") },
    ],
  },

  // ─── LA LIGA ───
  {
    home: "BARCELONA", away: "ATLETICO",
    homeAbbr: "FCB", awayAbbr: "ATM",
    homeCl: "#A50044", awayCl: "#CE3524",
    homeBadge: B(81), awayBadge: B(78),
    stadium: "Spotify Camp Nou", city: "Barcelona", country: "ESP",
    date: "04 OCT", time: "16:15", league: "LA LIGA",
    ticketFrom: 65, flightFrom: 61,
    kiwiCity: "barcelona-spain", dateISO: "2026-10-04",
    featured: true,
    hotels: [
      { name: "Hotel Alguer Camp Nou", stars: 4, distanceKm: 0.4, pricePerNight: 143, url: hotelUrl("Hotel Alguer Camp Nou", "Barcelona", "2026-10-04") },
      { name: "Ikonik Anglí Hotel", stars: 4, distanceKm: 2.5, pricePerNight: 163, url: hotelUrl("Ikonik Anglí Barcelona", "Barcelona", "2026-10-04") },
      { name: "Hola Hostal Eixample", stars: 0, distanceKm: 3.5, pricePerNight: 33, isHostel: true, url: hotelUrl("Hola Hostal Eixample Barcelona", "Barcelona", "2026-10-04") },
    ],
  },
];
