"use client";

import { useState } from "react";
import SiteNav from "@/components/layout/SiteNav";
import ActualizacionCard, { ActualizacionCardData } from "@/components/actualidades/ActualizacionCard";

const FILTROS = [
  { label: "Todas",             value: "all" },
  { label: "Ecosistémico",      value: "ecosistemico" },
  { label: "Sociocultural",     value: "sociocultural" },
  { label: "Ambiental",         value: "ambiental" },
  { label: "Laboratorio Datos", value: "laboratorio-datos" },
];

export default function ActualizacionesClient({ items }: { items: ActualizacionCardData[] }) {
  const [filtro, setFiltro] = useState<string>("all");

  const visible = filtro === "all"
    ? items
    : items.filter((i) => i.componente === filtro);

  return (
    <>
      <SiteNav />
      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ── Hero ── */}
        <section
          aria-labelledby="actualidades-heading"
          style={{
            position: "relative", overflow: "hidden",
            padding: "clamp(7rem,12vh,10rem) clamp(1.25rem,4vw,3rem) clamp(4rem,7vh,6rem)",
            background: "linear-gradient(150deg, var(--forest-d) 0%, var(--forest) 60%, rgba(26,92,58,.85) 100%)",
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 80% 40%, rgba(232,150,15,.13) 0%, transparent 55%)",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
            <span style={{
              display: "inline-block",
              background: "linear-gradient(135deg, var(--amber), var(--amber-d))",
              color: "var(--forest-d)",
              fontFamily: "var(--font-ui)", fontSize: ".72rem", fontWeight: 800,
              letterSpacing: "2px", textTransform: "uppercase",
              padding: ".3rem 1.1rem", borderRadius: "var(--r-pill)",
              marginBottom: "1.25rem",
            }}>
              Novedades del IIAP
            </span>
            <h1 id="actualidades-heading" style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--t-4xl)",
              lineHeight: .9, color: "#fff",
              letterSpacing: ".01em", marginBottom: "1rem",
            }}>
              ACTUALIDADES
            </h1>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "var(--t-lg)",
              color: "rgba(255,255,255,.78)", maxWidth: "52ch", lineHeight: 1.75,
            }}>
              Avances, resultados y noticias de nuestros cuatro componentes de investigación
              y el Laboratorio de Datos del IIAP.
            </p>
          </div>
        </section>

        {/* ── Filtros ── */}
        <nav
          aria-label="Filtrar por componente"
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "0 clamp(1.25rem,4vw,3rem)",
            position: "sticky", top: "60px", zIndex: 10,
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: ".25rem", overflowX: "auto", padding: ".75rem 0" }}>
            {FILTROS.map((f) => {
              const active = filtro === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setFiltro(f.value)}
                  aria-pressed={active}
                  style={{
                    fontFamily: "var(--font-ui)", fontSize: ".75rem", fontWeight: 700,
                    letterSpacing: "1px", textTransform: "uppercase",
                    padding: ".5rem 1.1rem", borderRadius: "var(--r-pill)",
                    border: active ? "none" : "1px solid transparent", cursor: "pointer", whiteSpace: "nowrap",
                    background: active ? "var(--forest)" : "transparent",
                    color: active ? "var(--bg)" : "var(--text-muted)",
                    transition: "background .18s, color .18s",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* ── Grid ── */}
        <section style={{ padding: "clamp(3rem,5vw,5rem) clamp(1.25rem,4vw,3rem)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            {visible.length === 0 ? (
              <div style={{ textAlign: "center", padding: "5rem 0" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-lg)", color: "var(--text-muted)" }}>
                  No hay actualizaciones publicadas aún en este componente.
                </p>
              </div>
            ) : (
              <>
                <style>{`
                  @media (min-width: 900px) {
                    .act-featured { grid-column: 1 / -1; }
                  }
                `}</style>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                  gap: "clamp(1rem,2vw,1.5rem)",
                }}>
                  {visible.map((item, i) => (
                    <div key={item._id} className={i === 0 ? "act-featured" : undefined}>
                      <ActualizacionCard item={item} featured={i === 0} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "1.5rem clamp(1.25rem,4vw,3rem)", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} IIAP — Actualidades
            </p>
            <a href="/" style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)", textDecoration: "none" }}>
              ← Volver al portal
            </a>
          </div>
        </footer>

      </main>
    </>
  );
}
