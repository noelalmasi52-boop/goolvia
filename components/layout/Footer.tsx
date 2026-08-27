"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://formsubmit.co/ajax/noelalmasi52@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: "Nový odber noviniek", Email: email }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <footer style={{ background: "#050810", borderTop: "1px solid #1a2840" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 40px 40px" }}>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "48px", marginBottom: "48px" }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.4em", color: "#e8b84b", textTransform: "uppercase", marginBottom: "12px" }}>
              GOOLVIA
            </div>
            <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.75rem", color: "#3a4a62", lineHeight: 1.7, maxWidth: "220px" }}>
              Futbalové výlety za najlepšiu cenu. Let, hotel, vstupenka — všetko na jednom mieste.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <a href="https://www.instagram.com/goolviaztn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{
                width: "38px", height: "38px", borderRadius: "50%", border: "1px solid #1a2840",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e8b84b55"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1a2840"; }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#6080a8"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/421903118569" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{
                width: "38px", height: "38px", borderRadius: "50%", border: "1px solid #1a2840",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#25D36655"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1a2840"; }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#6080a8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#3a4a62", textTransform: "uppercase", marginBottom: "16px" }}>Navigácia</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Ponuky", href: "/#zapasy" },
                { label: "Prémiová služba", href: "/#ako-to-funguje" },
                { label: "Kontakt", href: "/kontakt" },
                { label: "O nás", href: "/o-nas" },
                { label: "Ochrana súkromia", href: "/privacy" },
              ].map(({ label, href }) => (
                <Link key={label} href={href} style={{ fontFamily: "var(--font-geist)", fontSize: "0.78rem", color: "#4a6080", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#e8b84b"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4a6080"; }}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div style={{ fontFamily: "var(--font-antonio)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#3a4a62", textTransform: "uppercase", marginBottom: "16px" }}>Nové zápasy</div>
            <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.75rem", color: "#3a4a62", lineHeight: 1.65, marginBottom: "14px" }}>
              Daj nám email — upozorníme ťa keď pridáme nové zápasy.
            </p>
            {sent ? (
              <p style={{ fontFamily: "var(--font-antonio)", fontSize: "0.72rem", color: "#16a34a", letterSpacing: "0.08em" }}>✓ Zaradený do zoznamu</p>
            ) : (
              <form onSubmit={handleNewsletter} style={{ display: "flex", gap: "6px" }}>
                <input
                  required type="email" placeholder="tvoj@email.sk" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1, background: "#0f1828", border: "1px solid #243452",
                    borderRadius: "6px", padding: "10px 12px", color: "#eef0f6",
                    fontFamily: "var(--font-geist)", fontSize: "0.78rem", outline: "none",
                    minWidth: 0,
                  }}
                />
                <button type="submit" disabled={sending} style={{
                  fontFamily: "var(--font-antonio)", fontSize: "0.62rem", letterSpacing: "0.12em",
                  padding: "10px 14px", background: "#e8b84b", color: "#080b12",
                  border: "none", borderRadius: "6px", cursor: sending ? "not-allowed" : "pointer",
                  fontWeight: 700, flexShrink: 0,
                }}>
                  {sending ? "…" : "OK"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid #1a2840", paddingTop: "24px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#2e4060", margin: 0 }}>
            © 2026 Goolvia. Všetky práva vyhradené.
          </p>
          <p style={{ fontFamily: "var(--font-geist)", fontSize: "0.68rem", color: "#2e4060", margin: 0 }}>
            Partnerské links: Kiwi.com · Booking.com · AXA Assistance · Viagogo
          </p>
        </div>
      </div>
    </footer>
  );
}
