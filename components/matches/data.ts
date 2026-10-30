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
  // Cena spiatočného spoja (toCity → fromCity) v deň odchodu domov.
  returnPrice?: number;
  url: string;
};

// Spiatočný autobus domov do Bratislavy (deň odchodu = dateISO + 2, ako checkout v hoteli).
export type ReturnBus = {
  price: number;
  duration: string;
  transfers: number;
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
  // Počet prestupov na ceste tam, keď FlixBus nemá priamy spoj (0/undefined = priamy).
  busTransfers?: number;
  returnBus?: ReturnBus;
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

// Celková cena dopravy tam aj späť. flightFrom je pri letoch už spiatočná cena (Kiwi),
// pri autobuse len cesta tam — spiatočný spoj sa pripočíta z returnBus.
export function transportTotal(m: Match) {
  return m.flightFrom + (m.returnBus?.price ?? 0)
    + (m.groundConnection?.price ?? 0) + (m.groundConnection?.returnPrice ?? 0);
}

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

function ground(fromCity: string, toCity: string, duration: string, price: number, provider = "FlixBus", url = FLIXBUS_URL, returnPrice?: number): GroundConnection {
  return { fromCity, toCity, duration, provider, price, returnPrice, url };
}

const B = (id: number) => `/crests/${id}.svg`;
const W = (url: string) => url;

// ═══════════════════════════════════════════════════════════════════
// Všetky zápasy nižšie sú OVERENÉ reálne fixtures z footballticketnet.com
// (live fixture list k 30.10.2026, okno 15.11.–31.12.2026), nie vymyslené dátumy.
// ticketFrom = najnižšia cena na FTN (GBP prepočítané na EUR).
// Lety overené na Kiwi.com (len priame, stopNumber=0, tam deň pred zápasom,
// späť 2 dni po zápase). Autobusy z FlixBus (najlacnejší priamy spoj v ten deň;
// ak priamy neexistuje, uvedený je počet prestupov). Hotely overené na
// Booking.com (1 dospelý, 3 noci, najlacnejšie pri hodnotení 8.0+).
// ═══════════════════════════════════════════════════════════════════
export const MATCHES: Match[] = [

  // ─── UEFA CHAMPIONS LEAGUE (matchday 5 a 6: 24.–25. NOV a 8.–9. DEC) ───
  {
    home: "ARSENAL", away: "BORUSSIA DORTMUND",
    homeAbbr: "ARS", awayAbbr: "BVB",
    homeCl: "#EF0107", awayCl: "#FDE100",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"),
    stadium: "Emirates Stadium", city: "London", country: "GBR",
    date: "24 NOV", time: "20:00", league: "UEFA CHAMPIONS LEAGUE",
    isCL: true,
    ticketFrom: 172, flightFrom: 77,
    kiwiCity: "london-united-kingdom", dateISO: "2026-11-24",
    featured: true,
    hotels: [
      { name: "Homefield Lodge", stars: 2, distanceKm: 10, pricePerNight: 81, url: "https://www.booking.com/hotel/gb/homefield-lodge.sk.html?checkin=2026-11-23&checkout=2026-11-26&group_adults=1" },
      { name: "Hotel Unique", stars: 3, distanceKm: 8.8, pricePerNight: 86, url: "https://www.booking.com/hotel/gb/unique.sk.html?checkin=2026-11-23&checkout=2026-11-26&group_adults=1" },
      { name: "Astor Kensington Hostel", stars: 0, distanceKm: 4, pricePerNight: 24, isHostel: true, url: "https://www.booking.com/hotel/gb/astor-queensway.sk.html?checkin=2026-11-23&checkout=2026-11-26&group_adults=1" },
    ],
  },
  {
    home: "PSG", away: "AS ROMA",
    homeAbbr: "PSG", awayAbbr: "ROM",
    homeCl: "#004170", awayCl: "#CC0000",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg"),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "25 NOV", time: "21:00", league: "UEFA CHAMPIONS LEAGUE",
    isCL: true,
    ticketFrom: 168, flightFrom: 53,
    transportType: "bus", busDuration: "20 h 50 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-pariz",
    returnBus: { price: 67, duration: "20 h", transfers: 0 },
    kiwiCity: "paris-france", dateISO: "2026-11-25",
    featured: true,
    hotels: [
      { name: "Suite Cocoon Paris", stars: 4, distanceKm: 2.8, pricePerNight: 101, url: "https://www.booking.com/hotel/fr/suite-cocoon-paris.sk.html?checkin=2026-11-24&checkout=2026-11-27&group_adults=1" },
      { name: "Le Bellevue", stars: 4, distanceKm: 3.3, pricePerNight: 135, url: "https://www.booking.com/hotel/fr/le-bellevue-paris.sk.html?checkin=2026-11-24&checkout=2026-11-27&group_adults=1" },
      { name: "JO&JOE Paris - Nation", stars: 0, distanceKm: 3.6, pricePerNight: 37, isHostel: true, url: "https://www.booking.com/hotel/fr/jo-amp-joe-paris-nation.sk.html?checkin=2026-11-24&checkout=2026-11-27&group_adults=1" },
    ],
  },
  {
    home: "BARCELONA", away: "MAN CITY",
    homeAbbr: "FCB", awayAbbr: "MCI",
    homeCl: "#A50044", awayCl: "#6CABDD",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"),
    awayBadge: B(65),
    stadium: "Spotify Camp Nou", city: "Barcelona", country: "ESP",
    date: "8 DEC", time: "21:00", league: "UEFA CHAMPIONS LEAGUE",
    isCL: true,
    ticketFrom: 382, flightFrom: 109,
    kiwiCity: "barcelona-spain", dateISO: "2026-12-08",
    featured: true,
    hotels: [
      { name: "Hotel BESTPRICE Diagonal", stars: 1, distanceKm: 4.1, pricePerNight: 73, url: "https://www.booking.com/hotel/es/diagonal-mar-suites.sk.html?checkin=2026-12-07&checkout=2026-12-10&group_adults=1" },
      { name: "HOTEL BESTPRICE Maragall", stars: 1, distanceKm: 4, pricePerNight: 78, url: "https://www.booking.com/hotel/es/bestprice-maragall.sk.html?checkin=2026-12-07&checkout=2026-12-10&group_adults=1" },
      { name: "AMISTAT City Hostel Barcelona", stars: 0, distanceKm: 3.8, pricePerNight: 22, isHostel: true, url: "https://www.booking.com/hotel/es/amistat-city-hostel-barcelona.sk.html?checkin=2026-12-07&checkout=2026-12-10&group_adults=1" },
    ],
  },
  {
    home: "BAYERN MUNICH", away: "SLAVIA PRAHA",
    homeAbbr: "BAY", awayAbbr: "SLA",
    homeCl: "#DC052D", awayCl: "#E3001B",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg"),
    awayBadge: B(930),
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "8 DEC", time: "21:00", league: "UEFA CHAMPIONS LEAGUE",
    isCL: true,
    ticketFrom: 103, flightFrom: 23,
    transportType: "bus", busDuration: "8 h", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-mnichov",
    returnBus: { price: 23, duration: "6 h 55 min", transfers: 0 },
    kiwiCity: "munich-germany", dateISO: "2026-12-08",
    featured: true,
    hotels: [
      { name: "München Messe Apartment", stars: 3, distanceKm: 6.8, pricePerNight: 70, url: "https://www.booking.com/hotel/de/munchen-messe-apartment.sk.html?checkin=2026-12-07&checkout=2026-12-10&group_adults=1" },
      { name: "Wyndham Garden Munich Messe", stars: 4, distanceKm: 6.6, pricePerNight: 74, url: "https://www.booking.com/hotel/de/the-centerroom-apartments-messe-munchen.sk.html?checkin=2026-12-07&checkout=2026-12-10&group_adults=1" },
      { name: "Wombat's City Hostel Munich Hauptbahnhof", stars: 0, distanceKm: 1.2, pricePerNight: 22, isHostel: true, url: "https://www.booking.com/hotel/de/wombats-hostel-munich.sk.html?checkin=2026-12-07&checkout=2026-12-10&group_adults=1" },
    ],
  },
  {
    home: "ARSENAL", away: "REAL MADRID",
    homeAbbr: "ARS", awayAbbr: "RMA",
    homeCl: "#EF0107", awayCl: "#FEBE10",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"),
    stadium: "Emirates Stadium", city: "London", country: "GBR",
    date: "9 DEC", time: "20:00", league: "UEFA CHAMPIONS LEAGUE",
    isCL: true,
    ticketFrom: 468, flightFrom: 132,
    kiwiCity: "london-united-kingdom", dateISO: "2026-12-09",
    featured: true,
    hotels: [
      { name: "Homefield Lodge", stars: 2, distanceKm: 10, pricePerNight: 77, url: "https://www.booking.com/hotel/gb/homefield-lodge.sk.html?checkin=2026-12-08&checkout=2026-12-11&group_adults=1" },
      { name: "The Brent Hotel - London - Wembley", stars: 3, distanceKm: 13.6, pricePerNight: 78, url: "https://www.booking.com/hotel/gb/brentxhotel.sk.html?checkin=2026-12-08&checkout=2026-12-11&group_adults=1" },
      { name: "Palmers Lodge Swiss Cottage", stars: 0, distanceKm: 5.4, pricePerNight: 23, isHostel: true, url: "https://www.booking.com/hotel/gb/palmers-lodge-swiss-cottage.sk.html?checkin=2026-12-08&checkout=2026-12-11&group_adults=1" },
    ],
  },

  // ─── PREMIER LEAGUE (Londýn — priamy let overený na Kiwi) ───
  {
    home: "CHELSEA", away: "LEEDS UNITED",
    homeAbbr: "CHE", awayAbbr: "LEE",
    homeCl: "#034694", awayCl: "#FFCD00",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"),
    awayBadge: B(341),
    stadium: "Stamford Bridge", city: "London", country: "GBR",
    date: "21 NOV", time: "15:00", league: "PREMIER LEAGUE",
    ticketFrom: 166, flightFrom: 86,
    kiwiCity: "london-united-kingdom", dateISO: "2026-11-21",
    featured: true,
    hotels: [
      { name: "Hotel DC, Stratford", stars: 3, distanceKm: 10.9, pricePerNight: 86, url: "https://www.booking.com/hotel/gb/dc-london1.sk.html?checkin=2026-11-20&checkout=2026-11-23&group_adults=1" },
      { name: "The Brent Hotel - London - Wembley", stars: 3, distanceKm: 13.6, pricePerNight: 112, url: "https://www.booking.com/hotel/gb/brentxhotel.sk.html?checkin=2026-11-20&checkout=2026-11-23&group_adults=1" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 5.7, pricePerNight: 30, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-11-20&checkout=2026-11-23&group_adults=1" },
    ],
  },
  {
    home: "ARSENAL", away: "MAN CITY",
    homeAbbr: "ARS", awayAbbr: "MCI",
    homeCl: "#EF0107", awayCl: "#6CABDD",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"),
    awayBadge: B(65),
    stadium: "Emirates Stadium", city: "London", country: "GBR",
    date: "29 NOV", time: "16:30", league: "PREMIER LEAGUE",
    ticketFrom: 301, flightFrom: 70,
    kiwiCity: "london-united-kingdom", dateISO: "2026-11-29",
    featured: true,
    hotels: [
      { name: "Homefield Lodge", stars: 2, distanceKm: 10, pricePerNight: 85, url: "https://www.booking.com/hotel/gb/homefield-lodge.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
      { name: "London Visitors Hotel", stars: 2, distanceKm: 5.6, pricePerNight: 90, url: "https://www.booking.com/hotel/gb/london-visitors.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
      { name: "YHA London Earl's Court", stars: 0, distanceKm: 4.7, pricePerNight: 29, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-earl-s-court.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
    ],
  },
  {
    home: "CHELSEA", away: "LIVERPOOL",
    homeAbbr: "CHE", awayAbbr: "LIV",
    homeCl: "#034694", awayCl: "#C8102E",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"),
    stadium: "Stamford Bridge", city: "London", country: "GBR",
    date: "5 DEC", time: "12:30", league: "PREMIER LEAGUE",
    ticketFrom: 316, flightFrom: 135,
    kiwiCity: "london-united-kingdom", dateISO: "2026-12-05",
    featured: true,
    hotels: [
      { name: "The Angerstein Hotel", stars: 3, distanceKm: 10.3, pricePerNight: 88, url: "https://www.booking.com/hotel/gb/angerstein.sk.html?checkin=2026-12-04&checkout=2026-12-07&group_adults=1" },
      { name: "The Brent Hotel - London - Wembley", stars: 3, distanceKm: 13.6, pricePerNight: 88, url: "https://www.booking.com/hotel/gb/brentxhotel.sk.html?checkin=2026-12-04&checkout=2026-12-07&group_adults=1" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 5.7, pricePerNight: 29, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-12-04&checkout=2026-12-07&group_adults=1" },
    ],
  },
  {
    home: "ARSENAL", away: "MAN UNITED",
    homeAbbr: "ARS", awayAbbr: "MNU",
    homeCl: "#EF0107", awayCl: "#DA291C",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"),
    awayBadge: B(66),
    stadium: "Emirates Stadium", city: "London", country: "GBR",
    date: "20 DEC", time: "16:30", league: "PREMIER LEAGUE",
    ticketFrom: 273, flightFrom: 170,
    kiwiCity: "london-united-kingdom", dateISO: "2026-12-20",
    featured: true,
    hotels: [
      { name: "Abbey Point Hotel", stars: 3, distanceKm: 10.7, pricePerNight: 80, url: "https://www.booking.com/hotel/gb/abbey-point.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
      { name: "Homefield Lodge", stars: 2, distanceKm: 10, pricePerNight: 82, url: "https://www.booking.com/hotel/gb/homefield-lodge.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 5.7, pricePerNight: 29, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
    ],
  },
  {
    home: "TOTTENHAM", away: "BOURNEMOUTH",
    homeAbbr: "TOT", awayAbbr: "BOU",
    homeCl: "#132257", awayCl: "#DA291C",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg"),
    awayBadge: B(1044),
    stadium: "Tottenham Hotspur Stadium", city: "London", country: "GBR",
    date: "26 DEC", time: "15:00", league: "BOXING DAY · PREMIER LEAGUE",
    ticketFrom: 92, flightFrom: 155,
    kiwiCity: "london-united-kingdom", dateISO: "2026-12-26",
    featured: true,
    hotels: [
      { name: "Hotel DC, Stratford", stars: 3, distanceKm: 10.9, pricePerNight: 68, url: "https://www.booking.com/hotel/gb/dc-london1.sk.html?checkin=2026-12-25&checkout=2026-12-28&group_adults=1" },
      { name: "Homefield Lodge", stars: 2, distanceKm: 10, pricePerNight: 77, url: "https://www.booking.com/hotel/gb/homefield-lodge.sk.html?checkin=2026-12-25&checkout=2026-12-28&group_adults=1" },
      { name: "Palmers Lodge Swiss Cottage", stars: 0, distanceKm: 5.4, pricePerNight: 38, isHostel: true, url: "https://www.booking.com/hotel/gb/palmers-lodge-swiss-cottage.sk.html?checkin=2026-12-25&checkout=2026-12-28&group_adults=1" },
    ],
  },

  // ─── LA LIGA (Barcelona priamo; Valencia/Sevilla let+autobus) ───
  {
    home: "SEVILLA", away: "REAL BETIS",
    homeAbbr: "SEV", awayAbbr: "BET",
    homeCl: "#D71920", awayCl: "#00954C",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg"),
    awayBadge: B(90),
    stadium: "Ramón Sánchez-Pizjuán", city: "Seville", country: "ESP",
    date: "21 NOV", time: "18:30", league: "EL GRAN DERBI · LA LIGA",
    ticketFrom: 250, flightFrom: 198,
    flightCity: "Málaga",
    groundConnection: ground("Málaga", "Sevilla", "2 h 30 min", 19, "ALSA", ALSA_URL),
    kiwiCity: "malaga-spain", dateISO: "2026-11-21",
    featured: true,
    hotels: [
      { name: "Hotel Patio de las Cruces", stars: 1, distanceKm: 0.7, pricePerNight: 86, url: "https://www.booking.com/hotel/es/patio-de-cruces.sk.html?checkin=2026-11-20&checkout=2026-11-23&group_adults=1" },
      { name: "Limehome Sevilla Calle Torcuato Luca de Tena - Digital Access", stars: 3, distanceKm: 3.4, pricePerNight: 110, url: "https://www.booking.com/hotel/es/limehome-sevilla-calle-torcuato-luca-de-tena.sk.html?checkin=2026-11-20&checkout=2026-11-23&group_adults=1" },
      { name: "Hostel Triana Backpackers", stars: 0, distanceKm: 0.8, pricePerNight: 23, isHostel: true, url: "https://www.booking.com/hotel/es/albergue-triana-backpackers.sk.html?checkin=2026-11-20&checkout=2026-11-23&group_adults=1" },
    ],
  },
  {
    home: "BARCELONA", away: "VILLARREAL",
    homeAbbr: "FCB", awayAbbr: "VIL",
    homeCl: "#A50044", awayCl: "#FFE667",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo-en.svg"),
    stadium: "Spotify Camp Nou", city: "Barcelona", country: "ESP",
    date: "22 NOV", time: "14:00", league: "LA LIGA",
    ticketFrom: 145, flightFrom: 159,
    kiwiCity: "barcelona-spain", dateISO: "2026-11-22",
    featured: true,
    hotels: [
      { name: "Hotel BESTPRICE Diagonal", stars: 1, distanceKm: 4.1, pricePerNight: 91, url: "https://www.booking.com/hotel/es/diagonal-mar-suites.sk.html?checkin=2026-11-21&checkout=2026-11-24&group_adults=1" },
      { name: "Hotel Sant Pau", stars: 3, distanceKm: 3.1, pricePerNight: 92, url: "https://www.booking.com/hotel/es/amrey-sant-pau.sk.html?checkin=2026-11-21&checkout=2026-11-24&group_adults=1" },
      { name: "Pars Teatro Hostel", stars: 0, distanceKm: 1.5, pricePerNight: 26, isHostel: true, url: "https://www.booking.com/hotel/es/albareda-youth-hostel.sk.html?checkin=2026-11-21&checkout=2026-11-24&group_adults=1" },
    ],
  },
  {
    home: "LEVANTE", away: "ELCHE",
    homeAbbr: "LEV", awayAbbr: "ELC",
    homeCl: "#B4053F", awayCl: "#05642C",
    homeBadge: B(88),
    awayBadge: B(285),
    stadium: "Estadi Ciutat de València", city: "Valencia", country: "ESP",
    date: "23 NOV", time: "21:00", league: "LA LIGA",
    ticketFrom: 140, flightFrom: 92,
    flightCity: "Alicante",
    groundConnection: ground("Alicante", "Valencia", "2 h 15 min", 14, "ALSA", ALSA_URL),
    kiwiCity: "alicante-spain", dateISO: "2026-11-23",
    featured: true,
    hotels: [
      { name: "ibis budget Valencia Centro Puerto", stars: 1, distanceKm: 3.7, pricePerNight: 59, url: "https://www.booking.com/hotel/es/ibis-budget-valencia-centro-puerto.sk.html?checkin=2026-11-22&checkout=2026-11-25&group_adults=1" },
      { name: "Numa Valencia Sant Agustí", stars: 4, distanceKm: 0.8, pricePerNight: 62, url: "https://www.booking.com/hotel/es/numa-valencia-sant-agusti.sk.html?checkin=2026-11-22&checkout=2026-11-25&group_adults=1" },
      { name: "Room Valencia", stars: 0, distanceKm: 0.9, pricePerNight: 16, isHostel: true, url: "https://www.booking.com/hotel/es/center-valencia.sk.html?checkin=2026-11-22&checkout=2026-11-25&group_adults=1" },
    ],
  },
  {
    home: "BARCELONA", away: "CELTA VIGO",
    homeAbbr: "FCB", awayAbbr: "CEL",
    homeCl: "#A50044", awayCl: "#8AC3EE",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"),
    awayBadge: B(558),
    stadium: "Spotify Camp Nou", city: "Barcelona", country: "ESP",
    date: "6 DEC", time: "17:00", league: "LA LIGA",
    ticketFrom: 136, flightFrom: 102,
    kiwiCity: "barcelona-spain", dateISO: "2026-12-06",
    featured: true,
    hotels: [
      { name: "Hotel Alimara", stars: 4, distanceKm: 5.5, pricePerNight: 96, url: "https://www.booking.com/hotel/es/hotelalimara.sk.html?checkin=2026-12-05&checkout=2026-12-08&group_adults=1" },
      { name: "Best Western Plus Hotel Alfa Aeropuerto", stars: 4, distanceKm: 8.1, pricePerNight: 97, url: "https://www.booking.com/hotel/es/alfaaeropuerto.sk.html?checkin=2026-12-05&checkout=2026-12-08&group_adults=1" },
      { name: "Sant Jordi Hostels Rock Palace", stars: 0, distanceKm: 0.8, pricePerNight: 28, isHostel: true, url: "https://www.booking.com/hotel/es/sant-jordi-hostel-rock-palace.sk.html?checkin=2026-12-05&checkout=2026-12-08&group_adults=1" },
    ],
  },
  {
    home: "BARCELONA", away: "REAL SOCIEDAD",
    homeAbbr: "FCB", awayAbbr: "RSO",
    homeCl: "#A50044", awayCl: "#0067B1",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"),
    awayBadge: B(92),
    stadium: "Spotify Camp Nou", city: "Barcelona", country: "ESP",
    date: "20 DEC", time: "17:00", league: "LA LIGA",
    ticketFrom: 136, flightFrom: 143,
    kiwiCity: "barcelona-spain", dateISO: "2026-12-20",
    featured: true,
    hotels: [
      { name: "Hotel Sant Pau", stars: 3, distanceKm: 3.1, pricePerNight: 80, url: "https://www.booking.com/hotel/es/amrey-sant-pau.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
      { name: "Abba Garden", stars: 4, distanceKm: 5.7, pricePerNight: 83, url: "https://www.booking.com/hotel/es/abbagarden.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
      { name: "Latroupe Poblenou Beach", stars: 0, distanceKm: 3.3, pricePerNight: 25, isHostel: true, url: "https://www.booking.com/hotel/es/zero-barcelona-hostel.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
    ],
  },

  // ─── SERIE A (Miláno, Rím, Neapol priamo; Bergamo let+autobus) ───
  {
    home: "INTER", away: "GENOA",
    homeAbbr: "INT", awayAbbr: "GEN",
    homeCl: "#0068A8", awayCl: "#A71930",
    homeBadge: B(108),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/2/2c/Genoa_CFC_crest.svg"),
    stadium: "Stadio San Siro", city: "Milan", country: "ITA",
    date: "28 NOV", time: "20:45", league: "SERIE A",
    ticketFrom: 32, flightFrom: 45,
    kiwiCity: "milan-italy", dateISO: "2026-11-28",
    featured: true,
    hotels: [
      { name: "C-Hotels Mirage", stars: 4, distanceKm: 5, pricePerNight: 68, url: "https://www.booking.com/hotel/it/mirage-milano.sk.html?checkin=2026-11-27&checkout=2026-11-30&group_adults=1" },
      { name: "HÕMA Certosa District", stars: 2, distanceKm: 5.4, pricePerNight: 72, url: "https://www.booking.com/hotel/it/homa-certosa-district.sk.html?checkin=2026-11-27&checkout=2026-11-30&group_adults=1" },
      { name: "MEININGER Milano Lambrate", stars: 0, distanceKm: 4.5, pricePerNight: 30, isHostel: true, url: "https://www.booking.com/hotel/it/meininger-milano-lambrate.sk.html?checkin=2026-11-27&checkout=2026-11-30&group_adults=1" },
    ],
  },
  {
    home: "LAZIO", away: "AS ROMA",
    homeAbbr: "LAZ", awayAbbr: "ROM",
    homeCl: "#87D8F7", awayCl: "#CC0000",
    homeBadge: B(110),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg"),
    stadium: "Stadio Olimpico", city: "Rome", country: "ITA",
    date: "13 DEC", time: "12:30", league: "DERBY DELLA CAPITALE · SERIE A",
    ticketFrom: 103, flightFrom: 50,
    kiwiCity: "rome-italy", dateISO: "2026-12-13",
    featured: true,
    hotels: [
      { name: "c-hotels Club House Roma", stars: 4, distanceKm: 4.7, pricePerNight: 54, url: "https://www.booking.com/hotel/it/club-house-roma.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
      { name: "Urban Garden Hotel", stars: 3, distanceKm: 7.9, pricePerNight: 60, url: "https://www.booking.com/hotel/it/urban-garden.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
      { name: "YellowSquare Rome", stars: 0, distanceKm: 2.1, pricePerNight: 27, isHostel: true, url: "https://www.booking.com/hotel/it/the-yellow.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
    ],
  },
  {
    home: "NAPOLI", away: "AC MILAN",
    homeAbbr: "NAP", awayAbbr: "MIL",
    homeCl: "#12A0D7", awayCl: "#CC0000",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg"),
    stadium: "Stadio Diego Armando Maradona", city: "Naples", country: "ITA",
    date: "13 DEC", time: "20:45", league: "SERIE A",
    ticketFrom: 135, flightFrom: 54,
    kiwiCity: "naples-italy", dateISO: "2026-12-13",
    featured: true,
    hotels: [
      { name: "CX Naples Centrale", stars: 3, distanceKm: 2.1, pricePerNight: 36, url: "https://www.booking.com/hotel/it/cx-naples-centrale.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
      { name: "Hotel Palazzo Argenta", stars: 3, distanceKm: 5.9, pricePerNight: 63, url: "https://www.booking.com/hotel/it/palazzo-argenta.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
      { name: "Safestay Naples Materdei", stars: 0, distanceKm: 1.4, pricePerNight: 16, isHostel: true, url: "https://www.booking.com/hotel/it/safestay-naples-materdei.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
    ],
  },
  {
    home: "AS ROMA", away: "JUVENTUS",
    homeAbbr: "ROM", awayAbbr: "JUV",
    homeCl: "#CC0000", awayCl: "#000000",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg"),
    awayBadge: B(109),
    stadium: "Stadio Olimpico", city: "Rome", country: "ITA",
    date: "19 DEC", time: "20:45", league: "SERIE A",
    ticketFrom: 90, flightFrom: 69,
    kiwiCity: "rome-italy", dateISO: "2026-12-19",
    featured: true,
    hotels: [
      { name: "c-hotels Club House Roma", stars: 4, distanceKm: 4.7, pricePerNight: 54, url: "https://www.booking.com/hotel/it/club-house-roma.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
      { name: "Aparthotel Adagio Rome Vatican", stars: 4, distanceKm: 4.7, pricePerNight: 66, url: "https://www.booking.com/hotel/it/residence-mallia.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
      { name: "Melting Pot Rome", stars: 0, distanceKm: 2.2, pricePerNight: 30, isHostel: true, url: "https://www.booking.com/hotel/it/melting-pot-rome.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
    ],
  },
  {
    home: "ATALANTA", away: "NAPOLI",
    homeAbbr: "ATA", awayAbbr: "NAP",
    homeCl: "#1C5EA6", awayCl: "#12A0D7",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f2/Atalanta_BC_new_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg"),
    stadium: "Gewiss Stadium", city: "Bergamo", country: "ITA",
    date: "20 DEC", time: "20:45", league: "SERIE A",
    ticketFrom: 99, flightFrom: 59,
    flightCity: "Miláno (Malpensa)",
    groundConnection: ground("Miláno (Malpensa)", "Bergamo", "45 min", 3, "FlixBus", "https://global.flixbus.com/bus-routes/bus-milan-bergamo", 4),
    kiwiCity: "milan-italy", dateISO: "2026-12-20",
    featured: true,
    hotels: [
      { name: "Hotel Città Dei Mille", stars: 3, distanceKm: 0.9, pricePerNight: 64, url: "https://www.booking.com/hotel/it/citta-dei-mille.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
      { name: "B&B Hotel Bergamo City", stars: 3, distanceKm: 0.8, pricePerNight: 74, url: "https://www.booking.com/hotel/it/b-amp-b-bergamo.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
      { name: "Starhotels Cristallo Palace", stars: 4, distanceKm: 1.6, pricePerNight: 79, url: "https://www.booking.com/hotel/it/starhotels-cristallo-palace.sk.html?checkin=2026-12-19&checkout=2026-12-22&group_adults=1" },
    ],
  },

  // ─── BUNDESLIGA (žiadny priamy let z Bratislavy → FlixBus) ───
  {
    home: "BAYERN MUNICH", away: "1. FC KÖLN",
    homeAbbr: "BAY", awayAbbr: "KOE",
    homeCl: "#DC052D", awayCl: "#ED1C24",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d8/Emblem_1.FC_K%C3%B6ln.svg"),
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "20 NOV", time: "20:30", league: "BUNDESLIGA",
    ticketFrom: 125, flightFrom: 24,
    transportType: "bus", busDuration: "8 h", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-mnichov",
    returnBus: { price: 26, duration: "6 h 55 min", transfers: 0 },
    kiwiCity: "munich-germany", dateISO: "2026-11-20",
    featured: true,
    hotels: [
      { name: "Aparthotel my room - Messe Munich", stars: 4, distanceKm: 9, pricePerNight: 52, url: "https://www.booking.com/hotel/de/my-room-messe-munchen.sk.html?checkin=2026-11-19&checkout=2026-11-22&group_adults=1" },
      { name: "Mercure Hotel München Süd Messe", stars: 4, distanceKm: 7.3, pricePerNight: 64, url: "https://www.booking.com/hotel/de/mercmuenchhotel.sk.html?checkin=2026-11-19&checkout=2026-11-22&group_adults=1" },
      { name: "Wombat's City Hostel Munich Werksviertel", stars: 0, distanceKm: 2.6, pricePerNight: 20, isHostel: true, url: "https://www.booking.com/hotel/de/wombats-the-city-hostel-munich-werksviertel.sk.html?checkin=2026-11-19&checkout=2026-11-22&group_adults=1" },
    ],
  },
  {
    home: "BORUSSIA DORTMUND", away: "BAYER LEVERKUSEN",
    homeAbbr: "BVB", awayAbbr: "B04",
    homeCl: "#FDE100", awayCl: "#E32221",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"),
    awayBadge: B(3),
    stadium: "Signal Iduna Park", city: "Dortmund", country: "GER",
    date: "29 NOV", time: "19:30", league: "BUNDESLIGA",
    ticketFrom: 50, flightFrom: 55,
    transportType: "bus", busDuration: "15 h 20 min", busProvider: "FlixBus", busTransfers: 1,
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-dortmund",
    returnBus: { price: 45, duration: "17 h 25 min", transfers: 2 },
    kiwiCity: "dortmund-germany", dateISO: "2026-11-29",
    featured: true,
    hotels: [
      { name: "Hotel Biedermeier", stars: 3, distanceKm: 10.2, pricePerNight: 76, url: "https://www.booking.com/hotel/de/sunshine.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
      { name: "PM-AM Apartments Hoher Wall", stars: 4, distanceKm: 0.9, pricePerNight: 111, url: "https://www.booking.com/hotel/de/pm-am-apartments-gmbh.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
      { name: "DJH Jugendgästehaus Adolph Kolping", stars: 0, distanceKm: 0.5, pricePerNight: 45, isHostel: true, url: "https://www.booking.com/hotel/de/djh-jugendga-stehaus-adolph-kolping.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
    ],
  },
  {
    home: "1. FC KÖLN", away: "RB LEIPZIG",
    homeAbbr: "KOE", awayAbbr: "RBL",
    homeCl: "#ED1C24", awayCl: "#DD0741",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/d/d8/Emblem_1.FC_K%C3%B6ln.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg"),
    stadium: "RheinEnergieStadion", city: "Cologne", country: "GER",
    date: "12 DEC", time: "15:30", league: "BUNDESLIGA",
    ticketFrom: 139, flightFrom: 52,
    transportType: "bus", busDuration: "14 h 5 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-kolin-nad-rynom",
    returnBus: { price: 44, duration: "16 h 25 min", transfers: 1 },
    kiwiCity: "cologne-germany", dateISO: "2026-12-12",
    featured: true,
    hotels: [
      { name: "Hotel Spiegel", stars: 4, distanceKm: 12.5, pricePerNight: 95, url: "https://www.booking.com/hotel/de/spiegel.sk.html?checkin=2026-12-11&checkout=2026-12-14&group_adults=1" },
      { name: "Hotel Servatius", stars: 3, distanceKm: 6.3, pricePerNight: 110, url: "https://www.booking.com/hotel/de/minotelservatius.sk.html?checkin=2026-12-11&checkout=2026-12-14&group_adults=1" },
      { name: "Lipp Apartments", stars: 3, distanceKm: 7.3, pricePerNight: 131, url: "https://www.booking.com/hotel/de/lipp-apartments.sk.html?checkin=2026-12-11&checkout=2026-12-14&group_adults=1" },
    ],
  },
  {
    home: "BAYERN MUNICH", away: "WERDER BREMEN",
    homeAbbr: "BAY", awayAbbr: "SVW",
    homeCl: "#DC052D", awayCl: "#1D9053",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg"),
    awayBadge: B(12),
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "19 DEC", time: "15:30", league: "BUNDESLIGA",
    ticketFrom: 120, flightFrom: 28,
    transportType: "bus", busDuration: "7 h", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-mnichov",
    returnBus: { price: 36, duration: "7 h 20 min", transfers: 0 },
    kiwiCity: "munich-germany", dateISO: "2026-12-19",
    featured: true,
    hotels: [
      { name: "Hotel Am Moosfeld", stars: 4, distanceKm: 6.4, pricePerNight: 57, url: "https://www.booking.com/hotel/de/am-moosfeld.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
      { name: "Wyndham Garden Munich Messe", stars: 4, distanceKm: 6.6, pricePerNight: 58, url: "https://www.booking.com/hotel/de/the-centerroom-apartments-messe-munchen.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
      { name: "Estelada Hostel Berg am Laim", stars: 0, distanceKm: 3.5, pricePerNight: 24, isHostel: true, url: "https://www.booking.com/hotel/de/estelada-boarding-houses-munchen.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
    ],
  },
  {
    home: "RB LEIPZIG", away: "BORUSSIA DORTMUND",
    homeAbbr: "RBL", awayAbbr: "BVB",
    homeCl: "#DD0741", awayCl: "#FDE100",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"),
    stadium: "Red Bull Arena", city: "Leipzig", country: "GER",
    date: "19 DEC", time: "15:30", league: "BUNDESLIGA",
    ticketFrom: 135, flightFrom: 44,
    transportType: "bus", busDuration: "8 h 55 min", busProvider: "FlixBus", busTransfers: 1,
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-lipsko",
    returnBus: { price: 48, duration: "10 h 30 min", transfers: 1 },
    kiwiCity: "leipzig-germany", dateISO: "2026-12-19",
    featured: true,
    hotels: [
      { name: "Hotel 3 Linden", stars: 3, distanceKm: 7.1, pricePerNight: 75, url: "https://www.booking.com/hotel/de/3-linden.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
      { name: "Hotel Berlin", stars: 3, distanceKm: 2.4, pricePerNight: 77, url: "https://www.booking.com/hotel/de/hotelberlinleipzig.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
      { name: "Wombat's City Hostel Leipzig", stars: 0, distanceKm: 0.6, pricePerNight: 17, isHostel: true, url: "https://www.booking.com/hotel/de/sleepy-lion-hostel-youth-amp-apartments-leipzig.sk.html?checkin=2026-12-18&checkout=2026-12-21&group_adults=1" },
    ],
  },

  // ─── LIGUE 1 (žiadny priamy let z Bratislavy → FlixBus) ───
  {
    home: "PARIS FC", away: "ANGERS",
    homeAbbr: "PFC", awayAbbr: "ANG",
    homeCl: "#004A93", awayCl: "#000000",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/9/9f/Paris_FC_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/f/f6/Angers_Sporting_Club_de_l%27Ouest_logo.svg"),
    stadium: "Stade Jean-Bouin", city: "Paris", country: "FRA",
    date: "22 NOV", time: "15:00", league: "LIGUE 1",
    ticketFrom: 20, flightFrom: 63,
    transportType: "bus", busDuration: "20 h 50 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-pariz",
    returnBus: { price: 63, duration: "20 h", transfers: 0 },
    kiwiCity: "paris-france", dateISO: "2026-11-22",
    featured: true,
    hotels: [
      { name: "Libertel Canal Saint Martin", stars: 3, distanceKm: 3.2, pricePerNight: 96, url: "https://www.booking.com/hotel/fr/libertel-villette.sk.html?checkin=2026-11-21&checkout=2026-11-24&group_adults=1" },
      { name: "Suite Cocoon Paris", stars: 4, distanceKm: 2.8, pricePerNight: 101, url: "https://www.booking.com/hotel/fr/suite-cocoon-paris.sk.html?checkin=2026-11-21&checkout=2026-11-24&group_adults=1" },
      { name: "JO&JOE Paris - Nation", stars: 0, distanceKm: 3.6, pricePerNight: 36, isHostel: true, url: "https://www.booking.com/hotel/fr/jo-amp-joe-paris-nation.sk.html?checkin=2026-11-21&checkout=2026-11-24&group_adults=1" },
    ],
  },
  {
    home: "PSG", away: "LORIENT",
    homeAbbr: "PSG", awayAbbr: "FCL",
    homeCl: "#004170", awayCl: "#F58113",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"),
    awayBadge: B(525),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "28 NOV", time: "20:45", league: "LIGUE 1",
    ticketFrom: 73, flightFrom: 65,
    transportType: "bus", busDuration: "20 h 50 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-pariz",
    returnBus: { price: 63, duration: "20 h", transfers: 0 },
    kiwiCity: "paris-france", dateISO: "2026-11-28",
    featured: true,
    hotels: [
      { name: "ibis Daumesnil Porte Doree", stars: 3, distanceKm: 4.6, pricePerNight: 89, url: "https://www.booking.com/hotel/fr/ibis-porte-doree.sk.html?checkin=2026-11-27&checkout=2026-11-30&group_adults=1" },
      { name: "Residhome Paris Rosa Parks", stars: 3, distanceKm: 4.6, pricePerNight: 96, url: "https://www.booking.com/hotel/fr/residhome-paris-rosa-parks.sk.html?checkin=2026-11-27&checkout=2026-11-30&group_adults=1" },
      { name: "JO&JOE Paris - Nation", stars: 0, distanceKm: 3.6, pricePerNight: 40, isHostel: true, url: "https://www.booking.com/hotel/fr/jo-amp-joe-paris-nation.sk.html?checkin=2026-11-27&checkout=2026-11-30&group_adults=1" },
    ],
  },
  {
    home: "LYON", away: "MONACO",
    homeAbbr: "OL", awayAbbr: "ASM",
    homeCl: "#0D3CA1", awayCl: "#E7001E",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/1/1c/Olympique_Lyonnais_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/c/cf/LogoASMonacoFC2021.svg"),
    stadium: "Groupama Stadium", city: "Lyon", country: "FRA",
    date: "29 NOV", time: "20:45", league: "LIGUE 1",
    ticketFrom: 55, flightFrom: 64,
    transportType: "bus", busDuration: "18 h 20 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-lyon",
    returnBus: { price: 58, duration: "18 h 25 min", transfers: 0 },
    kiwiCity: "lyon-france", dateISO: "2026-11-29",
    featured: true,
    hotels: [
      { name: "Lagrange Aparthotel Lyon Lumière", stars: 4, distanceKm: 3.1, pricePerNight: 89, url: "https://www.booking.com/hotel/fr/lagrange-city-apartha-tel-lyon-lumia-re.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
      { name: "Hôtel Villa Berlioz", stars: 3, distanceKm: 1.3, pricePerNight: 95, url: "https://www.booking.com/hotel/fr/berlioz-lyon.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
      { name: "Le Flâneur Guesthouse", stars: 0, distanceKm: 1.1, pricePerNight: 27, isHostel: true, url: "https://www.booking.com/hotel/fr/le-flaneur-guesthouse.sk.html?checkin=2026-11-28&checkout=2026-12-01&group_adults=1" },
    ],
  },
  {
    home: "PSG", away: "PARIS FC",
    homeAbbr: "PSG", awayAbbr: "PFC",
    homeCl: "#004170", awayCl: "#004A93",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/9/9f/Paris_FC_logo.svg"),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "12 DEC", time: "17:15", league: "DERBY DE PARIS · LIGUE 1",
    ticketFrom: 85, flightFrom: 67,
    transportType: "bus", busDuration: "20 h 50 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-pariz",
    returnBus: { price: 69, duration: "20 h", transfers: 0 },
    kiwiCity: "paris-france", dateISO: "2026-12-12",
    featured: true,
    hotels: [
      { name: "Hôtel du Quai de Seine", stars: 2, distanceKm: 3.8, pricePerNight: 86, url: "https://www.booking.com/hotel/fr/du-quai-de-seine.sk.html?checkin=2026-12-11&checkout=2026-12-14&group_adults=1" },
      { name: "ibis Daumesnil Porte Doree", stars: 3, distanceKm: 4.6, pricePerNight: 92, url: "https://www.booking.com/hotel/fr/ibis-porte-doree.sk.html?checkin=2026-12-11&checkout=2026-12-14&group_adults=1" },
      { name: "Beau M Paris", stars: 0, distanceKm: 4.3, pricePerNight: 38, isHostel: true, url: "https://www.booking.com/hotel/fr/beau-m-paris.sk.html?checkin=2026-12-11&checkout=2026-12-14&group_adults=1" },
    ],
  },
  {
    home: "LYON", away: "MARSEILLE",
    homeAbbr: "OL", awayAbbr: "OM",
    homeCl: "#0D3CA1", awayCl: "#2FAEE0",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/1/1c/Olympique_Lyonnais_logo.svg"),
    awayBadge: B(516),
    stadium: "Groupama Stadium", city: "Lyon", country: "FRA",
    date: "13 DEC", time: "20:45", league: "LE CHOC DES OLYMPIQUES · LIGUE 1",
    ticketFrom: 60, flightFrom: 66,
    transportType: "bus", busDuration: "18 h 20 min", busProvider: "FlixBus",
    transportUrl: "https://www.flixbus.sk/autobusove-spoje/bratislava-lyon",
    returnBus: { price: 68, duration: "18 h 25 min", transfers: 0 },
    kiwiCity: "lyon-france", dateISO: "2026-12-13",
    featured: true,
    hotels: [
      { name: "Hôtel Chromatics & Restaurant Hill Club by HappyCulture", stars: 3, distanceKm: 1.5, pricePerNight: 40, url: "https://www.booking.com/hotel/fr/perrache.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
      { name: "Adagio Access Lyon Centre Université", stars: 3, distanceKm: 1.1, pricePerNight: 74, url: "https://www.booking.com/hotel/fr/comfort-suite-rive-gauche-lyon-centre.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
      { name: "Le Flâneur Guesthouse", stars: 0, distanceKm: 1.1, pricePerNight: 27, isHostel: true, url: "https://www.booking.com/hotel/fr/le-flaneur-guesthouse.sk.html?checkin=2026-12-12&checkout=2026-12-15&group_adults=1" },
    ],
  },

];
