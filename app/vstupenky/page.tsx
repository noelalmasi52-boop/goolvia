"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import PonukaPopup from "@/components/ui/PonukaPopup";

type FtnEvent = {
  id: number;
  name: string;
  date: string;
  fullDate: string;
  link: string;
  min_price: { price: number; currency_code: string } | number;
  venue?: { venue_name: string; venue_city_name: string; venue_country_name: string };
  tour?: { name: string; nice_name: string };
};

function getPrice(min_price: FtnEvent["min_price"]): number {
  if (typeof min_price === "object" && min_price !== null) return min_price.price;
  return min_price as number;
}

function getCurrency(min_price: FtnEvent["min_price"]): string {
  if (typeof min_price === "object" && min_price !== null) return min_price.currency_code;
  return "EUR";
}

export default function VstupenkyPage() {
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [events, setEvents] = useState<FtnEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (p = 1) => {
    setLoading(true);
    setSearched(true);
    const params = new URLSearchParams({ page: String(p), per_page: "20" });
    if (query) params.set("query", query);
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    try {
      const res = await fetch(`/api/tickets?${params}`);
      const data = await res.json();
      setEvents(data.events ?? []);
      setTotal(data.total ?? 0);
      setPage(p);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [query, fromDate, toDate]);

  const totalPages = Math.ceil(total / 20);

  return (
    <div style={{ minHeight: "100vh", background: "#090d14", color: "#eef0f6" }}>

      {/* Nav */}
      <div style={{ borderBottom: "1px solid #1a2840", padding: "0 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <Link href="/" style={{ fontFamily: "var(--font-antonio)", fontSize: "1.3rem", fontWeight: 700, color: "#eef0f6", textDecoration: "none", letterSpacing: "0.1em" }}>
            GOOLVIA
          </Link>
          <Link href="/" style={{ fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#4a6080", textDecoration: "none" }}>
            ← Späť na úvod
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#4a6080", textTransform: "uppercase", marginBottom: 8 }}>
            Football Ticket Net
          </div>
          <h1 style={{ fontFamily: "var(--font-antonio)", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 700, color: "#eef0f6", margin: 0, lineHeight: 1, textTransform: "uppercase" }}>
            Vstupenky na<br /><span style={{ color: "#e8b84b" }}>futbalové zápasy</span>
          </h1>
          <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.85rem", color: "#4a6080", marginTop: 12 }}>
            Premier League, Champions League, La Liga, reprezentácia a ďalšie
          </p>
        </div>

        {/* Search */}
        <div style={{ background: "#0f1828", border: "1px solid #243452", borderRadius: 12, padding: "20px 24px", marginBottom: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, alignItems: "end" }}>
            <div>
              <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", letterSpacing: "0.15em", color: "#4a6080", marginBottom: 6, textTransform: "uppercase" }}>
                Tím alebo zápas
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search(1)}
                placeholder="napr. Barcelona, Arsenal, Champions League..."
                style={{
                  width: "100%", background: "#090d14", border: "1px solid #243452",
                  borderRadius: 8, padding: "10px 14px", color: "#eef0f6",
                  fontFamily: "var(--font-geist)", fontSize: "0.85rem", outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", letterSpacing: "0.15em", color: "#4a6080", marginBottom: 6, textTransform: "uppercase" }}>
                Od
              </div>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{
                  background: "#090d14", border: "1px solid #243452",
                  borderRadius: 8, padding: "10px 14px", color: "#eef0f6",
                  fontFamily: "var(--font-geist)", fontSize: "0.85rem", outline: "none",
                  colorScheme: "dark",
                }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", letterSpacing: "0.15em", color: "#4a6080", marginBottom: 6, textTransform: "uppercase" }}>
                Do
              </div>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{
                  background: "#090d14", border: "1px solid #243452",
                  borderRadius: 8, padding: "10px 14px", color: "#eef0f6",
                  fontFamily: "var(--font-geist)", fontSize: "0.85rem", outline: "none",
                  colorScheme: "dark",
                }}
              />
            </div>
          </div>
          <button
            onClick={() => search(1)}
            disabled={loading}
            style={{
              marginTop: 14, width: "100%",
              fontFamily: "var(--font-antonio)", fontSize: "0.75rem", letterSpacing: "0.2em",
              padding: "12px 24px", background: loading ? "#1a2840" : "#e8b84b",
              color: loading ? "#4a6080" : "#090d14", border: "none", borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer", textTransform: "uppercase", fontWeight: 700,
              transition: "background 0.2s",
            }}
          >
            {loading ? "Hľadám..." : "Hľadať vstupenky"}
          </button>
        </div>

        {/* Results */}
        {searched && !loading && events.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", fontFamily: "var(--font-antonio)", fontSize: "0.8rem", color: "#4a6080", letterSpacing: "0.1em" }}>
            Žiadne zápasy nenájdené. Skús iné kľúčové slovo.
          </div>
        )}

        {events.length > 0 && (
          <>
            <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: 12 }}>
              Nájdených: {total} zápasov · strana {page} z {totalPages}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {events.map((ev) => (
                <a key={ev.id} href={ev.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "16px 20px", background: "#0f1828",
                      border: "1px solid #1a2840", borderRadius: 10,
                      transition: "border-color 0.15s, background 0.15s", cursor: "pointer", gap: 16,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e8b84b44";
                      (e.currentTarget as HTMLElement).style.background = "#121c2e";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#1a2840";
                      (e.currentTarget as HTMLElement).style.background = "#0f1828";
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1rem", fontWeight: 700, color: "#eef0f6", lineHeight: 1.2, marginBottom: 6 }}>
                        {ev.name}
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {ev.tour?.nice_name && (
                          <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.52rem", letterSpacing: "0.12em", color: "#e8b84b", background: "#e8b84b14", border: "1px solid #e8b84b33", borderRadius: 4, padding: "2px 7px", textTransform: "uppercase" }}>
                            {ev.tour.nice_name}
                          </span>
                        )}
                        {ev.venue?.venue_city_name && (
                          <span style={{ fontFamily: "var(--font-geist)", fontSize: "0.65rem", color: "#4a6080" }}>
                            🏟️ {ev.venue.venue_name} · {ev.venue.venue_city_name}
                          </span>
                        )}
                        <span style={{ fontFamily: "var(--font-geist)", fontSize: "0.65rem", color: "#4a6080" }}>
                          📅 {ev.fullDate !== "TBA" ? ev.fullDate : ev.date}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.2rem", fontWeight: 700, color: "#e8b84b" }}>
                        od {getCurrency(ev.min_price) === "GBP" ? "£" : "€"}{Math.round(getPrice(ev.min_price) * 1.37)}
                      </div>
                      <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.55rem", color: "#4a6080", marginTop: 2 }}>vrátane poplatkov</div>
                      <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#e8b84b", marginTop: 4, letterSpacing: "0.1em" }}>
                        Kúpiť →
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
                <button
                  onClick={() => search(page - 1)}
                  disabled={page <= 1 || loading}
                  style={{
                    fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.1em",
                    padding: "8px 16px", background: "transparent", border: "1px solid #243452",
                    color: page <= 1 ? "#2a3a50" : "#4a6080", borderRadius: 6, cursor: page <= 1 ? "not-allowed" : "pointer",
                  }}
                >
                  ← Predošlá
                </button>
                <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.65rem", color: "#4a6080", padding: "8px 12px", lineHeight: "1.4" }}>
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => search(page + 1)}
                  disabled={page >= totalPages || loading}
                  style={{
                    fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.1em",
                    padding: "8px 16px", background: "transparent", border: "1px solid #243452",
                    color: page >= totalPages ? "#2a3a50" : "#4a6080", borderRadius: 6, cursor: page >= totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  Ďalšia →
                </button>
              </div>
            )}
          </>
        )}

        {!searched && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎟️</div>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.8rem", letterSpacing: "0.15em", color: "#2a3a50", textTransform: "uppercase" }}>
              Zadaj tím alebo turnaj a hľadaj
            </div>
          </div>
        )}
      </div>
    </div>
    <PonukaPopup />
  );
}
