/* Componentes de Investigación — 5 equal flip cards */

import { componentesInvestigacion } from "@/data/grupos";
import type { ComponenteInvestigacion } from "@/lib/types";

/* ── Flip Card ── */
function FlipCard({ comp }: { comp: ComponenteInvestigacion }) {
  return (
    <div
      className="flip-card-root"
      role="button"
      tabIndex={0}
      aria-label={`${comp.nombre} — pase el cursor o presione Enter para ver descripción`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).focus();
        }
      }}
    >
      <div className="flip-card-inner">

        {/* ── FRONT FACE ── */}
        <div className="flip-card-face flip-card-front">
          <div className="flip-shimmer-bar" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={comp.imagen} alt="" aria-hidden="true" className="flip-bg-img" />
          <div className="flip-overlay" aria-hidden="true" />
          <div className="flip-front-info">
            <p className="flip-tipo">{comp.tipo}</p>
            <h3 className="flip-nombre">{comp.nombre}</h3>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div className="flip-card-face flip-card-back">
          <div className="flip-shimmer-bar" aria-hidden="true" />
          <div className="flip-back-body">
            <p className="flip-tipo">{comp.tipo}</p>
            <h3 className="flip-nombre flip-nombre-back">{comp.nombre}</h3>
            <p className="flip-desc">{comp.descripcion}</p>
            <ul className="flip-lineas">
              {comp.lineas.map((l) => (
                <li key={l}>
                  <span className="flip-dot" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Section ── */
export default function ComponentesSection() {
  return (
    <section
      aria-labelledby="comp-heading"
      style={{ padding: "clamp(4rem,7vw,7rem) clamp(1.25rem,4vw,3rem)", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* Header — centered */}
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,4vw,3.5rem)" }}>
          <h2 id="comp-heading" className="sec-h2">COMPONENTES</h2>
          <p className="sec-sub" style={{ marginTop: ".5rem" }}>
            Pase el cursor sobre cada componente para descubrir su misión científica
          </p>
        </div>

        {/* 5-equal-card grid */}
        <div id="comp-grid">
          {componentesInvestigacion.map((comp) => (
            <FlipCard key={comp.id} comp={comp} />
          ))}
        </div>

      </div>

      <style>{`
        /* ── Equal 5-card grid ── */
        #comp-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          height: 400px;
        }

        /* ── Flip Card System ── */
        .flip-card-root { perspective: 1100px; cursor: pointer; height: 100%; }
        .flip-card-inner {
          position: relative; width: 100%; height: 100%;
          transition: transform 0.65s cubic-bezier(.4,0,.2,1);
          transform-style: preserve-3d;
        }
        .flip-card-root:hover .flip-card-inner,
        .flip-card-root:focus .flip-card-inner { transform: rotateY(180deg); }

        .flip-card-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 20px; overflow: hidden;
          border: 2px solid rgba(232,150,15,.50);
          box-shadow: 0 16px 48px rgba(13,59,36,.22), 0 4px 14px rgba(13,59,36,.12);
        }
        .flip-card-back {
          background: linear-gradient(150deg, var(--forest) 0%, var(--forest-d) 100%);
          transform: rotateY(180deg);
        }

        /* photo + overlay */
        .flip-bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; filter: saturate(.75);
        }
        .flip-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(170deg, rgba(13,59,36,.12) 0%, rgba(13,59,36,.52) 40%, rgba(13,59,36,.92) 100%);
        }

        /* Front info block */
        .flip-front-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: clamp(1.2rem,2.5vw,1.8rem); z-index: 2;
        }
        .flip-tipo {
          font-family: var(--font-ui); font-size: .58rem; font-weight: 800;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--amber); margin-bottom: .35rem;
        }
        .flip-nombre {
          font-family: var(--font-display);
          font-size: clamp(1.1rem,1.8vw,1.65rem);
          color: #fff; letter-spacing: .04em; line-height: .95;
        }

        /* Back body */
        .flip-back-body {
          height: 100%; display: flex; flex-direction: column;
          justify-content: center;
          padding: clamp(1.4rem,3vw,2.2rem);
        }
        .flip-nombre-back { font-size: clamp(1rem,1.6vw,1.4rem); margin-bottom: .9rem; }
        .flip-desc {
          font-family: var(--font-body); font-size: clamp(.82rem,1.1vw,.9rem);
          color: rgba(255,255,255,.82); line-height: 1.65; margin-bottom: 1.1rem;
        }
        .flip-lineas {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 5px;
        }
        .flip-lineas li {
          display: flex; align-items: center; gap: 7px;
          font-family: var(--font-ui); font-size: .70rem;
          color: rgba(255,255,255,.68); line-height: 1.3;
        }
        .flip-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--amber); flex-shrink: 0;
        }

        /* ── Amber shimmer bar ── */
        .flip-shimmer-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(to right, var(--amber) 0%, rgba(255,255,255,.7) 40%, var(--amber-d) 60%, var(--amber) 100%);
          background-size: 200% 100%;
          animation: shimr 3s linear infinite; z-index: 5;
        }
        @keyframes shimr { 0%{background-position:100% 0} 100%{background-position:-100% 0} }

        /* ── Responsive ── */
        @media(max-width:1100px){
          #comp-grid{ grid-template-columns:repeat(3,1fr) !important; height:auto !important; }
          .flip-card-root{ height:320px; }
        }
        @media(max-width:680px){
          #comp-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .flip-card-root{ height:280px; }
        }
        @media(max-width:420px){
          #comp-grid{ grid-template-columns:1fr !important; }
        }
      `}</style>
    </section>
  );
}
