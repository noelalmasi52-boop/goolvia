"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }
  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99998,
      background: "#080b12", borderTop: "1px solid #1a2840",
      padding: "16px 24px", display: "flex", alignItems: "center",
      flexWrap: "wrap", gap: "12px", justifyContent: "space-between",
    }}>
      <p style={{
        fontFamily: "var(--font-geist)", fontSize: "0.78rem",
        color: "#6080a8", lineHeight: 1.6, margin: 0, flex: 1, minWidth: "240px",
      }}>
        Táto stránka používa cookies na analytiku a zlepšenie zážitku.{" "}
        <a href="/privacy" style={{ color: "#e8b84b", textDecoration: "none" }}>Viac informácií</a>.
      </p>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button onClick={decline} style={{
          fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.15em",
          padding: "9px 18px", background: "transparent", color: "#4a6080",
          border: "1px solid #243452", borderRadius: "6px", cursor: "pointer",
        }}>
          Odmietnuť
        </button>
        <button onClick={accept} style={{
          fontFamily: "var(--font-antonio)", fontSize: "0.65rem", letterSpacing: "0.15em",
          padding: "9px 18px", background: "#e8b84b", color: "#080b12",
          border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 700,
        }}>
          Súhlasím
        </button>
      </div>
    </div>
  );
}
