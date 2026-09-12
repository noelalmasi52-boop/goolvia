"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MobileNavMenu from "./MobileNavMenu";

const LINKS = [
  { label: "O nás", href: "/o-nas" },
  { label: "Ponuky", href: "/#zapasy" },
  { label: "Vstupenky", href: "/vstupenky" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function SubPageNav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "1rem 1.2rem" : "1.2rem 3rem",
      background: "#F4F1EA",
      borderBottom: scrolled ? "1px solid #DDD7C8" : "1px solid transparent",
      transition: "border-color 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
        {isMobile && <MobileNavMenu links={LINKS} activeHref={pathname} />}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-antonio)", fontSize: "1.05rem",
            fontWeight: 700, letterSpacing: "0.45em",
            color: "#D8B35A", textTransform: "uppercase",
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
                color: isActive ? "#1A1208" : "#8C7A56",
                borderBottom: isActive ? "1px solid #D8B35A" : "1px solid transparent",
                paddingBottom: "3px",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1208"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? "#1A1208" : "#8C7A56"; }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}

      <Link href="/#zapasy" style={{
        fontFamily: "var(--font-antonio)", fontSize: isMobile ? "0.6rem" : "0.68rem",
        letterSpacing: "0.18em", textTransform: "uppercase",
        textDecoration: "none", color: "#D8B35A",
        border: "1px solid #D8B35A",
        padding: isMobile ? "0.5rem 1rem" : "0.6rem 1.4rem",
        whiteSpace: "nowrap",
        transition: "background 0.2s, color 0.2s",
      }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "#D8B35A";
          el.style.color = "#1A1208";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "transparent";
          el.style.color = "#D8B35A";
        }}
      >
        Zápasy
      </Link>
    </nav>
  );
}
