import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const USERNAME = process.env.FTN_USERNAME ?? "goolvia";
const SECRET = process.env.FTN_API_SECRET ?? "";
const BASE = "https://api.footballticketnet.com/api";

function sign(action: string, eventId?: string) {
  const ts = Math.floor(Date.now() / 1000);
  const str = eventId
    ? `${USERNAME}-${action}-${eventId}-${ts}-${SECRET}`
    : `${USERNAME}-${action}-${ts}-${SECRET}`;
  const s = createHash("sha256").update(str).digest("hex");
  return { ts, s };
}

function toFtnDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const home = searchParams.get("home");
  const away = searchParams.get("away");
  const date = searchParams.get("date");

  if (!home || !away || !date) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const { ts, s } = sign("list_events");
  const url = new URL(BASE);
  url.searchParams.set("action", "list_events");
  url.searchParams.set("u", USERNAME);
  url.searchParams.set("ts", String(ts));
  url.searchParams.set("s", s);
  url.searchParams.set("home_team_name", toTitleCase(home));
  url.searchParams.set("away_team_name", toTitleCase(away));
  url.searchParams.set("from_date", toFtnDate(date));
  url.searchParams.set("to_date", toFtnDate(date));
  url.searchParams.set("out", "json");

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "FTN fetch failed" }, { status: 500 });
  }
}
