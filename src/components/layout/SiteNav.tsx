"use client";

/**
 * SiteNav — Navegación lateral (sidebar) del portal.
 *
 * Sustituye al antiguo navbar superior para NO competir con el navbar
 * institucional del sitio que embebe este portal (iiap.org.co/investigacion).
 * Es un riel poco invasivo: ocupa su propia columna a la izquierda (el
 * contenido va al lado, nunca debajo) y en móvil se colapsa en un botón
 * "Módulos" que abre un cajón. Hereda por completo el sistema de diseño
 * (crema/bosque/ámbar, Inter para UI, curvas expo).
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* ── Iconos de línea (20px, stroke currentColor) ── */
const IcInicio = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 10L10 3l7.5 7" /><path d="M4.5 8.5V16h4v-4.5h3V16h4V8.5" />
  </svg>
);
const IcPlaneacion = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 2.5h6l4 4V17.5H5z" /><path d="M11 2.5V6.5h4" /><path d="M7.5 10.5h5M7.5 13.5h5" />
  </svg>
);
const IcCentros = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17.5h14" /><path d="M4.5 17.5V7l5.5-3.5L15.5 7v10.5" /><path d="M8 17.5v-4h4v4" /><path d="M7.5 9.5h1M11.5 9.5h1" />
  </svg>
);
const IcComponentes = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="6" height="6" rx="1" /><rect x="11" y="3" width="6" height="6" rx="1" />
    <rect x="3" y="11" width="6" height="6" rx="1" /><rect x="11" y="11" width="6" height="6" rx="1" />
  </svg>
);
const IcGrupos = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="7" r="2.5" /><circle cx="14" cy="8" r="2" />
    <path d="M2.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" /><path d="M12.5 15.5c.2-2 1.7-3 3.2-3 1.2 0 2.3.6 2.8 2" />
  </svg>
);
const IcActualidades = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4.5h11v11a1.5 1.5 0 001.5 1.5H5a2 2 0 01-2-2z" /><path d="M14 8h3v7.5a1.5 1.5 0 01-3 0" />
    <path d="M5.5 7.5h6M5.5 10.5h6M5.5 13.5h4" />
  </svg>
);
const IcEditorial = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.5 2.5l4 4L7 17H3v-4z" /><path d="M11.5 4.5l4 4" />
  </svg>
);
const IcMenu = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6" x2="17" y2="6" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="14" x2="17" y2="14" />
  </svg>
);
const IcClose = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" />
  </svg>
);

const MODULOS = [
  { href: "/",             label: "Inicio",       Icon: IcInicio },
  { href: "/planeacion",   label: "Planeación",   Icon: IcPlaneacion },
  { href: "/centros",      label: "Centros",      Icon: IcCentros },
  { href: "/componentes",  label: "Componentes",  Icon: IcComponentes },
  { href: "/grupos",       label: "Grupos",       Icon: IcGrupos },
  { href: "/actualidades", label: "Actualidades", Icon: IcActualidades },
];

const STUDIO_URL = "https://iiap-investigaciones.sanity.studio";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Cerrar el cajón al cambiar de ruta.
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Bloquear scroll del fondo con el cajón abierto (solo móvil).
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        /* ── Reserva de la columna del riel (solo escritorio) ── */
        @media (min-width: 1025px) {
          #main-content { padding-left: 76px; }
          .sb-rail { display: flex; }
          .sb-fab  { display: none; }
        }
        @media (max-width: 1024px) {
          .sb-rail { display: none; }
          .sb-fab  { display: inline-flex; }
        }

        /* ── Ítems del riel ── */
        .sb-item {
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          width: 62px; padding: 9px 2px; border-radius: var(--r-md);
          text-decoration: none; color: var(--text-muted);
          font-family: var(--font-ui); position: relative;
          transition: background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
        }
        .sb-item:hover { background: var(--forest-lt); color: var(--forest); }
        .sb-item:focus-visible { outline: 2px solid var(--forest); outline-offset: 2px; }
        .sb-item[data-active="true"] { background: var(--forest-lt); color: var(--forest); }
        .sb-item[data-active="true"]::after {
          content: ""; position: absolute; top: 7px; right: 9px;
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--amber); box-shadow: 0 0 6px rgba(232,150,15,.55);
        }
        .sb-item svg { width: 21px; height: 21px; }
        .sb-label {
          font-size: .5rem; font-weight: 700; letter-spacing: .05em;
          text-transform: uppercase; line-height: 1.12; text-align: center;
        }

        /* ── Cajón móvil ── */
        .sb-backdrop {
          position: fixed; inset: 0; z-index: 110;
          background: rgba(13,59,36,.38);
          backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
          animation: sbFade var(--dur-fast) var(--ease) both;
        }
        .sb-drawer {
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 120;
          width: min(80vw, 288px);
          background: rgba(244,241,235,.98);
          border-right: 1px solid var(--border-subtle);
          box-shadow: var(--sh-lg);
          padding: 1.25rem 1rem;
          display: flex; flex-direction: column;
          animation: sbSlide var(--dur-med) var(--ease) both;
        }
        .sb-drawer-item {
          display: flex; align-items: center; gap: .8rem;
          padding: 12px 14px; border-radius: var(--r-md);
          text-decoration: none; color: var(--text-muted);
          font-family: var(--font-ui); font-size: .74rem; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase;
          transition: background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
        }
        .sb-drawer-item:hover { background: var(--forest-lt); color: var(--forest); }
        .sb-drawer-item[data-active="true"] { background: var(--forest-lt); color: var(--forest); }
        .sb-drawer-item svg { width: 19px; height: 19px; flex-shrink: 0; }

        @keyframes sbFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sbSlide { from { transform: translateX(-100%); } to { transform: none; } }

        @media (prefers-reduced-motion: reduce) {
          .sb-backdrop, .sb-drawer { animation: none; }
        }
      `}</style>

      {/* ══════════ RIEL (escritorio) ══════════ */}
      <nav
        className="sb-rail"
        aria-label="Navegación de módulos"
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
          width: "76px",
          flexDirection: "column", alignItems: "center",
          padding: "16px 0 14px",
          background: "rgba(244,241,235,.85)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          borderRight: "1px solid var(--border-subtle)",
          boxShadow: "1px 0 0 rgba(0,0,0,.02), 6px 0 24px rgba(26,92,58,.05)",
        }}
      >
        {/* Marca */}
        <Link
          href="/"
          aria-label="Inicio — IIAP Investigaciones"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none", marginBottom: "6px" }}
        >
          <span aria-hidden="true" style={{
            width: "8px", height: "8px", background: "var(--amber)",
            borderRadius: "1px", transform: "rotate(45deg)",
            boxShadow: "0 0 7px rgba(232,150,15,.5)",
          }} />
          <span style={{
            fontFamily: "var(--font-display)", fontSize: "1.15rem",
            letterSpacing: ".1em", color: "var(--forest)", lineHeight: 1,
          }}>
            IIAP
          </span>
        </Link>

        <span aria-hidden="true" style={{ width: "34px", height: "1px", background: "var(--border-subtle)", margin: "4px 0 10px" }} />

        {/* Módulos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", flex: 1, justifyContent: "center", overflowY: "auto", width: "100%", alignItems: "center" }}>
          {MODULOS.map(({ href, label, Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className="sb-item"
                data-active={String(active)}
                aria-current={active ? "page" : undefined}
                title={label}
              >
                <Icon />
                <span className="sb-label">{label}</span>
              </Link>
            );
          })}
        </div>

        <span aria-hidden="true" style={{ width: "34px", height: "1px", background: "var(--border-subtle)", margin: "10px 0 8px" }} />

        {/* Editorial (CMS) */}
        <a
          href={STUDIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="sb-item"
          title="Área editorial (gestión de contenido)"
          aria-label="Área editorial"
        >
          <IcEditorial />
          <span className="sb-label">Editorial</span>
        </a>
      </nav>

      {/* ══════════ BOTÓN FLOTANTE (móvil) ══════════ */}
      <button
        className="sb-fab"
        aria-label={menuOpen ? "Cerrar módulos" : "Abrir módulos"}
        aria-expanded={menuOpen}
        aria-controls="sb-drawer"
        onClick={() => setMenuOpen((o) => !o)}
        style={{
          position: "fixed", left: "16px", bottom: "16px", zIndex: 130,
          alignItems: "center", gap: ".5rem",
          padding: "11px 16px 11px 13px", borderRadius: "var(--r-pill)",
          border: "1px solid rgba(232,150,15,.35)",
          background: "var(--forest)", color: "#fff", cursor: "pointer",
          fontFamily: "var(--font-ui)", fontSize: ".7rem", fontWeight: 800,
          letterSpacing: ".12em", textTransform: "uppercase",
          boxShadow: "var(--sh), 0 0 0 4px rgba(244,241,235,.6)",
        }}
      >
        {menuOpen ? <IcClose /> : <IcMenu />}
        Módulos
      </button>

      {/* ══════════ CAJÓN (móvil) ══════════ */}
      {menuOpen && (
        <>
          <div className="sb-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <nav id="sb-drawer" className="sb-drawer" aria-label="Módulos del portal">
            <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "4px 8px 14px" }}>
              <span aria-hidden="true" style={{
                width: "8px", height: "8px", background: "var(--amber)",
                borderRadius: "1px", transform: "rotate(45deg)",
              }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: ".1em", color: "var(--forest)", lineHeight: 1 }}>IIAP</span>
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: ".56rem", fontWeight: 700,
                letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-muted)",
              }}>
                Investigaciones
              </span>
            </div>

            <span aria-hidden="true" style={{ height: "1px", background: "var(--border-subtle)", margin: "0 8px 10px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, overflowY: "auto" }}>
              {MODULOS.map(({ href, label, Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className="sb-drawer-item"
                    data-active={String(active)}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon />
                    {label}
                  </Link>
                );
              })}
            </div>

            <span aria-hidden="true" style={{ height: "1px", background: "var(--border-subtle)", margin: "10px 8px" }} />

            <a
              href={STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sb-drawer-item"
              onClick={() => setMenuOpen(false)}
            >
              <IcEditorial />
              Área Editorial
            </a>
          </nav>
        </>
      )}
    </>
  );
}
