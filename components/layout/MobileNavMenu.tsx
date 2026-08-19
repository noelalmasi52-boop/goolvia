"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type NavLink = { label: string; href: string };

export default function MobileNavMenu({
  links,
  activeHref,
}: {
  links: NavLink[];
  activeHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Otvoriť menu"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "5px",
          width: "28px",
          height: "28px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          pointerEvents: "auto",
          flexShrink: 0,
        }}
      >
        <span style={{ display: "block", width: "22px", height: "2px", background: "var(--goolvia-gold)" }} />
        <span style={{ display: "block", width: "22px", height: "2px", background: "var(--goolvia-gold)" }} />
        <span style={{ display: "block", width: "22px", height: "2px", background: "var(--goolvia-gold)" }} />
      </button>

      {mounted && open && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#080b12",
            display: "flex",
            flexDirection: "column",
            pointerEvents: "auto",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1rem 1.2rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}>
            <span style={{
              fontFamily: "var(--font-antonio)", fontSize: "1.05rem",
              fontWeight: 700, letterSpacing: "0.45em",
              color: "var(--goolvia-gold)", textTransform: "uppercase",
            }}>
              GOOLVIA
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Zavrieť menu"
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: "#eef0f6", fontSize: "1.8rem", lineHeight: 1, padding: "4px 10px",
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "flex-start",
            padding: "0 2rem", gap: "1.8rem",
          }}>
            {links.map(({ label, href }) => {
              const isActive = activeHref === href;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-antonio)", fontWeight: 700,
                    fontSize: "2.1rem", textTransform: "uppercase",
                    textDecoration: "none", letterSpacing: "0.02em",
                    color: isActive ? "var(--goolvia-gold)" : "#eef0f6",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
