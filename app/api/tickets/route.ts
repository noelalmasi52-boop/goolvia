import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const USERNAME = process.env.FTN_USERNAME ?? "goolvia";
const SECRET = process.env.FTN_API_SECRET ?? "";
const BASE = "https://api.footballticketnet.com/api";

function sign(action: string) {
  const ts = Math.floor(Date.now() / 1000);
  const str = `${USERNAME}-${action}-${ts}-${SECRET}`;
  const s = createHash("sha256").update(str).digest("hex");
  return { ts, s };
}

function toFtnDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

function toTitleCase(str: string) {
  return str.toLowerCase().split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

type MinPrice = { price: number; currency_code: string } | number | null | undefined;

// Rough GBP→EUR rate so mixed-currency events sort on a common scale.
const GBP_TO_EUR = 1.17;
// When sorting by price we must pull every matching event; cap it to keep the request bounded.
const SORT_PAGE_SIZE = 100;
const SORT_MAX_PAGES = 10;

function priceInEur(min_price: MinPrice): number {
  if (typeof min_price === "object" && min_price !== null) {
    return min_price.currency_code === "GBP" ? min_price.price * GBP_TO_EUR : min_price.price;
  }
  return typeof min_price === "number" ? min_price : 0;
}

async function fetchPage(filters: Record<string, string>, page: number, perPage: number) {
  const { ts, s } = sign("list_events");
  const url = new URL(BASE);
  url.searchParams.set("action", "list_events");
  url.searchParams.set("u", USERNAME);
  url.searchParams.set("ts", String(ts));
  url.searchParams.set("s", s);
  url.searchParams.set("out", "json");
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));
  for (const [k, v] of Object.entries(filters)) url.searchParams.set(k, v);

  const res = await fetch(url.toString());
  const json = await res.json();
  const events: { min_price: MinPrice }[] = json?.data?.data ?? json?.data ?? [];
  const total: number = json?.data?.total_records ?? 0;
  return { events: Array.isArray(events) ? events : [], total };
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const home = searchParams.get("home");
  const away = searchParams.get("away");
  const date = searchParams.get("date");
  const query = searchParams.get("query");
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Number(searchParams.get("per_page") ?? "20");

  const filters: Record<string, string> = {};
  if (home && away && date) {
    filters.home_team_name = toTitleCase(home);
    filters.away_team_name = toTitleCase(away);
    filters.from_date = toFtnDate(date);
    filters.to_date = toFtnDate(date);
  } else {
    if (query) filters.event_name = query;
    if (fromDate) filters.from_date = toFtnDate(fromDate);
    if (toDate) filters.to_date = toFtnDate(toDate);
  }

  try {
    if (sort !== "price") {
      return NextResponse.json(await fetchPage(filters, page, perPage));
    }

    const first = await fetchPage(filters, 1, SORT_PAGE_SIZE);
    const pageCount = Math.min(Math.ceil(first.total / SORT_PAGE_SIZE), SORT_MAX_PAGES);
    const rest = await Promise.all(
      Array.from({ length: Math.max(pageCount - 1, 0) }, (_, i) => fetchPage(filters, i + 2, SORT_PAGE_SIZE))
    );
    const all = [first, ...rest].flatMap((r) => r.events);

    // Cheapest first; events without a listed price go to the end.
    all.sort((a, b) => {
      const pa = priceInEur(a.min_price);
      const pb = priceInEur(b.min_price);
      if (pa <= 0) return pb <= 0 ? 0 : 1;
      if (pb <= 0) return -1;
      return pa - pb;
    });

    const start = (page - 1) * perPage;
    return NextResponse.json({ events: all.slice(start, start + perPage), total: all.length });
  } catch {
    return NextResponse.json({ error: "FTN fetch failed" }, { status: 500 });
  }
}
