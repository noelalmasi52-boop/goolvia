"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import SubPageNav from "@/components/layout/SubPageNav";
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

const TOP_CLUBS = [
  {
    name: "Real Madrid",
    query: "Real Madrid",
    badge: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    color: "#00529F",
  },
  {
    name: "Barcelona",
    query: "Barcelona",
    badge: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    color: "#A50044",
  },
  {
    name: "Manchester City",
    query: "Manchester City",
    badge: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    color: "#6CABDD",
  },
  {
    name: "Liverpool",
    query: "Liverpool",
    badge: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    color: "#C8102E",
  },
  {
    name: "Bayern Munich",
    query: "Bayern Munich",
    badge: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282002%E2%80%932017%29.svg",
    color: "#DC052D",
  },
];

export default function VstupenkyPage() {
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [events, setEvents] = useState<FtnEvent[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string, p = 1) => {
    setLoading(true);
    setSearched(true);
    const params = new URLSearchParams({ page: String(p), per_page: "20" });
    if (q) params.set("query", q);
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
  }, [fromDate, toDate]);

  const handleSearch = () => search(query, 1);
  const handleClubClick = (clubQuery: string) => {
    setQuery(clubQuery);
    search(clubQuery, 1);
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <>
      <div style={{ minHeight: "100vh", background: "#F4F1EA", color: "#1A1208" }}>
        <SubPageNav />

        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 0" }}>

          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <p style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
              letterSpacing: "0.32em", color: "#8C7A56",
              textTransform: "uppercase", marginBottom: "14px",
            }}>
              Football Ticket Net
            </p>
            <h1 style={{
              fontFamily: "var(--font-antonio)", fontWeight: 700,
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              lineHeight: 0.94, letterSpacing: "-0.01em",
              textTransform: "uppercase", color: "#1A1208",
              marginBottom: "16px",
            }}>
              Vstupenky na<br />
              <span style={{ color: "#D8B35A" }}>futbalové zápasy</span>
            </h1>
            <p style={{
              fontFamily: "var(--font-geist)", fontSize: "0.88rem",
              color: "#8C7A56", lineHeight: 1.65,
            }}>
              Premier League, Champions League, La Liga, reprezentácia a ďalšie
            </p>
          </div>

          {/* Search box */}
          <div style={{
            background: "#fff", border: "1px solid #DDD7C8",
            borderRadius: "16px", padding: "24px 28px", marginBottom: "20px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "12px", alignItems: "end" }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
                  letterSpacing: "0.18em", color: "#8C7A56",
                  marginBottom: "7px", textTransform: "uppercase",
                }}>
                  Tím alebo zápas
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="napr. Barcelona, Arsenal, Champions League..."
                  style={{
                    width: "100%", background: "#F4F1EA", border: "1px solid #DDD7C8",
                    borderRadius: "8px", padding: "11px 14px", color: "#1A1208",
                    fontFamily: "var(--font-geist)", fontSize: "0.85rem", outline: "none",
                    boxSizing: "border-box", transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#DDD7C8"; }}
                />
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
                  letterSpacing: "0.18em", color: "#8C7A56",
                  marginBottom: "7px", textTransform: "uppercase",
                }}>Od</div>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{
                    background: "#F4F1EA", border: "1px solid #DDD7C8",
                    borderRadius: "8px", padding: "11px 14px", color: "#1A1208",
                    fontFamily: "var(--font-geist)", fontSize: "0.85rem", outline: "none",
                    colorScheme: "light",
                  }}
                />
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
                  letterSpacing: "0.18em", color: "#8C7A56",
                  marginBottom: "7px", textTransform: "uppercase",
                }}>Do</div>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{
                    background: "#F4F1EA", border: "1px solid #DDD7C8",
                    borderRadius: "8px", padding: "11px 14px", color: "#1A1208",
                    fontFamily: "var(--font-geist)", fontSize: "0.85rem", outline: "none",
                    colorScheme: "light",
                  }}
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                marginTop: "14px", width: "100%",
                fontFamily: "var(--font-antonio)", fontSize: "0.75rem",
                letterSpacing: "0.2em", padding: "13px 24px",
                background: loading ? "#DDD7C8" : "#D8B35A",
                color: loading ? "#9E8B68" : "#1A1208",
                border: "none", borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                textTransform: "uppercase", fontWeight: 700,
                transition: "background 0.2s",
              }}
            >
              {loading ? "Hľadám..." : "Hľadať vstupenky →"}
            </button>
          </div>

          {/* Top clubs crest shortcuts */}
          <div style={{ marginBottom: "44px" }}>
            <p style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.56rem",
              letterSpacing: "0.22em", color: "#8C7A56",
              textTransform: "uppercase", marginBottom: "16px",
            }}>
              Najväčšie kluby
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {TOP_CLUBS.map((club) => (
                <button
                  key={club.name}
                  onClick={() => handleClubClick(club.query)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                    background: "none", border: "none", cursor: "pointer", padding: "4px",
                  }}
                >
                  <div style={{
                    width: "72px", height: "72px", borderRadius: "50%",
                    background: "#fff", border: `2px solid ${club.color}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color 0.15s, transform 0.15s, box-shadow 0.15s",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = club.color;
                      el.style.transform = "translateY(-3px)";
                      el.style.boxShadow = `0 8px 24px ${club.color}33`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${club.color}33`;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
                    }}
                  >
                    <img
                      src={club.badge}
                      alt={club.name}
                      width={44}
                      height={44}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <span style={{
                    fontFamily: "var(--font-antonio)", fontSize: "0.56rem",
                    letterSpacing: "0.12em", color: "#8C7A56",
                    textTransform: "uppercase", textAlign: "center",
                    maxWidth: "72px", lineHeight: 1.3,
                  }}>
                    {club.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {searched && !loading && events.length === 0 && (
            <div style={{
              textAlign: "center", padding: "60px 0",
              fontFamily: "var(--font-antonio)", fontSize: "0.8rem",
              color: "#9E8B68", letterSpacing: "0.1em",
            }}>
              Žiadne zápasy nenájdené. Skús iné kľúčové slovo.
            </div>
          )}

          {events.length > 0 && (
            <>
              <div style={{
                fontFamily: "var(--font-geist)", fontSize: "0.68rem",
                color: "#9E8B68", marginBottom: "12px",
              }}>
                Nájdených: {total} zápasov · strana {page} z {totalPages}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {events.map((ev) => (
                  <a key={ev.id} href={ev.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "20px 24px", background: "#fff",
                        border: "1px solid #EBE6DA", borderRadius: "12px",
                        transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s",
                        cursor: "pointer", gap: "16px",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#D8B35A88";
                        el.style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)";
                        el.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#EBE6DA";
                        el.style.boxShadow = "none";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: "var(--font-antonio)", fontSize: "1.05rem",
                          fontWeight: 700, color: "#1A1208",
                          lineHeight: 1.2, marginBottom: "8px",
                        }}>
                          {ev.name}
                        </div>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                          {ev.tour?.nice_name && (
                            <span style={{
                              fontFamily: "var(--font-antonio)", fontSize: "0.5rem",
                              letterSpacing: "0.15em", color: "#D8B35A",
                              background: "#D8B35A18", border: "1px solid #D8B35A44",
                              borderRadius: "4px", padding: "2px 8px",
                              textTransform: "uppercase",
                            }}>
                              {ev.tour.nice_name}
                            </span>
                          )}
                          {ev.venue?.venue_city_name && (
                            <span style={{
                              fontFamily: "var(--font-geist)", fontSize: "0.68rem",
                              color: "#8C7A56",
                            }}>
                              {ev.venue.venue_name} · {ev.venue.venue_city_name}
                            </span>
                          )}
                          <span style={{
                            fontFamily: "var(--font-geist)", fontSize: "0.68rem",
                            color: "#8C7A56",
                          }}>
                            {ev.fullDate !== "TBA" ? ev.fullDate : ev.date}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{
                          fontFamily: "var(--font-antonio)", fontSize: "1.3rem",
                          fontWeight: 700, color: "#D8B35A",
                        }}>
                          od {getCurrency(ev.min_price) === "GBP" ? "£" : "€"}{Math.round(getPrice(ev.min_price) * 1.37)}
                        </div>
                        <div style={{
                          fontFamily: "var(--font-geist)", fontSize: "0.55rem",
                          color: "#9E8B68", marginTop: "2px",
                        }}>
                          vrátane poplatkov
                        </div>
                        <div style={{
                          fontFamily: "var(--font-antonio)", fontSize: "0.6rem",
                          color: "#D8B35A", marginTop: "6px",
                          letterSpacing: "0.12em",
                          border: "1px solid #D8B35A",
                          padding: "4px 10px", borderRadius: "5px",
                          display: "inline-block",
                        }}>
                          Kúpiť →
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
                  <button
                    onClick={() => search(query, page - 1)}
                    disabled={page <= 1 || loading}
                    style={{
                      fontFamily: "var(--font-antonio)", fontSize: "0.65rem",
                      letterSpacing: "0.1em", padding: "10px 18px",
                      background: "#fff", border: "1px solid #DDD7C8",
                      color: page <= 1 ? "#C0B090" : "#8C7A56",
                      borderRadius: "8px", cursor: page <= 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    ← Predošlá
                  </button>
                  <span style={{
                    fontFamily: "var(--font-antonio)", fontSize: "0.65rem",
                    color: "#8C7A56", padding: "10px 14px", lineHeight: "1.4",
                  }}>
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => search(query, page + 1)}
                    disabled={page >= totalPages || loading}
                    style={{
                      fontFamily: "var(--font-antonio)", fontSize: "0.65rem",
                      letterSpacing: "0.1em", padding: "10px 18px",
                      background: "#fff", border: "1px solid #DDD7C8",
                      color: page >= totalPages ? "#C0B090" : "#8C7A56",
                      borderRadius: "8px", cursor: page >= totalPages ? "not-allowed" : "pointer",
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
              <div style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.8rem",
                letterSpacing: "0.15em", color: "#C0B090",
                textTransform: "uppercase",
              }}>
                Vyber klub alebo zadaj tím a hľadaj
              </div>
            </div>
          )}

          <div style={{ paddingBottom: "100px" }} />
        </div>
      </div>
      <PonukaPopup />
    </>
  );
}
