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

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const home = searchParams.get("home");
  const away = searchParams.get("away");
  const date = searchParams.get("date");
  const query = searchParams.get("query");
  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");
  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("per_page") ?? "20";

  const { ts, s } = sign("list_events");
  const url = new URL(BASE);
  url.searchParams.set("action", "list_events");
  url.searchParams.set("u", USERNAME);
  url.searchParams.set("ts", String(ts));
  url.searchParams.set("s", s);
  url.searchParams.set("out", "json");
  url.searchParams.set("page", page);
  url.searchParams.set("per_page", perPage);

  if (home && away && date) {
    url.searchParams.set("home_team_name", toTitleCase(home));
    url.searchParams.set("away_team_name", toTitleCase(away));
    url.searchParams.set("from_date", toFtnDate(date));
    url.searchParams.set("to_date", toFtnDate(date));
  } else {
    if (query) url.searchParams.set("event_name", query);
    if (fromDate) url.searchParams.set("from_date", toFtnDate(fromDate));
    if (toDate) url.searchParams.set("to_date", toFtnDate(toDate));
  }

  try {
    const res = await fetch(url.toString());
    const json = await res.json();
    const events = json?.data?.data ?? json?.data ?? [];
    const total = json?.data?.total_records ?? 0;
    return NextResponse.json({ events, total });
  } catch {
    return NextResponse.json({ error: "FTN fetch failed" }, { status: 500 });
  }
}
