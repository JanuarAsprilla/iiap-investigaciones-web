"use client";

import { useState, useEffect } from "react";
import SiteNav from "@/components/layout/SiteNav";
import ComponentesSection  from "../grupos/_sections/ComponentesSection";
import EstructuraSection   from "../grupos/_sections/EstructuraSection";
import TalentoSection      from "../grupos/_sections/TalentoSection";
import AudiovisualSection  from "../grupos/_sections/AudiovisualSection";
import TimelineSection     from "../grupos/_sections/TimelineSection";

/* Carousel background images for the hero */
const heroBgs = [
  "/assets/grupos/COMPONENTE_ECOSISTEMICO.jpeg",
  "/assets/grupos/COMPONENTE_AMBIENTAL.jpeg",
  "/assets/grupos/COMPONENTE_SOCIOCULTURAL.jpeg",
  "/assets/grupos/LABORATORIO_DATOS.jpeg",
];

export default function ComponentesPage() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBgs.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <SiteNav />

      <main id="main-content" style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ════════════════════════════════════════
            HERO — Carousel
        ════════════════════════════════════════ */}
        <section
          aria-labelledby="comp-page-heading"
          style={{
            position: "relative", overflow: "hidden",
            padding: "clamp(7rem,12vh,10rem) clamp(1.25rem,4vw,3rem) clamp(4rem,7vh,6rem)",
          }}
        >
          {heroBgs.map((src, i) => (
            <div
              key={src}
              aria-hidden="true"
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: i === bgIndex ? 1 : 0,
                transition: "opacity 1.4s ease-in-out",
                willChange: i === bgIndex ? "opacity" : "auto",
              }}
            />
          ))}

          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(150deg, rgba(13,59,36,.85) 0%, rgba(9,40,25,.90) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 30% 50%, rgba(232,150,15,.12) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, var(--amber), var(--amber-d))",
                color: "var(--forest-d)",
                fontFamily: "var(--font-ui)", fontSize: ".72rem", fontWeight: 800,
                letterSpacing: "2px", textTransform: "uppercase",
                padding: ".3rem 1.1rem", borderRadius: "var(--r-pill)",
                marginBottom: "1.25rem",
              }}
            >
              Ciencia del Pacífico
            </span>

            <h1
              id="comp-page-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-4xl)",
                lineHeight: .9,
                color: "#fff",
                letterSpacing: ".01em",
                marginBottom: "1.25rem",
              }}
            >
              COMPONENTES DE
              <br />
              <span style={{ color: "var(--amber)" }}>INVESTIGACIÓN</span>
            </h1>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-lg)",
                color: "rgba(255,255,255,.78)",
                maxWidth: "55ch", lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              Cuatro componentes programáticos y un Laboratorio de Datos que
              articulan el conocimiento científico con las comunidades étnicas del
              Chocó Biogeográfico.
            </p>

            <div style={{ display: "flex", gap: "8px" }} aria-hidden="true">
              {heroBgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBgIndex(i)}
                  style={{
                    width: i === bgIndex ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: i === bgIndex ? "var(--amber)" : "rgba(255,255,255,.35)",
                    border: "none",
                    cursor: "pointer",
                    transition: "width .4s var(--ease), background .3s",
                    padding: 0,
                  }}
                  aria-label={`Imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Componentes flip-cards ── */}
        <ComponentesSection />

        {/* ── Equipo de investigación ── */}
        <EstructuraSection />

        {/* ── Talento humano ── */}
        <TalentoSection />

        {/* ── Audiovisual ── */}
        <AudiovisualSection />

        {/* ── Proceso de investigación ── */}
        <TimelineSection />

        {/* ── Footer ── */}
        <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "1.5rem clamp(1.25rem,4vw,3rem)", background: "var(--bg)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "var(--t-xs)", color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} IIAP — Componentes y Grupos de Investigación
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
