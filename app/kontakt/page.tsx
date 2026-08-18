"use client";

import SubPageNav from "@/components/layout/SubPageNav";

const CONTACTS = [
  {
    icon: "✉️",
    title: "Email",
    value: "goolviaztn@gmail.com",
    href: "mailto:goolviaztn@gmail.com",
    note: "Odpovieme do 24 hodín",
  },
  {
    icon: "🤝",
    title: "Spolupráca & partneri",
    value: "goolviaztn@gmail.com",
    href: "mailto:goolviaztn@gmail.com",
    note: "Affiliate, médiá, biznis ponuky",
  },
];

const FAQ = [
  {
    q: "Ako funguje Goolvia?",
    a: "Vyber zápas, pozri si ceny letov, hotelov a vstupeniek a klikni na odkaz. Presmerujeme ťa na overenú platformu, kde dokončíš nákup.",
  },
  {
    q: "Platíte extra za rezerváciu?",
    a: "Nie. Ceny, ktoré vidíš, sú priamo od partnerov — Kiwi.com, Booking.com a Viagogo. Goolvia ničo navyše neúčtuje.",
  },
  {
    q: "Kde môžem nájsť viac zápasov?",
    a: "Priebežne pridávame nové zápasy z európskych líg. Sleduj nás na sociálnych sieťach alebo sa vráť neskôr.",
  },
  {
    q: "Chcem prémiový servis — čo mám urobiť?",
    a: "Napíš nám na email. Postaráme sa o celý výlet — od vstupeniek po transfer na mieste.",
  },
];

export default function KontaktPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#080b12" }}>
      <SubPageNav />

      {/* Header */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 40px 60px" }}>
        <p style={{
          fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
          letterSpacing: "0.3em", color: "#e8b84b",
          textTransform: "uppercase", marginBottom: "14px",
        }}>
          Kontakt
        </p>
        <h1 style={{
          fontFamily: "var(--font-antonio)", fontWeight: 700,
          fontSize: "clamp(3rem, 7vw, 6rem)",
          lineHeight: 0.92, letterSpacing: "-0.02em",
          textTransform: "uppercase", color: "#eef0f6",
          marginBottom: "20px",
        }}>
          Píš nám.<br />
          <span style={{ color: "#e8b84b" }}>Odíšeme hneď.</span>
        </h1>
        <p style={{
          fontFamily: "var(--font-geist)", fontSize: "0.95rem",
          color: "#6080a8", lineHeight: 1.65, maxWidth: "480px",
        }}>
          Otázka, spolupráca alebo prémiový servis — sme tu pre teba.
        </p>
      </div>

      {/* Contact cards */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px", marginBottom: "80px",
        }}>
          {CONTACTS.map(({ icon, title, value, href, note }) => (
            <a key={title} href={href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "#0f1828", border: "1px solid #1a2740",
                  borderRadius: "14px", padding: "32px 28px",
                  transition: "border-color 0.2s, transform 0.18s",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#e8b84b55";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#1a2740";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "16px" }}>{icon}</div>
                <div style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.65rem",
                  letterSpacing: "0.25em", color: "#4a6080",
                  textTransform: "uppercase", marginBottom: "8px",
                }}>
                  {title}
                </div>
                <div style={{
                  fontFamily: "var(--font-antonio)", fontWeight: 700,
                  fontSize: "1.05rem", color: "#e8b84b",
                  marginBottom: "8px", wordBreak: "break-all",
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: "var(--font-geist)", fontSize: "0.72rem",
                  color: "#2e4060",
                }}>
                  {note}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e8b84b22, transparent)", marginBottom: "80px" }} />

        {/* FAQ */}
        <div style={{ maxWidth: "720px" }}>
          <p style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
            letterSpacing: "0.3em", color: "#e8b84b",
            textTransform: "uppercase", marginBottom: "14px",
          }}>
            Časté otázky
          </p>
          <h2 style={{
            fontFamily: "var(--font-antonio)", fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            textTransform: "uppercase", color: "#eef0f6",
            lineHeight: 1, marginBottom: "40px",
          }}>
            Máš otázku?
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {FAQ.map(({ q, a }) => (
              <div key={q} style={{
                background: "#0f1828", border: "1px solid #1a2740",
                borderRadius: "10px", padding: "24px 28px",
              }}>
                <div style={{
                  fontFamily: "var(--font-antonio)", fontWeight: 700,
                  fontSize: "0.95rem", color: "#eef0f6",
                  textTransform: "uppercase", letterSpacing: "0.03em",
                  marginBottom: "10px",
                }}>
                  {q}
                </div>
                <p style={{
                  fontFamily: "var(--font-geist)", fontSize: "0.82rem",
                  color: "#4a6080", lineHeight: 1.7,
                }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ paddingBottom: "100px" }} />
      </div>
    </div>
  );
}
