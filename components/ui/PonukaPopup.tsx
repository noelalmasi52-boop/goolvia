"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PonukaPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("ponuka_popup_dismissed") === "1") {
        setDismissed(true);
        return;
      }
    } catch {}

    const timer = setTimeout(() => setVisible(true), 5000);
    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    try { localStorage.setItem("ponuka_popup_dismissed", "1"); } catch {}
  }

  if (dismissed || !visible) return null;

  return (
    <div
      style={{
        position: "fixed", bottom: "24px", right: "24px", zIndex: 900,
        maxWidth: "320px", width: "calc(100vw - 48px)",
        background: "#0f1828",
        border: "1px solid #e8b84b44",
        borderRadius: "14px",
        boxShadow: "0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px #e8b84b11",
        padding: "20px 20px 18px",
        animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <button
        onClick={dismiss}
        style={{
          position: "absolute", top: "12px", right: "12px",
          background: "transparent", border: "none", cursor: "pointer",
          color: "#3a4a62", fontSize: "0.9rem", lineHeight: 1,
          padding: "2px 6px",
        }}
      >✕</button>

      <div style={{
        fontFamily: "var(--font-antonio)", fontSize: "0.55rem",
        letterSpacing: "0.22em", color: "#e8b84b",
        textTransform: "uppercase", marginBottom: "8px",
      }}>
        Prémiová služba
      </div>

      <div style={{
        fontFamily: "var(--font-antonio)", fontSize: "1.1rem",
        fontWeight: 700, color: "#eef0f6", lineHeight: 1.15,
        textTransform: "uppercase", marginBottom: "8px",
      }}>
        Zariadime ti to<br />
        <span style={{ color: "#e8b84b" }}>za teba</span>
      </div>

      <p style={{
        fontFamily: "var(--font-geist)", fontSize: "0.78rem",
        color: "#6080a8", lineHeight: 1.55, marginBottom: "16px",
      }}>
        Let, hotel aj vstupenky na jeden zápas — napíš nám kam chceš ísť a my ti pošleme konkrétnu ponuku do 24 hodín.
      </p>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Link
          href="/ponuka"
          style={{
            flex: 1,
            fontFamily: "var(--font-antonio)", fontSize: "0.68rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            textDecoration: "none", textAlign: "center",
            background: "#e8b84b", color: "#0c1220",
            borderRadius: "7px", padding: "10px 16px",
            fontWeight: 700, transition: "opacity 0.18s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          Chcem ponuku →
        </Link>
        <button
          onClick={dismiss}
          style={{
            fontFamily: "var(--font-antonio)", fontSize: "0.62rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            background: "transparent", border: "1px solid #243452",
            color: "#3a4a62", borderRadius: "7px",
            padding: "10px 12px", cursor: "pointer",
          }}
        >
          Nie
        </button>
      </div>
    </div>
  );
}
