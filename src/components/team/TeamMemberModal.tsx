"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Investigador } from "@/lib/types";

const COMP_LABEL: Record<string, string> = {
  ECOSISTEMICO:  "Componente Ecosistémico",
  SOCIOCULTURAL: "Componente Sociocultural",
  AMBIENTAL:     "Componente Ambiental",
  PRODUCTIVO:    "Componente Productivo",
  LABORATORIO:   "Laboratorio de Datos",
};

const COMP_COLOR: Record<string, string> = {
  ECOSISTEMICO:  "var(--forest)",
  SOCIOCULTURAL: "var(--amber)",
  AMBIENTAL:     "var(--comp-ambiental)",
  PRODUCTIVO:    "#4a7c2a",
  LABORATORIO:   "var(--comp-lab)",
};

interface Props {
  persona: Investigador;
  onClose: () => void;
}

export default function TeamMemberModal({ persona, onClose }: Props) {
  const [closing, setClosing] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 220);
  };

  const nombreCompleto = [persona.nombre, persona.apellido].filter(Boolean).join(" ");
  const accentColor = persona.componente
    ? (COMP_COLOR[persona.componente] ?? "var(--forest)")
    : "var(--forest)";

  const roleTag =
    persona.rol === "director"    ? "Dirección General" :
    persona.rol === "subdirector" ? "Subdirección de Investigaciones" :
    persona.componente            ? COMP_LABEL[persona.componente] ?? persona.cargo :
                                    "Investigación";

  return (
    <div
      className={`cm-overlay open${closing ? " closing" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tm-modal-name"
    >
      <div className="cm-box" style={{ maxWidth: "900px" }}>

        {/* ── Image side ── */}
        <div className="cm-img" style={{ minHeight: 360, position: "relative" }}>
          {persona.imagen ? (
            <Image
              src={persona.imagen}
              alt={nombreCompleto}
              fill
              sizes="(max-width: 680px) 0px, 450px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              background: `linear-gradient(135deg, var(--forest-d), var(--forest))`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "6rem", color: "rgba(255,255,255,.18)" }}>
                {persona.nombre[0]}
              </span>
            </div>
          )}
          {/* Component accent at bottom of image */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "4px",
              background: accentColor,
            }}
          />
        </div>

        {/* ── Content side ── */}
        <div className="cm-body" style={{ gap: 0 }}>

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Cerrar perfil"
            style={{
              alignSelf: "flex-end", background: "none", border: "none",
              cursor: "pointer", color: "var(--text-muted)",
              padding: "4px", marginBottom: ".75rem", borderRadius: "4px",
              transition: "color .2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16" /><line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>

          {/* Role tag */}
          <span
            className="cm-tag"
            style={{ background: `color-mix(in srgb, ${accentColor} 12%, transparent)`, color: accentColor, borderColor: "transparent" }}
          >
            {roleTag}
          </span>

          {/* Name */}
          <h2 id="tm-modal-name" className="cm-title" style={{ marginBottom: ".3rem" }}>
            {persona.nombre.toUpperCase()}
          </h2>
          {persona.apellido && (
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", color: "var(--text-muted)", letterSpacing: ".03em", marginBottom: ".75rem", lineHeight: 1 }}>
              {persona.apellido.toUpperCase()}
            </p>
          )}

          <div className="cm-divider" style={{ marginBottom: ".85rem" }} />

          {/* Cargo */}
          <p style={{ fontFamily: "var(--font-ui)", fontSize: ".68rem", fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: ".3rem" }}>
            {persona.cargo}
          </p>

          {/* Especialidad */}
          {persona.especialidad && (
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: ".95rem", color: accentColor, marginBottom: ".9rem" }}>
              {persona.especialidad}
            </p>
          )}

          {/* Bio */}
          {persona.bio ? (
            <p className="cm-desc" style={{ fontSize: ".95rem", marginBottom: "1rem" }}>
              {persona.bio}
            </p>
          ) : (
            <p className="cm-desc" style={{ fontStyle: "italic", opacity: .55, marginBottom: "1rem", fontSize: ".9rem" }}>
              Perfil en construcción — próximamente.
            </p>
          )}

          {/* Research areas */}
          {persona.areas && persona.areas.length > 0 && (
            <div className="cm-areas" style={{ marginBottom: "1rem" }}>
              {persona.areas.map((area) => (
                <span key={area} className="cm-area-chip">{area}</span>
              ))}
            </div>
          )}

          {/* Logros */}
          {persona.logros && persona.logros.length > 0 && (
            <ul className="cm-logros" style={{ marginBottom: "1.1rem" }}>
              {persona.logros.map((logro) => (
                <li key={logro} className="cm-logro-item">
                  <span className="cm-logro-dot">◆</span>
                  {logro}
                </li>
              ))}
            </ul>
          )}

          {/* ORCID / CVLaC */}
          {(persona.orcid || persona.cvlac) && (
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "auto", paddingTop: ".5rem" }}>
              {persona.orcid && (
                <a
                  href={`https://orcid.org/${persona.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-ui)", fontSize: ".6rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#A6CE39", textDecoration: "none", padding: ".25rem .75rem", borderRadius: "var(--r-pill)", border: "1px solid #A6CE39" }}
                >
                  ORCID ↗
                </a>
              )}
              {persona.cvlac && (
                <a
                  href={persona.cvlac}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-ui)", fontSize: ".6rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--forest)", textDecoration: "none", padding: ".25rem .75rem", borderRadius: "var(--r-pill)", border: "1px solid var(--forest)" }}
                >
                  CVLaC ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
