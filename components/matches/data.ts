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

];
