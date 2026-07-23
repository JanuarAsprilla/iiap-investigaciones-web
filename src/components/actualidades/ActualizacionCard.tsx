"use client";

import Link from "next/link";

const COMPONENTE_META: Record<string, { label: string; color: string; bg: string }> = {
  ecosistemico:       { label: "Ecosistémico",      color: "var(--forest)",       bg: "var(--forest-lt)"      },
  sociocultural:      { label: "Sociocultural",      color: "var(--amber)",        bg: "var(--gold-dim)"       },
  ambiental:          { label: "Ambiental",          color: "var(--comp-ambiental)",bg: "var(--comp-ambiental-bg)"},
  "laboratorio-datos":{ label: "Laboratorio Datos",  color: "var(--comp-lab)",     bg: "var(--comp-lab-bg)"    },
};

export interface Autor {
  nombre: string;
  cargo?: string;
  foto?: string;
}

export interface ActualizacionCardData {
  _id: string;
  titulo: string;
  slug: string;
  resumen: string;
  componente: string;
  imagenPrincipal?: string;
  fechaPublicacion: string;
  etiquetas?: string[];
  autores?: Autor[];
}

export default function ActualizacionCard({ item, featured = false }: { item: ActualizacionCardData; featured?: boolean }) {
  const meta   = COMPONENTE_META[item.componente] ?? { label: item.componente, color: "var(--forest)", bg: "rgba(26,92,58,.1)" };
  const fecha  = new Date(item.fechaPublicacion).toLocaleDateString("es-CO", {
    day: "numeric", month: "long", year: "numeric",
  });
  const cardId = `card-${item._id}`;

  return (
    <>
      <style>{`
        #${cardId} { transition: transform .22s var(--ease), box-shadow .22s var(--ease), border-color .22s; }
        #${cardId}:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,.10); border-color: ${meta.color}40; }
        #${cardId}:hover .card-img { transform: scale(1.04); }
        #${cardId}:focus-within { outline: 2px solid ${meta.color}; outline-offset: 2px; }
      `}</style>
      <Link
        href={`/actualidades?slug=${item.slug}`}
        style={{ textDecoration: "none", display: "block", height: "100%" }}
      >
        <article
          id={cardId}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            display: "flex",
            flexDirection: featured ? "row" : "column",
            height: "100%",
            cursor: "pointer",
          }}
        >
          {/* Image */}
          {item.imagenPrincipal && (
            <div style={{
              position: "relative",
              width: featured ? "clamp(240px,45%,480px)" : "100%",
              paddingTop: featured ? 0 : "52%",
              flexShrink: 0,
              overflow: "hidden",
              minHeight: featured ? "260px" : undefined,
            }}>
              <img
                src={item.imagenPrincipal}
                alt={item.titulo}
                loading="lazy"
                className="card-img"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  transition: "transform .4s var(--ease)",
                }}
              />
            </div>
          )}

        <div style={{ padding: "clamp(1.25rem,2vw,1.75rem)", display: "flex", flexDirection: "column", flex: 1, gap: ".75rem" }}>
          {/* Componente badge */}
          <span style={{
            display: "inline-flex", alignItems: "center",
            fontFamily: "var(--font-ui)", fontSize: ".68rem", fontWeight: 800,
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: meta.color, background: meta.bg,
            padding: ".25rem .75rem", borderRadius: "var(--r-pill)",
            alignSelf: "flex-start",
          }}>
            {meta.label}
          </span>

          {/* Title */}
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem,1.5vw,1.3rem)",
            lineHeight: 1.2,
            color: "var(--text-primary)",
            margin: 0,
          }}>
            {item.titulo}
          </h3>

          {/* Summary */}
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-sm)",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } as React.CSSProperties}>
            {item.resumen}
          </p>

          {/* Footer: authors + date */}
          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: ".75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: ".5rem", flexWrap: "wrap" }}>
            {item.autores && item.autores.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: ".15rem" }}>
                {item.autores.slice(0, 2).map((a, i) => (
                  <span key={i} style={{ fontFamily: "var(--font-ui)", fontSize: ".72rem", color: "var(--text-primary)", fontWeight: 600 }}>
                    {a.nombre}
                    {a.cargo && <span style={{ fontWeight: 400, color: "var(--text-muted)" }}> · {a.cargo}</span>}
                  </span>
                ))}
                {(item.autores.length > 2) && (
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: ".68rem", color: "var(--text-muted)" }}>
                    +{item.autores.length - 2} más
                  </span>
                )}
              </div>
            )}
            <time style={{ fontFamily: "var(--font-ui)", fontSize: ".68rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              {fecha}
            </time>
          </div>
        </div>
      </article>
    </Link>
    </>
  );
}
