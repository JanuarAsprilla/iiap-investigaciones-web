"use client";
import Image from "next/image";
import { useState } from "react";
import { investigadores } from "@/data/equipo";
import type { Investigador } from "@/lib/types";
import TeamMemberModal from "@/components/team/TeamMemberModal";

function InvestigadorCard({
  persona,
  onClick,
}: {
  persona: Investigador;
  onClick: () => void;
}) {
  const nombre = [persona.nombre, persona.apellido].filter(Boolean).join(" ");

  return (
    <button
      className="team-card team-card-inv"
      onClick={onClick}
      aria-label={`Ver perfil de ${nombre}`}
      style={{ width: "100%", background: "none", border: "none", padding: 0, textAlign: "left" }}
    >
      {persona.imagen && (
        <Image
          src={persona.imagen}
          alt=""
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 200px"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      )}
      <div className="team-card-overlay" aria-hidden="true" />
      <div className="team-card-info" style={{ padding: ".85rem" }}>
        <div className="team-card-amber-line" aria-hidden="true" />
        <p className="team-card-nombre" style={{ fontSize: "1.1rem" }}>{persona.nombre}</p>
        {persona.apellido && (
          <p className="team-card-nombre" style={{ fontSize: ".82rem", opacity: .65 }}>{persona.apellido}</p>
        )}
        <p className="team-card-cargo">{persona.cargo}</p>
      </div>
    </button>
  );
}

export default function TalentoSection() {
  const [selected, setSelected] = useState<Investigador | null>(null);

  return (
    <>
      <section
        id="talento"
        aria-labelledby="talento-heading"
        style={{
          background: "var(--bg)",
          padding: "clamp(4rem,8vh,7rem) clamp(1.25rem,4vw,3rem)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "clamp(2rem,4vh,3rem)",
          }}>
            <div>
              <span style={{
                display: "inline-block",
                fontFamily: "var(--font-ui)", fontSize: ".65rem", fontWeight: 700,
                letterSpacing: "2.5px", textTransform: "uppercase",
                color: "var(--forest)", marginBottom: ".75rem",
              }}>
                Capital Humano
              </span>
              <h2
                id="talento-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 1.5rem + 3vw, 4.5rem)",
                  color: "var(--text)", lineHeight: .9, letterSpacing: ".02em",
                }}
              >
                TALENTO<br />
                <span style={{ color: "var(--forest)" }}>HUMANO</span>
              </h2>
            </div>

            {/* Stat callout */}
            <div style={{
              borderTop: "2px solid var(--amber)", paddingTop: ".75rem",
              minWidth: "140px",
            }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem,5vw,5rem)",
                color: "var(--forest)", lineHeight: 1,
                letterSpacing: "-.01em",
              }}>
                18+
              </p>
              <p style={{
                fontFamily: "var(--font-ui)", fontSize: ".68rem", fontWeight: 700,
                letterSpacing: "2px", textTransform: "uppercase",
                color: "var(--text-muted)", lineHeight: 1.4,
              }}>
                Profesionales<br />dedicados
              </p>
            </div>
          </div>

          {/* ── Investigators grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))",
            gap: "clamp(.6rem,1.2vw,1rem)",
          }}>
            {investigadores.map((p) => (
              <InvestigadorCard key={p.id} persona={p} onClick={() => setSelected(p)} />
            ))}
          </div>

          {/* Note */}
          <p style={{
            fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)",
            color: "var(--text-muted)", marginTop: "1.5rem",
            fontStyle: "italic",
          }}>
            Toca el nombre de cada investigador para conocer su área de trabajo.
          </p>

        </div>
      </section>

      {selected && (
        <TeamMemberModal persona={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
