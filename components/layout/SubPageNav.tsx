"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileNavMenu from "./MobileNavMenu";

const LINKS = [
  { label: "O nás", href: "/o-nas" },
  { label: "Ponuky", href: "/#zapasy" },
  { label: "Prémiová služba", href: "/#ako-to-funguje" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function SubPageNav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "1rem 1.2rem" : "1.4rem 3rem",
      background: "#080b12",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
        {isMobile && <MobileNavMenu links={LINKS} activeHref={pathname} />}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-antonio)", fontSize: "1.05rem",
            fontWeight: 700, letterSpacing: "0.45em",
            color: "var(--goolvia-gold)", textTransform: "uppercase",
          }}>
            GOOLVIA
          </span>
        </Link>
      </div>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: "2.4rem" }}>
          {LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link key={label} href={href} style={{
                fontFamily: "var(--font-antonio)", fontSize: "0.7rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                textDecoration: "none",
                color: isActive ? "var(--goolvia-gold)" : "rgba(255,255,255,0.45)",
                borderBottom: isActive ? "1px solid var(--goolvia-gold)" : "1px solid transparent",
                paddingBottom: "3px",
                transition: "color 0.2s",
              }}>
                {label}
              </Link>
            );
          })}
        </div>
      )}

      <Link href="/#zapasy" style={{
        fontFamily: "var(--font-antonio)", fontSize: isMobile ? "0.6rem" : "0.68rem",
        letterSpacing: "0.18em", textTransform: "uppercase",
        textDecoration: "none", color: "var(--goolvia-gold)",
        border: "1px solid var(--goolvia-gold)",
        padding: isMobile ? "0.5rem 1rem" : "0.6rem 1.4rem",
        whiteSpace: "nowrap",
        transition: "background 0.2s, color 0.2s",
      }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "var(--goolvia-gold)";
          el.style.color = "#050608";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "transparent";
          el.style.color = "var(--goolvia-gold)";
        }}
      >
        Zápasy
      </Link>
    </nav>
  );
}
