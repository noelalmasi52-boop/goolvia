"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SubPageNav from "@/components/layout/SubPageNav";

/* ─── Data ─────────────────────────────────────────── */

const JOURNEY_STEPS = [
  {
    n: "1",
    icon: "home",
    title: "Domov",
    desc: "Ty sa rozhodneš, kde a kedy chceš ísť.",
  },
  {
    n: "2",
    icon: "plane",
    title: "Let",
    desc: "Nájdeme najvhodnejšie spojenie.",
  },
  {
    n: "3",
    icon: "car",
    title: "Transfer",
    desc: "Z letiska priamo k hotelu.",
  },
  {
    n: "4",
    icon: "hotel",
    title: "Hotel",
    desc: "Vyberieme hotel podľa rozpočtu a lokality.",
  },
  {
    n: "5",
    icon: "ball",
    title: "Zápas",
    desc: "Pomôžeme so vstupenkami a matchday plánom.",
  },
  {
    n: "6",
    icon: "city",
    title: "Mesto",
    desc: "Dostaneš tipy, čo vidieť a kde sa najesť.",
  },
  {
    n: "7",
    icon: "home",
    title: "Domov",
    desc: "Postaráme sa o hladký návrat.",
  },
];

const ITINERARY = [
  {
    day: "Piatok",
    label: "Prílet a check-in",
    events: [
      { time: "14:20", desc: "Odlet z Viedne" },
      { time: "15:45", desc: "Prílet London Stansted" },
      { time: "16:20", desc: "Transfer do centra" },
      { time: "18:00", desc: "Check-in v hoteli" },
      { time: "20:00", desc: "Odporúčaná večera / voľný program" },
    ],
  },
  {
    day: "Sobota",
    label: "Deň zápasu",
    events: [
      { time: "09:00", desc: "Raňajky" },
      { time: "10:30", desc: "Centrum Londýna" },
      { time: "13:30", desc: "Presun na štadión" },
      { time: "15:00", desc: "Arsenal vs Chelsea" },
      { time: "18:00", desc: "Fan zone / pub" },
      { time: "20:00", desc: "Večera" },
    ],
  },
  {
    day: "Nedeľa",
    label: "Návrat domov",
    events: [
      { time: "09:00", desc: "Raňajky" },
      { time: "11:00", desc: "Voľný program" },
      { time: "14:30", desc: "Transfer na letisko" },
      { time: "17:10", desc: "Odlet" },
      { time: "20:20", desc: "Prílet domov" },
    ],
  },
];

const SERVICES = [
  {
    icon: "plane",
    title: "Cesta",
    desc: "Lety, vlak alebo iná doprava podľa najlepšieho spojenia.",
  },
  {
    icon: "hotel",
    title: "Hotel",
    desc: "Hotel podľa rozpočtu, lokality a štadióna.",
  },
  {
    icon: "car",
    title: "Transfer",
    desc: "Letisko → hotel → štadión → letisko.",
  },
  {
    icon: "ticket",
    title: "Vstupenky",
    desc: "Pomoc s výberom správnych miest a overených možností.",
  },
  {
    icon: "map",
    title: "Itinerár",
    desc: "Kompletný plán výletu krok za krokom.",
  },
  {
    icon: "support",
    title: "Podpora 24/7",
    desc: "Sme s tebou pred cestou aj počas výletu.",
  },
];

const PREFERENCES = [
  { icon: "💰", label: "Rozpočet" },
  { icon: "⭐", label: "★★★★ Hotel" },
  { icon: "📍", label: "Centrum mesta" },
  { icon: "🏟️", label: "Blízko štadióna" },
  { icon: "🌙", label: "Nočný život" },
  { icon: "🏛️", label: "Pamiatky" },
  { icon: "👨‍👩‍👧", label: "Rodinný výlet" },
  { icon: "👑", label: "VIP zážitok" },
];

const BENEFITS = [
  {
    title: "Jeden plán",
    desc: "Všetko máš na jednom mieste.",
  },
  {
    title: "Bez stresu",
    desc: "Nemusíš skladať let, hotel a transfer zvlášť.",
  },
  {
    title: "Podpora 24/7",
    desc: "Ak sa niečo zmení, vieš koho kontaktovať.",
  },
  {
    title: "Na mieru",
    desc: "Výlet prispôsobíme tvojmu rozpočtu a preferenciám.",
  },
];

const MATCH_OPTIONS = [
  "Napoli vs Bologna – 13 SEP 2026",
  "Inter vs Udinese – 14 SEP 2026",
  "Brentford vs Chelsea – 18 SEP 2026",
  "Tottenham vs Aston Villa – 19 SEP 2026",
  "Sevilla vs Barcelona – 19 SEP 2026",
  "Manchester Utd vs Tottenham – 10 OCT 2026",
  "Liverpool vs Manchester City – 11 OCT 2026",
  "Newcastle vs Aston Villa – 17 OCT 2026",
  "Arsenal vs Everton – 24 OCT 2026",
  "Barcelona vs Real Madrid – 25 OCT 2026 (El Clásico)",
  "PSG vs Olympique Lyon – 25 OCT 2026",
  "Bayern Munich vs Borussia Dortmund – 31 OCT 2026",
  "Iný zápas (napíš do správy)",
];

/* ─── Icon SVGs ─────────────────────────────────────── */

function Icon({ name, size = 20, color = "#D8B35A" }: { name: string; size?: number; color?: string }) {
  const s = size;
  switch (name) {
    case "home":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "plane":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22 11 13 2 9l20-7z" />
        </svg>
      );
    case "car":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="11" width="22" height="9" rx="2" />
          <path d="M5 11l2-6h10l2 6" />
          <circle cx="7.5" cy="20" r="1.5" fill={color} stroke="none" />
          <circle cx="16.5" cy="20" r="1.5" fill={color} stroke="none" />
        </svg>
      );
    case "hotel":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12" />
          <path d="M2 20h20" />
          <path d="M12 6V4" />
          <rect x="6" y="12" width="4" height="4" />
          <rect x="14" y="12" width="4" height="4" />
        </svg>
      );
    case "ball":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      );
    case "city":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21" />
          <path d="M5 21V5l8-2v18" />
          <path d="M19 21V9l-6-2" />
          <rect x="9" y="9" width="2" height="3" />
          <rect x="12" y="9" width="2" height="3" />
          <rect x="9" y="14" width="2" height="3" />
          <rect x="12" y="14" width="2" height="3" />
        </svg>
      );
    case "ticket":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
          <line x1="9" y1="5" x2="9" y2="19" strokeDasharray="2 2" />
        </svg>
      );
    case "map":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      );
    case "support":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case "play":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill={color} stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Page ──────────────────────────────────────────── */

export default function PremiovaSluzbaPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ meno: "", email: "", telefon: "", zapas: "", pocet: "1", rozpocet: "", sprava: "" });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://formsubmit.co/ajax/noelalmasi52@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Prémiová ponuka – ${form.zapas || "dopyt"}`,
          Meno: form.meno,
          Email: form.email,
          Telefón: form.telefon,
          Zápas: form.zapas,
          "Počet ľudí": form.pocet,
          Rozpočet: form.rozpocet,
          Správa: form.sprava,
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080B0D", color: "#F7F7F5", overflowX: "hidden" }}>
      <SubPageNav />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        minHeight: isMobile ? "auto" : "90vh",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Left — text */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isMobile ? "80px 24px 60px" : "120px 60px 100px",
          background: "#080B0D",
          position: "relative",
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            color: "#D8B35A",
            textTransform: "uppercase",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#D8B35A" }} />
            Prémiová Služba
          </p>

          <h1 style={{
            fontFamily: "var(--font-antonio)",
            fontWeight: 700,
            fontSize: isMobile ? "clamp(2.6rem, 12vw, 4rem)" : "clamp(3rem, 5vw, 5rem)",
            lineHeight: 0.92,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            marginBottom: "28px",
          }}>
            <span style={{ color: "#F7F7F5", display: "block" }}>Ty si užiješ</span>
            <span style={{ color: "#F7F7F5", display: "block" }}>zápas.</span>
            <span style={{ color: "#D8B35A", display: "block" }}>My zariadime</span>
            <span style={{ color: "#D8B35A", display: "block" }}>celú cestu.</span>
          </h1>

          <p style={{
            fontFamily: "var(--font-geist)",
            fontSize: isMobile ? "0.9rem" : "1rem",
            color: "rgba(247,247,245,0.6)",
            lineHeight: 1.75,
            maxWidth: "440px",
            marginBottom: "40px",
          }}>
            Povieš nám, na ktorý zápas chceš ísť. My ti pripravíme celý výlet — dopravu, hotel, vstupenky, transfery, check-in, itinerár aj podporu počas cesty. Ty sa len tešíš na zážitok.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
            <a
              href="#form"
              onClick={(e) => { e.preventDefault(); document.getElementById("form")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-antonio)", fontSize: "0.72rem",
                fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", textDecoration: "none",
                color: "#080B0D", background: "#D8B35A",
                padding: "15px 30px", borderRadius: "6px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Naplánovať môj výlet →
            </a>

            <a
              href="#journey"
              onClick={(e) => { e.preventDefault(); document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                textDecoration: "none", color: "rgba(247,247,245,0.7)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F7F7F5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(247,247,245,0.7)"; }}
            >
              <Icon name="play" size={18} color="currentColor" />
              Ako to funguje?
            </a>
          </div>
        </div>

        {/* Right — stadium photo */}
        <div style={{
          position: "relative",
          minHeight: isMobile ? "260px" : "auto",
          overflow: "hidden",
        }}>
          <img
            src="/stadium.avif"
            alt="Futbalový štadión"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center 30%",
            }}
          />
          {/* Gradient overlay — left fade into dark */}
          <div style={{
            position: "absolute", inset: 0,
            background: isMobile
              ? "linear-gradient(to bottom, rgba(8,11,13,0.3) 0%, rgba(8,11,13,0.8) 100%)"
              : "linear-gradient(to right, #080B0D 0%, rgba(8,11,13,0.4) 30%, rgba(8,11,13,0) 70%)",
          }} />
          {/* Bottom overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(8,11,13,0.6) 0%, transparent 60%)",
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. JOURNEY — "AKO TO FUNGUJE?"
      ══════════════════════════════════════════ */}
      <section id="journey" style={{ background: "#F4F1EA", padding: isMobile ? "64px 24px" : "80px 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Header row */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: isMobile ? "48px" : "56px",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <p style={{
              fontFamily: "var(--font-antonio)",
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              color: "#8C7A56",
              textTransform: "uppercase",
            }}>
              Ako to funguje?
            </p>
            <p style={{
              fontFamily: "var(--font-antonio)",
              fontSize: "0.52rem",
              letterSpacing: "0.18em",
              color: "#9E8B68",
              textTransform: "uppercase",
              textAlign: "right",
            }}>
              Od odchodu až po návrat. Všetko za teba.
            </p>
          </div>

          {/* Steps */}
          {isMobile ? (
            /* Mobile: vertical timeline */
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {JOURNEY_STEPS.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "20px", position: "relative" }}>
                  {/* Left column: circle + line */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      border: "1.5px solid #D8B35A",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#F4F1EA",
                      flexShrink: 0,
                    }}>
                      <Icon name={step.icon} size={18} color="#D8B35A" />
                    </div>
                    {i < JOURNEY_STEPS.length - 1 && (
                      <div style={{ width: "1px", flexGrow: 1, background: "#DDD7C8", marginTop: "4px", minHeight: "40px" }} />
                    )}
                  </div>
                  {/* Right: text */}
                  <div style={{ paddingBottom: "32px" }}>
                    <div style={{
                      fontFamily: "var(--font-antonio)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#1A1208",
                      marginBottom: "4px",
                    }}>
                      <span style={{ color: "#D8B35A", marginRight: "6px" }}>{step.n}.</span>{step.title}
                    </div>
                    <p style={{
                      fontFamily: "var(--font-geist)",
                      fontSize: "0.78rem",
                      color: "#8C7A56",
                      lineHeight: 1.55,
                      margin: 0,
                    }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: horizontal */
            <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
              {JOURNEY_STEPS.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                  {/* Step */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center" }}>
                    {/* Circle icon */}
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      border: "1.5px solid #D8B35A",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#F4F1EA",
                      marginBottom: "16px",
                    }}>
                      <Icon name={step.icon} size={20} color="#D8B35A" />
                    </div>
                    <div style={{
                      fontFamily: "var(--font-antonio)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      color: "#D8B35A",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}>{step.n}</div>
                    <div style={{
                      fontFamily: "var(--font-antonio)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#1A1208",
                      marginBottom: "8px",
                    }}>{step.title}</div>
                    <p style={{
                      fontFamily: "var(--font-geist)",
                      fontSize: "0.68rem",
                      color: "#8C7A56",
                      lineHeight: 1.55,
                      maxWidth: "120px",
                      margin: "0 auto",
                    }}>{step.desc}</p>
                  </div>

                  {/* Arrow connector */}
                  {i < JOURNEY_STEPS.length - 1 && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "26px",
                      flexShrink: 0,
                      color: "#DDD7C8",
                    }}>
                      <div style={{ width: "24px", height: "1px", background: "#D8B35A44" }} />
                      <span style={{ color: "#D8B35A88", fontSize: "0.5rem" }}>▶</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. EXAMPLE TRIP
      ══════════════════════════════════════════ */}
      <section style={{ background: "#0d1117", padding: isMobile ? "64px 24px" : "100px 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Section label */}
          <p style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            color: "#D8B35A",
            textTransform: "uppercase",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#D8B35A" }} />
            Ukážkový výlet
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.8fr",
            gap: isMobile ? "40px" : "60px",
            alignItems: "start",
          }}>

            {/* Left: trip info */}
            <div>
              <h2 style={{
                fontFamily: "var(--font-antonio)",
                fontWeight: 700,
                fontSize: isMobile ? "clamp(2rem, 10vw, 3rem)" : "clamp(2.2rem, 3.5vw, 3.4rem)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "#F7F7F5",
                marginBottom: "16px",
              }}>
                Takto môže vyzerať<br />
                <span style={{ color: "#D8B35A" }}>tvoj futbalový</span><br />
                víkend.
              </h2>
              <p style={{
                fontFamily: "var(--font-geist)",
                fontSize: "0.85rem",
                color: "rgba(247,247,245,0.5)",
                marginBottom: "36px",
              }}>
                Skutočný plán. Žiadne starosti.
              </p>

              {/* Arsenal stadium photo */}
              <div style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                aspectRatio: "4/3",
                marginBottom: "28px",
              }}>
                <img
                  src="/arsenal%20stadium.jpg"
                  alt="Emirates Stadium, Londýn"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center 40%",
                  }}
                />
                {/* City label overlay */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "20px",
                  background: "linear-gradient(to top, rgba(8,11,13,0.88) 0%, transparent 70%)",
                }}>
                  <p style={{
                    fontFamily: "var(--font-antonio)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    color: "#D8B35A",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}>Londýn, Anglicko</p>
                  <p style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.68rem",
                    color: "rgba(247,247,245,0.65)",
                  }}>Emirates Stadium</p>
                </div>
              </div>

              {/* Trip meta */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}>
                {[
                  { icon: "city", text: "Londýn, Anglicko" },
                  { icon: "plane", text: "3 dni / Odlet z Viedne" },
                  { icon: "ball", text: "Arsenal vs Chelsea" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "28px", height: "28px",
                      borderRadius: "50%",
                      border: "1px solid #D8B35A44",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon name={icon} size={13} color="#D8B35A" />
                    </div>
                    <span style={{
                      fontFamily: "var(--font-geist)",
                      fontSize: "0.82rem",
                      color: "rgba(247,247,245,0.75)",
                    }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: itinerary */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "16px",
            }}>
              {ITINERARY.map((day, di) => (
                <div key={di} style={{
                  background: "#141b25",
                  border: "1px solid #1e2d40",
                  borderRadius: "12px",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  {/* Day header */}
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ width: "20px", height: "2px", background: "#D8B35A", marginBottom: "12px" }} />
                    <div style={{
                      fontFamily: "var(--font-antonio)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#F7F7F5",
                      marginBottom: "4px",
                    }}>{day.day}</div>
                    <div style={{
                      fontFamily: "var(--font-geist)",
                      fontSize: "0.68rem",
                      color: "#D8B35A",
                    }}>{day.label}</div>
                  </div>

                  {/* Events */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {day.events.map((ev, ei) => (
                      <div key={ei} style={{ display: "flex", gap: "12px", position: "relative", paddingBottom: "16px" }}>
                        {/* Timeline line + dot */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "16px" }}>
                          <div style={{
                            width: "6px", height: "6px", borderRadius: "50%",
                            background: "#D8B35A",
                            flexShrink: 0,
                            marginTop: "5px",
                          }} />
                          {ei < day.events.length - 1 && (
                            <div style={{
                              width: "1px",
                              flexGrow: 1,
                              background: "#243452",
                              marginTop: "4px",
                            }} />
                          )}
                        </div>
                        {/* Content */}
                        <div>
                          <div style={{
                            fontFamily: "var(--font-antonio)",
                            fontSize: "0.62rem",
                            letterSpacing: "0.1em",
                            color: "#D8B35A",
                            marginBottom: "2px",
                          }}>{ev.time}</div>
                          <div style={{
                            fontFamily: "var(--font-geist)",
                            fontSize: "0.74rem",
                            color: "rgba(247,247,245,0.75)",
                            lineHeight: 1.4,
                          }}>{ev.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* CTA card */}
              {!isMobile && (
                <div style={{ gridColumn: "1 / -1", marginTop: "8px", display: "flex", justifyContent: "flex-end" }}>
                  <a
                    href="#form"
                    onClick={(e) => { e.preventDefault(); document.getElementById("form")?.scrollIntoView({ behavior: "smooth" }); }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "10px",
                      fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
                      fontWeight: 700, letterSpacing: "0.18em",
                      textTransform: "uppercase", textDecoration: "none",
                      color: "#D8B35A",
                      border: "1px solid #D8B35A55",
                      padding: "12px 24px", borderRadius: "6px",
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#D8B35A"; el.style.color = "#080B0D"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#D8B35A"; }}
                  >
                    Pozrieť podobné zájazdy →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. SERVICES — "ČO VIEME ZARIADIŤ?"
      ══════════════════════════════════════════ */}
      <section style={{ background: "#F4F1EA", padding: isMobile ? "64px 24px" : "80px 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: isMobile ? "48px" : "56px",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-antonio)",
                fontSize: "0.58rem",
                letterSpacing: "0.28em",
                color: "#8C7A56",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}>Čo vieme zariadiť?</p>
              <h2 style={{
                fontFamily: "var(--font-antonio)",
                fontWeight: 700,
                fontSize: isMobile ? "clamp(1.8rem, 8vw, 2.4rem)" : "clamp(2rem, 3vw, 2.8rem)",
                lineHeight: 1,
                textTransform: "uppercase",
                color: "#1A1208",
              }}>Všetko.</h2>
            </div>
            <p style={{
              fontFamily: "var(--font-antonio)",
              fontSize: "0.52rem",
              letterSpacing: "0.18em",
              color: "#9E8B68",
              textTransform: "uppercase",
              textAlign: "right",
              alignSelf: "flex-end",
            }}>
              Jeden partner. Celá cesta.
            </p>
          </div>

          {/* Services grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(6, 1fr)",
            gap: "0",
          }}>
            {SERVICES.map((svc, i) => (
              <div key={i} style={{
                padding: isMobile ? "24px 20px" : "36px 28px",
                borderLeft: i === 0 ? "1px solid #DDD7C8" : "none",
                borderRight: "1px solid #DDD7C8",
                borderTop: isMobile && i >= 2 ? "1px solid #DDD7C8" : (isMobile && i === 0 ? "1px solid #DDD7C8" : (isMobile && i === 1 ? "1px solid #DDD7C8" : "none")),
                borderBottom: "none",
              }}>
                <div style={{ marginBottom: "16px" }}>
                  <Icon name={svc.icon} size={22} color="#1A1208" />
                </div>
                <div style={{
                  fontFamily: "var(--font-antonio)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#1A1208",
                  marginBottom: "8px",
                }}>{svc.title}</div>
                <p style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.72rem",
                  color: "#8C7A56",
                  lineHeight: 1.6,
                  margin: 0,
                }}>{svc.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom rule */}
          <div style={{ borderTop: "1px solid #DDD7C8", marginTop: "0" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. PREFERENCE CHIPS — "NIE BALÍK. TVOJ VÝLET."
      ══════════════════════════════════════════ */}
      <section style={{ background: "#080B0D", padding: isMobile ? "64px 24px" : "80px 60px" }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "40px" : "80px",
          alignItems: "center",
        }}>

          {/* Left */}
          <div>
            <h2 style={{
              fontFamily: "var(--font-antonio)",
              fontWeight: 700,
              fontSize: isMobile ? "clamp(2.4rem, 10vw, 3.6rem)" : "clamp(2.6rem, 4vw, 4rem)",
              lineHeight: 0.92,
              textTransform: "uppercase",
              marginBottom: "24px",
            }}>
              <span style={{ color: "#F7F7F5", display: "block" }}>Nie balík.</span>
              <span style={{ color: "#D8B35A", display: "block" }}>Tvoj výlet.</span>
            </h2>
            <p style={{
              fontFamily: "var(--font-geist)",
              fontSize: "0.92rem",
              color: "rgba(247,247,245,0.55)",
              lineHeight: 1.75,
              maxWidth: "400px",
            }}>
              Každý výlet skladáme podľa teba — rozpočtu, termínu, štadióna, preferovaného hotela a toho, čo chceš v meste zažiť.
            </p>
          </div>

          {/* Right — chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {PREFERENCES.map(({ icon, label }) => (
              <div
                key={label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  borderRadius: "40px",
                  border: "1px solid rgba(216,179,90,0.25)",
                  background: "rgba(216,179,90,0.05)",
                  cursor: "default",
                  transition: "border-color 0.2s, background 0.2s",
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.8rem",
                  color: "rgba(247,247,245,0.75)",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(216,179,90,0.6)";
                  el.style.background = "rgba(216,179,90,0.1)";
                  el.style.color = "#F7F7F5";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(216,179,90,0.25)";
                  el.style.background = "rgba(216,179,90,0.05)";
                  el.style.color = "rgba(247,247,245,0.75)";
                }}
              >
                <span style={{ fontSize: "0.9rem" }}>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. WHY GOOLVIA — "PREČO GOOLVIA?"
      ══════════════════════════════════════════ */}
      <section style={{ background: "#F4F1EA", padding: isMobile ? "64px 24px" : "80px 60px" }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr",
          gap: isMobile ? "40px" : "80px",
          alignItems: "start",
        }}>

          {/* Left */}
          <div>
            <p style={{
              fontFamily: "var(--font-antonio)",
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              color: "#8C7A56",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>Prečo Goolvia?</p>
            <h2 style={{
              fontFamily: "var(--font-antonio)",
              fontWeight: 700,
              fontSize: isMobile ? "clamp(2rem, 9vw, 3rem)" : "clamp(2.2rem, 3.2vw, 3.2rem)",
              lineHeight: 0.92,
              textTransform: "uppercase",
              color: "#1A1208",
            }}>
              Ty neriešiš<br />
              logistiku.<br />
              <span style={{ color: "#D8B35A" }}>Len sa tešíš</span><br />
              na zápas.
            </h2>
          </div>

          {/* Right — benefits */}
          <div>
            {BENEFITS.map(({ title, desc }, i) => (
              <div key={i}>
                <div style={{
                  padding: "28px 0",
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "24px",
                  alignItems: "start",
                }}>
                  <div style={{
                    fontFamily: "var(--font-antonio)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#1A1208",
                  }}>
                    <div style={{ width: "16px", height: "2px", background: "#D8B35A", marginBottom: "10px" }} />
                    {title}
                  </div>
                  <p style={{
                    fontFamily: "var(--font-geist)",
                    fontSize: "0.82rem",
                    color: "#8C7A56",
                    lineHeight: 1.65,
                    margin: 0,
                  }}>{desc}</p>
                </div>
                {i < BENEFITS.length - 1 && (
                  <div style={{ height: "1px", background: "#DDD7C8" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. INQUIRY FORM
      ══════════════════════════════════════════ */}
      <section id="form" style={{ background: "#0d1117", padding: isMobile ? "64px 24px 80px" : "80px 60px 100px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>

          <p style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            color: "#D8B35A",
            textTransform: "uppercase",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#D8B35A" }} />
            Naplánovať výlet
          </p>
          <h2 style={{
            fontFamily: "var(--font-antonio)",
            fontWeight: 700,
            fontSize: isMobile ? "clamp(2rem, 9vw, 3rem)" : "clamp(2.4rem, 3.5vw, 3.6rem)",
            lineHeight: 0.92,
            textTransform: "uppercase",
            color: "#F7F7F5",
            marginBottom: "14px",
          }}>
            Pošleme vám<br /><span style={{ color: "#D8B35A" }}>ponuku</span> na mieru.
          </h2>
          <p style={{
            fontFamily: "var(--font-geist)",
            fontSize: "0.9rem",
            color: "rgba(247,247,245,0.5)",
            lineHeight: 1.7,
            marginBottom: "48px",
          }}>
            Vyber zápas, napíš nám kontakt a do 24 hodín dostaneš konkrétnu ponuku — letenky, hotel, vstupenky aj transfer.
          </p>

          {sent ? (
            <div style={{
              background: "#141b25",
              border: "1px solid #1e2d40",
              borderRadius: "16px",
              padding: "56px 40px",
              textAlign: "center",
            }}>
              <div style={{ width: "32px", height: "2px", background: "#16a34a", marginBottom: "24px", marginLeft: "auto", marginRight: "auto" }} />
              <h3 style={{
                fontFamily: "var(--font-antonio)",
                fontSize: "1.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#F7F7F5",
                marginBottom: "12px",
              }}>Odoslané!</h3>
              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.88rem", color: "rgba(247,247,245,0.5)", lineHeight: 1.7, marginBottom: "32px" }}>
                Ďakujeme! Ozveme sa vám do 24 hodín s kompletnou ponukou.
              </p>
              <Link href="/" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
                letterSpacing: "0.18em", textTransform: "uppercase",
                textDecoration: "none", color: "#080B0D",
                background: "#D8B35A", padding: "12px 24px", borderRadius: "6px",
              }}>
                Späť na zápasy
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{
                background: "#141b25",
                border: "1px solid #1e2d40",
                borderRadius: "16px",
                padding: isMobile ? "28px 20px" : "40px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}>

                {/* Zapas */}
                <div>
                  <label style={labelSt}>Na aký zápas chcete ísť? *</label>
                  <select required value={form.zapas} onChange={(e) => setForm(p => ({ ...p, zapas: e.target.value }))}
                    style={{ ...inputSt, cursor: "pointer" }}
                    onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#1e2d40"; }}
                  >
                    <option value="">Vyber zápas…</option>
                    {MATCH_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Pocet + Rozpocet */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelSt}>Počet ľudí *</label>
                    <select required value={form.pocet} onChange={(e) => setForm(p => ({ ...p, pocet: e.target.value }))}
                      style={{ ...inputSt, cursor: "pointer" }}
                      onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#1e2d40"; }}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={String(n)}>{n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osôb"}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelSt}>Rozpočet na osobu</label>
                    <select value={form.rozpocet} onChange={(e) => setForm(p => ({ ...p, rozpocet: e.target.value }))}
                      style={{ ...inputSt, cursor: "pointer" }}
                      onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#1e2d40"; }}
                    >
                      <option value="">Neviem / čo najmenej</option>
                      <option value="do 200€">do 200 €</option>
                      <option value="200–350€">200 – 350 €</option>
                      <option value="350–500€">350 – 500 €</option>
                      <option value="500€+">500 € a viac</option>
                    </select>
                  </div>
                </div>

                {/* Meno + Telefon */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelSt}>Meno a priezvisko *</label>
                    <input required placeholder="Ján Novák" value={form.meno} onChange={(e) => setForm(p => ({ ...p, meno: e.target.value }))}
                      style={inputSt}
                      onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#1e2d40"; }}
                    />
                  </div>
                  <div>
                    <label style={labelSt}>Telefón</label>
                    <input placeholder="+421 900 000 000" value={form.telefon} onChange={(e) => setForm(p => ({ ...p, telefon: e.target.value }))}
                      style={inputSt}
                      onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#1e2d40"; }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={labelSt}>Email *</label>
                  <input required type="email" placeholder="jan@example.com" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    style={inputSt}
                    onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#1e2d40"; }}
                  />
                </div>

                {/* Sprava */}
                <div>
                  <label style={labelSt}>Správa / špeciálne požiadavky</label>
                  <textarea
                    placeholder="Napr. chceme sedieť spolu, preferujeme 3* hotel, prídeme autom z Bratislavy…"
                    rows={3}
                    value={form.sprava}
                    onChange={(e) => setForm(p => ({ ...p, sprava: e.target.value }))}
                    style={{ ...inputSt, resize: "vertical", lineHeight: "1.6" }}
                    onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#1e2d40"; }}
                  />
                </div>

                {/* Included */}
                <div style={{
                  background: "#0d1117",
                  border: "1px solid #1a2535",
                  borderRadius: "10px",
                  padding: "14px 18px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px 20px",
                }}>
                  {["Letenky", "Hotel", "Vstupenky", "Poistenie", "Transfer", "Itinerár", "Podpora 24/7"].map((item) => (
                    <span key={item} style={{
                      fontFamily: "var(--font-antonio)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.14em",
                      color: "#4a6080",
                      textTransform: "uppercase",
                    }}>{item}</span>
                  ))}
                </div>

                <button type="submit" disabled={sending} style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.72rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  background: sending ? "#a07830" : "#D8B35A",
                  color: "#080B0D", border: "none", borderRadius: "6px",
                  padding: "16px 32px", cursor: sending ? "not-allowed" : "pointer",
                  fontWeight: 700, transition: "opacity 0.2s", alignSelf: "flex-start",
                }}
                  onMouseEnter={(e) => { if (!sending) (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  {sending ? "Odosiela sa…" : "Odoslať dopyt →"}
                </button>

                <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#2e4060", lineHeight: 1.6, marginTop: "-8px" }}>
                  Odpovieme do 24 hodín. Bez záväzkov. Alebo nás kontaktuj na{" "}
                  <a href="https://www.instagram.com/goolviaztn/" target="_blank" rel="noopener noreferrer" style={{ color: "#D8B35A", textDecoration: "none" }}>Instagrame</a>
                  {" "}alebo cez{" "}
                  <a href="https://wa.me/421903118569" target="_blank" rel="noopener noreferrer" style={{ color: "#D8B35A", textDecoration: "none" }}>WhatsApp</a>.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FINAL CTA
      ══════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        minHeight: isMobile ? "400px" : "480px",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Background — stadium photo */}
        <img
          src="/stadium.avif"
          alt=""
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 60%",
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(8,11,13,0.94) 0%, rgba(8,11,13,0.82) 40%, rgba(8,11,13,0.5) 100%)",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          padding: isMobile ? "60px 24px" : "80px 60px",
        }}>
          <p style={{
            fontFamily: "var(--font-antonio)",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            color: "#D8B35A",
            textTransform: "uppercase",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#D8B35A" }} />
            Prémiová Služba
          </p>

          <h2 style={{
            fontFamily: "var(--font-antonio)",
            fontWeight: 700,
            fontSize: isMobile ? "clamp(2.4rem, 11vw, 3.6rem)" : "clamp(2.8rem, 5vw, 5rem)",
            lineHeight: 0.92,
            textTransform: "uppercase",
            marginBottom: "36px",
            maxWidth: "700px",
          }}>
            <span style={{ color: "#F7F7F5", display: "block" }}>Máš vybraný zápas?</span>
            <span style={{ color: "#D8B35A", display: "block" }}>Zvyšok vymyslíme</span>
            <span style={{ color: "#D8B35A", display: "block" }}>spolu.</span>
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <a
              href="#form"
              onClick={(e) => { e.preventDefault(); document.getElementById("form")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "var(--font-antonio)", fontSize: "0.72rem",
                fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", textDecoration: "none",
                color: "#080B0D", background: "#D8B35A",
                padding: "15px 30px", borderRadius: "6px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Naplánovať výlet →
            </a>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "default",
            }}>
              <div style={{
                width: "40px", height: "40px",
                borderRadius: "50%",
                border: "1.5px solid rgba(247,247,245,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="play" size={16} color="rgba(247,247,245,0.7)" />
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-antonio)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(247,247,245,0.8)",
                }}>Pozrieť video</div>
                <div style={{
                  fontFamily: "var(--font-geist)",
                  fontSize: "0.65rem",
                  color: "rgba(247,247,245,0.4)",
                }}>Ako funguje Goolvia</div>
              </div>
            </div>
          </div>

          {/* Bottom tagline */}
          <div style={{
            position: "absolute",
            bottom: isMobile ? "30px" : "40px",
            right: isMobile ? "24px" : "60px",
          }}>
            <p style={{
              fontFamily: "var(--font-antonio)",
              fontSize: isMobile ? "0.8rem" : "1.1rem",
              letterSpacing: "0.06em",
              color: "rgba(247,247,245,0.25)",
              textAlign: "right",
              lineHeight: 1.3,
              fontStyle: "italic",
            }}>
              Good Trips.<br />Bigger Memories.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .ps-services-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Shared input styles (defined outside component to avoid re-creation) ── */
const inputSt: React.CSSProperties = {
  width: "100%",
  background: "#0d1117",
  border: "1px solid #1e2d40",
  borderRadius: "8px",
  padding: "13px 16px",
  color: "#F7F7F5",
  fontFamily: "var(--font-geist)",
  fontSize: "0.88rem",
  outline: "none",
  transition: "border-color 0.18s",
  boxSizing: "border-box",
};

const labelSt: React.CSSProperties = {
  fontFamily: "var(--font-antonio)",
  fontSize: "0.56rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#4a6080",
  display: "block",
  marginBottom: "7px",
};
