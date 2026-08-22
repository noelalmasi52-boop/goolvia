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

export const KIWI_AID = "YOUR_KIWI_AID";
export const VIAGOGO_AID = "YOUR_VIAGOGO_AID";

export function buildKiwiUrl(toCity: string, dateISO: string) {
  const match = new Date(dateISO);
  const dep = new Date(match);
  dep.setDate(dep.getDate() - 1);
  const ret = new Date(match);
  ret.setDate(ret.getDate() + 1);
  const depDate = dep.toISOString().split("T")[0];
  const retDate = ret.toISOString().split("T")[0];
  return `https://www.kiwi.com/en/search/results/bratislava-slovakia/${encodeURIComponent(toCity)}/${depDate}/${retDate}?affilid=${KIWI_AID}`;
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
      { name: "Hotel Miramar Barcelona", stars: 3, distanceKm: 6.2, pricePerNight: 52, url: hotelUrl("Hotel Miramar Barcelona", "Barcelona", "2026-08-29") },
      { name: "AC Hotel Barcelona Forum", stars: 4, distanceKm: 5.8, pricePerNight: 78, url: hotelUrl("AC Hotel Barcelona Forum", "Barcelona", "2026-08-29") },
      { name: "NH Collection Barcelona Gran Hotel Calderón", stars: 4, distanceKm: 7.1, pricePerNight: 99, url: hotelUrl("NH Collection Barcelona Gran Hotel Calderon", "Barcelona", "2026-08-29") },
      { name: "Melia Barcelona Sarrià", stars: 4, distanceKm: 7.5, pricePerNight: 118, url: hotelUrl("Melia Barcelona Sarria", "Barcelona", "2026-08-29") },
      { name: "Hotel Arts Barcelona", stars: 5, distanceKm: 8.0, pricePerNight: 195, url: hotelUrl("Hotel Arts Barcelona", "Barcelona", "2026-08-29") },
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
      { name: "iB Hotel Torino", stars: 3, distanceKm: 3.8, pricePerNight: 45, url: hotelUrl("iB Hotel Torino", "Turin", "2026-09-12") },
      { name: "NH Torino", stars: 4, distanceKm: 4.2, pricePerNight: 68, url: hotelUrl("NH Torino", "Turin", "2026-09-12") },
      { name: "Golden Palace Hotel Turin", stars: 4, distanceKm: 4.5, pricePerNight: 88, url: hotelUrl("Golden Palace Hotel Turin", "Turin", "2026-09-12") },
      { name: "NH Collection Torino Piazza Carlina", stars: 5, distanceKm: 5.0, pricePerNight: 115, url: hotelUrl("NH Collection Torino Piazza Carlina", "Turin", "2026-09-12") },
      { name: "Starhotels Majestic Turin", stars: 5, distanceKm: 4.8, pricePerNight: 145, url: hotelUrl("Starhotels Majestic Turin", "Turin", "2026-09-12") },
    ],
  },
  {
    home: "INTER", away: "MONZA",
    homeAbbr: "INT", awayAbbr: "MON",
    homeCl: "#0068A8", awayCl: "#E4002B",
    homeBadge: B(108), awayBadge: "https://upload.wikimedia.org/wikipedia/commons/0/08/AC_Monza_Brianza_1912_logo.svg",
    stadium: "San Siro", city: "Milan", country: "ITA",
    date: "19 SEP", time: "18:00", league: "SERIE A",
    ticketFrom: 18, flightFrom: 31,
    kiwiCity: "milan-italy", dateISO: "2026-09-19",
    hotels: [
      { name: "Hotel Enterprise Milan", stars: 3, distanceKm: 3.1, pricePerNight: 55, url: hotelUrl("Hotel Enterprise Milan", "Milan", "2026-09-19") },
      { name: "Sheraton Milan San Siro", stars: 4, distanceKm: 1.5, pricePerNight: 79, url: hotelUrl("Sheraton Milan San Siro", "Milan", "2026-09-19") },
      { name: "NH Milano Fiera", stars: 4, distanceKm: 3.2, pricePerNight: 92, url: hotelUrl("NH Milano Fiera", "Milan", "2026-09-19") },
      { name: "DoubleTree by Hilton Milan", stars: 4, distanceKm: 5.0, pricePerNight: 115, url: hotelUrl("DoubleTree by Hilton Milan", "Milan", "2026-09-19") },
      { name: "Park Hyatt Milan", stars: 5, distanceKm: 6.5, pricePerNight: 195, url: hotelUrl("Park Hyatt Milan", "Milan", "2026-09-19") },
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
      { name: "Motel One München-Olympia", stars: 3, distanceKm: 2.8, pricePerNight: 48, url: hotelUrl("Motel One München-Olympia", "Munich", "2026-09-05") },
      { name: "H4 Hotel München Messe", stars: 4, distanceKm: 3.5, pricePerNight: 72, url: hotelUrl("H4 Hotel München Messe", "Munich", "2026-09-05") },
      { name: "Holiday Inn Munich City Centre", stars: 4, distanceKm: 7.2, pricePerNight: 88, url: hotelUrl("Holiday Inn Munich City Centre", "Munich", "2026-09-05") },
      { name: "Novotel München Messe", stars: 4, distanceKm: 4.5, pricePerNight: 108, url: hotelUrl("Novotel München Messe", "Munich", "2026-09-05") },
      { name: "Marriott Munich", stars: 5, distanceKm: 6.8, pricePerNight: 148, url: hotelUrl("Marriott Munich", "Munich", "2026-09-05") },
    ],
  },

  // ─── PREMIER LEAGUE ───
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
      { name: "Travelodge London Kings Cross", stars: 3, distanceKm: 3.5, pricePerNight: 55, url: hotelUrl("Travelodge London Kings Cross", "London", "2026-08-21") },
      { name: "Premier Inn London Kings Cross", stars: 3, distanceKm: 3.5, pricePerNight: 68, url: hotelUrl("Premier Inn London Kings Cross", "London", "2026-08-21") },
      { name: "Holiday Inn London Islington", stars: 4, distanceKm: 2.8, pricePerNight: 88, url: hotelUrl("Holiday Inn London Islington", "London", "2026-08-21") },
      { name: "The Megaro Hotel", stars: 4, distanceKm: 3.6, pricePerNight: 99, url: hotelUrl("The Megaro Hotel", "London", "2026-08-21") },
      { name: "Great Northern Hotel London", stars: 5, distanceKm: 3.8, pricePerNight: 145, url: hotelUrl("Great Northern Hotel London", "London", "2026-08-21") },
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
      { name: "ibis Styles Hull City Centre", stars: 3, distanceKm: 2.5, pricePerNight: 50, url: hotelUrl("ibis Styles Hull City Centre", "Hull", "2026-08-22") },
      { name: "Leonardo Hotel Hull", stars: 3, distanceKm: 2.8, pricePerNight: 60, url: hotelUrl("Leonardo Hotel Hull", "Hull", "2026-08-22") },
      { name: "Mercure Hull Royal Hotel", stars: 4, distanceKm: 2.6, pricePerNight: 72, url: hotelUrl("Mercure Hull Royal Hotel", "Hull", "2026-08-22") },
      { name: "DoubleTree by Hilton Hull", stars: 4, distanceKm: 3.0, pricePerNight: 85, url: hotelUrl("DoubleTree by Hilton Hull", "Hull", "2026-08-22") },
      { name: "Village Hotel Hull", stars: 4, distanceKm: 3.5, pricePerNight: 95, url: hotelUrl("Village Hotel Hull", "Hull", "2026-08-22") },
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
      { name: "ibis Nottingham Centre", stars: 3, distanceKm: 2.2, pricePerNight: 52, url: hotelUrl("ibis Nottingham Centre", "Nottingham", "2026-08-22") },
      { name: "Premier Inn Nottingham City Centre", stars: 3, distanceKm: 2.5, pricePerNight: 64, url: hotelUrl("Premier Inn Nottingham City Centre", "Nottingham", "2026-08-22") },
      { name: "Park Plaza Nottingham", stars: 4, distanceKm: 2.8, pricePerNight: 82, url: hotelUrl("Park Plaza Nottingham", "Nottingham", "2026-08-22") },
      { name: "DoubleTree by Hilton Nottingham", stars: 4, distanceKm: 3.0, pricePerNight: 95, url: hotelUrl("DoubleTree by Hilton Nottingham", "Nottingham", "2026-08-22") },
      { name: "Hart's Hotel Nottingham", stars: 5, distanceKm: 2.0, pricePerNight: 120, url: hotelUrl("Harts Hotel Nottingham", "Nottingham", "2026-08-22") },
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
      { name: "ibis Liverpool Centre", stars: 3, distanceKm: 3.5, pricePerNight: 55, url: hotelUrl("ibis Liverpool Centre", "Liverpool", "2026-08-22") },
      { name: "Premier Inn Liverpool City Centre", stars: 3, distanceKm: 3.8, pricePerNight: 68, url: hotelUrl("Premier Inn Liverpool City Centre", "Liverpool", "2026-08-22") },
      { name: "Holiday Inn Liverpool City Centre", stars: 4, distanceKm: 4.0, pricePerNight: 80, url: hotelUrl("Holiday Inn Liverpool City Centre", "Liverpool", "2026-08-22") },
      { name: "Malmaison Liverpool", stars: 4, distanceKm: 4.2, pricePerNight: 95, url: hotelUrl("Malmaison Liverpool", "Liverpool", "2026-08-22") },
      { name: "Hope Street Hotel", stars: 5, distanceKm: 4.5, pricePerNight: 118, url: hotelUrl("Hope Street Hotel", "Liverpool", "2026-08-22") },
    ],
  },
  {
    home: "IPSWICH", away: "SUNDERLAND",
    homeAbbr: "IPS", awayAbbr: "SUN",
    homeCl: "#0033A0", awayCl: "#EB172B",
    homeBadge: B(349), awayBadge: "https://upload.wikimedia.org/wikipedia/en/7/77/Logo_Sunderland.svg",
    stadium: "Portman Road", city: "Ipswich", country: "ENG",
    date: "22 AUG", time: "16:00", league: "PREMIER LEAGUE",
    ticketFrom: 12, flightFrom: 40,
    kiwiCity: "london-stansted-united-kingdom", dateISO: "2026-08-22",
    hotels: [
      { name: "ibis Ipswich", stars: 3, distanceKm: 1.8, pricePerNight: 45, url: hotelUrl("ibis Ipswich", "Ipswich", "2026-08-22") },
      { name: "Premier Inn Ipswich Town Centre", stars: 3, distanceKm: 1.5, pricePerNight: 55, url: hotelUrl("Premier Inn Ipswich Town Centre", "Ipswich", "2026-08-22") },
      { name: "Holiday Inn Ipswich", stars: 4, distanceKm: 2.0, pricePerNight: 72, url: hotelUrl("Holiday Inn Ipswich", "Ipswich", "2026-08-22") },
      { name: "Novotel Ipswich Centre", stars: 4, distanceKm: 1.6, pricePerNight: 82, url: hotelUrl("Novotel Ipswich Centre", "Ipswich", "2026-08-22") },
      { name: "Salthouse Harbour Hotel", stars: 5, distanceKm: 2.5, pricePerNight: 115, url: hotelUrl("Salthouse Harbour Hotel", "Ipswich", "2026-08-22") },
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
      { name: "Travelodge London Kew Bridge", stars: 3, distanceKm: 2.2, pricePerNight: 58, url: hotelUrl("Travelodge London Kew Bridge", "London", "2026-08-22") },
      { name: "Holiday Inn London Brentford Lock", stars: 4, distanceKm: 1.5, pricePerNight: 80, url: hotelUrl("Holiday Inn London Brentford Lock", "London", "2026-08-22") },
      { name: "ibis London Earls Court", stars: 3, distanceKm: 3.8, pricePerNight: 70, url: hotelUrl("ibis London Earls Court", "London", "2026-08-22") },
      { name: "Kew Green Hotel", stars: 4, distanceKm: 2.8, pricePerNight: 95, url: hotelUrl("Kew Green Hotel", "London", "2026-08-22") },
      { name: "Novotel London Heathrow", stars: 4, distanceKm: 5.5, pricePerNight: 88, url: hotelUrl("Novotel London Heathrow", "London", "2026-08-22") },
    ],
  },
];
