export type Hotel = {
  name: string;
  stars: number;
  distanceKm: number;
  pricePerNight: number;
  url: string;
  isHostel?: boolean;
};

export type GroundConnection = {
  fromCity: string;
  toCity: string;
  duration: string;
  provider: string;
  price: number;
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
  isCL?: boolean;
  ticketFrom: number;
  flightFrom: number;
  returnDaysAfter?: number;
  transportType?: "flight" | "bus" | "train";
  transportUrl?: string;
  // Skutočné trvanie priameho spoja z Bratislavy (napr. "15 h 20 min") —
  // používa sa pri transportType "bus", kde cesta trvá výrazne dlhšie ako let.
  busDuration?: string;
  busProvider?: string;
  hotels: Hotel[];
  kiwiCity: string;
  // Keď v meste zápasu nie je priame letisko, lietadlo smeruje sem
  // (najbližšie mesto s priamym letom z Bratislavy) a odtiaľ pokračuje
  // pozemná doprava (groundConnection) do mesta zápasu — nikdy prestup v lietadle.
  flightCity?: string;
  groundConnection?: GroundConnection;
  dateISO: string;
  featured?: boolean;
};

export const CJ_CLICK_URL = "https://www.dpbolvw.net/click-101856071-12624156";
export const FLIXBUS_URL = "https://www.flixbus.sk/search";

export function buildKiwiUrl(toCity: string, dateISO: string, returnDaysAfter = 2) {
  const match = new Date(dateISO);
  const dep = new Date(match);
  dep.setDate(dep.getDate() - 1);
  const ret = new Date(match);
  ret.setDate(ret.getDate() + returnDaysAfter);
  const depDate = dep.toISOString().split("T")[0];
  const retDate = ret.toISOString().split("T")[0];
  const kiwiUrl = `https://www.kiwi.com/en/search/results/bratislava-slovakia/${encodeURIComponent(toCity)}/${depDate}/${retDate}?sortBy=price&stopNumber=0`;
  return `${CJ_CLICK_URL}?url=${encodeURIComponent(kiwiUrl)}`;
}

// Fallback keď FTN API nevráti live event pre daný zápas — smeruje na
// vyhľadávanie priamo na footballticketnet.com (partnerský program Goolvia).
export function buildTicketUrl(home: string, away: string) {
  const query = encodeURIComponent(`${home} vs ${away}`);
  return `https://www.footballticketnet.com/search-results?q=${query}`;
}

const ALSA_URL = "https://www.alsa.com/en/web/bus/search";

function ground(fromCity: string, toCity: string, duration: string, price: number, provider = "FlixBus", url = FLIXBUS_URL): GroundConnection {
  return { fromCity, toCity, duration, provider, price, url };
}

const B = (id: number) => `/crests/${id}.svg`;
const W = (url: string) => url;

export const MATCHES: Match[] = [

  // ═══════════════════════════════════════════
  // PREMIER LEAGUE — priamy let Bratislava → Londýn.
  // Ceny reálne overené na Kiwi.com (len priame lety, stopNumber=0),
  // pre presné dátumy zápasov, s odletom deň vopred a návratom 2 dni po.
  // ═══════════════════════════════════════════
  {
    home: "FULHAM", away: "ASTON VILLA",
    homeAbbr: "FUL", awayAbbr: "AVL",
    homeCl: "#000000", awayCl: "#670E36",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/9/9a/Aston_Villa_FC_new_crest.svg"),
    stadium: "Craven Cottage", city: "London", country: "GBR",
    date: "17 OCT", time: "15:00", league: "PREMIER LEAGUE",
    ticketFrom: 60, flightFrom: 162,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "Alross Guest House with Free Italian Breakfast", stars: 3, distanceKm: 7.5, pricePerNight: 46, url: "https://www.booking.com/hotel/gb/alross-guest-house-with-breakfast-free.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
      { name: "Goldy's place in E17", stars: 3, distanceKm: 13.4, pricePerNight: 48, url: "https://www.booking.com/hotel/gb/goldys-place-in-e17.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 5.7, pricePerNight: 29, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
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
    ticketFrom: 95, flightFrom: 78,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "Alross Guest House with Free Italian Breakfast", stars: 3, distanceKm: 7.5, pricePerNight: 46, url: "https://www.booking.com/hotel/gb/alross-guest-house-with-breakfast-free.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "Goldy's place in E17", stars: 3, distanceKm: 13.4, pricePerNight: 48, url: "https://www.booking.com/hotel/gb/goldys-place-in-e17.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 5.7, pricePerNight: 29, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
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
    ticketFrom: 65, flightFrom: 278,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "Alross Guest House with Free Italian Breakfast", stars: 3, distanceKm: 7.5, pricePerNight: 46, url: "https://www.booking.com/hotel/gb/alross-guest-house-with-breakfast-free.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "Goldy's place in E17", stars: 3, distanceKm: 13.4, pricePerNight: 48, url: "https://www.booking.com/hotel/gb/goldys-place-in-e17.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 5.7, pricePerNight: 29, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
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
    ticketFrom: 90, flightFrom: 199,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "Alross Guest House with Free Italian Breakfast", stars: 3, distanceKm: 7.5, pricePerNight: 46, url: "https://www.booking.com/hotel/gb/alross-guest-house-with-breakfast-free.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "Goldy's place in E17", stars: 3, distanceKm: 13.4, pricePerNight: 48, url: "https://www.booking.com/hotel/gb/goldys-place-in-e17.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 5.7, pricePerNight: 29, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
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
    ticketFrom: 85, flightFrom: 173,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "Alross Guest House with Free Italian Breakfast", stars: 3, distanceKm: 7.5, pricePerNight: 46, url: "https://www.booking.com/hotel/gb/alross-guest-house-with-breakfast-free.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "Goldy's place in E17", stars: 3, distanceKm: 13.4, pricePerNight: 48, url: "https://www.booking.com/hotel/gb/goldys-place-in-e17.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 5.7, pricePerNight: 29, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
    ],
  },

  // ═══════════════════════════════════════════
  // LA LIGA — priamy let iba do Barcelony (overené na Kiwi). Girona,
  // Valencia a Sevilla nemajú priame letisko z Bratislavy → let na
  // najbližšie priame letisko + autobus (overené na FlixBus/ALSA).
  // ═══════════════════════════════════════════
  {
    home: "BARCELONA", away: "ATHLETIC BILBAO",
    homeAbbr: "FCB", awayAbbr: "ATH",
    homeCl: "#A50044", awayCl: "#EE2523",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg"),
    stadium: "Spotify Camp Nou", city: "Barcelona", country: "ESP",
    date: "17 OCT", time: "16:15", league: "LA LIGA",
    ticketFrom: 75, flightFrom: 122,
    kiwiCity: "barcelona-spain", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "Fabrizzio's Petit (Petit Palace)", stars: 4, distanceKm: 0.7, pricePerNight: 57, url: "https://www.booking.com/hotel/es/fabrizzio-petit-palace-barcelona.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
      { name: "The Loft House Barcelona", stars: 3, distanceKm: 1.2, pricePerNight: 47, url: "https://www.booking.com/hotel/es/la-flor-de-gaudi-hostel-la-pedrera.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
      { name: "Ten To Go Hostel", stars: 0, distanceKm: 2.9, pricePerNight: 36, isHostel: true, url: "https://www.booking.com/hotel/es/ten-to-go-hostel.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
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
    ticketFrom: 55, flightFrom: 39,
    flightCity: "Barcelona",
    groundConnection: ground("Barcelona", "Girona", "1 h 45 min", 18, "FlixBus", "https://global.flixbus.com/bus-routes/bus-barcelona-girona"),
    kiwiCity: "barcelona-spain", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "BYPILLOW The Bloom", stars: 3, distanceKm: 0.45, pricePerNight: 99, url: "https://www.booking.com/hotel/es/condal-girona.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "Peninsular", stars: 3, distanceKm: 0.2, pricePerNight: 117, url: "https://www.booking.com/hotel/es/peninsular.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "Hotel Ultonia", stars: 3, distanceKm: 0.4, pricePerNight: 137, url: "https://www.booking.com/hotel/es/ultonia.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
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
    ticketFrom: 60, flightFrom: 196,
    flightCity: "Alicante",
    groundConnection: ground("Alicante", "Valencia", "2 h 15 min", 14, "ALSA", ALSA_URL),
    kiwiCity: "alicante-spain", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "Room Valencia", stars: 3, distanceKm: 0.9, pricePerNight: 46, url: "https://www.booking.com/hotel/es/center-valencia.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "Home Youth Hostel by Feetup Hostels", stars: 3, distanceKm: 0.5, pricePerNight: 90, url: "https://www.booking.com/hotel/es/home-youth-hostel.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "Purple Nest Hostel", stars: 0, distanceKm: 0.8, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/es/purple-nest-hostel.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
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
    ticketFrom: 110, flightFrom: 200,
    flightCity: "Málaga",
    groundConnection: ground("Málaga", "Sevilla", "2 h 30 min", 19, "ALSA", ALSA_URL),
    kiwiCity: "malaga-spain", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "The Loft House Sevilla", stars: 3, distanceKm: 0.4, pricePerNight: 41, url: "https://www.booking.com/hotel/es/the-loft-house-sevilla.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "Room Salvador", stars: 3, distanceKm: 0.4, pricePerNight: 27, url: "https://www.booking.com/hotel/es/koisi-hostel-sevilla.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "Hostel Triana Backpackers", stars: 0, distanceKm: 0.8, pricePerNight: 24, isHostel: true, url: "https://www.booking.com/hotel/es/albergue-triana-backpackers.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
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
    ticketFrom: 190, flightFrom: 155,
    kiwiCity: "barcelona-spain", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "The Loft House Barcelona", stars: 3, distanceKm: 1.2, pricePerNight: 46, url: "https://www.booking.com/hotel/es/la-flor-de-gaudi-hostel-la-pedrera.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "Hola Hostal Eixample", stars: 3, distanceKm: 1.3, pricePerNight: 34, url: "https://www.booking.com/hotel/es/hola-hostal-eixample.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "Leevin Stay Hostel", stars: 0, distanceKm: 3.6, pricePerNight: 32, isHostel: true, url: "https://www.booking.com/hotel/es/leevin-hostel-barcelona.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
    ],
  },

  // ═══════════════════════════════════════════
  // SERIE A — priamy let do Neapola / Ríma / Milána (overené na Kiwi).
  // Bergamo nemá priame letisko → let do Milána + autobus (Milan-Bergamo, FlixBus).
  // ═══════════════════════════════════════════
  {
    home: "NAPOLI", away: "AS ROMA",
    homeAbbr: "NAP", awayAbbr: "ROM",
    homeCl: "#12A0D7", awayCl: "#CC0000",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg"),
    stadium: "Stadio Diego Armando Maradona", city: "Naples", country: "ITA",
    date: "17 OCT", time: "20:45", league: "SERIE A",
    ticketFrom: 60, flightFrom: 113, returnDaysAfter: 1,
    kiwiCity: "naples-italy", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "B&B S Home", stars: 3, distanceKm: 6.5, pricePerNight: 44, url: "https://www.booking.com/hotel/it/b-amp-b-4-39-s-home-mr-rino-martinelli.sk.html?checkin=2026-10-15&checkout=2026-10-18&group_adults=1" },
      { name: "CX Naples Centrale", stars: 3, distanceKm: 2.1, pricePerNight: 46, url: "https://www.booking.com/hotel/it/cx-naples-centrale.sk.html?checkin=2026-10-15&checkout=2026-10-18&group_adults=1" },
      { name: "La Controra Hostel Naples", stars: 0, distanceKm: 1.4, pricePerNight: 28, isHostel: true, url: "https://www.booking.com/hotel/it/hostel-naples-la-controra.sk.html?checkin=2026-10-15&checkout=2026-10-18&group_adults=1" },
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
    ticketFrom: 70, flightFrom: 79,
    kiwiCity: "milan-italy", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "MEININGER Milano Lambrate", stars: 3, distanceKm: 4.5, pricePerNight: 34, url: "https://www.booking.com/hotel/it/meininger-milano-lambrate.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "MEININGER Milano Garibaldi", stars: 3, distanceKm: 3.2, pricePerNight: 37, url: "https://www.booking.com/hotel/it/meininger-milano-garibaldi.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "Babila Hostel & Bar", stars: 0, distanceKm: 1.1, pricePerNight: 47, isHostel: true, url: "https://www.booking.com/hotel/it/babila-hostel.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
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
    ticketFrom: 55, flightFrom: 110,
    flightCity: "Miláno (Malpensa)",
    groundConnection: ground("Miláno (Malpensa)", "Bergamo", "45 min", 3, "FlixBus", "https://global.flixbus.com/bus-routes/bus-milan-bergamo"),
    kiwiCity: "milan-italy", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "Bed Station -self check in-", stars: 3, distanceKm: 0.7, pricePerNight: 70, url: "https://www.booking.com/hotel/it/bed-station.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "Casa Valle D'Astino", stars: 3, distanceKm: 2.7, pricePerNight: 73, url: "https://www.booking.com/hotel/it/b-amp-b-valle-d-astino.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "Namasté - BGY", stars: 3, distanceKm: 1.7, pricePerNight: 77, url: "https://www.booking.com/hotel/it/namaste-bgy.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
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
    ticketFrom: 130, flightFrom: 106,
    kiwiCity: "milan-italy", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "MEININGER Milano Lambrate", stars: 3, distanceKm: 4.5, pricePerNight: 31, url: "https://www.booking.com/hotel/it/meininger-milano-lambrate.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "MEININGER Milano Garibaldi", stars: 3, distanceKm: 3.2, pricePerNight: 35, url: "https://www.booking.com/hotel/it/meininger-milano-garibaldi.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "Babila Hostel & Bar", stars: 0, distanceKm: 1.1, pricePerNight: 43, isHostel: true, url: "https://www.booking.com/hotel/it/babila-hostel.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
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
    ticketFrom: 100, flightFrom: 117,
    kiwiCity: "rome-italy", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "Melting Pot Rome", stars: 3, distanceKm: 2.2, pricePerNight: 42, url: "https://www.booking.com/hotel/it/melting-pot-rome.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "Soha's Holiday", stars: 3, distanceKm: 1.8, pricePerNight: 45, url: "https://www.booking.com/hotel/it/sohas-holiday.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "Roma Scout Center", stars: 0, distanceKm: 3.7, pricePerNight: 49, isHostel: true, url: "https://www.booking.com/hotel/it/roma-scout-center.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
    ],
  },

  // ═══════════════════════════════════════════
  // BUNDESLIGA — Bratislava nemá priame letisko do žiadneho relevantného
  // nemeckého mesta s rozumnou frekvenciou (Dortmund lieta len v sobotu,
  // Berlín nepravidelne). Namiesto letu preto priamy diaľkový autobus
  // z Bratislavy — overené na flixbus.sk, reálne trvanie aj ceny.
  // ═══════════════════════════════════════════
  {
    home: "BAYERN MUNICH", away: "BORUSSIA DORTMUND",
    homeAbbr: "BAY", awayAbbr: "BVB",
    homeCl: "#DC052D", awayCl: "#FDE100",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"),
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "18 OCT", time: "18:30", league: "DER KLASSIKER · BUNDESLIGA",
    ticketFrom: 100, flightFrom: 24,
    transportType: "bus", busDuration: "6 h 15 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-mnichov",
    kiwiCity: "munich-germany", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "Jugendherberge München City", stars: 3, distanceKm: 3.9, pricePerNight: 41, url: "https://www.booking.com/hotel/de/jugendherberge-munchen-city.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "Hotel Pension Schmellergarten", stars: 3, distanceKm: 2.2, pricePerNight: 42, url: "https://www.booking.com/hotel/de/pension-schmellergarten.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "Wombat's City Hostel Munich Werksviertel", stars: 0, distanceKm: 2.6, pricePerNight: 18, isHostel: true, url: "https://www.booking.com/hotel/de/wombats-the-city-hostel-munich-werksviertel.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
    ],
  },
  {
    home: "RB LEIPZIG", away: "BAYER LEVERKUSEN",
    homeAbbr: "RBL", awayAbbr: "B04",
    homeCl: "#DD0741", awayCl: "#E32219",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg"),
    stadium: "Red Bull Arena", city: "Leipzig", country: "GER",
    date: "17 OCT", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 70, flightFrom: 30,
    transportType: "bus", busDuration: "7 h 25 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-lipsko",
    kiwiCity: "leipzig-germany", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "GRONERS Leipzig City Center", stars: 3, distanceKm: 0.15, pricePerNight: 22, url: "https://www.booking.com/hotel/de/groners-leipzig.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
      { name: "Spirit Lodge Leipzig", stars: 3, distanceKm: 2.7, pricePerNight: 24, url: "https://www.booking.com/hotel/de/spirit-lodge-leipzig.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
      { name: "Hostel Multitude", stars: 0, distanceKm: 2.6, pricePerNight: 19, isHostel: true, url: "https://www.booking.com/hotel/de/hostel-multitude.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
    ],
  },
  {
    home: "EINTRACHT FRANKFURT", away: "BORUSSIA MÖNCHENGLADBACH",
    homeAbbr: "SGE", awayAbbr: "BMG",
    homeCl: "#E1000F", awayCl: "#00963C",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/7/7e/Eintracht_Frankfurt_crest.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_Mönchengladbach_logo.svg"),
    stadium: "Deutsche Bank Park", city: "Frankfurt", country: "GER",
    date: "24 OCT", time: "15:30", league: "BUNDESLIGA",
    ticketFrom: 70, flightFrom: 45,
    transportType: "bus", busDuration: "10 h 40 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-frankfurt",
    kiwiCity: "frankfurt-germany", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "LyvInn Hotel Frankfurt", stars: 3, distanceKm: 2.6, pricePerNight: 33, url: "https://www.booking.com/hotel/de/lyvinn-frankfurt-messe.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "Arena Villa am Wasserpark", stars: 3, distanceKm: 2.9, pricePerNight: 51, url: "https://www.booking.com/hotel/de/villa-am-wasserpark.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "Jugendherberge Frankfurt - Haus der Jugend", stars: 0, distanceKm: 1.1, pricePerNight: 42, isHostel: true, url: "https://www.booking.com/hotel/de/haus-der-jugend-jugendherberge-frankfurt.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
    ],
  },
  {
    home: "1. FC KÖLN", away: "BAYERN MUNICH",
    homeAbbr: "KOE", awayAbbr: "BAY",
    homeCl: "#ED1C24", awayCl: "#DC052D",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d8/Emblem_1.FC_K%C3%B6ln.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg"),
    stadium: "RheinEnergieStadion", city: "Cologne", country: "GER",
    date: "25 OCT", time: "15:30", league: "BUNDESLIGA",
    ticketFrom: 90, flightFrom: 48,
    transportType: "bus", busDuration: "13 h 5 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-kolin-nad-rynom",
    kiwiCity: "cologne-germany", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "MEININGER Hotel Köln West", stars: 3, distanceKm: 4.8, pricePerNight: 34, url: "https://www.booking.com/hotel/de/meininger-koln-west-koln.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "Köln Vermietung Schwermer", stars: 3, distanceKm: 5.4, pricePerNight: 48, url: "https://www.booking.com/hotel/de/koln-vermietung-schwermer.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "Hostel die Wohngemeinschaft", stars: 0, distanceKm: 1.7, pricePerNight: 39, isHostel: true, url: "https://www.booking.com/hotel/de/hostel-die-wohngemeinschaft.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
    ],
  },
  {
    home: "BORUSSIA DORTMUND", away: "RB LEIPZIG",
    homeAbbr: "BVB", awayAbbr: "RBL",
    homeCl: "#FDE100", awayCl: "#DD0741",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg"),
    stadium: "Signal Iduna Park", city: "Dortmund", country: "GER",
    date: "31 OCT", time: "18:30", league: "BUNDESLIGA",
    ticketFrom: 100, flightFrom: 48,
    transportType: "bus", busDuration: "15 h 20 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-dortmund",
    kiwiCity: "dortmund-germany", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "PLAZA INN stays design Dortmund", stars: 3, distanceKm: 2.5, pricePerNight: 59, url: "https://www.booking.com/hotel/de/stays-design-hotel-dortmund.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "Tondose Apartment", stars: 3, distanceKm: 0.3, pricePerNight: 69, url: "https://www.booking.com/hotel/de/tondose-apartment.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "DJH Jugendgästehaus Adolph Kolping", stars: 0, distanceKm: 0.5, pricePerNight: 42, isHostel: true, url: "https://www.booking.com/hotel/de/djh-jugendga-stehaus-adolph-kolping.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
    ],
  },

  // ═══════════════════════════════════════════
  // LIGUE 1 — Bratislava nemá priamy let do žiadneho relevantného
  // francúzskeho mesta (Nice aj Paríž len s prestupom). Namiesto letu
  // priamy diaľkový autobus z Bratislavy — overené na flixbus.sk.
  // ═══════════════════════════════════════════
  {
    home: "PARIS FC", away: "LILLE",
    homeAbbr: "PFC", awayAbbr: "LIL",
    homeCl: "#004A93", awayCl: "#C10021",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/9/9f/Paris_FC_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/3/3f/Lille_OSC_2018_logo.svg"),
    stadium: "Stade Jean-Bouin", city: "Paris", country: "FRA",
    date: "17 OCT", time: "17:00", league: "LIGUE 1",
    ticketFrom: 45, flightFrom: 62,
    transportType: "bus", busDuration: "18 h 40 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-pariz",
    kiwiCity: "paris-france", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "Beau M Paris", stars: 3, distanceKm: 4.3, pricePerNight: 53, url: "https://www.booking.com/hotel/fr/beau-m-paris.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
      { name: "The People - Paris Bercy", stars: 3, distanceKm: 3.6, pricePerNight: 57, url: "https://www.booking.com/hotel/fr/the-people-hostel-paris-12.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
      { name: "MEININGER Hotel Paris Porte de Vincennes", stars: 0, distanceKm: 4.7, pricePerNight: 39, isHostel: true, url: "https://www.booking.com/hotel/fr/meininger-paris-porte-de-vincennes.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=1" },
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
    ticketFrom: 95, flightFrom: 62,
    transportType: "bus", busDuration: "18 h 40 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-pariz",
    kiwiCity: "paris-france", dateISO: "2026-10-18",
    featured: true,
    hotels: [
      { name: "Beau M Paris", stars: 3, distanceKm: 4.3, pricePerNight: 53, url: "https://www.booking.com/hotel/fr/beau-m-paris.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "The People - Paris Bercy", stars: 3, distanceKm: 3.6, pricePerNight: 57, url: "https://www.booking.com/hotel/fr/the-people-hostel-paris-12.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
      { name: "MEININGER Hotel Paris Porte de Vincennes", stars: 0, distanceKm: 4.7, pricePerNight: 39, isHostel: true, url: "https://www.booking.com/hotel/fr/meininger-paris-porte-de-vincennes.sk.html?checkin=2026-10-17&checkout=2026-10-20&group_adults=1" },
    ],
  },
  {
    home: "LYON", away: "MONACO",
    homeAbbr: "OL", awayAbbr: "ASM",
    homeCl: "#0D3CA1", awayCl: "#E7002A",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/1/1c/Olympique_Lyonnais_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/c/cf/LogoASMonacoFC2021.svg"),
    stadium: "Groupama Stadium", city: "Lyon", country: "FRA",
    date: "24 OCT", time: "17:00", league: "LIGUE 1",
    ticketFrom: 55, flightFrom: 69,
    transportType: "bus", busDuration: "17 h 20 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-lyon",
    kiwiCity: "lyon-france", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "MEININGER Hotel Lyon Centre Berthelot", stars: 3, distanceKm: 1.4, pricePerNight: 28, url: "https://www.booking.com/hotel/fr/meininger-lyon-centre-berthelot.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "Studio Lyon 1er", stars: 3, distanceKm: 1.6, pricePerNight: 55, url: "https://www.booking.com/hotel/fr/studio-lyon-1er.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
      { name: "HO36 Hostel Lyon", stars: 0, distanceKm: 0.9, pricePerNight: 26, isHostel: true, url: "https://www.booking.com/hotel/fr/ho36-hostels-lyon.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=1" },
    ],
  },
  {
    home: "PSG", away: "NICE",
    homeAbbr: "PSG", awayAbbr: "NCE",
    homeCl: "#004170", awayCl: "#CC1E22",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/2/2e/OGC_Nice_logo.svg"),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "31 OCT", time: "20:45", league: "LIGUE 1",
    ticketFrom: 60, flightFrom: 62,
    transportType: "bus", busDuration: "18 h 40 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-pariz",
    kiwiCity: "paris-france", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "The People - Paris Bercy", stars: 3, distanceKm: 3.6, pricePerNight: 44, url: "https://www.booking.com/hotel/fr/the-people-hostel-paris-12.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "FRATERNiTY-HOTEL", stars: 3, distanceKm: 2.8, pricePerNight: 46, url: "https://www.booking.com/hotel/fr/fraternity.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
      { name: "MEININGER Hotel Paris Porte de Vincennes", stars: 0, distanceKm: 4.7, pricePerNight: 33, isHostel: true, url: "https://www.booking.com/hotel/fr/meininger-paris-porte-de-vincennes.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=1" },
    ],
  },
  {
    home: "LYON", away: "MARSEILLE",
    homeAbbr: "OL", awayAbbr: "OM",
    homeCl: "#0D3CA1", awayCl: "#2FAEE0",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/1/1c/Olympique_Lyonnais_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg"),
    stadium: "Groupama Stadium", city: "Lyon", country: "FRA",
    date: "25 OCT", time: "20:45", league: "LIGUE 1",
    ticketFrom: 65, flightFrom: 69,
    transportType: "bus", busDuration: "17 h 20 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-lyon",
    kiwiCity: "lyon-france", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "MEININGER Hotel Lyon Centre Berthelot", stars: 3, distanceKm: 1.4, pricePerNight: 27, url: "https://www.booking.com/hotel/fr/meininger-lyon-centre-berthelot.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "Le Flâneur Guesthouse", stars: 3, distanceKm: 1.1, pricePerNight: 27, url: "https://www.booking.com/hotel/fr/le-flaneur-guesthouse.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
      { name: "HO36 Hostel Lyon", stars: 0, distanceKm: 0.9, pricePerNight: 25, isHostel: true, url: "https://www.booking.com/hotel/fr/ho36-hostels-lyon.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=1" },
    ],
  },

];
