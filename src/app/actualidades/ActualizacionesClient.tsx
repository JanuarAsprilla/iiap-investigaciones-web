"use client";

import { useState, useEffect } from "react";
import SiteNav from "@/components/layout/SiteNav";
import ModuleHero from "@/components/ui/ModuleHero";
import ActualizacionCard, { ActualizacionCardData } from "@/components/actualidades/ActualizacionCard";
import { browserClient } from "@/sanity/browser";
import { actualizacionesQuery } from "@/sanity/lib/queries";

const heroBgs = [
  "/assets/grupos/componente-ecosistemico.webp",
  "/assets/grupos/componente-sociocultural.webp",
  "/assets/grupos/componente-ambiental.webp",
  "/assets/grupos/laboratorio-datos.webp",
];

const FILTROS = [
  { label: "Todas",             value: "all",              dot: null },
  { label: "Ecosistémico",      value: "ecosistemico",     dot: "#0B3D2C" },
  { label: "Sociocultural",     value: "sociocultural",    dot: "#1B5E3B" },
  { label: "Ambiental",         value: "ambiental",        dot: "#26A65B" },
  { label: "Lab. Datos",        value: "laboratorio-datos", dot: "#1A3A5C" },
];

export default function ActualizacionesClient() {
  const [items, setItems] = useState<ActualizacionCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<string>("all");

  useEffect(() => {
    let active = true;
    browserClient
      .fetch<ActualizacionCardData[]>(actualizacionesQuery)
      .then((data) => {
        if (!active) return;
        setItems(data ?? []);
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const visible = filtro === "all"
    ? items
    : items.filter((i) => i.componente === filtro);

  return (
    <>
      <SiteNav />
      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        <ModuleHero
          headingId="actualidades-heading"
          eyebrow="Novedades del IIAP"
          backgrounds={heroBgs}
          gradient="linear-gradient(150deg, rgba(9,40,25,.88) 0%, rgba(13,59,36,.82) 60%, rgba(26,92,58,.78) 100%)"
          radialGradient="radial-gradient(ellipse at 80% 40%, rgba(232,150,15,.13) 0%, transparent 55%)"
          heading="ACTUALIDADES"
          description="Avances, resultados y noticias de nuestros cuatro componentes de investigación y el Laboratorio de Datos del IIAP."
        />

        <div
          style={{
            padding: "clamp(1.5rem,3vw,2.5rem) clamp(1.25rem,4vw,3rem) 0",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: ".6rem", fontWeight: 800,
                letterSpacing: "2px", textTransform: "uppercase",
                color: "var(--text-muted)", marginRight: ".25rem",
              }}>
                Filtrar
              </span>
              {FILTROS.map((f) => {
                const active = filtro === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => setFiltro(f.value)}
                    aria-pressed={active}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: ".45rem",
                      fontFamily: "var(--font-ui)", fontSize: ".72rem", fontWeight: 700,
                      letterSpacing: ".5px",
                      padding: ".35rem .9rem",
                      borderRadius: "999px",
                      border: active
                        ? "1.5px solid var(--forest)"
                        : "1.5px solid var(--border-subtle)",
                      cursor: "pointer", whiteSpace: "nowrap",
                      background: active ? "var(--forest)" : "var(--bg)",
                      color: active ? "#fff" : "var(--text-muted)",
                      transition: "all .18s ease",
                      boxShadow: active ? "0 2px 8px rgba(13,59,36,.18)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--forest)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--forest)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                      }
                    }}
                  >
                    {f.dot && (
                      <span style={{
                        width: "7px", height: "7px", borderRadius: "50%",
                        background: active ? "rgba(255,255,255,.7)" : f.dot,
                        flexShrink: 0,
                        transition: "background .18s",
                      }} aria-hidden="true" />
                    )}
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <section style={{ padding: "clamp(3rem,5vw,5rem) clamp(1.25rem,4vw,3rem)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "5rem 0" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--t-lg)", color: "var(--text-muted)" }}>
                  Cargando actualidades…
                </p>
              </div>
            ) : visible.length === 0 ? (
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
