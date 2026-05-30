"use client";
import Image from "next/image";
import { useState } from "react";
import { directivos, coordinadores } from "@/data/equipo";
import type { Investigador } from "@/lib/types";
import TeamMemberModal from "@/components/team/TeamMemberModal";

function TeamCard({
  persona,
  variant,
  onClick,
}: {
  persona: Investigador;
  variant: "dir" | "coord";
  onClick: () => void;
}) {
  const nombre = persona.nombre;
  const apellido = persona.apellido;
  const heightClass = variant === "dir" ? "team-card-dir" : "team-card-coord";
  const nameSize = variant === "dir" ? "1.7rem" : "1.35rem";

  return (
    <button
      className={`team-card ${heightClass}`}
      onClick={onClick}
      aria-label={`Ver perfil de ${nombre} ${apellido}`}
      style={{ width: "100%", background: "none", border: "none", padding: 0, textAlign: "left" }}
    >
      {persona.imagen && (
        <Image
          src={persona.imagen}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      )}
      <div className="team-card-overlay" aria-hidden="true" />
      <span className="team-card-cta" aria-hidden="true">Ver perfil</span>
      <div className="team-card-info">
        <div className="team-card-amber-line" aria-hidden="true" />
        <p className="team-card-nombre" style={{ fontSize: nameSize }}>{nombre}</p>
        {apellido && (
          <p className="team-card-nombre" style={{ fontSize: "calc(" + nameSize + " * .75)", opacity: .75 }}>
            {apellido}
          </p>
        )}
        <p className="team-card-cargo">{persona.cargo}</p>
        {persona.especialidad && (
          <p className="team-card-esp">{persona.especialidad}</p>
        )}
      </div>
    </button>
  );
}

export default function EstructuraSection() {
  const [selected, setSelected] = useState<Investigador | null>(null);

  return (
    <>
      <section
        id="liderazgo"
        aria-labelledby="estructura-heading"
        style={{
          background: "var(--forest-d)",
          padding: "clamp(4rem,8vh,7rem) clamp(1.25rem,4vw,3rem)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: "clamp(2rem,4vh,3.5rem)" }}>
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-ui)", fontSize: ".65rem", fontWeight: 700,
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: "var(--amber)", marginBottom: ".75rem",
            }}>
              Liderazgo Científico
            </span>
            <h2
              id="estructura-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 1.5rem + 3vw, 4.5rem)",
                color: "#fff", lineHeight: .9, letterSpacing: ".02em",
                marginBottom: ".75rem",
              }}
            >
              EQUIPO DE<br />
              <span style={{ color: "var(--amber)" }}>INVESTIGACIÓN</span>
            </h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "var(--t-lg)",
              color: "rgba(255,255,255,.62)", maxWidth: "52ch", lineHeight: 1.7,
            }}>
              Equipo directivo comprometido con la conservación del Chocó Biogeográfico.
              Toca su nombre para conocer su trayectoria.
            </p>
          </div>

          {/* ── Directivos ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(.75rem,1.5vw,1.25rem)",
            marginBottom: "clamp(1rem,2vw,1.5rem)",
          }}>
            {directivos.map((p) => (
              <TeamCard key={p.id} persona={p} variant="dir" onClick={() => setSelected(p)} />
            ))}
          </div>

          {/* ── Coordinadores ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
            gap: "clamp(.75rem,1.5vw,1.25rem)",
          }}>
            {coordinadores.map((p) => (
              <TeamCard key={p.id} persona={p} variant="coord" onClick={() => setSelected(p)} />
            ))}
          </div>

        </div>
      </section>

      {selected && (
        <TeamMemberModal persona={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
