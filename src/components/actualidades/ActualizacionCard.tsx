"use client";

import Link from "next/link";

const COMPONENTE_META: Record<string, { label: string; color: string; bg: string }> = {
  ecosistemico:       { label: "Ecosistémico",      color: "#1a5c3a", bg: "rgba(26,92,58,.1)"  },
  sociocultural:      { label: "Sociocultural",      color: "#c07a00", bg: "rgba(192,122,0,.1)" },
  ambiental:          { label: "Ambiental",          color: "#1a6b8a", bg: "rgba(26,107,138,.1)"},
  "laboratorio-datos":{ label: "Laboratorio Datos",  color: "#6b3fa0", bg: "rgba(107,63,160,.1)"},
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

export default function ActualizacionCard({ item }: { item: ActualizacionCardData }) {
  const meta   = COMPONENTE_META[item.componente] ?? { label: item.componente, color: "var(--forest)", bg: "rgba(26,92,58,.1)" };
  const fecha  = new Date(item.fechaPublicacion).toLocaleDateString("es-CO", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <Link
      href={`/actualidades/${item.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "transform .22s var(--ease), box-shadow .22s var(--ease), border-color .22s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,.10)";
          (e.currentTarget as HTMLElement).style.borderColor = meta.color + "40";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow = "";
          (e.currentTarget as HTMLElement).style.borderColor = "";
        }}
      >
        {/* Image */}
        {item.imagenPrincipal && (
          <div style={{ position: "relative", width: "100%", paddingTop: "52%", overflow: "hidden", flexShrink: 0 }}>
            <img
              src={item.imagenPrincipal}
              alt={item.titulo}
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
  );
}
