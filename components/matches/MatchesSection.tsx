"use client";

import { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { MATCHES } from "./data";
export type { Hotel, Match } from "./data";
export { buildKiwiUrl, buildTicketUrl } from "./data";

const LEAGUES = ["ALL", "PREMIER LEAGUE", "LA LIGA", "SERIE A", "BUNDESLIGA", "LIGUE 1"];

const FEATURES = [
  { title: "Kompletný itinerár", desc: "Minútu po minúte plán celého výletu — od odchodu z domu až po návrat.", img: "/feat-plane.png", icon: "✈" },
  { title: "Transfer zabezpečený", desc: "Uber alebo taxi z letiska priamo k hotelu, aj späť. Žiadne čakanie, žiadny stres.", img: "/feat-transfer.png", icon: "🚐" },
  { title: "Check-in a doklady", desc: "Online check-in na let, potvrdenia a všetky doklady prichystané vopred na telefón.", img: "/feat-checkin.png", icon: "📋" },
  { title: "Výber hotela", desc: "Vyberieme ti najlepší hotel pri štadióne v danej cenovej kategórii a zarezervujeme.", img: "/feat-hotel.png", icon: "🏨" },
  { title: "Vstupenky", desc: "Pomôžeme nájsť a zaobstarať vstupenky — v tribúne, na sektore, kde chceš sedieť.", img: "/feat-stadium.png", icon: "🎟" },
  { title: "Podpora 24/7", desc: "Počas celého výletu sme k dispozícii — stačí zavolať a postaráme sa o zvyšok.", img: "/feat-support.png", icon: "🎧" },
];

const MATCH_OPTIONS = MATCHES.map((m) => `${m.home} vs ${m.away} – ${m.date}`);

type HeroFilter = { city: string; match: string; date: string } | null;

export default function MatchesSection({ heroFilter = null }: { heroFilter?: HeroFilter }) {
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [isMobile, setIsMobile] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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

  const isHeroActive = heroFilter && (heroFilter.city || heroFilter.match || heroFilter.date);

  const filtered = MATCHES
    .filter(m => {
      if (isHeroActive) {
        const cityOk  = !heroFilter!.city  || m.city === heroFilter!.city;
        const matchOk = !heroFilter!.match || `${m.home} vs ${m.away}` === heroFilter!.match;
        const dateOk  = !heroFilter!.date  || m.date === heroFilter!.date;
        return cityOk && matchOk && dateOk;
      }
      return selectedLeagues.length === 0 || selectedLeagues.includes(m.league);
    })
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
    width: "100%", background: "#F4F1EA", border: "1px solid #DDD7C8",
    borderRadius: "8px", padding: "13px 16px", color: "#1A1208",
    fontFamily: "var(--font-geist)", fontSize: "0.88rem", outline: "none",
    transition: "border-color 0.18s", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-antonio)", fontSize: "0.58rem", letterSpacing: "0.18em",
    textTransform: "uppercase", color: "#8C7A56", display: "block", marginBottom: "7px",
  };

  return (
    <section id="zapasy" style={{ background: "#F4F1EA", position: "relative", zIndex: 4 }}>

      {/* ── Match grid ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: isMobile ? "60px 20px 80px" : "100px 40px 80px" }}>
        <div style={{ marginBottom: "52px", maxWidth: "640px" }}>
          <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.32em", color: "#8C7A56", textTransform: "uppercase", marginBottom: "14px" }}>
            Najlepšie ponuky tejto sezóny
          </p>
          <h2 style={{ fontFamily: "var(--font-antonio)", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 4rem)", textTransform: "uppercase", color: "#1A1208", lineHeight: 0.94, letterSpacing: "-0.01em", marginBottom: "20px" }}>
            Najlacnejšie<br /><span style={{ color: "#D8B35A" }}>miesta</span> v Európe.
          </h2>
          <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.95rem", color: "#8C7A56", lineHeight: 1.7 }}>
            Vyber zápas — uvidíš konkrétne hotely, lety aj vstupenky s najlepšími cenami. Všetko na jednom mieste.
          </p>
        </div>

        {/* Hero filter banner */}
        {isHeroActive && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
            background: "#D8B35A14", border: "1px solid #D8B35A44", borderRadius: "8px",
            padding: "10px 16px", marginBottom: "20px",
          }}>
            <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8C5E1A" }}>
              Filter aktívny
              {heroFilter?.city ? ` · ${heroFilter.city}` : ""}
              {heroFilter?.match ? ` · ${heroFilter.match}` : ""}
              {heroFilter?.date ? ` · ${heroFilter.date}` : ""}
            </span>
          </div>
        )}

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
                  background: on ? "#D8B35A18" : "#fff",
                  color: on ? "#8C5E1A" : "#8C7A56",
                  border: `1px solid ${on ? "#D8B35A88" : "#DDD7C8"}`,
                  borderRadius: "6px", cursor: "pointer", transition: "all 0.15s ease", textTransform: "uppercase",
                }}>
                  <span style={{
                    width: "13px", height: "13px", borderRadius: "3px", flexShrink: 0,
                    border: `1.5px solid ${on ? "#D8B35A" : "#C0B090"}`,
                    background: on ? "#D8B35A" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {on && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </span>
                  {league}
                </button>
              );
            })}
            {selectedLeagues.length > 0 && (
              <button onClick={() => setSelectedLeagues([])} style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.12em",
                padding: "8px 14px", background: "#fff", color: "#9E8B68",
                border: "1px solid #DDD7C8", borderRadius: "6px", cursor: "pointer",
              }}>
                Zrušiť filter ×
              </button>
            )}
          </div>

          {/* Sort */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.6rem", letterSpacing: "0.18em", color: "#9E8B68", textTransform: "uppercase" }}>Zoradiť:</span>
            {(["date", "price"] as const).map((opt) => (
              <button key={opt} onClick={() => setSortBy(opt)} style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.12em",
                padding: "8px 14px", borderRadius: "6px", cursor: "pointer", textTransform: "uppercase",
                background: sortBy === opt ? "#D8B35A18" : "#fff",
                color: sortBy === opt ? "#8C5E1A" : "#8C7A56",
                border: `1px solid ${sortBy === opt ? "#D8B35A88" : "#DDD7C8"}`,
                transition: "all 0.15s",
              }}>
                {opt === "date" ? "Dátum" : "Cena"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
          {filtered.map((match, i) => (
            <MatchCard key={`${match.home}-${match.away}-${i}`} match={match} />
          ))}
        </div>
      </div>

      {/* ── Premium section ── */}
      <div id="ako-to-funguje" style={{ background: "#0d0f12", position: "relative", overflow: "hidden" }}>

        {/* Decorative stadium bg — far right */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "30%",
          backgroundImage: "url(/stadium.avif)",
          backgroundSize: "cover", backgroundPosition: "center left",
          opacity: 0.08, pointerEvents: "none",
        }} />

        {/* Main hero split */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "64px 24px 0" : "90px 60px 0", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.35fr", gap: isMobile ? "48px" : "70px", alignItems: "center" }}>

            {/* LEFT */}
            <div>
              {/* Overline */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span style={{ display: "inline-block", width: "28px", height: "1px", background: "#D8B35A", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-antonio)", fontSize: "0.56rem", letterSpacing: "0.3em", color: "#D8B35A", textTransform: "uppercase" }}>Plánuješ výlet na zápas?</span>
              </div>

              {/* Big headline */}
              <h2 style={{ fontFamily: "var(--font-antonio)", fontSize: isMobile ? "clamp(2.8rem,14vw,4.8rem)" : "clamp(3.6rem,5.5vw,6.2rem)", fontWeight: 700, color: "#eef0f6", lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "20px" }}>
                Máme aj<br />
                <span style={{ color: "#D8B35A" }}>prémiovú</span><br />
                službu.
              </h2>

              {/* Sub-headline */}
              <p style={{ fontFamily: "var(--font-antonio)", fontSize: isMobile ? "1rem" : "1.15rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.35, marginBottom: "20px" }}>
                Ty len prídeš. Zvyšok zariadime my.
              </p>

              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.9rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.75, marginBottom: "36px", maxWidth: "400px" }}>
                Postaráme sa o každý detail — od vstupeniek a hotela až po transfer a check-in. Dostupní kedykoľvek, po celý čas.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
                <a
                  href="#ponuka-form"
                  onClick={(e) => { e.preventDefault(); document.getElementById("ponuka-form")?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-antonio)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", color: "#0d0f12", background: "#D8B35A", padding: "14px 28px", borderRadius: "4px", transition: "opacity 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  Mám záujem →
                </a>
                <a
                  href="/premiova-sluzba"
                  style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", color: "rgba(255,255,255,0.55)", transition: "color 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.25)" }}>▶</span>
                  Ako to funguje?
                </a>
              </div>
            </div>

            {/* RIGHT — 2×3 feature card grid with photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "10px" : "12px" }}>
              {FEATURES.map(({ title, desc, img, icon }) => (
                <div key={title} style={{
                  background: "#161a20",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                  {/* Photo */}
                  <div style={{ position: "relative", height: isMobile ? "80px" : "110px", overflow: "hidden", flexShrink: 0 }}>
                    <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,15,18,0) 30%, rgba(13,15,18,0.7) 100%)" }} />
                  </div>
                  {/* Content */}
                  <div style={{ padding: isMobile ? "12px" : "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>{icon}</span>
                        <span style={{ fontFamily: "var(--font-antonio)", fontSize: isMobile ? "0.68rem" : "0.76rem", fontWeight: 700, color: "#eef0f6", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.2 }}>{title}</span>
                      </div>
                      <span style={{ color: "#D8B35A", fontSize: "0.7rem", flexShrink: 0, marginLeft: "4px", marginTop: "1px" }}>→</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-geist)", fontSize: isMobile ? "0.62rem" : "0.68rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.55, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits strip */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "48px 24px 0" : "56px 60px 0", position: "relative", zIndex: 1 }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: isMobile ? "36px" : "44px" }}>
            <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.52rem", letterSpacing: "0.26em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: isMobile ? "24px" : "28px" }}>Prečo s nami?</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? "20px" : "40px" }}>
              {[
                { icon: "🛡", title: "Bezpečné", desc: "Overení partneri a spoľahlivý servis" },
                { icon: "⚡", title: "Rýchlo", desc: "Vybavíme všetko za teba" },
                { icon: "📞", title: "Podpora 24/7", desc: "Sme tu pred, počas aj po výlete" },
                { icon: "💎", title: "Na mieru", desc: "Každý výlet prispôsobíme tebe" },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(216,179,90,0.1)", border: "1px solid rgba(216,179,90,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1rem" }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.72rem", color: "#eef0f6", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "3px" }}>{title}</div>
                    <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.66rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "40px 24px 56px" : "48px 60px 72px", position: "relative", zIndex: 1 }}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: isMobile ? "32px" : "40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "20px" : "40px" }}>
            {[
              { icon: "🏆", title: "Bez starostí", desc: "Ty si užiješ zápas, my riešime detaily." },
              { icon: "🌍", title: "500+ Destinácií", desc: "Top ligy a štadióny v celej Európe." },
              { icon: "💬", title: "Fair & Transparentne", desc: "Žiadne skryté poplatky, vždy vieš, za čo platíš." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.4rem", lineHeight: 1, marginTop: "2px" }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.78rem", color: "#D8B35A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontFamily: "var(--font-geist)", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inquiry form ── */}
      <div id="ponuka-form" style={{ background: "#F4F1EA", borderTop: "1px solid #DDD7C8" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: isMobile ? "60px 20px 80px" : "80px 40px 100px" }}>

          <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.68rem", letterSpacing: "0.32em", color: "#8C7A56", textTransform: "uppercase", marginBottom: "14px" }}>
            Prémiová ponuka
          </p>
          <h2 style={{ fontFamily: "var(--font-antonio)", fontSize: isMobile ? "clamp(2rem,9vw,3rem)" : "clamp(2.4rem,4vw,3.6rem)", fontWeight: 700, color: "#1A1208", lineHeight: 0.95, textTransform: "uppercase", marginBottom: "16px" }}>
            Pošleme vám<br /><span style={{ color: "#D8B35A" }}>ponuku</span> na mieru.
          </h2>
          <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.9rem", color: "#8C7A56", lineHeight: 1.7, marginBottom: "40px" }}>
            Vyberte zápas, napíšte nám kontakt a do 24 hodín dostanete konkrétnu ponuku — letenky, hotel, vstupenky aj transfer.
          </p>

          {sent ? (
            <div style={{ background: "#fff", border: "1px solid #EBE6DA", borderRadius: "16px", padding: "48px 32px", textAlign: "center" }}>
              <div style={{ width: "32px", height: "2px", background: "#16a34a", marginBottom: "20px" }} />
              <h3 style={{ fontFamily: "var(--font-antonio)", fontSize: "1.6rem", fontWeight: 700, textTransform: "uppercase", color: "#1A1208", marginBottom: "12px" }}>Odoslané!</h3>
              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.88rem", color: "#8C7A56", lineHeight: 1.7 }}>
                Ďakujeme! Ozveme sa vám do 24 hodín s kompletnou ponukou.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ background: "#fff", border: "1px solid #EBE6DA", borderRadius: "16px", padding: isMobile ? "28px 20px" : "40px", display: "flex", flexDirection: "column", gap: "20px" }}>

                <div>
                  <label style={labelStyle}>Na aký zápas chcete ísť? *</label>
                  <select required name="zapas" value={form.zapas} onChange={(e) => setForm(p => ({ ...p, zapas: e.target.value }))}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#DDD7C8"; }}
                  >
                    <option value="">Vyber zápas…</option>
                    {MATCH_OPTIONS.map((m) => <option key={m} value={m}>{m}</option>)}
                    <option value="Iný zápas">Iný zápas (napíš do správy)</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Počet osôb *</label>
                  <select required value={form.osoby} onChange={(e) => setForm(p => ({ ...p, osoby: e.target.value }))}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#DDD7C8"; }}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={String(n)}>{n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osôb"}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Meno a priezvisko *</label>
                    <input required placeholder="Ján Novák" value={form.meno} onChange={(e) => setForm(p => ({ ...p, meno: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#DDD7C8"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Telefón *</label>
                    <input required placeholder="+421 900 000 000" value={form.telefon} onChange={(e) => setForm(p => ({ ...p, telefon: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#DDD7C8"; }}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Email *</label>
                  <input required type="email" placeholder="jan@example.com" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#D8B35A88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#DDD7C8"; }}
                  />
                </div>

                <div style={{ background: "#F4F1EA", border: "1px solid #EBE6DA", borderRadius: "10px", padding: "14px 18px", display: "flex", flexWrap: "wrap", gap: "10px 20px" }}>
                  {["Letenky", "Hotel", "Vstupenky", "Poistenie", "Transfer", "Itinerár", "Podpora 24/7"].map((item) => (
                    <span key={item} style={{ fontFamily: "var(--font-antonio)", fontSize: "0.62rem", letterSpacing: "0.12em", color: "#9E8B68", textTransform: "uppercase" }}>{item}</span>
                  ))}
                </div>

                <button type="submit" disabled={sending} style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  background: sending ? "#C0B090" : "#D8B35A", color: "#1A1208", border: "none", borderRadius: "8px",
                  padding: "16px 32px", cursor: sending ? "not-allowed" : "pointer", fontWeight: 700, transition: "opacity 0.2s", alignSelf: "flex-start",
                }}>
                  {sending ? "Odosiela sa…" : "Odoslať dopyt →"}
                </button>

                <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#9E8B68", lineHeight: 1.6, marginTop: "-8px" }}>
                  Odpovieme do 24 hodín. Bez záväzkov. Alebo nás kontaktuj priamo na{" "}
                  <a href="https://www.instagram.com/goolviaztn/" target="_blank" rel="noopener noreferrer" style={{ color: "#D8B35A", textDecoration: "none" }}>Instagrame</a>
                  {" "}alebo cez{" "}
                  <a href="https://wa.me/421903118569" target="_blank" rel="noopener noreferrer" style={{ color: "#D8B35A", textDecoration: "none" }}>WhatsApp</a>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

    </section>
  );
}
