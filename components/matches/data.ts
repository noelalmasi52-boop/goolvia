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

export const CJ_CLICK_URL = "https://www.dpbolvw.net/click-101856071-12624156";
export const VIAGOGO_AID = "YOUR_VIAGOGO_AID";

export function buildKiwiUrl(toCity: string, dateISO: string) {
  const match = new Date(dateISO);
  const dep = new Date(match);
  dep.setDate(dep.getDate() - 1);
  const ret = new Date(match);
  ret.setDate(ret.getDate() + 1);
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
  checkOut.setDate(checkOut.getDate() + 1);
  const checkInStr = checkIn.toISOString().split("T")[0];
  const checkOutStr = checkOut.toISOString().split("T")[0];
  const q = encodeURIComponent(`${hotelName} ${city}`);
  return `https://www.booking.com/searchresults.html?ss=${q}&checkin=${checkInStr}&checkout=${checkOutStr}`;
}

const B = (id: number) => `/crests/${id}.svg`;

export const MATCHES: Match[] = [
  // ─── PREMIER LEAGUE ─── Matchday 2 — 29 AUG 2026

  {
    home: "ASTON VILLA", away: "ARSENAL",
    homeAbbr: "AVL", awayAbbr: "ARS",
    homeCl: "#670E36", awayCl: "#EF0107",
    homeBadge: B(58), awayBadge: B(57),
    stadium: "Villa Park", city: "Birmingham", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 38, flightFrom: 42,
    kiwiCity: "birmingham-united-kingdom", dateISO: "2026-08-29",
    featured: true,
    hotels: [
      { name: "ibis Styles Birmingham Centre", stars: 3, distanceKm: 3.2, pricePerNight: 52, url: hotelUrl("ibis Styles Birmingham Centre", "Birmingham", "2026-08-29") },
      { name: "Holiday Inn Birmingham City", stars: 3, distanceKm: 3.5, pricePerNight: 65, url: hotelUrl("Holiday Inn Birmingham City", "Birmingham", "2026-08-29") },
      { name: "Hyatt Regency Birmingham", stars: 4, distanceKm: 4.0, pricePerNight: 88, url: hotelUrl("Hyatt Regency Birmingham", "Birmingham", "2026-08-29") },
      { name: "Hotel du Vin Birmingham", stars: 4, distanceKm: 3.8, pricePerNight: 105, url: hotelUrl("Hotel du Vin Birmingham", "Birmingham", "2026-08-29") },
      { name: "The Grand Hotel Birmingham", stars: 5, distanceKm: 3.5, pricePerNight: 145, url: hotelUrl("The Grand Hotel Birmingham", "Birmingham", "2026-08-29") },
    ],
  },
  {
    home: "CRYSTAL PALACE", away: "MAN CITY",
    homeAbbr: "CPA", awayAbbr: "MCI",
    homeCl: "#1B458F", awayCl: "#6CABDD",
    homeBadge: B(354), awayBadge: B(65),
    stadium: "Selhurst Park", city: "London", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 40, flightFrom: 38,
    kiwiCity: "london-united-kingdom", dateISO: "2026-08-29",
    featured: true,
    hotels: [
      { name: "Premier Inn London Norbury", stars: 3, distanceKm: 2.5, pricePerNight: 58, url: hotelUrl("Premier Inn London Norbury", "London", "2026-08-29") },
      { name: "Travelodge London Crystal Palace", stars: 3, distanceKm: 2.0, pricePerNight: 62, url: hotelUrl("Travelodge London Crystal Palace", "London", "2026-08-29") },
      { name: "Holiday Inn London Croydon", stars: 4, distanceKm: 3.5, pricePerNight: 78, url: hotelUrl("Holiday Inn London Croydon", "London", "2026-08-29") },
      { name: "Hilton London Croydon", stars: 4, distanceKm: 4.0, pricePerNight: 92, url: hotelUrl("Hilton London Croydon", "London", "2026-08-29") },
      { name: "Dorsett Shepherds Bush London", stars: 4, distanceKm: 12.0, pricePerNight: 115, url: hotelUrl("Dorsett Shepherds Bush London", "London", "2026-08-29") },
    ],
  },
  {
    home: "LIVERPOOL", away: "NOTTINGHAM",
    homeAbbr: "LIV", awayAbbr: "NFO",
    homeCl: "#C8102E", awayCl: "#DD0000",
    homeBadge: B(64), awayBadge: B(351),
    stadium: "Anfield", city: "Liverpool", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 45, flightFrom: 38,
    kiwiCity: "liverpool-united-kingdom", dateISO: "2026-08-29",
    hotels: [
      { name: "ibis Liverpool Centre", stars: 3, distanceKm: 3.5, pricePerNight: 55, url: hotelUrl("ibis Liverpool Centre", "Liverpool", "2026-08-29") },
      { name: "Premier Inn Liverpool City Centre", stars: 3, distanceKm: 3.8, pricePerNight: 68, url: hotelUrl("Premier Inn Liverpool City Centre", "Liverpool", "2026-08-29") },
      { name: "Holiday Inn Liverpool City Centre", stars: 4, distanceKm: 4.0, pricePerNight: 82, url: hotelUrl("Holiday Inn Liverpool City Centre", "Liverpool", "2026-08-29") },
      { name: "Malmaison Liverpool", stars: 4, distanceKm: 4.2, pricePerNight: 95, url: hotelUrl("Malmaison Liverpool", "Liverpool", "2026-08-29") },
      { name: "Hope Street Hotel", stars: 5, distanceKm: 3.0, pricePerNight: 125, url: hotelUrl("Hope Street Hotel", "Liverpool", "2026-08-29") },
    ],
  },
  {
    home: "MAN UNITED", away: "IPSWICH",
    homeAbbr: "MNU", awayAbbr: "IPS",
    homeCl: "#DA291C", awayCl: "#0033A0",
    homeBadge: B(66), awayBadge: B(349),
    stadium: "Old Trafford", city: "Manchester", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 42, flightFrom: 40,
    kiwiCity: "manchester-united-kingdom", dateISO: "2026-08-29",
    hotels: [
      { name: "ibis Manchester Centre", stars: 3, distanceKm: 3.0, pricePerNight: 55, url: hotelUrl("ibis Manchester Centre", "Manchester", "2026-08-29") },
      { name: "Premier Inn Manchester Old Trafford", stars: 3, distanceKm: 1.5, pricePerNight: 65, url: hotelUrl("Premier Inn Manchester Old Trafford", "Manchester", "2026-08-29") },
      { name: "Holiday Inn Manchester City Centre", stars: 4, distanceKm: 4.0, pricePerNight: 82, url: hotelUrl("Holiday Inn Manchester City Centre", "Manchester", "2026-08-29") },
      { name: "Hilton Garden Inn Manchester", stars: 4, distanceKm: 3.5, pricePerNight: 95, url: hotelUrl("Hilton Garden Inn Manchester", "Manchester", "2026-08-29") },
      { name: "The Lowry Hotel", stars: 5, distanceKm: 4.5, pricePerNight: 165, url: hotelUrl("The Lowry Hotel", "Manchester", "2026-08-29") },
    ],
  },
  {
    home: "TOTTENHAM", away: "NEWCASTLE",
    homeAbbr: "TOT", awayAbbr: "NEW",
    homeCl: "#132257", awayCl: "#241F20",
    homeBadge: B(73), awayBadge: B(67),
    stadium: "Tottenham Hotspur Stadium", city: "London", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 45, flightFrom: 38,
    kiwiCity: "london-united-kingdom", dateISO: "2026-08-29",
    hotels: [
      { name: "Premier Inn London Tottenham Hale", stars: 3, distanceKm: 2.0, pricePerNight: 55, url: hotelUrl("Premier Inn London Tottenham Hale", "London", "2026-08-29") },
      { name: "ibis London City Shoreditch", stars: 3, distanceKm: 6.0, pricePerNight: 68, url: hotelUrl("ibis London City Shoreditch", "London", "2026-08-29") },
      { name: "Holiday Inn London Stratford", stars: 4, distanceKm: 7.0, pricePerNight: 82, url: hotelUrl("Holiday Inn London Stratford", "London", "2026-08-29") },
      { name: "DoubleTree by Hilton London", stars: 4, distanceKm: 8.0, pricePerNight: 98, url: hotelUrl("DoubleTree by Hilton London", "London", "2026-08-29") },
      { name: "The Hoxton Shoreditch", stars: 4, distanceKm: 7.5, pricePerNight: 135, url: hotelUrl("The Hoxton Shoreditch", "London", "2026-08-29") },
    ],
  },
  {
    home: "BOURNEMOUTH", away: "EVERTON",
    homeAbbr: "BOU", awayAbbr: "EVE",
    homeCl: "#DA291C", awayCl: "#003399",
    homeBadge: B(1044), awayBadge: B(62),
    stadium: "Vitality Stadium", city: "Bournemouth", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 18, flightFrom: 42,
    kiwiCity: "bournemouth-united-kingdom", dateISO: "2026-08-29",
    hotels: [
      { name: "Premier Inn Bournemouth Central", stars: 3, distanceKm: 2.5, pricePerNight: 52, url: hotelUrl("Premier Inn Bournemouth Central", "Bournemouth", "2026-08-29") },
      { name: "Travelodge Bournemouth", stars: 3, distanceKm: 2.0, pricePerNight: 58, url: hotelUrl("Travelodge Bournemouth", "Bournemouth", "2026-08-29") },
      { name: "Hilton Bournemouth", stars: 4, distanceKm: 3.0, pricePerNight: 82, url: hotelUrl("Hilton Bournemouth", "Bournemouth", "2026-08-29") },
      { name: "Royal Exeter Hotel", stars: 4, distanceKm: 2.8, pricePerNight: 92, url: hotelUrl("Royal Exeter Hotel", "Bournemouth", "2026-08-29") },
      { name: "Bournemouth Highcliff Marriott", stars: 4, distanceKm: 3.2, pricePerNight: 115, url: hotelUrl("Bournemouth Highcliff Marriott", "Bournemouth", "2026-08-29") },
    ],
  },
  {
    home: "LEEDS UTD", away: "BRENTFORD",
    homeAbbr: "LEE", awayAbbr: "BRE",
    homeCl: "#FFCD00", awayCl: "#E30613",
    homeBadge: B(341), awayBadge: B(402),
    stadium: "Elland Road", city: "Leeds", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 16, flightFrom: 40,
    kiwiCity: "leeds-united-kingdom", dateISO: "2026-08-29",
    hotels: [
      { name: "ibis Leeds Centre", stars: 3, distanceKm: 2.8, pricePerNight: 48, url: hotelUrl("ibis Leeds Centre", "Leeds", "2026-08-29") },
      { name: "Premier Inn Leeds City Centre", stars: 3, distanceKm: 3.0, pricePerNight: 58, url: hotelUrl("Premier Inn Leeds City Centre", "Leeds", "2026-08-29") },
      { name: "Novotel Leeds Centre", stars: 4, distanceKm: 3.2, pricePerNight: 75, url: hotelUrl("Novotel Leeds Centre", "Leeds", "2026-08-29") },
      { name: "DoubleTree by Hilton Leeds", stars: 4, distanceKm: 3.5, pricePerNight: 88, url: hotelUrl("DoubleTree by Hilton Leeds", "Leeds", "2026-08-29") },
      { name: "The Queens Hotel Leeds", stars: 4, distanceKm: 3.0, pricePerNight: 105, url: hotelUrl("The Queens Hotel Leeds", "Leeds", "2026-08-29") },
    ],
  },
  {
    home: "COVENTRY", away: "HULL CITY",
    homeAbbr: "COV", awayAbbr: "HUL",
    homeCl: "#1D90CD", awayCl: "#F5A12D",
    homeBadge: B(1076), awayBadge: B(322),
    stadium: "Coventry Building Society Arena", city: "Coventry", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 14, flightFrom: 42,
    kiwiCity: "birmingham-united-kingdom", dateISO: "2026-08-29",
    hotels: [
      { name: "ibis Coventry Centre", stars: 3, distanceKm: 4.0, pricePerNight: 45, url: hotelUrl("ibis Coventry Centre", "Coventry", "2026-08-29") },
      { name: "Premier Inn Coventry City Centre", stars: 3, distanceKm: 4.5, pricePerNight: 55, url: hotelUrl("Premier Inn Coventry City Centre", "Coventry", "2026-08-29") },
      { name: "Holiday Inn Coventry", stars: 4, distanceKm: 3.0, pricePerNight: 68, url: hotelUrl("Holiday Inn Coventry", "Coventry", "2026-08-29") },
      { name: "DoubleTree by Hilton Coventry", stars: 4, distanceKm: 5.0, pricePerNight: 82, url: hotelUrl("DoubleTree by Hilton Coventry", "Coventry", "2026-08-29") },
      { name: "Coombe Abbey Hotel", stars: 4, distanceKm: 8.0, pricePerNight: 105, url: hotelUrl("Coombe Abbey Hotel", "Coventry", "2026-08-29") },
    ],
  },
  {
    home: "SUNDERLAND", away: "FULHAM",
    homeAbbr: "SUN", awayAbbr: "FUL",
    homeCl: "#EB172B", awayCl: "#000000",
    homeBadge: "https://upload.wikimedia.org/wikipedia/en/7/77/Logo_Sunderland.svg", awayBadge: B(63),
    stadium: "Stadium of Light", city: "Sunderland", country: "ENG",
    date: "29 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 14, flightFrom: 45,
    kiwiCity: "newcastle-united-kingdom", dateISO: "2026-08-29",
    hotels: [
      { name: "Premier Inn Sunderland City Centre", stars: 3, distanceKm: 1.5, pricePerNight: 48, url: hotelUrl("Premier Inn Sunderland City Centre", "Sunderland", "2026-08-29") },
      { name: "ibis Sunderland", stars: 3, distanceKm: 2.0, pricePerNight: 52, url: hotelUrl("ibis Sunderland", "Sunderland", "2026-08-29") },
      { name: "Hilton Garden Inn Sunderland", stars: 4, distanceKm: 1.8, pricePerNight: 72, url: hotelUrl("Hilton Garden Inn Sunderland", "Sunderland", "2026-08-29") },
      { name: "Roker Hotel Sunderland", stars: 4, distanceKm: 3.0, pricePerNight: 85, url: hotelUrl("Roker Hotel Sunderland", "Sunderland", "2026-08-29") },
      { name: "Grand Hotel Sunderland", stars: 4, distanceKm: 2.5, pricePerNight: 95, url: hotelUrl("Grand Hotel Sunderland", "Sunderland", "2026-08-29") },
    ],
  },
  {
    home: "FULHAM", away: "CHELSEA",
    homeAbbr: "FUL", awayAbbr: "CHE",
    homeCl: "#000000", awayCl: "#034694",
    homeBadge: B(63), awayBadge: B(61),
    stadium: "Craven Cottage", city: "London", country: "ENG",
    date: "24 AUG", time: "21:00", league: "PREMIER LEAGUE",
    ticketFrom: 35, flightFrom: 38,
    kiwiCity: "london-united-kingdom", dateISO: "2026-08-24",
    hotels: [
      { name: "ibis London Earls Court", stars: 3, distanceKm: 3.5, pricePerNight: 62, url: hotelUrl("ibis London Earls Court", "London", "2026-08-24") },
      { name: "Premier Inn London Putney Bridge", stars: 3, distanceKm: 1.5, pricePerNight: 68, url: hotelUrl("Premier Inn London Putney Bridge", "London", "2026-08-24") },
      { name: "Holiday Inn London Kensington", stars: 4, distanceKm: 4.0, pricePerNight: 92, url: hotelUrl("Holiday Inn London Kensington", "London", "2026-08-24") },
      { name: "Novotel London West", stars: 4, distanceKm: 3.8, pricePerNight: 105, url: hotelUrl("Novotel London West", "London", "2026-08-24") },
      { name: "The Kensington Hotel", stars: 5, distanceKm: 4.5, pricePerNight: 175, url: hotelUrl("The Kensington Hotel", "London", "2026-08-24") },
    ],
  },

  // ─── LA LIGA ─── 2026/27

  {
    home: "BARCELONA", away: "ATHLETIC CLUB",
    homeAbbr: "FCB", awayAbbr: "ATH",
    homeCl: "#A50044", awayCl: "#EE2523",
    homeBadge: B(81), awayBadge: B(77),
    stadium: "Camp Nou", city: "Barcelona", country: "ESP",
    date: "27 AUG", time: "21:00", league: "LA LIGA",
    ticketFrom: 55, flightFrom: 35,
    kiwiCity: "barcelona-spain", dateISO: "2026-08-27",
    featured: true,
    hotels: [
      { name: "Hotel Miramar Barcelona", stars: 3, distanceKm: 4.5, pricePerNight: 52, url: hotelUrl("Hotel Miramar Barcelona", "Barcelona", "2026-08-27") },
      { name: "AC Hotel Barcelona Forum", stars: 4, distanceKm: 8.0, pricePerNight: 78, url: hotelUrl("AC Hotel Barcelona Forum", "Barcelona", "2026-08-27") },
      { name: "NH Collection Barcelona Gran Hotel Calderón", stars: 4, distanceKm: 5.0, pricePerNight: 99, url: hotelUrl("NH Collection Barcelona Gran Hotel Calderon", "Barcelona", "2026-08-27") },
      { name: "Melia Barcelona Sarrià", stars: 4, distanceKm: 2.5, pricePerNight: 118, url: hotelUrl("Melia Barcelona Sarria", "Barcelona", "2026-08-27") },
      { name: "Hotel Arts Barcelona", stars: 5, distanceKm: 9.0, pricePerNight: 195, url: hotelUrl("Hotel Arts Barcelona", "Barcelona", "2026-08-27") },
    ],
  },
  {
    home: "REAL MADRID", away: "MALAGA",
    homeAbbr: "RM", awayAbbr: "MAL",
    homeCl: "#FEBE10", awayCl: "#004B9D",
    homeBadge: B(86), awayBadge: B(84),
    stadium: "Santiago Bernabéu", city: "Madrid", country: "ESP",
    date: "30 AUG", time: "21:00", league: "LA LIGA",
    ticketFrom: 65, flightFrom: 40,
    kiwiCity: "madrid-spain", dateISO: "2026-08-30",
    featured: true,
    hotels: [
      { name: "Hotel Mayorazgo Madrid", stars: 3, distanceKm: 3.5, pricePerNight: 55, url: hotelUrl("Hotel Mayorazgo Madrid", "Madrid", "2026-08-30") },
      { name: "NH Madrid Ribera del Manzanares", stars: 4, distanceKm: 5.0, pricePerNight: 75, url: hotelUrl("NH Madrid Ribera del Manzanares", "Madrid", "2026-08-30") },
      { name: "VP Jardín de Recoletos", stars: 4, distanceKm: 2.0, pricePerNight: 98, url: hotelUrl("VP Jardin de Recoletos", "Madrid", "2026-08-30") },
      { name: "NH Collection Madrid Eurobuilding", stars: 4, distanceKm: 1.5, pricePerNight: 125, url: hotelUrl("NH Collection Madrid Eurobuilding", "Madrid", "2026-08-30") },
      { name: "Hotel Villa Magna", stars: 5, distanceKm: 2.5, pricePerNight: 210, url: hotelUrl("Hotel Villa Magna", "Madrid", "2026-08-30") },
    ],
  },
  {
    home: "SEVILLA", away: "ATLETICO",
    homeAbbr: "SEV", awayAbbr: "ATM",
    homeCl: "#D4002A", awayCl: "#CE3524",
    homeBadge: B(559), awayBadge: B(78),
    stadium: "Ramón Sánchez-Pizjuán", city: "Seville", country: "ESP",
    date: "29 AUG", time: "21:30", league: "LA LIGA",
    ticketFrom: 35, flightFrom: 45,
    kiwiCity: "seville-spain", dateISO: "2026-08-29",
    hotels: [
      { name: "ibis Sevilla", stars: 3, distanceKm: 2.5, pricePerNight: 48, url: hotelUrl("ibis Sevilla", "Seville", "2026-08-29") },
      { name: "NH Sevilla Plaza de Armas", stars: 4, distanceKm: 3.0, pricePerNight: 72, url: hotelUrl("NH Sevilla Plaza de Armas", "Seville", "2026-08-29") },
      { name: "Hotel Colón Gran Meliá", stars: 5, distanceKm: 2.2, pricePerNight: 105, url: hotelUrl("Hotel Colon Gran Melia", "Seville", "2026-08-29") },
      { name: "Hotel Alfonso XIII", stars: 5, distanceKm: 2.8, pricePerNight: 155, url: hotelUrl("Hotel Alfonso XIII Seville", "Seville", "2026-08-29") },
      { name: "Mercer Sevilla", stars: 5, distanceKm: 2.5, pricePerNight: 195, url: hotelUrl("Mercer Sevilla", "Seville", "2026-08-29") },
    ],
  },

  // ─── SERIE A ─── Matchday 2 — 29–30 AUG 2026

  {
    home: "AC MILAN", away: "VENEZIA",
    homeAbbr: "MIL", awayAbbr: "VEN",
    homeCl: "#FB090B", awayCl: "#FF6600",
    homeBadge: B(98), awayBadge: B(454),
    stadium: "San Siro", city: "Milan", country: "ITA",
    date: "30 AUG", time: "20:45", league: "SERIE A",
    ticketFrom: 25, flightFrom: 31,
    kiwiCity: "milan-italy", dateISO: "2026-08-30",
    hotels: [
      { name: "Hotel Enterprise Milan", stars: 3, distanceKm: 3.1, pricePerNight: 55, url: hotelUrl("Hotel Enterprise Milan", "Milan", "2026-08-30") },
      { name: "Sheraton Milan San Siro", stars: 4, distanceKm: 1.5, pricePerNight: 79, url: hotelUrl("Sheraton Milan San Siro", "Milan", "2026-08-30") },
      { name: "NH Milano Fiera", stars: 4, distanceKm: 3.2, pricePerNight: 92, url: hotelUrl("NH Milano Fiera", "Milan", "2026-08-30") },
      { name: "DoubleTree by Hilton Milan", stars: 4, distanceKm: 5.0, pricePerNight: 115, url: hotelUrl("DoubleTree by Hilton Milan", "Milan", "2026-08-30") },
      { name: "Park Hyatt Milan", stars: 5, distanceKm: 6.5, pricePerNight: 195, url: hotelUrl("Park Hyatt Milan", "Milan", "2026-08-30") },
    ],
  },
  {
    home: "JUVENTUS", away: "PARMA",
    homeAbbr: "JUV", awayAbbr: "PAR",
    homeCl: "#ffffff", awayCl: "#FEDF17",
    homeBadge: B(109), awayBadge: B(112),
    stadium: "Allianz Stadium", city: "Turin", country: "ITA",
    date: "30 AUG", time: "20:45", league: "SERIE A",
    ticketFrom: 30, flightFrom: 32,
    kiwiCity: "turin-italy", dateISO: "2026-08-30",
    hotels: [
      { name: "iB Hotel Torino", stars: 3, distanceKm: 5.0, pricePerNight: 45, url: hotelUrl("iB Hotel Torino", "Turin", "2026-08-30") },
      { name: "NH Torino", stars: 4, distanceKm: 5.5, pricePerNight: 68, url: hotelUrl("NH Torino", "Turin", "2026-08-30") },
      { name: "Golden Palace Hotel Turin", stars: 4, distanceKm: 6.0, pricePerNight: 88, url: hotelUrl("Golden Palace Hotel Turin", "Turin", "2026-08-30") },
      { name: "NH Collection Torino Piazza Carlina", stars: 5, distanceKm: 6.5, pricePerNight: 115, url: hotelUrl("NH Collection Torino Piazza Carlina", "Turin", "2026-08-30") },
      { name: "Starhotels Majestic Turin", stars: 5, distanceKm: 5.8, pricePerNight: 145, url: hotelUrl("Starhotels Majestic Turin", "Turin", "2026-08-30") },
    ],
  },
  {
    home: "INTER", away: "NAPOLI",
    homeAbbr: "INT", awayAbbr: "NAP",
    homeCl: "#0068A8", awayCl: "#12A0D7",
    homeBadge: B(108), awayBadge: "https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg",
    stadium: "San Siro", city: "Milan", country: "ITA",
    date: "06 SEP", time: "20:45", league: "SERIE A",
    ticketFrom: 40, flightFrom: 31,
    kiwiCity: "milan-italy", dateISO: "2026-09-06",
    featured: true,
    hotels: [
      { name: "Hotel Enterprise Milan", stars: 3, distanceKm: 3.1, pricePerNight: 55, url: hotelUrl("Hotel Enterprise Milan", "Milan", "2026-09-06") },
      { name: "Sheraton Milan San Siro", stars: 4, distanceKm: 1.5, pricePerNight: 79, url: hotelUrl("Sheraton Milan San Siro", "Milan", "2026-09-06") },
      { name: "NH Milano Fiera", stars: 4, distanceKm: 3.2, pricePerNight: 92, url: hotelUrl("NH Milano Fiera", "Milan", "2026-09-06") },
      { name: "DoubleTree by Hilton Milan", stars: 4, distanceKm: 5.0, pricePerNight: 115, url: hotelUrl("DoubleTree by Hilton Milan", "Milan", "2026-09-06") },
      { name: "Park Hyatt Milan", stars: 5, distanceKm: 6.5, pricePerNight: 195, url: hotelUrl("Park Hyatt Milan", "Milan", "2026-09-06") },
    ],
  },
  {
    home: "MONZA", away: "UDINESE",
    homeAbbr: "MON", awayAbbr: "UDI",
    homeCl: "#E4002B", awayCl: "#000000",
    homeBadge: "https://upload.wikimedia.org/wikipedia/commons/0/08/AC_Monza_Brianza_1912_logo.svg", awayBadge: B(115),
    stadium: "U-Power Stadium", city: "Monza", country: "ITA",
    date: "29 AUG", time: "18:00", league: "SERIE A",
    ticketFrom: 15, flightFrom: 31,
    kiwiCity: "milan-italy", dateISO: "2026-08-29",
    hotels: [
      { name: "Hotel de la Ville Monza", stars: 4, distanceKm: 1.5, pricePerNight: 72, url: hotelUrl("Hotel de la Ville Monza", "Monza", "2026-08-29") },
      { name: "Best Western Hotel Monza", stars: 3, distanceKm: 2.0, pricePerNight: 55, url: hotelUrl("Best Western Hotel Monza", "Monza", "2026-08-29") },
      { name: "NH Milano Fiera", stars: 4, distanceKm: 12.0, pricePerNight: 85, url: hotelUrl("NH Milano Fiera", "Monza", "2026-08-29") },
      { name: "Sheraton Milan San Siro", stars: 4, distanceKm: 15.0, pricePerNight: 92, url: hotelUrl("Sheraton Milan San Siro", "Monza", "2026-08-29") },
      { name: "Park Hyatt Milan", stars: 5, distanceKm: 18.0, pricePerNight: 195, url: hotelUrl("Park Hyatt Milan", "Monza", "2026-08-29") },
    ],
  },

  // ─── BUNDESLIGA ─── Matchday 1 — 28–29 AUG 2026

  {
    home: "BAYERN", away: "STUTTGART",
    homeAbbr: "BAY", awayAbbr: "STU",
    homeCl: "#DC052D", awayCl: "#E32219",
    homeBadge: B(5), awayBadge: B(762),
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "28 AUG", time: "20:30", league: "BUNDESLIGA",
    ticketFrom: 35, flightFrom: 27,
    kiwiCity: "munich-germany", dateISO: "2026-08-28",
    featured: true,
    hotels: [
      { name: "Motel One München-Olympia", stars: 3, distanceKm: 2.8, pricePerNight: 48, url: hotelUrl("Motel One München-Olympia", "Munich", "2026-08-28") },
      { name: "H4 Hotel München Messe", stars: 4, distanceKm: 3.5, pricePerNight: 72, url: hotelUrl("H4 Hotel München Messe", "Munich", "2026-08-28") },
      { name: "Holiday Inn Munich City Centre", stars: 4, distanceKm: 7.2, pricePerNight: 88, url: hotelUrl("Holiday Inn Munich City Centre", "Munich", "2026-08-28") },
      { name: "Novotel München Messe", stars: 4, distanceKm: 4.5, pricePerNight: 108, url: hotelUrl("Novotel München Messe", "Munich", "2026-08-28") },
      { name: "Marriott Munich", stars: 5, distanceKm: 6.8, pricePerNight: 148, url: hotelUrl("Marriott Munich", "Munich", "2026-08-28") },
    ],
  },
  {
    home: "DORTMUND", away: "HAMBURG",
    homeAbbr: "BVB", awayAbbr: "HSV",
    homeCl: "#FDE100", awayCl: "#0A3D7C",
    homeBadge: B(4), awayBadge: B(7),
    stadium: "Signal Iduna Park", city: "Dortmund", country: "GER",
    date: "29 AUG", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 25, flightFrom: 30,
    kiwiCity: "dortmund-germany", dateISO: "2026-08-29",
    hotels: [
      { name: "ibis Dortmund City", stars: 3, distanceKm: 3.0, pricePerNight: 48, url: hotelUrl("ibis Dortmund City", "Dortmund", "2026-08-29") },
      { name: "B&B Hotel Dortmund City", stars: 3, distanceKm: 2.5, pricePerNight: 55, url: hotelUrl("B&B Hotel Dortmund City", "Dortmund", "2026-08-29") },
      { name: "Mercure Hotel Dortmund Centrum", stars: 4, distanceKm: 3.5, pricePerNight: 75, url: hotelUrl("Mercure Hotel Dortmund Centrum", "Dortmund", "2026-08-29") },
      { name: "Steigenberger Dortmund", stars: 4, distanceKm: 3.2, pricePerNight: 95, url: hotelUrl("Steigenberger Dortmund", "Dortmund", "2026-08-29") },
      { name: "Radisson Blu Hotel Dortmund", stars: 4, distanceKm: 3.0, pricePerNight: 110, url: hotelUrl("Radisson Blu Hotel Dortmund", "Dortmund", "2026-08-29") },
    ],
  },

  // ─── LIGUE 1 ─── Matchday 2 — 28 AUG 2026

  {
    home: "LILLE", away: "PSG",
    homeAbbr: "LIL", awayAbbr: "PSG",
    homeCl: "#CD1719", awayCl: "#003D7C",
    homeBadge: B(521), awayBadge: B(529),
    stadium: "Stade Pierre Mauroy", city: "Lille", country: "FRA",
    date: "28 AUG", time: "20:45", league: "LIGUE 1",
    ticketFrom: 35, flightFrom: 38,
    kiwiCity: "lille-france", dateISO: "2026-08-28",
    hotels: [
      { name: "ibis Lille Centre Grand Palais", stars: 3, distanceKm: 5.0, pricePerNight: 52, url: hotelUrl("ibis Lille Centre Grand Palais", "Lille", "2026-08-28") },
      { name: "Novotel Lille Centre Grand Place", stars: 4, distanceKm: 5.5, pricePerNight: 78, url: hotelUrl("Novotel Lille Centre Grand Place", "Lille", "2026-08-28") },
      { name: "Mercure Lille Centre Grand Place", stars: 4, distanceKm: 5.2, pricePerNight: 88, url: hotelUrl("Mercure Lille Centre Grand Place", "Lille", "2026-08-28") },
      { name: "Hotel Barrière Lille", stars: 5, distanceKm: 4.8, pricePerNight: 135, url: hotelUrl("Hotel Barriere Lille", "Lille", "2026-08-28") },
      { name: "Clarance Hotel Lille", stars: 5, distanceKm: 5.5, pricePerNight: 175, url: hotelUrl("Clarance Hotel Lille", "Lille", "2026-08-28") },
    ],
  },
];
