"use client";

import { useState, useEffect } from "react";
import type { Match } from "./data";
import { buildKiwiUrl, buildTicketUrl } from "./data";

function Stars({ n }: { n: number }) {
  return (
    <span style={{ color: "#D8B35A", fontSize: "0.6rem", letterSpacing: "1px" }}>
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </span>
  );
}

function Badge({ src, abbr, color, size = 44 }: { src: string; abbr: string; color: string; size?: number }) {
  const [err, setErr] = useState(false);
  const imgSize = Math.round(size * 0.64);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "18", border: `1.5px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, overflow: "hidden",
    }}>
      {!err ? (
        <img src={src} alt={abbr} width={imgSize} height={imgSize}
          style={{ objectFit: "contain", display: "block" }}
          onError={() => setErr(true)}
        />
      ) : (
        <span style={{ fontFamily: "var(--font-antonio)", fontSize: size * 0.24 + "px", fontWeight: 700, color }}>
          {abbr}
        </span>
      )}
    </div>
  );
}

const AXA_URL = "https://www.tkqlhce.com/click-101856071-15851439";
const AXA_PIXEL = "https://www.ftjcfx.com/image-101856071-15851439";

type Tab = "hotel" | "let" | "listok" | "poistenie";

type FtnEvent = {
  id: number;
  name: string;
  date: string;
  min_price: { price: number; currency_code: string } | number;
  link: string;
};

export default function MatchCard({ match }: { match: Match }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("hotel");
  const [ftnEvents, setFtnEvents] = useState<FtnEvent[] | null>(null);
  const [ftnLoading, setFtnLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (tab !== "listok" || ftnEvents !== null) return;
    setFtnLoading(true);
    fetch(`/api/tickets?home=${encodeURIComponent(match.home)}&away=${encodeURIComponent(match.away)}&date=${match.dateISO}`)
      .then((r) => r.json())
      .then((data) => {
        const events: FtnEvent[] = Array.isArray(data?.events) ? data.events : (Array.isArray(data) ? data : []);
        setFtnEvents(events);
      })
      .catch(() => setFtnEvents([]))
      .finally(() => setFtnLoading(false));
  }, [tab, ftnEvents, match.home, match.away, match.dateISO]);

  const isBus = match.transportType === "bus";
  const flightUrl = match.transportUrl ?? buildKiwiUrl(match.kiwiCity, match.dateISO, match.returnDaysAfter);
  const ticketUrl = buildTicketUrl(match.home, match.away);
  const cheapestHotel = Math.min(...match.hotels.filter((h) => !h.isHostel).map((h) => h.pricePerNight));
  const ftnMinPrice = ftnEvents && ftnEvents.length > 0
    ? Math.round(Math.min(...ftnEvents.slice(0, 4).map((ev) => typeof ev.min_price === "object" ? ev.min_price.price : ev.min_price)) * 1.37)
    : null;
  const ticketPrice = ftnMinPrice ?? match.ticketFrom;
  const total = ticketPrice + (cheapestHotel * 3) + match.flightFrom;

  return (
    <>
      {/* ── CARD (cream/white style) ── */}
      <div
        onClick={() => { setOpen(true); setTab("hotel"); }}
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          cursor: "pointer",
          transition: "transform 0.22s ease, box-shadow 0.22s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.13)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
        }}
      >
        {/* Stadium image */}
        <div style={{
          height: "160px",
          backgroundImage: "url(/stadium.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          position: "relative",
        }}>
          {/* Team color strip */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: `linear-gradient(90deg, ${match.homeCl}, ${match.awayCl})`,
          }} />
          {/* Bottom gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
          }} />
          {/* League tag */}
          <div style={{
            position: "absolute", top: "12px", left: "14px",
            fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#D8B35A",
            background: "rgba(8,11,13,0.72)", backdropFilter: "blur(4px)",
            borderRadius: "5px", padding: "3px 9px",
          }}>{match.league}</div>
          {/* Date/time bottom */}
          <div style={{
            position: "absolute", bottom: "10px", right: "12px",
            fontFamily: "var(--font-geist)", fontSize: "0.6rem",
            color: "rgba(255,255,255,0.72)",
          }}>{match.date} · {match.time}</div>
        </div>

        {/* Content */}
        <div style={{ padding: "18px 20px 20px" }}>
          {/* Venue */}
          <div style={{
            fontFamily: "var(--font-geist)", fontSize: "0.64rem",
            color: "#9E8B68", marginBottom: "14px",
          }}>
            {match.stadium} · {match.city}
          </div>

          {/* Teams */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center", gap: "8px", marginBottom: "16px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <Badge src={match.homeBadge} abbr={match.homeAbbr} color={match.homeCl} size={48} />
              <div style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.72rem", fontWeight: 700,
                color: "#1A1208", textTransform: "uppercase", textAlign: "center", lineHeight: 1.15,
              }}>{match.home}</div>
            </div>
            <div style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.55rem",
              color: "#C0B090", letterSpacing: "0.1em",
            }}>VS</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <Badge src={match.awayBadge} abbr={match.awayAbbr} color={match.awayCl} size={48} />
              <div style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.72rem", fontWeight: 700,
                color: "#1A1208", textTransform: "uppercase", textAlign: "center", lineHeight: 1.15,
              }}>{match.away}</div>
            </div>
          </div>

          {/* Price row */}
          <div style={{
            borderTop: "1px solid #EBE6DA", paddingTop: "14px",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          }}>
            <div>
              <div style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.2em",
                color: "#8C7A56", textTransform: "uppercase", marginBottom: "4px",
              }}>od osoby</div>
              <div style={{
                fontFamily: "var(--font-antonio)", fontSize: "1.5rem",
                fontWeight: 700, color: "#D8B35A", lineHeight: 1,
              }}>€{total}</div>
              <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.55rem", color: "#9E8B68", marginTop: "3px" }}>
                {isBus ? "bus" : "let"} + 3 noci + vstupenka
              </div>
            </div>
            <div style={{
              fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#D8B35A",
              border: "1px solid #D8B35A", padding: "7px 14px", borderRadius: "7px",
            }}>
              Mám záujem →
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL (dark — unchanged) ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(4,6,10,0.82)", backdropFilter: "blur(14px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0f1828", border: "1px solid #243452", borderRadius: "16px",
              width: "100%", maxWidth: "560px",
              maxHeight: "90vh", display: "flex", flexDirection: "column",
              boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
              overflow: "hidden",
            }}
          >
            {/* Modal header */}
            <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #1a2840", flexShrink: 0, position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, ${match.homeCl}, ${match.awayCl})`,
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                  <Badge src={match.homeBadge} abbr={match.homeAbbr} color={match.homeCl} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.56rem", letterSpacing: "0.2em", color: "#4a6080", textTransform: "uppercase", marginBottom: "4px" }}>
                      {match.league} · {match.date}
                    </div>
                    <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.15rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", lineHeight: 1.1 }}>
                      {match.home} <span style={{ color: "#2e4060" }}>vs</span> {match.away}
                    </div>
                    <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.66rem", color: "#4a6080", marginTop: "4px" }}>
                      {match.stadium} · {match.city}
                    </div>
                  </div>
                  <Badge src={match.awayBadge} abbr={match.awayAbbr} color={match.awayCl} />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: "#1a2840", border: "1px solid #243452", color: "#3a4a62",
                    borderRadius: "8px", width: "30px", height: "30px", cursor: "pointer",
                    fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}
                >✕</button>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "4px", marginTop: "16px" }}>
                {([
                  { key: "hotel", label: "Ubytovanie" },
                  { key: "let", label: isBus ? "Autobus" : "Let" },
                  { key: "listok", label: "Vstupenka" },
                  { key: "poistenie", label: "Poistenie", badge: "-50%" },
                ] as { key: Tab; label: string; badge?: string }[]).map(({ key, label, badge }) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    style={{
                      fontFamily: "var(--font-antonio)", fontSize: "0.64rem", letterSpacing: "0.1em",
                      padding: "7px 14px", borderRadius: "6px", cursor: "pointer",
                      border: tab === key ? "1px solid #D8B35A66" : "1px solid #243452",
                      background: tab === key ? "#D8B35A14" : "transparent",
                      color: tab === key ? "#D8B35A" : "#3a4a62",
                      transition: "all 0.15s", position: "relative",
                    }}
                  >
                    {label}
                    {badge && (
                      <span style={{
                        position: "absolute", top: "-7px", right: "-6px",
                        background: "#16a34a", color: "#fff",
                        fontFamily: "var(--font-antonio)", fontSize: "0.45rem",
                        letterSpacing: "0.05em", padding: "1px 4px", borderRadius: "4px", lineHeight: 1.5,
                      }}>{badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ overflowY: "auto", flex: 1 }}>

              {/* HOTEL TAB */}
              {tab === "hotel" && (
                <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: "4px", paddingLeft: "4px" }}>
                    Hotely v blízkosti štadióna · 3 noci
                  </div>
                  {match.hotels.map((hotel, i) => (
                    <a key={i} href={hotel.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 16px",
                          background: hotel.isHostel ? "#1a1000" : "#121c2e",
                          border: hotel.isHostel ? "1px solid #92400e55" : "1px solid #243452",
                          borderRadius: "10px", transition: "border-color 0.15s, background 0.15s", cursor: "pointer", gap: "12px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = hotel.isHostel ? "#f97316aa" : "#D8B35A60";
                          (e.currentTarget as HTMLElement).style.background = hotel.isHostel ? "#2a1800" : "#1a2a42";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = hotel.isHostel ? "#92400e55" : "#243452";
                          (e.currentTarget as HTMLElement).style.background = hotel.isHostel ? "#1a1000" : "#121c2e";
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            {!hotel.isHostel && hotel.pricePerNight === cheapestHotel && (
                              <span style={{
                                fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.15em",
                                color: "#0a0c12", background: "#D8B35A", padding: "2px 6px", borderRadius: "3px",
                              }}>NAJLACNEJŠÍ</span>
                            )}
                            {!hotel.isHostel && <Stars n={hotel.stars} />}
                          </div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, color: "#eef0f6", lineHeight: 1.2 }}>
                            {hotel.name}
                          </div>
                          <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#4a6080", marginTop: "4px" }}>
                            {hotel.distanceKm} km od štadióna
                          </div>
                          {hotel.isHostel && (
                            <div style={{
                              marginTop: "8px", background: "#431407", border: "1px solid #92400e",
                              borderRadius: "5px", padding: "5px 10px",
                              fontFamily: "var(--font-antonio)", fontSize: "0.58rem",
                              letterSpacing: "0.06em", color: "#fb923c", textTransform: "uppercase", lineHeight: 1.4,
                            }}>
                              ⚠️ ZDIEĽANÉ IZBY S CUDZÍMI ĽUĎMI — preto je cena taká nízka
                            </div>
                          )}
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700, color: hotel.isHostel ? "#fb923c" : (!hotel.isHostel && hotel.pricePerNight === cheapestHotel ? "#D8B35A" : "#eef0f6") }}>
                            €{hotel.pricePerNight * 3}
                          </div>
                          <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.58rem", color: "#4a6080" }}>3 noci (€{hotel.pricePerNight}/noc)</div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: hotel.isHostel ? "#fb923c" : "#D8B35A", marginTop: "6px", letterSpacing: "0.1em" }}>
                            Rezervovať →
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* LET TAB */}
              {tab === "let" && (
                <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: "4px", paddingLeft: "4px" }}>
                    {isBus ? "Autobus z Bratislavy · spiatočný · deň pred zápasom" : "Lety z Bratislavy · spiatočné · deň pred zápasom"}
                  </div>
                  {(isBus ? [
                    { airline: "FlixBus (priamy)", dep: "06:00", arr: "10:30", price: match.flightFrom },
                    { airline: "FlixBus (priamy)", dep: "10:00", arr: "14:30", price: match.flightFrom + 8 },
                    { airline: "RegioJet (priamy)", dep: "14:00", arr: "19:00", price: match.flightFrom + 11 },
                  ] : [
                    { airline: "Ryanair", dep: "06:45", arr: "08:30", price: match.flightFrom },
                    { airline: "Wizz Air", dep: "11:20", arr: "13:10", price: match.flightFrom + 12 },
                    { airline: "easyJet", dep: "14:55", arr: "16:45", price: match.flightFrom + 24 },
                  ]).map((flight, i) => (
                    <a key={i} href={flightUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 16px", background: "#121c2e",
                          border: "1px solid #243452", borderRadius: "10px",
                          transition: "border-color 0.15s, background 0.15s", cursor: "pointer", gap: "12px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#D8B35A60";
                          (e.currentTarget as HTMLElement).style.background = "#1a2a42";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                          (e.currentTarget as HTMLElement).style.background = "#121c2e";
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          {i === 0 && (
                            <span style={{
                              fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.15em",
                              color: "#0a0c12", background: "#D8B35A", padding: "2px 6px", borderRadius: "3px",
                              display: "inline-block", marginBottom: "6px",
                            }}>NAJLACNEJŠÍ</span>
                          )}
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, color: "#eef0f6" }}>
                            {flight.airline}
                          </div>
                          <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#4a6080", marginTop: "4px" }}>
                            BTS → {match.city} · {flight.dep} – {flight.arr} · spiatočný
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700, color: i === 0 ? "#D8B35A" : "#eef0f6" }}>
                            od €{flight.price}
                          </div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#D8B35A", marginTop: "6px", letterSpacing: "0.1em" }}>
                            Hľadať →
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* LISTOK TAB */}
              {tab === "listok" && (
                <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: "4px", paddingLeft: "4px" }}>
                    Vstupenky — Football Ticket Net · {match.date}
                  </div>

                  {ftnLoading && (
                    <div style={{ textAlign: "center", padding: "30px", fontFamily: "var(--font-antonio)", fontSize: "0.7rem", color: "#4a6080", letterSpacing: "0.1em" }}>
                      Hľadám vstupenky...
                    </div>
                  )}

                  {!ftnLoading && ftnEvents && ftnEvents.length > 0 && ftnEvents.slice(0, 4).map((ev, i) => (
                    <a key={ev.id} href={ev.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "14px 16px", background: "#121c2e",
                          border: "1px solid #243452", borderRadius: "10px",
                          transition: "border-color 0.15s, background 0.15s", cursor: "pointer", gap: "12px",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#D8B35A60";
                          (e.currentTarget as HTMLElement).style.background = "#1a2a42";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                          (e.currentTarget as HTMLElement).style.background = "#121c2e";
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {i === 0 && (
                            <span style={{
                              fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.15em",
                              color: "#0a0c12", background: "#D8B35A", padding: "2px 6px", borderRadius: "3px",
                              display: "inline-block", marginBottom: "6px",
                            }}>NAJLACNEJŠÍ</span>
                          )}
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, color: "#eef0f6", lineHeight: 1.2 }}>
                            Football Ticket Net
                          </div>
                          <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#4a6080", marginTop: "4px" }}>
                            {ev.name} · {ev.date}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700, color: i === 0 ? "#D8B35A" : "#eef0f6" }}>
                            od €{Math.round((typeof ev.min_price === "object" ? ev.min_price.price : ev.min_price) * 1.37)}
                          </div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#D8B35A", marginTop: "6px", letterSpacing: "0.1em" }}>
                            Kúpiť →
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}

                  {!ftnLoading && ftnEvents && ftnEvents.length === 0 && (
                    <a href={ticketUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "20px 18px", background: "#121c2e",
                          border: "1px solid #243452", borderRadius: "10px", cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#D8B35A60";
                          (e.currentTarget as HTMLElement).style.background = "#1a2a42";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                          (e.currentTarget as HTMLElement).style.background = "#121c2e";
                        }}
                      >
                        <div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, color: "#eef0f6", marginBottom: "6px" }}>
                            Viagogo — {match.home} vs {match.away}
                          </div>
                          <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#4a6080" }}>
                            {match.stadium} · {match.date} · {match.time}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.1rem", fontWeight: 700, color: "#D8B35A" }}>
                            od €{match.ticketFrom}
                          </div>
                          <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#D8B35A", marginTop: "6px", letterSpacing: "0.1em" }}>
                            Kúpiť →
                          </div>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              )}

              {/* POISTENIE TAB */}
              {tab === "poistenie" && (
                <div style={{ padding: "14px 18px" }}>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", marginBottom: "12px", paddingLeft: "4px" }}>
                    Cestovné poistenie na výlet · AXA Assistance
                  </div>
                  <a href={AXA_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "20px 18px", background: "#121c2e",
                        border: "1px solid #243452", borderRadius: "10px",
                        transition: "border-color 0.15s, background 0.15s", cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#D8B35A60";
                        (e.currentTarget as HTMLElement).style.background = "#1a2a42";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#243452";
                        (e.currentTarget as HTMLElement).style.background = "#121c2e";
                      }}
                    >
                      <div>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#16a34a22", border: "1px solid #16a34a44", borderRadius: "4px", padding: "2px 8px", marginBottom: "8px" }}>
                          <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.5rem", letterSpacing: "0.15em", color: "#16a34a" }}>50% ZĽAVA</span>
                        </div>
                        <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", fontWeight: 700, color: "#eef0f6", marginBottom: "6px" }}>
                          AXA Assistance — Cestovné poistenie SK
                        </div>
                        <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.62rem", color: "#4a6080" }}>
                          Krytie počas celého výletu · úraz, storno, batožina
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.58rem", color: "#D8B35A", letterSpacing: "0.1em" }}>
                          Zistiť cenu →
                        </div>
                      </div>
                    </div>
                  </a>
                  <img src={AXA_PIXEL} width="1" height="1" style={{ border: 0, display: "block" }} alt="" />
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: "14px 18px 18px", borderTop: "1px solid #1a2840", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.58rem", color: "#4a6080", marginBottom: "2px" }}>Celkovo od / na osobu</div>
                <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.5rem", fontWeight: 700, color: "#D8B35A" }}>€{total}</div>
                <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.48rem", color: "#3a5070", marginTop: "2px" }}>
                  {isBus ? "bus" : "let"} €{match.flightFrom} + 3 noci €{cheapestHotel * 3} + vstupenka €{ticketPrice}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.64rem", letterSpacing: "0.12em",
                  padding: "10px 20px", background: "#1a2840", border: "1px solid #243452",
                  color: "#3a4a62", borderRadius: "8px", cursor: "pointer", textTransform: "uppercase",
                }}
              >Zavrieť</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
