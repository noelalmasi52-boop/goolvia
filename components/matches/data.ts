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
export const VIAGOGO_AID = "YOUR_VIAGOGO_AID";

export function buildKiwiUrl(toCity: string, dateISO: string, returnDaysAfter = 2) {
  const match = new Date(dateISO);
  const dep = new Date(match);
  dep.setDate(dep.getDate() - 1);
  const ret = new Date(match);
  ret.setDate(ret.getDate() + returnDaysAfter);
  const depDate = dep.toISOString().split("T")[0];
  const retDate = ret.toISOString().split("T")[0];
  const kiwiUrl = `https://www.kiwi.com/en/search/results/bratislava-slovakia/${encodeURIComponent(toCity)}/${depDate}/${retDate}`;
  return `${CJ_CLICK_URL}?url=${encodeURIComponent(kiwiUrl)}`;
}

export function buildTicketUrl(home: string, away: string) {
  const query = encodeURIComponent(`${home} ${away}`);
  return `https://www.viagogo.com/ww/Sports/Football/Matches?aid=${VIAGOGO_AID}&q=${query}`;
}

const B = (id: number) => `/crests/${id}.svg`;
const W = (url: string) => url;

export const MATCHES: Match[] = [

  // ─── SERIE A ───
  {
    home: "AS ROMA", away: "ATALANTA",
    homeAbbr: "ROM", awayAbbr: "ATA",
    homeCl: "#CC0000", awayCl: "#1C5EA6",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f2/Atalanta_BC_new_logo.svg"),
    stadium: "Stadio Olimpico", city: "Rome", country: "ITA",
    date: "05 SEP", time: "20:45", league: "SERIE A",
    ticketFrom: 55, flightFrom: 110,
    kiwiCity: "rome-italy", dateISO: "2026-09-05",
    featured: true,
    hotels: [
      { name: "Hotel Center 3", stars: 3, distanceKm: 7.0, pricePerNight: 72, url: "https://www.booking.com/hotel/it/vicious.sk.html?checkin=2026-09-04&checkout=2026-09-07&group_adults=2" },
      { name: "LunaBlù", stars: 3, distanceKm: 6.0, pricePerNight: 82, url: "https://www.booking.com/hotel/it/lunablu.sk.html?checkin=2026-09-04&checkout=2026-09-07&group_adults=2" },
      { name: "Palace Rome", stars: 0, distanceKm: 11.0, pricePerNight: 59, isHostel: true, url: "https://www.booking.com/hotel/it/hostel-prima-base.sk.html?checkin=2026-09-04&checkout=2026-09-07&group_adults=2" },
    ],
  },

  {
    home: "NAPOLI", away: "BOLOGNA",
    homeAbbr: "NAP", awayAbbr: "BOL",
    homeCl: "#12A0D7", awayCl: "#BD2424",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/b/ba/SSC_Napoli.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/5/5b/Bologna_F.C._1909_logo.svg"),
    stadium: "Stadio Diego Armando Maradona", city: "Naples", country: "ITA",
    date: "13 SEP", time: "18:00", league: "SERIE A",
    ticketFrom: 45, flightFrom: 113,
    kiwiCity: "naples-italy", dateISO: "2026-09-13",
    featured: true,
    hotels: [
      { name: "Hotel Ginevra", stars: 3, distanceKm: 4.5, pricePerNight: 65, url: "https://www.booking.com/hotel/it/hotelginevranapoli.sk.html?checkin=2026-09-12&checkout=2026-09-15&group_adults=2" },
      { name: "Sweet Dreams Napoli", stars: 3, distanceKm: 5.5, pricePerNight: 70, url: "https://www.booking.com/hotel/it/sweet-dreams-napoli12.sk.html?checkin=2026-09-12&checkout=2026-09-15&group_adults=2" },
      { name: "Hostel B&B ALMA", stars: 0, distanceKm: 4.5, pricePerNight: 38, isHostel: true, url: "https://www.booking.com/hotel/it/hostel-b-amp-b-alma.sk.html?checkin=2026-09-12&checkout=2026-09-15&group_adults=2" },
    ],
  },

  {
    home: "INTER", away: "UDINESE",
    homeAbbr: "INT", awayAbbr: "UDI",
    homeCl: "#0068A8", awayCl: "#2B2B2B",
    homeBadge: B(108),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/c/ce/Udinese_Calcio_logo.svg"),
    stadium: "Stadio Giuseppe Meazza", city: "Milan", country: "ITA",
    date: "14 SEP", time: "20:45", league: "SERIE A",
    ticketFrom: 50, flightFrom: 61,
    returnDaysAfter: 1,
    kiwiCity: "milan-italy", dateISO: "2026-09-14",
    featured: true,
    hotels: [
      { name: "Hotel Alessander", stars: 3, distanceKm: 5.5, pricePerNight: 94, url: "https://www.booking.com/hotel/it/alessander.sk.html?checkin=2026-09-13&checkout=2026-09-15&group_adults=2" },
      { name: "Hotel RossoVino Milano", stars: 3, distanceKm: 5.0, pricePerNight: 98, url: "https://www.booking.com/hotel/it/rossovino.sk.html?checkin=2026-09-13&checkout=2026-09-15&group_adults=2" },
      { name: "Babila Hostel & Bistrot", stars: 0, distanceKm: 5.5, pricePerNight: 68, isHostel: true, url: "https://www.booking.com/hotel/it/babila-hostel.sk.html?checkin=2026-09-13&checkout=2026-09-15&group_adults=2" },
    ],
  },

  // ─── PREMIER LEAGUE ───
  {
    home: "BRENTFORD", away: "CHELSEA",
    homeAbbr: "BRE", awayAbbr: "CHE",
    homeCl: "#CC2229", awayCl: "#034694",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"),
    stadium: "Gtech Community Stadium", city: "London", country: "GBR",
    date: "18 SEP", time: "20:00", league: "PREMIER LEAGUE",
    ticketFrom: 60, flightFrom: 224,
    kiwiCity: "london-united-kingdom", dateISO: "2026-09-18",
    featured: true,
    hotels: [
      { name: "Smart Hyde Park View", stars: 3, distanceKm: 8.0, pricePerNight: 72, url: "https://www.booking.com/hotel/gb/smart-hyde-park-view.sk.html?checkin=2026-09-17&checkout=2026-09-20&group_adults=2" },
      { name: "287 Green Lanes", stars: 3, distanceKm: 17.0, pricePerNight: 63, url: "https://www.booking.com/hotel/gb/287-green-lanes.sk.html?checkin=2026-09-17&checkout=2026-09-20&group_adults=2" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 16.0, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-09-17&checkout=2026-09-20&group_adults=2" },
    ],
  },

  {
    home: "TOTTENHAM", away: "ASTON VILLA",
    homeAbbr: "TOT", awayAbbr: "AVL",
    homeCl: "#132257", awayCl: "#670E36",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg"),
    stadium: "Tottenham Hotspur Stadium", city: "London", country: "GBR",
    date: "19 SEP", time: "12:30", league: "PREMIER LEAGUE",
    ticketFrom: 65, flightFrom: 161,
    kiwiCity: "london-united-kingdom", dateISO: "2026-09-19",
    featured: true,
    hotels: [
      { name: "287 Green Lanes", stars: 3, distanceKm: 5.0, pricePerNight: 63, url: "https://www.booking.com/hotel/gb/287-green-lanes.sk.html?checkin=2026-09-18&checkout=2026-09-21&group_adults=2" },
      { name: "Smart Hyde Park View", stars: 3, distanceKm: 14.0, pricePerNight: 72, url: "https://www.booking.com/hotel/gb/smart-hyde-park-view.sk.html?checkin=2026-09-18&checkout=2026-09-21&group_adults=2" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 12.0, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-09-18&checkout=2026-09-21&group_adults=2" },
    ],
  },

  {
    home: "MANCHESTER UTD", away: "TOTTENHAM",
    homeAbbr: "MUN", awayAbbr: "TOT",
    homeCl: "#DA020E", awayCl: "#132257",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg"),
    stadium: "Old Trafford", city: "Manchester", country: "GBR",
    date: "10 OCT", time: "17:30", league: "PREMIER LEAGUE",
    ticketFrom: 80, flightFrom: 184,
    kiwiCity: "manchester-united-kingdom", dateISO: "2026-10-10",
    featured: true,
    hotels: [
      { name: "Rainsough Cottage Guest House", stars: 3, distanceKm: 8.0, pricePerNight: 60, url: "https://www.booking.com/hotel/gb/rainsough-cottage-guest-house.sk.html?checkin=2026-10-09&checkout=2026-10-12&group_adults=2" },
      { name: "Home Away From Home", stars: 3, distanceKm: 7.0, pricePerNight: 52, url: "https://www.booking.com/hotel/gb/home-away-from-home-greater-manchester7.sk.html?checkin=2026-10-09&checkout=2026-10-12&group_adults=2" },
      { name: "Hendham Rooms", stars: 0, distanceKm: 5.0, pricePerNight: 53, isHostel: true, url: "https://www.booking.com/hotel/gb/hendham-rooms.sk.html?checkin=2026-10-09&checkout=2026-10-12&group_adults=2" },
    ],
  },

  {
    home: "LIVERPOOL", away: "MANCHESTER CITY",
    homeAbbr: "LIV", awayAbbr: "MCI",
    homeCl: "#C8102E", awayCl: "#6CABDD",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"),
    stadium: "Anfield", city: "Liverpool", country: "GBR",
    date: "11 OCT", time: "16:30", league: "PREMIER LEAGUE",
    ticketFrom: 90, flightFrom: 174,
    kiwiCity: "liverpool-united-kingdom", dateISO: "2026-10-11",
    featured: true,
    hotels: [
      { name: "Abbeyfield Guesthouse", stars: 3, distanceKm: 4.0, pricePerNight: 46, url: "https://www.booking.com/hotel/gb/abbeyfield-guesthouse.sk.html?checkin=2026-10-10&checkout=2026-10-13&group_adults=2" },
      { name: "Guest Rooms Near Anfield", stars: 3, distanceKm: 1.5, pricePerNight: 69, url: "https://www.booking.com/hotel/gb/guest-rooms-near-city-centre-amp-anfield-free-parking.sk.html?checkin=2026-10-10&checkout=2026-10-13&group_adults=2" },
      { name: "YHA Liverpool Albert Dock", stars: 0, distanceKm: 4.5, pricePerNight: 56, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-liverpool.sk.html?checkin=2026-10-10&checkout=2026-10-13&group_adults=2" },
    ],
  },

  {
    home: "NEWCASTLE", away: "ASTON VILLA",
    homeAbbr: "NEW", awayAbbr: "AVL",
    homeCl: "#241F20", awayCl: "#670E36",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg"),
    stadium: "St James' Park", city: "Newcastle", country: "GBR",
    date: "17 OCT", time: "17:30", league: "PREMIER LEAGUE",
    ticketFrom: 55, flightFrom: 173,
    kiwiCity: "newcastle-upon-tyne-united-kingdom", dateISO: "2026-10-17",
    featured: true,
    hotels: [
      { name: "Great North Hotel", stars: 3, distanceKm: 4.0, pricePerNight: 73, url: "https://www.booking.com/hotel/gb/great-north.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Embassy Newcastle (Best Western)", stars: 3, distanceKm: 7.0, pricePerNight: 69, url: "https://www.booking.com/hotel/gb/embassy-a1-m-team-valley-newcastle.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
      { name: "Hoppers Cottage Guest House", stars: 0, distanceKm: 10.0, pricePerNight: 44, isHostel: true, url: "https://www.booking.com/hotel/gb/hoppers-cottage-guest-house.sk.html?checkin=2026-10-16&checkout=2026-10-19&group_adults=2" },
    ],
  },

  {
    home: "ARSENAL", away: "EVERTON",
    homeAbbr: "ARS", awayAbbr: "EVE",
    homeCl: "#EF0107", awayCl: "#003399",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg"),
    stadium: "Emirates Stadium", city: "London", country: "GBR",
    date: "24 OCT", time: "12:30", league: "PREMIER LEAGUE",
    ticketFrom: 65, flightFrom: 156,
    kiwiCity: "london-united-kingdom", dateISO: "2026-10-24",
    featured: true,
    hotels: [
      { name: "287 Green Lanes", stars: 3, distanceKm: 3.0, pricePerNight: 63, url: "https://www.booking.com/hotel/gb/287-green-lanes.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "Smart Hyde Park View", stars: 3, distanceKm: 13.0, pricePerNight: 72, url: "https://www.booking.com/hotel/gb/smart-hyde-park-view.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
      { name: "YHA London Thameside", stars: 0, distanceKm: 9.0, pricePerNight: 58, isHostel: true, url: "https://www.booking.com/hotel/gb/yha-london-thameside.sk.html?checkin=2026-10-23&checkout=2026-10-26&group_adults=2" },
    ],
  },

  // ─── LA LIGA ───
  {
    home: "SEVILLA", away: "BARCELONA",
    homeAbbr: "SEV", awayAbbr: "FCB",
    homeCl: "#D71920", awayCl: "#A50044",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"),
    stadium: "Ramón Sánchez-Pizjuán", city: "Seville", country: "ESP",
    date: "19 SEP", time: "21:00", league: "LA LIGA",
    ticketFrom: 70, flightFrom: 270,
    kiwiCity: "seville-spain", dateISO: "2026-09-19",
    featured: true,
    hotels: [
      { name: "Futurotel Sevilla", stars: 3, distanceKm: 3.0, pricePerNight: 73, url: "https://www.booking.com/hotel/es/futurotel-sevilla-space.sk.html?checkin=2026-09-18&checkout=2026-09-21&group_adults=2" },
      { name: "Pension Azahar", stars: 2, distanceKm: 2.5, pricePerNight: 80, url: "https://www.booking.com/hotel/es/pension-azahar.sk.html?checkin=2026-09-18&checkout=2026-09-21&group_adults=2" },
      { name: "Hostel Triana Backpackers", stars: 0, distanceKm: 3.5, pricePerNight: 50, isHostel: true, url: "https://www.booking.com/hotel/es/albergue-triana-backpackers.sk.html?checkin=2026-09-18&checkout=2026-09-21&group_adults=2" },
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
    ticketFrom: 180, flightFrom: 92,
    kiwiCity: "barcelona-spain", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "Hostal Argo", stars: 2, distanceKm: 4.0, pricePerNight: 146, url: "https://www.booking.com/hotel/es/hostal-argo.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Catalonia La Maquinista", stars: 3, distanceKm: 8.0, pricePerNight: 165, url: "https://www.booking.com/hotel/es/catalonialamaquinista.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Ten To Go Hostel", stars: 0, distanceKm: 4.5, pricePerNight: 68, isHostel: true, url: "https://www.booking.com/hotel/es/ten-to-go-hostel.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
    ],
  },

  // ─── BUNDESLIGA ───
  {
    home: "BAYERN MUNICH", away: "BORUSSIA DORTMUND",
    homeAbbr: "BAY", awayAbbr: "DOR",
    homeCl: "#DC052D", awayCl: "#FDE100",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg"),
    stadium: "Allianz Arena", city: "Munich", country: "GER",
    date: "31 OCT", time: "18:30", league: "BUNDESLIGA · DER KLASSIKER",
    ticketFrom: 95, flightFrom: 74,
    transportType: "bus",
    transportUrl: "https://www.flixbus.com/bus-routes/bus-bratislava-munich",
    kiwiCity: "munich-germany", dateISO: "2026-10-31",
    featured: true,
    hotels: [
      { name: "Tulip Inn München Messe", stars: 3, distanceKm: 12.0, pricePerNight: 59, url: "https://www.booking.com/hotel/de/nordic-pure-munich.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "ibis Styles München Perlach", stars: 3, distanceKm: 14.0, pricePerNight: 65, url: "https://www.booking.com/hotel/de/ibis-styles-muenchen-perlach.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
      { name: "THE 4YOU Hostel Munich", stars: 0, distanceKm: 8.0, pricePerNight: 33, isHostel: true, url: "https://www.booking.com/hotel/de/4-you.sk.html?checkin=2026-10-30&checkout=2026-11-02&group_adults=2" },
    ],
  },

  // ─── LIGUE 1 ───
  {
    home: "PARIS SG", away: "OLYMPIQUE LYON",
    homeAbbr: "PSG", awayAbbr: "OLY",
    homeCl: "#004170", awayCl: "#0D3CA1",
    homeBadge: W("https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg"),
    awayBadge: W("https://upload.wikimedia.org/wikipedia/en/e/e1/Olympique_lyonnais_%28logo%29.svg"),
    stadium: "Parc des Princes", city: "Paris", country: "FRA",
    date: "25 OCT", time: "15:45", league: "LIGUE 1",
    ticketFrom: 50, flightFrom: 178,
    kiwiCity: "paris-france", dateISO: "2026-10-25",
    featured: true,
    hotels: [
      { name: "hotelF1 Porte de Châtillon", stars: 2, distanceKm: 4.0, pricePerNight: 64, url: "https://www.booking.com/hotel/fr/hotelf1-paris-porte-de-chatillon-paris.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Hotel Lilas Gambetta", stars: 3, distanceKm: 11.0, pricePerNight: 100, url: "https://www.booking.com/hotel/fr/lilasgambetta.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
      { name: "Résidence Internationale de Paris", stars: 0, distanceKm: 8.0, pricePerNight: 99, isHostel: true, url: "https://www.booking.com/hotel/fr/residence-internationale-de-paris.sk.html?checkin=2026-10-24&checkout=2026-10-27&group_adults=2" },
    ],
  },

];
