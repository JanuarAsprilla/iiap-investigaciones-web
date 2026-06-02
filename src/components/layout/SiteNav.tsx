"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sections = [
  { href: "/planeacion",   label: "Planeación"   },
  { href: "/centros",      label: "Centros"       },
  { href: "/componentes",  label: "Componentes"   },
  { href: "/grupos",       label: "Grupos"        },
  { href: "/actualidades", label: "Actualidades"  },
];

/* ── Icons ── */
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.5 8L8 1.5L14.5 8" />
    <path d="M3 6.5V13.5H6.5V9.5H9.5V13.5H13V6.5" />
  </svg>
);

const PencilIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" />
  </svg>
);

const BurgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6"  x2="17" y2="6"  />
    <line x1="3" y1="10" x2="17" y2="10" />
    <line x1="3" y1="14" x2="17" y2="14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="3" x2="17" y2="17" />
    <line x1="17" y1="3" x2="3" y2="17" />
  </svg>
);

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const isHome = pathname === "/";
  const currentSection = sections.find((s) => pathname.startsWith(s.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isScrolled = scrolled || menuOpen;

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-burger   { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .nav-desktop { display: flex; }
          .nav-burger   { display: none; }
        }
        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>

      <header
        role="banner"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: isScrolled
            ? "rgba(244,241,235,0.97)"
            : "rgba(244,241,235,0.30)",
          backdropFilter: isScrolled ? "blur(18px) saturate(1.5)" : "blur(12px) saturate(1.2)",
          /* Amber accent line replaces the generic green border */
          borderBottom: isScrolled
            ? "1px solid rgba(232,150,15,.22)"
            : "1px solid rgba(232,150,15,.08)",
          transition: "background .22s ease-out, border-color .22s ease-out, backdrop-filter .22s ease-out",
        }}
      >
        <nav
          aria-label="Navegación principal"
          style={{
            maxWidth: "1400px", margin: "0 auto",
            padding: "0 clamp(1.25rem,4vw,3rem)",
            height: "64px",
            display: "flex",
            /* stretch lets section links fill full height for bottom-border active state */
            alignItems: "stretch",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          {/* ── Brand mark ── */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/"
              aria-label="Inicio — IIAP Investigaciones"
              style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}
            >
              {/* Amber diamond accent */}
              <span
                aria-hidden="true"
                style={{
                  width: "7px", height: "7px",
                  background: "var(--amber)",
                  borderRadius: "1px",
                  transform: "rotate(45deg)",
                  flexShrink: 0,
                  boxShadow: "0 0 6px rgba(232,150,15,.45)",
                }}
              />
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                letterSpacing: ".12em",
                color: "var(--forest)",
                lineHeight: 1,
              }}>
                IIAP
              </span>
              {/* Thin separator */}
              <span
                aria-hidden="true"
                style={{
                  width: "1px", height: "18px",
                  background: "rgba(26,92,58,.2)",
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontFamily: "var(--font-ui)",
                fontSize: ".6rem",
                fontWeight: 700,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                lineHeight: 1,
              }}>
                INVESTIGACIONES
              </span>
            </Link>

            {/* Breadcrumb current section */}
            {currentSection && (
              <div style={{ display: "flex", alignItems: "center", marginLeft: ".85rem", gap: ".5rem" }}>
                <span aria-hidden="true" style={{
                  fontFamily: "var(--font-ui)", fontSize: ".65rem",
                  color: "rgba(26,92,58,.3)",
                }}>
                  /
                </span>
                <span style={{
                  fontFamily: "var(--font-ui)", fontSize: ".6rem",
                  fontWeight: 800, letterSpacing: ".16em",
                  textTransform: "uppercase", color: "var(--forest)",
                  opacity: .75,
                }}>
                  {currentSection.label}
                </span>
              </div>
            )}
          </div>

          {/* ── Desktop nav links ── */}
          {!isHome && (
            <ul
              className="nav-desktop"
              role="list"
              style={{
                display: "flex", alignItems: "stretch",
                gap: 0, listStyle: "none", margin: 0, padding: 0,
                flex: 1, justifyContent: "center",
              }}
            >
              {sections.map((s) => {
                const isActive = pathname.startsWith(s.href);
                return (
                  <li key={s.href} className="nav-li">
                    <Link href={s.href} className="nav-section-link" data-active={String(isActive)}>
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* ── Desktop right: Editorial + Home ── */}
          {!isHome && (
            <div
              className="nav-desktop"
              style={{ display: "flex", alignItems: "center", gap: ".5rem", flexShrink: 0 }}
            >
              <a
                href="https://iiap-investigaciones.sanity.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-editorial-link"
                aria-label="Acceder al área editorial"
              >
                <PencilIcon />
                Editorial
              </a>
              <Link href="/" aria-label="Volver al inicio" className="nav-home-link">
                <HomeIcon />
              </Link>
            </div>
          )}

          {/* ── Mobile: hamburger ── */}
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
                color: "var(--forest)",
                alignItems: "center", justifyContent: "center",
              }}
            >
              {menuOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>
          )}
        </nav>

        {/* ── Mobile drawer ── */}
        {menuOpen && !isHome && (
          <nav
            id="mobile-menu"
            aria-label="Menú móvil"
            style={{
              borderTop: "1px solid rgba(232,150,15,.18)",
              padding: "1.25rem clamp(1.25rem,4vw,3rem) 1.75rem",
              animation: "drawerIn .2s var(--ease) both",
            }}
          >
            <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: ".2rem" }}>
              {sections.map((s) => {
                const isActive = pathname.startsWith(s.href);
                return (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "flex", alignItems: "center", gap: ".75rem",
                        padding: "11px 14px", borderRadius: "var(--r-sm)",
                        fontFamily: "var(--font-ui)", fontSize: ".72rem",
                        fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
                        textDecoration: "none",
                        color: isActive ? "var(--forest)" : "var(--text-muted)",
                        background: isActive ? "var(--forest-lt)" : "transparent",
                        transition: "background .15s, color .15s",
                      }}
                    >
                      {/* Amber dot for active */}
                      <span
                        aria-hidden="true"
                        style={{
                          width: "5px", height: "5px",
                          borderRadius: "50%",
                          background: isActive ? "var(--amber)" : "transparent",
                          border: isActive ? "none" : "1.5px solid rgba(26,92,58,.2)",
                          flexShrink: 0,
                          transition: "background .15s, border-color .15s",
                        }}
                      />
                      {s.label}
                    </Link>
                  </li>
                );
              })}

              {/* Divider */}
              <li aria-hidden="true" style={{ height: "1px", background: "rgba(26,92,58,.08)", margin: ".5rem 0" }} />

              {/* Home */}
              <li>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: ".75rem",
                    padding: "10px 14px", borderRadius: "var(--r-sm)",
                    fontFamily: "var(--font-ui)", fontSize: ".72rem",
                    fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                    textDecoration: "none", color: "var(--text-muted)",
                    transition: "color .15s",
                  }}
                >
                  <HomeIcon />
                  Inicio
                </Link>
              </li>

              {/* Editorial */}
              <li>
                <a
                  href="https://iiap-investigaciones.sanity.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: ".75rem",
                    padding: "10px 14px", borderRadius: "var(--r-sm)",
                    fontFamily: "var(--font-ui)", fontSize: ".72rem",
                    fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
                    textDecoration: "none", color: "var(--text-muted)",
                    transition: "color .15s",
                  }}
                >
                  <PencilIcon />
                  Área Editorial
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
