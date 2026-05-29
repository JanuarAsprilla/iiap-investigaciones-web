"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sections = [
  { href: "/planeacion",    label: "Planeación" },
  { href: "/centros",       label: "Centros" },
  { href: "/componentes",   label: "Componentes" },
  { href: "/grupos",        label: "Grupos" },
  { href: "/actualidades",  label: "Actualidades" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const isHome = pathname === "/";
  const currentSection = sections.find((s) => pathname.startsWith(s.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* Lock scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop  { display: none !important; }
          .nav-burger   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-desktop  { display: flex; }
          .nav-burger   { display: none; }
        }
        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      <header
        role="banner"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled || menuOpen ? "rgba(244,241,235,0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px) saturate(1.4)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(26,92,58,.12)" : "none",
          /* Emil: 400ms nav bg lag is perceptible on scroll — 220ms feels part of the gesture */
          transition: "background 0.22s ease-out, border-color 0.22s ease-out, backdrop-filter 0.22s ease-out",
        }}
      >
        <nav
          aria-label="Navegación principal"
          style={{
            maxWidth: "1400px", margin: "0 auto",
            padding: "0 clamp(1.25rem, 4vw, 3rem)",
            height: "60px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* ── Brand ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <Link
              href="/"
              aria-label="Inicio — IIAP Investigaciones"
              style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: ".10em", color: "var(--forest)" }}>
                IIAP
              </span>
              <span style={{ color: "rgba(26,92,58,.25)", fontSize: "1.1rem", fontWeight: 200, lineHeight: 1 }}>│</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                INVESTIGACIONES
              </span>
            </Link>

            {/* Breadcrumb */}
            {currentSection && (
              <>
                <span style={{ color: "rgba(26,92,58,.25)", fontSize: "var(--t-xs)", margin: "0 .75rem", fontFamily: "var(--font-ui)" }}>
                  /
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--forest)" }}>
                  {currentSection.label}
                </span>
              </>
            )}
          </div>

          {/* ── Desktop nav links ── */}
          {!isHome && (
            <ul
              className="nav-desktop"
              role="list"
              style={{ gap: ".25rem", listStyle: "none", margin: 0, padding: 0 }}
            >
              {sections.map((s) => {
                const isActive = pathname.startsWith(s.href);
                return (
                  <li key={s.href}>
                    <Link href={s.href} className="nav-section-link" data-active={String(isActive)}>
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* ── Desktop: Inicio link ── */}
          {!isHome && (
            <Link href="/" aria-label="Volver al inicio" className="nav-home-link nav-desktop">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7L7 1l6 6M2.5 5.5V12h3V8.5h3V12h3V5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Inicio
            </Link>
          )}

          {/* ── Mobile: hamburger button ── */}
          {!isHome && (
            <button
              className="nav-burger"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px", borderRadius: "var(--r-sm)",
                color: "var(--forest)", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "5px",
              }}
            >
              {menuOpen ? (
                /* X icon */
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="3" y1="3" x2="17" y2="17" /><line x1="17" y1="3" x2="3" y2="17" />
                </svg>
              ) : (
                /* Hamburger */
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="3" y1="6" x2="17" y2="6" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="14" x2="17" y2="14" />
                </svg>
              )}
            </button>
          )}
        </nav>

        {/* ── Mobile drawer ── */}
        {menuOpen && !isHome && (
          <div
            id="mobile-menu"
            role="navigation"
            aria-label="Menú móvil"
            style={{
              borderTop: "1px solid rgba(26,92,58,.10)",
              padding: "1.5rem clamp(1.25rem, 4vw, 3rem) 2rem",
              animation: "drawerIn .22s var(--ease) both",
            }}
          >
            <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {sections.map((s) => {
                const isActive = pathname.startsWith(s.href);
                return (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={() => setMenuOpen(false)}
                      className="nav-section-link"
                      data-active={String(isActive)}
                      style={{ display: "block", padding: "12px 16px", fontSize: "var(--t-sm)" }}
                    >
                      {s.label}
                    </Link>
                  </li>
                );
              })}
              <li style={{ paddingTop: ".5rem", borderTop: "1px solid rgba(26,92,58,.08)", marginTop: ".25rem" }}>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="nav-home-link"
                  style={{ padding: "12px 16px" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7L7 1l6 6M2.5 5.5V12h3V8.5h3V12h3V5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Inicio
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
