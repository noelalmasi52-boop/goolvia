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
  returnDaysAfter?: number;
  transportType?: "flight" | "bus" | "train";
  transportUrl?: string;
  hotels: Hotel[];
  kiwiCity: string;
  dateISO: string;
  featured?: boolean;
};

export const CJ_CLICK_URL = "https://www.dpbolvw.net/click-101856071-12624156";

export function buildKiwiUrl(toCity: string, dateISO: string, returnDaysAfter = 2) {
  const match = new Date(dateISO);
  const dep = new Date(match);
  dep.setDate(dep.getDate() - 1);
  const ret = new Date(match);
  ret.setDate(ret.getDate() + returnDaysAfter);
  const depDate = dep.toISOString().split("T")[0];
  const retDate = ret.toISOString().split("T")[0];
  const kiwiUrl = `https://www.kiwi.com/en/search/results/bratislava-slovakia/${encodeURIComponent(toCity)}/${depDate}/${retDate}?sortBy=price&flightDirectOnly=true`;
  return `${CJ_CLICK_URL}?url=${encodeURIComponent(kiwiUrl)}`;
}

// Fallback keď FTN API nevráti live event pre daný zápas — smeruje na
// vyhľadávanie priamo na footballticketnet.com (partnerský program Goolvia).
export function buildTicketUrl(home: string, away: string) {
  const query = encodeURIComponent(`${home} vs ${away}`);
  return `https://www.footballticketnet.com/search-results?q=${query}`;
}

const B = (id: number) => `/crests/${id}.svg`;
const W = (url: string) => url;

export const MATCHES: Match[] = [

  // ═══════════════════════════════════════════
  // PREMIER LEAGUE — priamy let Bratislava → Londýn (Stansted)
  // ═══════════════════════════════════════════
  {
    home: "FULHAM", away: "ASTON VILLA",
    homeAbbr: "FUL", awayAbbr: "AVL",
    homeCl: "#000000", awayCl: "#670E36",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/9/9a/Aston_Villa_FC_new_crest.svg"),
    stadium: "Craven Cottage", city: "London", country: "GBR",
    date: "17 OCT", time: "15:00", league: "PREMIER LEAGUE",
    ticketFrom: 60, flightFrom: 128,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "Barclay House Fulham", stars: 3, distanceKm: 1.2, pricePerNight: 89, url: "https://www.booking.com/hotel/gb/barclay-house-fulham.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "The Fulham Boutique Apartments", stars: 3, distanceKm: 1.8, pricePerNight: 96, url: "https://www.booking.com/hotel/gb/fulham-boutique-apartments.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 9.0, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
    ],
  },
  {
    home: "ARSENAL", away: "MANCHESTER CITY",
    homeAbbr: "ARS", awayAbbr: "MCI",
    homeCl: "#EF0107", awayCl: "#6CABDD",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"),
    stadium: "Emirates Stadium", city: "London", country: "GBR",
    date: "18 OCT", time: "17:30", league: "PREMIER LEAGUE",
    ticketFrom: 95, flightFrom: 128,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "287 Green Lanes", stars: 3, distanceKm: 2.5, pricePerNight: 65, url: "https://www.booking.com/hotel/gb/287-green-lanes.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Holiday Villa Highbury", stars: 3, distanceKm: 1.5, pricePerNight: 78, url: "https://www.booking.com/hotel/gb/holiday-villa-highbury.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 10.0, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
    ],
  },
  {
    home: "WEST HAM", away: "NEWCASTLE",
    homeAbbr: "WHU", awayAbbr: "NEW",
    homeCl: "#7A263A", awayCl: "#241F20",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg"),
    stadium: "London Stadium", city: "London", country: "GBR",
    date: "24 OCT", time: "15:00", league: "PREMIER LEAGUE",
    ticketFrom: 65, flightFrom: 132,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "Stratford Manor Apartments", stars: 3, distanceKm: 1.5, pricePerNight: 82, url: "https://www.booking.com/hotel/gb/stratford-manor-apartments.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Ibis London Stratford", stars: 3, distanceKm: 1.0, pricePerNight: 88, url: "https://www.booking.com/hotel/gb/ibis-london-stratford.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 6.5, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
    ],
  },
  {
    home: "CHELSEA", away: "MANCHESTER UTD",
    homeAbbr: "CHE", awayAbbr: "MUN",
    homeCl: "#034694", awayCl: "#DA020E",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg"),
    stadium: "Stamford Bridge", city: "London", country: "GBR",
    date: "25 OCT", time: "16:30", league: "PREMIER LEAGUE",
    ticketFrom: 90, flightFrom: 128,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "Smart Hyde Park View", stars: 3, distanceKm: 4.0, pricePerNight: 75, url: "https://www.booking.com/hotel/gb/smart-hyde-park-view.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Fulham Road Studios", stars: 3, distanceKm: 1.8, pricePerNight: 92, url: "https://www.booking.com/hotel/gb/fulham-road-studios.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 9.5, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
    ],
  },
  {
    home: "TOTTENHAM", away: "LIVERPOOL",
    homeAbbr: "TOT", awayAbbr: "LIV",
    homeCl: "#132257", awayCl: "#C8102E",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"),
    stadium: "Tottenham Hotspur Stadium", city: "London", country: "GBR",
    date: "31 OCT", time: "20:00", league: "PREMIER LEAGUE",
    ticketFrom: 85, flightFrom: 135,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "287 Green Lanes", stars: 3, distanceKm: 3.5, pricePerNight: 65, url: "https://www.booking.com/hotel/gb/287-green-lanes.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "Holiday Villa Highbury", stars: 3, distanceKm: 3.0, pricePerNight: 78, url: "https://www.booking.com/hotel/gb/holiday-villa-highbury.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 11.0, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
    ],
  },

  // ═══════════════════════════════════════════
  // LA LIGA — priamy let Bratislava → Barcelona / Valencia / Sevilla
  // ═══════════════════════════════════════════
  {
    home: "BARCELONA", away: "ATHLETIC BILBAO",
    homeAbbr: "FCB", awayAbbr: "ATH",
    homeCl: "#A50044", awayCl: "#EE2523",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg"),
    stadium: "Spotify Camp Nou", city: "Barcelona", country: "ESP",
    date: "17 OCT", time: "16:15", league: "LA LIGA",
    ticketFrom: 75, flightFrom: 85,
    kiwiCity: "barcelona-spain", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "Hostal Girona", stars: 3, distanceKm: 3.0, pricePerNight: 78, url: "https://www.booking.com/hotel/es/girona54.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Catalonia La Maquinista", stars: 3, distanceKm: 6.0, pricePerNight: 89, url: "https://www.booking.com/hotel/es/catalonialamaquinista.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Ten To Go Hostel", stars: 0, distanceKm: 4.0, pricePerNight: 42, isHostel: true, url: "https://www.booking.com/hotel/es/ten-to-go-hostel.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
    ],
  },
  {
    home: "GIRONA", away: "ATLETICO MADRID",
    homeAbbr: "GIR", awayAbbr: "ATM",
    homeCl: "#CB1D2C", awayCl: "#CB3524",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f7/Girona_FC_Logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/c/c1/Atletico_Madrid_logo.svg"),
    stadium: "Estadi Montilivi", city: "Girona", country: "ESP",
    date: "18 OCT", time: "19:00", league: "LA LIGA",
    ticketFrom: 55, flightFrom: 79,
    kiwiCity: "girona-spain", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "Hotel Ultonia", stars: 3, distanceKm: 2.0, pricePerNight: 74, url: "https://www.booking.com/hotel/es/ultonia.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Girona Apartments Rambla", stars: 3, distanceKm: 1.6, pricePerNight: 80, url: "https://www.booking.com/hotel/es/girona-apartments-rambla.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Alberg Rocaferil", stars: 0, distanceKm: 2.5, pricePerNight: 33, isHostel: true, url: "https://www.booking.com/hotel/es/alberg-rocaferil.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
    ],
  },
  {
    home: "VALENCIA", away: "VILLARREAL",
    homeAbbr: "VAL", awayAbbr: "VIL",
    homeCl: "#F49B20", awayCl: "#FFE667",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo-en.svg"),
    stadium: "Mestalla", city: "Valencia", country: "ESP",
    date: "24 OCT", time: "18:30", league: "LA LIGA",
    ticketFrom: 60, flightFrom: 88,
    kiwiCity: "valencia-spain", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "Home Youth Hostel", stars: 3, distanceKm: 1.5, pricePerNight: 68, url: "https://www.booking.com/hotel/es/home-hostel-valencia.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Petit Palace Bristol", stars: 3, distanceKm: 2.2, pricePerNight: 84, url: "https://www.booking.com/hotel/es/petit-palace-bristol.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Purple Nest Hostel", stars: 0, distanceKm: 1.0, pricePerNight: 30, isHostel: true, url: "https://www.booking.com/hotel/es/purple-nest-hostel.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
    ],
  },
  {
    home: "SEVILLA", away: "REAL BETIS",
    homeAbbr: "SEV", awayAbbr: "BET",
    homeCl: "#D71920", awayCl: "#00954C",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/2/2f/Real_Betis_2022_logo.svg"),
    stadium: "Ramón Sánchez-Pizjuán", city: "Seville", country: "ESP",
    date: "31 OCT", time: "21:00", league: "DERBI SEVILLANO · LA LIGA",
    ticketFrom: 110, flightFrom: 118,
    kiwiCity: "seville-spain", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "Futurotel Sevilla", stars: 3, distanceKm: 3.0, pricePerNight: 73, url: "https://www.booking.com/hotel/es/futurotel-sevilla-space.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "Pension Azahar", stars: 2, distanceKm: 2.5, pricePerNight: 80, url: "https://www.booking.com/hotel/es/pension-azahar.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "Hostel Triana Backpackers", stars: 0, distanceKm: 3.5, pricePerNight: 50, isHostel: true, url: "https://www.booking.com/hotel/es/albergue-triana-backpackers.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
    ],
  },
  {
    home: "BARCELONA", away: "REAL MADRID",
    homeAbbr: "FCB", awayAbbr: "RMA",
    homeCl: "#A50044", awayCl: "#00529F",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"),
    stadium: "Spotify Camp Nou", city: "Barcelona", country: "ESP",
    date: "25 OCT", time: "21:00", league: "EL CLÁSICO · LA LIGA",
    ticketFrom: 190, flightFrom: 85,
    kiwiCity: "barcelona-spain", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "Hostal Argo", stars: 2, distanceKm: 4.0, pricePerNight: 146, url: "https://www.booking.com/hotel/es/hostal-argo.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Catalonia La Maquinista", stars: 3, distanceKm: 8.0, pricePerNight: 165, url: "https://www.booking.com/hotel/es/catalonialamaquinista.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Ten To Go Hostel", stars: 0, distanceKm: 4.5, pricePerNight: 68, isHostel: true, url: "https://www.booking.com/hotel/es/ten-to-go-hostel.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
    ],
  },

  // ═══════════════════════════════════════════
  // SERIE A — priamy let Bratislava → Miláno (Bergamo) / Rím / Neapol
  // ═══════════════════════════════════════════
  {
    home: "NAPOLI", away: "AS ROMA",
    homeAbbr: "NAP", awayAbbr: "ROM",
    homeCl: "#12A0D7", awayCl: "#CC0000",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg"),
    stadium: "Stadio Diego Armando Maradona", city: "Naples", country: "ITA",
    date: "17 OCT", time: "20:45", league: "SERIE A",
    ticketFrom: 60, flightFrom: 96,
    kiwiCity: "naples-italy", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "Hotel Ginevra", stars: 3, distanceKm: 4.5, pricePerNight: 65, url: "https://www.booking.com/hotel/it/hotelginevranapoli.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Sweet Dreams Napoli", stars: 3, distanceKm: 5.5, pricePerNight: 70, url: "https://www.booking.com/hotel/it/sweet-dreams-napoli12.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Hostel B&B ALMA", stars: 0, distanceKm: 4.5, pricePerNight: 38, isHostel: true, url: "https://www.booking.com/hotel/it/hostel-b-amp-b-alma.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
    ],
  },
  {
    home: "AC MILAN", away: "NAPOLI",
    homeAbbr: "MIL", awayAbbr: "NAP",
    homeCl: "#CC0000", awayCl: "#12A0D7",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg"),
    stadium: "Stadio San Siro", city: "Milan", country: "ITA",
    date: "18 OCT", time: "20:45", league: "SERIE A",
    ticketFrom: 70, flightFrom: 63,
    kiwiCity: "milan-italy", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "Hotel Alessander", stars: 3, distanceKm: 5.5, pricePerNight: 94, url: "https://www.booking.com/hotel/it/alessander.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Hotel RossoVino Milano", stars: 3, distanceKm: 5.0, pricePerNight: 98, url: "https://www.booking.com/hotel/it/rossovino.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Babila Hostel & Bistrot", stars: 0, distanceKm: 5.5, pricePerNight: 68, isHostel: true, url: "https://www.booking.com/hotel/it/babila-hostel.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
    ],
  },
  {
    home: "ATALANTA", away: "AC MILAN",
    homeAbbr: "ATA", awayAbbr: "MIL",
    homeCl: "#1C5EA6", awayCl: "#CC0000",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f2/Atalanta_BC_new_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg"),
    stadium: "Gewiss Stadium", city: "Bergamo", country: "ITA",
    date: "24 OCT", time: "18:00", league: "SERIE A",
    ticketFrom: 55, flightFrom: 58,
    kiwiCity: "bergamo-italy", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "Hotel Piazza Vecchia", stars: 3, distanceKm: 3.0, pricePerNight: 76, url: "https://www.booking.com/hotel/it/piazza-vecchia.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Bergamo City Apartments", stars: 3, distanceKm: 2.2, pricePerNight: 82, url: "https://www.booking.com/hotel/it/bergamo-city-apartments.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Ostello di Bergamo", stars: 0, distanceKm: 3.5, pricePerNight: 32, isHostel: true, url: "https://www.booking.com/hotel/it/ostello-di-bergamo.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
    ],
  },
  {
    home: "INTER", away: "JUVENTUS",
    homeAbbr: "INT", awayAbbr: "JUV",
    homeCl: "#0068A8", awayCl: "#000000",
    homeBadge: B(108),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/5/51/Juventus_FC_2017_logo.png"),
    stadium: "Stadio San Siro", city: "Milan", country: "ITA",
    date: "25 OCT", time: "20:45", league: "DERBY D'ITALIA · SERIE A",
    ticketFrom: 130, flightFrom: 63,
    kiwiCity: "milan-italy", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "Hotel Alessander", stars: 3, distanceKm: 5.5, pricePerNight: 98, url: "https://www.booking.com/hotel/it/alessander.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Hotel RossoVino Milano", stars: 3, distanceKm: 5.0, pricePerNight: 105, url: "https://www.booking.com/hotel/it/rossovino.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Babila Hostel & Bistrot", stars: 0, distanceKm: 5.5, pricePerNight: 72, isHostel: true, url: "https://www.booking.com/hotel/it/babila-hostel.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
    ],
  },
  {
    home: "AS ROMA", away: "LAZIO",
    homeAbbr: "ROM", awayAbbr: "LAZ",
    homeCl: "#CC0000", awayCl: "#87D8F7",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg"),
    stadium: "Stadio Olimpico", city: "Rome", country: "ITA",
    date: "31 OCT", time: "18:00", league: "DERBY DELLA CAPITALE · SERIE A",
    ticketFrom: 100, flightFrom: 81,
    kiwiCity: "rome-italy", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "Hotel Center 3", stars: 3, distanceKm: 7.0, pricePerNight: 78, url: "https://www.booking.com/hotel/it/vicious.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "LunaBlù", stars: 3, distanceKm: 6.0, pricePerNight: 88, url: "https://www.booking.com/hotel/it/lunablu.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "Palace Rome", stars: 0, distanceKm: 11.0, pricePerNight: 59, isHostel: true, url: "https://www.booking.com/hotel/it/hostel-prima-base.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
    ],
  },

  // ═══════════════════════════════════════════
  // BUNDESLIGA — priamy let Bratislava → Kolín nad Rýnom / Frankfurt (Hahn)
  // ═══════════════════════════════════════════
  {
    home: "EINTRACHT FRANKFURT", away: "BAYERN MUNICH",
    homeAbbr: "SGE", awayAbbr: "BAY",
    homeCl: "#E1000F", awayCl: "#DC052D",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/7/7e/Eintracht_Frankfurt_crest.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg"),
    stadium: "Deutsche Bank Park", city: "Frankfurt", country: "GER",
    date: "17 OCT", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 75, flightFrom: 69,
    kiwiCity: "frankfurt-germany", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "Hotel Concorde Frankfurt", stars: 3, distanceKm: 5.0, pricePerNight: 79, url: "https://www.booking.com/hotel/de/concorde-frankfurt.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Frankfurt City Apartments Ostend", stars: 3, distanceKm: 3.5, pricePerNight: 85, url: "https://www.booking.com/hotel/de/frankfurt-city-apartments-ostend.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Five Elements Hostel", stars: 0, distanceKm: 4.0, pricePerNight: 36, isHostel: true, url: "https://www.booking.com/hotel/de/five-elements-hostel.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
    ],
  },
  {
    home: "BAYER LEVERKUSEN", away: "BAYERN MUNICH",
    homeAbbr: "B04", awayAbbr: "BAY",
    homeCl: "#E32219", awayCl: "#DC052D",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg"),
    stadium: "BayArena", city: "Leverkusen", country: "GER",
    date: "18 OCT", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 85, flightFrom: 64,
    kiwiCity: "cologne-germany", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "Hotel Uerige am Rhein", stars: 3, distanceKm: 12.0, pricePerNight: 74, url: "https://www.booking.com/hotel/de/uerige-am-rhein.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Leverkusen City Apartments", stars: 3, distanceKm: 3.0, pricePerNight: 80, url: "https://www.booking.com/hotel/de/leverkusen-city-apartments.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Backpackers Cologne Hostel", stars: 0, distanceKm: 13.0, pricePerNight: 30, isHostel: true, url: "https://www.booking.com/hotel/de/backpackers-cologne.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
    ],
  },
  {
    home: "BAYER LEVERKUSEN", away: "BORUSSIA MÖNCHENGLADBACH",
    homeAbbr: "B04", awayAbbr: "BMG",
    homeCl: "#E32219", awayCl: "#00963C",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_Mönchengladbach_logo.svg"),
    stadium: "BayArena", city: "Leverkusen", country: "GER",
    date: "24 OCT", time: "15:30", league: "BUNDESLIGA",
    ticketFrom: 60, flightFrom: 64,
    kiwiCity: "cologne-germany", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "Hotel Uerige am Rhein", stars: 3, distanceKm: 12.0, pricePerNight: 72, url: "https://www.booking.com/hotel/de/uerige-am-rhein.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Leverkusen City Apartments", stars: 3, distanceKm: 3.0, pricePerNight: 78, url: "https://www.booking.com/hotel/de/leverkusen-city-apartments.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Backpackers Cologne Hostel", stars: 0, distanceKm: 13.0, pricePerNight: 30, isHostel: true, url: "https://www.booking.com/hotel/de/backpackers-cologne.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
    ],
  },
  {
    home: "1. FC KÖLN", away: "BORUSSIA DORTMUND",
    homeAbbr: "KOE", awayAbbr: "BVB",
    homeCl: "#ED1C24", awayCl: "#FDE100",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d8/Emblem_1.FC_K%C3%B6ln.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"),
    stadium: "RheinEnergieStadion", city: "Cologne", country: "GER",
    date: "25 OCT", time: "15:30", league: "BUNDESLIGA",
    ticketFrom: 70, flightFrom: 64,
    kiwiCity: "cologne-germany", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "Hotel Uerige am Rhein", stars: 3, distanceKm: 4.0, pricePerNight: 76, url: "https://www.booking.com/hotel/de/uerige-am-rhein.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Cologne Riverside Apartments", stars: 3, distanceKm: 3.2, pricePerNight: 82, url: "https://www.booking.com/hotel/de/cologne-riverside-apartments.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Backpackers Cologne Hostel", stars: 0, distanceKm: 3.5, pricePerNight: 30, isHostel: true, url: "https://www.booking.com/hotel/de/backpackers-cologne.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
    ],
  },
  {
    home: "EINTRACHT FRANKFURT", away: "RB LEIPZIG",
    homeAbbr: "SGE", awayAbbr: "RBL",
    homeCl: "#E1000F", awayCl: "#DD0741",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/7/7e/Eintracht_Frankfurt_crest.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg"),
    stadium: "Deutsche Bank Park", city: "Frankfurt", country: "GER",
    date: "31 OCT", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 70, flightFrom: 69,
    kiwiCity: "frankfurt-germany", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "Hotel Concorde Frankfurt", stars: 3, distanceKm: 5.0, pricePerNight: 82, url: "https://www.booking.com/hotel/de/concorde-frankfurt.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "Frankfurt City Apartments Ostend", stars: 3, distanceKm: 3.5, pricePerNight: 88, url: "https://www.booking.com/hotel/de/frankfurt-city-apartments-ostend.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "Five Elements Hostel", stars: 0, distanceKm: 4.0, pricePerNight: 36, isHostel: true, url: "https://www.booking.com/hotel/de/five-elements-hostel.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
    ],
  },

  // ═══════════════════════════════════════════
  // LIGUE 1 — priamy let Bratislava → Paríž (Beauvais)
  // ═══════════════════════════════════════════
  {
    home: "PARIS FC", away: "LILLE",
    homeAbbr: "PFC", awayAbbr: "LIL",
    homeCl: "#004A93", awayCl: "#C10021",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/9/9f/Paris_FC_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/3/3f/Lille_OSC_2018_logo.svg"),
    stadium: "Stade Jean-Bouin", city: "Paris", country: "FRA",
    date: "17 OCT", time: "17:00", league: "LIGUE 1",
    ticketFrom: 45, flightFrom: 92,
    kiwiCity: "paris-france", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "hotelF1 Porte de Châtillon", stars: 2, distanceKm: 3.0, pricePerNight: 64, url: "https://www.booking.com/hotel/fr/hotelf1-paris-porte-de-chatillon-paris.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Hotel Lilas Gambetta", stars: 3, distanceKm: 9.0, pricePerNight: 98, url: "https://www.booking.com/hotel/fr/lilasgambetta.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Résidence Internationale de Paris", stars: 0, distanceKm: 6.0, pricePerNight: 54, isHostel: true, url: "https://www.booking.com/hotel/fr/residence-internationale-de-paris.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
    ],
  },
  {
    home: "PSG", away: "MARSEILLE",
    homeAbbr: "PSG", awayAbbr: "OM",
    homeCl: "#004170", awayCl: "#2FAEE0",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg"),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "18 OCT", time: "20:45", league: "LE CLASSIQUE · LIGUE 1",
    ticketFrom: 95, flightFrom: 92,
    kiwiCity: "paris-france", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "hotelF1 Porte de Châtillon", stars: 2, distanceKm: 4.0, pricePerNight: 68, url: "https://www.booking.com/hotel/fr/hotelf1-paris-porte-de-chatillon-paris.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Hotel Lilas Gambetta", stars: 3, distanceKm: 11.0, pricePerNight: 106, url: "https://www.booking.com/hotel/fr/lilasgambetta.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
      { name: "Résidence Internationale de Paris", stars: 0, distanceKm: 8.0, pricePerNight: 56, isHostel: true, url: "https://www.booking.com/hotel/fr/residence-internationale-de-paris.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=2" },
    ],
  },
  {
    home: "PSG", away: "LYON",
    homeAbbr: "PSG", awayAbbr: "OL",
    homeCl: "#004170", awayCl: "#0D3CA1",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/1/1c/Olympique_Lyonnais_logo.svg"),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "24 OCT", time: "17:00", league: "LIGUE 1",
    ticketFrom: 65, flightFrom: 92,
    kiwiCity: "paris-france", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "hotelF1 Porte de Châtillon", stars: 2, distanceKm: 4.0, pricePerNight: 66, url: "https://www.booking.com/hotel/fr/hotelf1-paris-porte-de-chatillon-paris.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Hotel Lilas Gambetta", stars: 3, distanceKm: 11.0, pricePerNight: 100, url: "https://www.booking.com/hotel/fr/lilasgambetta.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Résidence Internationale de Paris", stars: 0, distanceKm: 8.0, pricePerNight: 55, isHostel: true, url: "https://www.booking.com/hotel/fr/residence-internationale-de-paris.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
    ],
  },
  {
    home: "PARIS FC", away: "MONACO",
    homeAbbr: "PFC", awayAbbr: "ASM",
    homeCl: "#004A93", awayCl: "#E7002A",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/9/9f/Paris_FC_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/c/cf/LogoASMonacoFC2021.svg"),
    stadium: "Stade Jean-Bouin", city: "Paris", country: "FRA",
    date: "25 OCT", time: "15:00", league: "LIGUE 1",
    ticketFrom: 50, flightFrom: 92,
    kiwiCity: "paris-france", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "hotelF1 Porte de Châtillon", stars: 2, distanceKm: 3.0, pricePerNight: 65, url: "https://www.booking.com/hotel/fr/hotelf1-paris-porte-de-chatillon-paris.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Hotel Lilas Gambetta", stars: 3, distanceKm: 9.0, pricePerNight: 99, url: "https://www.booking.com/hotel/fr/lilasgambetta.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Résidence Internationale de Paris", stars: 0, distanceKm: 6.0, pricePerNight: 54, isHostel: true, url: "https://www.booking.com/hotel/fr/residence-internationale-de-paris.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
    ],
  },
  {
    home: "PSG", away: "NICE",
    homeAbbr: "PSG", awayAbbr: "OGCN",
    homeCl: "#004170", awayCl: "#CC1E22",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/2/2e/OGC_Nice_logo.svg"),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "31 OCT", time: "20:45", league: "LIGUE 1",
    ticketFrom: 60, flightFrom: 95,
    kiwiCity: "paris-france", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "hotelF1 Porte de Châtillon", stars: 2, distanceKm: 4.0, pricePerNight: 70, url: "https://www.booking.com/hotel/fr/hotelf1-paris-porte-de-chatillon-paris.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "Hotel Lilas Gambetta", stars: 3, distanceKm: 11.0, pricePerNight: 104, url: "https://www.booking.com/hotel/fr/lilasgambetta.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "Résidence Internationale de Paris", stars: 0, distanceKm: 8.0, pricePerNight: 57, isHostel: true, url: "https://www.booking.com/hotel/fr/residence-internationale-de-paris.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
    ],
  },

];
