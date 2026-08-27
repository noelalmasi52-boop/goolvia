"use client";

import { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { MATCHES } from "./data";
export type { Hotel, Match } from "./data";
export { buildKiwiUrl, buildTicketUrl } from "./data";

const LEAGUES = ["ALL", "PREMIER LEAGUE", "LA LIGA", "SERIE A", "BUNDESLIGA", "LIGUE 1"];

const FEATURES = [
  { color: "#7C3AED", icon: "🗺️", title: "Kompletný itinerár", desc: "Minútu po minúte plán celého výletu — od odchodu z domu až po návrat." },
  { color: "#DC2626", icon: "🚗", title: "Transfer zabezpečený", desc: "Uber alebo taxi z letiska priamo k hotelu, aj späť. Žiadne čakanie, žiadny stres." },
  { color: "#16A34A", icon: "✅", title: "Check-in a doklady", desc: "Online check-in na let, potvrdenia a všetky doklady prichystané vopred na telefón." },
  { color: "#2563EB", icon: "📞", title: "Podpora 24/7", desc: "Počas celého výletu sme k dispozícii — stačí zavolať a postaráme sa o zvyšok." },
  { color: "#D97706", icon: "🏨", title: "Výber hotela", desc: "Vyberieme ti najlepší hotel pri štadióne v danej cenovej kategórii a zarezervujeme." },
  { color: "#7C3AED", icon: "🎟️", title: "Vstupenky", desc: "Pomôžeme nájsť a zaobstarať vstupenky — v tribúne, na sektore, kde chceš sedieť." },
  { color: "#059669", icon: "🛡️", title: "Poistenie", desc: "Vybavíme aj cestovné poistenie so 50% zľavou — krytie úrazu, storna aj batožiny počas celého výletu." },
];

const MATCH_OPTIONS = MATCHES.map((m) => `${m.home} vs ${m.away} – ${m.date}`);

export default function MatchesSection() {
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({ meno: "", email: "", telefon: "", zapas: "", osoby: "1" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  function toggleLeague(league: string) {
    setSelectedLeagues(prev =>
      prev.includes(league) ? prev.filter(l => l !== league) : [...prev, league]
    );
  }

  const filtered = MATCHES
    .filter(m => selectedLeagues.length === 0 || selectedLeagues.includes(m.league))
    .slice()
    .sort((a, b) => {
      if (sortBy === "price") {
        const cheapA = Math.min(...a.hotels.map(h => h.pricePerNight));
        const cheapB = Math.min(...b.hotels.map(h => h.pricePerNight));
        return (a.ticketFrom + cheapA * 2 + a.flightFrom) - (b.ticketFrom + cheapB * 2 + b.flightFrom);
      }
      return new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime();
    });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://formsubmit.co/ajax/noelalmasi52@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nová ponuka – ${form.zapas || "dopyt"}`,
          Meno: form.meno,
          Email: form.email,
          Telefón: form.telefon,
          Zápas: form.zapas,
          "Počet osôb": form.osoby,
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#0f1828", border: "1px solid #243452",
    borderRadius: "8px", padding: "13px 16px", color: "#eef0f6",
    fontFamily: "var(--font-geist)", fontSize: "0.88rem", outline: "none",
    transition: "border-color 0.18s", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-antonio)", fontSize: "0.58rem", letterSpacing: "0.18em",
    textTransform: "uppercase", color: "#4a6080", display: "block", marginBottom: "7px",
  };

  return (
    <section id="zapasy" style={{ background: "#0c1220", position: "relative", zIndex: 4 }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e8b84b33, transparent)" }} />

      {/* ── Match grid ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "60px 20px 0" : "100px 40px 0" }}>
        <div style={{ marginBottom: "56px", maxWidth: "640px" }}>
          <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.3em", color: "#e8b84b", textTransform: "uppercase", marginBottom: "16px" }}>
            Najlepšie ponuky tejto sezóny
          </p>
          <h2 style={{ fontFamily: "var(--font-antonio)", fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 700, color: "#eef0f6", lineHeight: 0.94, letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: "20px" }}>
            Najlacnejšie<br /><span style={{ color: "#e8b84b" }}>miesta</span> v Európe.
          </h2>
          <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.95rem", color: "#6080a8", lineHeight: 1.7 }}>
            Vyber zápas — uvidíš konkrétne hotely, lety aj vstupenky s najlepšími cenami. Všetko na jednom mieste.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "40px" }}>
          {/* League checkboxes */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", flex: 1 }}>
            {LEAGUES.filter(l => l !== "ALL").map((league) => {
              const on = selectedLeagues.includes(league);
              return (
                <button key={league} onClick={() => toggleLeague(league)} style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.18em",
                  padding: "8px 16px", display: "flex", alignItems: "center", gap: "7px",
                  background: on ? "#e8b84b14" : "transparent",
                  color: on ? "#e8b84b" : "#4a6080",
                  border: `1px solid ${on ? "#e8b84b66" : "#243452"}`,
                  borderRadius: "6px", cursor: "pointer", transition: "all 0.15s ease", textTransform: "uppercase",
                }}>
                  <span style={{
                    width: "13px", height: "13px", borderRadius: "3px", flexShrink: 0,
                    border: `1.5px solid ${on ? "#e8b84b" : "#3a4a62"}`,
                    background: on ? "#e8b84b" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {on && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#0c1220" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </span>
                  {league}
                </button>
              );
            })}
            {selectedLeagues.length > 0 && (
              <button onClick={() => setSelectedLeagues([])} style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.12em",
                padding: "8px 14px", background: "transparent", color: "#4a6080",
                border: "1px solid #1a2840", borderRadius: "6px", cursor: "pointer",
              }}>
                Zrušiť filter ×
              </button>
            )}
          </div>

          {/* Sort */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.6rem", letterSpacing: "0.18em", color: "#3a4a62", textTransform: "uppercase" }}>Zoradiť:</span>
            {(["date", "price"] as const).map((opt) => (
              <button key={opt} onClick={() => setSortBy(opt)} style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.12em",
                padding: "8px 14px", borderRadius: "6px", cursor: "pointer", textTransform: "uppercase",
                background: sortBy === opt ? "#e8b84b14" : "transparent",
                color: sortBy === opt ? "#e8b84b" : "#4a6080",
                border: `1px solid ${sortBy === opt ? "#e8b84b66" : "#243452"}`,
                transition: "all 0.15s",
              }}>
                {opt === "date" ? "📅 Dátum" : "💰 Cena"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))", gap: "12px" }}>
          {filtered.map((match, i) => (
            <MatchCard key={`${match.home}-${match.away}-${i}`} match={match} />
          ))}
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "60px 20px 0" : "100px 40px 0" }}>
        <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.3em", color: "#e8b84b", textTransform: "uppercase", marginBottom: "14px", textAlign: "center" }}>
          Čo hovoria cestujúci
        </p>
        <h2 style={{ fontFamily: "var(--font-antonio)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", textTransform: "uppercase", color: "#eef0f6", textAlign: "center", lineHeight: 1, marginBottom: "48px" }}>
          Skutočné skúsenosti
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "12px" }}>
          {[
            { name: "Martin K.", city: "Bratislava", match: "Bayern vs Stuttgart", text: "Celý výlet do Mníchova som mal vybavený za hodinu. Let, hotel pri štadióne aj vstupenku. Do 120 € celkovo — sám by som to nikdy nedal.", stars: 5 },
            { name: "Lucia T.", city: "Košice", match: "Barcelona vs Athletic", text: "Konečne som bola na Camp Nou. Goolvia mi zistila najlacnejší let a hotel hneď vedľa štadióna. Nič som nemusela riešiť sama.", stars: 5 },
            { name: "Tomáš M.", city: "Žilina", match: "Dortmund vs Hamburg", text: "Išli sme dvaja na Signal Iduna Park. Ušetrili sme asi 80 € oproti tomu, čo sme našli sami. A poistenie bolo v pohode — 50% zľava.", stars: 5 },
          ].map(({ name, city, match, text, stars }) => (
            <div key={name} style={{ background: "#0f1828", border: "1px solid #1a2840", borderRadius: "14px", padding: "28px 24px" }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                {Array.from({ length: stars }).map((_, i) => (
                  <span key={i} style={{ color: "#e8b84b", fontSize: "0.85rem" }}>★</span>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.82rem", color: "#7090b8", lineHeight: 1.75, marginBottom: "20px" }}>
                &ldquo;{text}&rdquo;
              </p>
              <div style={{ borderTop: "1px solid #1a2840", paddingTop: "16px" }}>
                <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.75rem", color: "#eef0f6", textTransform: "uppercase", letterSpacing: "0.05em" }}>{name}</div>
                <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.65rem", color: "#3a4a62", marginTop: "3px" }}>{city} · {match}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Premium section ── */}
      <div id="ako-to-funguje" style={{ marginTop: isMobile ? "60px" : "120px", borderTop: "1px solid #1a2840", background: "#080b12" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "60px 20px" : "100px 40px" }}>

          {/* Top grid: left headline + right feature cards */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "48px" : "80px", alignItems: "start" }}>

            {/* LEFT */}
            <div>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid #e8b84b55", borderRadius: "6px", padding: "6px 14px", marginBottom: "28px" }}>
                <span style={{ fontSize: "0.75rem" }}>👑</span>
                <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.6rem", letterSpacing: "0.22em", color: "#e8b84b", textTransform: "uppercase" }}>Prémiová služba</span>
              </div>

              <h2 style={{ fontFamily: "var(--font-antonio)", fontSize: isMobile ? "clamp(2.4rem,12vw,3.8rem)" : "clamp(2.8rem,4vw,4.2rem)", fontWeight: 700, color: "#eef0f6", lineHeight: 0.95, textTransform: "uppercase", marginBottom: "24px" }}>
                Ty len prídeš.<br />
                <span style={{ color: "#e8b84b" }}>Zvysok</span><br />
                zariadime my.
              </h2>

              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.92rem", color: "#6080a8", lineHeight: 1.75, marginBottom: "36px", maxWidth: "460px" }}>
                Pre tých, ktorí chcú zažiť zápas bez starostí — postaráme sa o každý detail tvojho výletu. Od vstupeniek a hotela až po transfer a check-in. Dostupní kedykoľvek, po celý čas.
              </p>

              <a
                href="#ponuka-form"
                onClick={(e) => { e.preventDefault(); document.getElementById("ponuka-form")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-antonio)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", color: "#0c1220", background: "#e8b84b", padding: "14px 28px", borderRadius: "8px", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Mám záujem →
              </a>

              {/* Prečo s nami */}
              <div style={{ marginTop: "48px", borderTop: "1px solid #1a2840", paddingTop: "32px" }}>
                <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.6rem", letterSpacing: "0.22em", color: "#4a6080", textTransform: "uppercase", marginBottom: "20px" }}>Prečo s nami?</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 24px" }}>
                  {[
                    { icon: "🔒", title: "Bezpečne", desc: "Overení partneri a spoľahlivý servis" },
                    { icon: "⚡", title: "Rýchlo", desc: "Vybavíme všetko za teba" },
                    { icon: "📞", title: "Podpora 24/7", desc: "Sme tu pred, počas aj po výlete" },
                    { icon: "✨", title: "Na mieru", desc: "Každý výlet prispôsobíme tebe" },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "1rem", marginTop: "1px", flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.75rem", color: "#eef0f6", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>{title}</div>
                        <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#4a6080", lineHeight: 1.5 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {FEATURES.map(({ color, icon, title, desc }) => (
                <div key={title} style={{ background: "#0f1828", border: "1px solid #1a2840", borderRadius: "12px", padding: "22px 18px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: color + "22", border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: "14px" }}>
                    {icon}
                  </div>
                  <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.78rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                    {title}
                  </div>
                  <div style={{ width: "24px", height: "2px", background: color, marginBottom: "10px", borderRadius: "2px" }} />
                  <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.7rem", color: "#4a6080", lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div style={{ marginTop: isMobile ? "48px" : "64px", borderTop: "1px solid #1a2840", paddingTop: isMobile ? "36px" : "48px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { icon: "🛡️", title: "Bez starostí", desc: "Všetko vybavíme za teba" },
              { icon: "🌍", title: "50+ Destinácií", desc: "Po celej Európe" },
              { icon: "🤝", title: "Fair & Transparentne", desc: "Férové ceny, žiadne skryté poplatky" },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: "#131d2e", border: "1px solid #1e3050", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.9rem", color: "#e8b84b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</div>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.72rem", color: "#4a6080" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inquiry form ── */}
      <div id="ponuka-form" style={{ background: "#0c1220", borderTop: "1px solid #1a2840" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: isMobile ? "60px 20px 80px" : "80px 40px 100px" }}>

          <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.3em", color: "#e8b84b", textTransform: "uppercase", marginBottom: "14px" }}>
            Prémiová ponuka
          </p>
          <h2 style={{ fontFamily: "var(--font-antonio)", fontSize: isMobile ? "clamp(2rem,9vw,3rem)" : "clamp(2.4rem,4vw,3.6rem)", fontWeight: 700, color: "#eef0f6", lineHeight: 0.95, textTransform: "uppercase", marginBottom: "16px" }}>
            Pošleme vám<br /><span style={{ color: "#e8b84b" }}>ponuku</span> na mieru.
          </h2>
          <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.9rem", color: "#6080a8", lineHeight: 1.7, marginBottom: "40px" }}>
            Vyberte zápas, napíšte nám kontakt a do 24 hodín dostanete konkrétnu ponuku — letenky, hotel, vstupenky aj transfer.
          </p>

          {sent ? (
            <div style={{ background: "#0f1828", border: "1px solid #243452", borderRadius: "16px", padding: "48px 32px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>✅</div>
              <h3 style={{ fontFamily: "var(--font-antonio)", fontSize: "1.6rem", fontWeight: 700, textTransform: "uppercase", color: "#eef0f6", marginBottom: "12px" }}>Odoslané!</h3>
              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.88rem", color: "#6080a8", lineHeight: 1.7 }}>
                Ďakujeme! Ozveme sa vám do 24 hodín s kompletnou ponukou.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ background: "#0f1828", border: "1px solid #1a2840", borderRadius: "16px", padding: isMobile ? "28px 20px" : "40px", display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Zapas */}
                <div>
                  <label style={labelStyle}>Na aký zápas chcete ísť? *</label>
                  <select required name="zapas" value={form.zapas} onChange={(e) => setForm(p => ({ ...p, zapas: e.target.value }))}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                  >
                    <option value="" style={{ background: "#0f1828" }}>Vyber zápas…</option>
                    {MATCH_OPTIONS.map((m) => <option key={m} value={m} style={{ background: "#0f1828" }}>{m}</option>)}
                    <option value="Iný zápas" style={{ background: "#0f1828" }}>Iný zápas (napíš do správy)</option>
                  </select>
                </div>

                {/* Počet osôb */}
                <div>
                  <label style={labelStyle}>Počet osôb *</label>
                  <select required value={form.osoby} onChange={(e) => setForm(p => ({ ...p, osoby: e.target.value }))}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={String(n)} style={{ background: "#0f1828" }}>{n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osôb"}</option>
                    ))}
                  </select>
                </div>

                {/* Meno + Telefon */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Meno a priezvisko *</label>
                    <input required placeholder="Ján Novák" value={form.meno} onChange={(e) => setForm(p => ({ ...p, meno: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Telefón *</label>
                    <input required placeholder="+421 900 000 000" value={form.telefon} onChange={(e) => setForm(p => ({ ...p, telefon: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input required type="email" placeholder="jan@example.com" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                  />
                </div>

                {/* What's included */}
                <div style={{ background: "#080b12", border: "1px solid #1a2840", borderRadius: "10px", padding: "14px 18px", display: "flex", flexWrap: "wrap", gap: "10px 20px" }}>
                  {["✈️ Letenky", "🏨 Hotel", "🎟️ Vstupenky", "🛡️ Poistenie", "🚗 Transfer", "📋 Itinerár", "📞 Podpora 24/7"].map((item) => (
                    <span key={item} style={{ fontFamily: "var(--font-geist)", fontSize: "0.75rem", color: "#4a6080" }}>{item}</span>
                  ))}
                </div>

                <button type="submit" disabled={sending} style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  background: sending ? "#a07830" : "#e8b84b", color: "#0c1220", border: "none", borderRadius: "8px",
                  padding: "16px 32px", cursor: sending ? "not-allowed" : "pointer", fontWeight: 700, transition: "opacity 0.2s", alignSelf: "flex-start",
                }}>
                  {sending ? "Odosiela sa…" : "Odoslať dopyt →"}
                </button>

                <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#2e4060", lineHeight: 1.6, marginTop: "-8px" }}>
                  Odpovieme do 24 hodín. Bez záväzkov. Alebo nás kontaktuj priamo na{" "}
                  <a href="https://www.instagram.com/goolviaztn/" target="_blank" rel="noopener noreferrer" style={{ color: "#e8b84b", textDecoration: "none" }}>Instagrame</a>
                  {" "}alebo cez{" "}
                  <a href="https://wa.me/421903118569" target="_blank" rel="noopener noreferrer" style={{ color: "#e8b84b", textDecoration: "none" }}>WhatsApp</a>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

    </section>
  );
}
