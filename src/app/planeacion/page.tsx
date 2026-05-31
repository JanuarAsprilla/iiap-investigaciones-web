"use client";

import { useState, useEffect } from "react";
import SiteNav from "@/components/layout/SiteNav";
import { documentosPlanificacion } from "@/data/planificacion";

const heroBgs = [
  "/assets/centros/SENDERO.jpeg",
  "/assets/centros/VIVERO.jpeg",
  "/assets/centros/PISCITANQUES.jpeg",
  "/assets/comunes/YDRAY-IMG_1099.jpeg",
];

/* ──────────────────────────────────────────────
   Modal — Diagrama PICIA (Warm Light)
─────────────────────────────────────────────── */
/* Safe URL helper — only allow https: origins */
function safePdfUrl(raw: string): string {
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" ? raw : "#";
  } catch {
    return "#";
  }
}

function DiagramaModal({ onClose, closing }: { onClose: () => void; closing?: boolean }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Diagrama PICIA"
      onClick={onClose}
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
      className={closing ? "cm-overlay closing" : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "rgba(26,26,26,.80)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        cursor: "zoom-out",
        animation: closing ? undefined : "cmFadeIn .22s var(--ease) both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "1100px", width: "100%", cursor: "default" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/comunes/DIAGRAMA_PICIA.png"
          alt="Diagrama PICIA 2023-2026"
          style={{ width: "100%", height: "auto", borderRadius: "16px", display: "block", border: "1px solid var(--border)" }}
        />
        <button
          onClick={onClose}
          autoFocus
          aria-label="Cerrar diagrama"
          style={{
            position: "absolute",
            top: "-14px",
            right: "-14px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "var(--forest)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Page
─────────────────────────────────────────────── */
export default function PlaneacionPage() {
  const [diagramaOpen,    setDiagramaOpen]    = useState(false);
  const [diagramaClosing, setDiagramaClosing] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setBgIndex((p) => (p + 1) % heroBgs.length), 5000);
    return () => clearInterval(id);
  }, []);

  const closeDiagrama = () => {
    setDiagramaClosing(true);
    setTimeout(() => { setDiagramaOpen(false); setDiagramaClosing(false); }, 220);
  };

  return (
    <>
      <SiteNav />
      {diagramaOpen && <DiagramaModal onClose={closeDiagrama} closing={diagramaClosing} />}

      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ── Hero — Editorial split con carrusel ── */}
        <section
          aria-labelledby="plan-heading"
          style={{ padding: "clamp(7rem,12vh,10rem) clamp(1.25rem,4vw,3rem) clamp(4rem,7vh,6rem)", position: "relative", overflow: "hidden" }}
        >
          {/* Carousel layers */}
          {heroBgs.map((src, i) => (
            <div key={src} aria-hidden="true" style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: "cover", backgroundPosition: "center",
              opacity: i === bgIndex ? 1 : 0,
              transition: "opacity 1.6s ease-in-out",
            }} />
          ))}
          {/* Overlay — forest dark keeps text legible */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg, rgba(7,26,14,.92) 0%, rgba(13,59,36,.85) 60%, rgba(9,40,25,.90) 100%)" }} />

          {/* ── Subtle grid lines ── */}
          <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .06, pointerEvents: "none" }} preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="plan-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M60 0 L0 0 0 60" fill="none" stroke="rgba(232,150,15,1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#plan-grid)"/>
          </svg>

          {/* ── Amber glow top-right ── */}
          <div aria-hidden="true" style={{ position: "absolute", top: "-10%", right: "-5%", width: "55%", height: "140%", background: "radial-gradient(ellipse at 70% 30%, rgba(232,150,15,.16) 0%, transparent 60%)", pointerEvents: "none" }} />
          {/* ── Deep shadow bottom-left ── */}
          <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, width: "60%", height: "50%", background: "radial-gradient(ellipse at 0% 100%, rgba(0,0,0,.45) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".75rem", marginBottom: "1.75rem" }}>
              <div style={{ width: "28px", height: "2px", background: "var(--amber)" }} aria-hidden="true" />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: ".65rem", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase", color: "var(--amber)" }}>
                Planeación Institucional
              </span>
              <div style={{ width: "28px", height: "2px", background: "var(--amber)" }} aria-hidden="true" />
            </div>

            <h1 id="plan-heading" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4.5rem,10vw,9rem)",
              lineHeight: .88, color: "#fff",
              letterSpacing: "-.01em", marginBottom: "1.75rem",
            }}>
              MARCO<br />
              <span style={{ color: "var(--amber)" }}>ESTRATÉGICO</span>
            </h1>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.05rem,1.5vw,1.2rem)",
              color: "rgba(255,255,255,.72)",
              maxWidth: "56ch", lineHeight: 1.85, margin: "0 auto",
            }}>
              Los documentos que orientan la investigación ambiental del IIAP: el Plan
              Institucional Cuatrienal (PICIA) y el Plan Operativo Anual (POA), articulados
              con el Chocó Biogeográfico como territorio de acción.
            </p>
          </div>

          {/* ── Bottom fade ── */}
          <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none" }} />

          <style>{`@keyframes shimBar{0%{background-position:0%}100%{background-position:200%}}`}</style>
        </section>

        {/* ── Documentos de Planificación ── */}
        <section
          aria-labelledby="docs-heading"
          style={{ padding: "clamp(4rem,7vw,7rem) clamp(1.25rem,4vw,3rem)" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

            <div style={{ marginBottom: "clamp(2.5rem,4vw,4rem)", textAlign: "center" }}>
              <p className="sec-eyebrow">Documentos</p>
              <h2 id="docs-heading" className="sec-h2">DOCUMENTOS DE PLANIFICACIÓN</h2>
              <p className="sec-sub" style={{ maxWidth: "60ch", margin: ".6rem auto 0" }}>
                Instrumentos de gestión que orientan la investigación 2023–2026
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
                gap: "clamp(1.25rem, 2vw, 2rem)",
              }}
            >
              {documentosPlanificacion.map((doc) => (
                <article
                  key={doc.id}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--r-xl)",
                    overflow: "hidden",
                    boxShadow: "var(--sh-sm)",
                    transition: "transform 0.4s var(--ease), box-shadow 0.4s, border-color 0.4s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-6px)";
                    el.style.boxShadow = "var(--sh-lg)";
                    el.style.borderColor = "var(--border-active)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "var(--sh-sm)";
                    el.style.borderColor = "var(--border-subtle)";
                  }}
                >
                  {/* Visual header — PICIA: portada real / POA: forest gradient */}
                  <div
                    style={{
                      position: "relative",
                      height: doc.tipo === "PICIA" ? "280px" : "220px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: doc.tipo === "PICIA" ? "flex-end" : "center",
                      justifyContent: "center",
                      background: doc.tipo === "PICIA"
                        ? "var(--forest-d)"
                        : "linear-gradient(150deg, var(--forest-m) 0%, var(--forest) 100%)",
                    }}
                  >
                    {/* PICIA — portada como fondo */}
                    {doc.tipo === "PICIA" && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/assets/comunes/PICIA-2023-2026.jpg"
                          alt=""
                          aria-hidden="true"
                          style={{
                            position: "absolute", inset: 0,
                            width: "100%", height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                          }}
                        />
                        {/* Gradient overlay for legibility */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute", inset: 0,
                            background:
                              "linear-gradient(to bottom, rgba(9,40,25,.10) 0%, rgba(9,40,25,.55) 55%, rgba(9,40,25,.92) 100%)",
                          }}
                        />
                      </>
                    )}

                    {/* Amber shimmer bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, transparent, var(--amber) 40%, var(--gold-bright) 50%, var(--amber) 60%, transparent)",
                        backgroundSize: "200%",
                        animation: "shimBar 3s linear infinite",
                        zIndex: 2,
                      }}
                    />

                    {/* POA — ghost type watermark */}
                    {doc.tipo !== "PICIA" && (
                      <p
                        aria-hidden="true"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(5rem,12vw,9rem)",
                          color: "rgba(255,255,255,.07)",
                          lineHeight: 1,
                          letterSpacing: "-2px",
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      >
                        {doc.tipo}
                      </p>
                    )}

                    {/* Card visual content */}
                    <div
                      style={{
                        textAlign: "center",
                        padding: doc.tipo === "PICIA" ? "1.5rem 2rem" : "2rem",
                        position: "relative", zIndex: 1,
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          background: "rgba(232,150,15,.22)",
                          color: "var(--amber)",
                          fontFamily: "var(--font-ui)",
                          fontSize: ".68rem",
                          fontWeight: 700,
                          letterSpacing: "2.5px",
                          textTransform: "uppercase",
                          padding: ".3rem 1.1rem",
                          borderRadius: "999px",
                          border: "1px solid rgba(232,150,15,.40)",
                          display: "inline-block",
                          marginBottom: ".75rem",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {doc.tipo}
                      </span>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,3.5vw,2.5rem)", color: "#fff", letterSpacing: ".04em", lineHeight: 1 }}>
                        {doc.titulo}
                      </p>
                      <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: ".9rem", color: "rgba(255,255,255,.70)", marginTop: ".5rem" }}>
                        {doc.anio}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "clamp(1.5rem,3vw,2.25rem)" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,2.5vw,1.75rem)", color: "var(--forest)", letterSpacing: ".04em", marginBottom: ".5rem", lineHeight: 1.1 }}>
                      {doc.subtitulo}
                    </h3>
                    <div style={{ width: "2.5rem", height: "2px", background: "var(--amber)", borderRadius: "2px", marginBottom: "1rem" }} />
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.6vw,1.1rem)", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "1.75rem" }}>
                      {doc.descripcion}
                    </p>
                    <a
                      href={safePdfUrl(doc.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "var(--font-ui)",
                        fontSize: ".72rem",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "#fff",
                        background: "var(--forest)",
                        padding: ".75rem 1.8rem",
                        borderRadius: "999px",
                        textDecoration: "none",
                        transition: "background 0.25s, transform 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "var(--forest-m)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "var(--forest)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      }}
                    >
                      Descargar PDF
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1.5v6M3.5 5.5l2.5 2.5 2.5-2.5M1.5 10.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </section>

        {/* ── Diagrama PICIA ── */}
        <section
          aria-labelledby="diagrama-heading"
          style={{
            padding: "0 clamp(1.25rem,4vw,3rem) clamp(5rem,8vw,8rem)",
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ padding: "clamp(3rem,5vw,5rem) 0 clamp(2rem,4vw,3rem)" }}>

              {/* Header + expand button — centered */}
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <p className="sec-eyebrow">PICIA 2023–2026</p>
                <h2 id="diagrama-heading" className="sec-h2">
                  ESTRUCTURA
                  <br /><span style={{ color: "var(--forest)" }}>PROGRAMÁTICA</span>
                </h2>
                <p className="sec-sub" style={{ marginTop: ".6rem", maxWidth: "55ch", margin: ".6rem auto 1.5rem" }}>
                  Diagrama programático del Plan Institucional Cuatrienal de Investigaciones Ambientales
                </p>
                <button
                  onClick={() => setDiagramaOpen(true)}
                  aria-label="Ver diagrama en pantalla completa"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-ui)",
                    fontSize: ".68rem",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--forest)",
                    background: "transparent",
                    border: "1px solid var(--border-active)",
                    padding: ".6rem 1.4rem",
                    borderRadius: "999px",
                    cursor: "pointer",
                    transition: "background .2s, color .2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--forest)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--forest)";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1h5M1 1v5M13 13H8M13 13V8M1 13h5M1 13V8M13 1H8M13 1v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Pantalla completa
                </button>
              </div>

              {/* Diagram image — clickable */}
              <button
                onClick={() => setDiagramaOpen(true)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  padding: 0,
                  cursor: "zoom-in",
                  overflow: "hidden",
                  display: "block",
                  boxShadow: "var(--sh-sm)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                aria-label="Ampliar diagrama PICIA"
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-active)";
                  el.style.boxShadow = "var(--sh)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "var(--sh-sm)";
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/comunes/DIAGRAMA_PICIA.png"
                  alt="Diagrama de la estructura programática del PICIA 2023-2026"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    transition: "transform 0.5s var(--ease)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.015)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
              </button>

            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "1.5rem clamp(1.25rem,4vw,3rem)", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} IIAP — Planeación Estratégica
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
