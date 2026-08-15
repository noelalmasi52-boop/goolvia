"use client";

import { useState } from "react";
import Link from "next/link";

const MATCHES = [
  "Espanyol vs Real Madrid – 29 AUG 2026",
  "Torino vs AC Milan – 12 SEP 2026",
  "Inter vs Monza – 19 SEP 2026",
  "Bayern vs Stuttgart – 05 SEP 2026",
  "Arsenal vs Coventry – 21 AUG 2026",
  "Hull City vs Man United – 22 AUG 2026",
  "Nottingham vs Leeds Utd – 22 AUG 2026",
  "Everton vs Crystal Palace – 22 AUG 2026",
  "Ipswich vs Sunderland – 22 AUG 2026",
  "Brentford vs Tottenham – 22 AUG 2026",
  "Iný zápas (napíš do správy)",
];

export default function PonukaPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    meno: "",
    email: "",
    telefon: "",
    zapas: "",
    pocet: "1",
    rozpocet: "",
    sprava: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `
Meno: ${form.meno}
Email: ${form.email}
Telefón: ${form.telefon}
Zápas: ${form.zapas}
Počet ľudí: ${form.pocet}
Rozpočet na osobu: ${form.rozpocet}
Správa: ${form.sprava}
    `.trim();

    window.location.href = `mailto:info@goolvia.com?subject=Prémiová ponuka – ${encodeURIComponent(form.zapas || "dopyt")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#131d2e",
    border: "1px solid #243452",
    borderRadius: "8px",
    padding: "13px 16px",
    color: "#eef0f6",
    fontFamily: "var(--font-geist)",
    fontSize: "0.88rem",
    outline: "none",
    transition: "border-color 0.18s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-antonio)",
    fontSize: "0.62rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#6080a8",
    display: "block",
    marginBottom: "7px",
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0c1220", color: "#eef0f6" }}>

      {/* Top nav */}
      <nav style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "28px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-antonio)", fontSize: "1.05rem",
          letterSpacing: "0.45em", color: "#e8b84b",
          textTransform: "uppercase", textDecoration: "none",
        }}>
          GOOLVIA
        </Link>
        <Link href="/" style={{
          fontFamily: "var(--font-antonio)", fontSize: "0.62rem",
          letterSpacing: "0.18em", color: "#6080a8",
          textTransform: "uppercase", textDecoration: "none",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          ← Späť na zápasy
        </Link>
      </nav>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e8b84b33, transparent)" }} />

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "72px 40px 100px" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <p style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.65rem",
            letterSpacing: "0.3em", color: "#e8b84b",
            textTransform: "uppercase", marginBottom: "14px",
          }}>
            Prémiová služba
          </p>
          <h1 style={{
            fontFamily: "var(--font-antonio)", fontSize: "clamp(2.4rem, 5vw, 4rem)",
            fontWeight: 700, lineHeight: 0.95,
            textTransform: "uppercase", marginBottom: "20px",
          }}>
            Ty len prídeš.<br />
            <span style={{ color: "#e8b84b" }}>Zvyšok</span> zariadime my.
          </h1>
          <p style={{
            fontFamily: "var(--font-geist)", fontSize: "0.92rem",
            color: "#6080a8", lineHeight: 1.7, maxWidth: "520px",
          }}>
            Vyplň formulár a my ti do 24 hodín pošleme konkrétnu ponuku — letenky, hotel, vstupenky aj transfer. Všetko na mieru, za najlepšiu cenu.
          </p>
        </div>

        {sent ? (
          /* Success state */
          <div style={{
            background: "#131d2e", border: "1px solid #243452",
            borderRadius: "16px", padding: "60px 40px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>✅</div>
            <h2 style={{
              fontFamily: "var(--font-antonio)", fontSize: "1.8rem",
              fontWeight: 700, textTransform: "uppercase", marginBottom: "12px",
            }}>
              Odoslané!
            </h2>
            <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.9rem", color: "#6080a8", lineHeight: 1.65, marginBottom: "32px" }}>
              Otvár sa tvoj emailový klient — skontroluj draft a odošli správu. Odpovieme do 24 hodín s kompletnou ponukou.
            </p>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              textDecoration: "none", color: "#0c1220",
              background: "#e8b84b", padding: "12px 24px", borderRadius: "8px",
            }}>
              Späť na zápasy
            </Link>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit}>
            <div style={{
              background: "#131d2e", border: "1px solid #243452",
              borderRadius: "16px", padding: "40px",
              display: "flex", flexDirection: "column", gap: "24px",
            }}>

              {/* Row: meno + email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Meno a priezvisko *</label>
                  <input
                    name="meno" required value={form.meno} onChange={handleChange}
                    placeholder="Ján Novák"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email" name="email" required value={form.email} onChange={handleChange}
                    placeholder="jan@example.com"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                  />
                </div>
              </div>

              {/* Row: telefon + pocet */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Telefón</label>
                  <input
                    name="telefon" value={form.telefon} onChange={handleChange}
                    placeholder="+421 900 000 000"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Počet ľudí *</label>
                  <select
                    name="pocet" required value={form.pocet} onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                      <option key={n} value={String(n)} style={{ background: "#131d2e" }}>{n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osôb"}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Zapas */}
              <div>
                <label style={labelStyle}>Aký zápas ťa zaujíma? *</label>
                <select
                  name="zapas" required value={form.zapas} onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                >
                  <option value="" style={{ background: "#131d2e" }}>Vyber zápas…</option>
                  {MATCHES.map((m) => (
                    <option key={m} value={m} style={{ background: "#131d2e" }}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Rozpocet */}
              <div>
                <label style={labelStyle}>Rozpočet na osobu (orientačne)</label>
                <select
                  name="rozpocet" value={form.rozpocet} onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                >
                  <option value="" style={{ background: "#131d2e" }}>Neviem / čo najmenej</option>
                  <option value="do 200€" style={{ background: "#131d2e" }}>do 200 €</option>
                  <option value="200–350€" style={{ background: "#131d2e" }}>200 – 350 €</option>
                  <option value="350–500€" style={{ background: "#131d2e" }}>350 – 500 €</option>
                  <option value="500€+" style={{ background: "#131d2e" }}>500 € a viac</option>
                </select>
              </div>

              {/* Sprava */}
              <div>
                <label style={labelStyle}>Správa / špeciálne požiadavky</label>
                <textarea
                  name="sprava" value={form.sprava} onChange={handleChange}
                  placeholder="Napr. chceme sedieť spolu v jednej tribúne, preferujeme 3* hotel, prídeme autom z Bratislavy…"
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
                  onFocus={(e) => { e.target.style.borderColor = "#e8b84b88"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#243452"; }}
                />
              </div>

              {/* What you get */}
              <div style={{
                background: "#0e1828", border: "1px solid #1e3050",
                borderRadius: "10px", padding: "18px 20px",
                display: "flex", flexWrap: "wrap", gap: "12px 24px",
              }}>
                {["✈️ Letenky", "🏨 Hotel", "🎟️ Vstupenky", "🚗 Transfer", "📋 Itinerár", "📞 Podpora 24/7"].map((item) => (
                  <span key={item} style={{
                    fontFamily: "var(--font-geist)", fontSize: "0.78rem", color: "#6080a8",
                  }}>{item}</span>
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.75rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  background: "#e8b84b", color: "#0c1220",
                  border: "none", borderRadius: "8px",
                  padding: "16px 32px", cursor: "pointer",
                  fontWeight: 700, transition: "opacity 0.2s",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Odoslať dopyt →
              </button>

              <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.7rem", color: "#3a5070", lineHeight: 1.6, marginTop: "-8px" }}>
                Po odoslaní sa otvorí tvoj emailový klient s predvyplnenou správou. Odpovieme do 24 hodín.
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
