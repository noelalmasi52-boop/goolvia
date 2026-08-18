"use client";

import SubPageNav from "@/components/layout/SubPageNav";

const VALUES = [
  {
    icon: "⚽",
    title: "Futbal je zážitok",
    desc: "Vieme, aký je rozdiel medzi sledovaním zápasu doma a byť priamo na štadióne. Goolvia existuje preto, aby si tento rozdiel mohol zažiť každý.",
  },
  {
    icon: "💶",
    title: "Férová cena",
    desc: "Porovnávame reálne ceny letov, hotelov a vstupeniek. Žiadne skryté poplatky, žiadne prehnané prirážky — len najlepšia dostupná ponuka.",
  },
  {
    icon: "🗺️",
    title: "Komplexný servis",
    desc: "Od prvého kliknutia až po návrat domov. Pre tých, ktorí chcú ísť na zápas bez starostí, zabezpečíme každý detail výletu.",
  },
  {
    icon: "🤝",
    title: "Dôvera",
    desc: "Spolupracujeme len s overenými partnermi — Kiwi.com, Booking.com, Viagogo. Každé odporúčanie stojí za našou reputáciou.",
  },
];

const STATS = [
  { value: "10+", label: "Zápasov v ponuke" },
  { value: "4", label: "Európske ligy" },
  { value: "100%", label: "Overení partneri" },
];

export default function ONasPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080b12" }}>
      <SubPageNav />

      {/* Hero */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 40px 60px" }}>
        <p style={{
          fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
          letterSpacing: "0.3em", color: "#e8b84b",
          textTransform: "uppercase", marginBottom: "14px",
        }}>
          O nás
        </p>
        <h1 style={{
          fontFamily: "var(--font-antonio)", fontWeight: 700,
          fontSize: "clamp(3rem, 7vw, 6rem)",
          lineHeight: 0.92, letterSpacing: "-0.02em",
          textTransform: "uppercase", color: "#eef0f6",
          marginBottom: "32px", maxWidth: "700px",
        }}>
          Futbal naživo.<br />
          <span style={{ color: "#e8b84b" }}>Pre každého.</span>
        </h1>
        <p style={{
          fontFamily: "var(--font-geist)", fontSize: "1rem",
          color: "#6080a8", lineHeight: 1.75, maxWidth: "560px",
        }}>
          Goolvia je platforma pre futbalových fanúšikov, ktorí chcú zažiť európske zápasy naživo — bez komplikácií a za najlepšiu cenu. Spájame lacné lety, hotely pri štadióne a vstupenky do jednej jednoduchej ponuky.
        </p>
      </div>

      {/* Stats */}
      <div style={{ borderTop: "1px solid #1a2740", borderBottom: "1px solid #1a2740", background: "#0c1220" }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 40px",
          display: "flex", flexWrap: "wrap",
        }}>
          {STATS.map(({ value, label }, i) => (
            <div key={label} style={{
              flex: "1 1 200px",
              padding: "40px 32px",
              borderRight: i < STATS.length - 1 ? "1px solid #1a2740" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-antonio)", fontWeight: 700,
                fontSize: "3.5rem", color: "#e8b84b", lineHeight: 1,
                marginBottom: "8px",
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: "var(--font-geist)", fontSize: "0.78rem",
                color: "#6080a8", textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px", alignItems: "start",
        }}
          className="story-grid"
        >
          <div>
            <h2 style={{
              fontFamily: "var(--font-antonio)", fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              textTransform: "uppercase", color: "#eef0f6",
              lineHeight: 1, marginBottom: "24px",
            }}>
              Prečo<br />
              <span style={{ color: "#e8b84b" }}>Goolvia?</span>
            </h2>
            <p style={{
              fontFamily: "var(--font-geist)", fontSize: "0.92rem",
              color: "#6080a8", lineHeight: 1.75, marginBottom: "20px",
            }}>
              Ísť na európsky futbalový zápas nie je jednoduché. Treba nájsť letenku, zarezervovať hotel v správnej lokácii, zohnať vstupenku — a to všetko v správnom čase a za rozumnú cenu.
            </p>
            <p style={{
              fontFamily: "var(--font-geist)", fontSize: "0.92rem",
              color: "#6080a8", lineHeight: 1.75,
            }}>
              Goolvia to robí za teba. Vyber zápas, pozri si konkrétne ceny a klikni. Žiadne hodiny googlovania, žiadne porovnávanie desiatok stránok.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: "#0f1828",
                border: "1px solid #1a2740",
                borderRadius: "12px", padding: "22px 24px",
                display: "flex", gap: "18px", alignItems: "flex-start",
              }}>
                <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: "2px" }}>{icon}</span>
                <div>
                  <div style={{
                    fontFamily: "var(--font-antonio)", fontWeight: 700,
                    fontSize: "0.9rem", color: "#eef0f6",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    marginBottom: "6px",
                  }}>
                    {title}
                  </div>
                  <p style={{
                    fontFamily: "var(--font-geist)", fontSize: "0.78rem",
                    color: "#4a6080", lineHeight: 1.65,
                  }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        borderTop: "1px solid #1a2740", background: "#0c1220",
        padding: "80px 40px", textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "var(--font-antonio)", fontWeight: 700,
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          textTransform: "uppercase", color: "#eef0f6",
          lineHeight: 1, marginBottom: "24px",
        }}>
          Pripravený na<br />
          <span style={{ color: "#e8b84b" }}>prvý zápas?</span>
        </h2>
        <a href="/#zapasy" style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          fontFamily: "var(--font-antonio)", fontSize: "0.75rem",
          fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase",
          textDecoration: "none", color: "#050608",
          background: "#e8b84b", padding: "16px 36px",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          Pozrieť zápasy →
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
