"use client";

import { useState, useCallback } from "react";
import { gruposInvestigacion } from "@/data/grupos";
import type { GrupoInvestigacion } from "@/lib/types";
import ModalGallery from "@/components/ui/ModalGallery";

const grupoImages: Record<string, string> = {
  "gi-01": "/assets/comunes/YDRAY-IMG_1099.jpeg",
  "gi-02": "/assets/centros/SENDERO.jpeg",
  "gama":  "/assets/grupos/LABORATORIO_DATOS.jpeg",
  "gi-04": "/assets/centros/VIVERO.jpeg",
  "gi-05": "/assets/grupos/COMPONENTE_ECOSISTEMICO.jpeg",
};

function GrupoCard({ gi, onClick }: { gi: GrupoInvestigacion; onClick: () => void }) {
  return (
    <div
      className="gc-card"
      role="button" tabIndex={0}
      aria-label={`Ver detalles de ${gi.nombre}`}
      style={{ height: "300px" }}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick())}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={grupoImages[gi.id] ?? "/assets/comunes/YDRAY-IMG_1099.jpeg"} alt={gi.nombre} loading="lazy" />
      <div className="gc-overlay" />
      <div className="gc-content">
        <span style={{ fontFamily: "var(--font-ui)", fontSize: ".58rem", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "var(--amber)", display: "block", marginBottom: ".4rem" }}>
          {gi.codigo}
        </span>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem,1.8vw,1.55rem)", color: "#fff", letterSpacing: ".06em", lineHeight: 1.05, margin: 0 }}>
          {gi.nombre}
        </h3>
        <span className="gc-cta" style={{ opacity: 1, transform: "translateY(0)" }}>
          Ver más
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5 2 10 6 6.5 10" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function GrupoModal({ gi, onClose, closing }: { gi: GrupoInvestigacion; onClose: () => void; closing?: boolean }) {
  const mainImg = gi.imagen ?? grupoImages[gi.id] ?? "/assets/comunes/YDRAY-IMG_1099.jpeg";
  const images = gi.galeria && gi.galeria.length > 0 ? gi.galeria : [mainImg];
  return (
    <div className={`cm-overlay${closing ? " closing" : ""}`} style={{ display: "flex" }} role="dialog" aria-modal="true" aria-label={gi.nombre} onClick={onClose} onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}>
      <div className="cm-box" onClick={(e) => e.stopPropagation()}>
        <div className="cm-img" style={{ position: "relative" }}>
          <ModalGallery images={images} alt={gi.nombre} />
          {/* Código badge sobre la foto */}
          <span style={{
            position: "absolute", top: "1.25rem", left: "1.25rem",
            background: "rgba(232,150,15,.18)", border: "1px solid rgba(232,150,15,.45)",
            backdropFilter: "blur(8px)", borderRadius: "999px",
            fontFamily: "var(--font-ui)", fontSize: ".62rem", fontWeight: 800,
            letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--amber)",
            padding: ".3rem 1rem",
          }}>
            {gi.codigo}
          </span>
        </div>
        <div className="cm-body">
          <span className="cm-tag">Grupo de Investigación</span>
          <h3 className="cm-title">{gi.nombre}</h3>
          <div className="cm-divider" />
          <p className="cm-desc">{gi.descripcion}</p>

          {/* Líneas temáticas */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: ".60rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: ".75rem" }}>
              Líneas de investigación
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {gi.lineasTematicas.map((l) => (
                <span key={l} style={{
                  fontFamily: "var(--font-ui)", fontSize: ".70rem",
                  color: "var(--forest)", background: "var(--forest-lt)",
                  border: "1px solid var(--border)", padding: "4px 12px",
                  borderRadius: "999px", lineHeight: 1.4,
                }}>
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Coordinador */}
          <div style={{
            display: "flex", alignItems: "center", gap: "1rem",
            padding: ".85rem 1rem",
            background: "var(--surface)", border: "1px solid var(--border-subtle)",
            borderRadius: "var(--r)", marginBottom: "1.5rem",
          }}>
            {/* Avatar inicial */}
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, var(--forest) 0%, var(--forest-m) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "#fff",
              letterSpacing: ".04em",
            }}>
              {gi.coordinador.split(" ").map(w => w[0]).slice(0, 2).join("")}
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: ".58rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "2px" }}>
                Coordinador(a)
              </p>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: ".9rem", color: "var(--text)", fontWeight: 600 }}>
                {gi.coordinador}
              </p>
            </div>
          </div>

          <button className="cm-close" onClick={onClose} autoFocus>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default function GruposSection() {
  const [modal,   setModal]   = useState<GrupoInvestigacion | null>(null);
  const [closing, setClosing] = useState(false);
  const open  = useCallback((gi: GrupoInvestigacion) => setModal(gi), []);
  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setModal(null); setClosing(false); }, 220);
  }, []);

  return (
    <>
      {modal && <GrupoModal gi={modal} onClose={close} closing={closing} />}
      <section
        aria-labelledby="gi-heading"
        style={{ padding: "0 clamp(1.25rem,4vw,3rem) clamp(5rem,8vw,8rem)", borderTop: "1px solid var(--border-subtle)", background: "var(--surface)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ padding: "clamp(3rem,5vw,5rem) 0 clamp(2rem,3.5vw,3.5rem)", textAlign: "center" }}>
            <p className="sec-eyebrow">Equipos Científicos</p>
            <h2 id="gi-heading" className="sec-h2">
              GRUPOS DE<br /><span style={{ color: "var(--forest)" }}>INVESTIGACIÓN</span>
            </h2>
            <p className="sec-sub" style={{ marginTop: ".6rem", maxWidth: "60ch", margin: "0 auto" }}>
              Colectivos especializados que lideran la generación de conocimiento en el Pacífico colombiano
            </p>
          </div>

          <div id="gi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "3px", borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
            {gruposInvestigacion.map((gi) => (
              <GrupoCard key={gi.id} gi={gi} onClick={() => open(gi)} />
            ))}
          </div>
        </div>
        <style>{`@media(max-width:640px){#gi-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </>
  );
}
